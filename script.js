const audio = new Audio("audio/part1.mp3");
const img = document.getElementById("slideImg");

const slides = [
  { time: 0, src: "images/Thank you_page-0001.jpg" },
  { time: 5, src: "images/Thank you_page-0002.jpg" },
  { time: 8, src: "images/Thank you_page-0003.jpg" },
  { time: 15, src: "images/Thank you_page-0004.jpg" },
  { time: 20, src: "images/Thank you_page-0005.jpg" },
  { time: 50, src: "images/Thank you_page-0006.jpg" },
  { time: 60, src: "images/Thank you_page-0007.jpg" },
  { time: 70, src: "images/Thank you_page-0008.jpg" },
  { time: 80, src: "images/Thank you_page-0009.jpg" },
  { time: 90, src: "images/Thank you_page-0010.jpg" },
  { time: 100, src: "images/Thank you_page-0011.jpg" },
  { time: 110, src: "images/Thank you_page-0012.jpg" },
  { time: 120, src: "images/Thank you_page-0013.jpg" },
  { time: 130, src: "images/Thank you_page-0014.jpg" },
  { time: 140, src: "images/Thank you_page-0015.jpg" },
  { time: 150, src: "images/Thank you_page-0016.jpg" },
  { time: 160, src: "images/Thank you_page-0017.jpg" },
  { time: 170, src: "images/Thank you_page-0018.jpg" },
  { time: 180, src: "images/Thank you_page-0019.jpg" },
  { time: 190, src: "images/Thank you_page-0020.jpg" },
  { time: 200, src: "images/Thank you_page-0021.jpg" },
  { time: 210, src: "images/__Thank you_page-0022.jpg" },
  { time: 220, src: "images/Thank you_page-0023.jpg" },
  { time: 230, src: "images/Thank you_page-0024.jpg" }
];

// 檢測圖片載入錯誤
img.addEventListener("error", () => {
  console.error("圖片載入失敗:", img.src);
});

img.addEventListener("load", () => {
  console.log("圖片載入成功:", img.src);
});

// 初始載入第一張圖片
img.src = slides[0].src;

audio.addEventListener("timeupdate", () => {
  const t = audio.currentTime;
  for (let i = slides.length - 1; i >= 0; i--) {
    if (t >= slides[i].time) {
      img.src = slides[i].src;
      break;
    }
  }
});

document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("startScreen").style.display = "none";
  audio.currentTime = 0;
  audio.play();
});

// 測試用：顯示路徑資訊
console.log("當前頁面位置:", window.location.href);
console.log("第一張圖片路徑:", slides[0].src);
