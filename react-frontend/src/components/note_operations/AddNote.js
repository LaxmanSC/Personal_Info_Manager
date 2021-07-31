import React, { useContext } from 'react'
import { Context } from "../../store/appContext"
import Note from '../Note'

function AddNote(toggle) {
  const { store, actions } = useContext(Context)

  const HandleSubmit = async(e) => {
    e.preventDefault()
    const {Title, Notetext, Tags} = e.target.elements
    const resp = await fetch('/main/addNote', {
      method: "POST",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':"Bearer " + store.token
      },
      body: JSON.stringify({
        Title: Title.value,
        Notetext: Notetext.value,
        Tags: Tags.value
      })
    });
    toggle = !toggle;
    window.location.reload(false);

  }

  return (
    <div className="Popup">
      <div className="content">
        <form onSubmit={HandleSubmit}>
            <br />
            <span>
              <label for="Title">Title:   
              <input type="text" name="Title" id="Title" placeholder="Title of note"/>
              </label>
            </span>
            <br />
            <label for="Notetext">Notetext:
              <input type="text" name="Notetext" id="Notetext" placeholder="Enter Note" />
            </label>
            <br />
            <label for="Tags">Tags:
              <input type="text" name="Tags" id="Tags" placeholder="Tags"/>
            </label>
            <br />
            <input type="submit" value="Add Note" />
        </form>
      </div>
    </div>
  )
}

export default AddNote
