// 幻燈片播放 JS
const audio = new Audio("audio/part1.mp3");
const img = document.getElementById("slideImg");

const slides = [
  { time: 0.00, src: "images/Thank_you_page-0001.jpg" },
  { time: 15.00, src: "images/Thank_you_page-0002.jpg" },
  { time: 16.86, src: "images/Thank_you_page-0003.jpg" },
  { time: 42.38, src: "images/Thank_you_page-0004.jpg" },
  { time: 67.04, src: "images/Thank_you_page-0005.jpg" },
  { time: 95.67, src: "images/Thank_you_page-0006.jpg" },
  { time: 101.11, src: "images/Thank_you_page-0007.jpg" },
  { time: 143.71, src: "images/Thank_you_page-0008.jpg" },
  { time: 148.71, src: "images/Thank_you_page-0009.jpg" },
  { time: 153.97, src: "images/Thank_you_page-0010.jpg" },
  { time: 178.33, src: "images/Thank_you_page-0011.jpg" },
  { time: 188.39, src: "images/Thank_you_page-0012.jpg" },
  { time: 191.99, src: "images/Thank_you_page-0013.jpg" },
  { time: 208.45, src: "images/Thank_you_page-0014.jpg" },
  { time: 209.48, src: "images/Thank_you_page-0015.jpg" },
  { time: 210.48, src: "images/Thank_you_page-0016.jpg" },
  { time: 211.49, src: "images/Thank_you_page-0017.jpg" },
  { time: 212.15, src: "images/Thank_you_page-0018.jpg" },
  { time: 212.63, src: "images/Thank_you_page-0019.jpg" },
  { time: 215.72, src: "images/Thank_you_page-0020.jpg" },
  { time: 225.80, src: "images/Thank_you_page-0021.jpg" },
  { time: 242.28, src: "images/Thank_you_page-0022.jpg" },
  { time: 283.78, src: "images/Thank_you_page-0023.jpg" },
  { time: 305.78, src: "images/Thank_you_page-0024.jpg" }
];

// 初始載入第一張圖片
img.src = slides[0].src;

// 切換圖片
audio.addEventListener("timeupdate", () => {
  const t = audio.currentTime;
  for (let i = slides.length - 1; i >= 0; i--) {
    if (t >= slides[i].time) {
      // 避免重複賦值
      if (!img.src.endsWith(slides[i].src)) {
        img.src = slides[i].src;
      }
      break;
    }
  }
});

// 開始播放
document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("startScreen").style.display = "none";
  audio.currentTime = 0;
  audio.play();
});
