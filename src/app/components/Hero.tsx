"use client";

import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";


interface UserProfile {
  name: string;
  email: string;
}

const Component: React.FC = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setUserProfile({
      name: "Zethyst",
      email: "zethyst@protonmail.com",
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
  };

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

    const updateDate = () => {
      const now = new Date();
      setDate(now.toLocaleDateString("en-US", options));
    };

    updateDate();
    const intervalId = setInterval(updateDate, 60000); // Update every minute

    return () => clearInterval(intervalId);
  }, []);
  const handleGenerate = () =>{
    router.replace("/generate");
  }
  return (
    <div className="min-h-screen  p-6">
      <header className="flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold cursor-pointer">CodeFlow</Link >
        <div className="flex items-center space-x-4">
          <button className="p-2 bg-white rounded-full shadow-md">
            <MoonIcon className="h-6 w-6" />
          </button>
          <button className="p-2 bg-white rounded-full shadow-md">
            <LayoutGridIcon className="h-6 w-6" />
          </button>
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 bg-white rounded-full shadow-md">
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
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
            <button
              className="p-2 bg-white rounded-full shadow"
              onClick={handleLogin}
            >
              <UserIcon className="h-6 w-6" />
            </button>
          )}
        </div>
      </header>

      <div className="absolute top-24 md:top-7 left-[50%] translate-x-[-50%] w-72 text-center px-4 py-2 bg-white rounded-full shadow-lg text-gray-500 font-semibold">
          {date}
      </div>

      <main className="mt-12 text-center flex justify-center items-center flex-col">
        <h1 className="text-5xl h-48 md:w-[500px] translate-y-16 font-bold animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          Turn text into images minus the hussel!
        </h1>
        <div className="grid gap-6 mt-12 md:grid-cols-3">
          <Card className="p-4 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="self-center flex items-center space-x-2 text-gray-400">
                <ImageIcon className="h-5 w-5 " />
                <span>Image Generation</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-bold text-gray-700">
                  Generate Stunning Images
                </p>
                <p className="text-sm text-muted-foreground">
                  Describe your vision, and let our AI do the rest.
                </p>
              </div>
              <button onClick={handleGenerate} className="w-full bg-[#f1f5f9] hover:bg-[#e0e4e7cb] rounded-lg px-3 py-2">
                Try it Now
              </button>
            </CardContent>
          </Card>
          <Card className="p-4 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="self-center flex items-center space-x-2 text-gray-400">
                <FilePenIcon className="h-5 w-5" />
                <span>Image Editing</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-bold text-gray-700">
                  Enhance Your Creations
                </p>
                <p className="text-sm text-muted-foreground">
                  Unleash your creativity with our powerful editing tools.
                </p>
              </div>
              <button className="w-full bg-[#f1f5f9] hover:bg-[#e0e4e7cb] rounded-lg px-3 py-2">
                Start Editing
              </button>
            </CardContent>
          </Card>
          <Card className="p-4 hover:shadow-xl">
            <CardHeader>
              <CardTitle className="self-center flex items-center space-x-2 text-gray-400">
                <BrushIcon className="h-5 w-5" />
                <span>AI-Powered Filters</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-bold text-gray-700">
                  Apply Stunning Filters
                </p>
                <p className="text-sm text-muted-foreground">
                  Transform your images with our AI-powered filters.
                </p>
              </div>
              <button className="w-full bg-[#f1f5f9] hover:bg-[#e0e4e7cb] rounded-lg px-3 py-2">
                Explore Filters
              </button>
            </CardContent>
          </Card>
        </div>
        <div className="mt-6 flex justify-center space-x-4">
          <Link
            href="/explore"
            className="inline-flex items-center rounded-full bg-primary px-10  py-3 font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Explore
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Component;

const BrushIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
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
      <path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" />
      <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z" />
    </svg>
  );
};

const FilePenIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
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
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  );
};

const ImageIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
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
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-5-5L5 21" />
    </svg>
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
