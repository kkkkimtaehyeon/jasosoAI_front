import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import useUserCoverLetters from "../hooks/useUserCoverLetters.js";

const UserCoverLetterDetail = () => {
    const styles = {
        body: {
            fontFamily: "'Manrope', 'Noto Sans KR', sans-serif",
            backgroundColor: '#f8f9fa',
            color: '#1e293b',
        },
        primaryColor: '#0d7ff2',
        secondaryColor: '#f2f7ff',
        textSecondary: '#64748b',
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

    const {id} = useParams();
    const [coverLetterDetail, setCoverLetterDetail] = useState(null);
    const {getUserCoverLetter, updateCoverLetter, deleteUserCoverLetter} = useUserCoverLetters();

    const [isEditing, setIsEditing] = useState(false);
    const [editedItems, setEditedItems] = useState([]);
    const [saveMessage, setSaveMessage] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const detail = await getUserCoverLetter(id);
            setCoverLetterDetail(detail);
            setEditedItems(detail.items.map(item => ({
                ...item,
                content: item.content || ""
            })));
        };
        fetchData();
    }, [id]);

    const handleChange = (index, newValue) => {
        setEditedItems(prev => {
            const updated = [...prev];
            updated[index] = {...updated[index], content: newValue};
            return updated;
        });
    };

    const handleSave = async () => {
        setIsSaving(true);
        setSaveMessage("");

        try {
            await updateCoverLetter(id, {
                ...coverLetterDetail,
                items: editedItems
            });

            setCoverLetterDetail(prev => ({
                ...prev,
                items: editedItems
            }));
            setIsEditing(false);
            setSaveMessage("자소서가 성공적으로 수정되었습니다!");

            setTimeout(() => setSaveMessage(""), 3000);
        } catch (error) {
            console.error(error);
            setSaveMessage("수정 중 오류가 발생했습니다. 다시 시도해주세요.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("정말로 이 자소서를 삭제하시겠습니까?")) {
            try {
                await deleteUserCoverLetter(id);
                setSaveMessage("자소서가 성공적으로 삭제되었습니다!");
                navigate("/cover-letters");
            } catch (error) {
                console.error(error);
                setSaveMessage("삭제 중 오류가 발생했습니다. 다시 시도해주세요.");
            }
        }
    }

    if (!coverLetterDetail) return null;

    return (
        <div style={styles.body}>
            <div className="d-flex flex-column min-vh-100">
                <main className="flex-grow-1">
                    <div className="container py-5" style={{maxWidth: '896px'}}>
                        <div className="mb-5">
                            <h1 className="display-5 fw-bold" style={{color: styles.textPrimary}}>{coverLetterDetail?.title}</h1>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h1 className="h3 fw-bold mb-0">자소서 상세</h1>
                            {isEditing ? (
                                <div className="d-flex gap-2">
                                    <button
                                        className="btn btn-sm"
                                        style={styles.buttonPrimary}
                                        onClick={handleSave}
                                        disabled={isSaving}
                                    >
                                        {isSaving ? "저장 중..." : "저장"}
                                    </button>
                                    <button
                                        className="btn btn-sm"
                                        style={styles.buttonSecondary}
                                        onClick={() => setIsEditing(false)}
                                        disabled={isSaving}
                                    >
                                        취소
                                    </button>
                                </div>
                            ) : (
                                <div className="d-flex gap-2">
                                    <button
                                        className="btn btn-sm"
                                        style={styles.buttonSecondary}
                                        onClick={() => setIsEditing(true)}
                                    >
                                        수정
                                    </button>
                                    <button
                                        className="btn btn-sm"
                                        style={styles.buttonSecondary}
                                        onClick={handleDelete}
                                    >
                                        삭제
                                    </button>

                                </div>


                            )}
                        </div>

                        {saveMessage && (
                            <div
                                className={`alert ${saveMessage.includes("성공") ? "alert-success" : "alert-danger"}`}
                            >
                            {saveMessage}
                            </div>
                        )}

                        <div className="d-flex flex-column gap-4">
                            {(isEditing ? editedItems : coverLetterDetail.items).map((item, index) => {
                                const currentLength = item.content?.length || 0;
                                return (
                                    <div key={item.id} className="card shadow-sm">
                                        <div className="card-body p-4">
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <h2 className="h5 fw-bold mb-0">{item.question}</h2>
                                                <span className="text-muted small">
                                                    {currentLength} / {item.char_limit}자
                                                </span>
                                            </div>

                                            {isEditing ? (
                                                <textarea
                                                    className={`form-control ${item.char_limit > 0 && currentLength > item.char_limit ? 'border-danger' : ''}`}
                                                    rows="6"
                                                    maxLength={item.char_limit > 0 ? item.char_limit : undefined}
                                                    value={editedItems[index]?.content || ""}
                                                    onChange={(e) => handleChange(index, e.target.value)}
                                                />
                                            ) : (
                                                <p className="card-text p-3 rounded" style={styles.preWrap}>
                                                    {item.content}
                                                </p>
                                            )}

                                            {isEditing && item.char_limit > 0 && currentLength > item.char_limit && (
                                                <small className="text-danger">
                                                    글자 수 제한을 초과했습니다.
                                                </small>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default UserCoverLetterDetail;
