import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import BlogDetailSkeleton from "../skeletons/BlogDetailSkeleton";
import NotFound from "../NotFound";

export default function BlogDetail() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [error, setError] = useState(null);

    const fetchBlog = async () => {
        try {
            const response = await axios.get(
                `https://dummyjson.com/posts/${id}`
            );
            setBlog(response.data);
        } catch (err) {
            setError(err);
        }
    };

    useEffect(() => {
        fetchBlog();
    }, [id]);

    if (error) {
        return <NotFound />
    }

    if (!blog) {
        return <BlogDetailSkeleton />;
    }

    return (
        <section className="max-w-4xl mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold mb-4">
                {blog.title}
            </h1>
            <p className="text-gray-600 mb-4">
                Post ID: {blog.id}
            </p>
            <img loading="lazy" className="mb-4" src={`https://picsum.photos/id/${blog.id}/1200/600`} />
            <p className="text-lg leading-relaxed">
                {blog.body}
            </p>
        </section>
    );
}
