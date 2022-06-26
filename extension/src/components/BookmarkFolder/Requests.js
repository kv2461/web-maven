import React, { useState, useEffect } from 'react'

const Requests = ({selected, setSelected, inviteToFolder}) => {
  useEffect(()=> {
    console.log(inviteToFolder)
  },[])

  return (
    <div>{inviteToFolder.bookmarkFolderId}</div>
  )
}

export default Requests

//needs title so it doesn't have to fetch the entire databank to recieve title