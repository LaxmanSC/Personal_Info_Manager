import React, {setState, useState} from 'react'
import { Link } from 'react-router-dom';

function Signup() {
  const [error, setError] = useState("");
  function submit(e) {
    e.preventDefault()
    const {username, password } = e.target.elements
    fetch('/auth/register',{
      method: "POST", 
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    }).then(response => response.json())
    .then(json => {
      setError(json.error);
    })
  }



  return (
    <>
      <div>
        <form onSubmit={submit}>
          <label for="username">Username:
            <input type="text" name="username" id="username" required />
          </label>
          <label for="password">Password:
            <input type="password" name="password" id="password" required />
          </label>
          <input type="submit" value="Register" />
        </form>
      </div>
      <div>
        { error }
      </div>
      <div>
        If you are already an user of this application then please 
        <Link to="/Login"> Login</Link>
      </div>
    </>
  )
}

export default Signup
