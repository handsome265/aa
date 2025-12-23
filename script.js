const audio = new Audio("audio/part1.mp3");
const img = document.getElementById("slideImg");

// 每頁時間對應報告段落（秒）
const slides = [
  { time: 0, src: "images/Thank you_page-0001.jpg" },
  { time: 15, src: "images/Thank you_page-0002.jpg" },
  { time: 18, src: "images/Thank you_page-0003.jpg" },
  { time: 41, src: "images/Thank you_page-0004.jpg" },
  { time: 69, src: "images/Thank you_page-0005.jpg" },
  { time: 95, src: "images/Thank you_page-0006.jpg" },
  { time: 100, src: "images/Thank you_page-0007.jpg" },
  { time: 141, src: "images/Thank you_page-0008.jpg" },
  { time: 145, src: "images/Thank you_page-0009.jpg" },
  { time: 153, src: "images/Thank you_page-0010.jpg" },
  { time: 181, src: "images/Thank you_page-0011.jpg" },
  { time: 184, src: "images/Thank you_page-0012.jpg" },
  { time: 200, src: "images/Thank you_page-0013.jpg" },
  { time: 202, src: "images/Thank you_page-0014.jpg" },
  { time: 203, src: "images/Thank you_page-0015.jpg" },
  { time: 204, src: "images/Thank you_page-0016.jpg" },
  { time: 205, src: "images/Thank you_page-0017.jpg" },
  { time: 206, src: "images/Thank you_page-0018.jpg" },
  { time: 207, src: "images/Thank you_page-0019.jpg" },
  { time: 218, src: "images/Thank you_page-0020.jpg" },
  { time: 233, src: "images/Thank you_page-0021.jpg" },
  { time: 276, src: "images/Thank you_page-0022.jpg" },
  { time: 307, src: "images/Thank you_page-0023.jpg" },
  { time: 343, src: "images/Thank you_page-0024.jpg" }
];

// 初始載入第一張圖片
img.src = slides[0].src;

// 圖片載入錯誤提示
img.addEventListener("error", () => {
  console.error("圖片載入失敗:", img.src);
});

// 音訊播放時切換圖片
audio.addEventListener("timeupdate", () => {
  const t = audio.currentTime;
  for (let i = slides.length - 1; i >= 0; i--) {
    if (t >= slides[i].time) {
      if (img.src.indexOf(slides[i].src) === -1) {
        img.src = slides[i].src;
      }
      break;
    }
  }
});

// 開始播放按鈕
document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("startScreen").style.display = "none";
  audio.currentTime = 0;
  audio.play();
});
