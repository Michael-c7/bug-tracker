import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn"
import ForgotPassword from "./components/ForgotPassword"
import Dashboard from "./components/Dashboard";
import { useUserContext } from "./context/userContext";

function App() {
  const {loading, error, user} = useUserContext()

  return (
    <div>
      {error && <p className="error-message">{error}</p>}
      {loading ? <h2>Loading...</h2> : <>{user ? <Dashboard/> : <SignIn/>}</>}
    

    
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
- add sign in as guest functionality
  -separate the sign up,login,forgot password form into different pages(react router)

2. Implement roles


3. create the bug tracker software functionality
*/
