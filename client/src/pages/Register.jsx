import { useState } from "react";
import {useNavigate} from "react-router-dom"
import { useAuth } from "../store/auth";
import {toast} from "react-toastify";
export const Register= () => {

    const [user,setUser] = useState (
        {
            username:"",
            email:"",
            phone:"",
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
        e.preventDefault();
        console.log(user);
        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
              });
              const res_data = await response.json();//the token generated from auth-controller is received in this res_data
              console.log("Res from server : ", res_data.extraDetails);
              if (response.ok) {
               storeTokenInLS(res_data.token);
                
                setUser({ username: "", email: "", phone: "", password: "" });
                toast.success("Registration successful");
                navigate("/login");
              } else {
                // toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
                toast.error(res_data.extraDetails ? res_data.extraDetails.join(', ') : res_data.message);
              }
          } catch (error) {
            console.log("Error", error);
            toast.error("An error occurred while processing your request.");
          }
    }
    return (
        <>
        <section>
            <main>
                <div className="section-registration">
                   <div className="container grid grid-two-cols">
                    <div className="registration-image" width="" height="">
                        <img src="/images/register1.jpg" alt=" "/>
                    </div>

                    {/* Registratiom form */}
                    <div className="registration-form">
                        <h1 className="main-heading mb-3">Registration Form</h1>
                        <br/>

                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username">username</label>
                                <input type="text" name="username" placeholder="username" required autoComplete="off" value={user.username} onChange={handleInput}>
                                </input>
                            </div>
                            <div>
                                <label htmlFor="email">email</label>
                                <input type="email" name="email" placeholder="Enter your email" required autoComplete="off" value={user.email} onChange={handleInput}>
                                </input>
                            </div>
                            <div>
                                <label htmlFor="phone">phone</label>
                                <input type="number" name="phone" placeholder="phone" required autoComplete="off" value={user.phone} onChange={handleInput}>
                                </input>
                            </div>
                            <div>
                                <label htmlFor="password">password</label>
                                <input type="password" name="password" placeholder="password" required autoComplete="off" value={user.password} onChange={handleInput}>
                                </input>
                            </div>

                            <br/>

                            <button type="submit" className="btn btn-submit">Register Now</button>
                        </form>
                    </div>
                   </div>
                </div>
            </main>
        </section>
        </>
    )
};

