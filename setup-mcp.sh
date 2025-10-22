#!/bin/bash

# Script de configuración para MCP de Vercel
# Este script ayuda a configurar el MCP de Vercel en tu proyecto

echo "🚀 Configurando MCP de Vercel para Coin Estate App..."

# Verificar si existe el archivo de configuración MCP
if [ ! -f "mcp-config.json" ]; then
    echo "❌ No se encontró el archivo mcp-config.json"
    echo "Por favor, asegúrate de que el archivo existe en el directorio raíz del proyecto"
    exit 1
fi

echo "✅ Archivo de configuración MCP encontrado"

# Verificar variables de entorno
echo "🔍 Verificando variables de entorno..."

if [ -z "$VERCEL_API_KEY" ]; then
    echo "⚠️  VERCEL_API_KEY no está configurada"
    echo "Por favor, configura tu API key de Vercel:"
    echo "export VERCEL_API_KEY='tu-api-key-aqui'"
    echo ""
    echo "O añádela a tu archivo .env.local:"
    echo "VERCEL_API_KEY=tu-api-key-aqui"
else
    echo "✅ VERCEL_API_KEY está configurada"
fi

echo ""
echo "📋 Pasos siguientes:"
echo "1. Configura tu VERCEL_API_KEY si no lo has hecho"
echo "2. Asegúrate de que tu cliente MCP esté configurado para usar mcp-config.json"
echo "3. Reinicia tu cliente MCP para aplicar los cambios"
echo ""
echo "🔗 URL del servidor MCP: https://mcp.open-mcp.org/api/server/vercel@latest/mcp"
echo ""
echo "✨ ¡Configuración completada!"


