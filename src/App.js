import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn"
import ForgotPassword from "./components/ForgotPassword"
import ErrorPage from "./components/ErrorPage"
import Dashboard from "./components/Dashboard";
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
      {error && <p className="error-message">{error}</p>}
      {loading ? <h2>Loading...</h2> : <>{user ? <Dashboard/> : (
        <Router>
          <Routes>
            <Route exact path='/SignIn' element={<SignIn/>}/>

            <Route exact path='/SignUp' element={<SignUp/>}/>

            <Route exact path='/ForgotPassword' element={<ForgotPassword/>}/>
           
            <Route exact path='*' element={<ErrorPage/>}/>
          </Routes>
        
        </Router>
      )
        
      }</>}
    </div>
  );
}

export default App;



/*
TODO
-
1. implement the start menu 
- add the forgot / reset password functionality [x]
- add first name & last name to the sign up form [x]

-separate the sign up, login, forgot password form into different pages(react router) [X]

- add sign in as guest functionality 
[Will have demo account for each role that you can log in as]

- style the sign in, sign up and reset password forms


2. Implement roles

3. create the bug tracker software functionality
*/
