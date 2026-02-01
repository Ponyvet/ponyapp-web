# Plan: Actualizar Frontend para Nuevo Modelo de API

# Importante
- No crear fomularios en modales, siempre usar páginas completas.
- Al final de terminar un paso ejectuar pnpm lint y pnpm typhecheck para asegurar que no hay errores.


## Resumen del Cambio

**Antes:** `Pet.clientId` (Pet pertenece directamente a Client)
**Ahora:** `Pet.recordId` (Pet pertenece a MedicalRecord, que pertenece a Client)

Relación: `Client → MedicalRecord → Pet/AnimalGroup`

**Decisiones:**
- Pet viene embebido en MedicalRecord (no hay endpoint separado)
- Eliminar página independiente de mascotas (/pets)

---

## Archivos a Modificar

### 1. Modelos

| Archivo | Cambio |
|---------|--------|
| `src/features/pets/models/Pet.ts` | Cambiar `clientId` → `recordId`, eliminar `client` anidado |
| `src/features/pets/models/CreatePet.ts` | Cambiar `clientId` → `recordId` |

### 2. APIs

| Archivo | Cambio |
|---------|--------|
| `src/features/pets/api/pets.ts` | Eliminar `getClientPets()` |

### 3. Componentes

| Archivo | Cambio |
|---------|--------|
| `src/features/pets/components/PetForm.tsx` | Eliminar selector de cliente, recibir `recordId` como prop |

### 4. Páginas

| Archivo | Cambio |
|---------|--------|
| `src/features/pets/pages/CreatePetPage.tsx` | Recibir `recordId`, redirigir a MedicalRecord |
| `src/features/pets/pages/EditPetPage.tsx` | Usar `pet.recordId`, eliminar carga de clientes |
| `src/features/pets/pages/PetDetailsPage.tsx` | Obtener cliente via MedicalRecord |
| `src/features/medical-records/pages/MedicalRecordDetailsPage.tsx` | Agregar botón "Agregar Mascota" si tipo=PET y pet=null |

### 5. Eliminar

| Archivo | Razón |
|---------|-------|
| `src/features/pets/pages/PetsPage.tsx` | Ya no se necesita página independiente |
| `src/features/pets/components/pets/PetsTable.tsx` | Solo se usaba en PetsPage |
| `src/features/pets/components/pets/Columns.tsx` | Solo se usaba en PetsTable |
| `src/features/pets/queries/useGetPets.ts` | Ya no se necesita |
| `src/features/pets/queries/useGetAllPets.ts` | Ya no se necesita |
| `src/features/pets/models/PetsParams.ts` | Ya no se necesita |

### 6. Router

| Archivo | Cambio |
|---------|--------|
| `src/app/Router.tsx` | Eliminar ruta `/pets`, `/clients/:clientId/pets/:petId` |

### 7. Sidebar

| Archivo | Cambio |
|---------|--------|
| `src/shared/components/AppSidebar.tsx` | Eliminar enlace a "Cartillas" (/pets) del menú |

---

## Orden de Implementación

### Fase 1: Modelos
1. Actualizar `Pet.ts` - cambiar `clientId` → `recordId`
2. Actualizar `CreatePet.ts` - cambiar `clientId` → `recordId`

### Fase 2: APIs
3. Actualizar `pets.ts` - eliminar `getClientPets()`

### Fase 3: Formulario
4. Actualizar `PetForm.tsx`:
   - Eliminar props `clients`, `initialClientId`
   - Agregar prop `recordId: string`
   - Eliminar selector de cliente
   - Auto-setear `recordId` en el form

### Fase 4: Páginas
5. Actualizar `CreatePetPage.tsx`:
   - Recibir `recordId` de location.state
   - Redirigir a `/medical-records/:recordId` después de crear

6. Actualizar `EditPetPage.tsx`:
   - Usar `pet.recordId` existente

7. Actualizar `PetDetailsPage.tsx`:
   - Cargar MedicalRecord para obtener cliente
   - Usar `record.client` para mostrar propietario

8. Actualizar `MedicalRecordDetailsPage.tsx`:
   - Si `type === 'PET'` y `pet === null`: mostrar botón "Agregar Mascota"
   - Navegar a `/pets/add` con `{ state: { recordId: record.id } }`

### Fase 5: Limpieza
9. Eliminar `PetsPage.tsx` y componentes relacionados
10. Actualizar `Router.tsx` - eliminar rutas de pets independientes
11. Actualizar `AppSidebar.tsx` - eliminar enlace "Cartillas"
12. Eliminar queries no usados

---

## Nuevo Flujo de Usuario

```
Cliente → Ver Detalles → "Agregar Cartilla"
       → Crear MedicalRecord (tipo: PET)
       → Ver MedicalRecord → "Agregar Mascota"
       → Crear Pet (especie, raza, color, etc.)
       → Ver MedicalRecord con Pet completo
```

---

## Verificación

1. Crear nueva cartilla médica tipo PET desde ClientDetailsPage
2. Ver que MedicalRecordDetailsPage muestra botón "Agregar Mascota"
3. Crear mascota desde ese botón
4. Verificar que la mascota aparece en MedicalRecordDetailsPage
5. Editar mascota existente
6. Ver detalles de mascota - debe mostrar cliente correctamente
7. Verificar que rutas `/pets` ya no existen
8. Verificar que sidebar no tiene enlace a "Cartillas"
