import React, { useState, useEffect } from 'react';
import { Table, Container, Button, Badge, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { accountService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import FilterBar from '../components/FilterBar';
import ToastMessage from '../components/ToastMessage';
import ConfirmModal from '../components/ConfirmModal';

const AccountList = () => {
    const [accounts, setAccounts] = useState([]);
    const [filteredAccounts, setFilteredAccounts] = useState([]);
    const [filters, setFilters] = useState({
        search: '',
        status: 'All',
        role: 'All',
        sort: ''
    });
    const [showToast, setShowToast] = useState(false);
    const [toastData, setToastData] = useState({ message: '', bg: 'success' });
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmData, setConfirmData] = useState({ user: null, action: '' });

    const { user: currentUser, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchAccounts();
    }, []);

    useEffect(() => {
        applyFiltersAndSort();
    }, [filters, accounts]);

    const fetchAccounts = async () => {
        try {
            const response = await accountService.getAccounts();
            setAccounts(response.data);
        } catch (error) {
            console.error('Error fetching accounts:', error);
        }
    };

    const handleFilterChange = (name, value) => {
        setFilters({ ...filters, [name]: value });
    };

    const applyFiltersAndSort = () => {
        let result = [...accounts];

        // Search
        if (filters.search) {
            const query = filters.search.toLowerCase();
            result = result.filter(acc =>
                acc.username.toLowerCase().includes(query) ||
                acc.email.toLowerCase().includes(query)
            );
        }

        // Status
        if (filters.status !== 'All') {
            result = result.filter(acc => acc.status === filters.status);
        }

        // Role
        if (filters.role !== 'All') {
            result = result.filter(acc => acc.role === filters.role);
        }

        // Sort
        if (filters.sort) {
            switch (filters.sort) {
                case 'usernameAsc':
                    result.sort((a, b) => a.username.localeCompare(b.username));
                    break;
                case 'usernameDesc':
                    result.sort((a, b) => b.username.localeCompare(a.username));
                    break;
                case 'role':
                    result.sort((a, b) => a.role.localeCompare(b.role));
                    break;
                case 'status':
                    result.sort((a, b) => a.status.localeCompare(b.status));
                    break;
                default:
                    break;
            }
        }

        setFilteredAccounts(result);
    };

    const handleLockUnlockClick = (account) => {
        if (account.id === currentUser?.id) {
            setToastData({ message: 'Warning: You cannot lock your own account!', bg: 'warning' });
            setShowToast(true);
            return;
        }

        const action = account.status === 'active' ? 'lock' : 'unlock';
        setConfirmData({ user: account, action });
        setShowConfirm(true);
    };

    const confirmAction = async () => {
        const { user, action } = confirmData;
        const newStatus = action === 'lock' ? 'locked' : 'active';

        try {
            await accountService.updateAccount(user.id, { status: newStatus });

            // Update local state in-place
            setAccounts(accounts.map(acc =>
                acc.id === user.id ? { ...acc, status: newStatus } : acc
            ));

            setToastData({
                message: action === 'lock' ? 'Locked successfully' : 'Unlocked successfully',
                bg: 'success'
            });
            setShowToast(true);
            setShowConfirm(false);
        } catch (error) {
            console.error('Error updating status:', error);
            setToastData({ message: 'Error updating account status', bg: 'danger' });
            setShowToast(true);
        }
    };

    return (
        <Container className="py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="mb-0">Account Management</h2>
                <div className="d-flex align-items-center gap-3">
                    <span className="fw-bold">Welcome, {currentUser?.username}</span>
                    <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => {
                            logout();
                            navigate('/login');
                        }}
                    >
                        Logout
                    </Button>
                </div>
            </div>

            <FilterBar filters={filters} onFilterChange={handleFilterChange} />

            <Table responsive hover className="mt-3 align-middle">
                <thead className="table-light">
                    <tr>
                        <th>Avatar</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAccounts.map(acc => (
                        <tr key={acc.id}>
                            <td>
                                <Image
                                    src={acc.avatar}
                                    roundedCircle
                                    width={40}
                                    height={40}
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }}
                                />
                            </td>
                            <td>{acc.username}</td>
                            <td>{acc.email}</td>
                            <td>{acc.role}</td>
                            <td>
                                <Badge bg={acc.status === 'active' ? 'success' : 'danger'}>
                                    {acc.status}
                                </Badge>
                            </td>
                            <td>
                                <div className="d-flex gap-2">
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={() => navigate(`/accounts/${acc.id}`)}
                                    >
                                        View Details
                                    </Button>
                                    <Button
                                        variant={acc.status === 'active' ? 'danger' : 'success'}
                                        size="sm"
                                        onClick={() => handleLockUnlockClick(acc)}
                                    >
                                        {acc.status === 'active' ? 'Lock' : 'Unlock'}
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {filteredAccounts.length === 0 && (
                <div className="text-center py-5">
                    <p className="text-muted">No accounts found matches your criteria.</p>
                </div>
            )}

            <ConfirmModal
                show={showConfirm}
                handleClose={() => setShowConfirm(false)}
                handleConfirm={confirmAction}
                title={confirmData.action === 'lock' ? 'Lock Account' : 'Unlock Account'}
                confirmVariant={confirmData.action === 'lock' ? 'danger' : 'success'}
                confirmText={confirmData.action === 'lock' ? 'Lock' : 'Unlock'}
                message={
                    confirmData.action === 'lock'
                        ? `Lock account ${confirmData.user?.username}? The user cannot log in after this.`
                        : `Unlock account ${confirmData.user?.username}?`
                }
            />

            <ToastMessage
                show={showToast}
                onClose={() => setShowToast(false)}
                message={toastData.message}
                bg={toastData.bg}
            />
        </Container>
    );
};

export default AccountList;
