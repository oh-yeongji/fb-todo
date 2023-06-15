import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="p-7 bg-black">
      <div className="flex align-items-center justify-between">
        <Link to="/" className="text-white hover:text-orange-600">
          logo
        </Link>
        <ul className="flex items-center justify-center gap-4">
          <li>
            <Link to="/home" className="text-white hover:text-orange-600">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-white hover:text-orange-600">
              About
            </Link>
          </li>
          <li>
            <Link to="/todo" className="text-white hover:text-orange-600">
              Todo
            </Link>
          </li>
        </ul>
        <div className="flex justify-center gap-5">
          <Link to="/login" className="text-white hover:text-orange-600">
            로그인
          </Link>
          <Link to="/signup" className="text-white hover:text-orange-600">
            회원가입
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
