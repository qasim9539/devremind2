// import React from 'react'
// import { Navigate, NavLink, Outlet } from 'react-router-dom'
// import { FaUser, FaMessage  } from "react-icons/fa6";
// import { FaHome, FaRegListAlt  } from "react-icons/fa";
// import { useAuth } from '../../store/auth';

// export const AdminLayout = () => {
//     const { user, isloading } = useAuth();


//     if(isloading){
//         <h1>loading...</h1>
//     }


//     if(!user.isAdmin){
//         return <Navigate to= "/" />
//     }
//     return (
//         <>
//             <header>
//                 <div className="container">
//                     <nav>
//                         <ul>
//                             <li><NavLink to="/"><FaHome />home</NavLink></li>
//                             <li><NavLink to="/admin/users"><FaUser/>users</NavLink></li>
//                             <li><NavLink to="/admin/contacts"><FaMessage />contacts</NavLink></li>
//                             <li><NavLink to="/service"><FaRegListAlt />services</NavLink></li>
//                         </ul>
//                     </nav>
//                 </div>
//             </header>
//             <Outlet />
//         </>
//     )
// }














































import React from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { FaUser, FaMessage } from "react-icons/fa6";
import { FaHome, FaRegListAlt } from "react-icons/fa";
import { useAuth } from "../../store/auth";

export const AdminLayout = () => {
    const { user, isloading } = useAuth();

    // Handle loading state
    if (isloading) {
        return <h1>Loading...</h1>;
    }

    // Handle non-admin users
    if (!user || !user.isAdmin) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <header>
                <div className="container">
                    <nav>
                        <ul className="flex space-x-4">
                            <li>
                                <NavLink to="/" className="flex items-center">
                                    <FaHome className="mr-2" />
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/users" className="flex items-center">
                                    <FaUser className="mr-2" />
                                    Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/contacts" className="flex items-center">
                                    <FaMessage className="mr-2" />
                                    Contacts
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/service" className="flex items-center">
                                    <FaRegListAlt className="mr-2" />
                                    Services
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <Outlet />
        </>
    );
};



