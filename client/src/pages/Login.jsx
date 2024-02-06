import { useState } from "react";
import {useNavigate} from "react-router-dom"
import { useAuth } from "../store/auth";
import {toast} from "react-toastify";

const URL ="http://localhost:5000/api/auth/login";
export const Login = () => {

    const [user,setUser] = useState (
        {
            email:"",
            password:"",
        }
    );

    const navigate =useNavigate();
    const {storeTokenInLS} = useAuth();
    const handleInput = (e) =>{
        let name= e.target.name;
        let value=e.target.value;

        setUser({
            ...user,
           [name]:value,

        //    this name field is dynamic it can be anything it can be username, email,phone or password
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();//form ka default behaviour hota hai to refresh the page ..to avoid that do this
        try{
            const response = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
              });
                console.log("login form", response)

                const res_data = await response.json();//the token generated from auth-controller is received in this res_data
              
                if (response.ok) {
                
                // localStorage.setItem("token", res_data.token);
                storeTokenInLS(res_data.token);
                setUser({email: "", password: "" });
                toast.success("Login successful");
                navigate("/");
              } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails.join(', ') : res_data.message);
                console.log("error inside response ", "error");
              }
        }catch(error)
        {
            console.log(error);
        }
    }
    return (
        <>
        <section>
            <main>
                <div className="section-registration">
                   <div className="container grid grid-two-cols">
                    <div className="registration-image" width="" height="">
                        <img src="/images/login.jpg" alt=" "/>
                    </div>

                    {/* Registratiom form */}
                    <div className="registration-form">
                        <h1 className="main-heading mb-3">Login Form</h1>
                        <br/>

                        <form onSubmit={handleSubmit}>
                       
                            <div>
                                <label htmlFor="email">email</label>
                                <input type="email" name="email" placeholder="Enter your email" required autoComplete="off" value={user.email} onChange={handleInput}>
                                </input>
                            </div>
                            <div>
                                <label htmlFor="password">password</label>
                                <input type="password" name="password" placeholder="password" required autoComplete="off" value={user.password} onChange={handleInput}>
                                </input>
                            </div>

                            <br/>

                            <button type="submit" className="btn btn-submit">Login</button>
                        </form>
                    </div>
                   </div>
                </div>
            </main>
        </section>
        </>
    )
};