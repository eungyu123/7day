const now = new Date();
const kor = now.toLocaleDateString("ko-KR");
console.log(JSON.stringify(kor)); // "2022. 1. 1.";
