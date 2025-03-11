const models = require("../db/models");
const { User } = models;

const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID =
  "967990155440-6kdar6oaceqj6fk04s469nebhdfe90d2.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);
const jwt = require("jsonwebtoken");

const SECRET_KEY =
  "h9UHuNsSUjYAHEAEFNrfZhqTFXTRUMyrArUZOfJCnqeTh1UqKXzRx5hpHAAgFBvUuZ/74cyVE2NnNxy+TJJ/Rw==";

module.exports = {
  googleSignin: async (req, res) => {
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
      // 토큰 정보들
      const payload = googleToken.getPayload();
      // ✅ MongoDB에서 사용자 검색
      let user = await User.findOne({ googleId: payload.sub });

      if (!user) {
        // ✅ 존재하지 않으면 새로 저장
        user = new User({
          nickname: payload.name,
          friend_list: [],
          user_point: 0,
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
        },
        SECRET_KEY,
        { expiresIn: "7d" }
      );
      // ✅ httpOnly 쿠키에 저장 (XSS 방어)
      res.cookie("googleToken", token, {
        httpOnly: true, // JS에서 접근 불가 -> 보안 강화
        secure: false, // true면 HTTPS 환경에서만 적용
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7일간 유지
      });
      return res.json({
        type: "success",
      });
    } catch (error) {
      console.error("토큰 검증 실패:", error);
      return res.status(401).json({ type: "fail" });
    }
  },
  googleSignout: async (req, res) => {
    try {
      res.clearCookie("googleToken", {
        httpOnly: true, // JS에서 접근 불가, 보안 강화
        secure: false, // true면 HTTPS 환경에서만 적용
        sameSite: "Strict",
      });
      res.json({ type: "success", message: "로그아웃 성공" });
    } catch (error) {
      res.status(400).json({ type: "error" });
    }
  },
};
