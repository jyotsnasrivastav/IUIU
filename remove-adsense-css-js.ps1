# Remove AdSense related CSS and JS code from all HTML files
# Removes: preconnect links, sidebar-ad styles, ad-container styles, etc.

$files = Get-ChildItem -Path "." -Filter "*.html" -File

$totalFilesModified = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    
    # 1. Remove preconnect to pagead2.googlesyndication.com
    $content = $content -replace '\s*<link rel="preconnect" href="https://pagead2\.googlesyndication\.com"[^>]*/?>\s*', ''
    
    # 2. Remove sidebar-ad-container CSS
    $content = $content -replace '(?s)/\*\s*Sidebar Ad Styles\s*\*/.*?\.sidebar-ad-container\s*\{[^}]*\}', ''
    $content = $content -replace '(?s)\.sidebar-ad-container\s*\{[^}]*\}', ''
    
    # 3. Remove sidebar-ad CSS
    $content = $content -replace '(?s)\.sidebar-ad\s*\{[^}]*\}', ''
    
    # 4. Remove ad-container CSS
    $content = $content -replace '(?s)\.ad-container\s*\{[^}]*\}', ''
    
    # 5. Remove responsive sidebar media queries
    $content = $content -replace '(?s)/\*\s*Responsive Sidebar\s*\*/.*?@media[^{]*\{[^}]*\.sidebar-ad-container[^}]*\}[^}]*\}', ''
    $content = $content -replace '(?s)@media[^{]*\{[^}]*\.sidebar-ad-container[^}]*display:\s*none[^}]*\}[^}]*\}', ''
    
    # 6. Remove any standalone sidebar-ad-container references in media queries
    $content = $content -replace '(?s)\.sidebar-ad-container\s*\{[^}]*display:\s*none[^}]*\}', ''
    
    # 7. Clean up multiple blank lines and extra whitespace
    $content = $content -replace '(\r?\n\s*){3,}', "`n`n"
    $content = $content -replace '\t\t\n\t\t\n', "`n"
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        $totalFilesModified++
        Write-Host "Cleaned CSS/JS: $($file.Name)" -ForegroundColor Green
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "ADSENSE CSS/JS REMOVAL COMPLETE!" -ForegroundColor Cyan
Write-Host "Files cleaned: $totalFilesModified" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "`nAll AdSense CSS and JS references removed!" -ForegroundColor Green
