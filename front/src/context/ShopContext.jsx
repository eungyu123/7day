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
    },
    {
      Item: "핸드폰 젤리 케이스",
      ItemImg: "src/page/shopping/phonecase.jpg",
      price: 15000,
      discount: 30,
      Company: "phonecasecompany",
      Category: "기타",
    },
    {
      Item: "꿀고구마 1kg",
      price: 35000,
      discount: 60,
      ItemImg: "src/page/shopping/goguma.png",
      Company: "해뜨레",
      Category: "음식",
    },
    {
      Item: "나이키 모자",
      ItemImg: "src/page/shopping/cap.jpg",
      price: 50000,
      discount: 20,
      Company: "Nike",
      Category: "옷",
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
