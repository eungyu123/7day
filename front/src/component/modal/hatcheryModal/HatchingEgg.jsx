import { EGG_COLORS } from "../../../constant/constant"

export default function HatchingEgg({setIsOpenHatchery, hatchingProgress, eggType}) {
    return (
        <div
            className="hatchery-modal-wrapper"
            onClick={() => setIsOpenHatchery(false)}
        >
            <div
            className="hatchery-modal-Hatchery"
            onClick={(e) => e.stopPropagation()}
            >
            <div className="hatchery-modal-Hatchery-title">순조롭게 부화중</div>
            <div
                className="hatchery-modal-progress-bar-wrapper"
                style={{ display: "block" }}
            >
                <div
                className="hatchery-modal-progress-bar "
                style={{ width: `${hatchingProgress}%` }}
                ></div>
            </div>
            <div className="hatchery-modal-Hatchery-img"></div>
            <div className="hatchery-modal-egg-img-droped rotate-egg">
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
    )
}