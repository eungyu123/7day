import { useFetchEgg } from "../../reactQuery/useEgg";
import "./HatcheryPage.css";
import { useState, useEffect, useRef } from "react";
import Container from "../../component/common/Container";
import Header from "../../component/common/header/Header";
import ButtonWrapper from "../../component/common/wrapper/ButtonWrapper";
import { PAGE_URLS } from "../../constant/constant";
import { doHatchApi } from "../../api/eggApi";
import { useQueryClient } from "@tanstack/react-query";
import { useFetchLog } from "../../reactQuery/useLog";
import LogButton from "../../component/common/button/LogButton";
import PetModal from "./petModal";
import HatchingEgg from "./HatchingEgg";

export default function HatcheryPage() {
  const [isHatching, setIsHatching] = useState(false);
  const [eggType, setEggType] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [progress, setProgress] = useState(0); // 진행 상태를 관리
  const [canHatch, setCanHatch] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [reward, setReward] = useState(null);

  const queryClient = useQueryClient();

  const { data: eggs } = useFetchEgg();
  const { data: logs } = useFetchLog();

  let hatchingEgg;
  if (eggs.type == "success") {
    hatchingEgg = eggs?.data?.find((egg) => egg.state == "hatching");
  } else {
    hatchingEgg = false;
  }

  useEffect(() => {
    if (eggs.type == "success") {
      if (hatchingEgg) {
        setIsHatching(true);
        setEggType(hatchingEgg.eggType);
        setProgress((hatchingEgg.currentStep / hatchingEgg.goalWalk) * 100);
        if (hatchingEgg.currentStep >= hatchingEgg.goalWalk) {
          setCanHatch(true);
        }
      } else {
        setIsHatching(false);
      }
    }
    setLoading(false); // 로딩 완료 후 상태 변경
  }, [eggs]);

  const doHatch = async () => {
    if (!canHatch) return;
    console.log("hatchingEgg", hatchingEgg);
    const data = await doHatchApi({ eggId: hatchingEgg.eggId });
    if (data.type == "success") {
      setIsOpen(true);
      setReward(data.data);
      await queryClient.invalidateQueries("eggs");
      await queryClient.refetchQueries("eggs");
    }
  };

  if (loading) return null;

  return (
    <>
      <Container column={true}>
        {isOpen && <PetModal setIsOpen={setIsOpen} reward={reward} />}
        <Header PageName={"부화장"} />
        {isHatching ? (
          <HatchingEgg
            progress={progress}
            canHatch={canHatch}
            eggType={eggType}
            onClick={doHatch}
          />
        ) : (
          <div className="hatchery-page-wrapper">
            <div className="hatchery-page-Hatchery-img"></div>
          </div>
        )}

        <ButtonWrapper>
          {logs &&
            logs.data.map((log) => {
              return (
                <LogButton
                  imgSrc={`/images/pets/${
                    log.logContent.split(".")[0]
                  }Head.jpg`}
                  description={log.logContent}
                  href={PAGE_URLS.InventoryPage}
                />
              );
            })}
        </ButtonWrapper>
      </Container>
    </>
  );
}
