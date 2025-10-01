# Fix AdSense ads by adding push() script after each ad unit
# This script adds the missing (adsbygoogle = window.adsbygoogle || []).push({}); after each ad

$files = Get-ChildItem -Path "." -Filter "*.html" -File | Where-Object { $_.Name -ne "index.html" }

$fixCount = 0
$fileCount = 0

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    
    # Pattern: Find </ins> that's NOT followed by a <script> tag with push
    # Replace with </ins> followed by the push script
    $pattern = '(data-full-width-responsive="true"></ins>)(\s*)(?![\s\S]*?<script>\s*\(adsbygoogle)'
    $replacement = '$1$2<script>$2(adsbygoogle = window.adsbygoogle || []).push({});$2</script>'
    
    # More precise pattern: match ad units without push script immediately after
    $pattern = '(data-full-width-responsive="true"></ins>)([\r\n\s]*?)(?!<script>[\s\S]*?adsbygoogle.*?push)'
    
    # Find all ad units and check if they have push script
    $adPattern = '<ins class="adsbygoogle"[\s\S]*?data-full-width-responsive="true"></ins>'
    $matches = [regex]::Matches($content, $adPattern)
    
    $modified = $false
    foreach ($match in $matches) {
        $endPos = $match.Index + $match.Length
        $nextChars = $content.Substring($endPos, [Math]::Min(200, $content.Length - $endPos))
        
        # Check if push script exists within next 200 characters
        if ($nextChars -notmatch '\(adsbygoogle\s*=\s*window\.adsbygoogle\s*\|\|\s*\[\]\)\.push') {
            # Extract indentation from the </ins> line
            $insLine = $match.Value -split "`n" | Select-Object -Last 1
            $indent = ""
            if ($insLine -match '^(\s*)') {
                $indent = $matches[1]
            }
            
            # Add push script after this ad unit
            $adUnit = $match.Value
            $replacement = $adUnit + "`n" + $indent + "<script>`n" + $indent + "(adsbygoogle = window.adsbygoogle || []).push({});`n" + $indent + "</script>"
            $content = $content.Replace($adUnit, $replacement)
            $modified = $true
            $fixCount++
        }
    }
    
    if ($modified) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
        Write-Host "Fixed: $($file.Name) - Added push scripts" -ForegroundColor Green
        $fileCount++
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "SUMMARY:" -ForegroundColor Cyan
Write-Host "Files modified: $fileCount" -ForegroundColor Yellow
Write-Host "Ad units fixed: $fixCount" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
