"use client";
import React, { useState, useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Loader from "@/app/components/Loader";
import Card from "./Card";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
  } from "@/components/ui/dropdown-menu";
  import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";

library.add(faTrash, faPenToSquare);

interface UserProfile {
    name: string;
    email: string;
  }
interface DataItem {
  mongoID: string;
  id: number;
  name: string;
  status: string;
  created: string;
  pdf: string;
  word: string;
}

const Page = () => {
  const router = useRouter();
  const [data, setData] = useState<DataItem[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
    sessionStorage.removeItem("user");
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
    window.location.reload();
  };
  function extractInitials(displayName:string) {
    // Step 1: Remove prefix (if any)
    const namePart = displayName.replace(/^\d+_/, ""); // Remove leading digits and underscore
    
    // Step 2: Split the name into words
    const nameParts = namePart.split(" ");
    
    // Step 3: Extract initials
    const initials = nameParts.map(part => part.charAt(0)).join("");
    
    return initials;
  }

  function formatDate(dateString: any): string {
    const date = new Date(dateString);

    const pad = (num: number): string => num.toString().padStart(2, "0");

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleMediaQueryChange = (event: any) => {
      setIsMobile(event.matches);
    };

    // Set initial state
    setIsMobile(mediaQuery.matches);

    setTimeout(() => {
      setLoading(false);
    }, 1500);

    // Add event listener
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Cleanup event listener on component unmount
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  useEffect(() => {
    const dummyData: DataItem[] = [
      {
        mongoID: "1",
        id: 1,
        name: "Image 1",
        status: "Completed",
        created: formatDate(new Date()),
        pdf: "/path/to/pdf1.pdf",
        word: "/path/to/word1.docx",
      },
      {
        mongoID: "2",
        id: 2,
        name: "Image 2",
        status: "Generating",
        created: formatDate(new Date()),
        pdf: "/path/to/pdf2.pdf",
        word: "/path/to/word2.docx",
      },
      {
        mongoID: "3",
        id: 3,
        name: "Image 3",
        status: "Error",
        created: formatDate(new Date()),
        pdf: "/path/to/pdf3.pdf",
        word: "/path/to/word3.docx",
      },
      {
        mongoID: "4",
        id: 4,
        name: "Image 4",
        status: "Completed",
        created: formatDate(new Date()),
        pdf: "/path/to/pdf4.pdf",
        word: "/path/to/word4.docx",
      },
      {
        mongoID: "5",
        id: 5,
        name: "Image 5",
        status: "Generating",
        created: formatDate(new Date()),
        pdf: "/path/to/pdf5.pdf",
        word: "/path/to/word5.docx",
      },
    ];

    setData(dummyData);
  }, []);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [username, setUsername] = useState("");

  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const user = JSON.parse(sessionStorage.getItem("user") as string);
    if (user) {
      setIsLoggedIn(true);
      let initials = extractInitials(user.displayName);
      setUsername(initials);
    }
    const updateDate = () => {
      const now = new Date();
      setDate(now.toLocaleDateString("en-US", options));
    };

    updateDate();
    const intervalId = setInterval(updateDate, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, []);

  
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const handleThemeChange = () => {
    const newTheme = !isDarkMode ? "dark" : "light";
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className={`min-h-screen p-6 ${isDarkMode ? "dark" : ""}`}>
      <header className="flex items-center justify-between">
        <Link href="/" className="text-2xl dark:text-white font-bold cursor-pointer">
          CodeFlow
        </Link>
        <div className="flex items-center space-x-4">
          <button onClick={handleThemeChange} className="p-2 bg-white dark:bg-gray-800 dark:text-white rounded-full shadow-md">
          {isDarkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
          </button>
          <Link href="/explore" className="p-2 bg-white dark:bg-gray-800 dark:text-white rounded-full shadow-md">
            <LayoutGridIcon className="h-6 w-6" />
          </Link>
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className=" bg-white dark:bg-gray-800 dark:text-white rounded-full  shadow-md">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>{username}</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2"
                    prefetch={false}
                  >
                    <div className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2"
                  >
                    <div className="h-4 w-4" />
                    <span>Sign out</span>
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login" className="p-2 bg-white dark:bg-gray-800 dark:text-white rounded-full shadow">
              <UserIcon className="h-6 w-6" />
            </Link>
          )}
        </div>
      </header>

      <div className="absolute top-24 md:top-7 left-[50%] translate-x-[-50%] w-72 text-center px-4 py-2 bg-white dark:bg-gray-800 dark:text-gray-300 rounded-full shadow-lg text-gray-500 font-semibold">
        {date}
      </div>

      <div className="mt-20 w-full flex flex-col justify-center items-center">
        <div className="w-[80%] bg-[#ffffff4e] dark:bg-[#1d1d2e7e] shadow-xl rounded-3xl p-10 self-center flex flex-col gap-8 justify-center items-center ">
          {loading ? (
            <div className="-translate-y-4">
              <Loader />
            </div>
          ) : isMobile ? (
            <div className="flex flex-col justify-center items-center gap-3 w-full">
              {data.map((item, index) => (
                <div key={index + 1}>
                  <Card
                    ID={item.id}
                    MONGOID={item.mongoID}
                    NAME={item.name}
                    CREATED_AT={item.created}
                    STATUS={item.status}
                    PDF={item.pdf}
                    WORD={item.word}
                  />
                </div>
              ))}
            </div>
          ) : (
            <table
              id="dataTable"
              className="w-full whitespace-no-wrap overflow-hidden table-striped"
            >
              <thead>
                <tr>
                  <th className="px-6 py-3 text-gray-500  font-bold tracking-wider uppercase text-xs">
                    ID
                  </th>
                  <th className="px-6 py-3 text-gray-500  font-bold tracking-wider uppercase text-xs">
                    Name
                  </th>
                  <th className="px-6 py-3 text-gray-500  font-bold tracking-wider uppercase text-xs">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-gray-500  font-bold tracking-wider uppercase text-xs">
                    Status
                  </th>
                  <th className="px-6 py-3 text-gray-500  font-bold tracking-wider uppercase text-xs">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody id="tableBody" className="">
                {data.map((item) => (
                  <tr key={item.id} className="">
                    <td className="border-t px-4 py-2">
                      <span className="text-gray-600 translate-x-10 px-6 py-4 flex items-center">
                        {item.id}
                      </span>
                    </td>
                    <td className="border-t px-4 py-2 translate-x-5">
                      <span className="text-gray-600 translate-x-10 px-2 py-4 flex gap-3 items-center">
                        {/* <Image src={PDF} height={40} alt="PDF"></Image> */}
                        {item.name}
                      </span>
                    </td>
                    <td className="border-t px-4 py-2">
                      <span className="text-gray-600 translate-x-10 px-2 py-4 flex gap-3 items-center">
                        {item.created}
                      </span>
                    </td>
                    <td className="border-t px-4 py-2 translate-x-10">
                      <span
                        className={`pill ${
                          item.status === "Generating"
                            ? "bg-yellow-200 text-yellow-800"
                            : item.status === "Completed"
                            ? "bg-green-200 text-green-800"
                            : "bg-red-200 text-red-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="border-t px-4 py-2">
                      <div className="flex justify-center items-center gap-5">
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          className="cursor-pointer dark:text-gray-400 hover:text-gray-400"
                          title="edit"
                        />
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="cursor-pointer dark:text-gray-400 hover:text-gray-400"
                          title="delete"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};


const LayoutGridIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="7" height="7" x="3" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="3" rx="1" />
        <rect width="7" height="7" x="14" y="14" rx="1" />
        <rect width="7" height="7" x="3" y="14" rx="1" />
      </svg>
    );
  };

const MoonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 3a9 9 0 1 0 7.73 13.62 7 7 0 0 1-9.35-9.35A9 9 0 0 0 12 3z" />
      </svg>
    );
  };
  const SunIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
    );
  };
  
  
  const UserIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21a8 8 0 1 0-16 0" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    );
}

export default Page;
