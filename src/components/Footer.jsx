import { FacebookLogo, Discord } from "../icons/Index"

function Footer() {
  return (
    <footer className='flex justify-between m-5 bg-[#13120f] p-5'>
        <div className='w-1/2 mb-5 text-[#cfc6aa]'>
          <h3 className='text-2xl font-bold text-[#cfc6aa] mb-4'>Relearn solution</h3>
          <p>Wanason Building 12th floor A, Room</p>
          <p>📞 083-795-1555</p>
          <p>✉️ relearn.acc@gmail.com</p>
          <div className='flex gap-3 mt-5'>
            <p>Term of service</p>
            <p>Privacy Notice</p>
            <p>Cookie preference</p>
          </div>
        </div>
        <div className="w-1/2 flex flex-col items-end text-[#cfc6aa]">
          <h2 className='text-2xl mb-5 font-bold'>Readit</h2>
          <div className="flex">
            <FacebookLogo className="w-7" />
            <Discord className="w-7" />
          </div>
          <p>Version 0.1.0 © 2025  Readit. All Rights Reserved</p>
        </div>
      </footer>
  )
}
export default Footer