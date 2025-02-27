import "./FriendRank.css";

export default function FriendRank({
  FriendName,
  FriendWalk,
  FriendRk = "",
  IsMe = false,
}) {
  return (
    <div
      className={`${IsMe ? "friendrankcontainerme" : "friendrankcontainer"}`}
    >
      <div className="friendprofile"></div>
      <div className="friendrankinfo">
        <div className="friendranknamemedal">
          <p className="friendrankname">{FriendName}</p>
          <p className="emojifont">{FriendRk}</p>
        </div>
        <p className="friendrankwalk">{FriendWalk}보</p>
      </div>
    </div>
  );
}
