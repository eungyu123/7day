const User = require("../db/models/User"); // require로 가져오기

const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID =
  "967990155440-6kdar6oaceqj6fk04s469nebhdfe90d2.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);
const jwt = require("jsonwebtoken");

const TOKEN_SECRET_KEY =
  "h9UHuNsSUjYAHEAEFNrfZhqTFXTRUMyrArUZOfJCnqeTh1UqKXzRx5hpHAAgFBvUuZ/74cyVE2NnNxy+TJJ/Rw==";

module.exports = {
  googleSignin: async (req, res) => {
    try {
      const credential = req.body.credential;

      if (!credential) {
        console.log("!credential", credential);
        return res.status(400).json({ error: "토큰이 없습니다." });
      }

      const googleToken = await client.verifyIdToken({
        idToken: credential,
        audience: CLIENT_ID,
      });
      const payload = googleToken.getPayload();

      let user = await User.findOne({ googleId: payload.sub });

      if (!user) {
        user = new User({
          nickname: payload.name,
          nicknameEdit: false,
          friendList: [],
          googleId: payload.sub,
          userPoint: 0,
          character: "groot.glb",
          characterList: [
            {
              characterId: "67c7e53b18757a2a43f8fcc3",
              characterName: "그루트",
              price: 500,
              characterLink: "groot.glb",
            },
          ],
          pet: "GreenChubby.glb",
          petList: [
            {
              petId: "67c7e59f684ef9ca216756e9",
              petName: "초록뚱이",
              price: 300,
              petLink: "GreenChubby.glb",
            },
          ],
        });

        await user.save();
        console.log("DB insert success:", user.nickname, user.nicknameEdit);
      } else {
        console.log("User already exists:", user.nickname, user.nicknameEdit);
      }

      // 자체 토큰
      const token = jwt.sign(
        {
          id: payload.sub,
        },
        TOKEN_SECRET_KEY,
        { expiresIn: "7d" }
      );

      // ✅ httpOnly 쿠키에 저장 (XSS 방어)
      res.cookie("googleToken", token, {
        httpOnly: true, // JS에서 접근 불가 -> 보안 강화
        secure: true, // true면 HTTPS 환경에서만 적용, sameSite:"None"이면 이거 true여야함
        sameSite: "None", // "Strict" 이면 같은 출처에서만 적용 현재는 서버, 클라 분리했기때문에 "None",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7일간 유지
      });

      return res.json({
        type: "success",
        message: "로그인 성공",
        userId: user._id,
        googleId: payload.sub,
        nicknameEdit: user.nicknameEdit,
      });
    } catch (error) {
      console.error("토큰 검증 실패:", error);
      return res
        .status(401)
        .json({ type: "fail", message: "토큰 검증 실패했습니다." });
    }
  },

  googleSignout: async (req, res) => {
    try {
      res.clearCookie("googleToken"); // 옵션 필요 없음
      return res.status(200).json({
        type: "success",
        message: "로그아웃 성공했습니다.",
      });
    } catch (error) {
      return res.status(500).json({
        type: "error",
        message: "로그아웃 실패했습니다.",
      });
    }
  },
  checkAuth: async (req, res) => {
    const token = req.cookies.googleToken;

    if (!token) {
      console.log("로그인 안한상태 토큰없음음");
      return res.status(200).json({
        type: "error",
        isAuthenticated: false,
        message: "토큰이 없습니다.",
      });
    }

    try {
      const decoded = jwt.verify(token, TOKEN_SECRET_KEY);
      const user = await User.findOne({ googleId: decoded.id });
      console.log(user.nickname, user.nicknameEdit);
      return res.status(200).json({
        type: "success",
        isAuthenticated: true,
      });
    } catch (error) {
      // 토큰이 만료되었거나 유효하지 않음
      console.log("로그인 안한상태 만료 또는 유효하지않음");

      res.clearCookie("googleToken");

      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          type: "error",
          isAuthenticated: false,
          message: "토큰이 만료되었습니다.",
        });
      } else {
        return res.status(403).json({
          type: "error",
          isAuthenticated: false,
          message: "유효하지 않은 토큰입니다.",
        });
      }
    }
  },
};
