# Fix all *-lenny-face.html pages: ensure AdSense loader present before </head>,
# fix malformed anchor closing tags, and add </head> if <body> appears before it.

$files = Get-ChildItem -Recurse -File -Filter *-lenny-face.html
$updated = 0
foreach ($f in $files) {
  $c = Get-Content -LiteralPath $f.FullName -Raw
  $orig = $c

  # Fix malformed </a> like ')/a>' or '>/a>'
  $c = [regex]::Replace($c, '\)/a>', ')</a>')
  $c = [regex]::Replace($c, '>/a>', '></a>')

  $hasLoader = $c -match 'adsense-integration\.js'
  $hasHeadClose = $c -match '(?i)</head>'
  $hasBody = $c -match '(?i)<body'

  if (-not $hasLoader) {
    if ($hasHeadClose) {
      # Inject before first </head>
      $injection = "`t<!-- Google AdSense Integration -->`r`n`t<script src='adsense-integration.js' defer></script>`r`n</head>"
      $c = [regex]::Replace($c, '(?i)</head>', $injection, 1)
    } elseif ($hasBody -and ($c -match '(?i)<head')) {
      # Insert missing </head> + loader before first <body>
      $c = [regex]::Replace($c, '(?i)<body', "`r`n<!-- Google AdSense Integration -->`r`n<script src='adsense-integration.js' defer></script>`r`n</head>`r`n<body", 1)
    } else {
      # As a fallback, prepend loader at top of file right after <html>
      $c = [regex]::Replace($c, '(?i)<html[^>]*>', { param($m) $m.Value + "`r`n<head>`r`n<!-- Google AdSense Integration -->`r`n<script src='adsense-integration.js' defer></script>`r`n</head>" }, 1)
    }
  }

  if ($c -ne $orig) {
    Set-Content -LiteralPath $f.FullName -Value $c -Encoding UTF8
    $updated++
  }
}
Write-Host "Updated $updated Lenny Face pages."
