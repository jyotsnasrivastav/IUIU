# Add more ads to increase ad density
# Target: 1 ad per 40-50 symbols

$adTemplate = @'

						<!-- content-banner -->
						<div class="ad-container" style="margin:20px 0; text-align:center; grid-column: 1 / -1;">
							<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7064720037053690"
							     crossorigin="anonymous"></script>
							<ins class="adsbygoogle"
							     style="display:block"
							     data-ad-client="ca-pub-7064720037053690"
							     data-ad-slot="4594822602"
							     data-ad-format="auto"
							     data-full-width-responsive="true"></ins>
							<script>
							(adsbygoogle = window.adsbygoogle || []).push({});
							</script>
						</div>
'@

$files = Get-ChildItem -Path "." -Filter "*.html" -File

$totalAdsAdded = 0
$filesModified = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    
    # Count symbols in this file
    $symbolMatches = [regex]::Matches($content, '<div class="symbol"')
    $symbolCount = $symbolMatches.Count
    
    if ($symbolCount -lt 30) {
        # Skip files with too few symbols
        continue
    }
    
    # Count existing ads
    $existingAds = [regex]::Matches($content, '<ins class="adsbygoogle"').Count
    
    # Calculate how many ads we should have (1 per 40 symbols)
    $targetAds = [Math]::Floor($symbolCount / 40)
    $adsToAdd = $targetAds - $existingAds
    
    if ($adsToAdd -le 0) {
        continue
    }
    
    # Find all symbol divs
    $allSymbols = [regex]::Matches($content, '<div class="symbol"[^>]*>.*?</div>')
    
    if ($allSymbols.Count -eq 0) {
        continue
    }
    
    # Calculate interval for ad placement
    $interval = [Math]::Floor($allSymbols.Count / ($adsToAdd + 1))
    
    if ($interval -lt 20) {
        $interval = 20  # Minimum 20 symbols between ads
    }
    
    $adsAddedThisFile = 0
    $offset = 0
    
    for ($i = 1; $i -le $adsToAdd; $i++) {
        $position = $i * $interval
        
        if ($position -ge $allSymbols.Count) {
            break
        }
        
        $symbolMatch = $allSymbols[$position]
        $insertPosition = $symbolMatch.Index + $symbolMatch.Length + $offset
        
        # Insert ad after this symbol
        $content = $content.Insert($insertPosition, $adTemplate)
        $offset += $adTemplate.Length
        $adsAddedThisFile++
    }
    
    if ($adsAddedThisFile -gt 0) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        $newTotal = $existingAds + $adsAddedThisFile
        Write-Host "Added $adsAddedThisFile ads to $($file.Name) - Symbols: $symbolCount, Ads: $existingAds to $newTotal" -ForegroundColor Green
        $totalAdsAdded += $adsAddedThisFile
        $filesModified++
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "AD DENSITY OPTIMIZATION COMPLETE!" -ForegroundColor Cyan
Write-Host "Files modified: $filesModified" -ForegroundColor Yellow
Write-Host "Total new ads added: $totalAdsAdded" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
