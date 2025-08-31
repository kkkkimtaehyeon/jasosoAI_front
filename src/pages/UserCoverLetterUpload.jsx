import React, { useState } from 'react';
import useUserCoverLetter from "../hooks/useUserCoverLetters.js";
import {useNavigate} from "react-router-dom";

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
        fontWeight: '600',
    },
    buttonSecondary: {
        backgroundColor: '#f2f7ff',
        color: '#0d7ff2',
        borderColor: '#e5e7eb',
        fontWeight: 'bold',
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
    },
    navPillButton: {
        color: '#0d7ff2',
        fontWeight: '500'
    },
    navPillButtonActive: {
        backgroundColor: '#0d7ff2',
        color: 'white',
        fontWeight: '500'
    }
};

const UploadIcon = () => (
    <svg style={{width: '4rem', height: '4rem', color: '#adb5bd'}} fill="none" stroke="currentColor" strokeWidth="1.5"
         viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.33-2.34 3.75 3.75 0 013.75 5.738 4.5 4.5 0 01-8.665 2.768"
            strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
);

const CoverLetterQuestions = ({ questions, onQuestionChange, onAddQuestion, onRemoveQuestion }) => {
    return (
        <div className="card shadow-sm">
            <div className="card-body p-4 d-flex flex-column gap-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <h2 className="fs-5 fw-semibold mb-0">자소서 항목</h2>
                    <button type="button" className="btn btn-sm btn-outline-primary" onClick={onAddQuestion}>+ 항목 추가</button>
                </div>
                {questions.map((item, index) => (
                    <div key={item.id} className="d-flex flex-column gap-3 border p-3 rounded-3 bg-light">
                        <div className="d-flex justify-content-between">
                            <label className="form-label fw-medium" htmlFor={`question-${item.id}`}>
                                항목 {index + 1}
                            </label>
                            {questions.length > 1 && (
                                <button
                                    type="button"
                                    className="btn-close"
                                    aria-label="Remove item"
                                    onClick={() => onRemoveQuestion(item.id)}
                                ></button>
                            )}
                        </div>
                        <input
                            type="text"
                            className="form-control mb-2"
                            id={`question-${item.id}`}
                            placeholder="질문을 입력하세요."
                            value={item.question}
                            onChange={(e) => onQuestionChange(item.id, 'question', e.target.value)}
                        />
                        <div className="d-flex align-items-center">
                            <label htmlFor={`limit-${item.id}`} className="form-label mb-0 me-2 text-secondary fw-medium">
                                글자수 제한:
                            </label>
                            <input
                                type="number"
                                className="form-control form-control-sm w-auto me-2"
                                id={`limit-${item.id}`}
                                value={item.limit === '제한 없음' ? '' : item.limit}
                                placeholder="제한 없음"
                                onChange={(e) => onQuestionChange(item.id, 'limit', e.target.value === '' ? '제한 없음' : e.target.value)}
                            />
                        </div>
                        <textarea
                            className="form-control"
                            rows="5"
                            placeholder="내용을 입력하세요."
                            value={item.content}
                            onChange={(e) => onQuestionChange(item.id, 'content', e.target.value)}
                        />
                        <div className="text-end text-sm text-secondary">
                            {item.content.length} / {item.limit}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};


// --- PAGE-SPECIFIC COMPONENT (UPDATED) ---
const App = () => {
    const [uploadMethod, setUploadMethod] = useState('manual');
    const [title, setTitle] = useState('');
    const [items, setItems] = useState([{id: 1, question: '', limit: '제한 없음', content: ''}]);
    const {uploadUserCoverLetter} = useUserCoverLetter();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태 추가
    const navigate = useNavigate();

    // Mock data for the file upload list
    const uploadedFiles = [
        {id: 1, name: 'Resume_Sophia_Lee.pdf', date: '2024년 1월 15일', status: '업로드 완료', statusType: 'completed'},
        {id: 2, name: 'Resume_Sophia_Lee_v2.docx', date: '2023년 12월 20일', status: '업로드 완료', statusType: 'completed'},
        {id: 3, name: 'Resume_Sophia_Lee_old.pdf', date: '2023년 11월 5일', status: '오래된 버전', statusType: 'old'},
    ];

    // --- Handlers for manual input form ---
    const handleAddItem = () => {
        const newItem = {id: Date.now(), question: '', limit: '제한 없음', content: ''};
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false); // 업로드 시작 시 성공 상태 초기화
        setErrorMessage(""); // 업로드 시작 시 에러 메시지 초기화

        try {
            await uploadUserCoverLetter({
                title,
                items: items.map(item => ({
                    question: item.question,
                    char_limit: item.limit === "제한 없음" ? 0 : parseInt(item.limit),
                    content: item.content
                }))
            });

            setSuccess(true);
            setTitle("");
            setItems([{id: Date.now(), question: "", limit: "제한 없음", content: ""}]);

            alert('자소서가 추가되었습니다.')
            navigate('/cover-letters')
        } catch (error) {
            console.error("Upload failed:", error);
            setErrorMessage("자소서 업로드에 실패했습니다. 다시 시도해주세요.");
        } finally {
            setLoading(false);
        }
    };

    const isFormValid =
        title.trim() !== '' &&
        items.every(item => item.question.trim() !== '' && item.content.trim() !== '');

    return (
        <main className="flex-grow-1 container py-5">
            <div style={{maxWidth: '896px'}} className="mx-auto">
                {/* --- TABS --- */}


                <ul className="nav nav-pills mb-4">
                    <li className="nav-item">
                        <button
                            className={`nav-link ${uploadMethod === 'manual' ? 'active' : ''}`}
                            style={uploadMethod === 'manual' ? styles.navPillButtonActive : styles.navPillButton}
                            onClick={() => setUploadMethod('manual')}>
                            직접 입력
                        </button>
                    </li>
                    {/*<li className="nav-item">*/}
                    {/* <button*/}
                    {/* className={`nav-link ${uploadMethod === 'file' ? 'active' : ''}`}*/}
                    {/* style={uploadMethod === 'file' ? styles.navPillButtonActive : styles.navPillButton}*/}
                    {/* onClick={() => setUploadMethod('file')}>*/}
                    {/* 파일 업로드*/}
                    {/* </button>*/}
                    {/*</li>*/}
                </ul>


                <p>
                    <strong>모든 자소서의 내용은 암호화되어 안전하게 저장됩니다. </strong>
                </p>


                {/* --- CONDITIONAL UI --- */}
                {uploadMethod === 'file' && (
                    <div>
                        <section className="mb-5">
                            <div
                                className="d-flex flex-column align-items-center justify-content-center w-100 p-5 rounded-3 text-center"
                                style={styles.uploadBox}>
                                <UploadIcon/>
                                <h3 className="h5 fw-semibold mb-1">파일을 여기로 드래그 앤 드롭하세요</h3>
                                <p style={{color: styles.textSecondary}} className="mb-4">PDF, DOC, DOCX 파일 형식을
                                    지원합니다.</p>
                                <button className="btn" style={styles.buttonPrimary}>파일 선택</button>
                            </div>
                        </section>
                        <section>
                            <h3 className="h3 fw-bold mb-4" style={{color: styles.textPrimary}}>업로드된 파일</h3>
                            <div className="card shadow-sm overflow-hidden">
                                {/* File list table... */}
                                <div className="table-responsive">
                                    <table className="table mb-0">
                                        <thead style={{backgroundColor: '#f8f9fa'}}>
                                        <tr>
                                            <th scope="col"
                                                className="px-4 py-3 text-start text-xs fw-medium text-uppercase"
                                                style={{color: styles.textSecondary}}>파일 이름
                                            </th>
                                            <th scope="col"
                                                className="px-4 py-3 text-start text-xs fw-medium text-uppercase"
                                                style={{color: styles.textSecondary}}>업로드 날짜
                                            </th>
                                            <th scope="col"
                                                className="px-4 py-3 text-start text-xs fw-medium text-uppercase"
                                                style={{color: styles.textSecondary}}>상태
                                            </th>
                                            <th scope="col" className="px-4 py-3"></th>
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                        {uploadedFiles.map(file => (
                                            <tr key={file.id}>
                                                <td className="px-4 py-3 align-middle fw-medium"
                                                    style={{color: styles.textPrimary}}>{file.name}</td>
                                                <td className="px-4 py-3 align-middle"
                                                    style={{color: styles.textSecondary}}>{file.date}</td>
                                                <td className="px-4 py-3 align-middle">
                                                    <span className="badge rounded-pill fw-semibold px-3 py-2"
                                                          style={file.statusType === 'completed' ? styles.statusBadgeCompleted : styles.statusBadgeOld}>{file.status}</span>
                                                </td>
                                                <td className="px-4 py-3 align-middle text-end">
                                                    <a href="#" className="fw-medium" style={{
                                                        color: styles.primaryColor,
                                                        textDecoration: 'none'
                                                    }}>보기</a>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </section>
                    </div>
                )}

                {success && (
                    <div className="alert alert-success" role="alert">
                        업로드가 성공적으로 완료되었습니다!
                    </div>
                )}

                {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )}

                {uploadMethod === 'manual' && (
                    <form className="d-flex flex-column gap-4" onSubmit={handleSubmit}>
                        <div className="card shadow-sm">
                            <div className="card-body p-4">
                                <label htmlFor="cover-letter-title" className="form-label fs-5 fw-semibold">자소서
                                    제목</label>
                                <input type="text"
                                       className="form-control form-control-lg"
                                       id="cover-letter-title"
                                       placeholder="예: OO회사 백엔드 개발자 지원"
                                       value={title}
                                       onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                        </div>
                        <CoverLetterQuestions
                            questions={items}
                            onQuestionChange={handleItemChange}
                            onAddQuestion={handleAddItem}
                            onRemoveQuestion={handleRemoveItem}
                        />

                        <div className="d-flex justify-content-end pt-3">
                            <button
                                type="submit"
                                className="btn btn-lg px-5 py-2"
                                style={styles.buttonPrimary}
                                disabled={!isFormValid}>
                                저장하기
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </main>
    );
};

export default App;
