import React from 'react';
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LightSwitch from "./components/LightSwitch";
import CounterComponent from "./components/CounterComponent";
import LoginForm from "./components/LoginForm";
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ThemedAppContent = () => {
  const { theme } = useTheme();
  const { user, logout } = useAuth();

  const isDark = theme === 'dark';

  return (
    <div style={{
      minHeight: '100vh',
      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      background: isDark
        ? 'radial-gradient(circle at top right, #2c3e50, #000000)'
        : 'radial-gradient(circle at top right, #e0eafc, #cfdef3)',
      color: isDark ? '#ffffff' : '#000000',
      display: 'flex',
      alignItems: 'center',
      padding: '40px 0'
    }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h1 style={{
                fontWeight: '800',
                letterSpacing: '-1px',
                textShadow: isDark ? '0 2px 10px rgba(0,0,0,0.5)' : '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                Exercise 1 & 2
              </h1>
              <p style={{ opacity: 0.7 }}>Unified Auth & Context</p>
            </div>

            {!user ? (
              <LoginForm />
            ) : (
              <>
                <div className="d-flex justify-content-between align-items-center mb-4 p-3" style={{
                  background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                  borderRadius: '16px',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div style={{ fontWeight: '600' }}>
                    Logged in as: <span className="text-primary">{user.username}</span> ({user.role})
                  </div>
                  <Button variant="outline-danger" size="sm" onClick={logout} style={{ borderRadius: '8px' }}>
                    Logout
                  </Button>
                </div>
                <CounterComponent />
                <div style={{ height: '30px' }} />
                <LightSwitch />
              </>
            )}

          </Col>
        </Row>
      </Container>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ThemedAppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
