import "./FriendPageMain.css";
import FriendRank from "./FriendRank";
import { useState, useEffect } from "react";
import { updateUserFriend, getUserFriend } from "../../api/userApi";
import { getUser } from "../../api/userApi";
import { useAppContext } from "../../context/context";
import { setUser } from "../../context/reducer/action/action";
// import { userId } from "../../constant/constant";
// import { getTodayWalkData } from "../../api/walkApi";

export default function FriendPageMain() {
  const { appState, dispatch } = useAppContext();
  // const [friendData, setFriendData] = useState([]);
  // const [loading, setLoading] = useState(true);

  const friendrecord = [
    { friendName: "조유민", steps: 14000 },
    { friendName: "백은규", steps: 12000 },
    { friendName: "정채빈", steps: 10000 },
    { friendName: "박형준", steps: 4000 },
    { friendName: "안철수", steps: 2000 },
  ];

  // const fetchFriendData = async () => {
  //   try {
  //     //친구 데이터 가져오기
  //     const friendDataResponse = await getUserFriend(); // getUserFriend API 호출
  //     const friendData = friendDataResponse;

  //     const userStepData = await getTodayWalkData(); // getTodayWalkData 사용
  //     const userSteps = userStepData?.steps || 0;

  //     //본인 데이터 가져오기
  //     const userResponse = await getUser(); // 본인 정보 가져오기
  //     const userdata = userResponse.data;

  //     const friendsWithSteps = await Promise.all(
  //       friendData.map(async (friend) => {
  //         const friendStepData = await getTodayWalkData(friend.friendId); // 각 친구의 걸음 수 가져오기
  //         return {
  //           friendId: friend.friendId,
  //           friendName: friend.friendName,
  //           steps: friendStepData?.steps || 0, // 친구의 걸음 수
  //           isSelf: false, // 친구 여부 표시
  //         };
  //       })
  //     );

  //     // 본인데이터 친구 데이터에 추가
  //     const updatedFriendData = [
  //       ...friendsWithSteps,
  //       {
  //         friendId: userdata._id, // 본인의 ID
  //         friendName: userdata.nickname, // 본인의 닉네임
  //         steps: userSteps, // 본인의 걸음 수 (기본값 0)
  //         isSelf: true, // 본인 여부 표시 (UI에서 구별 가능)
  //       },
  //     ];
  //     const sortedData = updatedFriendData.sort((a, b) => b.steps - a.steps);
  //     setFriendData(sortedData);

  //     const user = await getUser();
  //     dispatch(setUser({ user: user.data }));
  //   } catch (error) {
  //     console.error("친구 목록 가져오기 실패:", error.message);
  //     alert("친구 목록을 가져오는 데 실패했습니다.");
  //   }
  //   // finally {
  //   //   setLoading(false); // 로딩 완료
  //   // }
  // };

  // // useEffect로 컴포넌트 마운트 시 친구 목록을 가져오기
  // useEffect(() => {
  //   fetchFriendData();
  // }, [userId]);

  const medals = ["🥇", "🥈", "🥉"];

  // 67c7ab335f743adc8dc272a3, 67c7ab445f743adc8dc272a5, 67c7ab4b5f743adc8dc272a7

  const friendid = "67c7ab4b5f743adc8dc272a7";

  const handleFriendUpdate = async (friendid) => {
    try {
      await updateUserFriend({ friendid });
      const user = await getUser();
      dispatch(setUser({ user: user.data }));
    } catch (error) {
      console.error("친구 업데이트 실패:", error.message);
      alert("친구 업데이트에 실패했습니다.");
    }
  };

  // if (loading) {
  //   return <div>Loading...</div>; // 로딩 중일 때 화면 표시
  // }

  return (
    <div className="friendmaincontainer">
      <div className="friendmaininfocontainer">
        <div className="friendmaininfotetext">
          <p className="friendmaininfotextlg">친구</p>
          <p className="friendmaininfotextsm">현재 3위!</p>
          <p className="friendmaininfotextsm">4000보만 더 걸으면 1위</p>
        </div>
        <p
          className="emojifont font-xl"
          onClick={() => {
            handleFriendUpdate(friendid);
          }}
        >
          📩
        </p>
      </div>
      {friendrecord.map((friend, index) => (
        <FriendRank
          key={index}
          FriendName={friend.friendName}
          FriendWalk={friend.steps}
          FriendRk={index < 3 ? medals[index] : ""}
          IsMe={friend.friendName === "정채빈"}
        />
      ))}
      {/* {friendData.map((friend, index) => (
        <FriendRank
          key={index}
          FriendName={friend.friendName}
          FriendWalk={friend.steps}
          FriendRk={index < 3 ? medals[index] : ""}
          IsMe={friend.isSelf}
        />
      ))} */}
    </div>
  );
}
