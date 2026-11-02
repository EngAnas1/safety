"use strict";
/* QR as crisp SVG with high error correction (still scans with dirt or scratches) */
function qrSVG(text){
  const q = qrcode(0, "H"); q.addData(text); q.make();
  const n = q.getModuleCount(), m = 2; let d = "";
  for(let r=0;r<n;r++) for(let c=0;c<n;c++) if(q.isDark(r,c)) d += `M${c+m} ${r+m}h1v1h-1z`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n+m*2} ${n+m*2}" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#DDF8F3"/><path d="${d}" fill="#041547"/></svg>`;
}

const baseInput = document.getElementById("base");
baseInput.value = location.href.replace(/[?#].*$/, "").replace(/qr\.html$/, "");

const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function topicURL(t){
  let b = baseInput.value.trim();
  if(b && !b.endsWith("/") && !/\.html$/.test(b)) b += "/";
  return t === TOPICS[0] ? b : b + "?t=" + t.id;
}

function draw(){
  const v = baseInput.value;
  document.getElementById("warn").hidden = /^https?:\/\//.test(v) && !/localhost|127\.0\.0\.1/.test(v);
  /* qr.html?t=risk prints that section's card on its own, full page */
  const only = new URLSearchParams(location.search).get("t");
  const list = TOPICS.filter(t => !only || t.id === only);
  document.getElementById("sheet").innerHTML = list.map(t => `
    <article class="card">
      <div class="head">
        <img class="em" src="img/t-${t.id}.webp" alt="">
        <div class="titles">${CONFIG.siteTag?.ar ? `<span class="tag">${esc(CONFIG.siteTag.ar)}</span>` : ""}<span class="ar">${esc(t.ar.title)}</span><span class="en">${esc(t.en.title)}</span><span class="ur">${esc(t.ur.title)}</span></div>
      </div>
      <div class="qr" id="qr-${t.id}">${qrSVG(topicURL(t))}</div>
      <div class="scan"><span>📱 امسح</span><span class="dot"></span><span class="en">Scan</span><span class="dot"></span><span class="ur">اسکین کریں</span></div>
      <div class="foot"><span>إعداد: <b>${esc(CONFIG.ownerName.ar)}</b></span><button class="dl" data-id="${t.id}">تنزيل PNG</button></div>
    </article>`).join("");
}

function downloadPNG(id){
  const svg = document.querySelector("#qr-" + id + " svg");
  const img = new Image(), size = 1200;
  img.onload = () => {
    const cv = document.createElement("canvas"); cv.width = cv.height = size;
    const ctx = cv.getContext("2d"); ctx.imageSmoothingEnabled = false; ctx.drawImage(img, 0, 0, size, size);
    const a = document.createElement("a"); a.download = "qr-" + id + ".png"; a.href = cv.toDataURL("image/png"); a.click();
  };
  img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg.outerHTML);
}

baseInput.addEventListener("input", draw);
document.getElementById("size").addEventListener("change", e => document.body.classList.toggle("big", e.target.value === "big"));
if(new URLSearchParams(location.search).get("t")){ document.body.classList.add("big"); document.getElementById("size").value = "big"; }
draw();

document.getElementById("printBtn").addEventListener("click", () => window.print());
document.getElementById("sheet").addEventListener("click", e => {
  const b = e.target.closest("button.dl");
  if(b) downloadPNG(b.dataset.id);
});

