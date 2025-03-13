import { useState, useEffect, useRef } from "react";

export default function OverView() {
  const [imgIndex, setImgIndex] = useState(0);
  const intervalRef = useRef(null);
  
  const imgurl = ["1", "1", "1", "1"];
  const imgInfo = [
    {title: "포인트 획득", info: "걸으면서 포인트를 챙기고 펫과 캐릭터를 구매하세요!"}, 
    {title: "캐릭터와 펫", info:"캐릭터와 펫을 사용하세요"}, 
    {title: "산책로 스탬프", info:"주변 산책로와 명소를 돌아다니면서 스탬프를 찍으세요!"}, 
    {title: "걸음 분석" , info: "걸음 분석 기록을 확인하세요"}, 
    {title: "미션과 뱃지", info: "미션과 뱃지를 얻어 성취감을 얻으세요"}
  ];

  
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % imgurl.length);
    }, 7000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);




  return (
    <div className="overview-wrapper">
      <div 
        className="overview-img-wrapper"
        draggable={true}

      >
        <img src={imgurl[imgIndex]}  className="overview-img" />
      </div>

      <div 
        className="overview-img-index-circle-wrapper"
        >
        {Array(imgInfo.length).fill().map( (_, idx) => {
            return (
                <div className={`overview-img-index-circle ${idx == imgIndex && "selected"}`}></div>
            )
        })}
      </div>

      <div className="overview-img-title">{imgInfo[imgIndex].title}</div>
      <div className="overview-img-info">{imgInfo[imgIndex].info}</div>
    </div>
  );
}
