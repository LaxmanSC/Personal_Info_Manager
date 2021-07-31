import './Note.css'
import React, {useContext, useState, useEffect} from 'react'
import { Context } from "../store/appContext"
import { useHistory } from 'react-router-dom'

// import DeleteNote from 'note_operations/DeleteNote'

function Note({Title, Info, Id, Tags}) {
  const history = useHistory()
  const {store, actions} = useContext(Context)

  const EditNote = async () => {
    history.push({
      pathname: `/main/edit`,
      state: {Title, Info, Id, Tags}
    }); 
    // const resp = await fetch(`/main/edit_${Id}`, {
    //   method: 'POST',
    //   mode: 'cors',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': "Bearer " + store.token
    //   }
    // })
  }

  const DeleteNote = async () => {
    const resp = await fetch('/main/delete', {
      method: "POST",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':"Bearer " + store.token
      },
      body: JSON.stringify({Id: Id})
    });
    if(resp.status === 200) {
      const data = await resp.json();
      window.location.reload(false);
    }
  }
  console.log("title",Title)
  console.log("NoteId", Id)
  console.log("Tags", Tags);

  useEffect (() => {
    
  }, [])
  return (
    <div className="notepage">
      <div className="title">
        {Title}
      </div>
      <div className="noteinfo">
        Info:
        {Info}
      </div>
      <div className="Tags">
        {Tags}
      </div>
      <div className="delete" onClick={DeleteNote}>
        <i class="fas fa-window-close fa-3x"></i>
      </div>
      <div className="Edit" onClick={EditNote}>
        <i class="fas fa-pencil-alt fa-2x"></i>
      </div>
    </div>
  )
}

export default Note
