import React, {useEffect, useState} from 'react';
import useAiCoverLetters from "../hooks/useAiCoverLetters.js";
import {useNavigate, useParams} from "react-router-dom";

const AiCoverLetterDetail = () => {
    const {id} = useParams();
    const {getAiCoverLetter, convertAiToUserCoverLetter, deleteAiCoverLetter} = useAiCoverLetters();
    const [coverLetterDetail, setCoverLetterDetail] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const detail = await getAiCoverLetter(id);
            setCoverLetterDetail(detail);
        };
        fetchData();
    }, [id]); // getAiCoverLetter 제거

    const handleDelete = async () => {
        if (window.confirm("정말로 이 자소서를 삭제하시겠습니까?")) {
            try {
                await deleteAiCoverLetter(id);
                navigate("/cover-letters")
            } catch (error) {
                console.error(error);
            }
        }
    }

    const styles = {
        body: {
            fontFamily: "'Manrope', 'Noto Sans KR', sans-serif",
            backgroundColor: '#f8f9fa',
            color: '#1e293b',
        },
        primaryColor: '#0d7ff2',
        secondaryColor: '#f2f7ff',
        textPrimary: '#1e293b',
        textSecondary: '#64748b',
        borderColor: '#e5e7eb',
        link: {
            color: '#0d7ff2',
            textDecoration: 'none',
            cursor: 'pointer',
        },
        buttonPrimary: {
            backgroundColor: '#0d7ff2',
            color: 'white',
            borderColor: '#0d7ff2',
            fontWeight: 'bold',
        },
        buttonSecondary: {
            backgroundColor: '#f2f7ff',
            color: '#0d7ff2',
            borderColor: '#e5e7eb',
            fontWeight: 'bold',
        },
        preWrap: {
            whiteSpace: 'pre-wrap',
            backgroundColor: '#f8f9fa',
        }
    };

    return (
        <div style={styles.body}>
            <div className="d-flex flex-column min-vh-100">
                <main className="flex-grow-1">
                    <div className="container py-5" style={{maxWidth: '896px'}}>

                        <div className="mb-5">
                            <h1 className="display-5 fw-bold"
                                style={{color: styles.textPrimary}}>{coverLetterDetail?.title}</h1>
                        </div>

                        <div className="d-flex flex-column gap-4">
                            <div className="d-flex gap-2 justify-content-end">
                                <button
                                    className="btn btn-sm"
                                    style={styles.buttonSecondary}
                                    onClick={handleDelete}
                                >
                                    삭제
                                </button>
                            </div>
                            {coverLetterDetail?.items?.length > 0 && coverLetterDetail.items.map((item, index) => {
                                const currentLength = item.content?.length || 0;
                                return (
                                    <div className="card shadow-sm" key={index}>
                                        <div className="card-body p-4">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <h2 className="h4 fw-bold mb-0">{item.question}</h2>
                                                <div className="d-flex align-items-center gap-3">
                                                    <span className="text-muted small">
                                                        {currentLength} / {item.char_limit}자
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="card-text p-3 rounded"
                                               style={styles.preWrap}>{item.content}
                                            </p>
                                            <div className="d-flex gap-2 justify-content-end">
                                                {/*<button className="btn btn-sm" style={styles.buttonSecondary}>수정</button>*/}
                                                {/*<button className="btn btn-sm" style={styles.buttonSecondary}>재생성*/}
                                                {/*</button>*/}
                                            </div>
                                        </div>

                                    </div>
                                );
                            })}
                        </div>

                        {/* 버튼 영역 */}
                        <div className="d-flex justify-content-end mt-5 gap-2">
                            <button
                                className="btn btn-lg px-4"
                                style={styles.buttonPrimary}
                                onClick={() => convertAiToUserCoverLetter(coverLetterDetail.id)}
                            >
                                내 자소서로 변환
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AiCoverLetterDetail;
