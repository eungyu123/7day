export default function PetModal({ setIsOpen, reward }) {
  return (
    <div
      className="hatchery-page-pet-modal-wrapper"
      onClick={() => {
        setIsOpen(false);
      }}
    >
      <div
        className="hatchery-page-pet-modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          className="hatchery-page-pet-img"
          style={{
            backgroundImage: `url(/images/pets/${
              reward.petLink.split(".")[0]
            }Head.jpg)`,
          }}
        ></div>
        <div className="hatchery-page-pet-info">
          {reward.petName} 을 획득했습니다!!
        </div>
      </div>
    </div>
  );
}
