import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn"
import ForgotPassword from "./components/ForgotPassword";
import SuccessPassword from "./components/SuccessPassword";
import TryDemoAccount from "./components/TryDemoAccount";
import ErrorPage from "./components/ErrorPage"
import Dashboard from "./components/Dashboard";
import Loading from "./components/Loading"
import ErrorMsg from "./components/ErrorMsg"
import { useUserContext } from "./context/userContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  const {loading, error, user} = useUserContext()

  return (
    <div>
      {error && <ErrorMsg/>}
      {loading ? <Loading/> : <> {user ? <Dashboard/> : (
        <Router>
          <Routes>
            <Route path='/SignIn' element={<SignIn/>}/>

            <Route path='/' element={<SignIn/>}/>

            <Route path='/SignUp' element={<SignUp/>}/>

            <Route path='/ForgotPassword' element={<ForgotPassword/>}/>

            <Route path='/TryDemoAccount' element={<TryDemoAccount/>}/>

            <Route path='/SuccessPassword' element={<SuccessPassword/>}/>

            <Route exact path='*' element={<ErrorPage/>}/>
          </Routes>
        </Router>
      )}</>}
    </div>
  );
}

export default App;