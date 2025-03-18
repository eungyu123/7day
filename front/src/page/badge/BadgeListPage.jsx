import Container from "../../component/common/Container";
import Header from "../../component/common/header/Header";
import "./BadgePage.css";
import BadgeImg from "./tempBadge.png";
import MyBadge from "../../component/badge/myBadge";

export default function BadgeListPage() {
  const badgeData = [
    {
      id: 1,
      name: "5000보 걷기",
      image: BadgeImg,
    },
  ];

  return (
    <>
      <Header PageName={"획득한 배지"} BackNavigate="/BadgePage" />
      <div className="container badge-goal-container">
        <p>도전 목표를 달성한 후 받은 배지입니다.</p>
        <div className="badge-goal-main">
          {badgeData.map((badge) => (
            <MyBadge key={badge.id} image={badge.image} name={badge.name} />
          ))}
        </div>
      </div>
    </>
  );
}
