# Configuración MCP para Coin Estate App

Este documento explica cómo configurar y usar el Model Context Protocol (MCP) de Vercel y shadcn en tu proyecto Coin Estate.

## ¿Qué es MCP?

El Model Context Protocol (MCP) es un estándar que permite que los modelos de IA accedan a herramientas y datos externos de manera segura y controlada. 

En este proyecto tenemos configurados dos servidores MCP:
- **MCP de Vercel**: Te permite interactuar con tu cuenta de Vercel directamente desde tu aplicación
- **MCP de shadcn**: Te permite navegar, buscar e instalar componentes de shadcn/ui usando lenguaje natural

## Archivos de Configuración

### 1. mcp-config.json
Archivo principal de configuración MCP que define las conexiones a los servidores MCP:

```json
{
  "mcpServers": {
    "vercel": {
      "transport": "streamableHttp",
      "url": "https://mcp.open-mcp.org/api/server/vercel@latest/mcp",
      "env": {
        "API_KEY": "${VERCEL_API_KEY}"
      }
    },
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}
```

### 2. .cursor/mcp.json
Archivo específico de configuración MCP para Cursor:

```json
{
  "mcpServers": {
    "vercel": {
      "transport": "streamableHttp",
      "url": "https://mcp.open-mcp.org/api/server/vercel@latest/mcp",
      "env": {
        "API_KEY": "${VERCEL_API_KEY}"
      }
    },
    "shadcn": {
      "command": "npx",
      "args": ["shadcn@latest", "mcp"]
    }
  }
}
```

### 3. Variables de Entorno

Asegúrate de configurar la siguiente variable de entorno:

```bash
VERCEL_API_KEY=tu-api-key-de-vercel
```

## Configuración Paso a Paso

### Paso 1: Obtener tu API Key de Vercel

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Navega a Settings > Tokens
3. Crea un nuevo token con los permisos necesarios
4. Copia el token generado

### Paso 2: Configurar la Variable de Entorno

#### Opción A: Archivo .env.local (Recomendado para desarrollo)
```bash
VERCEL_API_KEY=tu-api-key-aqui
```

#### Opción B: Variables de Entorno del Sistema
```bash
# Windows PowerShell
$env:VERCEL_API_KEY="tu-api-key-aqui"

# Windows CMD
set VERCEL_API_KEY=tu-api-key-aqui

# Linux/macOS
export VERCEL_API_KEY="tu-api-key-aqui"
```

### Paso 3: Configurar en Vercel (Para producción)

1. Ve a tu proyecto en Vercel Dashboard
2. Navega a Settings > Environment Variables
3. Añade la variable `VERCEL_API_KEY` con tu API key

## Scripts de Configuración

### Windows (PowerShell)
```powershell
.\setup-mcp.ps1
```

### Linux/macOS (Bash)
```bash
./setup-mcp.sh
```

## Verificación de la Configuración

Para verificar que todo está configurado correctamente:

1. Ejecuta el script de configuración correspondiente a tu sistema operativo
2. Verifica que la variable `VERCEL_API_KEY` esté configurada
3. Asegúrate de que tu cliente MCP esté configurado para usar `mcp-config.json`

## Funcionalidades Disponibles

### MCP de Vercel
Con el MCP de Vercel configurado, podrás:

- Obtener información de tus proyectos de Vercel
- Ver el estado de tus deployments
- Acceder a logs y métricas
- Gestionar configuraciones de proyecto
- Y más funcionalidades de la API de Vercel

### MCP de shadcn
Con el MCP de shadcn configurado, podrás:

- **Navegar Componentes**: Listar todos los componentes disponibles en el registro de shadcn/ui
- **Buscar Componentes**: Encontrar componentes específicos por nombre o funcionalidad
- **Instalar con Lenguaje Natural**: Agregar componentes usando prompts conversacionales como "agregar un formulario de login"
- **Soporte para Múltiples Registros**: Acceder a registros públicos, bibliotecas privadas de empresas y fuentes de terceros

#### Ejemplos de Prompts para shadcn MCP:
- "Muéstrame todos los componentes disponibles en el registro de shadcn"
- "Encuéntrame un formulario de login del registro de shadcn"
- "Agrega el componente button a mi proyecto"
- "Crea un formulario de contacto usando componentes de shadcn"
- "Instala los componentes button, dialog y card en mi proyecto"

## Solución de Problemas

### Error: "API_KEY not found"
- Verifica que `VERCEL_API_KEY` esté configurada correctamente
- Asegúrate de que el token tenga los permisos necesarios

### Error: "Connection failed"
- Verifica tu conexión a internet
- Confirma que la URL del servidor MCP sea correcta

### Error: "Unauthorized"
- Verifica que tu API key de Vercel sea válida
- Asegúrate de que el token no haya expirado

### Problemas con shadcn MCP

#### Error: "No tools or prompts"
Si ves el mensaje "No tools or prompts", intenta lo siguiente:
1. **Limpiar la caché de npx**: Ejecuta `npx clear-npx-cache`
2. **Re-habilitar el servidor MCP**: Intenta re-habilitar el servidor MCP en tu cliente
3. **Verificar logs**: En Cursor, puedes ver los logs en View -> Output y seleccionar `MCP: project-*` en el dropdown

#### Error: "Component installation failed"
Si los componentes fallan al instalarse:
1. **Verificar configuración del proyecto**: Asegúrate de tener un archivo `components.json` válido
2. **Verificar rutas**: Confirma que los directorios objetivo existen
3. **Verificar permisos**: Asegúrate de tener permisos de escritura para los directorios de componentes
4. **Revisar dependencias**: Verifica que las dependencias requeridas estén instaladas

#### Error: "Registry access issues"
Si los componentes no se cargan desde los registros:
1. **Verificar components.json**: Confirma que las URLs del registro sean correctas
2. **Probar autenticación**: Asegúrate de que las variables de entorno estén configuradas para registros privados
3. **Verificar registro**: Confirma que el registro esté en línea y sea accesible
4. **Verificar namespace**: Asegúrate de que la sintaxis del namespace sea correcta (`@namespace/component`)

## Recursos Adicionales

- [Documentación oficial de MCP](https://modelcontextprotocol.io/)
- [Servidor MCP de Vercel](https://www.open-mcp.org/servers/vercel)
- [API de Vercel](https://vercel.com/docs/api)
- [shadcn/ui MCP Server](https://ui.shadcn.com/docs/mcp)
- [Documentación de shadcn/ui](https://ui.shadcn.com/)
- [Cursor MCP Documentation](https://docs.cursor.com/en/context/mcp)

## Soporte

Si tienes problemas con la configuración, revisa:
1. Los logs de tu cliente MCP
2. La documentación de OpenMCP
3. Los issues en el repositorio del servidor MCP de Vercel

