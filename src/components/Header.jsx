import React from "react";
import logo from "./img/logo-color.png";
import { BsFillCartCheckFill } from "react-icons/bs";
import { MdAdd, MdLogout } from "react-icons/md";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { useState } from "react";
import Avatar from "./img/avatar.png";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { useStateValue } from "../context/SateProvider";
import { actionType } from "../context/reducer";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user }, dispatch] = useStateValue();
  const [isMenu, setisMenu] = useState(false);

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setisMenu(!isMenu);
    }
  };

  const logout = () => {
    setisMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  return (
    <header className=" fixed z-30  w-screen p-3 px-0 md:p-4 md:px-12  ">
      {/*destop and tablet */}
      <div className="hidden md:flex w-full h-full item-center justify-between ">
        {/* linking to home page  using ling tag  */}
        <Link to={"/"} className="flex items-center gap-2">
          {/* LOgo from image folder  */}
          <img src={logo} className="w-10 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold">
            HamaraGodavarikhani
          </p>
        </Link>
        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, z: 200 }}
            exit={{ opacity: 0, y: 200 }}
            className="flex  items-center gap-12  flex-row text-2xl  "
          >
            {/* here it is routing to the gallery by using react router dom  first you need route in app.js and then you have link here  home page linking maincontainer */}
            <li className="font-bold  drop-shadow-2xl  text-xl  text-textColor   hover:text-2xl duration-100 transition-all  ease-in-out cursor-pointer  ">
              <Link to="/"> Home</Link>
            </li>
            {/* this page provide various services offred by hamra gdk */}
            <Link
              to={"/Shopping"}
              className="font-bold  text-xl text-textColor hover:text-headingColor hover:text-2xl duration-100 transition-all ease-in-out cursor-pointer  "
            >
              Shopping
            </Link>
            <Link
              to={"/Gallery"}
              className="text-xl text-textColor hover:text-headingColor  hover:text-2xl duration-100 transition-all  ease-in-out cursor-pointer font-bold   "
            >
              Gallery
            </Link>
            {/*  same rules follows ABouts page */}
            <Link
              to={"/Aboutus"}
              className="text-xl text-textColor hover:text-headingColor  hover:text-2xl duration-100 transition-all ease-in-out cursor-pointer font-bold "
            >
              Aboutus
            </Link>
          </motion.ul>
          {/*cart item */}

          <div className=" relative flex items-center justify-center">
            <BsFillCartCheckFill className=" text-textColor text-2xl cursor-pointer" />
            <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className=" text-xs text-white font-semibold">5</p>
            </div>
          </div>

          {/*login fuction with firebase google athatication */}
          <div className=" relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl cursor-pointer "
              alt="userprofile"
              onClick={login}
            />

            {/*menu item   */}
            {isMenu && (
              <motion.div
                initial={{ Opacity: 0, scale: 0.6 }}
                animate={{ Opacity: 1, scale: 1 }}
                exit={{ Opacity: 0, scale: 0.6 }}
                className=" w-60   bg-green-200 drop-shadow-xl rounded-lg flex flex-col  absolute top-12 right-5 px-4 py-2"
              >
                <Link to={"/CreateContainer"}>
                  <p className=" px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-lime-200 transition-all duration-100 ease-in-out text-textColor hover:text-2xl">
                    Seller
                    <MdAdd />
                  </p>
                </Link>

                <p
                  className=" px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-lime-200 transition-all duration-100 ease-in-out text-textColor hover:text-2xl"
                  onClick={logout}
                >
                  Logout
                  <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* this is for all  mobile  */}
      <div className=" flex md:hidden  items-start justify-between w-full h-full p-4">
        <div className=" relative flex items-center justify-center">
          <BsFillCartCheckFill className=" text-textColor text-2xl cursor-pointer" />
          <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
            <p className=" text-xs text-white font-semibold">5</p>
          </div>
        </div>
        <Link to={"/"} className="flex items-center gap-2">
          <img src={logo} className="w-6 object-cover  " alt="logo" />
          <p className="text-headingColor text-base font-bold">
            HamaraGodavarikhani
          </p>
        </Link>
        <div className=" relative ">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl  rounded-full cursor-pointer "
            alt="userprofile"
            onClick={login}
          />
          <div>
            {isMenu && (
              <motion.div
                initial={{ Opacity: 0, scale: 0.6 }}
                animate={{ Opacity: 1, scale: 1 }}
                exit={{ Opacity: 0, scale: 0.6 }}
                className=" w-60  bg-zinc-300 drop-shadow-xl  rounded-lg flex flex-col  absolute top-12 right-5 px-4 py-2"
              >
                {user && user.email === "m.udayruleezz123@gmail.com" && (
                  <Link to={"/CreateItem"}>
                    <p className=" px-4 py-2 text-xl  font-bold  rounded-xl flex  gap-0 cursor-pointer text-textColor  hover:bg-zinc-200 transition-all duration-100 ease-in-out hover:text-zinc-500 hover:text-2xl">
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}

                <ul className="flex  items-start  gap-1.5 flex-col  drop-shadow-xl rounded-lg   ">
                  <li className="px-4 py-2  font-bold  drop-shadow-2xl  rounded-xl  text-xl  text-textColor hover:text-zinc-500   hover:bg-zinc-900  hover:text-2xl duration-100 transition-all  ease-in-out cursor-pointer  ">
                    Home
                  </li>
                  <li className="px-4 py-2  text-xl text-textColor rounded-xl  hover:text-zinc-500   hover:bg-zinc-900 hover:text-2xl duration-100 transition-all  ease-in-out cursor-pointer font-bold   ">
                    Menu
                  </li>
                  <li className="px-4 py-2  text-xl text-textColor rounded-xl  hover:text-zinc-500   hover:bg-zinc-900  hover:text-2xl duration-100 transition-all ease-in-out cursor-pointer font-bold ">
                    Aboutus
                  </li>
                  <li className="px-4 py-2   hover:text-zinc-500  rounded-xl font-bold   text-textColor  hover:bg-zinc-900   text-xl  hover:text-3xl  duration-100 transition-all ease-in-out cursor-pointer  ">
                    Services
                  </li>
                </ul>

                <p
                  className=" px-4 py-2  gap-y-4 font-bold flex text-xl rounded-lg shadow-lg items-center justify-center  cursor-pointer  hover:bg-zinc-900 transition-all duration-100 ease-in-out  text-textColor hover:text-zinc-500 hover:text-2xl"
                  onClick={logout}
                >
                  Logout
                  <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
