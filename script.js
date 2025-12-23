const audio = new Audio("audio/part1.mp3");
const img = document.getElementById("slideImg");

// 每段幻燈片對應時間（秒）
const slides = [
  { time: 0, src: "images/Thank_you_page-0001.jpg" },   // 開場介紹 14s
  { time: 14, src: "images/Thank_you_page-0002.jpg" },  // 研究動機 21s
  { time: 35, src: "images/Thank_you_page-0003.jpg" },  // 程式設計基礎應用 24s
  { time: 59, src: "images/Thank_you_page-0004.jpg" },  // 物理學概念與公式 29s
  { time: 88, src: "images/Thank_you_page-0005.jpg" },  // 程式技術問題說明 36s
  { time: 124, src: "images/Thank_you_page-0006.jpg" }, // 模擬實驗系統介紹 23s
  { time: 147, src: "images/Thank_you_page-0007.jpg" }, // 實驗數據分析 26s
  { time: 173, src: "images/Thank_you_page-0008.jpg" }, // 討論實驗結果 21s
  { time: 194, src: "images/Thank_you_page-0009.jpg" }, // 進一步分析結論 26s
  { time: 220, src: "images/Thank_you_page-0010.jpg" }, // 未來展望 26s
  { time: 246, src: "images/Thank_you_page-0011.jpg" }  // 參考文獻與結尾 34s
];

img.src = slides[0].src;

audio.addEventListener("timeupdate", () => {
  const t = audio.currentTime;
  for (let i = slides.length - 1; i >= 0; i--) {
    if (t >= slides[i].time) {
      if (img.src !== slides[i].src) img.src = slides[i].src;
      break;
    }
  }
});

document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("startScreen").style.display = "none";
  audio.currentTime = 0;
  audio.play();
});
