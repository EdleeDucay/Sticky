import axios from 'axios'
import React, { useContext, useState, useEffect } from "react";
import { BACKEND_URL, BACKEND_PORT } from "../constants";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function login(data) {
    try {
      const response = await axios({
          method: 'post',
          url: `http://${BACKEND_URL}:${BACKEND_PORT}/sticky/users/login`,
          data: data
      })

      if (response.status === 200) {
        setCurrentUser(response.data);
      }
    } catch (error) {
      return false;
    }

    return true;
  }

  async function signup(data) {
    try {
      const response = await axios({
            method: 'post',
            url: `http://${BACKEND_URL}:${BACKEND_PORT}/sticky/users/signup`,
            data: data
      })

      if (response.status === 201) {
        setCurrentUser(response.data);
      }
    } catch (error) {
      return false;
    }

    return true;
  }

  const value = {
    currentUser,
    loading,
    login,
    signup,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
