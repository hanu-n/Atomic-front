import TopHeader from "./TopHeader";
import MainHeader from "./MainHeader";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Header = () => {
    const [showLogout, setShowLogout] = useState(false);
    const {user,logout}=useAuth()
  return (
    <>
      <TopHeader />
      <MainHeader />

      
    </>
  );
};

export default Header;
