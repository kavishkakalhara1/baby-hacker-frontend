import React from "react";
import { useSelector } from "react-redux";

export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className={`min-h-screen transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-[#0a0a0f] text-gray-200' 
          : 'bg-gray-50 text-gray-800'
      }`}>
        {children}
      </div>
    </div>
  );
}
