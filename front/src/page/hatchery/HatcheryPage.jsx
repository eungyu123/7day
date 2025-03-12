import { useFetchEgg } from "../../reactQuery/useEgg";
import "./HatcheryPage.css";
import { useState, useEffect, useRef } from "react";
import Container from "../../component/common/Container";
import Header from "../../component/common/header/Header";
import ButtonWrapper from "../../component/common/wrapper/ButtonWrapper";
import BasicButton from "../../component/common/button/BasicButton";
import { PAGE_URLS } from "../../constant/constant";
import { doHatchApi } from "../../api/eggApi";
import { useQueryClient } from "@tanstack/react-query";
import { useFetchLog } from "../../reactQuery/useLog";
import LogButton from "../../component/common/button/LogButton";


export default function HatcheryPage() {
  const [isHatching, setIsHatching] = useState(false);
  const [eggType, setEggType] = useState(null); 
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [eggStyles, setEggStyles] = useState([]); // eggStyles 상태
  const [progress, setProgress] = useState(0); // 진행 상태를 관리
  const [canHatch, setCanHatch] = useState(true); 

  const [isOpen, setIsOpen] = useState(false); 
  const [reward, setReward] = useState(null); 

  const queryClient = useQueryClient(); 

  const eggRef = useRef(null); 

  const { data } = useFetchEgg();
  const {data:logs} = useFetchLog(); 
  console.log("logs", logs);

  const hatchingEgg = data.data.find((egg) => egg.state == "hatching");
  console.log("hatchingEgg,",hatchingEgg)
  console.log('data', data); 
  useEffect(() => {
    if (hatchingEgg) {
      setIsHatching(true);
      setEggType(hatchingEgg.eggType)
      setProgress((hatchingEgg.currentStep / hatchingEgg.goalWalk) * 100);
      if((hatchingEgg.currentStep > hatchingEgg.goalWalk ||true)){
        setCanHatch(true); 
        console.log(eggRef); 
        if (eggRef?.current) {
          eggRef.current.className = "hatchery-page-egg-img-droped egg-scale"
          eggRef.current.style.cursor = "pointer";
        }

      } 
    }

    const styles = getRandomPosition({ Count: data.data.length });
    setEggStyles(styles); // 상태 업데이트
    setLoading(false); // 로딩 완료 후 상태 변경
  }, []);

  const doHatch = async () => {
    // if(!canHatch ) return 

    console.log("dohatch");
    console.log("hatchingEgg", hatchingEgg);
    const data = await doHatchApi({eggId: hatchingEgg.eggId}); 
    console.log(data);
    if( data.type == "success"){
      setIsOpen(true); 
      setReward(data.data); 
      console.log(data.data);
      queryClient.invalidateQueries("eggs");

    } 
  }

  if (loading) return null;

  return (
    <>
      <Container column={true}>
        {isOpen && 
            <div className="hatchery-page-pet-modal-wrapper" onClick={() => {setIsOpen(false)}}>
                <div className="hatchery-page-pet-modal" onClick={(e) => {e.stopPropagation()}}>
                <div
                  className="hatchery-page-pet-img"
                  style={{
                    backgroundImage: `url(/images/pets/${reward.petLink.split(".")[0]}Head.jpg)`,
                  }}
                ></div>
                  <div   className="hatchery-page-pet-info">{reward.petName} 을 획득했습니다!!</div>
              </div>
            </div>
         }
        <Header PageName={"부화장"} />
        {isHatching ? (
          <div className="hatchery-page-wrapper">
            <div className="hatchery-page-Hatchery-title">순조롭게 부화중</div>
            <div className="hatchery-page-progress-bar-wrapper">
              <div
                className="hatchery-page-progress-bar "
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div
              className="hatchery-page-Hatchery"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="hatchery-page-Hatchery-img"></div>
              <div className="hatchery-page-egg-img-droped rotate-egg" ref={eggRef} onClick={() => {
                doHatch(); 
              }}>
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontVariationSettings: "'FILL' 1",
                    color: colors[eggType - 1],
                    fontSize: "82px",
                  }}
                >
                  egg
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="hatchery-page-wrapper">
            <div
              className="hatchery-page-Hatchery"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="hatchery-page-progress-bar-wrapper ">
                <div
                  className="hatchery-page-progress-bar"
                  style={{ width: `${progress}%` }} // 진행 상태에 따라 width가 변화
                ></div>
              </div>
              <div className="hatchery-page-Hatchery-img"></div>
            </div>
          </div>
        )}

          <ButtonWrapper>
            {logs && logs.data.map((log) => {
              return(
                <LogButton imgSrc={`/images/pets/${log.logContent.split(".")[0]}Head.jpg`} 
                description={log.logContent} href={PAGE_URLS.InventoryPage}/>)

            })}
          </ButtonWrapper>
      </Container>
    </>
  );
}

const colors = ["#FFD700", "#C0C0C0", "#B87333"];

const randomPositionTop = () => {
  return Math.random() * 20 + 65; // 75% ~ 95% 사이의 무작위 위치
};

const randomPositionLeft = () => {
  return Math.random() * 60 + 5; // 75% ~ 95% 사이의 무작위 위치
};

const randomRotate = () => {
  return Math.random() * 50 - 25; // -20도 ~ 20도 사이의 무작위 회전
};
function getDistance(x1, y1, x2, y2) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

const getRandomPosition = ({ Count }) => {
  const styles = [];
  const positions = [];
  const maxAttempts = 20; // 중복 방지 최대 시도 횟수
  const minDistance = 6; // 최소 거리 (단위: %)

  for (let i = 0; i < Count; i++) {
    let attempt = 0;
    let top, left;
    let isValid = false;

    while (attempt < maxAttempts) {
      top = randomPositionTop();
      left = randomPositionLeft();

      if (
        positions.every(
          (pos) => getDistance(pos.top, pos.left, top, left) >= minDistance
        )
      ) {
        isValid = true;
        break;
      }
      attempt++;
    }

    if (!isValid) {
      break;
    }

    positions.push({ top, left });

    styles.push({
      top: `${top}%`,
      left: `${left}%`,
      transform: `rotate(${randomRotate()}deg) translate(80%, 50%)`,
    });
  }

  return styles;
};
