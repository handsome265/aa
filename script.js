const audio = new Audio("audio/part1.mp3");
const img = document.getElementById("slideImg");

const slides = [
  { time: 0, src: "Thank you_page-0001.jpg" },
  { time: 10, src: "Thank you_page-0002.jpg" },
  { time: 20, src: "Thank you_page-0003.jpg" },
  { time: 30, src: "Thank you_page-0004.jpg" },
  { time: 40, src: "Thank you_page-0005.jpg" },
  { time: 50, src: "Thank you_page-0006.jpg" },
  { time: 60, src: "Thank you_page-0007.jpg" },
  { time: 70, src: "Thank you_page-0008.jpg" },
  { time: 80, src: "Thank you_page-0009.jpg" },
  { time: 90, src: "Thank you_page-00010.jpg" },
  { time: 100, src: "Thank you_page-00011.jpg" },
  { time: 110, src: "Thank you_page-00012.jpg" },
  { time: 120, src: "Thank you_page-00013.jpg" },
  { time: 130, src: "Thank you_page-00014.jpg" },
  { time: 140, src: "Thank you_page-00015.jpg" },
  { time: 150, src: "Thank you_page-00016.jpg" },
  { time: 160, src: "Thank you_page-00017.jpg" },
  { time: 170, src: "Thank you_page-00018.jpg" },
  { time: 180, src: "Thank you_page-00019.jpg" },
  { time: 190, src: "Thank you_page-00020.jpg" },
  { time: 200, src: "Thank you_page-00021.jpg" },
  { time: 210, src: "Thank you_page-00022.jpg" },
  { time: 220, src: "Thank you_page-00023.jpg" },
  { time: 230, src: "Thank you_page-00024.jpg" }
];

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
