# AquaChile - Plataforma Integrada de Selección y Evaluación Psicolaboral

MVP desarrollado para la asignatura **DSY1104 - Desarrollo Full Stack II** en respuesta a la problemática real planteada por **AquaChile** (Vinculación con el Medio - VcM).

## Integrantes del Equipo
- **Paz**

---

## 📌 Contexto del Proyecto y Solución VcM
AquaChile requiere optimizar y hacer trazable el proceso de selección y evaluación psicolaboral de candidatos para sus distintas áreas operativas y administrativas. 

Este MVP resuelve la problemática mediante:
1. **Registro y postulación:** Formulario interactivo con carga de antecedentes (CV) y selección de familias de cargo.
2. **Gestión centralizada:** Panel de administración (Dashboard) para seguimiento de candidatos, asignación de psicólogos evaluadores y cambio de estados en tiempo real.
3. **Filtros y búsquedas:** Visualización dinámica mediante indicadores clave y tablas con renderizado condicional.
4. **Calidad y pruebas:** Cobertura de pruebas unitarias automatizadas con Vitest para validar los componentes más críticos.

---

## 🚀 Tecnologías Utilizadas

- **Core & Framework:** React (Vite)
- **Rutamiento:** React Router DOM v6
- **Estilos & UI:** Tailwind CSS (clases utilitarias integradas en componentes `.jsx` para asegurar modularidad, aislamiento de scope y portabilidad)
- **Pruebas Automatizadas:** Vitest + React Testing Library + `@testing-library/jest-dom`
- **Iconografía & Fuentes:** Material Symbols / Tailwind Icons
- **Persistencia Temporal:** `localStorage` (sincronización simulada para el MVP de avance frontend)

---

## 🛠️ Instalación y Ejecución Local

Sigue estos pasos para clonar e iniciar el proyecto en tu máquina local:

```bash
# 1. Clonar el repositorio
git clone <URL_DE_TU_REPOSITTORIO_GITHUB>

# 2. Entrar a la carpeta del proyecto
cd automatizacion-psicolaboral

# 3. Instalar las dependencias
npm install

# 4. Iniciar el servidor de desarrollo
npm run dev