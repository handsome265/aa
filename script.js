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
  { time: 205.88, src: "images/Thank_you_page-0013.jpg" },
  { time: 206.84, src: "images/Thank_you_page-0014.jpg" },
  { time: 207.87, src: "images/Thank_you_page-0015.jpg" },
  { time: 208.83, src: "images/Thank_you_page-0016.jpg" },
  { time: 209.53, src: "images/Thank_you_page-0017.jpg" },
  { time: 210.56, src: "images/Thank_you_page-0018.jpg" },
  { time: 211.85, src: "images/Thank_you_page-0019.jpg" },
  { time: 221.88, src: "images/Thank_you_page-0020.jpg" },
  { time: 251.91, src: "images/Thank_you_page-0021.jpg" },
  { time: 279.33, src: "images/Thank_you_page-0022.jpg" },
  { time: 317.91, src: "images/Thank_you_page-0023.jpg" },
  { time: 338.59, src: "images/Thank_you_page-0024.jpg" }
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

// 太陽能板模擬 (保留原本功能)
const rawData={red:4.51,green:3.64,blue:3.79,yellow:5.68,darkBlue:1.69,purple:3.25};
const ledInfo=[
  {name:'紅色',nameEn:'red',color:'#FF0000'},
  {name:'綠色',nameEn:'green',color:'#00FF00'},
  {name:'藍色',nameEn:'blue',color:'#87CEEB'},
  {name:'黃色',nameEn:'yellow',color:'#FFFF00'},
  {name:'深藍',nameEn:'darkBlue',color:'#00008B'},
  {name:'紫色',nameEn:'purple',color:'#9370DB'}
];
const glassTrans={clear:1,lightBlue:0.85,green:0.75,yellow:0.7,orange:0.6,red:0.55,darkBlue:0.45,purple:0.4,brown:0.35,gray:0.25};

let ctx=document.getElementById('mainChart').getContext('2d'); 
let chart=null;

function updateChart(currentData){
  const labels=ledInfo.map(d=>d.name);
  const data=ledInfo.map(d=>currentData[d.nameEn]);
  if(chart) chart.destroy();
  chart=new Chart(ctx,{
    type:'bar',
    data:{labels:labels,datasets:[{label:'電流(mA)',data:data,backgroundColor:ledInfo.map(d=>d.color)}]},
    options:{responsive:true,plugins:{legend:{display:false}}}
  });
}

function updateStats(currentData){
  const values=Object.values(currentData);
  const max=Math.max(...values), min=Math.min(...values);
  const avg=values.reduce((a,b)=>a+b,0)/values.length;
  const maxKey=Object.keys(currentData).find(k=>currentData[k]===max);
  const minKey=Object.keys(currentData).find(k=>currentData[k]===min);
  document.getElementById('maxCurrent').textContent=max.toFixed(2);
  document.getElementById('maxLED').textContent=ledInfo.find(l=>l.nameEn===maxKey).name;
  document.getElementById('minCurrent').textContent=min.toFixed(2);
  document.getElementById('minLED').textContent=ledInfo.find(l=>l.nameEn===minKey).name;
  document.getElementById('avgCurrent').textContent=avg.toFixed(2);
}

function updateTable(currentData){
  const tbody=document.getElementById('dataTable');
  tbody.innerHTML='';
  ledInfo.forEach(l=>{
    const row=tbody.insertRow();
    row.innerHTML=`<td><span class="color-indicator" style="background:${l.color}"></span>${l.name}</td><td>${l.nameEn}</td><td>${currentData[l.nameEn].toFixed(2)}</td>`;
  });
}

function updateSimulation(glass){
  document.getElementById('glassColorValue').textContent=glass==='clear'?'透明':glass;
  const t=glassTrans[glass];
  const currentData={};
  for(let k in rawData) currentData[k]=rawData[k]*t;
  updateChart(currentData);
  updateStats(currentData);
  updateTable(currentData);

  // 畫光電板
  const sim=document.getElementById('simulationArea');
  sim.innerHTML='';
  const panel=document.createElement('div');
  panel.className='solar-panel';
  panel.style.left='100px';
  panel.style.top='80px';
  panel.style.width='200px';
  panel.style.height='80px';
  panel.style.background=`linear-gradient(135deg, #1e3c72, #2a5298)`;
  sim.appendChild(panel);

  // 光線
  const ray=document.createElement('div');
  ray.className='light-ray incident-ray';
  ray.style.left='200px';
  ray.style.top='20px';
  ray.style.width='4px';
  ray.style.height='60px';
  sim.appendChild(ray);

  const ray2=document.createElement('div');
  ray2.className='light-ray refracted-ray';
  ray2.style.left='200px';
  ray2.style.top='100px';
  ray2.style.width='4px';
  ray2.style.height='100px';
  ray2.style.opacity=t*0.8+0.2;
  sim.appendChild(ray2);
}

document.getElementById('glassColor').addEventListener('change',e=>updateSimulation(e.target.value));
// 初始化模擬
updateSimulation('clear');
