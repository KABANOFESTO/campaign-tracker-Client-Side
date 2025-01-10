// import React from 'react';
// import { Link } from 'react-router-dom';
// import { LayoutDashboard, BarChart2, User } from 'lucide-react';

// const Navbar = () => {
//     return (
//         <nav className="bg-white shadow-md">
//             <div className="container mx-auto px-4">
//                 <div className="flex items-center justify-between h-16">
//                     <Link to="/" className="text-xl font-bold text-blue-600">
//                         Campaign Tracker
//                     </Link>
//                     <div className="flex space-x-4">
//                         <Link to="/" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
//                             <LayoutDashboard className="w-5 h-5" />
//                             <span>Dashboard</span>
//                         </Link>
//                         <Link to="/performance" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
//                             <BarChart2 className="w-5 h-5" />
//                             <span>Performance</span>
//                         </Link>
//                         <div className="flex items-center space-x-2 text-gray-700">
//                             <User className="w-5 h-5" />
//                             <span>Profile</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;


import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, BarChart2, User } from 'lucide-react';
import "../css/style.css";

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation(); // Get current location

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50); // Adjust the scroll threshold as needed
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Function to check if the link is active based on the current location
    const isActiveLink = (path) => {
        return location.pathname === path ? "active" : "";
    };

    return (
        <div className="container-fluid position-relative p-0">
            <nav
                className={`navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0 fixed-top ${isScrolled ? "bg-transparent navbar-scrolled" : "bg-white"
                    }`}
            >
                <Link to="/" className="navbar-brand p-0" >
                    <h1 className="m-0" style={{ color: 'gray' }}>
                        <span class="material-symbols-outlined" id="title" >
                            monitoring
                        </span>Campaign Tracker
                    </h1>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarCollapse"
                    aria-controls="navbarCollapse"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="fa fa-bars"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav ms-auto py-0">
                        <li className="nav-item">
                            <Link to="/" className={`nav-link ${isActiveLink("/")}`} id="home">
                                <LayoutDashboard className="w-5 h-5" />
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/Performance" className={`nav-link ${isActiveLink("/about")}`}>
                                <BarChart2 className="w-5 h-5" />
                                Performance
                            </Link>
                        </li>
                    </ul>
                    <Link
                        to="/login"
                        className="btn btn-primary rounded-pill py-2 px-4 ms-lg-4"
                    >
                        <User className="w-5 h-5" />
                        Account
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;



