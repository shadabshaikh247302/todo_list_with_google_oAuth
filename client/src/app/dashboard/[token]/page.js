"use client";

import { Main_component } from '../../component/Home/Main_component';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import jwt_decode from "jwt-decode";

const Page = ({ params }) => {
  const router = useRouter();

useEffect(() => {
  const token = params.token;

  if (token) {
    try {
      const decoded = jwt_decode(token);
      console.log('Decoded token:', decoded);

      const userData = {
        name: decoded.username || decoded.name || "",   // Use fallback if needed
        token: token,
        userID: decoded.id || decoded.userID || "",     // Use fallback if needed
      };

      localStorage.setItem('userData', JSON.stringify(userData));
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }
}, [params.token]);

  return (
    <div>
      <Main_component />
    </div>
  );
};

export default Page;
