import { useState, useRef} from "react";

const imageList = [
    'https://blog.kakaocdn.net/dn/dpxiAT/btqUBv6Fvpn/E8xUMncq7AVuDeOim0LrMk/img.jpg',
    'https://blog.kakaocdn.net/dn/BGT7X/btqUzvTqi5h/flp39GdJH0GU6mo7cTbbhk/img.jpg',
    'https://blog.kakaocdn.net/dn/bWnmfv/btqUBwqZvwA/3CiXGt3SR0TXoOveRJxV91/img.jpg',
    'https://blog.kakaocdn.net/dn/XsLCO/btqUL8PQLwp/NZWCU2jAYKkKSXwcohBKTK/img.jpg',
    'https://blog.kakaocdn.net/dn/bG3iVL/btqUvCZPaRL/ofIjkNWJP1mj2bOG9fie51/img.jpg',
  ];
  
  const SLIDER_WIDTH = 400;
  const SLIDER_HEIGHT = 400;  
  
  export default function Test() {
    const slideList = [imageList.at(-1), ...imageList, imageList.at(0)]

    const [currentIndex, setCurrentIndex] = useState(1); 
    const [transX, setTransX]  = useState(0); 
    const [animate, setAnimate] = useState(false); 
    const startX = useRef(0); 

    const handleMouseDown =  (e) => {
      startX.current = e.clientX;
      setAnimate(false); 
    }

    const handleMouseMove = (e) => {
      if (startX.current) {
        const deltaX = e.clientX - startX.current; 
        setTransX(deltaX); 
      }
    }

    const handleMouseUp = () => {
      if(Math.abs(transX) > 100) {
        setCurrentIndex((prev) => transX < 0 ? prev + 1: prev -1);
      }
      setTransX(0); 
      setAnimate(true); 
      startX.current = 0; 
    }

    return (
      <div className="overflow-hidden"
        style={{width: SLIDER_WIDTH, height: SLIDER_HEIGHT}}
      >
        <div className="flex" style={{          
          transform: `translateX(${-currentIndex * SLIDER_WIDTH + transX}px)`,
          transition: animate ? "transform 300ms ease-in-out" : "none"}}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTransitionEnd={() => {
            setAnimate(false); 
            if(currentIndex === 0 ) setCurrentIndex(slideList.length - 2)
            else if ( currentIndex === slideList.length - 1) setCurrentIndex(1); 
          }}
        >
          {slideList.map((url, i ) => {
            <div key = {i} className="flex-shink-0">
            <img src={url} alt="img" width={SLIDER_WIDTH} draggable={false} />
            </div>
          })}
        </div>
      </div>
    )
  }