import React, {useContext} from 'react'
// import { BrowserRouter as Router,Switch, Route} from "react-router-dom";
import { Context } from "../../store/appContext"
import { useHistory } from 'react-router'

export default function Login() {
  // const [error, setError] = useState("");
  const { store, actions } = useContext(Context)
  const history = useHistory()

  function Submit(e) {
    e.preventDefault()
    const {username, password } = e.target.elements
    actions.login(username, password)
  }

  if(store.token && store.token!=="" && store.token !==undefined) history.push("/main")

  return (
    <>
      <h1>Login Page</h1>
      {(store.token && store.token!=="" && store.token !==undefined) ? "You are logged in with token:" + store.token : 
        <div>
          <form onSubmit={Submit}>
            <label for="username">Username:
              <input type="text" name="username" id="username" required />
            </label>
            <label for="password">Password:
              <input type="password" name="password" id="password" required />
            </label>
            <input type="submit" value="Login" />
          </form>
          {/* <i class="fa-solid fa-magnifying-glass"></i> */}

        </div>
      }
    </>
  )
}
