import "../../index.css";
import { useNavigate } from "react-router-dom";
import { PAGE_URLS } from "../../constant/constant";
import { Link } from "react-router-dom";

// import ConfirmCancelModal from "../modal/ConfirmCancelModal";

export default function ShoppingOrderButton({ buttonText, href = "", index }) {
  const navigate = useNavigate();
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNextPage = () => {
    if (href != "") navigate(href);
  };
  return (
    <>
      <Link
        className="shopping-order-button"
        onClick={handleNextPage}
        to={`${PAGE_URLS.ShoppingOrderPage}?index=${index}`}
      >
        <div className="shopping-order-button-main">{buttonText}</div>
      </Link>
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
