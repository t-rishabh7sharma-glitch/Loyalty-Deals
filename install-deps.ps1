$ErrorActionPreference = "Stop"
$root = $PSScriptRoot
$nodeBin = Join-Path $root ".tools\node-v22.14.0-win-x64"
$npm = Join-Path $nodeBin "npm.cmd"

if (-not (Test-Path $npm)) {
  Write-Error "Portable Node not found at $nodeBin. Download node-v22.x-win-x64.zip from https://nodejs.org and extract to .tools\node-v22.14.0-win-x64"
}

$env:Path = "$nodeBin;$env:Path"
Set-Location -LiteralPath $root
& $npm install
