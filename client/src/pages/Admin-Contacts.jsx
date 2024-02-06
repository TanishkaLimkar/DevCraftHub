import { useEffect, useState } from "react"
import { useAuth } from "../store/auth"
import {toast} from "react-toastify";

export const AdminContacts = () => {
    const [contactData , setContactData]=useState([]);
    const {authorizationToken} = useAuth();
    const getContactsData = async()=>{
        try {
            const response = await fetch("http://localhost:5000/api/admin/contacts", {
              method: "GET",
              headers: {
                Authorization: authorizationToken,
              },
            });
      
            const data = await response.json();
            if (response.ok) {
              setContactData(data);
            }
          } 
         catch (error) {
            console.log(error);
        }
    } 
    const deleteContact = async(id) =>{
        try {
            const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`,{
                method:"DELETE",
                headers:{
                    Authorization:authorizationToken,
                },
             });
             const data = await response.json();

             console.log(`Contacts after delete : ${data}`);
             if(response.ok){
                getContactsData();//if not written this then we will have to (refresh the page to get the contact data again 
                toast.success("Contact Deleted !!");
             }
        } catch (error) {
            console.log(error);
        }
        }
    useEffect(()=>{
        getContactsData();
    },[]);
    return <>
        <section className="admin-users-section">
            <div className="container">
                <h1>Admin Contacts Data</h1>
            </div>
            <div className="container admin-users">
                <table>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Delete</th>
                        </tr>

                    </thead>
                    
                    <tbody>
                    {   contactData.map((curContactData,index)=> {
                        return (<tr key={index}>
                            <td>{curContactData.username}</td>
                            <td>{curContactData.email}</td>
                            <td>{curContactData.message}</td>
                            <td><button onClick={()=>deleteContact(curContactData._id)}>Delete</button></td>
                           
                        </tr>);
                    })}
                    </tbody>
                </table>
           
            </div>
        </section>
    </>
}