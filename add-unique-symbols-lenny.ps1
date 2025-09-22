# Add unique/different symbols to each *-lenny-face.html page
# Each page gets its own themed symbol set

$symbolSets = @{
    'cute-lenny-face.html' = @('(◕‿◕)', '(◡ ‿ ◡)', '(◠‿◠)', '(◕ᴗ◕)', '(◡‿◡)', '(◕‿◕✿)', '(◡ ω ◡)', '(◠‿◠)♡', '(◕‿◕)♡', '(◡‿◡)♡')
    'happy-lenny-face.html' = @('(◕‿◕)', '(＾◡＾)', '(◠‿◠)', '(◕ᴗ◕)', '(◡‿◡)', '(◕‿◕✿)', '(◡ ω ◡)', '(◠‿◠)♡', '(◕‿◕)♡', '(◡‿◡)♡')
    'sad-lenny-face.html' = @('(╥﹏╥)', '(ಥ_ಥ)', '(╯︵╰)', '(◞‸◟)', '(╥﹏╥)', '(ಥ﹏ಥ)', '(╯︵╰)', '(◞‸◟)', '(╥﹏╥)', '(ಥ_ಥ)')
    'angry-lenny-face.html' = @('(ಠ_ಠ)', '(╯°□°）╯', '(ಠ益ಠ)', '(╬ಠ益ಠ)', '(ಠ_ಠ)', '(╯°□°）╯', '(ಠ益ಠ)', '(╬ಠ益ಠ)', '(ಠ_ಠ)', '(╯°□°）╯')
    'surprised-lenny-face.html' = @('(◉_◉)', '(⊙_⊙)', '(◎_◎)', '(⊙ω⊙)', '(◉_◉)', '(⊙_⊙)', '(◎_◎)', '(⊙ω⊙)', '(◉_◉)', '(⊙_⊙)')
    'wink-lenny-face.html' = @('(◕‿-)', '(◡‿-)', '(-‿◕)', '(◕‿~)', '(◡‿-)', '(-‿◕)', '(◕‿~)', '(◡‿-)', '(-‿◕)', '(◕‿~)')
    'confused-lenny-face.html' = @('(◔_◔)', '(¬_¬)', '(◔◡◔)', '(¬‿¬)', '(◔_◔)', '(¬_¬)', '(◔◡◔)', '(¬‿¬)', '(◔_◔)', '(¬_¬)')
    'shy-lenny-face.html' = @('(⁄ ⁄•⁄ω⁄•⁄ ⁄)', '(//▽//)', '(⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄)', '(//◡//)', '(⁄ ⁄•⁄ω⁄•⁄ ⁄)', '(//▽//)', '(⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄)', '(//◡//)', '(⁄ ⁄•⁄ω⁄•⁄ ⁄)', '(//▽//)')
    'laughing-lenny-face.html' = @('(≧∇≦)', '(≧▽≦)', '(≧◡≦)', '(≧ω≦)', '(≧∇≦)', '(≧▽≦)', '(≧◡≦)', '(≧ω≦)', '(≧∇≦)', '(≧▽≦)')
    'crying-lenny-face.html' = @('(╥﹏╥)', '(ಥ_ಥ)', '(╯︵╰)', '(◞‸◟)', '(╥﹏╥)', '(ಥ﹏ಥ)', '(╯︵╰)', '(◞‸◟)', '(╥﹏╥)', '(ಥ_ಥ)')
    'evil-lenny-face.html' = @('(◣_◢)', '(◤_◥)', '(◣◢)', '(◤◥)', '(◣_◢)', '(◤_◥)', '(◣◢)', '(◤◥)', '(◣_◢)', '(◤_◥)')
    'sunglasses-lenny-face.html' = @('(⌐■_■)', '(⌐□_□)', '(⌐■-■)', '(⌐□-□)', '(⌐■_■)', '(⌐□_□)', '(⌐■-■)', '(⌐□-□)', '(⌐■_■)', '(⌐□_□)')
    'heart-lenny-face.html' = @('(♥‿♥)', '(♡‿♡)', '(♥ω♥)', '(♡ω♡)', '(♥‿♥)', '(♡‿♡)', '(♥ω♥)', '(♡ω♡)', '(♥‿♥)', '(♡‿♡)')
    'kiss-lenny-face.html' = @('(づ￣ ³￣)づ', '(づ｡◕‿‿◕｡)づ', '(づ ◕‿◕ )づ', '(づ｡◕‿‿◕｡)づ', '(づ￣ ³￣)づ', '(づ｡◕‿‿◕｡)づ', '(づ ◕‿◕ )づ', '(づ｡◕‿‿◕｡)づ', '(づ￣ ³￣)づ', '(づ｡◕‿‿◕｡)づ')
    'hug-lenny-face.html' = @('(づ ◕‿◕ )づ', '(⊃｡•́‿•̀｡)⊃', '(づ｡◕‿‿◕｡)づ', '(⊃｡•́‿•̀｡)⊃', '(づ ◕‿◕ )づ', '(⊃｡•́‿•̀｡)⊃', '(づ｡◕‿‿◕｡)づ', '(⊃｡•́‿•̀｡)⊃', '(づ ◕‿◕ )づ', '(⊃｡•́‿•̀｡)⊃')
    'christmas-lenny-face.html' = @('🎄', '🎅', '🤶', '🎁', '🎀', '🔔', '🕯️', '❄️', '⛄', '☃️', '🧦', '🧣', '🍪', '🥛', '🦌', '🛷', '🌟', '🎶', '🏠', '🧸')
}

# Default fallback symbols for any page not in the list above
$defaultSymbols = @('( ͡° ͜ʖ ͡°)', '( ͡~ ͜ʖ ͡°)', '( ͡o ͜ʖ ͡o)', '( ͡ಠ ͜ʖ ͡ಠ)', '( ͡◐ ͜ʖ ͡◐)', '( ͡ಥ ͜ʖ ͡ಥ)', '( ͡°益 ͡°)', '(ง ͠° ͟ل͜ ͡°)ง', '(づ ͡° ͜ʖ ͡°)づ', '(ʘ ͜ʖ ʘ)')

$files = Get-ChildItem -Recurse -File -Filter *-lenny-face.html
$updated = 0

foreach ($f in $files) {
  $filename = $f.Name
  $c = Get-Content -LiteralPath $f.FullName -Raw
  
  # Get symbols for this specific page, or use default
  $symbols = if ($symbolSets.ContainsKey($filename)) { $symbolSets[$filename] } else { $defaultSymbols }
  
  # Find .maindata section and replace/add symbols
  if ($c -match '(<div class="maindata"[^>]*>)(.*?)(</div>)') {
    $before = $matches[1]
    $after = $matches[3]
    
    # Create new symbol HTML
    $symbolHtml = ""
    foreach ($symbol in $symbols) {
      $symbolHtml += "`t`t`t<div class='symbol lennyface' onclick='copyToClipboard(`'$symbol`', event)'>$symbol</div>`r`n"
    }
    
    # Replace the maindata content
    $newContent = $before + "`r`n" + $symbolHtml + "`t`t" + $after
    $c = $c -replace '(<div class="maindata"[^>]*>)(.*?)(</div>)', $newContent
    
    Set-Content -LiteralPath $f.FullName -Value $c -Encoding UTF8
    $updated++
    Write-Host "Updated $filename with unique symbols"
  }
}

Write-Host "Added unique symbols to $updated Lenny Face pages."
