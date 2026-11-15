# Cloudflare Pages Free

This project uses the official static Next.js export workflow: https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/

`next.config.ts`: `output: 'export'`, `trailingSlash: true`, `images.unoptimized: true`.

Images are already local optimised WebP. There is no runtime Next Image server on Pages. All product routes are emitted with generateStaticParams; client-side navigation, localStorage cart, filters and local demo checkout remain functional. There are no server functions, payments or transmitted order data.

## Direct upload (used for this demo)
```sh
npm ci
npm run build
npx wrangler login
npx wrangler pages project create luneo-nullexweb --production-branch main --force
npx wrangler pages deploy out --project-name luneo-nullexweb --branch main
```
The project-create command is needed only once. Cloudflare credentials remain outside the repository. Preview locally using `python3 -m http.server 3020 --directory out`; `next start` is not used for a static export.

## Optional Git integration
Connect `darmaskirov/luneo` in Cloudflare Pages, preset Next.js (Static HTML Export), build `npm run build`, output `out`, Node 22. Direct-upload projects cannot be converted to Git integration; create a separate Pages project if choosing this option. Current direct upload does not automatically deploy Git pushes.

Set NEXT_PUBLIC_SITE_URL to the real canonical HTTPS address before building if changing domains. Current default: https://luneo-nullexweb.pages.dev.

Only upload `out/`. Portfolio videos, scripts, source, reports, node_modules and credentials are not deployment assets.

## Reproduce portfolio media
Start the static production server on port 3020, then:
```sh
npx playwright install ffmpeg
RECORD=1 node scripts/portfolio.mjs
node scripts/presentations.mjs
python3 scripts/montage.py
```
Requires Chrome at /usr/bin/google-chrome and system FFmpeg. Raw WebM files contain real browser interaction; the MP4 is edited from these recordings, with a separate designed end card. No music or audio is included. Playwright recordings have variable capture cadence; export is encoded at constant 30 FPS and cannot guarantee 30 unique captured frames each second.
