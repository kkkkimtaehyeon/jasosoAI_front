import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoute = ({isLoggedIn}) => {
    // const {isLoggedIn} = useOutletContext();

    // Context로부터 가져온 로그인 상태를 확인
    // isLoggedIn이 true이면, 자식 컴포넌트를 보여줌 (<Outlet />)
    // isLoggedIn이 false이면, 로그인 페이지로 이동시킴 (<Navigate />)
    return isLoggedIn ? <Outlet/> : <Navigate to="/login" replace/>;
};

export default ProtectedRoute;