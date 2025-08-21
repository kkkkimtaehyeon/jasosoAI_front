// import React, {useState} from 'react';
// import useAiCoverLetters from "../hooks/useAiCoverLetters.js";
// import AiCoverLetterItems from "../components/AiCoverLetterItems.jsx";
// import {useNavigate} from "react-router-dom";
// import {v4 as uuidv4} from 'uuid'; // uuid 라이브러리 임포트
//
// const styles = {
//     body: {
//         fontFamily: "'Manrope', 'Noto Sans KR', sans-serif",
//         backgroundColor: '#ffffff',
//         color: '#1e293b',
//     },
//     primaryColor: '#0d7ff2',
//     secondaryColor: '#f2f7ff',
//     textSecondary: '#64748b',
//     buttonPrimary: {
//         backgroundColor: '#0d7ff2',
//         color: 'white',
//         borderColor: '#0d7ff2',
//     },
//     buttonSecondary: {
//         backgroundColor: '#f2f7ff',
//         color: '#0d7ff2',
//         borderColor: '#f2f7ff',
//     }
// };
//
// // --- MAIN PAGE COMPONENT ---
// const GenerateAiCoverLetter = () => {
//     const [items, setItems] = useState([{id: uuidv4(), question: '', char_limit: 0}]);
//     const {requestAiCoverLetter} = useAiCoverLetters();
//     const [url, setUrl] = useState("");
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
//     const navigate = useNavigate();
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");
//         setLoading(true);
//
//         try {
//             const response = await requestAiCoverLetter({
//                 job_posting_url: url,
//                 items: items
//             });
//
//             // 응답 데이터에서 id 값을 추출
//             const newCoverLetterId = response.data.id;
//
//             // 새로운 자소서의 id로 이동
//             navigate(`/ai/cover-letters/${newCoverLetterId}`);
//
//         } catch (error) {
//             setError("AI 자소서 생성 중 오류가 발생했습니다.");
//             console.error(error);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     const handleAddItem = () => {
//         const newItem = {id: uuidv4(), question: '', char_limit: 0};
//         setItems([...items, newItem]);
//     };
//
//     const handleRemoveItem = (id) => {
//         if (items.length > 1) {
//             setItems(items.filter(q => q.id !== id));
//         }
//     };
//
//     const handleItemChange = (id, field, value) => {
//         setItems(items.map(q => q.id === id ? {...q, [field]: value} : q));
//     };
//     return (
//         <div style={styles.body}>
//             <div className="d-flex flex-column min-vh-100">
//                 <main className="flex-grow-1 container py-5">
//                     <div style={{maxWidth: '768px'}} className="mx-auto">
//                         <div className="mb-5">
//                             <h2 className="h1 fw-bold mb-2">AI 자소서 생성 요청</h2>
//                             <p style={{color: styles.textSecondary}}>채용 공고와 이력서를 바탕으로 매력적인 자소서를 만들어 보세요.</p>
//                         </div>
//
//                         <form className="d-flex flex-column gap-4" onSubmit={handleSubmit}>
//                             {/* Job Posting URL Section */}
//                             <div className="card shadow-sm">
//                                 <div className="card-body p-4">
//                                     <label htmlFor="job-posting-url" className="form-label fs-5 fw-semibold">채용 공고
//                                         URL</label>
//                                     <br/>
//                                     <small>현재 원티드, 직행만 지원합니다.</small>
//                                     <input
//                                         type="url"
//                                         className="form-control form-control-lg"
//                                         id="job-posting-url"
//                                         placeholder="https://example.com/job/12345"
//                                         value={url}
//                                         onChange={(e) => setUrl(e.target.value)}
//                                     />
//                                 </div>
//                             </div>
//
//                             {/* CoverLetterQuestions 컴포넌트 */}
//                             <AiCoverLetterItems
//                                 items={items}
//                                 onItemChange={handleItemChange}
//                                 onAddItem={handleAddItem}
//                                 onRemoveItem={handleRemoveItem}
//                             />
//
//                             {/* Submit Button */}
//                             <div className="d-flex justify-content-end pt-3">
//                                 <button
//                                     type="submit"
//                                     className="btn btn-lg fw-bold px-5 py-2"
//                                     style={styles.buttonPrimary}
//                                     disabled={loading}
//                                 >
//                                     {loading ? "생성 중..." : "생성 요청하기"}
//                                 </button>
//                             </div>
//
//                             {error && (
//                                 <div className="alert alert-danger mt-3" role="alert">
//                                     {error}
//                                 </div>
//                             )}
//                         </form>
//                     </div>
//                 </main>
//             </div>
//         </div>
//     );
// };
//
// export default GenerateAiCoverLetter;

import React, { useState } from 'react';
import useAiCoverLetters from "../hooks/useAiCoverLetters.js";
import AiCoverLetterItems from "../components/AiCoverLetterItems.jsx";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid'; // uuid 라이브러리 임포트

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
    const [items, setItems] = useState([{ id: uuidv4(), question: '', char_limit: 0 }]);
    const { requestAiCoverLetter } = useAiCoverLetters();
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await requestAiCoverLetter({
                job_posting_url: url,
                items: items
            });

            const newCoverLetterId = response.data.id;
            navigate(`/cover-letters/${newCoverLetterId}`);

        } catch (error) {
            setError("AI 자소서 생성 중 오류가 발생했습니다.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddItem = () => {
        const newItem = { id: uuidv4(), question: '', char_limit: 0 };
        setItems([...items, newItem]);
    };

    const handleRemoveItem = (id) => {
        if (items.length > 1) {
            setItems(items.filter(q => q.id !== id));
        }
    };

    const handleItemChange = (id, field, value) => {
        setItems(items.map(q => q.id === id ? { ...q, [field]: value } : q));
    };

    return (
        <div style={styles.body}>
            {loading && (
                <div style={styles.loadingOverlay}>
                    <div className="spinner-border text-primary" style={styles.spinner} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
            <div className="d-flex flex-column min-vh-100">
                <main className="flex-grow-1 container py-5">
                    <div style={{ maxWidth: '768px' }} className="mx-auto">
                        <div className="mb-5">
                            <h2 className="h1 fw-bold mb-2">AI 자소서 생성 요청</h2>
                            <p style={{ color: styles.textSecondary }}>채용 공고와 이력서를 바탕으로 매력적인 자소서를 만들어 보세요.</p>
                        </div>

                        <form className="d-flex flex-column gap-4" onSubmit={handleSubmit}>
                            {/* Job Posting URL Section */}
                            <div className="card shadow-sm">
                                <div className="card-body p-4">
                                    <label htmlFor="job-posting-url" className="form-label fs-5 fw-semibold">채용 공고 URL</label>
                                    <br />
                                    <small>현재 원티드, 직행만 지원합니다.</small>
                                    <input
                                        type="url"
                                        className="form-control form-control-lg"
                                        id="job-posting-url"
                                        placeholder="https://example.com/job/12345"
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
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
                                    disabled={loading}
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