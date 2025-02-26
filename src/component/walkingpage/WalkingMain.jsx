import WalkingInfo from "./WalkingInfo";
import "./WalkingMain.css";

export default function WalkingMain() {
  return (
    <div className="walkingmaincontainer">
      <div className="walkingmaininfo">
        <p className="walkingmaininfotext1">산책로 추천</p>
        <p className="walkingmaininfotext2">매일 다른 산책로가 추천돼요</p>
      </div>
      <div className="walkingmaininfolist">
        <div className="walkingmaininfocontainer">
          <WalkingInfo
            walkingmapnavigate="/WalkingCoursePage"
            walkingmapname="산책로1"
            walkingmapkm="1.4km"
          />
        </div>
        <div className="walkingmaininfocontainer">
          <WalkingInfo
            walkingmapnavigate="/WalkingCoursePage"
            walkingmapname="산책로2"
            walkingmapkm="1.3km"
          />
        </div>
        <div className="walkingmaininfocontainer">
          <WalkingInfo
            walkingmapnavigate="/WalkingCoursePage"
            walkingmapname="산책로3"
            walkingmapkm="2.6km"
          />
        </div>
      </div>
    </div>
  );
}
