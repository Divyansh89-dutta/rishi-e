import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const handleGoogleSuccess = (credentialResponse) => {
    console.log("Google Login Success:", credentialResponse);
    // send to backend
  };

  const handleGoogleError = () => {
    console.log("Google Login Failed");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form className="bg-white shadow-md p-6 rounded w-96">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <Input label="Email" type="email" placeholder="Enter your email" />
        <Input label="Password" type="password" placeholder="Enter password" />
        <Button type="submit" className="mt-4">Login</Button>

        <div className="text-center my-4 text-gray-500">OR</div>

        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        />

        <p className="mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
