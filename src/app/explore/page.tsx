"use client";

import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import Image1 from "@/assets/digital-art-isolated-house.jpg";
import Image2 from "@/assets/macro-eye-iris-details.jpg";
import Image3 from "@/assets/psychedelic-girl-illustration.jpg";
import Link from "next/link";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useViewport from "../viewportCheck";
import { getAuth, signOut } from "firebase/auth";

import {
  faFire,
  faCalendarDay,
  faPaw,
  faFilm,
  faTShirt,
  faUtensils,
  faTree,
  faRobot,
  faCar,
  faRss,
} from "@fortawesome/free-solid-svg-icons";
import { faSquareFull, faCircle } from "@fortawesome/free-regular-svg-icons";
import { useRouter } from "next/navigation";
library.add(
  faFire,
  faCalendarDay,
  faPaw,
  faFilm,
  faTShirt,
  faUtensils,
  faTree,
  faRobot,
  faCar,
  faRss
);

interface UserProfile {
  name: string;
  email: string;
}
function page() {
    const router = useRouter();
    const isMobile = useViewport();
    const [username, setUsername] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
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
      <div className="absolute top-44 md:top-28 left-[50%] translate-x-[-50%] flex justify-center items-center gap-3 w-96 md:w-[700px] flex-wrap text-center px-4 py-3 bg-white dark:bg-gray-800 dark:text-gray-300  rounded-full shadow-lg text-gray-500 font-semibold">
        {[
          { icon: faFire, text: "Rising" },
          { icon: faCalendarDay, text: "Daily Theme" },
          { icon: faPaw, text: "Animals" },
          { icon: faFilm, text: "Anime" },
          { icon: faTShirt, text: "Fashion" },
          { icon: faUtensils, text: "Food" },
          { icon: faTree, text: "Landscape" },
          { icon: faRobot, text: "Sci-Fi" },
          { icon: faCar, text: "Vehicle" },
          { icon: faRss, text: "My Feed" },
        ].map((item, index, arr) => (
          <div
            key={item.text}
            className={`px-4 font-bold flex justify-center items-center gap-1 cursor-pointer ${
              index < arr.length - 1 ? "border-r-2 border-gray-300" : ""
            } `}
          >
            <FontAwesomeIcon
              icon={item.icon}
              className="text-lg md:text-base"
            />
            <p className="text-sm md:text-base">{item.text}</p>
          </div>
        ))}
      </div>

      <main className="mt-64 md:mt-32 text-center flex justify-center items-center flex-col ">
        <div className={`${isMobile?"grid":"container"} gap-6 mt-12`} style={{gridTemplateColumns: "masonry"}}>
          <Card className={`p-4 ${isMobile?"":"item"}`}>
            <div className="relative rounded-xl hover:custom-inner-shadow">
              <Image src={Image1} alt="Image-1" className="rounded-xl"></Image>
            </div>
            <CardContent className="space-y-4 py-4">
              <div>
                <p className="font-bold text-lg text-gray-700 dark:text-gray-300">
                  Isolated House
                </p>
                <p className="text-sm text-muted-foreground">
                  Describe your vision, and let our AI do the rest.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className={`p-4 ${isMobile?"":"item"}`}>
            <Image src={Image2} alt="Image-2" className="rounded-xl"></Image>
            <CardContent className="space-y-4 py-4">
              <div>
                <p className="font-bold text-lg text-gray-700 dark:text-gray-300">Macro Iris</p>
                <p className="text-sm text-muted-foreground">
                  Describe your vision, and let our AI do the rest.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className={`p-4 ${isMobile?"":"item"}`}>
            <Image src={Image3} alt="Image-3" className="rounded-xl"></Image>
            <CardContent className="space-y-4 py-4">
              <div>
                <p className="font-bold text-lg text-gray-700 dark:text-gray-300">
                  Psychedilic Girl
                </p>
                <p className="text-sm text-muted-foreground">
                  Describe your vision, and let our AI do the rest.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default page;

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
};
