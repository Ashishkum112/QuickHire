import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Popover } from "../ui/popover";
import { Button } from "@/components/ui/button";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User2, Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constants";
import { setUser } from "../../redux/authSlice";
import ColorModeSwitcher from "../../ColorModeSwitcher";
import { useColorMode } from "@chakra-ui/react";
import gsap from "gsap";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const links = document.querySelectorAll(".nav-link");

    const handleMouseEnter = (link) => {
      gsap.to(link, {
        duration: 0.3,
        borderBottom: "2px solid #F83002",
        ease: "power1.out",
      });
    };

    const handleMouseLeave = (link) => {
      gsap.to(link, {
        duration: 0.3,
        borderBottom: "none",
        ease: "power1.in",
      });
    };

    links.forEach((link) => {
      link.addEventListener("mouseenter", () => handleMouseEnter(link));
      link.addEventListener("mouseleave", () => handleMouseLeave(link));
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("mouseenter", () => handleMouseEnter(link));
        link.removeEventListener("mouseleave", () => handleMouseLeave(link));
      });
    };
  }, []);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div>
      <ColorModeSwitcher className="fixed top-[calc(4rem-50%)] right-4 z-50" />

      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 md:px-8 ">
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X
                  className={`h-6 w-6 ${
                    colorMode === "dark" ? "text-gray-200" : "text-gray-800"
                  }`}
                />
              ) : (
                <Menu
                  className={`h-6 w-6 ${
                    colorMode === "dark" ? "text-gray-200" : "text-gray-800"
                  }`}
                />
              )}
            </button>
          </div>
          <Link to="/">
            <img
              src="/Logo.svg"
              alt="Logo"
              className="h-64 w-auto mt-5 md:h-80 md:mt-6"
            />
          </Link>
        </div>

        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center gap-4 md:gap-6">
          <ul className="flex flex-row font-medium items-center gap-4 md:gap-6">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/admin/companies" className="nav-link">
                    Companies
                  </Link>
                </li>
                <li>
                  <Link to="/admin/jobs" className="nav-link">
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/jobs" className="nav-link">
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link to="/ai" className="nav-link">
                    Ai-Buddy
                  </Link>
                </li>
                <li>
                  <Link to="/browse" className="nav-link">
                    Browse
                  </Link>
                </li>
                <li>
                  <Link to="/aboutus" className="nav-link">
                    Developers
                  </Link>
                </li>
                <li>
                  <ColorModeSwitcher />
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button className="text-black" variant="outline">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-[#6A38C2] hover:bg-[#4b18a4]">
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                  <span
                    className={`font-medium ${
                      colorMode === "dark" ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    {user?.fullname?.charAt(0).toUpperCase() +
                      user?.fullname?.slice(1).toLowerCase()}
                  </span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-60 bg-white dark:bg-gray-700 shadow-md rounded-md">
                <div className="flex gap-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@shadcn"
                    />
                  </Avatar>
                  <div>
                    <h4
                      className={`my-2 font-medium ${
                        colorMode === "dark" ? "text-gray-200" : "text-gray-800"
                      }`}
                    >
                      {user?.fullname}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col my-2 text-gray-600">
                  {user && user.role === "student" && (
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 className="text-gray-800" />
                      <Link to="/profile">
                        <Button
                          variant="ghost"
                          className="text-indigo-600 hover:underline"
                        >
                          View Profile
                        </Button>
                      </Link>
                    </div>
                  )}
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut className="text-gray-800" />
                    <Button
                      onClick={logoutHandler}
                      variant="ghost"
                      className="text-red-600"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Mobile Navbar (Popover) */}

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-gray-900 bg-opacity-90 flex flex-col items-center justify-center">
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 right-4 flex items-center gap-4 text-black"
          >
            <X className="h-10 w-40 text-gray-100" />
          </button>
          <ul className="flex flex-col items-center gap-6 text-white text-xl font-bold">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link
                    to="/admin/companies"
                    className="nav-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Companies
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/jobs"
                    className="nav-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className="nav-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className="nav-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/browse"
                    className="nav-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Browse
                  </Link>
                </li>
                <li>
                  <Link
                    to="/ai"
                    className="nav-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    AI-Buddy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/aboutus"
                    className="nav-link"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Developers
                  </Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex flex-col items-center gap-4 mt-8">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="text-gray-800 font-bold"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  className="bg-[#6A38C2] hover:bg-[#4b18a4]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 mt-8">
              <Link to="/profile">
                <Button
                  variant="ghost"
                  className="text-indigo-600 hover:underline"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  View Profile
                </Button>
              </Link>
              <Button
                onClick={() => {
                  logoutHandler();
                  setIsMobileMenuOpen(false);
                }}
                variant="ghost"
                className="text-red-600"
              >
                Logout
              </Button>
            </div>
          )}
          {/* Dark Mode Toggle */}
        </div>
      )}
    </div>
  );
};

export default Navbar;
