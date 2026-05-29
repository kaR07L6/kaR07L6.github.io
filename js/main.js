/* =============================================
   PORTFOLIO — Serial Experiments Lain Style
   main.js
   ============================================= */

/* ---------- ノイズアニメーション ---------- */
const noiseCanvas = document.getElementById('noise-canvas');
const ctx = noiseCanvas.getContext('2d');

function resizeNoise() {
  noiseCanvas.width  = window.innerWidth;
  noiseCanvas.height = window.innerHeight;
}
resizeNoise();
window.addEventListener('resize', resizeNoise);

function drawNoise() {
  const w = noiseCanvas.width;
  const h = noiseCanvas.height;
  const img = ctx.createImageData(w, h);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = Math.random() * 255 | 0;
    img.data[i]     = v;
    img.data[i + 1] = v;
    img.data[i + 2] = v;
    img.data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
}
setInterval(drawNoise, 80);


/* ---------- 画面遷移 ---------- */
const intro   = document.getElementById('screen-intro');
const loading = document.getElementById('screen-loading');
const main    = document.getElementById('screen-main');

let activated = false;

// キーボード: y キー
document.addEventListener('keydown', (e) => {
  if (activated) return;
  if (e.key === 'y' || e.key === 'Y') {
    activated = true;
    startTransition();
  }
});

// スマホ・タッチ対応: タップでも進める
document.getElementById('screen-intro').addEventListener('click', () => {
  if (activated) return;
  activated = true;
  startTransition();
});

function startTransition() {
  // イントロをフェードアウト
  intro.style.transition = 'opacity 1s ease';
  intro.style.opacity = '0';

  setTimeout(() => {
    intro.style.display = 'none';

    // ローディング画面を表示
    loading.style.display = 'flex';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        loading.style.opacity = '1';
      });
    });

    // 約3秒後にメイン画面へ
    setTimeout(() => {
      loading.style.transition = 'opacity 0.8s ease';
      loading.style.opacity = '0';

      setTimeout(() => {
        loading.style.display = 'none';

        // メイン画面を表示
        main.style.display = 'block';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            main.style.opacity = '1';
          });
        });

        // スキルバーをアニメーション
        animateSkillBars();

      }, 800);
    }, 2800);
  }, 1000);
}


/* ---------- スキルバーアニメーション ---------- */
function animateSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');
  fills.forEach((fill) => {
    const targetWidth = fill.style.width;
    fill.style.width = '0%';
    fill.style.transition = 'width 1.2s ease';
    setTimeout(() => {
      fill.style.width = targetWidth;
    }, 300);
  });
}


/* ---------- グリッチエフェクト（ランダム） ---------- */
function randomGlitch() {
  const title = document.querySelector('.lain-title');
  if (!title) return;

  const original = title.textContent;
  const glitchChars = '!@#$%^&*<>[]{}|/\\?~`';
  const duration = 150;
  const steps = 4;

  let step = 0;
  const interval = setInterval(() => {
    let glitched = '';
    for (let i = 0; i < original.length; i++) {
      if (Math.random() < 0.15) {
        glitched += glitchChars[Math.floor(Math.random() * glitchChars.length)];
      } else {
        glitched += original[i];
      }
    }
    title.textContent = glitched;
    step++;
    if (step >= steps) {
      clearInterval(interval);
      title.textContent = original;
    }
  }, duration / steps);
}

// メイン画面表示後に定期的にグリッチ
setInterval(() => {
  if (main.style.opacity === '1') {
    randomGlitch();
  }
}, 7000);