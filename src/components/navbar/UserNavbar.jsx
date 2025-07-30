import { Cart, Notification } from "@/src/icons/Index"

function UserNavbar() {
  return (
    <div className=" w-full h-[60px] border">
      <header className='p-4 bg-black'>
        <nav className='flex flex-row justify-between'>
          <div className='flex flex-row w-1/5 pl-5 gap-6'>
            <p className='p-2 font-bold text-[#989076] text-3xl'>Readit</p>
            <input className='rounded-2xl bg-transparent placeholder:text-[#555452] border-3 border-[#555452] p-2' type="text" placeholder='Find books...' />
          </div>
          <div className='w-3/5 flex justify-center gap-6'>
            <button className='cursor-pointer text-lg text-white font-bold'>Browse a book</button>
            <button className='cursor-pointer text-lg text-white font-bold'>About Us</button>
            <button className='cursor-pointer text-lg text-white font-bold'>Contact Us</button>
          </div>
          <div className='w-1/5 flex justify-end gap-6 pr-5'>
            <button className='text-[#7e765d] font-bold text-xl'>Readlist</button>
            <button><Notification className="w-12 rounded-[50%] border border-[#7e765d] p-1" /></button>
            <button><Cart className="w-12 rounded-[50%] border border-[#7e765d] p-1" /></button>
            <button className='p-2 bg-amber-500 rounded-2xl font-bold text-white'>User</button>
            {/* <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1 btn-circle bg-white">
                      User
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu bg-white rounded-box z-1 w-52 p-2 shadow-sm">
                      <li>Profile</li>
                      <li>Logout</li>
                    </ul>
                  </div> */}
          </div>
        </nav>
      </header>
    </div>
  )
}
export default UserNavbar