const audio = new Audio("audio/part1.mp3");
const img = document.getElementById("slideImg");

const slides = [
  { time: 0, src: "images/page1.jpg" },
  { time: 10, src: "images/page2.jpg" },
  { time: 20, src: "images/page3.jpg" },
  { time: 30, src: "images/page4.jpg" },
  { time: 40, src: "images/page5.jpg" },
  { time: 50, src: "images/page6.jpg" },
  { time: 60, src: "images/page7.jpg" },
  { time: 70, src: "images/page8.jpg" },
  { time: 80, src: "images/page9.jpg" },
  { time: 90, src: "images/page10.jpg" },
  { time: 100, src: "images/page11.jpg" },
  { time: 110, src: "images/page12.jpg" },
  { time: 120, src: "images/page13.jpg" },
  { time: 130, src: "images/page14.jpg" },
  { time: 140, src: "images/page15.jpg" },
  { time: 150, src: "images/page16.jpg" },
  { time: 160, src: "images/page17.jpg" },
  { time: 170, src: "images/page18.jpg" },
  { time: 180, src: "images/page19.jpg" },
  { time: 190, src: "images/page20.jpg" },
  { time: 200, src: "images/page21.jpg" },
  { time: 210, src: "images/page22.jpg" },
  { time: 220, src: "images/page23.jpg" },
  { time: 230, src: "images/page24.jpg" }
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
