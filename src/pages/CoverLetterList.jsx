import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom'; // <-- 추가
import useUserCoverLetters from "../hooks/useUserCoverLetters.js";
import useAiCoverLetters from "../hooks/useAiCoverLetters.js";

const CoverLetterList = () => {
    const styles = {
        body: {
            fontFamily: "'Manrope', 'Noto Sans KR', sans-serif",
            backgroundColor: '#f8f9fa',
            color: '#1e293b',
        },
        primaryColor: '#0d7ff2',
        textPrimary: '#1e293b',
        textSecondary: '#64748b',
        buttonPrimary: {
            backgroundColor: '#0d7ff2',
            color: 'white',
            borderColor: '#0d7ff2',
            fontWeight: '600',
        },
        iconButton: {color: '#64748b'},
        iconButtonDelete: {color: '#dc3545'},
        navPillButton: {color: '#0d7ff2', fontWeight: '500'},
        navPillButtonActive: {backgroundColor: '#0d7ff2', color: 'white', fontWeight: '500'}
    };

    const [activeTab, setActiveTab] = useState('user');

    const {userCoverLetters, getUserCoverLetterList} = useUserCoverLetters();
    const {aiCoverLetters, getAiCoverLetterList} = useAiCoverLetters();

    const navigate = useNavigate();  // <-- useNavigate 훅

    useEffect(() => {
        if (activeTab === 'user') {
            getUserCoverLetterList();
        } else {
            getAiCoverLetterList();
        }
    }, [activeTab]);

    const currentList = activeTab === 'user' ? userCoverLetters : aiCoverLetters;

    const handleRowClick = (id) => {
        // activeTab에 따라 상세 페이지 경로가 다를 수 있으니 분기 처리
        if (activeTab === 'user') {
            navigate(`/user/cover-letters/${id}`);
        } else {
            navigate(`/ai/cover-letters/${id}`);
        }
    };

    return (
        <div style={styles.body}>
            <div className="d-flex flex-column min-vh-100">
                <main className="flex-grow-1 container py-5">

                    <ul className="nav nav-pills mb-4">
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'user' ? 'active' : ''}`}
                                style={activeTab === 'user' ? styles.navPillButtonActive : styles.navPillButton}
                                onClick={() => setActiveTab('user')}>
                                내 자소서
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === 'ai' ? 'active' : ''}`}
                                style={activeTab === 'ai' ? styles.navPillButtonActive : styles.navPillButton}
                                onClick={() => setActiveTab('ai')}>
                                AI 자소서
                            </button>
                        </li>
                    </ul>

                    <div className="card shadow-sm overflow-hidden">
                        <div className="table-responsive">
                            <table className="table table-hover mb-0">
                                <thead style={{backgroundColor: '#f8f9fa'}}>
                                <tr>
                                    <th scope="col" className="px-4 py-3" style={{color: styles.textSecondary}}>제목</th>
                                    <th scope="col" className="px-4 py-3" style={{color: styles.textSecondary}}>생성 날짜
                                    </th>
                                    {/*<th scope="col" className="px-4 py-3" style={{ color: styles.textSecondary }}>내용 미리보기</th>*/}
                                </tr>
                                </thead>
                                <tbody className="bg-white">
                                {currentList.map(coverLetter => (
                                    <tr
                                        key={coverLetter.id}
                                        style={{cursor: 'pointer'}}
                                        onClick={() => handleRowClick(coverLetter.id)}
                                    >
                                        <td className="px-4 py-3"
                                            style={{color: styles.textPrimary}}>{coverLetter.title}</td>
                                        <td className="px-4 py-3"
                                            style={{color: styles.textSecondary}}>{new Date(coverLetter.created_at).toLocaleDateString()}</td>
                                        {/*<td className="px-4 py-3" style={{ color: styles.textSecondary, maxWidth: '300px' }}>*/}
                                        {/*    /!* 내용 미리보기 필요하면 여기에 *!/*/}
                                        {/*</td>*/}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="card-footer d-flex align-items-center justify-content-between">
                            <p className="mb-0" style={{color: styles.textSecondary}}>
                                총 <span className="fw-medium">{currentList.length}</span>개의 문서
                            </p>
                            {/*<div className="d-flex gap-2">*/}
                            {/*    <button className="btn btn-outline-secondary btn-sm">이전</button>*/}
                            {/*    <button className="btn btn-outline-secondary btn-sm">다음</button>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default CoverLetterList;
