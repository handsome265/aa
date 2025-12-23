const slides = document.querySelectorAll(".slide");

const audioFiles = [
  "audio/part1.mp3",
  "audio/part2.mp3",
  "audio/part3.mp3",
  "audio/part4.mp3",
  "audio/part5.mp3"
];

let current = 0;
const audio = new Audio();

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");

  audio.src = audioFiles[index];
  audio.currentTime = 0;
  audio.play();
}

audio.addEventListener("ended", () => {
  current++;
  if (current < slides.length) {
    showSlide(current);
  }
});

// 開始播放（關鍵）
document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("startScreen").style.display = "none";
  current = 0;
  showSlide(current);
});
