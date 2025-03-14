import "./FriendPageMain.css";
import FriendRank from "./FriendRank";
import { useState, useEffect } from "react";
import { updateUserFriend, getUserFriend } from "../../api/userApi";
import { getUser } from "../../api/userApi";
import { useAppContext } from "../../context/context";
import { setUser } from "../../context/reducer/action/action";
// import { userId } from "../../constant/constant";
import { getWalkData } from "../../api/walkApi";
import FriendAddModal from "../modal/FriendAddModal";

export default function FriendPageMain() {
  const { appState, dispatch } = useAppContext();
  const [friendData, setFriendData] = useState([]);
  const [userRank, setuserRank] = useState(null);
  const [RankText, setRankText] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [haveFriend, setHaveFriend] = useState(false);

  // const friendrecord = [
  //   { friendName: "조유민", steps: 14000 },
  //   { friendName: "백은규", steps: 12000 },
  //   { friendName: "정채빈", steps: 10000 },
  //   { friendName: "박형준", steps: 4000 },
  //   { friendName: "안철수", steps: 2000 },
  // ];

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const fetchFriendData = async () => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const startDate = formatDate(today);
      const endDate = formatDate(today);

      //친구 데이터 가져오기
      const friendDataResponse = await getUserFriend(); // getUserFriend API 호출
      const frienddata = friendDataResponse.data;
      if (frienddata) setHaveFriend(true);
      console.log("친구 데이터 응답:", frienddata);

      //본인 걸음수 가져오기
      const userStepData = await getWalkData(startDate, endDate); // getWalkData 사용
      console.log("userStepdata:", userStepData);
      const userSteps = userStepData?.stepRecords?.[0]?.steps || 0;
      console.log("userSteps:", userSteps);

      //본인 데이터 가져오기
      const userResponse = await getUser(); // 본인 정보 가져오기
      const userdata = userResponse.data;

      const friendsWithSteps = await Promise.all(
        frienddata.map(async (friend) => {
          const friendStepData = await getWalkData(
            startDate,
            endDate,
            friend.friendId
          ); // 각 친구의 걸음 수 가져오기
          return {
            friendId: friend.friendId,
            friendName: friend.friendName,
            steps: friendStepData?.stepRecords?.[0]?.steps || 0, // 친구의 걸음 수
            isSelf: false, // 친구 여부 표시
          };
        })
      );

      // 본인데이터 친구 데이터에 추가
      const updatedFriendData = [
        ...friendsWithSteps,
        {
          friendId: userdata._id, // 본인의 ID
          friendName: userdata.nickname, // 본인의 닉네임
          steps: userSteps, // 본인의 걸음 수 (기본값 0)
          isSelf: true, // 본인 여부 표시 (UI에서 구별 가능)
        },
      ];
      const sortedData = updatedFriendData.sort((a, b) => b.steps - a.steps);
      setFriendData(sortedData);

      const userRankIndex = sortedData.findIndex((friend) => friend.isSelf);
      const firstPlaceSteps = sortedData[0]?.steps || 0;
      const secondPlaceSteps = sortedData[1]?.steps || 0;

      if (userRankIndex != 0) {
        setRankText(`${firstPlaceSteps - userSteps}보만 더 걸으면 1위`);
      } else {
        setRankText(`2위랑 ${firstPlaceSteps - secondPlaceSteps}보 차이`);
      }
      setuserRank(userRankIndex + 1);

      const user = await getUser();
      dispatch(setUser({ user: user.data }));
    } catch (error) {
      console.error("친구 목록 가져오기 실패:", error.message);
      alert("친구 목록을 가져오는 데 실패했습니다.");
    }
  };

  // useEffect로 컴포넌트 마운트 시 친구 목록을 가져오기
  useEffect(() => {
    fetchFriendData();
  }, []);

  const medals = ["🥇", "🥈", "🥉"];

  // 67c7ab335f743adc8dc272a3, 67c7ab445f743adc8dc272a5, 67c7ab4b5f743adc8dc272a7

  return (
    <div className="friendmaincontainer">
      <div className="friendmaininfocontainer">
        <div className="friendmaininfotetext">
          <p className="friendmaininfotextlg">친구</p>
          <p className="friendmaininfotextsm">현재 {userRank}위!</p>
          {haveFriend && <p className="friendmaininfotextsm">{RankText}</p>}
        </div>
        <p
          className="emojifont font-xl"
          onClick={() => setIsModalOpen(true)}
          style={{ cursor: "pointer" }}
        >
          📩
        </p>
        <FriendAddModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          updateUserFriend={updateUserFriend}
          refreshFriendList={fetchFriendData}
        />
      </div>
      {/* {friendrecord.map((friend, index) => (
        <FriendRank
          key={index}
          FriendName={friend.friendName}
          FriendWalk={friend.steps}
          FriendRk={index < 3 ? medals[index] : ""}
          IsMe={friend.friendName === "정채빈"}
        />
      ))} */}
      {friendData.map((friend, index) => (
        <FriendRank
          key={index}
          FriendName={friend.friendName}
          FriendWalk={friend.steps}
          FriendRk={index < 3 ? medals[index] : ""}
          IsMe={friend.isSelf}
        />
      ))}
    </div>
  );
}
