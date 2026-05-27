# 🚀 Guía de Conexión: Base de Datos (Supabase)

Hola equipo. Aquí tienen los pasos sencillos para conectar el Backend y DBeaver a la base de datos del proyecto. 

---

## 🛠️ 1. Configurar el Backend (Node.js)

Para que el servidor se conecte a Supabase, necesitamos configurar las variables de entorno.

**Pasos:**
1. Abre la carpeta del **Backend** en Visual Studio Code.
2. Crea un archivo nuevo en la raíz y nómbralo exactamente: **`.env`**
3. Copia el siguiente bloque y reemplaza `[CONTRASEÑA]` y `[REFERENCIA_PROYECTO]` con los datos reales que pasamos por el grupo:

```env
PORT=3000
DATABASE_URL=postgresql://postgres:[CONTRASEÑA]@db.[REFERENCIA_PROYECTO].supabase.co:5432/postgres

IMPORTANTE: Nunca suban el archivo .env a GitHub porque contiene la contraseña real. Ya está protegido en el .gitignore.

Para probar si funciona:

    Abre la terminal en la carpeta del backend.

    Ejecuta npm install (solo la primera vez).

    Levanta el servidor con npm run dev (o npm start).

    Si todo está bien, verán el mensaje: Conectado a PostgreSQL (Supabase).

## 📊 2. Configurar DBeaver (Para ver las tablas)

Para visualizar y editar la base de datos de forma gráfica, creen una nueva conexión de tipo PostgreSQL en DBeaver con estos datos:

    Host: db.[REFERENCIA_PROYECTO].supabase.co (Va sin "postgresql://" y sin el puerto)

    Port: 5432

    Database: postgres

    Username: postgres

    Password: (La contraseña real de la base de datos)

Configuración Obligatoria de Seguridad:

    En esa misma ventana de DBeaver, ve a la pestaña SSL (arriba).

    En el campo SSL mode, selecciona require.

    (Solo si te da error al conectar): En el campo Factory de esa misma pestaña, selecciona o escribe: org.postgresql.ssl.NonValidatingFactory.

Haz clic en Probar conexión... abajo a la izquierda. Si sale exitoso, dale a Finalizar.