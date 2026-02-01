# 🏥 PonyVet API Documentation

## 📋 Tabla de Contenido

1. [Información General](#información-general)
2. [Autenticación](#autenticación)
3. [Modelos de Datos](#modelos-de-datos)
4. [Endpoints por Módulo](#endpoints-por-módulo)
5. [Códigos de Error](#códigos-de-error)
6. [Ejemplos de Uso](#ejemplos-de-uso)

---

## 🔧 Información General

### Características Principales
- API RESTful con arquitectura basada en recursos
- Autenticación JWT con soporte para cookies
- Paginación automática en listas
- Soft delete (eliminación lógica)
- Campos de auditoría (createdAt, updatedAt, createdBy, updatedBy)
- Validación de datos con Zod
- Documentación interactiva con Swagger

### Tecnologías
- **Framework:** Fastify
- **Base de Datos:** PostgreSQL
- **ORM:** Prisma
- **Validación:** Zod
- **Autenticación:** JWT + bcrypt

### Formato de Respuesta
Todas las respuestas siguen este formato consistente:

```json
{
  "data": {}, // o [] para arrays
  "message": "string", // opcional
  "pagination": { // solo en listas paginadas
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

---

## 🔐 Autenticación

### Métodos Soportados
1. **Cookies** (axios ya lo maneja automáticamente)

### Roles de Usuario
| Rol | Descripción | Permisos |
|-----|-------------|----------|
| `ADMIN` | Administrador del sistema | Acceso completo |
| `VETERINARIAN` | Veterinario | Operaciones médicas y consultas |
| `CLIENT` | Cliente | Solo sus propios datos |

---

## 📊 Modelos de Datos

### User
```typescript
{
  id: string;           // UUID
  name: string;         // Nombre completo
  email: string;        // Email único
  role: 'ADMIN' | 'VETERINARIAN' | 'CLIENT';
  clientId?: string;    // Solo para rol CLIENT
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Client
```typescript
{
  id: string;           // UUID
  name: string;         // Nombre del cliente
  phone: string;        // Teléfono (10 dígitos)
  address?: string;     // Dirección
  latitude?: number;    // Latitud (-90 a 90)
  longitude?: number;   // Longitud (-180 a 180)
  notes?: string;       // Observaciones
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### MedicalRecord (Cartilla Médica)
```typescript
{
  id: string;           // UUID
  type: 'PET' | 'GROUP'; // Tipo de cartilla
  name: string;         // Nombre de la mascota/grupo
  notes?: string;       // Observaciones
  clientId: string;     // Cliente propietario
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
```

### Pet
```typescript
{
  id: string;           // UUID
  species: 'DOG' | 'CAT';
  sex?: 'MALE' | 'FEMALE';
  breed?: string;       // Raza
  birthDate?: Date;     // Fecha de nacimiento
  color?: string;       // Color
  notes?: string;       // Observaciones
  recordId: string;     // Cartilla médica asociada
  createdAt: Date;
  updatedAt: Date;
}
```

### AnimalGroup
```typescript
{
  id: string;           // UUID
  animalType: string;   // Tipo de animal
  quantity: number;     // Cantidad de animales
  notes?: string;       // Observaciones
  recordId: string;     // Cartilla médica asociada
  createdAt: Date;
  updatedAt: Date;
}
```

### Consultation
```typescript
{
  id: string;           // UUID
  date: Date;           // Fecha y hora de la consulta
  reason?: string;      // Motivo de consulta
  diagnosis?: string;   // Diagnóstico
  treatment?: string;   // Tratamiento
  notes?: string;       // Observaciones
  recordId: string;     // Cartilla médica
  veterinarianId: string; // Veterinario
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
```

### Medication
```typescript
{
  id: string;           // UUID
  name: string;         // Nombre del medicamento
  category: 'VACCINE' | 'ANTIBIOTIC' | 'OTHER';
  species?: 'DOG' | 'CAT'; // Especie específica
  defaultIntervalDays?: number; // Intervalo por defecto
  notes?: string;       // Observaciones
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
```

### Vaccination
```typescript
{
  id: string;           // UUID
  appliedAt: Date;      // Fecha de aplicación
  nextDueDate?: Date;   // Próxima fecha
  medicationId: string; // Medicamento usado
  recordId: string;     // Cartilla médica
  consultationId?: string; // Consulta asociada
  veterinarianId: string; // Veterinario
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
```

### InventoryItem
```typescript
{
  id: string;           // UUID
  name: string;         // Nombre del artículo
  category: 'MEDICATION' | 'MATERIAL';
  unit: string;         // Unidad de medida
  quantity: number;     // Cantidad actual
  expirationDate?: Date; // Fecha de vencimiento
  medicationId?: string; // Medicamento asociado
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
```

---

## 🔗 Endpoints por Módulo

## 🔑 Authentication

### POST /auth/login
Iniciar sesión en el sistema.

**Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response 200:**
```json
{
  "token": "jwt_token_string",
  "user": {
    "id": "uuid",
    "name": "string",
    "email": "string",
    "role": "ADMIN | VETERINARIAN | CLIENT"
  }
}
```

### POST /auth/logout
Cerrar sesión (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Response 200:**
```json
{
  "message": "Logout successful"
}
```

### GET /auth/profile
Obtener perfil del usuario autenticado.

**Headers:** `Authorization: Bearer <token>`

**Response 200:**
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "role": "string",
  "clientId": "uuid" // solo para rol CLIENT
}
```

---

## 👥 Clients

### POST /clients
Crear un nuevo cliente (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "name": "string",
  "phone": "string", // 10 dígitos
  "address": "string", // opcional
  "latitude": number, // opcional, -90 a 90
  "longitude": number, // opcional, -180 a 180
  "notes": "string" // opcional
}
```

**Response 201:**
```json
{
  "id": "uuid",
  "name": "string",
  "phone": "string",
  "address": "string",
  "latitude": number,
  "longitude": number,
  "notes": "string",
  "isActive": true,
  "createdAt": "2026-01-31T10:00:00.000Z",
  "updatedAt": "2026-01-31T10:00:00.000Z"
}
```

### GET /clients
Obtener lista de clientes (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page`: number (opcional, default: 1)
- `limit`: number (opcional, default: 10)

**Response 200:**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "string",
      "phone": "string",
      "address": "string",
      "latitude": number,
      "longitude": number,
      "notes": "string",
      "isActive": true,
      "createdAt": "2026-01-31T10:00:00.000Z",
      "updatedAt": "2026-01-31T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

### GET /clients/:id
Obtener un cliente específico (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Response 200:**
```json
{
  "id": "uuid",
  "name": "string",
  "phone": "string",
  "address": "string",
  "latitude": number,
  "longitude": number,
  "notes": "string",
  "isActive": true,
  "createdAt": "2026-01-31T10:00:00.000Z",
  "updatedAt": "2026-01-31T10:00:00.000Z"
}
```

### PUT /clients/:id
Actualizar un cliente (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Body:** (todos los campos son opcionales)
```json
{
  "name": "string",
  "phone": "string",
  "address": "string",
  "latitude": number,
  "longitude": number,
  "notes": "string"
}
```

**Response 200:** Mismo formato que GET /clients/:id

### DELETE /clients/:id
Eliminar un cliente (soft delete, requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Response 204:** Sin contenido

---

## 📘 Medical Records (Cartillas Médicas)

### POST /medical-records
Crear una nueva cartilla médica (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "type": "PET | GROUP",
  "name": "string",
  "notes": "string", // opcional
  "clientId": "uuid"
}
```

**Response 201:**
```json
{
  "id": "uuid",
  "type": "PET",
  "name": "string",
  "notes": "string",
  "clientId": "uuid",
  "isActive": true,
  "createdAt": "2026-01-31T10:00:00.000Z",
  "updatedAt": "2026-01-31T10:00:00.000Z",
  "createdBy": "uuid",
  "updatedBy": "uuid"
}
```

### GET /medical-records
Obtener lista de cartillas médicas con paginación (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page`: number (opcional, default: 1)
- `limit`: number (opcional, default: 10)

**Response 200:**
```json
{
  "data": [
    {
      "id": "uuid",
      "type": "PET",
      "name": "string",
      "notes": "string",
      "clientId": "uuid",
      "isActive": true,
      "createdAt": "2026-01-31T10:00:00.000Z",
      "updatedAt": "2026-01-31T10:00:00.000Z",
      "createdBy": "uuid",
      "updatedBy": "uuid"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

### GET /medical-records/client/:clientId
Obtener cartillas médicas por cliente (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Response 200:**
```json
{
  "data": [
    {
      "id": "uuid",
      "type": "PET",
      "name": "string",
      "notes": "string",
      "clientId": "uuid",
      "isActive": true,
      "createdAt": "2026-01-31T10:00:00.000Z",
      "updatedAt": "2026-01-31T10:00:00.000Z"
    }
  ]
}
```

### GET /medical-records/:id
Obtener una cartilla médica específica (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Response 200:** Mismo formato que POST /medical-records

### PUT /medical-records/:id
Actualizar una cartilla médica (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Body:** (todos los campos son opcionales)
```json
{
  "type": "PET | GROUP",
  "name": "string",
  "notes": "string",
  "clientId": "uuid"
}
```

**Response 200:** Mismo formato que GET /medical-records/:id

### DELETE /medical-records/:id
Eliminar una cartilla médica (soft delete, requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Response 204:** Sin contenido

---

## 🩺 Consultations

### POST /consultations
Crear una nueva consulta (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "date": "2026-01-31T10:00:00.000Z",
  "reason": "string", // opcional
  "diagnosis": "string", // opcional
  "treatment": "string", // opcional
  "notes": "string", // opcional
  "recordId": "uuid",
  "veterinarianId": "uuid"
}
```

**Response 201:**
```json
{
  "id": "uuid",
  "date": "2026-01-31T10:00:00.000Z",
  "reason": "string",
  "diagnosis": "string",
  "treatment": "string",
  "notes": "string",
  "recordId": "uuid",
  "veterinarianId": "uuid",
  "createdAt": "2026-01-31T10:00:00.000Z",
  "updatedAt": "2026-01-31T10:00:00.000Z",
  "createdBy": "uuid",
  "updatedBy": "uuid"
}
```

### GET /consultations
Obtener lista de consultas con paginación (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page`: number (opcional, default: 1)
- `limit`: number (opcional, default: 10)

**Response 200:** Lista paginada con formato similar al POST

### GET /consultations/record/:recordId
Obtener consultas por cartilla médica (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Response 200:** Array de consultas

### GET /consultations/date-range
Obtener consultas por rango de fechas (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `startDate`: string (ISO date)
- `endDate`: string (ISO date)

**Response 200:** Array de consultas

### GET /consultations/:id
Obtener una consulta específica (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Response 200:** Mismo formato que POST /consultations

### PUT /consultations/:id
Actualizar una consulta (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Body:** (todos los campos son opcionales)
```json
{
  "date": "2026-01-31T10:00:00.000Z",
  "reason": "string",
  "diagnosis": "string",
  "treatment": "string",
  "notes": "string",
  "recordId": "uuid",
  "veterinarianId": "uuid"
}
```

**Response 200:** Mismo formato que GET /consultations/:id

### DELETE /consultations/:id
Eliminar una consulta (soft delete, requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Response 204:** Sin contenido

---

## 💊 Medications

### POST /medications
Crear un nuevo medicamento (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "name": "string",
  "category": "VACCINE | ANTIBIOTIC | OTHER",
  "species": "DOG | CAT", // opcional
  "defaultIntervalDays": number, // opcional
  "notes": "string" // opcional
}
```

**Response 201:**
```json
{
  "id": "uuid",
  "name": "string",
  "category": "VACCINE",
  "species": "DOG",
  "defaultIntervalDays": 365,
  "notes": "string",
  "isActive": true,
  "createdAt": "2026-01-31T10:00:00.000Z",
  "updatedAt": "2026-01-31T10:00:00.000Z",
  "createdBy": "uuid",
  "updatedBy": "uuid"
}
```

### GET /medications
Obtener lista de medicamentos con paginación (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page`: number (opcional, default: 1)
- `limit`: number (opcional, default: 10)

**Response 200:** Lista paginada con formato similar al POST

### GET /medications/active
Obtener medicamentos activos (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Response 200:** Array de medicamentos activos

### GET /medications/category/:category
Obtener medicamentos por categoría (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Response 200:** Array de medicamentos

### GET /medications/:id
Obtener un medicamento específico (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Response 200:** Mismo formato que POST /medications

### PUT /medications/:id
Actualizar un medicamento (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Body:** (todos los campos son opcionales)
```json
{
  "name": "string",
  "category": "VACCINE | ANTIBIOTIC | OTHER",
  "species": "DOG | CAT",
  "defaultIntervalDays": number,
  "notes": "string"
}
```

**Response 200:** Mismo formato que GET /medications/:id

### DELETE /medications/:id
Eliminar un medicamento (soft delete, requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Response 204:** Sin contenido

---

## 💉 Vaccinations

### POST /vaccinations
Aplicar una vacunación (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "appliedAt": "2026-01-31T10:00:00.000Z",
  "nextDueDate": "2027-01-31T10:00:00.000Z", // opcional
  "medicationId": "uuid",
  "recordId": "uuid",
  "consultationId": "uuid", // opcional
  "veterinarianId": "uuid"
}
```

**Response 201:**
```json
{
  "id": "uuid",
  "appliedAt": "2026-01-31T10:00:00.000Z",
  "nextDueDate": "2027-01-31T10:00:00.000Z",
  "medicationId": "uuid",
  "recordId": "uuid",
  "consultationId": "uuid",
  "veterinarianId": "uuid",
  "createdAt": "2026-01-31T10:00:00.000Z",
  "updatedAt": "2026-01-31T10:00:00.000Z",
  "createdBy": "uuid",
  "updatedBy": "uuid"
}
```

### GET /vaccinations
Obtener lista de vacunaciones con paginación (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page`: number (opcional, default: 1)
- `limit`: number (opcional, default: 10)

**Response 200:** Lista paginada con formato similar al POST

### GET /vaccinations/record/:recordId
Obtener vacunaciones por cartilla médica (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Response 200:** Array de vacunaciones

### GET /vaccinations/upcoming
Obtener próximas vacunaciones (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Response 200:** Array de vacunaciones próximas

### GET /vaccinations/date-range
Obtener vacunaciones por rango de fechas (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `startDate`: string (ISO date)
- `endDate`: string (ISO date)

**Response 200:** Array de vacunaciones

### GET /vaccinations/:id
Obtener una vacunación específica (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Response 200:** Mismo formato que POST /vaccinations

### PUT /vaccinations/:id
Actualizar una vacunación (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Body:** (todos los campos son opcionales)
```json
{
  "appliedAt": "2026-01-31T10:00:00.000Z",
  "nextDueDate": "2027-01-31T10:00:00.000Z",
  "medicationId": "uuid",
  "recordId": "uuid",
  "consultationId": "uuid",
  "veterinarianId": "uuid"
}
```

**Response 200:** Mismo formato que GET /vaccinations/:id

### DELETE /vaccinations/:id
Eliminar una vacunación (soft delete, requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Response 204:** Sin contenido

---

## 📦 Inventory

### POST /inventory
Crear un artículo de inventario (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "name": "string",
  "category": "MEDICATION | MATERIAL",
  "unit": "string",
  "quantity": number,
  "expirationDate": "2026-12-31T23:59:59.000Z", // opcional
  "medicationId": "uuid" // opcional
}
```

**Response 201:**
```json
{
  "id": "uuid",
  "name": "string",
  "category": "MEDICATION",
  "unit": "string",
  "quantity": number,
  "expirationDate": "2026-12-31T23:59:59.000Z",
  "medicationId": "uuid",
  "isActive": true,
  "createdAt": "2026-01-31T10:00:00.000Z",
  "updatedAt": "2026-01-31T10:00:00.000Z",
  "createdBy": "uuid",
  "updatedBy": "uuid"
}
```

### GET /inventory
Obtener lista de inventario con paginación (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Query Parameters:**
- `page`: number (opcional, default: 1)
- `limit`: number (opcional, default: 10)

**Response 200:** Lista paginada con formato similar al POST

### GET /inventory/low-stock
Obtener artículos con stock bajo (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Response 200:** Array de artículos con stock bajo

### GET /inventory/expiring-soon
Obtener artículos próximos a vencer (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Response 200:** Array de artículos próximos a vencer

### GET /inventory/stats
Obtener estadísticas del inventario (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Response 200:**
```json
{
  "totalItems": number,
  "totalValue": number,
  "lowStockItems": number,
  "expiringSoon": number,
  "categoriesBreakdown": {
    "MEDICATION": number,
    "MATERIAL": number
  }
}
```

### GET /inventory/:id
Obtener un artículo específico (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Response 200:** Mismo formato que POST /inventory

### PUT /inventory/:id
Actualizar un artículo de inventario (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Body:** (todos los campos son opcionales)
```json
{
  "name": "string",
  "category": "MEDICATION | MATERIAL",
  "unit": "string",
  "quantity": number,
  "expirationDate": "2026-12-31T23:59:59.000Z",
  "medicationId": "uuid"
}
```

**Response 200:** Mismo formato que GET /inventory/:id

### POST /inventory/:id/adjust
Ajustar cantidad de un artículo (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "adjustment": number, // positivo o negativo
  "reason": "string" // opcional
}
```

**Response 200:** Mismo formato que GET /inventory/:id

### DELETE /inventory/:id
Eliminar un artículo (soft delete, requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Response 204:** Sin contenido

---

## 👤 Users

### POST /users
Crear un nuevo usuario (requiere autenticación ADMIN).

**Headers:** `Authorization: Bearer <token>`

**Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "ADMIN | VETERINARIAN | CLIENT",
  "clientId": "uuid" // requerido si role = CLIENT
}
```

**Response 201:**
```json
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "role": "ADMIN",
  "clientId": "uuid",
  "isActive": true,
  "createdAt": "2026-01-31T10:00:00.000Z",
  "updatedAt": "2026-01-31T10:00:00.000Z"
}
```

### GET /users
Obtener lista de usuarios (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Response 200:** Array de usuarios (sin password)

### GET /users/:id
Obtener un usuario específico (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Response 200:** Mismo formato que POST /users

### PUT /users/:id
Actualizar un usuario (requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Body:** (todos los campos son opcionales, excepto password que debe ser hasheado)
```json
{
  "name": "string",
  "email": "string",
  "role": "ADMIN | VETERINARIAN | CLIENT",
  "clientId": "uuid"
}
```

**Response 200:** Mismo formato que GET /users/:id

### DELETE /users/:id
Eliminar un usuario (soft delete, requiere autenticación).

**Headers:** `Authorization: Bearer <token>`

**Response 204:** Sin contenido

---

## ❌ Códigos de Error

### HTTP Status Codes

| Código | Descripción | Uso |
|--------|-------------|-----|
| `200` | OK | Operación exitosa |
| `201` | Created | Recurso creado exitosamente |
| `204` | No Content | Eliminación exitosa |
| `400` | Bad Request | Datos de entrada inválidos |
| `401` | Unauthorized | Token de autenticación requerido o inválido |
| `403` | Forbidden | Sin permisos para la operación |
| `404` | Not Found | Recurso no encontrado |
| `409` | Conflict | Conflicto de datos (ej: email duplicado) |
| `422` | Unprocessable Entity | Errores de validación |
| `500` | Internal Server Error | Error del servidor |

### Formato de Error

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### Códigos de Error Comunes

| Código | Descripción |
|--------|-------------|
| `VALIDATION_ERROR` | Error en validación de datos |
| `AUTHENTICATION_REQUIRED` | Token de autenticación requerido |
| `INVALID_TOKEN` | Token inválido o expirado |
| `INSUFFICIENT_PERMISSIONS` | Sin permisos para la operación |
| `RESOURCE_NOT_FOUND` | Recurso no encontrado |
| `DUPLICATE_RESOURCE` | Recurso duplicado |
| `INVALID_CREDENTIALS` | Credenciales incorrectas |

---

## 💡 Ejemplos de Uso

### 1. Flujo Completo: Crear Cliente con Ubicación

```bash
# 1. Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@ponyvet.com",
    "password": "admin123"
  }'

# Response: {"token": "jwt_token_here", "user": {...}}

# 2. Crear cliente con ubicación
curl -X POST http://localhost:3000/clients \
  -H "Authorization: Bearer jwt_token_here" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "phone": "1234567890",
    "address": "Calle Principal 123, Madrid",
    "latitude": 40.4168,
    "longitude": -3.7038,
    "notes": "Cliente frecuente"
  }'
```

### 2. Flujo Médico: Crear Cartilla → Consulta → Vacunación

```bash
# 1. Crear cartilla médica
curl -X POST http://localhost:3000/medical-records \
  -H "Authorization: Bearer jwt_token_here" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "PET",
    "name": "Luna",
    "notes": "Labrador de 2 años",
    "clientId": "client_uuid_here"
  }'

# 2. Crear consulta
curl -X POST http://localhost:3000/consultations \
  -H "Authorization: Bearer jwt_token_here" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2026-01-31T10:00:00.000Z",
    "reason": "Vacunación anual",
    "diagnosis": "Animal sano",
    "treatment": "Aplicación de vacuna antirrábica",
    "recordId": "medical_record_uuid_here",
    "veterinarianId": "vet_uuid_here"
  }'

# 3. Aplicar vacunación
curl -X POST http://localhost:3000/vaccinations \
  -H "Authorization: Bearer jwt_token_here" \
  -H "Content-Type: application/json" \
  -d '{
    "appliedAt": "2026-01-31T10:00:00.000Z",
    "nextDueDate": "2027-01-31T10:00:00.000Z",
    "medicationId": "antirabica_uuid_here",
    "recordId": "medical_record_uuid_here",
    "consultationId": "consultation_uuid_here",
    "veterinarianId": "vet_uuid_here"
  }'
```

### 3. Gestión de Inventario

```bash
# 1. Agregar artículo al inventario
curl -X POST http://localhost:3000/inventory \
  -H "Authorization: Bearer jwt_token_here" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Vacuna Antirrábica",
    "category": "MEDICATION",
    "unit": "dosis",
    "quantity": 50,
    "expirationDate": "2026-12-31T23:59:59.000Z",
    "medicationId": "antirabica_uuid_here"
  }'

# 2. Ajustar inventario
curl -X POST http://localhost:3000/inventory/inventory_uuid_here/adjust \
  -H "Authorization: Bearer jwt_token_here" \
  -H "Content-Type: application/json" \
  -d '{
    "adjustment": -5,
    "reason": "Vacunaciones aplicadas"
  }'

# 3. Ver alertas de stock bajo
curl -X GET http://localhost:3000/inventory/low-stock \
  -H "Authorization: Bearer jwt_token_here"
```

---
