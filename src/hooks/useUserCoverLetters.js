import {useState} from "react";
import api from "../common/api-axios.js";

const useUserCoverLetter = () => {

    const [userCoverLetters, setUserCoverLetters] = useState([]);
    const [userCoverLetterDetail, setUserCoverLetterDetail] = useState(null);


    const uploadUserCoverLetter = (userCoverLetter) => {
        api.post('/api/cover-letters/user', userCoverLetter)
            .then(response => {
                setUserCoverLetters(prev => [...prev, response.data]);
            })
            .catch(error => {
                console.error("Error uploading cover letter:", error);
            });
    }

    const deleteUserCoverLetter = async (id) => {
        try {
            const response = await api.delete(`/api/cover-letters/${id}`);
            if (response.status === 204) {
                setUserCoverLetters(prev => prev.filter(letter => letter.id !== id));
            } else {
                console.error("Failed to delete cover letter:", response);
            }

        } catch (error) {
            console.error("Error deleting cover letter:", error);
            throw error;  // 에러를 호출한 쪽으로 전달
        }
    }

    const getUserCoverLetterList = () => {
        api.get('/api/cover-letters?type=USER')
            .then(response => {
                setUserCoverLetters(response.data);
                return response.data
            })
            .catch(error => {
                console.error("Error fetching cover letters:", error);
                throw error;
            });
    }

    const getUserCoverLetter = async (id) => {
        try {
            const response = await api.get(`/api/cover-letters/${id}`);
            setUserCoverLetterDetail(response.data);
            return response.data;  // 이걸 반환해야 호출한 쪽에서 데이터를 받을 수 있음
        } catch (error) {
            console.error("Error fetching cover letters:", error);
            throw error;
        }
    }

    const updateCoverLetter = (id, request) => {
        api.patch(`/api/cover-letters/${id}`, request)
            .then(response => {
                setUserCoverLetterDetail(response.data);
                setUserCoverLetters(prev => prev.map(letter => letter.id === id ? response.data : letter));
            })
            .catch(error => {
                console.error("Error updating cover letter:", error);
            });
    }


    return {
        userCoverLetters,
        userCoverLetterDetail,
        uploadUserCoverLetter,
        deleteUserCoverLetter,
        getUserCoverLetterList,
        getUserCoverLetter,
        updateCoverLetter
    };
}

export default useUserCoverLetter;

