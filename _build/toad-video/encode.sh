#!/usr/bin/env bash
# Re-encode the TOAD long spot into eyetoad media/toad/ (same file names, so no page edits needed).
# Usage: bash _build/toad-video/encode.sh "<path to TOAD_104_LONG_vN_web.mp4>"
# Stop any local preview server first: it locks the mp4s on Windows.
set -euo pipefail
FF="C:/Users/zachw/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-9.0.2-full_build/bin/ffmpeg"
SRC="$1"; OUT="$(cd "$(dirname "$0")/../.." && pwd)/media/toad"
"$FF" -y -v error -i "$SRC" -map 0:V:0 -map 0:a:0 -c:v libx264 -preset slow -crf 23 -maxrate 3500k -bufsize 7000k -profile:v high -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart -map_metadata -1 "$OUT/toad-104-1080.mp4"
"$FF" -y -v error -i "$SRC" -map 0:V:0 -map 0:a:0 -vf scale=-2:720 -c:v libx264 -preset slow -crf 24 -maxrate 1800k -bufsize 3600k -profile:v high -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart -map_metadata -1 "$OUT/toad-104-720.mp4"
ls -la "$OUT"
