// 런타임메모리에서 시간 관리 OR 데이터베이스로 관리

module.exports = {
  // 좌표와 갯수를 입력받으면 해당 좌표 근처에서 랜덤한 아이템을 생성
  createRandomItems: function ({ lat, lng, item, reward }) {
    const items = new Array(count).fill(0).map(() => ({
      item: item, // 생성하는 아이템
      reward: reward, // 해당 아이템을 먹었을때의 보상
      lat: lat + (Math.random() - 0.5) / 100, // -0.0005 ~ +0.0005 근처 1000M
      lng: lng + (Math.random() - 0.5) / 100, // -0.0005 ~ +0.0005 근처 1000M
    }));

    return items;
  },
};
