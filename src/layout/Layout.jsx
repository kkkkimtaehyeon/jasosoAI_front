// Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from "./Header.jsx";
const styles = {
    body: {
        fontFamily: "'Manrope', 'Noto Sans KR', sans-serif",
        backgroundColor: '#f9f9f9',
        color: '#111418',
    },
    primaryColor: '#0d7ff2',
    secondaryColor: '#f0f2f4',
    textPrimary: '#111418',
    textSecondary: '#637488',
    accentColor: '#e0f2fe',
    buttonPrimary: {
        backgroundColor: '#0d7ff2',
        color: 'white',
        borderColor: '#0d7ff2',
        fontWeight: 'bold',
    },
    heroSection: {
        position: 'relative',
        color: 'white',
    },
    heroOverlay: {
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    heroImage: {
        position: 'absolute',
        inset: 0,
        height: '100%',
        width: '100%',
        objectFit: 'cover',
    },
    card: {
        transition: 'all 0.3s ease',
    },
    link: {
        color: '#64748b',
        textDecoration: 'none',
    },
    linkActive: {
        color: '#0d7ff2',
        fontWeight: '600',
        textDecoration: 'none',
    }
};
// --- LAYOUT COMPONENT ---
const Layout = ({ isLoggedIn, setIsLoggedIn }) => {
    return (
        <div style={styles.body} className="d-flex flex-column min-vh-100">
            <NavigationBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <main className="flex-grow-1">
                <Outlet context={{ setIsLoggedIn }} />
            </main>
            <footer style={{backgroundColor: styles.secondaryColor, color: styles.textSecondary}} className="py-5 mt-auto">
                <div className="container text-center">
                    <p className="text-sm">© 2025 자소서 AI. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
