import "./HalfBasicButton.css";
// div 링크로 변경, href props 추가
export default function PointButton({ title, des, rightIcon }) {
  return (
    <div className="common-half-btn">
      <div className="common-half-btn-left">
        <div className="common-half-btn-left-title">{title} </div>
        <div className="common-half-btn-left-des">{des}</div>
      </div>
    </div>
  );
}
