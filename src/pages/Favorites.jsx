import { useFavorites } from '../context/FavoritesContext'
import MovieCard from '../components/MovieCard'
import { Link } from 'react-router-dom'
import { HeartOff } from 'lucide-react'

const Favorites = () => {
    const { favorites } = useFavorites()

    return (
        <div className="min-h-screen bg-neutral-900 pt-24 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-serif font-bold text-white mb-8 border-l-4 border-[#E50914] pl-4">
                    My List
                </h1>

                {favorites.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                        <HeartOff size={64} className="mb-4 opacity-50" />
                        <h2 className="text-xl font-semibold mb-2 text-white">No favorites yet</h2>
                        <p className="mb-6 text-gray-400">Start exploring and add movies to your list!</p>
                        <Link
                            to="/"
                            className="bg-[#E50914] text-white px-6 py-2 rounded font-medium hover:bg-red-700 transition-colors"
                        >
                            Browse Movies
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {favorites.map((movie) => (
                            <MovieCard key={movie.imdbID} movie={movie} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Favorites

