# Quiniela Mundial 2026 — SSP Capital

## Deploy en Vercel (5 minutos)

### Paso 1 — Sube el código a GitHub
1. Ve a https://github.com/new
2. Crea un repositorio llamado `quiniela-mundial-2026`
3. En tu computadora, abre una terminal en la carpeta `quiniela-mundial` y corre:
```
git init
git add .
git commit -m "quiniela mundial 2026"
git remote add origin https://github.com/TU_USUARIO/quiniela-mundial-2026.git
git push -u origin main
```

### Paso 2 — Deploy en Vercel
1. Ve a https://vercel.com y crea cuenta gratis con tu GitHub
2. Click "Add New Project"
3. Selecciona el repo `quiniela-mundial-2026`
4. Click "Deploy" (sin cambiar nada)
5. En 2 minutos tendrás tu link: `quiniela-mundial-2026.vercel.app`

### Paso 3 — Comparte el link en WhatsApp
Copia el link y mándalo al grupo. ¡Listo!

## Panel Admin
- Botón "Panel admin" en la pantalla principal
- PIN: **1234** (cámbialo en page.js línea: `const ADMIN_PIN = '1234'`)
- Desde el admin puedes declarar el campeón oficial

## Reglas
- Cada director elige UN equipo campeón
- $100 USD por persona
- Si gana el equipo elegido → gana el pozo
- Si dos o más eligen al campeón → se reparte
- Si nadie acierta → pozo congelado
- Cierre: 28 de junio de 2026
