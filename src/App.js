import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn"
import ForgotPassword from "./components/ForgotPassword"
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
      {loading ? <Loading/> : <>{user ? <Dashboard/> : (
        <Router>
          <Routes>
            <Route exact path='/SignIn' element={<SignIn/>}/>

            <Route exact path='/SignUp' element={<SignUp/>}/>

            <Route exact path='/ForgotPassword' element={<ForgotPassword/>}/>
           
            <Route exact path='*' element={<ErrorPage/>}/>
          </Routes>
        
        </Router>
      )}</>}
    </div>
  );
}

export default App;



/*
TODO
-
1. style the menus
- sign in [X]
- sign up [X]
- reset password forms [X]
- proper loading animation
- error msg
- send email reset link msg


2. Implement roles

3. create the bug tracker software functionality
*/
