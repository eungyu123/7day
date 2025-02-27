// 구글 로그인 + 닉네임 설정

const User = require("../db/models/User"); // require로 가져오기
const Reward = require("../db/models/reward"); // require로 가져오기
const Inventory = require("../db/models/Inventory"); // require로 가져오기
const Walk = require("../db/models/walk_data"); // require로 가져오기

const kakaomap = require("../utils/kakaomap");
const redis = require("../db/redis");
const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID =
  "671783874321-non3vj4e8e19mm0k4hqre52beg03lpaf.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);
const jwt = require("jsonwebtoken");

const SECRET_KEY =
  "h9UHuNsSUjYAHEAEFNrfZhqTFXTRUMyrArUZOfJCnqeTh1UqKXzRx5hpHAAgFBvUuZ/74cyVE2NnNxy+TJJ/Rw==";

export default tokensignin;

module.exports = {
  googleSignin: async (req, res) => {
    console.log("tokensignin");
    try {
      const credential = req.body.credential;

      if (!credential) {
        console.log("!credential", credential);
        return res.status(400).json({ error: "No credential provided" });
      }

      // ✅ ID 토큰 검증
      const googleToken = await client.verifyIdToken({
        idToken: credential,
        audience: CLIENT_ID,
      });

      const payload = googleToken.getPayload();
      // ✅ MongoDB에서 사용자 검색
      let user = await User.findOne({ email: payload.email });

      if (!user) {
        // ✅ 존재하지 않으면 새로 저장
        user = new User({
          name: payload.name,
          email: payload.email,
          googleId: payload.sub,
        });

        await user.save();
        console.log("DB insert success:", user);
      } else {
        console.log("User already exists:", user);
      }

      // 자체 토큰
      const token = jwt.sign(
        {
          id: payload.sub,
          email: payload.email,
        },
        SECRET_KEY,
        { expiresIn: "7d" }
      );
      // ✅ httpOnly 쿠키에 저장 (XSS 방어)
      res.cookie("auth_token", token, {
        httpOnly: true, // JS에서 접근 불가 -> 보안 강화
        secure: false, // true면 HTTPS 환경에서만 적용
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7일간 유지
      });
      return res.json({
        type: "success",
        token: token,
      });
    } catch (error) {
      console.error("토큰 검증 실패:", error);
      return res.status(401).json({ type: "fail" });
    }
  },

  setName: async (req, res) => {
    const { name } = req.body;

    try {
      const user = await User.findOne({ name });
      res.json({ type: "error", msg: "이름 존재하는 이름입니다." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }

    req.session.views = 1;
  },

  createRandomItemsNearUser: async (req, res) => {
    const { lat, lng } = req.body;
    const items = kakaomap.createRandomItems({
      lat,
      lng,
      item: "p",
      reward: "gs25",
    });

    return res.status(200).json({
      type: "success",
    });
  },
  test: async (req, res) => {
    console.log("test");
    try {
      // DB에서 모든 유저 데이터를 가져오기
      const users = await User.find();
      // DB에서 모든 보상 데이터를 가져오기
      const rewards = await Reward.find();
      // DB에서 모든 인벤토리 데이터를 가져오기
      const inventories = await Inventory.find();
      // DB에서 모든 걸음 데이터를 가져오기
      const walks = await Walk.find();

      // 모든 데이터를 포함하여 응답
      return res.status(200).json({
        users,
        rewards,
        inventories,
        walks,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      return res.status(500).json({ error: "Failed to fetch data" });
    }
  },
  
}
