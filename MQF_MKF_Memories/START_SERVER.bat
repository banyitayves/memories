@echo off
REM MQF & MKF Memories - Cloud Server Launcher
REM This script starts the cloud synchronization server

cd /d "%~dp0"

echo.
echo ========================================
echo  MQF ^& MKF Memories - Cloud Server
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ ERROR: Node.js is not installed!
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo After installation, close and reopen this window.
    echo.
    pause
    exit /b 1
)

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    call npm install
    echo.
)

REM Start the server
echo ✅ Starting Cloud Server...
echo.
echo 🚀 Server will run on: http://localhost:3001
echo.
echo 💡 Tips:
echo    - Open index.html in your browser
echo    - Keep this window open while using the app
echo    - Close this window to stop the server
echo.
echo ========================================
echo.

call npm start

pause
