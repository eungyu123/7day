import "./FriendRank.css";

export default function FriendRank({
  FriendName,
  FriendWalk,
  img,
  FriendRk = "",
  IsMe = false,
}) {
  const imgNameWithoutExt = img ? img.replace(/\.[^/.]+$/, "") : "";
  const imgPath = `${imgNameWithoutExt}Head.jpg`;
  const imagePath = `/images/characters/${imgPath}`;
  return (
    <div
      className={`${IsMe ? "friendrankcontainerme" : "friendrankcontainer"}`}
    >
      <div className="friendprofile">
        <img src={imagePath} alt="프로필이미지" className="friendprofileimg" />
      </div>
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
