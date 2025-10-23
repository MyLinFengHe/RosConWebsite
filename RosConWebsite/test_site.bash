#!/bin/bash

# Test locally this site only.

#ghrocker . --baseurl=""

docker run --rm -it \
  -w /tmp/jekyll \
  -v /mnt/d/RosCon_Website/RosCon_Website/ghrocker_venv/roscon-website-template-main:/tmp/jekyll \
  -p 4000:3000 \
  ghcr.io/tfoote/ghrocker/ghrocker:latest \
  jekyll serve -w --force_polling --baseurl='' -d /tmp/aliased_site --host 0.0.0.0
       