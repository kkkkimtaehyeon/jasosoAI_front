import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext.jsx";
import {Button, Dropdown} from "react-bootstrap";
import GoogleSignInButton from "../components/GoogleLoginButton.jsx";

// --- STYLES (can be shared across components) ---
const styles = {
    body: {
        fontFamily: "'Manrope', 'Noto Sans KR', sans-serif",
        backgroundColor: '#f8f9fa',
        color: '#1e293b',
    },
    primaryColor: '#0d7ff2',
    textPrimary: '#1e293b',
    textSecondary: '#64748b',
    accentColor: '#e0f2fe',
    buttonPrimary: {
        backgroundColor: '#0d7ff2',
        color: 'white',
        borderColor: '#0d7ff2',
    },
    link: {
        color: '#64748b',
        textDecoration: 'none',
    },
    linkActive: {
        color: '#1e293b',
        fontWeight: '600',
    },
    uploadBox: {
        border: '2px dashed #ced4da',
        backgroundColor: 'white',
    },
    statusBadgeCompleted: {
        backgroundColor: '#e0f2fe',
        color: '#0d7ff2',
    },
    statusBadgeOld: {
        backgroundColor: '#f8f9fa',
        color: '#6c757d',
    }
};

// --- SVG ICONS (can be in their own file) ---
const Logo = () => (
    <svg style={{ color: styles.primaryColor }} height="32" width="32" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
    </svg>
);

const NotificationIcon = () => (
    <svg fill="currentColor" height="20px" viewBox="0 0 256 256" width="20px" xmlns="http://www.w3.org/2000/svg">
        <path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path>
    </svg>
);


// --- REUSABLE NAVIGATION BAR COMPONENT ---
const NavigationBar = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();
    const {logout, googleLogin} = useAuth();

    const handleLogout = () => {
        logout();
        setIsLoggedIn(false);
        navigate('/');
    };

    const navLinks = [
        { label: '자소서 목록', to: '/cover-letters' },
        { label: '자소서 업로드', to: '/user/cover-letters/upload' },
        { label: 'AI 자소서 생성', to: '/ai/cover-letters/generate' },
        { label: '피드백', to: '/feedback' },
    ];

    return (
        <header className="bg-white shadow-sm">
            <div className="container">
                <div className="d-flex align-items-center justify-content-between" style={{height: '4rem'}}>
                    <div className="d-flex align-items-center gap-3" style={{cursor: 'pointer'}} onClick={() => navigate('/')}>
                        <Logo/>
                        <h1 className="h5 fw-bold mb-0" style={{color: styles.textPrimary}}>자소서 AI</h1>
                    </div>

                    {isLoggedIn ? (
                        <>
                            <nav className="d-none d-md-flex align-items-center gap-4">
                                {navLinks.map(({label, to}) => (
                                    <NavLink key={to} to={to} style={({isActive}) => isActive ? styles.linkActive : styles.link}>
                                        {label}
                                    </NavLink>
                                ))}
                            </nav>
                            <div className="d-flex align-items-center gap-3">
                                {/*<button className="btn btn-light rounded-circle p-2 lh-1"><NotificationIcon/></button>*/}
                                <Dropdown>
                                    <Dropdown.Toggle variant="light" id="dropdown-basic">
                                        <img alt="User profile" className="rounded-circle" height="40" width="40" src="https://placehold.co/40x40/0d7ff2/FFFFFF?text=U" />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu align="end">
                                        <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>

                        </>
                    ) : (
                        <div className="d-flex align-items-center gap-4">
                            {/*<button className="btn" style={styles.buttonPrimary}*/}
                            {/*        onClick={() => navigate('/login')}>로그인*/}
                            {/*</button>*/}
                            <div>
                                <GoogleSignInButton />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};


export default NavigationBar;
