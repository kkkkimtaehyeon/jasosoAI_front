import React, {useState} from 'react';
import {useNavigate, useOutletContext} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext.jsx";

// It's assumed that Bootstrap's CSS is linked in your main index.html file.
// For example: <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">

const Login = ({setIsLoggedIn}) => {
    // Styles that are not directly replaceable by Bootstrap classes
    // or are for custom theming.
    const styles = {
        primaryColor: '#0d7ff2',
        secondaryColor: '#f2f7ff',
        textPrimary: '#1e293b',
        textSecondary: '#64748b',
        body: {
            fontFamily: "'Manrope', 'Noto Sans KR', sans-serif",
            backgroundColor: '#ffffff',
            color: '#1e293b',
        },
        link: {
            color: '#0d7ff2',
            textDecoration: 'none',
        },
        hoverLink: {
            textDecoration: 'underline',
        }
    };
    const {login} = useAuth();

    // const {setIsLoggedIn} = useOutletContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage(""); // Clear previous errors.

        // Await the login function and check its return value.
        const success = await login(email, password);

        if (success) {
            // Navigate to the home page only on successful login.
            setIsLoggedIn(true)
            navigate("/");
        } else {
            // Set an error message if login fails.
            setErrorMessage("로그인에 실패했습니다. 이메일과 비밀번호를 다시 확인해주세요.");
        }
    };

    return (
        <div style={styles.body}>
            <div className="d-flex flex-column min-vh-100">

                {/* Main Content */}
                <main className="flex-grow-1 d-flex align-items-center justify-content-center py-5 px-3">
                    <div className="card shadow-lg" style={{maxWidth: '450px', width: '100%'}}>
                        <div className="card-body p-5">
                            <div className="text-center">
                                <h2 className="h2 fw-bold tracking-tight" style={{color: styles.textPrimary}}>로그인</h2>
                                <p className="mt-2 text-sm" style={{color: styles.textSecondary}}>
                                    계정이 없으신가요?{' '}
                                    <a
                                        href="#"
                                        className="fw-medium"
                                        style={styles.link}
                                        onMouseOver={e => e.currentTarget.style.textDecoration = 'underline'}
                                        onMouseOut={e => e.currentTarget.style.textDecoration = 'none'}
                                    >
                                        회원가입
                                    </a>
                                </p>
                            </div>

                            {/* Conditionally display the error message alert */}
                            {errorMessage && (
                                <div className="mt-4 rounded-lg bg-red-100 p-3 text-sm text-red-700" role="alert">
                                    {errorMessage}
                                </div>
                            )}
                            {/* Login Form */}
                            <form className="mt-4" onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="email-address" className="visually-hidden">이메일 주소</label>
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="form-control form-control-lg"
                                        placeholder="이메일 주소"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="visually-hidden">비밀번호</label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="form-control form-control-lg"
                                        placeholder="비밀번호"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div className="d-flex align-items-center justify-content-end mb-4">
                                    <div className="text-sm">
                                        <a
                                            href="#"
                                            className="fw-medium"
                                            style={styles.link}
                                            onMouseOver={e => e.currentTarget.style.textDecoration = 'underline'}
                                            onMouseOut={e => e.currentTarget.style.textDecoration = 'none'}
                                        >
                                            비밀번호를 잊으셨나요?
                                        </a>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100 py-2 fw-semibold"
                                        style={{backgroundColor: styles.primaryColor, borderColor: styles.primaryColor}}
                                        onClick={handleLogin}
                                    >
                                        로그인
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Login;
