function GuestNavbar() {
  return (
    <div className=" w-full h-[60px] border">
      <header className='p-4 bg-black'>
        <nav className='flex flex-row justify-between'>
          <div className='flex flex-row w-1/5 pl-5 gap-6'>
            <p className='p-2 font-bold text-[#989076] text-2xl'>Readit</p>
            <input className='rounded-2xl bg-transparent placeholder:text-[#FFFFFF] border-3 border-[#555452] p-2' type="text" placeholder={`Find books...`} />
          </div>
          <div className='w-3/5 flex justify-center gap-6'>
            <button className='cursor-pointer text-lg text-white font-bold'>Browse a book</button>
            <button className='cursor-pointer text-lg text-white font-bold'>About Us</button>
            <button className='cursor-pointer text-lg text-white font-bold'>Contact Us</button>
          </div>
          <div className='w-1/5 flex justify-end gap-6 pr-5'>
            <button className='text-[#7E765D] font-bold text-xl'>Login</button>
            <button className='px-5 py-2 bg-amber-500 rounded-2xl font-bold text-white'>Join Readit</button>
          </div>
        </nav>
      </header>
    </div>
  )
}
export default GuestNavbar