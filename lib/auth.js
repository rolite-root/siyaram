"use client";

import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

export function useAuth() {
  const [isUserLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); 

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateAuthStatus = () => {
        const token = localStorage.getItem('user'); 

        if (token) {
          try {
            const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
            const decoded = jwt.verify(token, secretKey); 
            setIsLoggedIn(true);
            setUserRole(decoded.role); 
          } catch (error) {
            console.error("Invalid Token:", error);
            setIsLoggedIn(false);
            setUserRole(null);
          }
        } else {
          setIsLoggedIn(false);
          setUserRole(null);
        }
      };
      updateAuthStatus();
      window.addEventListener('storage', updateAuthStatus);
      window.addEventListener('login', updateAuthStatus);
      window.addEventListener('logout', updateAuthStatus);
      return () => {
        window.removeEventListener('storage', updateAuthStatus);
        window.removeEventListener('login', updateAuthStatus);
        window.removeEventListener('logout', updateAuthStatus);
      };
    }
  }, []);

  return { isUserLoggedIn, userRole }; 
}
