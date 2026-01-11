import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Search from "../pages/Search";
import Projects from "../pages/Projects";
import NotFound from "../pages/NotFound";
import Dashboard from "../pages/Dashboard";
import CreatePost from "../pages/CreatePost";
import UpdatePost from "../pages/UpdatePost";
import PostPage from "../pages/PostPage";
import PrivateRoute from "./PrivateRoute";
import OnlyAdminPrivateRoute from "./OnlyAdminPrivateRoute";
import { AnimatePresence, motion } from "framer-motion";

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

// Cyber glitch transition variants
const glitchVariants = {
  initial: {
    opacity: 0,
    clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
  },
  animate: {
    opacity: 1,
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    transition: {
      duration: 0.5,
      ease: [0.77, 0, 0.175, 1],
    },
  },
  exit: {
    opacity: 0,
    clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
    transition: {
      duration: 0.4,
      ease: [0.77, 0, 0.175, 1],
    },
  },
};

// Page wrapper component with transition
function PageTransition({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full"
    >
      {/* Cyber scan line effect on page load */}
      <motion.div
        className="fixed inset-0 z-50 pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div
          className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00ff41] to-transparent"
          initial={{ top: 0 }}
          animate={{ top: "100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </motion.div>
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/sign-in" element={<PageTransition><SignIn /></PageTransition>} />
        <Route path="/sign-up" element={<PageTransition><SignUp /></PageTransition>} />
        <Route path="/search" element={<PageTransition><Search /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
        <Route path="/post/:postSlug" element={<PageTransition><PostPage /></PageTransition>} />
        
        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
          <Route path="/create-post" element={<PageTransition><CreatePost /></PageTransition>} />
          <Route path="/update-post/:postId" element={<PageTransition><UpdatePost /></PageTransition>} />
        </Route>
        
        {/* Admin Only Routes */}
        <Route element={<OnlyAdminPrivateRoute />}>
          {/* Add admin routes here if needed */}
        </Route>
        
        {/* 404 Catch-all - Must be last */}
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
