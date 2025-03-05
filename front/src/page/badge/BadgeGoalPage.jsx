import Container from "../../component/common/Container";
import Header from "../../component/common/header/Header";
import "./BadgePage.css";
import BadgeImg from "./tempBadge.png";
import Badge from "../../component/badge/badge";

export default function BadgeGoalPage() {
  const badgeData = [
    {
      id: 1,
      name: "5000보 걷기",
      progressStatus: 80,
      image: BadgeImg,
    },
    {
      id: 2,
      name: "5만보 걷기",
      progressStatus: 40,
      image: BadgeImg,
    },
    {
      id: 3,
      name: "10만보 걷기",
      progressStatus: 20,
      image: BadgeImg,
    },
    {
      id: 4,
      name: "50만보 걷기",
      progressStatus: 5,
      image: BadgeImg,
    },
    {
      id: 5,
      name: "100만보 걷기",
      progressStatus: 1,
      image: BadgeImg,
    },
  ];

  return (
    <>
      <Header PageName={"도전 목표"} BackNavigate="/BadgePage" />
      <div className="container badge-goal-container">
        <p>도전 목표를 완료하면 주어지는 배지들 입니다.</p>
        <div className="badge-goal-main">
          {badgeData.map((badge) => (
            <Badge
              key={badge.id}
              name={badge.name}
              progressStatus={badge.progressStatus}
              image={badge.image}
            />
          ))}
        </div>
      </div>
    </>
  );
}
