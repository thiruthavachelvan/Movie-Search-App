import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PlayCircle, Info, Heart, ImageOff } from 'lucide-react'
import { useFavorites } from '../context/FavoritesContext'

const MovieCard = ({ movie }) => {
    const [imgError, setImgError] = useState(false)
    const { isFavorite, addFavorite, removeFavorite } = useFavorites()
    const liked = isFavorite(movie.imdbID)

    const toggleLike = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (liked) {
            removeFavorite(movie.imdbID)
        } else {
            addFavorite(movie)
        }
    }

    const hasPoster = movie.Poster !== 'N/A' && !imgError

    return (
        <Link to={`/movie/${movie.imdbID}`} className="group relative block bg-neutral-800 rounded-md overflow-hidden aspect-[2/3] transition-transform duration-300 hover:scale-105 hover:z-10 shadow-lg">
            {hasPoster ? (
                <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-40"
                    loading="lazy"
                    onError={() => setImgError(true)}
                />
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center transition-all duration-500 group-hover:scale-110 group-hover:opacity-50"
                    style={{
                        background: `linear-gradient(135deg, 
                            ${['#E50914', '#564d4d', '#221f1f', '#b9090b'][movie.Title.length % 4]} 0%, 
                            #141414 100%)`
                    }}
                >
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-full mb-4 ring-1 ring-white/20">
                        <ImageOff size={32} className="text-white/80" />
                    </div>
                    <span className="text-white font-bold text-sm mb-2 drop-shadow-lg">
                        {movie.Title}
                    </span>
                    <div className="px-3 py-1 bg-[#E50914] text-white text-[10px] font-black uppercase rounded shadow-lg shadow-red-900/50">
                        No Poster Available
                    </div>
                    <span className="text-[10px] text-white/40 mt-3 uppercase tracking-[0.2em]">
                        {movie.Type} • {movie.Year}
                    </span>
                </div>
            )}

            {/* Overlay Content (Visible on Hover) */}
            <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black via-black/60 to-transparent">
                <h3 className="text-white font-bold text-lg leading-tight mb-1 line-clamp-2 drop-shadow-md">
                    {movie.Title}
                </h3>
                <div className="flex items-center text-xs text-gray-300 mb-3 space-x-2">
                    <span className="border border-gray-500 px-1 rounded">{movie.Type}</span>
                    <span>{movie.Year}</span>
                </div>

                <div className="flex items-center gap-2">
                    <button className="flex-1 bg-white text-black py-1.5 px-3 rounded text-sm font-semibold flex items-center justify-center gap-1 hover:bg-gray-200 transition-colors">
                        <PlayCircle size={16} /> Play
                    </button>
                    <button
                        onClick={toggleLike}
                        className="p-1.5 rounded-full border-2 border-gray-400 text-white hover:border-white hover:bg-white/10 transition-all"
                        title={liked ? "Remove from Favorites" : "Add to Favorites"}
                    >
                        <Heart size={16} fill={liked ? "#E50914" : "none"} className={liked ? "text-[#E50914]" : ""} />
                    </button>
                    <div className="p-1.5 rounded-full border-2 border-gray-400 text-white hover:border-white hover:bg-white/10 transition-all">
                        <Info size={16} />
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default MovieCard


