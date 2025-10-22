# Script de configuracion para MCP de Vercel (PowerShell)
# Este script ayuda a configurar el MCP de Vercel en tu proyecto

Write-Host "Configurando MCP de Vercel para Coin Estate App..." -ForegroundColor Green

# Verificar si existe el archivo de configuracion MCP
if (-not (Test-Path "mcp-config.json")) {
    Write-Host "No se encontro el archivo mcp-config.json" -ForegroundColor Red
    Write-Host "Por favor, asegurate de que el archivo existe en el directorio raiz del proyecto" -ForegroundColor Yellow
    exit 1
}

Write-Host "Archivo de configuracion MCP encontrado" -ForegroundColor Green

# Verificar variables de entorno
Write-Host "Verificando variables de entorno..." -ForegroundColor Cyan

if (-not $env:VERCEL_API_KEY) {
    Write-Host "VERCEL_API_KEY no esta configurada" -ForegroundColor Yellow
    Write-Host "Por favor, configura tu API key de Vercel:" -ForegroundColor White
    Write-Host "`$env:VERCEL_API_KEY='tu-api-key-aqui'" -ForegroundColor Gray
    Write-Host ""
    Write-Host "O anadela a tu archivo .env.local:" -ForegroundColor White
    Write-Host "VERCEL_API_KEY=tu-api-key-aqui" -ForegroundColor Gray
} else {
    Write-Host "VERCEL_API_KEY esta configurada" -ForegroundColor Green
}

Write-Host ""
Write-Host "Pasos siguientes:" -ForegroundColor Cyan
Write-Host "1. Configura tu VERCEL_API_KEY si no lo has hecho" -ForegroundColor White
Write-Host "2. Asegurate de que tu cliente MCP este configurado para usar mcp-config.json" -ForegroundColor White
Write-Host "3. Reinicia tu cliente MCP para aplicar los cambios" -ForegroundColor White
Write-Host ""
Write-Host "URL del servidor MCP: https://mcp.open-mcp.org/api/server/vercel@latest/mcp" -ForegroundColor Blue
Write-Host ""
Write-Host "Configuracion completada!" -ForegroundColor Green