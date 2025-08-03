import { Await, Link } from "react-router"
import { Navigate } from "react-router"
import { useState } from "react"
import { useForm } from "react-hook-form"

// import from inside project stuff
import * as authApi from "../../api/authApi.js"

// import component
import { WarningIcon, HidePasswordIcon } from "@/src/icons/Index"
import { Button } from "../../../components/ui/button"
import useUserStore from "../../stores/userStore.js"


function Login() {

  const login = useUserStore(state => state.login)

  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false);

  const { handleSubmit, register, formState: { errors, isSubmitting }, reset } = useForm()

  const handleLoginClick = async (data) => {
    try {
      const user = await login(data)
      setIsError(false)
      setIsSuccess(true)
    } catch (error) {
      setIsError(true)
    }

  };

  // if (isSuccess) {
  //   return <Navigate to="/home" replace />;
  // }

  return (
    <div className="w-full h-[700px] flex justify-center bg-linear-to-b from-paper-elevation-2 to-tertiary-lighter">
      <div className="w-[384px] h-full flex justify-center items-center gap-10">
        <div className={`w-[353px] ${isError ? 'h-[500px]' : 'h-[456px]'} flex flex-col justify-center px-[16px] py-3 gap-[16px] rounded-xl border border-[#000209]/12 bg-linear-to-b from-primary-lighter to-paper-elevation-4
        shadow-card-3d`}>

          <div>
            <div className="subtitle-1 text-text-primary">
              Hola! Bookworm
            </div>
            <div>
              <span className="caption text-text-disabled">
                Don't have an account?
              </span>
              <Link to="/register" className="underline subtitle-4 text-primary-main"> Create account</Link>
            </div>
          </div>

          <form className="flex flex-col gap-[16px]" onSubmit={handleSubmit(handleLoginClick)}>
            <div className=" w-full h-[66px]">
              <label className={`pb-1 label-medium ${isError ? "text-error-main" : "text-text-primary"}`}>
                Email:
              </label>
              <input className={`w-full h-[44px] rounded-pill px-[12px] border  focus:outline-none focus-within:outline-auto focus-within:ring-2 focus-within:ring-primary-main
${isError ? 'border-error-main' : 'border-secondary-outlinedBorder'}
  `} type="text" placeholder="Email..." {...register('email')} />
            </div>

            <div className=" w-full h-[66px]">
              <div className={`pb-1 label-medium ${isError ? "text-error-main" : "text-text-primary"}`}
              >
                Password:
              </div>
              <div
                className={`
      flex justify-between items-center px-[12px]
      border rounded-pill
      focus-within:outline-auto focus-within:ring-2 focus-within:ring-primary-main
      ${isError ? 'border-error-main' : 'border-secondary-outlinedBorder'}
    `}
              >
                <input className={`w-full h-[44px] focus:outline-none
  `} type="password" placeholder="Password..." {...register('password')} />
                <HidePasswordIcon className="w-5 text-text-disabled" />
              </div>
            </div>

            {isError &&
              <div>
                <div className="flex items-center px-1 gap-0.5 py-0.5 rounded-sm bg-error-selected  w-full h-[28px]">
                  <WarningIcon className="w-4 text-error-main" />
                  <div className="text-[12px] text-error-main">Email or password invalid</div>
                </div>
              </div>
            }

            <label className="flex gap-2 cursor-pointer">
              <input type="checkbox" className="" {...register('rememberMe')} />
              <div className="body-2 text-text-secondary" >Remember me</div>
            </label>

            <div>
              <Button type="submit" disabled={isSubmitting} color="primary" className="w-full h-[44px]" >{isSubmitting ? "Logging in..." : "Log in"}</Button>
            </div>
          </form>

          <div>
            <a href="http://localhost:6500/api/auth/google">
            <Button color="neutral" variant="outlined" className="w-full h-[44px]
              bg-primary-contrast/30 border border-[#000209]/12">
              Log in via Google</Button>
              </a>
          </div>

          <div>
            <div className="flex items-center justify-center text-primary-main">
              <a className="underline subtitle-4 ">Forget your password?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login