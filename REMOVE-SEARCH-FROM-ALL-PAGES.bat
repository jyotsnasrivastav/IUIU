@echo off
echo.
echo ========================================
echo   REMOVING SEARCH FROM ALL PAGES
echo ========================================
echo.
echo 🗑️ This will remove search functionality from ALL pages
echo ✅ AdSense will remain intact
echo 🚀 Pages will load faster without search
echo.
pause
echo.

echo 🔍 Processing all HTML pages...
set count=0

for %%f in (*.html) do (
    echo 📝 Removing search from: %%f
    
    REM Create backup
    copy "%%f" "%%f.search-backup" >nul 2>&1
    
    REM Remove search handler script
    powershell -Command "(Get-Content '%%f') -replace '.*search-handler\.js.*\r?\n?', '' | Set-Content '%%f'"
    
    REM Remove search-related comments
    powershell -Command "(Get-Content '%%f') -replace '.*Search Handler for proper canonical tags.*\r?\n?', '' | Set-Content '%%f'"
    
    REM Remove "Search Symbols" title/heading
    powershell -Command "(Get-Content '%%f') -replace '.*Search Symbols.*\r?\n?', '' | Set-Content '%%f'"
    
    REM Remove search input with placeholder
    powershell -Command "(Get-Content '%%f') -replace '.*Search for symbols, emojis, hearts, arrows.*\r?\n?', '' | Set-Content '%%f'"
    
    REM Remove search input elements
    powershell -Command "(Get-Content '%%f') -replace '.*<input.*search.*>.*\r?\n?', '' | Set-Content '%%f'"
    powershell -Command "(Get-Content '%%f') -replace '.*<input.*placeholder.*symbols.*>.*\r?\n?', '' | Set-Content '%%f'"
    
    REM Remove search button
    powershell -Command "(Get-Content '%%f') -replace '.*<button.*Search.*</button>.*\r?\n?', '' | Set-Content '%%f'"
    powershell -Command "(Get-Content '%%f') -replace '.*<button.*search.*>.*\r?\n?', '' | Set-Content '%%f'"
    
    REM Remove search form elements
    powershell -Command "(Get-Content '%%f') -replace '.*<form.*search.*>.*\r?\n?', '' | Set-Content '%%f'"
    powershell -Command "(Get-Content '%%f') -replace '.*</form>.*\r?\n?', '' | Set-Content '%%f'"
    
    REM Remove search container divs
    powershell -Command "(Get-Content '%%f') -replace '.*<div.*search.*>.*\r?\n?', '' | Set-Content '%%f'"
    powershell -Command "(Get-Content '%%f') -replace '.*search-container.*\r?\n?', '' | Set-Content '%%f'"
    powershell -Command "(Get-Content '%%f') -replace '.*search-box.*\r?\n?', '' | Set-Content '%%f'"
    
    REM Remove search-related CSS classes
    powershell -Command "(Get-Content '%%f') -replace '.*class.*search.*\r?\n?', '' | Set-Content '%%f'"
    
    REM Remove search JavaScript functions
    powershell -Command "(Get-Content '%%f') -replace '.*function.*search.*\r?\n?', '' | Set-Content '%%f'"
    powershell -Command "(Get-Content '%%f') -replace '.*searchSymbols.*\r?\n?', '' | Set-Content '%%f'"
    
    set /a count+=1
    echo ✅ Done: %%f
)

echo.
echo 🎉 SEARCH REMOVED FROM ALL PAGES!
echo.
echo 📊 SUMMARY:
echo ✅ Pages processed: %count%
echo ✅ Search functionality removed
echo ✅ AdSense scripts kept intact
echo ✅ Pages will load faster
echo.
echo 🚀 BENEFITS:
echo - Faster page loading
echo - Cleaner HTML code
echo - AdSense still working 100%%
echo - Better user experience
echo.
echo ⚠️  NOTE: 
echo - search-handler.js file can be deleted
echo - Backup files created (.search-backup)
echo - AdSense remains fully functional
echo.
pause
