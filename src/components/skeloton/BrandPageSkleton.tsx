const BrandPageSkleton = () => {
  return (
    <div className="space-y-6 px-4 py-6">
      {/* Header skeleton */}
      <div className="flex justify-between items-center animate-pulse bg-gray-100 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full" />
          <div className="w-32 h-6 bg-gray-200 rounded" />
        </div>
        <div className="w-20 h-6 bg-gray-200 rounded" />
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left section */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Hero skeleton */}
          <div className="w-full h-64 md:h-96 bg-gray-200 rounded-xl animate-pulse" />

          {/* Featured / Highlights skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-56 bg-gray-200 rounded-xl animate-pulse"
              />
            ))}
          </div>

          {/* Main products skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-56 bg-gray-200 rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Right sidebar skeleton */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          {/* Subcategory skeleton */}
          <div className="bg-gray-100 rounded-xl p-4 space-y-3 animate-pulse">
            <div className="w-24 h-5 bg-gray-200 rounded" />
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-16 h-6 bg-gray-200 rounded-full" />
              ))}
            </div>
          </div>

          {/* Small cards skeleton */}
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
  );
};

export default BrandPageSkleton;
