import React from 'react'

export default function ProductsSkeleton() {
    return (
        <div className="productCard m-4 border border-gray-300 animate-pulse">
            {/* Image area */}
            <div className="relative">
                <div className="bg-gray-200 h-68 w-full" />
            </div>

            <div className="p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-300 rounded w-1/4" />
            </div>
        </div>
    )
}
