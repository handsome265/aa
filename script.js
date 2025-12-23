const slides = document.querySelectorAll(".slide");
const audio = new Audio("audio/part1.mp3");

// 每一頁切換的「秒數」（你之後可以微調）
const timeline = [
  { time: 0, slide: 0 },
  { time: 20, slide: 1 },
  { time: 45, slide: 2 },
  { time: 80, slide: 3 },
  { time: 120, slide: 4 }
];

function showSlide(index) {
  slides.forEach(s => s.classList.remove("active"));
  slides[index].classList.add("active");
}

audio.addEventListener("timeupdate", () => {
  const t = audio.currentTime;
  for (let i = timeline.length - 1; i >= 0; i--) {
    if (t >= timeline[i].time) {
      showSlide(timeline[i].slide);
      break;
    }
  }
});

document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("startScreen").style.display = "none";
  audio.currentTime = 0;
  audio.play();
  showSlide(0);
});
