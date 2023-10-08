import React, {useEffect, useState} from "react";
import './App.css';
import Login from "../Login/Login";
import Post from "../Post/Post";

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const tokenStorage = localStorage.getItem('token');
    if(tokenStorage){
      setToken(tokenStorage);
    }
  });

  return (
    <div>
      {token ? <Post /> : window.location.href = "/login"}
    </div>
  );
}

export default App;
