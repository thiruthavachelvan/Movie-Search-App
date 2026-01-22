import { useState, useEffect } from 'react'
import { searchMovies } from '../api/omdb'
import Hero from '../components/Hero'
import MovieCard from '../components/MovieCard'
import Pagination from '../components/Pagination'
import { Search, ChevronDown, Filter } from 'lucide-react'

const Home = () => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [query, setQuery] = useState('Marvel') // Default search
    const [searchInput, setSearchInput] = useState('')
    const [type, setType] = useState('')
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    useEffect(() => {
        if (!query) return

        const fetchMovies = async () => {
            setLoading(true)
            setError(null)
            try {
                const data = await searchMovies(query, page, type)
                if (data.Response === "True") {
                    const filteredMovies = data.Search.filter(movie => movie.Poster !== 'N/A')
                    setMovies(filteredMovies)
                    setTotalResults(parseInt(data.totalResults, 10))
                } else {
                    setMovies([])
                    setTotalResults(0)
                    setError(data.Error || 'No results found.')
                }
            } catch (err) {
                setError('An unexpected error occurred.')
            } finally {
                setLoading(false)
            }
        }

        fetchMovies()
    }, [query, page, type])

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        if (searchInput.trim()) {
            setQuery(searchInput)
            setPage(1) // Reset to first page on new search
        }
    }

    const totalPages = Math.ceil(totalResults / 10)

    return (
        <div className="min-h-screen bg-neutral-900 pb-10">
            <Hero />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">

                {/* Search & Filter Section */}
                <div className="flex justify-center mb-16">
                    <form
                        onSubmit={handleSearchSubmit}
                        className="w-full max-w-4xl bg-black/70 backdrop-blur-xl border border-white/10 p-2 rounded-full flex flex-col sm:flex-row items-center shadow-2xl transition-all focus-within:bg-black/80 focus-within:border-white/30 group"
                    >
                        {/* Search Input Area */}
                        <div className="flex-grow flex items-center w-full sm:w-auto px-6 py-3 sm:py-2">
                            <Search className="text-gray-400 w-5 h-5 mr-3 group-focus-within:text-white transition-colors" />
                            <input
                                type="text"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Search movies, series, episodes..."
                                className="w-full bg-transparent text-white border-none focus:ring-0 placeholder-gray-400 text-lg h-10 outline-none"
                            />
                        </div>

                        {/* Divider (Hidden on mobile) */}
                        <div className="hidden sm:block w-px h-8 bg-white/20 mx-2"></div>

                        {/* Filter Dropdown Area */}
                        <div className="w-full sm:w-auto flex items-center border-t border-white/10 sm:border-none relative">
                            <div className="relative w-full sm:w-auto">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                                    <Filter size={16} />
                                </div>
                                <select
                                    value={type}
                                    onChange={(e) => {
                                        setType(e.target.value)
                                        setPage(1)
                                    }}
                                    className="w-full sm:w-48 bg-transparent text-gray-200 font-medium py-4 sm:py-2 pl-10 pr-10 appearance-none focus:ring-0 border-none cursor-pointer hover:text-white transition-colors outline-none"
                                >
                                    <option value="" className="bg-neutral-800 text-white">All Types</option>
                                    <option value="movie" className="bg-neutral-800 text-white">Movies</option>
                                    <option value="series" className="bg-neutral-800 text-white">Series</option>
                                    <option value="episode" className="bg-neutral-800 text-white">Episodes</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
                            </div>
                        </div>

                        {/* Search Button */}
                        <button
                            type="submit"
                            className="w-full sm:w-auto mt-2 sm:mt-0 bg-[#E50914] hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold text-lg transition-all transform active:scale-95 shadow-lg shadow-red-900/20"
                        >
                            Search
                        </button>
                    </form>
                </div>

                {/* Results Section */}
                <div className="mb-6 flex items-end justify-between px-2">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white leading-none">
                        {loading ? (
                            <span className="animate-pulse">Searching...</span>
                        ) : query === 'Marvel' ? (
                            <>Marvel <span className="text-[#E50914]">TV Shows and Movies</span></>
                        ) : (
                            <>Results for <span className="text-[#E50914]">"{query}"</span></>
                        )}
                    </h2>
                    {!loading && !error && (
                        <span className="text-gray-400 text-sm">{totalResults} titles found</span>
                    )}
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {/* Skeleton Loaders */}
                        {Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className="bg-neutral-800 rounded-md aspect-[2/3] animate-pulse"></div>
                        ))}
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-neutral-800/30 rounded-2xl border border-white/5 backdrop-blur-sm">
                        <div className="text-[#E50914] text-6xl mb-4 opacity-80">:(</div>
                        <h3 className="text-2xl text-white font-bold mb-2">No results found</h3>
                        <p className="text-gray-400 max-w-md text-center">{error}</p>
                    </div>
                ) : movies.length > 0 ? (
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">
                            {movies.map((movie) => (
                                <MovieCard key={movie.imdbID} movie={movie} />
                            ))}
                        </div>

                        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                    </>
                ) : null}
            </div>
        </div>
    )
}

export default Home

