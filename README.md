# Chatbot de Atención Comercial — InnovaLab

Área Backend de un chatbot para pequeños emprendimientos que permite a los clientes consultar catálogos, resolver dudas frecuentes y ser derivados a atención humana, todo desde una interfaz conversacional.

Proyecto académico desarrollado en **InnovaLab · Sprint 1**.

---

## Demo en vivo

[chatbot-innova-backend.onrender.com/demo](https://chatbot-innova-backend.onrender.com/demo)

El demo incluye:
- Modo **cliente visitante** — interactúa con el chatbot sin autenticación
- Modo **emprendedor** — panel de administración con JWT simulado
- 3 negocios de prueba: Panadería García, Ferretería López, Ropa & Accesorios Mía

---

## Stack técnico

| Capa | Tecnología |
|------|-----------|
| Runtime | Node.js |
| Lenguaje | TypeScript |
| Framework | Express |
| ORM | Prisma |
| Base de datos | PostgreSQL |
| Autenticación | JWT (jsonwebtoken) |
| Documentación API | Swagger (swagger-jsdoc + swagger-ui-express) |
| Deploy | Render |

---

## Módulos

```
src/
├── modules/
│   ├── auth/           → login, registro, validación JWT
│   ├── catalog/        → productos por emprendedor
│   ├── chatbot/        → procesamiento de mensajes y keywords
│   ├── consultations/  → ciclo de vida de conversaciones
│   └── whatsapp/       → simulación de mensajes entrantes
├── mocks/              → datos de prueba sin base de datos
└── server.ts
```

---

## Endpoints disponibles

### Auth
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/api/auth/login` | Login con email y password, devuelve JWT |
| `POST` | `/api/auth/register` | Registro de nuevo usuario emprendedor |

### Chatbot
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/api/chatbot/chat` | Envía un mensaje y recibe respuesta del bot |

### Catálogo
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/catalog/productos?usuarioId={id}` | Lista productos de un emprendedor |
| `GET` | `/api/catalog/productos/{id}` | Detalle de un producto |

### Consultas
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/api/consultations?usuarioId={id}` | Crea una consulta y devuelve el mensaje de bienvenida |
| `GET` | `/api/consultations` | Lista consultas del emprendedor autenticado (requiere JWT) |
| `PATCH` | `/api/consultations/{id}/derivar` | Deriva la consulta a atención humana |
| `PATCH` | `/api/consultations/{id}/cerrar` | Cierra la consulta |

### WhatsApp (simulación)
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/api/whatsapp/webhook` | Simula mensaje entrante de WhatsApp |

### Documentación
| Endpoint | Descripción |
|----------|-------------|
| `/api-docs` | Swagger UI con todos los endpoints documentados |

---

## Flujo de una conversación

```
POST /api/consultations?usuarioId=1
  → Crea CONSULTA · devuelve mensajeBienvenida desde ConfiguracionBot

POST /api/chatbot/chat  (por cada mensaje)
  → Guarda MENSAJE del cliente y respuesta del bot

PATCH /api/consultations/{id}/derivar   ← si el cliente pide atención humana
PATCH /api/consultations/{id}/cerrar    ← al terminar la conversación
```

Ver [flujo-completo.md](./flujo-completo.md) para el detalle completo con entidades y endpoints de tracking pendientes.

---

## Cómo correr el proyecto localmente

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env
# completar DATABASE_URL y JWT_SECRET

# 3. Generar cliente de Prisma
npm run prisma:generate

# 4. Ejecutar migraciones
npm run prisma:migrate

# 5. Iniciar en modo desarrollo
npm run dev
```

El servidor queda disponible en `http://localhost:3000`.  
La documentación Swagger en `http://localhost:3000/api-docs`.

> **Sin base de datos:** el sistema tiene un fallback a datos mock en `src/mocks/mock.data.ts`. El demo en Render funciona con estos datos.

---

## Modelo de datos (DER simplificado)

```
USUARIO (emprendedor)
  ├─ 1:1 → CONFIGURACION_BOT   (bienvenida, horario, tono, menú)
  ├─ 1:N → SESION_USUARIO       (sesiones activas)
  ├─ 1:N → PRODUCTO             (catálogo del negocio)
  ├─ 1:N → CATEGORIA_FAQ
  │           └─ 1:N → FAQ      (preguntas frecuentes)
  └─ 1:N → CONSULTA             (conversaciones)
                ├─ N:1 → ESTADO_CONSULTA
                ├─ 1:N → MENSAJE
                │           └─ 1:N → ADJUNTO
                ├─ 0:1 → LEAD
                ├─ N:M → PRODUCTO   (via CONSULTA_PRODUCTO)
                └─ N:M → FAQ        (via CONSULTA_FAQ)
```

---

## Equipo

Proyecto desarrollado por la alumna Sandra Lopez, área backend, **Grupo 16** en el marco del curso **InnovaLab**.
# Chatbot InnovaLab - Backend

Backend del MVP de la plataforma de chatbot para PyMEs. Permite a emprendedores configurar un asistente virtual con catálogo de productos, preguntas frecuentes y analítica de comportamiento de usuarios.
 
## Tecnologías utilizadas

- **Runtime:** Node.js (v24+)
- **Lenguaje:** TypeScript 5
- **Framework Web:** Express 4
- **ORM:** Prisma ORM (v5)
- **Base de Datos:** PostgreSQL (Neon)
- **Autenticación:** JWT & Bcrypts 
- **Mensajería / Cola (Message Broker):** Upstash Redis (REST API)
- **Base de Datos Analítica (OLAP):** MotherDuck (DuckDB Node API v1.5.2-r.1)
- **Almacenamiento de imágenes:** Cloudinary
- **Validación:** Zod v4
- **Documentación:** Swagger / OpenAPI
- **Despliegue:** Render (CI/CD)

Prerequisitos
Antes de comenzar, asegurate de tener lo siguiente:

Node.js v24 o superior — Descargar
npm (incluido con Node.js)
Git
Una cuenta en Neon para PostgreSQL en la nube (plan gratuito disponible)
Una cuenta en Upstash para Redis REST API (plan gratuito disponible)
Una cuenta en MotherDuck para DuckDB en la nube (plan gratuito disponible)
Una cuenta en Cloudinary para almacenamiento de imágenes (plan gratuito disponible)

##  Estructura del Proyecto

\`\`\`text
backend-innova/
├── prisma/
│   ├── schema.prisma          # Modelos de base de datos
│   ├── migrations/            # Historial de migraciones SQL
│   └── seed.ts                # Datos iniciales (rubros)
├── src/
│   ├── app.ts                 # Express app: middlewares, rutas, CORS, rate limiting
│   ├── server.ts              # Punto de entrada del API server
│   ├── worker.ts              # Pipeline de telemetría (Redis → MotherDuck)
│   ├── controllers/           # Capa HTTP: parsea req/res, delega a services
│   ├── services/              # Capa de negocio: lógica, transacciones, validaciones de dominio
│   ├── middlewares/           # Auth, autorización, validación, errores, uploads
│   ├── routes/                # Definición de rutas y middleware stack por endpoint
│   ├── schema/                # Schemas Zod para validación de entradas
│   ├── types/                 # Interfaces TypeScript por dominio
│   └── lib/
│       └── prisma.ts          # Singleton de PrismaClient
├── swagger.yaml               # Especificación OpenAPI 3.0
├── render.yaml                # Configuración de deploy en Render
├── tsconfig.json              # Configuración del compilador TypeScript
└── package.json
\`\`\`

## Configuracion del entorno

Clona el repositorio.

1. Clona el repositorio.
2. Instala las dependencias del proyecto:
   \`\`\`bash
   npm install
   \`\`\`
3. Crea tu archivo `.env` en la raíz con tus credenciales de PostgreSQL y tu clave maestra para JWT:
   \`\`\`env
   NODE_ENV=development
   PORT=3000
   # Copiá la connection string desde el panel de Neon
   DATABASE_URL="tu_url_de_neon_aqui"
   # Generá una clave secreta fuerte. Ejemplo:
   # node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   JWT_SECRET="tu_clave_generada_criptograficamente"
   # Obtenelos desde: Upstash Console → Tu database → REST API
   UPSTASH_REDIS_REST_URL="https://tu-url-upstash.io"
   UPSTASH_REDIS_REST_TOKEN="tu-token-upstash"
   # Obtenelo desde: app.motherduck.com → Settings → Access Tokens
   MOTHERDUCK_TOKEN="tu-token-motherduck"
   # Obtenelos desde: Cloudinary Console → Dashboard
   CLOUDINARY_CLOUD_NAME="tu_cloud_name"
   CLOUDINARY_API_KEY="tu_api_key"
   CLOUDINARY_API_SECRET="tu_api_secret"
   # URL exacta del frontend que va a consumir la API
   FRONTEND_URL="http://localhost:5173"
   \`\`\`
4. Sincroniza las tablas en tu base de datos y genera el cliente de Prisma:
   \`\`\`bash
   npx prisma migrate dev
   \`\`\`
5. Crear las tablas en la base de datos
   - Aplica todas las migraciones SQL pendientes a tu base de datos PostgreSQL:
     npx prisma migrate dev
6. Cargar datos iniciales (seed)
   - Precarga los rubros de negocio disponibles para la configuración del bot
     npm run seed
7. Levanta el proyecto. **Debes iniciar ambos procesos para que funcione completo**:
   - Para levantar solo la API:
     \`\`\`bash
     npm run dev
     \`\`\`
   - Para levantar el Worker de Analítica (abre otra terminal):
     \`\`\`bash
     npm run worker
     \`\`\`
   - Para levantar **ambos a la vez** (Simulación de producción con concurrently):
     \`\`\`bash
     npm start
     \`\`\`


## Módulos Implementados
### Autenticación y Gestión de Usuario
* Registro de emprendedor e inicialización automática de la configuración de su bot.
* Login seguro con generación de JWT válido por 24 horas.
* Modificación de contraseña con validaciones estrictas (longitud, mayúsculas, números y símbolos).
* Baja lógica de cuenta (Soft Delete) conservando métricas históricas.

### Registro de movimientios
* Registro integral de actividades en la base de datos para cada acción realizada en la API.
* Captura automática de tipo de movimiento, IP de origen y dispositivo (User-Agent).

### Configuración del Bot
   **Configuracion bot (`/api/bot`):**
    **GET:** Recupera la configuración actual.
    **PUT:** Actualiza los parámetros de comportamiento.

### FAQs y Categorías
* **Categorías FAQ (`/api/faq-categories`):**
  * **GET / POST / PUT / DELETE:** CRUD completo. Incluye protección de integridad relacional (`onDelete: Restrict`), impidiendo borrar una categoría si esta posee preguntas asociadas.
* **Preguntas Frecuentes - FAQs (`/api/faqs`):**
  * **GET / POST / PUT / DELETE:** Gestión integral permitiendo reasignación de categorías mediante Joins relacionales.

### Productos (`/api/products`):**
    * **GET / POST / PUT / DELETE:** Administración completa del inventario para que el bot pueda responder sobre él.

### Telemetría y Analítica (NUEVO)
* **Pipeline Asíncrono:** Captura eventos del frontend (clics, page views, embudo) sin bloquear la API principal, utilizando **Redis** como cola de mensajes.
* **Consumidor en Segundo Plano:** El `worker.ts` procesa los lotes y los inserta de forma segura en **MotherDuck**.
* **Unificación de Identidad:** Capacidad de rastrear a un usuario desde su visita anónima hasta su conversión, interceptando el JWT (Middleware opcional).
