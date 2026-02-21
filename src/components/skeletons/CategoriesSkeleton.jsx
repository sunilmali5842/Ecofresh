export default function CategoriesSkeleton({ count = 12 }) {
  return (
    <div className="shadow-lg">
      <h3 className="font-semibold bg-green-600 text-white p-2">
        Categories
      </h3>

      <ul className="p-4">
        {Array.from({ length: count }).map((_, index) => (
          <li
            key={index}
            className="border border-gray-300 p-2 my-2"
          >
            <div className="flex items-center gap-2 animate-pulse">
              <div className="h-4 w-4 bg-gray-300 rounded" />
              <div className="h-4 bg-gray-300 rounded w-3/4" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
