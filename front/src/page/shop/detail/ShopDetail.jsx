import Container from "../../../component/common/Container"
import Header from "../../../component/common/header/Header"

export const shopDetail = ()=> {
    return(
        <Container column={true}>
            <div className="spd-header">
                <div className="">뒤로가기</div>
                <div className="">검색</div>
                <div className="">장바구니</div>
            </div>
                <div className="spd-content-img"></div>
                <div className="spd-content-wrapper">
                    <div className="spd-content-header">
                        <div className="">켈로그</div>
                        <div className="">별점</div>
                    </div>
                    <div className="spd-content-title"></div>
                    <div className="spd-content-price"></div>
                    <div className="spd-content-price"></div>
                    <div className="">무료배송</div>
                    <div className="spd-content-derivery">
                        <div className=""></div>
                        <div className=""></div>
                    </div>
                    <div className="spd-content-derivery">
                        <div className=""></div>
                        <div className=""></div>
                    </div>
                    <div className="spd-review">
                        <div className=""></div>
                        <div className=""></div>
                    </div>
                    <div className="">
                    <div className="">정보</div>
                    <div className="">리뷰</div>
                    </div>
                    <div className="spd-review-img"></div>
                    <div className="spd-review-wrapper">
                        <div className=""></div>
                        <div className=""></div>
                    </div>

                </div>
        </Container>
    )
}