import { ChevronLeft, ChevronRight } from 'lucide-react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null

    return (
        <div className="flex items-center justify-center space-x-4 mt-12 mb-8">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-full bg-neutral-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-700 transition-colors"
            >
                <ChevronLeft size={24} />
            </button>

            <span className="text-gray-400 font-medium">
                Page <span className="text-white">{currentPage}</span> of <span className="text-white">{totalPages}</span>
            </span>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full bg-neutral-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-700 transition-colors"
            >
                <ChevronRight size={24} />
            </button>
        </div>
    )
}

export default Pagination

