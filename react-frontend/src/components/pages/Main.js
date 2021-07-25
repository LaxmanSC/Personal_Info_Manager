import React, {useState, useEffect,useContext } from 'react'
import { Context } from "../../store/appContext"

function Main() {
  
  const {store, actions} = useContext(Context)
  const [numNotes, setNumNotes] = useState(10)
  const Notes = async () => {
    console.log("hello please work")
    const resp = await fetch('/main/', {
      method: "GET",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':"Bearer " + store.token
      },
    });
    console.log("Token is:", store.token)
    if(resp.status === 200) {
      const data = await resp.json();
      // console.log(data.num);
      setNumNotes(data.num);
    }
  }
  useEffect(() => {
    console.log("Het")
    Notes();
    // console.log("useE")
    // setNumNotes(10)
    console.log("NumNotes is", numNotes);

  }, []);
  console.log(numNotes)
  return (
    <>
      HEy this is thee main page!!!
      <div>
        Welcome {store.user}!
      </div>
      <div>
        {numNotes == 0 ?
          <div>
            Create a new note
          </div>
        :
          <div>
            Display notes
          </div>
        }
      </div>
    </>
  )
}

export default Main
