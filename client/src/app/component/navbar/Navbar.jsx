"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Authcontext } from "../../Context/Authcontext";
import toast from "react-hot-toast";

export const Navbar = () => {
  // const { AuthData } = useContext(Authcontext);
  const AuthData = JSON.parse( localStorage.getItem('userData'))

  const [authModel, setAuthModel] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  // Ensure that the component is mounted to prevent hydration errors.
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Logout Handler
  async function logoutHandler() {
    const isConfirmLogout = window.confirm("Are you sure you want to logout?");
    if (isConfirmLogout) {
      // toast.loading("Logging out..."); // Show loading toast
      localStorage.removeItem("userData");
      window.location.reload(); // Optional: You can reload or navigate
      router.push("/"); // Redirect to the home page
      toast.success("You have successfully logged out."); // Show success toast
    }
  }

  return (
    <nav className="navbar navbar-expand-lg shadow px-3" style={{ background: "linear-gradient(90deg, #BE3144, #1D1616)" }}>
      {/* Left Side (Logo + Toggle Button) */}
      <div className="d-flex align-items-center justify-content-between w-100">
        {/* Mobile Menu Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          {isMobileMenuOpen ? <FaTimes className="text-light" size={24} /> : <FaBars className="text-light" size={24} />}
        </button>

        {/* Desktop Menu */}
        <div className="collapse navbar-collapse d-none d-lg-flex justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item mx-2">
              <Link className="nav-link text-light" href="/">Home</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link text-light" href="#">About</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link text-light" href="#">Services</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link text-light" href="#">Contact</Link>
            </li>
            <li>
              <Link href="/Auth/login" className="nav-link text-light">Login</Link>
            </li>
          </ul>
        </div>

        {/* Profile Section */}
        <div className="d-flex align-items-center">
          {isMounted && AuthData?.name && (
            <p className="my-0 px-3 text-light text-capitalize">
              Hi, {AuthData.name}
            </p>
          )}
          {isMounted && (
            <img
              onClick={() => setAuthModel((prev) => !prev)}
              className="rounded-circle border border-light"
              src={AuthData?.image || "/profile.jpg"}
              alt="Profile"
              width="45"
              height="45"
              style={{ cursor: "pointer", objectFit: "cover" }}
            />
          )}
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="w-100 position-absolute top-100 start-0 end-0 d-lg-none"
            style={{
              zIndex: "100",
              backdropFilter: "blur(10px)",
              borderRadius: "0px 0px 20px 20px",
              boxShadow: "-1px 8px 8px rgba(0, 0, 0, 0.44)",
              color: "white"
            }}
          >
            <ul className="navbar-nav">
              <li className="nav-item mx-2">
                <Link className="nav-link text-light" href="/">Home</Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link text-light" href="#">About</Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link text-light" href="#">Services</Link>
              </li>
              <li className="nav-item mx-2">
                <Link className="nav-link text-light" href="#">Contact</Link>
              </li>
              <li>
                <Link href="/Auth/login" className="nav-link text-light">Login</Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Dropdown */}
      <AnimatePresence>
        {authModel && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="dropdown-menu show mt-2 p-2 shadow position-absolute"
            style={{ right: 10, top: 50, background: "#BE3144", color: "white" }}
          >
            <button
              className="dropdown-item"
              style={{ background: "transparent", border: "none", outline: "none", color: "white" }}
              onClick={logoutHandler}
            >
              Logout
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
