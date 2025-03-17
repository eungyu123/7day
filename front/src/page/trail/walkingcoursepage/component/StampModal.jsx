
export default function StampModal ({ isOpen, landmark, isOpenStamp, setIsOpen, doStamp }) {
    if (!isOpen) return null;
  
    return (
      <div className="wc-stamp-modal-wrapper" onClick={() => setIsOpen(false)}>
        <div
          className="wc-stamp-modal"
          onClick={(e) => e.stopPropagation()}
        >
          {landmark.visited ? (
            <div className="wc-stamp-wrapper">
              <div className="wc-stamp-title">{landmark.name}</div>
              <div className="wc-stamp-img"></div>
              <div className="wc-stamp-day">{landmark.visitedAt?.split("T")[0]}</div>
              <div className="wc-stamp-button">자랑하기!</div>
            </div>
          ) : (
            <div className="wc-stamp-wrapper not-visited">
              {isOpenStamp && <div className="wc-stamp-animation"></div>}
              <div className="wc-stamp-title">{landmark.name}</div>
              <div className="wc-stamp-not-visit">
                근처에 도착하면 <br />
                스탬프를 찍어주세요!
              </div>
              <div className="wc-stamp-button" onClick={() => doStamp()}>
                스탬프 찍기!
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };