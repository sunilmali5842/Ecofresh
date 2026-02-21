export default function BlogDetailSkeleton() {
  return (
    <section className="max-w-4xl mx-auto py-12 px-4 animate-pulse">
      <div className="h-10 bg-gray-300 rounded w-3/4 mb-6"></div>
      <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-4/6"></div>
      </div>
    </section>
  );
}
