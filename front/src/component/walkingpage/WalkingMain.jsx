import WalkingInfo from "./WalkingInfo";
import "./WalkingMain.css";
import OpenAI from "openai/index.mjs";
import { useState, useEffect } from "react";

export default function WalkingMain() {
  const [walkingRoutes, setWalkingRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    async function fetchWalkingRoutes() {
      const openai = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY, // Use environment variable
        dangerouslyAllowBrowser: true, // Only if using in frontend (not recommended)
      });

      try {
        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: "추천할 산책로 3개를 알려줘." }],
        });
        console.log("OpenAI 응답:", response); // 응답 로그 출력

        if (response && response.choices && response.choices[0]) {
          const routes = response.choices[0].message.content.split("\n");
          setWalkingRoutes(routes);
        } else {
          console.error("잘못된 응답:", response);
        }
      } catch (error) {
        console.error("OpenAI API 오류:", error);
      } finally {
        setIsLoading(false); // 로딩 종료
      }
    }

    fetchWalkingRoutes();
  }, []);

  return (
    <div className="walkingmaincontainer">
      <div className="walkingmaininfocontainer1">
        <div className="walkingmaininfo">
          <p className="walkingmaininfotext1">산책로 추천</p>
          <p className="walkingmaininfotext2">매일 다른 산책로가 추천돼요</p>
        </div>
      </div>
      <div className="walkingmaininfolist">
        {walkingRoutes.length > 0 ? (
          walkingRoutes.map((route, index) => (
            <div key={index} className="walkingmaininfocontainer2">
              <WalkingInfo
                walkingmapnavigate="/WalkingCoursePage"
                walkingmapname={route}
                walkingmapkm={`${(Math.random() * 2 + 1).toFixed(1)}km`} // Random km value
              />
            </div>
          ))
        ) : (
          <p>No routes found.</p>
        )}
        {/* <div className="walkingmaininfocontainer2">
          <WalkingInfo
            walkingmapnavigate="/WalkingCoursePage"
            walkingmapname="산책로1"
            walkingmapkm="1.4km"
          />
        </div>
        <div className="walkingmaininfocontainer2">
          <WalkingInfo
            walkingmapnavigate="/WalkingCoursePage"
            walkingmapname="산책로2"
            walkingmapkm="1.3km"
          />
        </div>
        <div className="walkingmaininfocontainer2">
          <WalkingInfo
            walkingmapnavigate="/WalkingCoursePage"
            walkingmapname="산책로3"
            walkingmapkm="2.6km"
          />
        </div> */}
      </div>
    </div>
  );
}
