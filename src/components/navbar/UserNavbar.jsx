import { Cart, Notification } from "@/src/icons/Index";
import { SparklesIcon } from "../icons/sparkles-icon";

function UserNavbar() {
  return (
    <div className="h-[60px] w-full border">
      <header className="bg-black p-4">
        <nav className="flex flex-row justify-between">
          <div className="flex w-1/5 flex-row gap-6 pl-5">
            <p className="p-2 text-3xl font-bold text-[#989076]">Readit</p>
            <div className="grid w-full max-w-sm items-center gap-2">
              <InputX
                label="Test"
                id="pictureX"
                type="email"
                placeholder="Find books..."
                leadingComponent={<i class="fa-solid fa-book-open-cover"></i>}
              />
            </div>
          </div>
          <div className="flex w-3/5 justify-center gap-6">
            <button className="cursor-pointer text-lg font-bold text-white">
              Browse a book
            </button>
            <button className="cursor-pointer text-lg font-bold text-white">
              About Us
            </button>
            <button className="cursor-pointer text-lg font-bold text-white">
              Contact Us
            </button>
          </div>
          <div className="flex w-1/5 justify-end gap-6 pr-5">
            <button className="text-xl font-bold text-[#7e765d]">
              Readlist
            </button>
            <Button variant="text">
              <SparklesIcon /> Test
            </Button>
            <button>
              <Notification className="w-12 rounded-[50%] border border-[#7e765d] p-1" />
            </button>
            <button>
              <Cart className="w-12 rounded-[50%] border border-[#7e765d] p-1" />
            </button>
            <button className="rounded-2xl bg-amber-500 p-2 font-bold text-white">
              User
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
}
export default UserNavbar;
