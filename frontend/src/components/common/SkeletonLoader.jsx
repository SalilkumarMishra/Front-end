const SkeletonLoader = ({ count = 4 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="border rounded-lg p-4 shadow-sm">
          {/* Image skeleton */}
          <div className="w-full h-48 bg-gray-200 rounded-md animate-pulse mb-3" />
          
          {/* Title skeleton */}
          <div className="h-6 bg-gray-200 rounded-md animate-pulse mb-3 w-3/4" />
          
          {/* Price skeleton */}
          <div className="h-5 bg-gray-200 rounded-md animate-pulse mb-4 w-1/2" />
          
          {/* Button skeleton */}
          <div className="h-10 bg-gray-200 rounded-lg animate-pulse" />
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;
