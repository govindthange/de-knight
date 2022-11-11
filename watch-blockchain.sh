#!/bin/bash
docker logs --follow de-chess-blockchain | awk '!/eth/'
# tail -f /path/to/log | grep --line-buffered 'X' | grep -v 'Y'
# OR
# tail -f /path/to/log | stdbuf -oL grep 'X' | grep -v 'Y'
# OR
# tail -f /path/to/log | awk '/X/ && !/Y/'
# #                           ^^^    ^^^^
# #                   this I want    but not this
