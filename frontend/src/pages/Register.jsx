import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";

const Register = () => {
  const handleGoogleLogin = () => {
    // Redirect to backend Google login route
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form className="bg-white shadow-md p-6 rounded w-96">
        <h2 className="text-2xl font-semibold mb-6">Register</h2>
        <Input label="Name" type="text" placeholder="Enter your name" />
        <Input label="Email" type="email" placeholder="Enter your email" />
        <Input label="Password" type="password" placeholder="Create password" />
        <Button type="submit" className="mt-4">Register</Button>

        <div className="text-center my-4 text-gray-500">OR</div>

        <Button type="button" onClick={handleGoogleLogin} className="w-full bg-red-500 text-white">
          Sign up with Google
        </Button>

        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
