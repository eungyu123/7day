import Container from "../../../component/common/Container";

export default function ShopDelevery() {
    return (
        <Container column={true}>
        <Header/>
        <div className="">주소</div>
        <div className="">
            <div className="">주소</div>
            <div className="">받는분</div>
            <div className="">휴대폰 번호</div>
            <div className="">배송시 요청사항</div>
        </div>
        <div className="">확인</div>
        </Container>

    )
}