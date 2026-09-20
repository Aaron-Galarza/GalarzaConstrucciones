# Genera la imagen social por defecto (public/og-default.png) usada en
# og:image / twitter:image cuando una página no define imagen propia.
# Es un utilitario puntual: se ejecuta con PowerShell (System.Drawing de .NET).
# Uso: powershell -ExecutionPolicy Bypass -File scripts/generate-og.ps1

Add-Type -AssemblyName System.Drawing

$w = 1200
$h = 630
$bmp = New-Object System.Drawing.Bitmap($w, $h)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

# Fondo navy
$bg = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(10, 30, 44))
$g.FillRectangle($bg, 0, 0, $w, $h)

# Regilla técnica muy sutil
$line = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(28, 255, 255, 255), 1)
for ($x = 0; $x -lt $w; $x += 44) { $g.DrawLine($line, $x, 0, $x, $h) }
for ($y = 0; $y -lt $h; $y += 44) { $g.DrawLine($line, 0, $y, $w, $y) }

$cyan = [System.Drawing.Color]::FromArgb(18, 163, 184)
$white = [System.Drawing.Color]::FromArgb(255, 255, 255)

function Draw-BrandMark($g, $x, $y, $size) {
  $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(13, 43, 63))
  $g.FillRectangle($brush, $x, $y, $size, $size)
  $markFont = New-Object System.Drawing.Font("Arial", [int]($size * 0.62), [System.Drawing.FontStyle]::Bold)
  $stringFormat = New-Object System.Drawing.StringFormat
  $stringFormat.Alignment = [System.Drawing.StringAlignment]::Center
  $stringFormat.LineAlignment = [System.Drawing.StringAlignment]::Center
  $whiteBrush = New-Object System.Drawing.SolidBrush($white)
  $rect = New-Object System.Drawing.RectangleF($x, $y, $size, $size)
  $g.DrawString("G", $markFont, $whiteBrush, $rect, $stringFormat)
  $studBrush = New-Object System.Drawing.SolidBrush($cyan)
  $g.FillRectangle($studBrush, ($x + $size - $size * 0.16), $y, ($size * 0.16), ($size * 0.16))
}

Draw-BrandMark $g 70 70 96

# Texto principal
$titleFont = New-Object System.Drawing.Font("Arial", 64, [System.Drawing.FontStyle]::Bold)
$titleBrush = New-Object System.Drawing.SolidBrush($white)
$g.DrawString("GALARZA CONSTRUCCIÓN", $titleFont, $titleBrush, 200, 200)

$tagFont = New-Object System.Drawing.Font("Arial", 28, [System.Drawing.FontStyle]::Regular)
$cyanBrush = New-Object System.Drawing.SolidBrush($cyan)
$g.DrawString("Ingeniería para resolver. Construcción para perdurar.", $tagFont, $cyanBrush, 204, 320)

$subFont = New-Object System.Drawing.Font("Arial", 22, [System.Drawing.FontStyle]::Regular)
$greyBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(159, 180, 191))
$g.DrawString("Resistencia · Chaco · Argentina", $subFont, $greyBrush, 204, 430)
$g.DrawString("Obras · Remodelaciones · Soluciones estructurales", $subFont, $greyBrush, 204, 466)

$outDir = Join-Path $PSScriptRoot "..\public"
$outPath = Join-Path $outDir "og-default.png"
$bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose()
$bmp.Dispose()
Write-Host "OK: $outPath"