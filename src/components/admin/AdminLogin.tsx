import React from 'react';

export default function AdminLogin(): React.ReactNode {
  return (
    <div className="admin-login p-4 max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <form className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">Email</label>
          <input 
            type="email" 
            id="email" 
            className="w-full p-2 border rounded" 
            placeholder="admin@paperandpen.om"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">Password</label>
          <input 
            type="password" 
            id="password" 
            className="w-full p-2 border rounded" 
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
