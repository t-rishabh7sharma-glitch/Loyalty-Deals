# Portable Node lives under .tools (no system-wide Node/npm required).
# The "&" in this folder name breaks npm.cmd; we invoke Vite via node.exe directly.
$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$nodeBin = Join-Path $root ".tools\node-v22.14.0-win-x64"
$node = Join-Path $nodeBin "node.exe"
$vite = Join-Path $root "node_modules\vite\bin\vite.js"

if (-not (Test-Path $node)) {
  Write-Error "Portable Node not found at $nodeBin. Extract node-v22.x-win-x64.zip into .tools\"
}
if (-not (Test-Path $vite)) {
  Write-Error "Dependencies missing. Prepend $nodeBin to PATH, then run: npm install"
}

$env:Path = "$nodeBin;$env:Path"
Set-Location -LiteralPath $root
& $node $vite --host 127.0.0.1 --port 5173 @args
