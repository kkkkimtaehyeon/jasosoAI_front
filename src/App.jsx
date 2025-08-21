import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login.jsx";
import GenerateAiCoverLetter from "./pages/GenerateAiCoverLetter.jsx";
import AiCoverLetterDetail from "./pages/AiCoverLetterDetail.jsx";
import CoverLetterList from "./pages/CoverLetterList.jsx";
import UserCoverLetterUpload from "./pages/UserCoverLetterUpload.jsx";
import Layout from "./layout/Layout.jsx";
import Index from "./components/Index.jsx";
import {useEffect, useState} from "react";
import {AuthProvider} from "./contexts/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import UserCoverLetterDetail from "./components/UserCoverLetterDetail.jsx";
import FeedbackPage from "./pages/FeedbackPage.jsx";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        // 앱 시작 시 localStorage 값 확인
        return localStorage.getItem("isLoggedIn") === "true";
    });

    useEffect(() => {
        // isLoggedIn이 바뀔 때 localStorage에 저장
        localStorage.setItem("isLoggedIn", isLoggedIn);
    }, [isLoggedIn]);

    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}>
                        <Route index element={<Index/>}/>
                        <Route path={"login"} element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
                        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn}/>}>
                            <Route path={"ai/cover-letters/generate"} element={<GenerateAiCoverLetter/>}/>
                            <Route path={"ai/cover-letters/:id"} element={<AiCoverLetterDetail/>}/>
                            <Route path={"cover-letters"} element={<CoverLetterList/>}/>
                            <Route path={"user/cover-letters/upload"} element={<UserCoverLetterUpload/>}/>
                            <Route path={"user/cover-letters/:id"} element={<UserCoverLetterDetail/>}/>
                            <Route path={"feedback"} element={<FeedbackPage/>}/>
                        </Route>
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
