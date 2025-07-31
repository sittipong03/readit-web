import { Link } from "react-router"
import { WarningIcon, HidePasswordIcon } from "@/src/icons/Index"
import { useState } from "react"


function Register() {
  const [isError, setIsError] = useState(false)

  return (
    <div className="w-full h-[700px] flex justify-center bg-linear-to-b from-paper-elevation-2 to-tertiary-lighter">
      <div className="w-[384px] h-full flex justify-center items-center gap-10">
        <div className={`w-[353px] ${isError ? 'h-[500px]' : 'h-[456px]'} flex flex-col justify-center px-[16px] py-3 gap-[16px] rounded-xl border border-[#000209]/12 bg-linear-to-b from-primary-lighter to-paper-elevation-4
        shadow-card-3d`}>

          <div>
            <div className="subtitle-1 text-text-primary">
              Create account
            </div>
            <div>
              <span className="caption text-text-disabled">
                Start reading and earning today.
              </span>
            </div>
          </div>

          <div>
            <button className="flex items-center justify-center rounded-pill w-full h-[44px] text-primary bg-primary-contrast/30 hover:bg-primary-hover border   border-[#000209]/12 selection:bg-primary-selected" >Log in via Google</button>
          </div>

          <div className="flex items-center w-full gap-[12px]">
            <div className="h-[1px] grow bg-text-disabled"></div>
            <div className="flex-shrink-0 text-text-disabled caption">OR</div>
            <div className="h-[1px] grow bg-text-disabled"></div>
          </div>

          <div className=" w-full h-[66px]">
            <div className={`pb-1 label-medium ${isError ? "text-error-main" : "text-text-primary"}`}>
              Email:
            </div>
            <input className={`w-full h-[44px] rounded-pill px-[12px] border  focus:outline-none focus-within:outline-auto focus-within:ring-2 focus-within:ring-primary-main
${isError ? 'border-error-main' : 'border-secondary-outlinedBorder'}
  `} type="text" placeholder="Email..." />
          </div>

          <div className=" w-full h-[66px]">
            <div className={`pb-1 label-medium ${isError ? "text-error-main" : "text-text-primary"}`}>
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
  `} type="password" placeholder="Password..." />
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

          <div>
            <button className="flex items-center justify-center rounded-pill w-full h-[44px] text-primary-contrast bg-primary-main hover:bg-primary-light active:bg-primary-dark">Create Account</button>
          </div>


          <div className="flex items-center justify-center gap-0.5">
            <span className="caption text-text-disabled" >Already have an account? </span>
            <Link to="/login" className="underline subtitle-4 text-primary-main"> Log in</Link>
          </div>



        </div>
      </div>
    </div>
  )
}
export default Register