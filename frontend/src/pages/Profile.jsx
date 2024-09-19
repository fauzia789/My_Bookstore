import React, { useEffect, useState } from "react"
import Sidebar from "../components/profile/Sidebar"
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { FaDribbble } from "react-icons/fa";
const Profile = () => {
//  const isLoggedIn = useSelector();
const [Profile , setProfile] = useState();
 const headers = {
  id : localStorage.getItem("id"),
  authorization: `Bearer ${localStorage.getItem("token")}`,

 };
  useEffect(() =>{

    const fetch = async() =>{
const response = await axios.get("http://localhost:3000/api/v1/get-user-information",
   {headers});
setProfile(response.data)
    }
    fetch();
  },[]);
  return (
    <div className=" bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row  gap-4 h-screen py-8 text-white ">
 {!Profile && <div className="w-full h-[100%]  flex items-center justify-center">
   <Loader/>
 
 </div>}
 {
  Profile && (
    <>
   
    <div className="w-full  md:w-1/6">
       <Sidebar data ={Profile}/>
     </div>
     <div className="w-full md:w-5/6">
 
       <Outlet/>
     </div>
       
 
    </>
 
  )
 }

    </div>
  );
};

export default Profile;