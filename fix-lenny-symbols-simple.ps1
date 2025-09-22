# Simple approach: Replace content after <h1 class="titlesymbol"> in each Lenny page
# with unique themed symbols

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
  
  # Find the first existing symbol div and replace everything after the h1 until </div>
  if ($c -match '(<h1 class="titlesymbol"[^>]*>.*?</h1>)(.*?)(\s*</div>)') {
    $titlePart = $matches[1]
    $closingDiv = $matches[3]
    
    # Create new symbol HTML
    $symbolHtml = "`r`n"
    foreach ($symbol in $symbols) {
      $symbolHtml += "`t`t`t<div class='symbol lennyface' onclick='copyToClipboard(`'$symbol`', event)'>$symbol</div>`r`n"
    }
    
    # Replace the content between h1 and </div>
    $newContent = $titlePart + $symbolHtml + $closingDiv
    $c = [regex]::Replace($c, '(<h1 class="titlesymbol"[^>]*>.*?</h1>)(.*?)(\s*</div>)', $newContent, 1, [System.Text.RegularExpressions.RegexOptions]::Singleline)
    
    Set-Content -LiteralPath $f.FullName -Value $c -Encoding UTF8
    $updated++
    Write-Host "Updated $filename with unique symbols"
  }
}

Write-Host "Added unique symbols to $updated Lenny Face pages."
