# Studio 29™ Minecraft Launcher

[![Build Status](https://dev.azure.com/studio2nine/S29Launcher/_apis/build/status/Minecraft%20Box%20(Windows%2010%20build%201803)%20Build?branchName=master)](https://dev.azure.com/studio2nine/S29Launcher/_build/latest?definitionId=1&branchName=master)
![GitHub repo size in bytes](https://img.shields.io/github/repo-size/stwentynine/S29Launcher.svg)

## How to build

This app uses PUGJS for templates. In the command prompt, run:
```cmd
1. npm install
2. npm install -g pug-cli

3.ish   *If you should run into a small problem after installing, you can fix this by typing "npm audit fix", once this is done which is fast, then go onto the next step below

4. npm run pug
5. npm start
```

If you wish to package it too, run:
```cmd
mpm pack
```
**NOTE:** Run `npm dist` if you wish to package the app into a installer
