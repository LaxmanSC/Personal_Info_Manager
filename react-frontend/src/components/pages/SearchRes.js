import React, { useState, useEffect, useContext }from 'react'
import { Context } from "../../store/appContext"
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import Note from '../Note'


function SearchRes() {
  const history = useHistory()
  const location = useLocation()
  const searchtext = location.state;
  console.log(searchtext)

  const {store, actions} = useContext(Context)

  const [Searchnotes, updateSearchNotes] = useState([
  //   {
  //   Info: "Hey",
  //   Title: " Main",
  //   NoteId: "13",
  //   tags: " test"
  // }
])
  let arr = []

  const fetchSearchNotes = async () => {
    const resp = await fetch('/main/search', {
      method: "POST",
      mode: 'cors',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + store.token
      },
      body: JSON.stringify({
        searchText: searchtext,
      })
    });
    if(resp.status === 200) {
      const searchData = await resp.json();
      arr = searchData.retData;
      updateSearchNotes(arr)
      console.log("search data", Searchnotes)
    }   
  }

  const handleGoBack = () => {
    history.push('/main')
  }

  useEffect(() => {
    fetchSearchNotes();
  }, [])

  return (
    <>
      <div className="container">
        <div className="Noteslist">
          { Searchnotes.map((note) => (
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
      <div>
        <button onClick={handleGoBack}> Go Back</button>
      </div>    
    </>
  )
}

export default SearchRes
