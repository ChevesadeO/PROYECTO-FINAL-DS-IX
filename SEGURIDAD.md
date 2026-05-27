# 🔒 Configuración de Seguridad

## Protección de Rama Principal

Esta documentación describe las configuraciones de seguridad implementadas para el repositorio.

### Configuraciones Activadas en Rama `main`

✅ **Protección de Rama Activada**

Las siguientes reglas están habilitadas:

1. **Requiere revisión de código**
   - Número de aprobaciones requeridas: 1
   - Descartar aprobaciones pendientes: Sí
   - Las aprobaciones se descartan cuando se hacen nuevos cambios

2. **Requiere que pasen todas las comprobaciones**
   - Los status checks deben estar en verde antes de mergear
   - Se descartan confirmaciones antiguas

3. **Bloquea pushes directos a `main`**
   - Solo se permiten merges a través de Pull Requests
   - Los administradores tampoco pueden hacer push directo

4. **Requiere commits firmados**
   - Todos los commits deben estar cryptográficamente firmados
   - Protege la integridad de la historia del repositorio

### Instrucciones para Firmar Commits

#### Con GPG:

```bash
# Generar clave GPG
gpg --gen-key

# Configurar Git para firmar commits
git config --global user.signingkey <tu-key-id>

# Firmar commits automáticamente
git config --global commit.gpgsign true

# Hacer commit (será firmado automáticamente)
git commit -m "mensaje"
```

#### Con SSH:

```bash
# Configurar Git para usar firma SSH
git config --global gpg.format ssh
git config --global user.signingkey ~/.ssh/id_ed25519.pub

# Firmar commits
git commit -S -m "mensaje"
```

### Flujo de Trabajo Recomendado

1. **Crear una rama** desde `main`:
   ```bash
   git checkout -b feature/mi-feature
   ```

2. **Hacer commits firmados**:
   ```bash
   git commit -S -m "feat: descripción del cambio"
   ```

3. **Hacer push** de tu rama:
   ```bash
   git push origin feature/mi-feature
   ```

4. **Crear Pull Request** en GitHub

5. **Solicitar revisión** a un colaborador

6. **Merge** después de aprobación

### Mejoras Implementadas

| Aspecto | Estado | Descripción |
|--------|--------|-------------|
| Licencia MIT | ✅ Agregada | Licencia de código abierto |
| Protección `main` | ✅ Habilitada | Rama principal protegida |
| Revisión de código | ✅ Requerida | Mínimo 1 aprobación |
| Commits firmados | ✅ Requeridos | Integridad criptográfica |
| Status checks | ✅ Requeridos | Comprobaciones deben pasar |

### Próximos Pasos Recomendados

- [ ] Configurar CI/CD con GitHub Actions
- [ ] Agregar reglas de eslint/prettier
- [ ] Configurar CODEOWNERS
- [ ] Agregar plantillas de PR y issue
- [ ] Documentar contribuciones en CONTRIBUTING.md

---

**Última actualización:** 2026-05-27
