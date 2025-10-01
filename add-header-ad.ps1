# Add header ad below </header> tag in all HTML files

$headerAd = @'
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7064720037053690"
     crossorigin="anonymous"></script>
<!-- top-banner -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-7064720037053690"
     data-ad-slot="5788145465"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>

'@

$files = Get-ChildItem -Path "." -Filter "*.html" -File

$totalFilesModified = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Check if ad already exists
    if ($content -match 'data-ad-slot="5788145465"') {
        Write-Host "Skipped (already has ad): $($file.Name)" -ForegroundColor Yellow
        continue
    }
    
    # Find </header> tag and add ad after it
    if ($content -match '</header>') {
        $content = $content -replace '(</header>)', "`$1`n$headerAd"
        
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        $totalFilesModified++
        Write-Host "Added header ad: $($file.Name)" -ForegroundColor Green
    } else {
        Write-Host "No header tag found: $($file.Name)" -ForegroundColor Red
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "HEADER AD INSTALLATION COMPLETE!" -ForegroundColor Cyan
Write-Host "Files modified: $totalFilesModified" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "`nHeader ad added below </header> tag in all pages!" -ForegroundColor Green
