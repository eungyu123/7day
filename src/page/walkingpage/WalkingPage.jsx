import Header from "../../component/common/header/Header";
import "./WalkingPage.css";
import { useNavigate } from "react-router-dom";
import WalkingMain from "../../component/walkingpage/WalkingMain";

export default function WalkingPage() {
  const navigate = useNavigate();

  return (
    <div className="walkingcontainer">
      <Header />
      <WalkingMain />
    </div>
  );
}
