import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'
import AuthContext from '../contexts/auth';

export default function LoginPage() {

    const {setUserData, setIsLoggedIn} = useContext(AuthContext);

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
      });

    const navigate = useNavigate();
    const { username, password } = credentials;
    const [viewRegisterButton, setViewRegisterButton] = useState(false)
    const [displayError, setDisplayError] = useState(false)
    
    const [errorObject] = useState({password: "a PASSWORD", username: "a USERNAME", typeOfUser: "a TYPE OF USER", everything: "SOMETHING"});
    const [outputWhatIsMissingInTheInput, setOutputWhatIsMissingInTheInput] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

    function handleInputError(event){
      if(!username && !password){
        setDisplayError(true)
        setOutputWhatIsMissingInTheInput(errorObject.everything)
        setTimeout(() => {setDisplayError(false)}, 2000)
      }

      if(!username && password){
        setDisplayError(true)
        setOutputWhatIsMissingInTheInput(errorObject.username)
        setTimeout(() => {setDisplayError(false)}, 2000)
      }

      if(username && !password){
        setDisplayError(true)
        setOutputWhatIsMissingInTheInput(errorObject.password)
        setTimeout(() => {setDisplayError(false)}, 2000)
      }

      if(!event.target[2]?.checked && !event.target[3]?.checked){
        setDisplayError(true)
        setOutputWhatIsMissingInTheInput(errorObject.typeOfUser)
        setTimeout(() => {setDisplayError(false)}, 2000)
      }
      
    }

    const handleSubmit = (event) => {

      event.preventDefault();
      console.log(event)

      handleInputError(event);
        
        if(event.target[2].id === "login_button"){
          console.log("Login submitted!")
          login();
        }
        else{ //this only runs if the register button is visible instead
          console.log("register button clicked")
          register(event.target[2].checked);
        }

    }

    const register = async (isCitizen) => {

        if(password && username){

          const { data } = await axios("/api/auth/register", {
            method: "POST",
            data: {...credentials, type: isCitizen ? "citizen" : "politician"}
          })
          console.log(data)
          console.log("user registered correctly")

        }
        else{
          console.log("something went wrong");}
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

          const userDataToContext = {
            user_id: data.user_id,
            user_name: data.user_name,
            user_type: data.user_type
          }
          setUserData(userDataToContext);
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
                    {viewRegisterButton ? <div>
                                            <input id="citizen" name="type_of_user" type="radio" /><label htmlFor="">Citizen</label>
                                            <input id="politician" name="type_of_user" type="radio" /><label htmlFor="">Politician</label> <br />
                                            <button id="register_button">REGISTER</button>
                                          </div> 
                                        : <button id="login_button">LOGIN</button>}
                    </label>
                </form>

                <br /><br /><br />
                    { !viewRegisterButton ? 
                    <div>
                      Wait... not registered yet?
                      <br />
                      <button onClick={() => setViewRegisterButton(true)}>nope, and I'd love to register</button>
                      <br />
                    </div>
                    : <button onClick={() => setViewRegisterButton(false)}>Back to login</button>}
            </div>

            { displayError && <div className="the_error_zone">
            <h3>ei lince, provide {outputWhatIsMissingInTheInput}</h3>

            </div>}

    </div>
  )
}
