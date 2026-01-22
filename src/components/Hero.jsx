import { Play, List } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
    const navigate = useNavigate()

    const scrollToSearch = () => {
        window.scrollTo({
            top: window.innerHeight * 0.7,
            behavior: 'smooth'
        })
    }

    return (
        <div className="relative h-[80vh] min-h-[600px] w-full overflow-hidden mb-0">
            {/* Animated Gradient Background mimicking video */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-black"
                style={{
                    animation: 'gradientMove 15s ease infinite',
                    backgroundSize: '400% 400%'
                }}
            >
                {/* Abstract shapes overlay */}
                <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
            </div>

            {/* Content */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent flex flex-col justify-center pb-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 drop-shadow-lg max-w-3xl animate-fade-in leading-tight">
                        Unlimited movies, TV shows, and more
                    </h1>
                    <p className="text-lg md:text-2xl text-gray-200 mb-10 max-w-2xl drop-shadow-md animate-slide-up leading-relaxed" style={{ animationDelay: '0.2s' }}>
                        Watch anywhere. Cancel anytime. Start your search now to explore a world of cinema.
                    </p>

                    <div className="flex space-x-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                        <button
                            onClick={scrollToSearch}
                            className="bg-white text-black px-8 py-3.5 rounded-md font-bold text-lg flex items-center gap-2 hover:bg-gray-200 transition-colors"
                        >
                            <Play size={24} fill="currentColor" /> Explore Movies
                        </button>
                        <button
                            onClick={() => navigate('/favorites')}
                            className="bg-gray-500/40 text-white px-8 py-3.5 rounded-md font-bold text-lg flex items-center gap-2 hover:bg-gray-500/30 transition-colors backdrop-blur-md border border-white/10"
                        >
                            <List size={24} /> My Watchlist
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero

