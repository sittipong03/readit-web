import React, { useEffect, useState } from 'react'
import { Person, ReviewButton, Star } from '../icons/Index'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select'
import bookManageStore from '../stores/booksManageStore'
import { Link } from 'react-router'



function Home() {
  const getBooks = bookManageStore(state => state.getAllBooks);
  const books = bookManageStore(state => state.books);
  const [selectBook, setSelectBook] = useState(null)

  useEffect(() => {
    const run = async () => {
      await getBooks()
    }
    run()
  }, [])

  console.log("Books", books)
  return (
    <div className='px-15 pt-30 pb-50 flex flex-row justify-center items-around text-5xl font-bold bg-paper-elevation-2'>
      <div className="flex flex-col justify-center w-1/5 bg-primary-lighter">
        <label>Search</label>
        <Input className="w-80" placeholder="Title Author or ISBN" type="text" />
        <div className="flex flex-col">
          <label className='mb-2'>Sort By : </label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Popularity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="mostvisited">Most visited</SelectItem>
              <SelectItem value="mostsaleed">Most sale</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col">
          <label className='mb-2'>Genre : </label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="ALL" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="mostvisited">Most visited</SelectItem>
              <SelectItem value="mostsaleed">Most sale</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="w-4/5 items-center h-screen overflow-y-auto p-10">
        {/* <Person className="w-50 mb-15" /> */}
        <h1 className='mb-3 subtitle-1'>Browse a book</h1>
        <p className='text-xl mb-5 text-white'>{`${books.length} Result was found`}</p>
        <div className="flex flex-row flex-wrap">
          {books.map((book) => {
            const hdlSelectBook = () => {
              setSelectBook(book.id)
            }
            return <div className='flex flex-col border rounded-2xl p-5 m-5 w-[300px] flex-wrap justify-center gap-3' key={book.id}>
              <h3>{book.title}</h3>
              <p>{`Author : ${book.Author.name}`}</p>
              <div className="flex gap-4">
                <div className='flex gap-2'>
                  <Star className="w-5"/>
                  <p>{book.averageRating}</p>
                </div>
                <div className='flex gap-2'>
                  <Star className="w-5"/>
                  <p>Rate</p>
                </div>
              </div>
              <button className='border w-mg flex rounded-xl p-3 cursor-pointer'><ReviewButton className="w-5"/> Write a review</button>
              <button onClick={hdlSelectBook}>
                <Link to={{
                  pathname: `/book/${book.id}`,
                  state: {id: selectBook}
                }}>View detail</Link>
              </button>
            </div>
})}
        </div>
      </div>
    </div>
  )
}

export default Home