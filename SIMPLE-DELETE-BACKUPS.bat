@echo off
echo.
echo ========================================
echo   DELETING BACKUP FILES (SIMPLE VERSION)
echo ========================================
echo.
echo This will delete all backup files safely.
echo.
pause

echo Deleting backup files...

del *.backup 2>nul
del *.search-backup 2>nul
del *.bak 2>nul
del *.old 2>nul
del *.orig 2>nul
del *.temp 2>nul

echo.
echo Done! All backup files deleted.
echo Your original files are safe.
echo.
pause
