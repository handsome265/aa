const audio = new Audio("audio/part1.mp3");
const img = document.getElementById("slideImg");

const slides = [
  { time: 0, src: "images/Thank_you_page-0001.jpg" },   // 第1圈 15秒
  { time: 15.00, src: "images/Thank_you_page-0002.jpg" }, // 第2圈 1.86秒
  { time: 16.86, src: "images/Thank_you_page-0003.jpg" }, // 第3圈 25.52秒
  { time: 42.38, src: "images/Thank_you_page-0004.jpg" }, // 第4圈 24.66秒
  { time: 67.04, src: "images/Thank_you_page-0005.jpg" }, // 第5圈 28.63秒
  { time: 95.67, src: "images/Thank_you_page-0006.jpg" }, // 第6圈 5.44秒
  { time: 101.11, src: "images/Thank_you_page-0007.jpg" }, // 第7圈 42.60秒
  { time: 143.71, src: "images/Thank_you_page-0008.jpg" }, // 第8圈 5秒
  { time: 148.71, src: "images/Thank_you_page-0009.jpg" }, // 第9圈 5.26秒
  { time: 153.97, src: "images/Thank_you_page-0010.jpg" }, // 第10圈 24.36秒
  { time: 178.33, src: "images/Thank_you_page-0011.jpg" }, // 第11圈 10.06秒
  { time: 188.39, src: "images/Thank_you_page-0012.jpg" }, // 第12圈 3.60秒
  { time: 191.99, src: "images/Thank_you_page-0013.jpg" }, // 第13圈 16.46秒
  { time: 208.45, src: "images/Thank_you_page-0014.jpg" }, // 第14圈 1.03秒
  { time: 209.48, src: "images/Thank_you_page-0015.jpg" }, // 第15圈 1秒
  { time: 210.48, src: "images/Thank_you_page-0016.jpg" }, // 第16圈 1.01秒
  { time: 211.49, src: "images/Thank_you_page-0017.jpg" }, // 第17圈 0.66秒
  { time: 212.15, src: "images/Thank_you_page-0018.jpg" }, // 第18圈 0.48秒
  { time: 212.63, src: "images/Thank_you_page-0019.jpg" }, // 第19圈 3.09秒
  { time: 215.72, src: "images/Thank_you_page-0020.jpg" }, // 第20圈 10.08秒
  { time: 225.80, src: "images/Thank_you_page-0021.jpg" }, // 第21圈 16.48秒
  { time: 242.28, src: "images/Thank_you_page-0022.jpg" }, // 第22圈 41.50秒
  { time: 283.78, src: "images/Thank_you_page-0023.jpg" }  // 第23圈 20.45秒
  { time: 305.78, src: "images/Thank_you_page-0023.jpg" }  // 第24圈 
];

// 初始載入第一張圖片
img.src = slides[0].src;

// 切換圖片
audio.addEventListener("timeupdate", () => {
  const t = audio.currentTime;
  for (let i = slides.length - 1; i >= 0; i--) {
    if (t >= slides[i].time) {
      img.src = slides[i].src;
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
