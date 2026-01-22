import { Github, Twitter, Instagram } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="bg-neutral-900 border-t border-neutral-800 pt-10 pb-6 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-400">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-white font-serif font-bold text-xl mb-2">CineStream</h2>
                        <p className="text-sm">Your ultimate destination for movies and series.</p>
                    </div>
                    <div className="flex space-x-6">
                        <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Github size={20} /></a>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-8">
                    <a href="#" className="hover:underline">Audio Description</a>
                    <a href="#" className="hover:underline">Help Center</a>
                    <a href="#" className="hover:underline">Gift Cards</a>
                    <a href="#" className="hover:underline">Media Center</a>
                    <a href="#" className="hover:underline">Investor Relations</a>
                    <a href="#" className="hover:underline">Jobs</a>
                    <a href="#" className="hover:underline">Terms of Use</a>
                    <a href="#" className="hover:underline">Privacy</a>
                </div>
                <div className="text-center text-xs text-gray-600">
                    &copy; {new Date().getFullYear()} CineStream. All rights reserved. Data provided by OMDB.
                </div>
            </div>
        </footer>
    )
}

export default Footer
