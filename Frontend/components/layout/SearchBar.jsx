import React,{useState} from 'react'
import {Search} from 'lucide-react'
import {motion} from 'framer-motion'

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");
    
    
    const handleSearch = (e) => {
          e.preventDefault();
       onSearch(searchTerm);
       };

  return (
    <motion.div 
    initial={{opacity:0,y:-10}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.4}}
    className="w-full flex justify-center mt-10">
        <form onSubmit={handleSearch}
         className="flex items-center
         gap-3 w-[260px] md:w-[450px] lg:w-[700px]
         px-5 py-3 rounded-full bg-white/40 backdrop-blur-xl
         border border-purple-300/40 shadow-lg shadow-purple-300/40
         focus-within:ring-2 focus-within:ring-purple-400
         transition mb-2">
          <Search className="text-purple-500 w-5 h-5" />
          <input
            type="search"
            placeholder="Search your product    > > > >"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent outline-none 
             placeholder:text-purple-200
             text-purple-700 font-medium"
          />
          <button
          type="submit"
          className="
            bg-purple-600 text-white px-5 py-2
            rounded-full font-semibold
            hover:bg-purple-700 transition
            shadow-md shadow-purple-300
          "
        >
          Search
        </button>
        </form>
      </motion.div>
  )
}

export default SearchBar