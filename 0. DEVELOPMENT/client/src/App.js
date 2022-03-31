// useEffect fetches backend API
import React, { useState, useEffect } from 'react'
import './App.css';

function App() { 

  // data is the actual data
  // setData is the function we can use to manipulate this data
  const [story, setStory] = useState(null)
  const [cleanedStory, setCleanedStory] = useState(null)
  // const [userStory, analyzeStory] = useState([{}])

  // useEffect(() => {
  //   fetch("/hello", {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },      
  //     body: JSON.stringify({
  //       name: story, // Use your own property name / key
  //     }),
  //   }).catch(
  //     err => console.log(err)
  //   )
  // }, [story])

  // useEffect(() => {
  //   fetch("/hello", {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }).then(
  //     (res) => res.json()
  //   ).catch(
  //     err => console.log(err)
  //   ).then(
  //     cleanedStory => {
  //       setCleanedStory(cleanedStory)
  //       console.log(cleanedStory)
  //     }
  //   )
  // }, [story])

  function setUserStory(story_){
    setStory(story_.target.value)
  
    fetch("/hello", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },      
      body: JSON.stringify({
        name: story, // Use your own property name / key
      }),
    }).catch(
      err => console.log(err)
    ).then(
      console.log(story)
    )

    fetch("/hello", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then( response => response.json() )
    .then(
      cleanedStory => {
        setCleanedStory(cleanedStory)
        console.log(cleanedStory)
      }
    ).catch(
      err => console.log(err)
    )
  }

  // const handleOnChange = (e) => {
  //   e.preventDefault();

  //   setStory(story)
  //   fetch("/hello", {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },      
  //     body: JSON.stringify({
  //       name: story, // Use your own property name / key
  //     }),
  //   }).catch(
  //     err => console.log(err)
  //   ).then(
  //     console.log(story)
  //   )
  // }


  return(
    <div className='App'>
      <style>{'body { background-color: #F6F6F6; }'}</style>
      
      <div className='Editor'>
        <input type='text' onChange={setUserStory}></input>
      </div>
      
      <div className='Suggestions'>
        {/* {story} */}
        {cleanedStory}
        
        
        {/* Testing 123...
        {(typeof data.message === 'undefined') ? (
          <p>Loading...</p>
        ):(
          data.message.map((member, i) => (
            <p key={i}>{member}</p>
          ))
        )} */}
      </div>
    
    </div>
  )
}

export default App 