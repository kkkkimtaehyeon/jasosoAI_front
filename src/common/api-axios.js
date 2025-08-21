// api/axiosInstance.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true, // 쿠키 포함 요청
});

// 응답 인터셉터
api.interceptors.response.use(
    (response) => response, // 성공 응답은 그대로 반환
    (error) => {
        if (error.response && error.response.status === 401) {
            // 401 Unauthorized → 로그인 페이지로 이동
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
