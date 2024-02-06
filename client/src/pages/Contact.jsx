import { useState } from "react";
import { useAuth } from "../store/auth";

const defaultContactForm = {
    username: "",
    email: "",
    message: ""
};
export const Contact = () => {

    const [contact,setContact] = useState(//{
        // username:"",
        // email:"",
        // message:"",
        
   // }
   defaultContactForm);

    const {user} = useAuth();//destructuring
    
    const [userData , setUserData] = useState(true);//Authentication

    if(userData && user)     //Authentication
    {
        setContact(
            {
                username : user.username,
                email: user.email,
                message:"",
            }
        );
        setUserData(false);
    }
    const handleInput= (e) => {
        const name=e.target.name;
        const value= e.target.value;

        setContact({
            ...contact,
            [name]:value,
        });
    };
    const handleSubmit =async (e) =>{
        e.preventDefault();//form ka default behaviour hota hai to refresh the page ..to avoid that do this
        console.log(contact);
        try {
            const response = await fetch("http://localhost:5000/api/form/contact",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(contact),
            });
                if(response.ok)
                {
                    setContact(defaultContactForm);
                    const data = await response.json();
                    console.log(data);
                    alert("Message sent successfully");
                }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
        <section className="section-contact">
            <div className="contact-content container">
                <h1 className="main-heading">Contact Us</h1>
            </div>

            <div className="container grid grid-two-cols">
                <div className="contact-img">
                    <img src="/images/contactus.jpg" alt="" />
                </div>
                
                <section className="section-from">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" id="username" autoComplete="off" value={contact.username} onChange={handleInput} required/>

                            {/* name field should match the name in user model */}
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" autoComplete="off" value={contact.email} onChange={handleInput} required/>

                            {/* name field should match the name in user model */}
                        </div>
                        <div>
                            <label htmlFor="message">message</label>
                            <textarea name="message" id="message" cols="30" rows="6" autoComplete="off" value={contact.message} onChange={handleInput} required  ></textarea>
                        </div>
                        <div>
                        <button type="submit" className="btn btn-submit">Submit</button>
                        </div>
                    </form>
                </section>
                

            </div>
            <section>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.576189448641!2d73.85083359999999!3d18.457542099999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eac85230ba47%3A0x871eddd0a8a0a108!2sSCTR&#39;S%20Pune%20Institute%20of%20Computer%20Technology!5e0!3m2!1sen!2sin!4v1704995289196!5m2!1sen!2sin" 
                width="100%" 
                height="450" 
                allowFullScreen="" 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"></iframe>
                </section>
        </section>

        </>
    )
   
};
