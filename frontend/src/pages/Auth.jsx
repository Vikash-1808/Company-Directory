import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isLogin ? "Logging in..." : "Signing up...");
    navigate("/");
  };

  return (
    <div className="bg-gray-100">
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">{isLogin ? "Login" : "Signup"}</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" className="border p-2 rounded" required />
        <input type="password" placeholder="Password" className="border p-2 rounded" required />
        {!isLogin && <input type="text" placeholder="Name" className="border p-2 rounded" required />}
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          {isLogin ? "Login" : "Signup"}
        </button>
      </form>
      <p
        className="mt-4 text-center text-gray-600 cursor-pointer"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Don't have an account? Signup" : "Already have an account? Login"}
      </p>
    </div>
    </div>
  );
};

export default Auth;
