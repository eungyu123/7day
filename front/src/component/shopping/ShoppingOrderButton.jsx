import "../../index.css";
import { useNavigate } from "react-router-dom";

// import ConfirmCancelModal from "../modal/ConfirmCancelModal";

export default function ShoppingOrderButton({ buttonText, href = "" }) {
  const navigate = useNavigate();
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNextPage = () => {
    if (href != "") navigate(href);
  };
  return (
    <>
      <div className="shopping-order-button" onClick={handleNextPage}>
        <div className="shopping-order-button-main">{buttonText}</div>
      </div>
      {/* <ConfirmCancelModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        confirmName={"구매"}
        selectedItem={selectedItem}
        img={imgPath}
        type={itemType}
        itemName={itemName}
        price={itemPrice}
      /> */}
    </>
  );
}
