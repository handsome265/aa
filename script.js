const slides = document.querySelectorAll(".slide");

const audioFiles = [
  "audio/part1.mp3",
  "audio/part2.mp3",
  "audio/part3.mp3",
  "audio/part4.mp3",
  "audio/part5.mp3"
];

let index = 0;
const audio = new Audio();

function playSlide(i) {
  slides.forEach(slide => slide.classList.remove("active"));
  slides[i].classList.add("active");

  audio.src = audioFiles[i];
  audio.play();

  audio.onended = () => {
    if (i + 1 < slides.length) {
      playSlide(i + 1);
    }
  };
}

playSlide(0);

