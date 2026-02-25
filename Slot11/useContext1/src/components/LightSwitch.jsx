import React, { useReducer, useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useTheme } from '../contexts/ThemeContext';

const initialState = { isOn: false };

function reducer(state, action) {
    switch (action.type) {
        case 'toggle':
            return { isOn: !state.isOn };
        case 'turnOn':
            return { isOn: true };
        case 'turnOff':
            return { isOn: false };
        default:
            return state;
    }
}

function LightSwitch() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { theme, toggleTheme } = useTheme();

    // Đồng bộ theme global với state local của LightSwitch
    useEffect(() => {
        if (theme === 'light') {
            dispatch({ type: 'turnOn' });
        } else {
            dispatch({ type: 'turnOff' });
        }
    }, [theme]);

    const isDark = theme === 'dark';

    const cardStyle = {
        background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
        borderRadius: '20px',
        boxShadow: isDark ? '0 8px 32px 0 rgba(0, 0, 0, 0.37)' : '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
        transition: 'all 0.4s ease'
    };

    const buttonBase = {
        padding: '12px 24px',
        borderRadius: '12px',
        border: 'none',
        fontWeight: '600',
        transition: 'all 0.3s ease',
        margin: '8px'
    };

    return (
        <Card style={cardStyle} className="p-4">
            <Card.Body className="text-center">
                <h2 style={{ color: isDark ? '#fff' : '#333', fontWeight: '700' }}>Light Switch</h2>

                <div style={{
                    display: 'inline-block',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    margin: '20px 0',
                    background: state.isOn ? '#ffd700' : '#444',
                    boxShadow: state.isOn
                        ? '0 0 50px #ffd700, 0 0 20px #ffcc00'
                        : 'inset 0 0 20px rgba(0,0,0,0.5)',
                    transition: 'all 0.5s ease',
                    position: 'relative'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        fontSize: '2rem'
                    }}>
                        {state.isOn ? '💡' : '🌑'}
                    </div>
                </div>

                <p style={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    color: isDark ? '#ccc' : '#666'
                }}>
                    Status: <span style={{ color: state.isOn ? '#ffcc00' : '#888' }}>
                        {state.isOn ? 'ON' : 'OFF'}
                    </span>
                </p>

                <div className="d-flex flex-wrap justify-content-center">
                    <Button
                        onClick={toggleTheme} // Tắt/Bật theme sẽ kéo theo isOn thay đổi qua useEffect
                        style={{
                            ...buttonBase,
                            background: 'linear-gradient(45deg, #007bff, #00d2ff)',
                            color: 'white',
                            boxShadow: '0 4px 15px rgba(0, 123, 255, 0.3)'
                        }}
                    >
                        Toggle {state.isOn ? 'Off' : 'On'}
                    </Button>

                    <Button
                        onClick={() => theme === 'dark' && toggleTheme()}
                        style={{
                            ...buttonBase,
                            background: '#28a745',
                            color: 'white',
                            opacity: state.isOn ? 0.6 : 1,
                            boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)'
                        }}
                    >
                        Turn On
                    </Button>

                    <Button
                        onClick={() => theme === 'light' && toggleTheme()}
                        style={{
                            ...buttonBase,
                            background: '#dc3545',
                            color: 'white',
                            opacity: !state.isOn ? 0.6 : 1,
                            boxShadow: '0 4px 15px rgba(220, 53, 69, 0.3)'
                        }}
                    >
                        Turn Off
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default LightSwitch;
