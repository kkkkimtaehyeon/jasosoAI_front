import React from "react";

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
    }
};

const TrashIcon = () => (
    <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM200,208H56V64H200Z"></path></svg>
);

const CoverLetterQuestions = ({ questions, onQuestionChange, onAddQuestion, onRemoveQuestion }) => {
    return (
        <div className="d-flex flex-column gap-4">
            <h3 className="h2 fw-semibold">자소서 항목</h3>
            {questions.map((q, index) => (
                <div key={q.id} className="card question-item shadow-sm">
                    <div className="card-body p-4 d-flex flex-column gap-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <label htmlFor={`question-prompt-${q.id}`} className="form-label fs-5 fw-semibold mb-0">항목 {index + 1}</label>
                            {questions.length > 1 && (
                                <button type="button" className="btn btn-link text-secondary p-0" onClick={() => onRemoveQuestion(q.id)}>
                                    <TrashIcon />
                                </button>
                            )}
                        </div>
                        <input
                            type="text"
                            id={`question-prompt-${q.id}`}
                            className="form-control"
                            placeholder="질문을 입력하세요 (예: 성장과정을 기술하시오)"
                            value={q.question}
                            onChange={(e) => onQuestionChange(q.id, 'question', e.target.value)}
                        />
                        <textarea
                            id={`question-answer-${q.id}`}
                            className="form-control"
                            rows="5"
                            placeholder="자소서 항목 내용을 입력해주세요."
                            value={q.answer}
                            onChange={(e) => onQuestionChange(q.id, 'content', e.target.value)}
                        ></textarea>
                        <div>
                            <label htmlFor={`char-limit-${q.id}`} className="form-label text-sm fw-medium mb-1" style={{color: styles.textSecondary}}>글자 수 제한</label>
                            <select
                                id={`char-limit-${q.id}`}
                                className="form-select"
                                value={q.char_limit}
                                onChange={(e) => onQuestionChange(q.id, 'char_limit', e.target.value)}
                            >
                                <option>제한 없음</option>
                                <option>500자</option>
                                <option>700자</option>
                                <option>1000자</option>
                                <option>직접 입력</option>
                            </select>
                        </div>
                    </div>
                </div>
            ))}
            <button type="button" className="btn btn-lg w-100" style={styles.buttonSecondary} onClick={onAddQuestion}>항목 추가하기</button>
        </div>
    );
};

export default CoverLetterQuestions;