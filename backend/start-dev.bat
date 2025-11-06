@echo off
cd /d "%~dp0"
echo Starting Online Book Store Backend Server (Development Mode)...
echo.
npx nodemon server.js
