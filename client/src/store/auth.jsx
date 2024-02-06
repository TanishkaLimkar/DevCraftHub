import { createContext, useContext , useState , useEffect } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));//LOGOUT
    const [user, setUser] = useState("");//AUTHORIZATION
    const [services , setServices] = useState([]);//SERVICES []=>means we are getting data in the form of arrays

    const [loading, setLoading] = useState(true);
    const authorizationToken =`Bearer ${token}`;


  //function to stored the token in local storage
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);// this line is important to lead the page once we login so that navbar shows only logout option and not login register
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;

  console.log("isLoggedIN" , isLoggedIn);

  //LOGOUT ************************************
  const LogoutUser = () => {
    setToken(" ");
    return localStorage.removeItem("token")
  }
  //***************AUTHENTICATION- to get the currently loggedIn user data*/
  const userAuthentication = async() =>{
    try {
      setLoading(true);//for securing admin route
      const response = await fetch("http://localhost:5000/api/auth/user",{
        method:"GET",
        headers: {
          Authorization :authorizationToken,
        },
      });
      if(response.ok)
      {
        const data = await response.json();
        console.log("user data", data.userData);
        setUser(data.userData);
        setLoading(false);
      }
      else
      {
        console.error("Error fetching user data: ",response.status)
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
    
  }

  // to fetch the services data from the backend
  const getServices = async()=>{
    try {
      const response = await fetch("http://localhost:5000/api/data/service",{
        method :"GET",
      });

      if(response.ok){
        const data = await response.json();
        console.log(data.msg);
        setServices(data.msg);
      }
    } catch (error) {
      console.log(`services frontend error : ${error}`);
    }
  }

  useEffect(()=> {
    getServices();
    userAuthentication();

  },[token]);

  return (
    <AuthContext.Provider value={{ storeTokenInLS ,LogoutUser,isLoggedIn, user, loading, services,authorizationToken}}>
      {children}
    </AuthContext.Provider>
  );
};
//children should be written as it is 
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};

