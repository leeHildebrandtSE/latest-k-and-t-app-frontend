# Fix Imports Script
# This script removes version numbers from import statements

$files = Get-ChildItem -Path . -Recurse -Filter "*.tsx" -File
$files += Get-ChildItem -Path . -Recurse -Filter "*.ts" -File

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    # Remove version numbers from imports
    $content = $content -replace '@(\d+\.\d+\.\d+)"', '"'
    $content = $content -replace '@(\d+\.\d+\.\d+);', ';'
    
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Fixed: $($file.Name)"
    }
}

Write-Host "Import fixing complete!"
