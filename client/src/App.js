import React, { useState } from 'react'
import './App.css';
import axios from 'axios';
import {useEffect} from 'react'



function App() {
  const [username, setUsername] = useState();
  const [photo, setPhoto] = useState();
  const [data, setData] = useState();
   
  const fetch_photos = async()=> await axios.get(`http://localhost:8080/files`)
  useEffect(()=> {
    async function fetch() {
        const response = await fetch_photos(username);
        const data2 = await response.data.photo;
        setData(data2);
        console.log(",,");
    }
    fetch();
  }, [])


  async function handleClick(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", username);
    for(let y of photo)
    {
      formData.append("user_file" , y);
    }
    await axios.post("http://localhost:8080/files",formData);
  }
  function handlephotos(e) {
    console.log(e.target.files);
    setPhoto(e.target.files);
  }


  return (
    <div className="App">
      { data?.map((dot)=>(

        <img
          alt=''
          src={`http://localhost:8080/${dot}`}
        />
      ))}

      <form  id="file" encType="multipart/form-data">
        <input name="username" type='text' onChange={(e)=> setUsername(e.target.value)}/>
        <input name="user_file" type='file' onChange={(e)=> handlephotos(e)} multiple />
        <button type='submit' onClick={(e) => handleClick(e)}>Upload</button>
      </form>
    </div>
  );
}

export default App;
