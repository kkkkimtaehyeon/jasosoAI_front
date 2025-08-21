import React, {useState} from "react";
import api from "../common/api-axios.js";
import {useNavigate} from "react-router-dom";

const FeedbackPage = () => {

    const styles = {
        body: {
            fontFamily: "'Manrope', 'Noto Sans KR', sans-serif",
            backgroundColor: '#ffffff',
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
        }
    };

    const [content, setContent] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        api.post('/api/users/feedback', {'content': content})
            .then(res => {
                if (res.status === 201) {
                    alert('피드백이 정상적으로 제출되었습니다.');
                    navigate('/cover-letters');
                }
            })
            .catch(err => {
                alert('피드백 제출 중 오류가 발생했습니다.');
                console.log(err);
            })

    }

    return (
        <div style={styles.body}>
            <div className="d-flex flex-column min-vh-100">
                <main className="flex-grow-1 container py-5">
                    <div style={{maxWidth: '768px'}} className="mx-auto">
                        <div className="mb-5">
                            <h2 className="h1 fw-bold mb-2">피드백</h2>
                            <p style={{color: styles.textSecondary}}>
                                개발자에게 피드백은 큰 힘이 됩니다.
                                <br/>
                                필요한 기능이나 발견한 오류가 있다면 작성해주세요.
                            </p>
                        </div>

                        <form className="d-flex flex-column gap-4" onSubmit={handleSubmit}>
                            {/* Job Posting URL Section */}
                            <div className="card shadow-sm rounded-5">
                                <div className="card-body p-4">
                                    <br/>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        id="job-posting-url"
                                        placeholder="ex. ~한 기능이 더 필요해요."
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                </div>
                            </div>


                            {/* Submit Button */}
                            <div className="d-flex justify-content-end pt-3">
                                <button
                                    type="submit"
                                    className="btn btn-lg fw-bold px-5 py-2"
                                    style={styles.buttonPrimary}
                                    disabled={loading}
                                >
                                    {loading ? "제출 중..." : "제출하기"}
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


}

export default FeedbackPage;