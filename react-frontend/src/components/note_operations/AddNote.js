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
  // const InfoStyle ={
  //   height: 100,
  // }

  return (
    <div className="Popup">
      <div className="content">
        <form onSubmit={HandleSubmit}>
            <br />

              <label for="Title">Title:   
              <input type="text" name="Title" id="Title" placeholder="Title of note"/>
              </label>
            <br />
            <br />
            <label for="Notetext">
              <span className="Notetitle">
                Notetext:
              </span>
              {/* <input type="text" multiline rows ="10"  name="Notetext" id="Notetext" placeholder="Enter Note" /> */}
              <textarea rows="4" name="Notetext" id="Notetext" placeholder="Enter Note Info" cols="50"> 
              </textarea>
            </label>
            <br />
            <br />
            <label for="Tags">Tags:
              <input type="text" name="Tags" id="Tags" placeholder="Tags"/>
            </label>
            <br />
            <br />
            <input type="submit" value="Add Note" />
        </form>
      </div>
    </div>
  )
}

export default AddNote
