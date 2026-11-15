# LUNEO / Marketing reel / 60 FPS

1080×1920, 60 FPS, H.264, no audio. Real browser interactions captured with FFmpeg x11grab at 60 Hz on an isolated Xvfb display, not converted from the older 30 FPS Playwright recording. Static portions naturally contain repeated frames; encoded frame rate alone does not imply 60 different images per second.

## Storyboard
0–3.5 s — Your brand. An experience. / Strong first impression.
3.5–7.5 s — Make the first impression last. / Editorial hero and real scroll.
7.5–12 s — Designed to be discovered. / Product hover and category filter.
12–17 s — Every detail. Every decision. / Real colour selection and opening the bag.
17–21.5 s — One experience. Every screen. / Mobile product, bag and checkout.
21.5–24.5 s — From interest to intention. / Clear demo checkout.
24.5–28 s — LUNEO / NULLEXWEB / Ready for your next digital experience? / nullexweb.com.

The marketing composition frames the actual running website in browser iframes; UI is not redrawn. Titles and the CTA are presentation graphics. No sales or conversion uplift is claimed. Demo concept, no real payments.

## Reproduce
Start `PORT=3021 npm start`, then run `node scripts/reel-60fps.mjs` on Linux with Xvfb, xdotool, Chrome, FFmpeg and Playwright available. Raw capture is ignored in Git under video/raw. Export command is in scripts/export-reel-60fps.sh.
