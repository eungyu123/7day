export default function TrailImage({TrailItem, complete}) {
    return (
        <div className="wc-info-wrapper">
        <div className="wc-info-header">{TrailItem.address}</div>
        <div className="wc-info-title">
          {TrailItem.name}
          <span className="emojifont">{complete && "✅"}</span>
        </div>
        <div className="wc-info-coord">
          {TrailItem.distance}, 경도 {TrailItem.location.lat.toFixed(4)}, 위도{" "}
          {TrailItem.location.lng.toFixed(4)}
        </div>
      </div>
    )
}