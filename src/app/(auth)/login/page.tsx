import LoginForm from "./Client/LoginForm";

const Login = () => {
  return (
    <div className="flex-cols">
      <p className="text-blue-900 text-h4 font-bold">Welcome to Confugio!</p>
      <p className="text-grey-800">
        Start managing your transactions faster 🚀 and better.
      </p>
      <LoginForm />
    </div>
  );
};

export default Login;
