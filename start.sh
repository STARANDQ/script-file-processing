#!/bin/sh
echo "\033[1;36mAutostart Server\033[0m";
./node_modules/.bin/supervisor -i node_modules --no-restart-on error -- ./server.js
