import "./FriendPageMain.css";
import FriendRank from "./FriendRank";

export default function FriendPageMain() {
  const friendrecord = [
    { FriendName: "조유민", FriendWalk: 14000 },
    { FriendName: "백은규", FriendWalk: 12000 },
    { FriendName: "정채빈", FriendWalk: 10000 },
    { FriendName: "박형준", FriendWalk: 4000 },
    { FriendName: "안철수", FriendWalk: 2000 },
  ];
  const medals = ["🥇", "🥈", "🥉"];
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
            alert("공유하기");
          }}
        >
          📩
        </p>
      </div>
      {friendrecord.map((friend, index) => (
        <FriendRank
          key={index}
          FriendName={friend.FriendName}
          FriendWalk={friend.FriendWalk}
          FriendRk={index < 3 ? medals[index] : ""}
          IsMe={friend.FriendName === "정채빈"}
        />
      ))}
    </div>
  );
}
