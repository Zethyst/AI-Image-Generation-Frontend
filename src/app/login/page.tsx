import { auth, provider } from "./firebaseConfig";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      sessionStorage.setItem('user', JSON.stringify(result.user));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default Login;
