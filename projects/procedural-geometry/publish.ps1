$imageName = "arcadepro-io:procedural-engine"
Set-Location -Path $PSScriptRoot

# Stop existing running containers
$containerId = (. docker container ls -q)
Write-Host "Stopping container with Id: $containerId"
. docker container stop $containerId

# Build Project
. npm run build

# Build Docker Image
. docker build -t $imageName .

# Run Docker Image
. docker run -p 8080:80 $imageName