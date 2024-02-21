import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderMain from "./Header"; // Assuming you have a HeaderMain component

export default function AllCustomers(props) {
  const [loggedInUserNIC, setLoggedInUserNIC] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // This code will run once when the component first mounts
    console.log("AllCustomers component has mounted");

    // Your other logic here...

    // Cleanup function (optional)
    return () => {
      // Code to run when the component is unmounted (cleanup)
      console.log("AllCustomers component will unmount");
    };
  }, []); // Empty dependency array ensures that this effect runs only once

  console.log('AllCustomers - userProfileImage prop:', props.userProfileImage);

  const handleViewProfile = () => {
    if (loggedInUserNIC) {
      navigate(`/getUser/${loggedInUserNIC}`);
    } else {
      navigate("/loginCus");
    }
  };

  

 

  return (
   
      <HeaderMain />
      
      
          
       
  );
}
