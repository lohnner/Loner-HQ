@echo off
cd /d "%~dp0"
echo Abrindo Loner HQ em http://localhost:8765/index.html
echo Nao feche esta janela enquanto estiver usando login do Firebase.
start "" "http://localhost:8765/index.html"
python -m http.server 8765 --bind localhost
pause
