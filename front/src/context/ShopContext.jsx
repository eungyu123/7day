import { createContext, useContext, useState } from "react";

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  const [shopItems, setShopItems] = useState([
    {
      Item: "여성 와이드 팬츠",
      ItemImg: "src/page/shopping/widepants.jpg",
      price: 38000,
      discount: 50,
      Company: "musinsa",
      Category: "옷",
      delivery: false,
    },
    {
      Item: "핸드폰 젤리 케이스",
      ItemImg: "src/page/shopping/phonecase.jpg",
      price: 15000,
      discount: 30,
      Company: "phonecasecompany",
      Category: "기타",
      delivery: false,
    },
    {
      Item: "[스초생]스트로베리 초콜릿 생크림",
      ItemImg: "src/page/shopping/cake.jpg",
      price: 37000,
      discount: 10,
      Company: "투썸플레이스",
      Category: "음식",
      delivery: false,
    },
    {
      Item: "카밍 샷 아줄렌 선크림(SPF50+/PA++++)",
      price: 16000,
      discount: 38,
      ItemImg: "src/page/shopping/suncream.jpg",
      Company: "Mamonde",
      Category: "화장품",
      delivery: true,
    },
    {
      Item: "나이키 모자",
      ItemImg: "src/page/shopping/cap.jpg",
      price: 50000,
      discount: 20,
      Company: "Nike",
      Category: "옷",
      delivery: true,
    },
    {
      Item: "꿀고구마 1kg",
      price: 35000,
      discount: 60,
      ItemImg: "src/page/shopping/goguma.png",
      Company: "해뜨레",
      Category: "음식",
      delivery: false,
    },
  ]);

  return (
    <ShopContext.Provider value={{ shopItems, setShopItems }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShopContext = () => {
  return useContext(ShopContext);
};
