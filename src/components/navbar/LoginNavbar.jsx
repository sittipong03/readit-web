function GuestNavbar() {
  return (
    <nav className='flex flex-row justify-between gap-4 items-center'>
        <div className="self-center">Readlist</div>
        <div className="rounded-full w-8 h-8 border border-[#d5c4a1]"></div>
        <div className="rounded-full w-8 h-8 border border-[#d5c4a1]"></div>
        <div className="rounded-full w-6 h-6 bg-[#d5c4a1]"></div>
        <button>User</button>
    </nav>
  )
}
export default GuestNavbar