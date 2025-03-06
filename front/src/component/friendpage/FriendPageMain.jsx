import "./FriendPageMain.css";
import FriendRank from "./FriendRank";
import { updateUserFriend, getUserFriend } from "../../api/userApi";
import { getUser } from "../../api/userApi";
import { useAppContext } from "../../context/context";
import { setUser } from "../../context/reducer/action/action";
import { userId } from "../../constant/constant";

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
  //     const data = await getUserFriend(); // getUserFriend API 호출
  //     const sortedData = data.sort((a, b) => b.steps - a.steps);
  //     setFriendData(sortedData);
  //     const user = await getUser();
  //     dispatch(setUser({ user: user.data }));
  //   } catch (error) {
  //     console.error("친구 목록 가져오기 실패:", error.message);
  //     alert("친구 목록을 가져오는 데 실패했습니다.");
  //   } finally {
  //     setLoading(false); // 로딩 완료
  //   }
  // };

  // useEffect로 컴포넌트 마운트 시 친구 목록을 가져오기
  // useEffect(() => {
  //   fetchFriendData();
  // }, [userId]);

  const medals = ["🥇", "🥈", "🥉"];

  const friendid = "abcdefg";

  const handleFriendUpdate = async (friendid) => {
    try {
      const response = await updateUserFriend({ friendid });
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
      {/* {friendData.map((friend, index) => ( */}
      {friendrecord.map((friend, index) => (
        <FriendRank
          key={index}
          FriendName={friend.friendName}
          FriendWalk={friend.steps}
          FriendRk={index < 3 ? medals[index] : ""}
          IsMe={friend.friendName === "정채빈"}
        />
      ))}
    </div>
  );
}
