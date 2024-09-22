import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Phone Book</Link>
        <nav>
          {user ? (
            <button onClick={logout} className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded">Logout</button>
          ) : (
            <>
              <Link to="/login" className="mr-4 bg-amber-300 hover:bg-amber-300 px-4 py-2 rounded">Login</Link>
              <Link to="/register" className="bg-green-400 hover:bg-green-400 px-4 py-2 rounded">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;