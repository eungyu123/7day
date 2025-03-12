import Container from "../../../component/common/Container";

export default function ShopMain() {
    return (
        <Container column={true}>
        <div className="spm-header">
            <div className="">토스 쇼핑</div>
            <div className="">
                <div className="">검색</div>
                <div className="">사용자</div>
                <div className="">장바구니</div>
            </div>
        </div>
        <div className="spm-content-wrapper">
            <div className="spm-content-header">
                <div className="">하루특가</div>
                <div className="">전체보기</div>
            </div>
            <div className="spm-content">
                <div className="spm-content-img"></div>
                <div className="spm-content-info">
                    <div className="">나이키 반팔</div>
                    <div className="">오늘만 18000원</div>
                    <div className="">1.6천명이 구경함 무료배송</div>
                </div>
            </div>
        </div>
        <div className="spm-content-wrapper">
            <div className="spm-content-header">
                <div className="">하루특가</div>
                <div className="">전체보기</div>
            </div>
            <div className="spm-content-info">
                <div className="">나이키 반팔</div>
                <div className="">오늘만 18000원</div>
                <div className="">1.6천명이 구경함 무료배송</div>
            </div>
        </div>
        </Container>

    )
}