import { InputX } from "@/components/ui/inputX";

function SearchNavbar() {
  return (
    <div className="grid w-full max-w-[220px] items-center gap-2">
      <InputX
        id="bookSearchNav"
        type="email"
        size="small"
        placeholder="Find books..."
        leadingComponent={<i className="fa-solid fa-book-open-cover"></i>}
      />
    </div>
  );
}
export default SearchNavbar;
