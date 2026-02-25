import React, { useReducer } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { useTheme } from '../contexts/ThemeContext';

const initialState = { count: 0 };

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        case 'reset':
            return initialState;
        default:
            return state;
    }
}

function CounterComponent() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { theme, toggleTheme } = useTheme();

    const isDark = theme === 'dark';

    const cardStyle = {
        background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
        borderRadius: '20px',
        boxShadow: isDark ? '0 8px 32px 0 rgba(0, 0, 0, 0.37)' : '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    };

    const buttonBase = {
        padding: '12px 24px',
        borderRadius: '12px',
        border: 'none',
        fontWeight: '600',
        letterSpacing: '0.5px',
        transition: 'all 0.3s ease',
        margin: '8px'
    };

    return (
        <Card style={cardStyle} className="p-4 mb-4">
            <Card.Body className="text-center">
                <h2 style={{
                    color: isDark ? '#fff' : '#333',
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    marginBottom: '1rem'
                }}>
                    Counter Component
                </h2>

                <div style={{
                    fontSize: '3.5rem',
                    fontWeight: '800',
                    background: 'linear-gradient(45deg, #007bff, #6610f2)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    margin: '1.5rem 0'
                }}>
                    {state.count}
                </div>

                <div className="d-flex flex-wrap justify-content-center">
                    <Button
                        onClick={() => dispatch({ type: 'increment' })}
                        style={{ ...buttonBase, background: '#007bff', color: '#fff', boxShadow: '0 4px 15px rgba(0, 123, 255, 0.3)' }}
                    >
                        Increase
                    </Button>

                    <Button
                        onClick={() => dispatch({ type: 'decrement' })}
                        style={{ ...buttonBase, background: '#fd7e14', color: '#fff', boxShadow: '0 4px 15px rgba(253, 126, 20, 0.3)' }}
                    >
                        Decrease
                    </Button>

                    <Button
                        onClick={() => dispatch({ type: 'reset' })}
                        style={{ ...buttonBase, background: '#dc3545', color: '#fff', boxShadow: '0 4px 15px rgba(220, 53, 69, 0.3)' }}
                    >
                        Reset
                    </Button>

                    <Button
                        onClick={toggleTheme}
                        style={{
                            ...buttonBase,
                            background: isDark ? '#f8f9fa' : '#343a40',
                            color: isDark ? '#343a40' : '#f8f9fa',
                            boxShadow: isDark ? '0 4px 15px rgba(255, 255, 255, 0.2)' : '0 4px 15px rgba(0, 0, 0, 0.2)'
                        }}
                    >
                        {isDark ? '☀️ Light' : '🌙 Dark'}
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default CounterComponent;
