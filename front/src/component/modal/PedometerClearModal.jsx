import React from "react";
import * as Dialog from "@radix-ui/react-dialog";

import "../../page/modal/Modal.css";

// import { getWalkData } from "../../api/walkApi";

export default function CheckModal({ isOpen, setIsOpen }) {
  // const [currentSteps, setCurrentSteps] = useState(0);

  // useEffect(() => {
  //   const fetchWalkData = async () => {
  //     const today = new Date().toISOString().split("T")[0];

  //     const response = await getWalkData(today, today);

  //     if (response.type === "success" && response.stepRecords.length > 0) {
  //       setCurrentSteps(response.stepRecords[0].steps);
  //     }
  //   };
  //   fetchWalkData();
  // }, []);

  const points = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const randomNum = Math.floor(Math.random() * 10);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Content className="modal-content">
        <div className="modal-header">
          <Dialog.Close asChild>
            <button className="close-button">X</button>
          </Dialog.Close>
        </div>
        <div className="modal-body">
          <div className="modal-message">만보를 달성하셨습니다</div>
          <br />
          <img
            src="https://em-content.zobj.net/source/microsoft-teams/363/wrapped-gift_1f381.png"
            loading="lazy"
            alt="15.0"
            style={{ width: "60px", height: "60px", marginBottom: "20px" }}
          />
          <p>
            <b>{points[randomNum]}포인트</b> 획득!
          </p>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}
