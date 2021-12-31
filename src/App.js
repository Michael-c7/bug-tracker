// auth components
import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn"
import ForgotPassword from "./components/ForgotPassword";
import SuccessPassword from "./components/SuccessPassword";
import TryDemoAccount from "./components/TryDemoAccount";
import ErrorPage from "./components/ErrorPage"
import Loading from "./components/Loading"
import ErrorMsg from "./components/ErrorMsg"
// dashboard components
import Dashboard from "./components/Dashboard";
import Home from "./components/dashboard_components/Home";
import Projects from "./components/dashboard_components/Projects";
import Tickets from "./components/dashboard_components/Tickets";
import RoleManagement from "./components/dashboard_components/RoleManagement";
// sub tabs
import ProjectDetails from "./components/dashboard_components/ProjectDetails";


import { useUserContext } from "./context/userContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";

function App() {
  const {loading, error, user} = useUserContext()

  return (
    <div>
      <Router>
        {error && <ErrorMsg/>}
        {loading ? <Loading/> : <> {user ? (
        <Routes>
          <Route path="dashboard" element={<Dashboard/>}>
            <Route path="home" element={<Home/>}/>
            <Route path="Projects" element={<Projects/>}/>
            <Route path="Tickets" element={<Tickets/>}/>
            <Route path="RoleManagement" element={<RoleManagement/>}/>
            <Route path="projectDetails/:id" element={<ProjectDetails/>}/>

          </Route>
          <Route path="*" element={<Navigate to="/dashboard/home"/>}/>
        </Routes>
        ) : (
          <Routes>
            <Route path="/SignIn" element={<SignIn/>}/>
            <Route path="/SignUp" element={<SignUp/>}/>
            <Route path="/ForgotPassword" element={<ForgotPassword/>}/>
            <Route path="/TryDemoAccount" element={<TryDemoAccount/>}/>
            <Route path="/SuccessPassword" element={<SuccessPassword/>}/>
            <Route path="*" element={<Navigate to="/SignIn"/>}/>
          </Routes>
        )}</>}
      </Router>
    </div>
  );
}

export default App;