@echo off
cd /d "E:\Dev\Website"

set GIT="C:\Program Files\Git\bin\git.exe"
set GH="C:\Program Files\GitHub CLI\gh.exe"

echo === Redside website - push to GitHub ===
echo.

if not exist %GIT% (
  echo Git not found. Install Git from https://git-scm.com
  pause
  exit /b 1
)

if not exist %GH% (
  echo GitHub CLI not found. Install from https://cli.github.com
  pause
  exit /b 1
)

if not exist .git (
  echo Initializing git...
  %GIT% init
)

REM Identity for this repo only (safe if global config is not set)
%GIT% config user.name "Casey205"
%GIT% config user.email "casey@redsidemapping.com"

%GIT% add -A
%GIT% status

%GIT% rev-parse HEAD >nul 2>&1
if errorlevel 1 (
  echo.
  echo Creating first commit...
  %GIT% commit -m "Initial Redside Surveying and Mapping website"
  if errorlevel 1 (
    echo.
    echo COMMIT FAILED. Check the error above.
    pause
    exit /b 1
  )
) else (
  %GIT% diff --cached --quiet
  if errorlevel 1 (
    %GIT% commit -m "Update Redside website"
  )
)

echo.
echo Checking GitHub login...
%GH% auth status
if errorlevel 1 (
  echo Log in to GitHub in the browser when prompted...
  %GH% auth login
)

%GIT% remote get-url origin >nul 2>&1
if errorlevel 1 (
  echo Creating private repo redside-website...
  %GH% repo create redside-website --private --source=. --remote=origin --push
  if errorlevel 1 (
    echo Trying redside-surveying...
    %GH% repo create redside-surveying --private --source=. --remote=origin --push
  )
) else (
  echo Pushing to GitHub...
  %GIT% push -u origin HEAD
)

echo.
echo Done. Check: https://github.com/Casey205/redside-website
echo.
pause
