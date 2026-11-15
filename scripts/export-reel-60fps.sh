#!/usr/bin/env bash
set -euo pipefail
ffmpeg -hide_banner -loglevel warning -y -i portfolio-assets/video/raw/reel-60fps-capture.mp4 -t 28 -vf 'fps=60,fade=t=in:st=0:d=0.2,fade=t=out:st=27.6:d=0.4' -an -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -movflags +faststart portfolio-assets/video/luneo-instagram-reel-60fps.mp4
cp portfolio-assets/video/luneo-instagram-reel-60fps.mp4 portfolio-assets/video/luneo-instagram-reel.mp4
