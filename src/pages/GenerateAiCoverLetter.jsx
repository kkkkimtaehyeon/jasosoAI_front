import React, {useState} from 'react';
import useAiCoverLetters from "../hooks/useAiCoverLetters.js";
import AiCoverLetterItems from "../components/AiCoverLetterItems.jsx";
import {useNavigate} from "react-router-dom";
import {v4 as uuidv4} from 'uuid'; // uuid 라이브러리 임포트

const styles = {
    body: {
        fontFamily: "'Manrope', 'Noto Sans KR', sans-serif",
        backgroundColor: '#ffffff',
        color: '#1e293b',
    },
    primaryColor: '#0d7ff2',
    secondaryColor: '#f2f7ff',
    textSecondary: '#64748b',
    buttonPrimary: {
        backgroundColor: '#0d7ff2',
        color: 'white',
        borderColor: '#0d7ff2',
    },
    buttonSecondary: {
        backgroundColor: '#f2f7ff',
        color: '#0d7ff2',
        borderColor: '#f2f7ff',
    },
    loadingOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    spinner: {
        width: '3rem',
        height: '3rem',
        border: '0.25em solid currentColor',
        borderRightColor: 'transparent',
    }
};

const GenerateAiCoverLetter = () => {
    const [items, setItems] = useState([{id: uuidv4(), question: '', char_limit: 0}]);
    const {requestAiCoverLetter} = useAiCoverLetters();
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const WANTED = 'https://www.wanted.co.kr/'
    const ZIGHANG = 'https://zighang.com/'
    const allowedDomains = [WANTED, ZIGHANG];

    const isValidDomain = (url) => {
        return allowedDomains.some(domain => url.startsWith(domain));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (isValidDomain(url) === false) {
            setError("지원하는 채용 공고 URL이 올바르지 않습니다. (현재 원티드, 직행만 지원합니다.)");
            setLoading(false);
            return;
        }

        try {
            const response = await requestAiCoverLetter({
                job_posting_url: url,
                items: items
            });

            const newCoverLetterId = response.data;
            navigate(`/ai/cover-letters/${newCoverLetterId}`);

        } catch (error) {
            if (error.status === 400) {
                alert('먼저 자기소개서를 업로드해주세요.')
                // setError('먼저 자기소개서를 업로드해주세요.');
                return
            }
            setError("AI 자소서 생성 중 오류가 발생했습니다.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddItem = () => {
        const newItem = {id: uuidv4(), question: '', char_limit: 0};
        setItems([...items, newItem]);
    };

    const handleRemoveItem = (id) => {
        if (items.length > 1) {
            setItems(items.filter(q => q.id !== id));
        }
    };

    const handleItemChange = (id, field, value) => {
        setItems(items.map(q => q.id === id ? {...q, [field]: value} : q));
    };

    // --- 여기부터 변경된 부분 ---

    // 폼 유효성 검사 로직
    // 1. URL이 비어있지 않은지 확인 (양쪽 공백 제거 후)
    // 2. 'items' 배열의 모든 항목에 대해 question이 비어있지 않고, char_limit이 0보다 큰지 확인
    const isFormValid = url.trim() !== '' && items.every(
        item => item.question.trim() !== '' && Number(item.char_limit) > 0
    );

    // --- 여기까지 변경된 부분 ---

    return (
        <div style={styles.body}>
            {loading && (
                <div style={styles.loadingOverlay}>
                    <div>
                        <div>
                            <div className="spinner-border text-primary" style={styles.spinner} role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>

                        <div>
                            <h1>AI가 자소서를 쓰고있습니다.</h1>
                        </div>
                    </div>
                </div>
            )}
            <div className="d-flex flex-column min-vh-100">
                <main className="flex-grow-1 container py-5">
                    <div style={{maxWidth: '768px'}} className="mx-auto">
                        <div className="mb-5">
                            <h2 className="h1 fw-bold mb-2">AI 자소서 생성 요청</h2>
                            <p style={{color: styles.textSecondary}}>채용 공고와 이력서를 바탕으로 매력적인 자소서를 만들어 보세요.</p>
                        </div>

                        <form className="d-flex flex-column gap-4" onSubmit={handleSubmit}>
                            {/* Job Posting URL Section */}
                            <div className="card shadow-sm">
                                <div className="card-body p-4">
                                    <label htmlFor="job-posting-url" className="form-label fs-5 fw-semibold">채용 공고
                                        URL</label>
                                    <br/>
                                    <small>현재 원티드, 직행만 지원합니다.</small>
                                    <input
                                        type="url"
                                        className="form-control form-control-lg"
                                        id="job-posting-url"
                                        placeholder="https://example.com/job/12345"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                        required // (선택사항) HTML5 기본 유효성 검사 추가
                                    />
                                </div>
                            </div>

                            {/* CoverLetterQuestions 컴포넌트 */}
                            <AiCoverLetterItems
                                items={items}
                                onItemChange={handleItemChange}
                                onAddItem={handleAddItem}
                                onRemoveItem={handleRemoveItem}
                            />

                            {/* Submit Button */}
                            <div className="d-flex justify-content-end pt-3">
                                <button
                                    type="submit"
                                    className="btn btn-lg fw-bold px-5 py-2"
                                    style={styles.buttonPrimary}
                                    // --- 여기부터 변경된 부분 ---
                                    // 로딩 중이거나 폼이 유효하지 않으면 버튼 비활성화
                                    disabled={loading || !isFormValid}
                                    // --- 여기까지 변경된 부분 ---
                                >
                                    {loading ? "생성 중..." : "생성 요청하기"}
                                </button>
                            </div>

                            {error && (
                                <div className="alert alert-danger mt-3" role="alert">
                                    {error}
                                </div>
                            )}
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default GenerateAiCoverLetter;