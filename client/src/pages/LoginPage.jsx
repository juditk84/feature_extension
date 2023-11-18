import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'
import Register from '../components/Register';

export default function LoginPage({ setIsLoggedIn, setUserData }) {

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
      });

    const [data, setData] = useState(null);
    const navigate = useNavigate();
    const { username, password } = credentials;
    const [viewRegisterButton, setViewRegisterButton] = useState(false)


  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

    
useEffect(() => {}, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Login submitted!")
        login();
    }


    const login = async () => {
        
        try {
          console.log("trying...")
          const { data } = await axios("/api/auth/login", {
                method: "POST",
                data: credentials,
              })
      
          //store it locally
          localStorage.setItem("token", data.token);
          setIsLoggedIn(true);
          setUserData(data);
          navigate({pathname: "/MainMenu"});
        } catch (error) {
          console.log(error);
        }
      };

  return (
    <div className="mainMenu">

            <div>
                <h2> HEY HANDSOME, INSERT YOUR CREDENSIALES</h2>

                <form onSubmit={handleSubmit} action="">

                    <label htmlFor="username_input">Your lovely username: <br />
                    <input value={username} name="username" onChange={handleChange} id="username" type="text" />
                    </label>
                    <br /><br />
                    <label htmlFor="password_input">Your ultra-secret password: <br />
                    <input value={password} name="password" onChange={handleChange} id="password" type="password" />
                    <br /><br />
                    {viewRegisterButton ? <button>REGISTER</button> : <button>LOGIN</button>}
                    </label>
                </form>

                <br /><br /><br />
                    Wait... not registered yet? 
                    <br />
                    <button onClick={() => setViewRegisterButton(true)}>nope, and I'd love to register</button>
                <br />
            </div>

    </div>
  )
}
