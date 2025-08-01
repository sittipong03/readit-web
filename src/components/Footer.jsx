import { FacebookLogo, Discord } from "../icons/Index"

function Footer() {
  return (
    <footer className='flex justify-between m-5 bg-black p-5'>
        <div className='w-1/2 mb-5'>
          <h3 className='mb-4 subtitle-2'>Relearn solution</h3>
          <p className="body-2">Wanason Building 12th floor A, Room</p>
          <p className="body-2">📞 083-795-1555</p>
          <p className="body-2">✉️ relearn.acc@gmail.com</p>
          <div className='flex gap-3 mt-5 body-2'>
            <p>Term of service</p>
            <p>Privacy Notice</p>
            <p>Cookie preference</p>
          </div>
        </div>
        <div className="w-1/2 flex flex-col items-end">
          <h2 className='mb-5 display-3'>Readit</h2>
          <div className="flex">
            <FacebookLogo className="w-7" />
            <Discord className="w-7" />
          </div>
          <p className="body-2">Version 0.1.0 © 2025  Readit. All Rights Reserved</p>
        </div>
      </footer>
  )
}
export default Footer