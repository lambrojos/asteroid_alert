#!/bin/bash
cd notifier
git pull origin master
npm install
node index.js -p 3001
