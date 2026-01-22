import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Star, Calendar, Clock, Film, Award, Heart } from 'lucide-react'
import { getMovieDetails } from '../api/omdb'
import { useFavorites } from '../context/FavoritesContext'

const MovieDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const { isFavorite, addFavorite, removeFavorite } = useFavorites()

    useEffect(() => {
        const fetchDetail = async () => {
            if (!id) return
            setLoading(true)
            try {
                const data = await getMovieDetails(id)
                if (data.Response === 'True') {
                    setMovie(data)
                } else {
                    setError(data.Error || 'Failed to load details')
                }
            } catch (err) {
                setError('Connection error')
            } finally {
                setLoading(false)
            }
        }
        fetchDetail()
    }, [id])

    if (loading) {
        return (
            <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-[#E50914] border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    if (error || !movie) {
        return (
            <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center text-white">
                <h2 className="text-2xl font-bold mb-4">Error loading movie</h2>
                <p className="text-gray-400 mb-6">{error}</p>
                <button onClick={() => navigate(-1)} className="text-[#E50914] hover:underline">Go Back</button>
            </div>
        )
    }

    const liked = isFavorite(movie.imdbID)
    const posterSrc = movie.Poster !== 'N/A' ? movie.Poster : 'https://picsum.photos/300/450?grayscale'

    // Convert OmdbMovieDetail to SearchResult structure for favorite saving
    const movieAsSearchResult = {
        Title: movie.Title,
        Year: movie.Year,
        imdbID: movie.imdbID,
        Type: movie.Type,
        Poster: movie.Poster
    }

    const toggleLike = () => {
        if (liked) removeFavorite(movie.imdbID)
        else addFavorite(movieAsSearchResult)
    }

    return (
        <div className="min-h-screen bg-neutral-900 text-white font-sans">
            {/* Dynamic Backdrop */}
            <div
                className="fixed inset-0 w-full h-full bg-cover bg-center opacity-10 blur-xl pointer-events-none"
                style={{ backgroundImage: `url(${posterSrc})` }}
            ></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft size={20} className="mr-2" /> Back to Search
                </button>

                <div className="flex flex-col md:flex-row gap-10">
                    {/* Poster Section */}
                    <div className="flex-shrink-0 w-full md:w-[350px]">
                        <div className="rounded-lg shadow-2xl overflow-hidden border border-neutral-800 relative group">
                            <img
                                src={posterSrc}
                                alt={movie.Title}
                                className="w-full h-auto object-cover"
                            />
                            {/* Floating Action Button for Likes */}
                            <button
                                onClick={toggleLike}
                                className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-3 rounded-full hover:bg-black/70 transition-all border border-white/20"
                            >
                                <Heart fill={liked ? '#E50914' : 'none'} className={liked ? 'text-[#E50914]' : 'text-white'} />
                            </button>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="flex-grow">
                        <div className="flex flex-wrap items-center gap-3 mb-4 text-sm font-semibold tracking-wider text-gray-400">
                            <span className="uppercase border border-gray-600 px-2 py-0.5 rounded text-xs">{movie.Type}</span>
                            {movie.Released !== 'N/A' && <span>{movie.Released}</span>}
                            {movie.Rated !== 'N/A' && <span className="border border-gray-600 px-2 py-0.5 rounded text-xs text-white">{movie.Rated}</span>}
                        </div>

                        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 leading-tight">{movie.Title}</h1>

                        {/* Stats Row */}
                        <div className="flex flex-wrap gap-6 mb-8 text-gray-300">
                            {movie.imdbRating !== 'N/A' && (
                                <div className="flex items-center text-green-400 font-bold">
                                    <Star size={20} className="mr-1 fill-current" /> {movie.imdbRating}/10
                                </div>
                            )}
                            {movie.Runtime !== 'N/A' && (
                                <div className="flex items-center">
                                    <Clock size={20} className="mr-2" /> {movie.Runtime}
                                </div>
                            )}
                            <div className="flex items-center">
                                <Film size={20} className="mr-2" /> {movie.Genre}
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold mb-2 text-white">Plot</h3>
                            <p className="text-gray-300 text-lg leading-relaxed">{movie.Plot}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div>
                                <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-1">Director</h3>
                                <p className="text-white font-medium">{movie.Director}</p>
                            </div>
                            <div>
                                <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-1">Writers</h3>
                                <p className="text-white font-medium">{movie.Writer}</p>
                            </div>
                            <div>
                                <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-1">Cast</h3>
                                <p className="text-white font-medium">{movie.Actors}</p>
                            </div>
                            <div>
                                <h3 className="text-gray-400 text-sm uppercase tracking-widest mb-1">Awards</h3>
                                <div className="flex items-start text-yellow-500">
                                    <Award size={18} className="mr-2 mt-1" />
                                    <p className="text-white font-medium">{movie.Awards}</p>
                                </div>
                            </div>
                        </div>

                        {/* Ratings Cards */}
                        {movie.Ratings && movie.Ratings.length > 0 && (
                            <div className="mt-8 pt-8 border-t border-neutral-800">
                                <h3 className="text-lg font-bold mb-4">Ratings</h3>
                                <div className="flex flex-wrap gap-4">
                                    {movie.Ratings.map((rating, idx) => (
                                        <div key={idx} className="bg-neutral-800/50 rounded p-3 border border-neutral-700">
                                            <div className="text-gray-400 text-xs uppercase mb-1">{rating.Source}</div>
                                            <div className="text-white font-bold">{rating.Value}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieDetails

