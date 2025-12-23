document.addEventListener('DOMContentLoaded', () => {

  /* =========================
     幻燈片 + 聲音同步
  ========================= */
  const audio = new Audio("audio/part1.mp3");
  const img = document.getElementById("slideImg");
  const slider = document.getElementById("timelineSlider");

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

  function updateSlide(time) {
    for (let i = slides.length - 1; i >= 0; i--) {
      if (time >= slides[i].time) {
        if (!img.src.endsWith(slides[i].src)) {
          img.src = slides[i].src;
        }
        break;
      }
    }
  }

  audio.addEventListener("timeupdate", () => {
    updateSlide(audio.currentTime);
    if (audio.duration) {
      slider.value = (audio.currentTime / audio.duration) * 100;
    }
  });

  slider.addEventListener("input", e => {
    if (audio.duration) {
      const t = (e.target.value / 100) * audio.duration;
      audio.currentTime = t;
      updateSlide(t);
    }
  });

  document.getElementById("startBtn").addEventListener("click", () => {
    document.getElementById("startScreen").style.display = "none";
    audio.currentTime = 0;
    audio.play();
  });

  /* =========================
     太陽能板模擬
  ========================= */

  const rawData = {
    red: 4.51, green: 3.64, blue: 3.79,
    yellow: 5.68, darkBlue: 1.69, purple: 3.25
  };

  const ledInfo = [
    { name: '紅色', nameEn: 'red', color: '#ff4d4d' },
    { name: '綠色', nameEn: 'green', color: '#4dff4d' },
    { name: '藍色', nameEn: 'blue', color: '#4da6ff' },
    { name: '黃色', nameEn: 'yellow', color: '#ffe44d' },
    { name: '深藍', nameEn: 'darkBlue', color: '#3d5afe' },
    { name: '紫色', nameEn: 'purple', color: '#b388ff' }
  ];

  const glassTrans = {
    clear: 1,
    lightBlue: 0.85,
    green: 0.75,
    yellow: 0.7,
    orange: 0.6,
    red: 0.55,
    darkBlue: 0.45,
    purple: 0.4,
    brown: 0.35,
    gray: 0.25
  };

  const sim =
    document.getElementById('simulationArea') ||
    document.querySelector('.simulation-area');

  const ctx = document.getElementById('mainChart').getContext('2d');
  let chart = null;

  function updateChart(data) {
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ledInfo.map(l => l.name),
        datasets: [{
          data: ledInfo.map(l => data[l.nameEn]),
          backgroundColor: ledInfo.map(l => l.color)
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } }
      }
    });
  }

  function updateSimulation(glass) {
    const t = glassTrans[glass];
    const data = {};
    for (let k in rawData) data[k] = rawData[k] * t;

    updateChart(data);

    sim.innerHTML = '';

    const colorMap = {
      clear: ['#4facfe', '#00f2fe'],
      red: ['#ff416c', '#ff4b2b'],
      green: ['#56ab2f', '#a8e063'],
      yellow: ['#fceabb', '#f8b500'],
      darkBlue: ['#141e30', '#243b55'],
      purple: ['#654ea3', '#eaafc8']
    };

    const c = colorMap[glass] || colorMap.clear;

    const panel = document.createElement('div');
    panel.className = 'solar-panel';
    panel.style.cssText = `
      left:120px;
      top:90px;
      width:280px;
      height:90px;
      background:linear-gradient(135deg,${c[0]},${c[1]});
      box-shadow:0 0 30px ${c[0]};
      animation:pulse 2s infinite alternate;
    `;
    sim.appendChild(panel);

    const ray = document.createElement('div');
    ray.className = 'light-ray incident-ray';
    ray.style.cssText = `
      left:260px;
      top:20px;
      width:6px;
      height:70px;
      background:${c[1]};
      animation:flow 1s linear infinite;
    `;
    sim.appendChild(ray);

    const ray2 = document.createElement('div');
    ray2.className = 'light-ray refracted-ray';
    ray2.style.cssText = `
      left:260px;
      top:110px;
      width:6px;
      height:120px;
      background:${c[0]};
      opacity:${t};
      box-shadow:0 0 15px ${c[0]};
    `;
    sim.appendChild(ray2);
  }

  document.getElementById('glassColor')
    .addEventListener('change', e => updateSimulation(e.target.value));

  /* =========================
     動畫（保險）
  ========================= */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      from { box-shadow:0 0 10px; }
      to { box-shadow:0 0 40px; }
    }
    @keyframes flow {
      from { transform:translateY(0); }
      to { transform:translateY(20px); }
    }
  `;
  document.head.appendChild(style);

  updateSimulation('clear');
});
