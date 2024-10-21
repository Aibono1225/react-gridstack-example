import React, { useEffect } from "react";
import { handleCallback } from "./authService";

const Callback = () => {
  useEffect(() => {
    handleCallback()
      .then((user) => {
        console.log("User logged in", user);
      })
      .catch((error) => {
        console.error("Login error", error);
      });
  }, []);

  return <div>Logging in...</div>;
};

export default Callback;
