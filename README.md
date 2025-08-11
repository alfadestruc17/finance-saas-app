# Finance App

Una aplicación web moderna de gestión financiera construida con Next.js 15, React 19, y Tailwind CSS 4.

## ✨ Características

- **Marco de trabajo moderno**: Next.js 15 con App Router
- **UI/UX de calidad**: Componentes basados en shadcn/ui con diseño consistente
- **Estilizado avanzado**: Tailwind CSS 4 con soporte para temas claro/oscuro
- **Tipado fuerte**: TypeScript para mejor experiencia de desarrollo
- **Componentes reutilizables**: Sistema de componentes modulares con Radix UI
- **Rendimiento optimizado**: Desarrollo con Turbopack para compilación rápida

## 🛠️ Stack Tecnológico

- **Frontend**: Next.js 15, React 19, TypeScript
- **Estilizado**: Tailwind CSS 4, tw-animate-css
- **Componentes**: shadcn/ui, Radix UI, Lucide React (iconos)
- **Calidad de código**: ESLint con configuración de Next.js
- **Herramientas**: class-variance-authority, clsx, tailwind-merge

## 🚀 Comenzando

### Prerrequisitos

- Node.js 18.17 o superior
- npm, yarn, pnpm, o bun

### Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd finance
```

2. Instala las dependencias:
```bash
npm install
# o
yarn install
# o
pnpm install
# o
bun install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
finance/
├── app/                    # App Router de Next.js
│   ├── globals.css        # Estilos globales con variables CSS
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página de inicio
├── components/            # Componentes reutilizables
│   └── ui/               # Componentes UI de shadcn/ui
│       └── button.tsx    # Componente Button
├── lib/                  # Utilidades y configuraciones
│   └── utils.ts          # Funciones utilitarias
├── public/               # Archivos estáticos
└── components.json       # Configuración de shadcn/ui
```

## 🎨 Sistema de Diseño

La aplicación utiliza un sistema de diseño moderno con:

- **Temas**: Soporte completo para modo claro y oscuro
- **Colores**: Paleta de colores consistente usando OKLCH
- **Tipografía**: Fuentes Geist Sans y Geist Mono optimizadas
- **Componentes**: Sistema de componentes escalable con variants

### Variables de Color

El proyecto usa un sistema de variables CSS personalizado que soporta:
- Colores primarios, secundarios y de acento
- Colores semánticos (destructive, muted, etc.)
- Colores específicos para gráficos y sidebar
- Transición automática entre temas claro/oscuro

## 🧩 Componentes

Los componentes están construidos usando:
- **Radix UI**: Para funcionalidad accesible
- **class-variance-authority**: Para variants de componentes
- **Tailwind CSS**: Para estilizado utilitario

Ejemplo de uso del componente Button:
```tsx
import { Button } from "@/components/ui/button"

export function Example() {
  return (
    <div>
      <Button variant="default">Botón Primario</Button>
      <Button variant="outline">Botón Secundario</Button>
      <Button variant="destructive">Botón de Eliminación</Button>
    </div>
  )
}
```

## 📦 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo con Turbopack
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter de ESLint

## ⚙️ Configuración

### Tailwind CSS 4

El proyecto utiliza la nueva versión de Tailwind CSS con:
- Configuración a través de CSS (`@theme inline`)
- PostCSS plugin para procesamiento
- Variables CSS personalizadas para temas

### shadcn/ui

Configurado con:
- Estilo "new-york"
- React Server Components habilitado
- Alias de rutas para imports limpios
- Iconos de Lucide React

## 🚀 Despliegue

### Vercel (Recomendado)

La forma más fácil de desplegar es usar la [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js):

1. Conecta tu repositorio
2. Vercel detectará automáticamente la configuración
3. ¡Tu aplicación estará disponible!

### Otros Proveedores

La aplicación puede desplegarse en cualquier proveedor que soporte Node.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📚 Recursos de Aprendizaje

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Radix UI Primitives](https://www.radix-ui.com/primitives)

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🆘 Soporte

Si encuentras algún problema o tienes preguntas:
- Crea un [issue](../../issues) en GitHub
- Revisa la [documentación de Next.js](https://nextjs.org/docs)
- Consulta la [documentación de shadcn/ui](https://ui.shadcn.com)

---

Construido con ❤️ usando Next.js y Tailwind CSS