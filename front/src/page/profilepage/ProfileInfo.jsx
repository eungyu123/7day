export default function ProfileInfo({userPoint, distance, currentSteps}) {
    return (
        <div className="profile-info-wrapper">
        <div className="profile-money">
            <span className="emojifont">💎</span>
            {userPoint}원
        </div>
        <div className="profile-steps font-xs">
          <span className="font-sm">{distance}</span>
          <span className="font-xs">km</span> &nbsp;
          <span className="font-md">{currentSteps}</span> &nbsp;
          <span className="font-sm">걸음</span>
        </div>
      </div>
    )
}