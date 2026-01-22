import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Film, Heart, Search } from 'lucide-react'

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const isHome = location.pathname === '/'

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[#141414]/95 backdrop-blur-sm shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 sm:h-20">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
                            <Film className="h-8 w-8 text-[#E50914] group-hover:scale-110 transition-transform duration-300" />
                            <span className="font-serif font-bold text-2xl tracking-wider text-white">
                                CineStream
                            </span>
                        </Link>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link
                                    to="/"
                                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isHome ? 'text-white' : 'text-gray-300 hover:text-white'
                                        }`}
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/favorites"
                                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                >
                                    My List
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/" className="p-2 text-gray-300 hover:text-white transition-colors">
                            <Search className="w-5 h-5" />
                        </Link>
                        <Link to="/favorites" className="p-2 text-gray-300 hover:text-white transition-colors relative group">
                            <Heart className="w-5 h-5 group-hover:text-[#E50914] transition-colors" />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
