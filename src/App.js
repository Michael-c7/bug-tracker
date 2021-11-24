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



/*
https://dev.to/jexperton/how-to-fix-the-react-memory-leak-warning-d4i

https://www.rockyourcode.com/avoid-memory-leak-with-react-setstate-on-an-unmounted-component/#:~:text=Specifically%2C%20calling%20setState()%20in,memory%20leaks%20with%20data%20fetching.

https://medium.com/trabe/avoid-updates-on-unmounted-react-components-2fbadab17ad2

https://stackoverflow.com/questions/54954385/react-useeffect-causing-cant-perform-a-react-state-update-on-an-unmounted-comp

https://www.debuggr.io/react-update-unmounted-component/
*/
