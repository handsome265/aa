// 幻燈片播放
const audio = new Audio("audio/part1.mp3");
const img = document.getElementById("slideImg");

// 幻燈片時間點
const slides = [
  { time: 0.00, src: "images/Thank_you_page-0001.jpg" },
  { time: 15.00, src: "images/Thank_you_page-0002.jpg" },
  { time: 17.51, src: "images/Thank_you_page-0003.jpg" },
  { time: 43.51, src: "images/Thank_you_page-0004.jpg" },
  { time: 67.32, src: "images/Thank_you_page-0005.jpg" },
  { time: 96.52, src: "images/Thank_you_page-0006.jpg" },
  { time: 102.17, src: "images/Thank_you_page-0007.jpg" },
  { time: 144.59, src: "images/Thank_you_page-0008.jpg" },
  { time: 149.59, src: "images/Thank_you_page-0009.jpg" },
  { time: 176.75, src: "images/Thank_you_page-0010.jpg" },
  { time: 179.56, src: "images/Thank_you_page-0011.jpg" },
  { time: 189.22, src: "images/Thank_you_page-0012.jpg" },
  { time: 207.88, src: "images/Thank_you_page-0013.jpg" },
  { time: 208.84, src: "images/Thank_you_page-0014.jpg" },
  { time: 209.87, src: "images/Thank_you_page-0015.jpg" },
  { time: 210.83, src: "images/Thank_you_page-0016.jpg" },
  { time: 211.53, src: "images/Thank_you_page-0017.jpg" },
  { time: 212.56, src: "images/Thank_you_page-0018.jpg" },
  { time: 213.85, src: "images/Thank_you_page-0019.jpg" },
  { time: 223.88, src: "images/Thank_you_page-0020.jpg" },
  { time: 256.91, src: "images/Thank_you_page-0021.jpg" },
  { time: 284.33, src: "images/Thank_you_page-0022.jpg" },
  { time: 312.91, src: "images/Thank_you_page-0023.jpg" },
  { time: 341.59, src: "images/Thank_you_page-0024.jpg" }
];

// 初始載入
img.src = slides[0].src;

// 加入時間軸
const slider = document.createElement('input');
slider.type = 'range';
slider.id = 'timelineSlider';
slider.min = 0;
slider.max = 100;
slider.value = 0;
slider.style.width = '90%';
document.getElementById('viewer').appendChild(slider);

// 更新幻燈片
function updateSlide(time) {
  for (let i = slides.length - 1; i >= 0; i--) {
    if (time >= slides[i].time) {
      if (!img.src.endsWith(slides[i].src)) img.src = slides[i].src;
      break;
    }
  }
}

// 播放時同步幻燈片與滑桿
audio.addEventListener('timeupdate', () => {
  updateSlide(audio.currentTime);
  if(audio.duration) slider.value = (audio.currentTime / audio.duration) * 100;
});

// 滑動時間軸時同步幻燈片和聲音
slider.addEventListener('input', e => {
  if(audio.duration){
    const t = (e.target.value / 100) * audio.duration;
    audio.currentTime = t;
    updateSlide(t);
  }
});

// 開始播放
document.getElementById("startBtn").addEventListener("click", () => {
  document.getElementById("startScreen").style.display = "none";
  audio.currentTime = 0;
  audio.play();
});
