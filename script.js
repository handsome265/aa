document.addEventListener('DOMContentLoaded',()=>{

/* =====================
   幻燈片 + 音訊同步
===================== */
const audio = new Audio("audio/part1.mp3");
const img = document.getElementById("slideImg");

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
  { time: 205.88, src: "images/Thank_you_page-0013.jpg" },
  { time: 207.84, src: "images/Thank_you_page-0014.jpg" },
  { time: 208.87, src: "images/Thank_you_page-0015.jpg" },
  { time: 209.83, src: "images/Thank_you_page-0016.jpg" },
  { time: 210.53, src: "images/Thank_you_page-0017.jpg" },
  { time: 211.56, src: "images/Thank_you_page-0018.jpg" },
  { time: 212.85, src: "images/Thank_you_page-0019.jpg" },
  { time: 221.88, src: "images/Thank_you_page-0020.jpg" },
  { time: 240.91, src: "images/Thank_you_page-0021.jpg" },
  { time: 279.33, src: "images/Thank_you_page-0022.jpg" },
  { time: 317.91, src: "images/Thank_you_page-0023.jpg" },
  { time: 338.59, src: "images/Thank_you_page-0024.jpg" }
];

img.src = slides[0].src;
const slider = document.getElementById('timelineSlider');

function updateSlide(time){
  for(let i=slides.length-1;i>=0;i--){
    if(time>=slides[i].time){
      if(!img.src.endsWith(slides[i].src)) img.src=slides[i].src;
      break;
    }
  }
}

audio.addEventListener('timeupdate',()=>{
  updateSlide(audio.currentTime);
  if(audio.duration) slider.value=(audio.currentTime/audio.duration)*100;
});

slider.addEventListener('input',e=>{
  if(audio.duration){
    const t=(e.target.value/100)*audio.duration;
    audio.currentTime=t;
    updateSlide(t);
  }
});

document.getElementById("startBtn").addEventListener("click",()=>{
  document.getElementById("startScreen").style.display="none";
  audio.currentTime=0;
  audio.play();
});

/* =====================
   太陽能板炫砲模擬
===================== */
const rawData={red:4.51,green:3.64,blue:3.79,yellow:5.68,darkBlue:1.69,purple:3.25};

const glassTrans={clear:1,lightBlue:0.85,green:0.75,yellow:0.7,orange:0.6,red:0.55,darkBlue:0.45,purple:0.4,brown:0.35,gray:0.25};

const panelColorMap={
  clear:['#4facfe','#00f2fe'],
  red:['#ff416c','#ff4b2b'],
  green:['#56ab2f','#a8e063'],
  yellow:['#fceabb','#f8b500'],
  darkBlue:['#141e30','#243b55'],
  purple:['#654ea3','#eaafc8'],
  lightBlue:['#2193b0','#6dd5ed'],
  orange:['#f7971e','#ffd200'],
  brown:['#603813','#b29f94'],
  gray:['#757f9a','#d7dde8']
};

function updateSimulation(glass){
  const t=glassTrans[glass];
  const sim=document.getElementById('simulationArea');
  sim.innerHTML='';

  const colors=panelColorMap[glass]||panelColorMap.clear;

  /* 太陽能板 */
  const panel=document.createElement('div');
  panel.className='solar-panel';
  panel.style.cssText=`
    left:120px;
    top:90px;
    width:260px;
    height:90px;
    background:linear-gradient(135deg,${colors[0]},${colors[1]});
    box-shadow:0 0 25px ${colors[0]};
    animation:pulse 2s infinite alternate;
  `;
  sim.appendChild(panel);

  /* 入射光 */
  const ray=document.createElement('div');
  ray.className='light-ray incident-ray';
  ray.style.cssText=`
    left:250px;
    top:10px;
    width:5px;
    height:70px;
    background:${colors[1]};
    animation:flow 1s linear infinite;
  `;
  sim.appendChild(ray);

  /* 折射光 */
  const ray2=document.createElement('div');
  ray2.className='light-ray refracted-ray';
  ray2.style.cssText=`
    left:250px;
    top:110px;
    width:5px;
    height:120px;
    background:${colors[0]};
    opacity:${t*0.9};
    box-shadow:0 0 12px ${colors[0]};
  `;
  sim.appendChild(ray2);
}

/* 動態動畫（JS 注入，不動 CSS） */
const style=document.createElement('style');
style.textContent=`
@keyframes pulse{
  from{box-shadow:0 0 15px;}
  to{box-shadow:0 0 40px;}
}
@keyframes flow{
  from{transform:translateY(0);}
  to{transform:translateY(20px);}
}`;
document.head.appendChild(style);

document.getElementById('glassColor')
  .addEventListener('change',e=>updateSimulation(e.target.value));

updateSimulation('clear');

});
