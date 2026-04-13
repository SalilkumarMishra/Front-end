const StarRating = ({ rating }) => {
  const totalStars = 5;

  return (
    <div className="flex items-center">
      {Array.from({ length: totalStars }).map((_, index) => (
        <span
          key={index}
          className="text-yellow-400 text-lg"
        >
          {index < rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
