#!/usr/bin/env bash
# Generates a self-contained @font-face CSS block (base64 data URIs) for the
# Stolzl brand font, to paste into standalone HTML artifacts / КП / presentations
# that can't reference files from this repo (e.g. Claude Artifacts).
#
# Usage: ./scripts/stolzl-data-uri.sh > stolzl-embed.css

set -euo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/public/fonts/stolzl"

declare -A WEIGHTS=(
  [stolzl_thin]=100
  [stolzl_light]=300
  [stolzl_book]=350
  [stolzl_regular]=400
  [stolzl_medium]=500
  [stolzl_bold]=700
)

for name in stolzl_thin stolzl_light stolzl_book stolzl_regular stolzl_medium stolzl_bold; do
  weight="${WEIGHTS[$name]}"
  b64=$(base64 -w0 "$DIR/$name.otf")
  cat <<EOF
@font-face{
  font-family:'Stolzl';
  src:url(data:font/otf;base64,${b64}) format('opentype');
  font-weight:${weight};
  font-style:normal;
  font-display:swap;
}
EOF
done
