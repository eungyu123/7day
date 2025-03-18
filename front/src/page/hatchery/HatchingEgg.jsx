import { EGG_COLORS } from "../../constant/constant";
export default function HatchingEgg({ progress, canHatch, eggType, onClick }) {
  return (
    <div className="hatchery-page-wrapper">
      <div className="hatchery-page-Hatchery-title">순조롭게 부화중</div>
      <div className="hatchery-page-progress-bar-wrapper">
        <div
          className="hatchery-page-progress-bar "
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="hatchery-page-Hatchery">
        <div className="hatchery-page-Hatchery-img"></div>
        <div
          className={`hatchery-page-egg-img-droped  ${
            canHatch ? "cursor scale-egg " : "rotate-egg"
          }`}
          onClick={() => {
            onClick();
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontVariationSettings: "'FILL' 1",
              color: EGG_COLORS[eggType - 1],
              fontSize: "82px",
            }}
          >
            egg
          </span>
        </div>
      </div>
    </div>
  );
}
