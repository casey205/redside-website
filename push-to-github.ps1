# Push Redside website to GitHub (Casey205)
# Run from PowerShell in E:\Dev\Website:
#   Set-ExecutionPolicy -Scope Process Bypass -Force; .\push-to-github.ps1

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

$git = "C:\Program Files\Git\bin\git.exe"
$gh  = "C:\Program Files\GitHub CLI\gh.exe"

if (-not (Test-Path $git)) { throw "Git not found at $git" }
if (-not (Test-Path $gh))  { throw "GitHub CLI not found at $gh" }

Write-Host "=== Redside website -> GitHub ===" -ForegroundColor Cyan

# Init repo if needed
if (-not (Test-Path ".git")) {
    Write-Host "Initializing git repo..."
    & $git init
}

# Check identity (needed for commit)
$name  = & $git config user.name 2>$null
$email = & $git config user.email 2>$null
if (-not $name -or -not $email) {
    Write-Host ""
    Write-Host "Git needs your name and email before the first commit." -ForegroundColor Yellow
    Write-Host "Run these once (use your real email):" -ForegroundColor Yellow
    Write-Host '  git config --global user.name "Casey205"'
    Write-Host '  git config --global user.email "casey@redsidemapping.com"'
    Write-Host ""
    Write-Host "Or set only for this repo (no --global)." -ForegroundColor Yellow
    exit 1
}

& $git add -A
& $git status

$hasHead = $true
& $git rev-parse HEAD 2>$null | Out-Null
if ($LASTEXITCODE -ne 0) { $hasHead = $false }

if (-not $hasHead) {
    Write-Host "Creating initial commit..."
    & $git commit -m "Initial Redside Surveying & Mapping website"
} else {
    $status = & $git status --porcelain
    if ($status) {
        Write-Host "Committing changes..."
        & $git commit -m "Update Redside website"
    } else {
        Write-Host "No file changes to commit."
    }
}

Write-Host "Checking GitHub login..."
& $gh auth status
if ($LASTEXITCODE -ne 0) {
    Write-Host "Log in to GitHub (browser will open):"
    & $gh auth login
}

$repoName = "redside-website"
$remoteUrl = "https://github.com/Casey205/$repoName.git"

$remoteExists = & $git remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Creating private repo: Casey205/$repoName ..."
    & $gh repo create $repoName --private --source=. --remote=origin --push
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Trying alternate name: redside-surveying" -ForegroundColor Yellow
        $repoName = "redside-surveying"
        & $gh repo create $repoName --private --source=. --remote=origin --push
    }
} else {
    Write-Host "Remote origin already set: $remoteExists"
    Write-Host "Pushing..."
    & $git push -u origin HEAD
}

Write-Host ""
Write-Host "Done. Repo should be at:" -ForegroundColor Green
Write-Host "  https://github.com/Casey205/$repoName" -ForegroundColor Green
