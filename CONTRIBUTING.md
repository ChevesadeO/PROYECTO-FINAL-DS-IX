# 📝 Guía de Contribución

## Bienvenido al Proyecto

¡Gracias por tu interés en contribuir a **PROYECTO-FINAL-DS-IX**! Este documento te guiará a través del proceso.

## Requisitos Previos

- Git configurado localmente
- Clave GPG o SSH configurada para firmar commits
- Conocimiento básico de Git y GitHub

## Proceso de Contribución

### 1. Fork y Clone

```bash
# Clonar tu fork
git clone https://github.com/TU-USUARIO/PROYECTO-FINAL-DS-IX.git
cd PROYECTO-FINAL-DS-IX

# Agregar upstream
git remote add upstream https://github.com/ChevesadeO/PROYECTO-FINAL-DS-IX.git
```

### 2. Crear una Rama

```bash
# Actualizar main
git fetch upstream
git checkout main
git merge upstream/main

# Crear rama de feature
git checkout -b feature/nombre-descriptivo
```

### 3. Hacer Cambios

- Escribe código limpio y legible
- Sigue las convenciones del proyecto
- Haz commits pequeños y significativos

### 4. Commits Firmados

```bash
# Firma tus commits
git commit -S -m "tipo: descripción

Descripción más detallada si es necesario.
Cierra #123 (si está relacionado con una issue)
"
```

**Tipos de commit recomendados:**
- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Formato, sin cambios lógicos
- `refactor:` Refactorización sin cambios funcionales
- `test:` Agregar o actualizar tests
- `chore:` Cambios de configuración

### 5. Push a tu Fork

```bash
git push origin feature/nombre-descriptivo
```

### 6. Pull Request

1. Ve a GitHub y crea un Pull Request
2. Completa la plantilla de PR
3. Asegúrate que:
   - ✅ Tu rama está actualizada con `main`
   - ✅ Los commits están firmados
   - ✅ Las comprobaciones pasan
   - ✅ La descripción es clara

### 7. Revisión y Merge

- Al menos 1 revisión será requerida
- Los revisores pueden sugerir cambios
- Una vez aprobado, el PR será mergeado

## Reglas de la Rama Principal

- ❌ No se permiten pushes directos a `main`
- ✅ Solo se permiten merges mediante Pull Requests
- ✅ Todos los commits deben estar firmados
- ✅ Se requiere al menos 1 aprobación

## Código de Conducta

- Sé respetuoso y profesional
- Acepta crítica constructiva
- Reporta problemas de manera constructiva

## Preguntas o Dudas

- Abre una Issue para discusiones
- Usa las Discussions para preguntas generales

---

**Gracias por contribuir!** 🙌
