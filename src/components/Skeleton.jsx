
const Skeleton = () => {

  const images = [1,2,3,4,5,6,7,8]

  return (
    <div className="skeleton-grid">
      {images.map((id) => (
        <div key={id} className="skeleton-image">
          <div className="skeleton-image-wrapper">
            <div className="skeleton-image-placeholder"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
