import React, {useState, useEffect,useContext } from 'react'
import { Context } from "../../store/appContext"
import Note from "../Note"
import './Main.css'
import'../Note.css'

import AddNote from '../note_operations/AddNote'
import SearchNote from '../note_operations/SearchNote'
function Main() {
  
  const {store, actions} = useContext(Context)
  const [notes, updateNotes] = useState([])

  const [popup, setPopup] = useState(false)
  const togglePopup = () => {
    setPopup(!popup);
  }

  let arr =[];
  const fetchNotes = async () => {
    const resp = await fetch('/main/', {
      method: "GET",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':"Bearer " + store.token
      },
    });
    if(resp.status === 200) {
      const data = await resp.json();
      arr = data.data
      updateNotes(arr)
      console.log(" Array data",arr)  
      console.log("state dataa",arr);     
    }
  } 
  useEffect(() => {
    actions.getTokenAfterRefresh();
    fetchNotes();
  }, []);

  return (
    <>
      <div>
        <div className="Newnote" onClick={togglePopup}>
          <i class="fas fa-plus"></i>
        </div>
        {popup ? <AddNote toggle = {togglePopup} /> : null}
      </div>
      <div className="SearchBar">
        <SearchNote />
      </div>
      <br />
      <div className="container">
        <div className="Noteslist">
          { notes.map((note) => (
            <div className="noteitem">
              <Note Title = {note.Title}
                    Info = {note.Info}
                    Id = {note.NoteId}
                    Tags = {note.tags}
              /> 
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Main
