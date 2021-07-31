// import React, {useContext, useState} from 'react'
// import { Context } from "../../store/appContext"

// function DeleteNote(Id) {
//   const {store, actions} = useContext(Context)
//   const delNote = async () => {
//     const resp = await fetch('/main/delete', {
//       method: "POST",
//       mode: 'cors',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization':"Bearer " + store.token
//       },
//       body: JSON.stringify({Id: Id})
//     });
//     if(resp.status === 200) {
//       const data = await resp.json();
//       console.log(" Array data",data.success)
//     }
//   }
//   return (
//     <div>
//       Ayeeeeeeeeee
//     </div>
//   )
// }

// export default DeleteNote
