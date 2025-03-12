import Container from "../../../component/common/Container";
import Header from "../../../component/common/header/Header";

export default function Payment() {
    return (
        <Container column={true}>
            <Header/>
            <div className="">
                <div className="">주소</div>
                <div className="">
                    <div className="">주소</div>
                    <div className="">수정</div>
                </div>
            </div>
            <div className="">
                <div className="">주문상품 1건</div>
                <div className="">
                    <div className=""></div>
                    <div className=""></div>
                </div>
            </div>
            <div className="">
                <div className="">
                    <div className="">쿠폰</div>
                    <div className="">보유 쿠폰</div>
                </div>
                <div className="">포인트 적립</div>
                <div className="">주문금액</div>
                <div className="">결제</div>
            </div>
        </Container>
    )
}