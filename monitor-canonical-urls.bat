@echo off
REM Weekly Canonical URL Health Check
REM Run this script weekly to monitor for new redirect issues

echo Starting weekly canonical URL health check...
echo Date: %date% %time%

cd /d "c:\Users\0\Desktop\IUIU-main"

REM Run the canonical URL checker
node canonical-url-checker.js

REM Check if any issues were found
if %errorlevel% neq 0 (
    echo WARNING: Canonical URL issues detected!
    echo Please review the generated reports.
) else (
    echo SUCCESS: All canonical URLs are healthy!
)

echo.
echo Reports saved to:
echo - canonical-url-report.json
echo - canonical-url-report.html
echo.
echo Health check completed at %date% %time%
pause
