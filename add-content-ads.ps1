# Add content ads in the middle of symbol content
# Strategy: Add 1 ad per 10 symbols for maximum revenue

$contentAd = @'

<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7064720037053690"
     crossorigin="anonymous"></script>
<!-- content-banner -->
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-7064720037053690"
     data-ad-slot="4594822602"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
'@

$files = Get-ChildItem -Path "." -Filter "*.html" -File

$totalFilesModified = 0
$totalAdsAdded = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # Count symbols in this file
    $symbolMatches = [regex]::Matches($content, '<div class="symbol"[^>]*onclick="copyToClipboard\([^)]+\)[^>]*>[^<]+</div>')
    $symbolCount = $symbolMatches.Count
    
    if ($symbolCount -lt 30) {
        # Skip files with too few symbols
        continue
    }
    
    # Calculate how many ads to add (1 per 10 symbols, max 20 ads per page)
    $adsToAdd = [Math]::Min([Math]::Floor($symbolCount / 10), 20)
    
    if ($adsToAdd -eq 0) {
        $adsToAdd = 1  # At least 1 ad if there are 30+ symbols
    }
    
    # Calculate interval between ads
    $interval = [Math]::Floor($symbolCount / ($adsToAdd + 1))
    
    if ($interval -lt 20) {
        $interval = 20  # Minimum 20 symbols between ads
    }
    
    $adsAddedThisFile = 0
    $offset = 0
    
    for ($i = 1; $i -le $adsToAdd; $i++) {
        $position = $i * $interval
        
        if ($position -ge $symbolCount) {
            break
        }
        
        $symbolMatch = $symbolMatches[$position]
        $insertPosition = $symbolMatch.Index + $symbolMatch.Length + $offset
        
        # Insert ad after this symbol
        $content = $content.Insert($insertPosition, $contentAd)
        $offset += $contentAd.Length
        $adsAddedThisFile++
    }
    
    if ($adsAddedThisFile -gt 0) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "Added $adsAddedThisFile content ads to $($file.Name) ($symbolCount symbols)" -ForegroundColor Green
        $totalFilesModified++
        $totalAdsAdded += $adsAddedThisFile
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "CONTENT ADS INSTALLATION COMPLETE!" -ForegroundColor Cyan
Write-Host "Files modified: $totalFilesModified" -ForegroundColor Yellow
Write-Host "Total content ads added: $totalAdsAdded" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "`nContent ads added strategically between symbols!" -ForegroundColor Green
