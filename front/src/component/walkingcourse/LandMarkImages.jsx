
export default function LandmarkImages ({ landmarks, imageIndex, clickMarker }) {
  return (
    <div className="wc-info-imgs">
      {landmarks.map((landmark, index) => (
        <div
          key={index}
          className={`wc-info-img ${imageIndex === index ? "selected" : ""}`}
          style={{ backgroundImage: `url(http://localhost:3000/image/${landmark.image})` }}
          onClick={() => clickMarker(index)}
        ></div>
      ))}
    </div>
  );
};