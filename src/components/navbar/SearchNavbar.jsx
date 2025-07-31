import { BookOpen, Bell, ShoppingCart, Bookmark } from 'lucide-react';

function SearchNavbar() {
  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
        <BookOpen size={16} />
      </span>
      <input
        type="text"
        placeholder="Find books..."
        className="bg-transparent border border-gray-600 text-white pl-10 pr-4 py-1.5 rounded-full placeholder-gray-400 focus:outline-none focus:border-orange-500 w-64"
      />
    </div>
  )
}
export default SearchNavbar