const CategoryPageSkleton = () => {
  return (
    <>
      <div className="space-y-6 px-4 py-6">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center bg-gray-200 rounded-xl p-4 animate-pulse mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full" />
            <div className="w-32 h-6 bg-gray-300 rounded" />
          </div>
          <div className="w-20 h-6 bg-gray-300 rounded" />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Section Skeleton */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            {/* Hero Image Skeleton */}
            <div className="w-full h-64 md:h-96 bg-gray-200 rounded-xl animate-pulse" />

            {/* Featured / Highlights Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-56 bg-gray-200 rounded-xl animate-pulse"
                />
              ))}
            </div>

            {/* Main Products Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-56 bg-gray-200 rounded-xl animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Right Sidebar Skeleton */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            {/* Subcategory Skeleton */}
            <div className="bg-gray-200 rounded-xl p-4 animate-pulse space-y-3">
              <div className="w-24 h-5 bg-gray-300 rounded" />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-16 h-6 bg-gray-300 rounded-full" />
                ))}
              </div>
            </div>

            {/* SmallCards Skeleton */}
            <div className="flex flex-col gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-20 bg-gray-200 rounded-xl animate-pulse"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPageSkleton;
