# Remove ALL AdSense code from all HTML files
# This removes: head scripts, meta tags, ad units, everything related to AdSense

$files = Get-ChildItem -Path "." -Filter "*.html" -File

$totalFilesModified = 0
$totalAdsRemoved = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    $adsRemoved = 0
    
    # Count existing ads before removal
    $existingAds = ([regex]::Matches($content, '<ins class="adsbygoogle"')).Count
    
    # 1. Remove AdSense script from head
    $content = $content -replace '<script async defer src="https://pagead2\.googlesyndication\.com/pagead/js/adsbygoogle\.js\?client=ca-pub-[0-9]+"[^>]*></script>\s*', ''
    $content = $content -replace '<script async src="https://pagead2\.googlesyndication\.com/pagead/js/adsbygoogle\.js\?client=ca-pub-[0-9]+"[^>]*></script>\s*', ''
    
    # 2. Remove meta tag
    $content = $content -replace '\s*<meta name="google-adsense-account" content="ca-pub-[0-9]+" />\s*', ''
    
    # 3. Remove complete ad units (including wrapper divs and comments)
    # Pattern: <!-- comment --> <div> <script> <ins> </ins> <script>push</script> </div>
    $content = $content -replace '(?s)\s*<!--\s*(top-banner|content-banner|sidebar-ad|bottom-banner)\s*-->\s*.*?<ins class="adsbygoogle".*?</ins>\s*(<script>\s*\(adsbygoogle[^<]*</script>\s*)?', ''
    
    # 4. Remove ad container divs that might be left
    $content = $content -replace '(?s)<div class="ad-container"[^>]*>\s*<script[^>]*googlesyndication[^<]*</script>\s*<ins class="adsbygoogle"[^>]*>.*?</ins>\s*(<script>\s*\(adsbygoogle[^<]*</script>\s*)?</div>\s*', ''
    
    # 5. Remove standalone ad units
    $content = $content -replace '(?s)<ins class="adsbygoogle"[^>]*data-ad-client="ca-pub-[0-9]+"[^>]*>.*?</ins>\s*', ''
    
    # 6. Remove push scripts
    $content = $content -replace '\s*<script>\s*\(adsbygoogle\s*=\s*window\.adsbygoogle\s*\|\|\s*\[\]\)\.push\(\{\}\);\s*</script>\s*', ''
    
    # 7. Remove sidebar ad container
    $content = $content -replace '(?s)\s*<!--\s*Sidebar Ad Container\s*-->\s*<div class="sidebar-ad-container">.*?</div>\s*</div>\s*', ''
    
    # 8. Remove any remaining AdSense references
    $content = $content -replace 'data-ad-client="ca-pub-[0-9]+"', ''
    $content = $content -replace 'data-ad-slot="[0-9]+"', ''
    
    # Clean up multiple blank lines
    $content = $content -replace '(\r?\n\s*){3,}', "`n`n"
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        $totalFilesModified++
        $totalAdsRemoved += $existingAds
        Write-Host "Cleaned: $($file.Name) - Removed $existingAds ad units" -ForegroundColor Green
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "ADSENSE REMOVAL COMPLETE!" -ForegroundColor Cyan
Write-Host "Files cleaned: $totalFilesModified" -ForegroundColor Yellow
Write-Host "Total ads removed: $totalAdsRemoved" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "`nAll AdSense code has been removed from all HTML files." -ForegroundColor Green
Write-Host "You can now add your new ad code!" -ForegroundColor Green
