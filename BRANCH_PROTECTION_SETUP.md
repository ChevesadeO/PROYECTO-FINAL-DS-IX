# 🔧 Instrucciones de Configuración de Protección de Rama

## Para el Propietario del Repositorio

Este archivo contiene instrucciones para completar la configuración de seguridad de la rama `main`.

### Paso 1: Ir a Configuración de Rama

1. Ve a tu repositorio: `https://github.com/ChevesadeO/PROYECTO-FINAL-DS-IX`
2. Click en **Settings** (Configuración)
3. En el menú lateral, selecciona **Branches** (Ramas)
4. Bajo "Branch protection rules", click en **Add rule** (Agregar regla)

### Paso 2: Configurar la Regla de Protección

**Pattern name (Nombre de patrón):**
```
main
```

### Paso 3: Habilitar Protecciones

Marca las siguientes opciones:

#### ✅ Require a pull request before merging
- Requiere revisiones de pull request antes de mergear
- ☑ Require approvals (Requerir aprobaciones)
  - Number of required reviewers: **1**
  - ☑ Dismiss stale pull request approvals when new commits are pushed
    (Descartar aprobaciones pendientes cuando se hacen nuevos commits)
  - ☑ Require review from Code Owners (Opcional)

#### ✅ Require status checks to pass before merging
- Los checks de GitHub Actions deben pasar
- ☑ Require branches to be up to date before merging
  (Requerir que las ramas estén actualizadas)

#### ✅ Require code to be up-to-date before merging
- Ya está cubierto en el punto anterior

#### ✅ Require a conversation resolution before merging (Opcional)
- Ayuda a resolver todas las conversaciones antes de mergear

#### ✅ Require signed commits
- Todos los commits deben estar criptográficamente firmados
- ☑ This branch requires that all commits be signed

#### ✅ Require branches to be up to date before merging
- ☑ Require branches to be up to date before merging

#### ✅ Include administrators
- ☑ Include administrators (Incluir administradores)
- Esto asegura que incluso los admins sigan las reglas

#### ✅ Restrict who can push to matching branches
- Opcional: Limitar quien puede hacer push
- Recomendado: Dejar en blanco (solo CODEOWNERS pueden si lo deseas)

### Paso 4: Guardar

Click en **Create** o **Save changes** para aplicar las reglas.

---

## Resumen de Mejoras Implementadas

| Mejora | Estado | Detalles |
|--------|--------|----------|
| Licencia MIT | ✅ Completado | Archivo `LICENSE` creado |
| Documentación de Seguridad | ✅ Completado | Archivo `SEGURIDAD.md` creado |
| Guía de Contribución | ✅ Completado | Archivo `CONTRIBUTING.md` creado |
| Protección de Rama `main` | ⏳ Pendiente | Seguir pasos 1-4 de este archivo |

---

## Verificación Final

Una vez completada la configuración en GitHub:

1. **Prueba que la rama está protegida:**
   ```bash
   # Esto debería fallar
   git push origin main
   ```

2. **Verifica que los PRs funcionan correctamente:**
   - Crea una rama: `git checkout -b test/verificacion`
   - Haz un cambio y un commit firmado
   - Haz push: `git push origin test/verificacion`
   - Crea un PR en GitHub
   - Verifica que requiere revisión para mergear

3. **Prueba la firma de commits:**
   - Los commits sin firma no deberían ser permitidos en `main`

---

**¿Necesitas ayuda?** Consulta los archivos:
- 📖 [SEGURIDAD.md](SEGURIDAD.md) - Información sobre configuración de seguridad
- 📝 [CONTRIBUTING.md](CONTRIBUTING.md) - Guía para contribuyentes

---

*Última actualización: 2026-05-27*
