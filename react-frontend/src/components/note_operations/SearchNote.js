import React, { useState, useContext }from 'react'
import { Context } from "../../store/appContext"
import { useHistory } from 'react-router-dom'

import './SearchNote.css'

function SearchNote() {
  const history = useHistory()
  const {store, actions} = useContext(Context)
  const [searchText, setSearchText] = useState("")

  const handleChange = (e) => {
    setSearchText(e.target.value);
  }
  const HandleClick = () => {
    history.push({
      pathname: '/main/search',
      state: searchText,
    }); 
    // console.log(searchText)
    // const resp = fetch('/main/search', {
    //   method: "POST",
    //   mode: 'cors',
    //   headers: { 
    //     'Content-Type': 'application/json',
    //     'Authorization': "Bearer " + store.token
    //   },
    //   body: JSON.stringify({
    //     searchText: searchText,
    //   })
    // });
    // if(resp.status === 200) {
    // }
  } 
  return (
    <>
      <div className="SearchBar">
        <input type="text" size = "80"
            onChange = {(e) => handleChange(e)}
            placeholder ="Enter part of title or Tags to Search" />
        <span className ="SearchIcon" onClick = {HandleClick} >
         <i class="fas fa-search"></i> 
        </span>
      </div>
    </>
  )
}

export default SearchNote
