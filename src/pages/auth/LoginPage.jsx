import { Await, Link } from "react-router";
import { Navigate, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// import from inside project stuff
import * as authApi from "../../api/authApi.js";
import * as userApi from "../../api/userApi.js";


// import component
import { WarningIcon, HidePasswordIcon } from "@/src/icons/Index";
import { Button } from "../../../components/ui/button";
import useUserStore from "../../stores/userStore.js";

function Login() {
  const login = useUserStore((state) => state.login);
  const token = useUserStore((state) => state.token);

  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
    const [isProcessingLogin, setIsProcessingLogin] = useState(false);


  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

const handleLoginClick = async (data) => {
    setIsProcessingLogin(true);
    setIsError(false);
    try {
      await login(data);
      const checkpref = await userApi.getMyFullProfile();
      console.log('check pref', checkpref.data?.result.bookTagPreference);

      if (checkpref && checkpref.data?.result.bookTagPreference.length <= 0) {
        console.log("No preferences found, navigating to /interest");
        navigate("/interest");
        setIsProcessingLogin(false)
      } else {
        console.log("Preferences found, navigating to /userproflie");
        navigate("/userproflie", { replace: true });
      }
    } catch (error) {
      console.log("Login error: ", error);
      setIsError(true);
    } 
  };



  // useEffect(() => {
  //   if (token && !isProcessingLogin) {
  //     console.log("User is already logged in, redirecting...");
  //     navigate("/userproflie", { replace: true });
  //   }
  // }, [token, isProcessingLogin, navigate]);

  // if (isSuccess) {
  //   return <Navigate to="/home" replace />;
  // }

  console.log("token: ", token);
  return (
    <div className="from-paper-elevation-2 to-tertiary-lighter flex h-[700px] w-full justify-center bg-linear-to-b">
      <div className="flex h-full w-[384px] items-center justify-center gap-10">
        <div
          className={`w-[353px] ${isError ? "h-[500px]" : "h-[456px]"} from-primary-lighter to-paper-elevation-4 shadow-card-3d flex flex-col justify-center gap-[16px] rounded-xl border border-[#000209]/12 bg-linear-to-b px-[16px] py-3`}
        >
          <div>
            <div className="subtitle-1 text-text-primary">Hola! Bookworm</div>
            <div>
              <span className="caption text-text-disabled">
                Don't have an account?
              </span>
              <Link
                to="/register"
                className="underline subtitle-4 text-primary-main"
              >
                {" "}
                Create account
              </Link>
            </div>
          </div>

          <form
            className="flex flex-col gap-[16px]"
            onSubmit={handleSubmit(handleLoginClick)}
          >
            <div className="h-[66px] w-full">
              <label
                className={`label-medium pb-1 ${isError ? "text-error-main" : "text-text-primary"}`}
              >
                Email:
              </label>
              <input
                className={`rounded-pill focus-within:outline-auto focus-within:ring-primary-main h-[44px] w-full border px-[12px] focus-within:ring-2 focus:outline-none ${isError ? "border-error-main" : "border-secondary-outlinedBorder"} `}
                type="text"
                placeholder="Email..."
                {...register("email")}
              />
            </div>

            <div className="h-[66px] w-full">
              <div
                className={`label-medium pb-1 ${isError ? "text-error-main" : "text-text-primary"}`}
              >
                Password:
              </div>
              <div
                className={`rounded-pill focus-within:outline-auto focus-within:ring-primary-main flex items-center justify-between border px-[12px] focus-within:ring-2 ${isError ? "border-error-main" : "border-secondary-outlinedBorder"} `}
              >
                <input
                  className={`h-[44px] w-full focus:outline-none`}
                  type="password"
                  placeholder="Password..."
                  {...register("password")}
                />
                <HidePasswordIcon className="w-5 text-text-disabled" />
              </div>
            </div>

            {isError && (
              <div>
                <div className="bg-error-selected flex h-[28px] w-full items-center gap-0.5 rounded-sm px-1 py-0.5">
                  <WarningIcon className="w-4 text-error-main" />
                  <div className="text-error-main text-[12px]">
                    Email or password invalid
                  </div>
                </div>
              </div>
            )}

            <label className="flex gap-2 cursor-pointer">
              <input type="checkbox" className="" {...register("rememberMe")} />
              <div className="body-2 text-text-secondary">Remember me</div>
            </label>

            <div>
              <Button
                type="submit"
                disabled={isSubmitting}
                color="primary"
                className="h-[44px] w-full"
              >
                {isSubmitting ? "Logging in..." : "Log in"}
              </Button>
            </div>
          </form>

          <div>
            <a href="http://localhost:6500/api/auth/google">
              <Button
                color="neutral"
                variant="outlined"
                className="bg-primary-contrast/30 h-[44px] w-full border border-[#000209]/12"
              >
                Log in via Google
              </Button>
            </a>
          </div>

          <div>
            <div className="flex items-center justify-center text-primary-main">
              <a className="underline subtitle-4">Forget your password?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
