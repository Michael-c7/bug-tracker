import SignUp from "./components/SignUp"
import Dashboard from "./components/Dashboard";
import { useAuth } from "./firebase"

function App() {
  const currentUser = useAuth()

  return (
    <div>
      {/* <h2>bug tracker app</h2> */}
      {/* <Dashboard/>
      <SignUp/> */}

      {currentUser ? <Dashboard/> : <SignUp/>}
    </div>
  );
}

export default App;
