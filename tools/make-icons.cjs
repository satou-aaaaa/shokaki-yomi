// アプリのアイコン（icon-192.png・icon-512.png）を作る。生成りの地に、赤い消火器と黒いホース（自作の形。実在の製品をまねない）。
// 使い方: node tools/make-icons.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of [192, 512]) {
    const p = await b.newPage({ viewport: { width: s, height: s } });
    await p.setContent(`<body style="margin:0"><svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#123554"/>
      <rect x="34" y="30" width="32" height="58" rx="12" fill="#d1271b"/>
      <rect x="40" y="20" width="20" height="12" rx="3" fill="#2b2f36"/>
      <path d="M60 24h14l4 6" stroke="#2b2f36" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M40 26c-14 0-18 18-12 34" stroke="#111" stroke-width="5" fill="none" stroke-linecap="round"/>
      <circle cx="50" cy="58" r="10" fill="#fffdf7"/><path d="M50 50c4 4 5 7 3 10 0-2-1-3-3-4-1 2-3 3-2 5-3-2-2-7 2-11z" fill="#d1271b"/></svg></body>`);
    await p.screenshot({ path: path.join(__dirname, "..", `icon-${s}.png`), clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
})();
