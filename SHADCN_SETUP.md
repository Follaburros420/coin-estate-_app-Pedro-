# shadcn/ui - Instalación Completada ✅

## ¿Qué es shadcn/ui?

shadcn/ui es una biblioteca de componentes de React construida sobre Radix UI y Tailwind CSS. Proporciona componentes reutilizables, accesibles y personalizables para aplicaciones web modernas.

## Instalación Completada

La instalación de shadcn/ui se ha completado exitosamente en tu proyecto. Aquí está lo que se configuró:

### Archivos Creados/Modificados:

1. **`components.json`** - Archivo de configuración de shadcn/ui
2. **`src/utils/cn.js`** - Función utilitaria para combinar clases CSS
3. **`src/components/ui/button.jsx`** - Componente Button de ejemplo
4. **`src/components/ShadcnTest.jsx`** - Componente de prueba
5. **`tailwind.config.js`** - Actualizado con variables CSS de shadcn/ui
6. **`src/styles/globals.css`** - Actualizado con variables CSS de shadcn/ui

### Dependencias Instaladas:

- `class-variance-authority` - Para manejar variantes de componentes
- `clsx` - Para combinar clases CSS condicionalmente
- `tailwind-merge` - Para fusionar clases de Tailwind CSS
- `lucide-react` - Iconos SVG
- `@radix-ui/react-slot` - Componente Slot de Radix UI

## Cómo Usar shadcn/ui

### 1. Agregar Nuevos Componentes

Para agregar nuevos componentes de shadcn/ui, usa el CLI:

```bash
npx shadcn@latest add [component-name]
```

Ejemplos:
```bash
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
```

### 2. Usar Componentes Existentes

```jsx
import { Button } from '@/components/ui/button';

function MyComponent() {
  return (
    <div>
      <Button>Botón por defecto</Button>
      <Button variant="secondary">Botón secundario</Button>
      <Button variant="outline">Botón outline</Button>
    </div>
  );
}
```

### 3. Personalizar Componentes

Los componentes se pueden personalizar modificando directamente los archivos en `src/components/ui/`. También puedes usar las variables CSS definidas en `globals.css` para cambiar colores y estilos globalmente.

## Componentes Disponibles

Algunos de los componentes más populares que puedes agregar:

- **Layout**: `card`, `separator`, `sheet`, `tabs`
- **Forms**: `input`, `textarea`, `select`, `checkbox`, `radio-group`
- **Navigation**: `dropdown-menu`, `navigation-menu`, `breadcrumb`
- **Feedback**: `alert`, `toast`, `progress`, `skeleton`
- **Overlay**: `dialog`, `popover`, `tooltip`, `hover-card`
- **Data Display**: `table`, `badge`, `avatar`, `calendar`

## Personalización

### Cambiar Colores

Modifica las variables CSS en `src/styles/globals.css`:

```css
:root {
  --primary: 0 0% 9%;           /* Color primario */
  --secondary: 0 0% 96.1%;      /* Color secundario */
  --accent: 0 0% 96.1%;         /* Color de acento */
  --destructive: 0 84.2% 60.2%; /* Color destructivo */
}
```

### Cambiar Estilo

Modifica el archivo `components.json` para cambiar el estilo base:

```json
{
  "style": "new-york",  // o "default"
  "baseColor": "neutral" // o "gray", "zinc", "stone", "slate"
}
```

## Ejemplo de Uso

Puedes probar la instalación importando el componente de prueba:

```jsx
import ShadcnTest from '@/components/ShadcnTest';

// En tu página o componente
<ShadcnTest />
```

## Notas Importantes

- El proyecto usa React 19 RC, por lo que algunas dependencias se instalaron con `--legacy-peer-deps`
- Los componentes están optimizados para trabajar con Tailwind CSS
- Todos los componentes son completamente personalizables y accesibles
- La configuración es compatible con modo oscuro/claro

## Recursos Adicionales

- [Documentación oficial de shadcn/ui](https://ui.shadcn.com/)
- [Galería de componentes](https://ui.shadcn.com/docs/components)
- [Temas y personalización](https://ui.shadcn.com/docs/theming)

¡Ya puedes empezar a usar shadcn/ui en tu proyecto! 🎉
