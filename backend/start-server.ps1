# Start Backend Server with MongoDB Atlas
Write-Host "Starting Online Book Store Backend Server..." -ForegroundColor Green
Write-Host "Using MongoDB Atlas..." -ForegroundColor Cyan
Write-Host ""

# Set Node options for MongoDB Atlas compatibility
$env:NODE_OPTIONS='--tls-min-v1.0'

# Change to backend directory
Set-Location $PSScriptRoot

# Start the server
npm start
