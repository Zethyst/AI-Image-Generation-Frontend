"use client";
import { auth, provider } from "./firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import Google from "./Google";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      sessionStorage.setItem("user", JSON.stringify(result.user));
      router.replace("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <div className="relative">
              <p className="text-center text-[#afacac] text-sm line py-2">
                OR CONTINUE WITH
              </p>
            </div>
            <Button
              variant={"outline"}
              className="social-container w-full"
              onClick={handleLogin}
            >
              <Google />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
