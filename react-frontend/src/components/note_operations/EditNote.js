import React, { useState, useEffect, useContext }from 'react'
import { Context } from "../../store/appContext"
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

function EditNote() {
  const location = useLocation()
  let {Title, Info, Id, Tags} = location.state;
  
  const history = useHistory()
  
  const [newTitle, changeTitle] = useState(Title);
  const [newInfo, changeInfo] = useState(Info);
  const [newTags, changeTags] = useState(Tags);

  const {store, actions} = useContext(Context)
  const handleTitleChange = (e) => {
    changeTitle(e.target.value)
    console.log(e.target.value)
  }
  const handleInfoChange = (e) => {
    changeInfo(e.target.value)
  }
  const handleTagsChange = (e) => {
    changeTags(e.target.value)
  }
  const handleEdit =async (e) => {
    e.preventDefault()
    // const {newTitle, newInfo, newTags } = e.target.elements
    console.log("Titl, INf, Tag", newTitle, newInfo, newTags);
    const resp = await fetch('/main/edit', {
      method: "POST",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':"Bearer " + store.token
      },
      body: JSON.stringify({
        Title: newTitle,
        Info: newInfo,
        Tags: newTags,
        Id: Id
      })
    });
    history.push('/main')
  }
  return (
    <>
      <div className="EditComp">
        <form onSubmit = {handleEdit}>
          <br />
          <label for="Title">Title:
            <input type="text" name="Title"  defaultValue={Title} onChange={handleTitleChange}/>
          </label>
          <br />
          <label for="Info">Info:
            <input type="text" name="Info" defaultValue={Info} onChange = {handleInfoChange}/>
          </label>
          <br />
          <label for="Tags">Tags:
            <input type="text" name="Tags" defaultValue={Tags} onChange = {handleTagsChange}/>
          </label>
          <br />
          <input type="submit" value="Submit"></input>
        </form>
      </div>
    </>
  )
}

export default EditNote
