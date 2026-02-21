import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-7xl font-bold text-green-600 mb-4">
        404
      </h1>

      <p className="text-xl mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>

      <Link
        to="/"
        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
