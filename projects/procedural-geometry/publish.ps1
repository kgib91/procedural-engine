$imageName = "arcadepro-io/procedural-geometry"
Set-Location -Path $PSScriptRoot

# Stop existing running containers
$containerIds = (. docker container ls -q  --filter "ancestor=$imageName")
Write-Host "Stopping containers with Ids:"
. docker container stop $containerIds

# Build Project
. npm run build

# Build Docker Image
. docker build -t $imageName .

# Run Docker Image
. docker run -p 8080:80 $imageName