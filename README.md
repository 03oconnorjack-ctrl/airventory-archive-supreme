# Supreme archive site

Same structure as archive-site. `archive/supreme/` holds site copies (max 1000px, downscaled
only), `thumb/` 300px, `manifest.json`. Originals (up to 1350px) stay in
`../supreme-archive/originals/`. Rebuild after more downloads with
`python3 scratchpad/supreme/build_site.py`, then commit and push.

Publish (Jack, once): 
  cd ~/Documents/claude-mac-move/maverick-marketing/research/archive-supreme-site && gh repo create airventory-archive-supreme --public --source=. --push && gh api -X POST repos/03oconnorjack-ctrl/airventory-archive-supreme/pages -f build_type=legacy -f 'source[branch]=main' -f 'source[path]=/' && echo DONE

DNS (Hostinger): CNAME  archive-supreme... no: Name `supreme`, points to `03oconnorjack-ctrl.github.io`.
Then set the custom domain: gh api -X PUT repos/03oconnorjack-ctrl/airventory-archive-supreme/pages -f cname=supreme.airventory.io
Framer: draft page /archive/supreme on branch "slate-wave" points at https://supreme.airventory.io/archive/supreme/manifest.json
