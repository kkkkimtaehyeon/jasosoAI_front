import {useState} from "react";
import api from "/src/common/api-axios.js";
import {useNavigate} from "react-router-dom";

const useAiCoverLetter = () => {
    const [aiCoverLetters, setAiCoverLetters] = useState([]);
    const [aiCoverLetterDetail, setAiCoverLetterDetail] = useState(null);
    const navigate = useNavigate();

    const requestAiCoverLetter = (requestData) => {
        // api.post() 호출을 반환하여 async/await를 사용할 수 있게 함
        return api.post("/api/cover-letters/ai", requestData);
    };

    const getAiCoverLetterList = () => {
        api.get("/api/cover-letters?type=AI")
            .then(response => {
                setAiCoverLetters(response.data);
                return response.data;
            })
            .catch(error => {
                console.error("Error fetching AI cover letters:", error);
                throw error;

            });
    };

    const deleteAiCoverLetter = async (id) => {
        try {
            const response = await api.delete(`/api/cover-letters/${id}`)
            if (response.status === 204) {
                setAiCoverLetterDetail(prev => prev.filter(letter => letter.id !== id));
            } else {
                console.error("Failed to delete cover letter:", response);
            }
        } catch (error) {
            console.error("Error deleting cover letter:", error);
            throw error;  // 에러를 호출한 쪽으로 전달
        }
    };

    const getAiCoverLetter = async (id) => {
        try {
            const response = await api.get(`/api/cover-letters/${id}`);
            setAiCoverLetterDetail(response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching AI cover letter:", error);
            throw error;
        }
    };

    const convertAiToUserCoverLetter = (id) => {
        api.patch(`/api/cover-letters/${id}/type`)
            .then(response => {
                if (response) {
                    navigate('/cover-letters');
                }
                // setAiCoverLetterDetail(response.data);
                // return response.data;  // 반환값이 필요할 경우
            })
            .catch(error => {
                console.error("Error converting AI cover letter to user cover letter:", error);
                throw error;
            });
    }

    return {
        aiCoverLetters,
        aiCoverLetterDetail,
        requestAiCoverLetter,
        getAiCoverLetterList,
        getAiCoverLetter,
        deleteAiCoverLetter,
        convertAiToUserCoverLetter
    };
};

export default useAiCoverLetter;
