
export default function LandMarkImage({landmarks, imageIndex}) {
    return (
        <>
        <div className="wc-landmark-header-wrapper">
            <div className="wc-landmark-title-wrapper">
            <h2 className="wc-landmark-title">
                {landmarks.name}
            </h2>
            {landmarks.visited && (
                <div className="wc-landmark-title-stamp"></div>
            )}

            <div
                className="wc-landmark-marker"
                onClick={(e) => {
                e.stopPropagation();
                }}
            >
                <div className="wc-landmark-marker-index">
                {String.fromCharCode(65 + imageIndex)}
                </div>
            </div>
            </div>
                <div className="wc-landmark-coord">
                경도 {landmarks.location.lat}, 위도{" "}
                {landmarks.location.lng}
                </div>
        </div>

        <div className="wc-landmark-info-des">
            {landmarks.description}
        </div>
        </>
        
    )
}