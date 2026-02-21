import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../Pagination";
import { Link } from "react-router";

export default function BlogList({ limit = 9, showPagination = true, viewMoreBlogs = false }) {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    const getBlogs = async () => {
        try {
            const skip = (page - 1) * limit;
            const response = await axios.get(
                `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`
            );

            setPosts(response.data.posts);
            setTotal(response.data.total);
        } catch (err) {
            setError(err);
        }
    };

    useEffect(() => {
        getBlogs();
    }, [page, limit]);

    return (
        <section className="bg-white-100 py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">
                    Latest News
                </h2>

                {error && (
                    <p className="text-red-600 text-center mb-4">
                        Failed to load blogs.
                    </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="bg-white rounded-lg shadow-md hover:shadow-lg transition"
                        >
                            <Link to={`/blogs/${post.id}`}>
                                <img
                                    loading="lazy"
                                    width="600"
                                    height="400"
                                    className="w-full h-56 object-cover"
                                    src={`https://picsum.photos/id/${post.id % 100}/600/400`}
                                    alt={post.title}
                                />
                            </Link>

                            <div className="p-4">
                                <h5 className="font-semibold text-lg mb-3">
                                    <Link to={`/blogs/${post.id}`}>{post.title}</Link>
                                </h5>

                                <p className="text-sm text-gray-600 line-clamp-3">
                                    {post.body}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                {viewMoreBlogs && (
                    <div className="text-center mt-8">
                        <Link
                            to="/blogs"
                            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition duration-300"
                        >
                            View More Blogs <span>→</span>
                        </Link>
                    </div>
                )}

                {
                    showPagination && <Pagination
                        currentPage={page}
                        totalItems={total}
                        itemsPerPage={limit}
                        onPageChange={setPage}
                    />
                }
            </div>
        </section>
    );
}
