# web-py-api

Este proyecto tiene una interfaz web desarrollada con **Next.js 15** que permite ejecutar funciones Python alojadas en una API construida con **FastAPI**. El usuario puede seleccionar una función, completar los argumentos requeridos y ver el resultado en tiempo real. Adicionalmente las misma funciones de Python pueden ejecutarse en la terminal o consola de preferencia.

Y este contiene a su vez un diagrama para una solución de como se integra Fracttal API.

## Estructura del Proyecto

- **client-web-test**: Frontend simple en Next.js para hacer pruebas de la API de Python usando una interfaz gráfica.
- **python-api**: API en Python usando **FastAPI** que contiene las funciones o métodos para la prueba.
- **erp-problem-solution**: Esquema de propuesta para el problema de la segunda parte de esta prueba.

## Requisitos

- Node.js 18+
- Python 3.10+
- FastAPI
- Navegador Web

## Instalación y ejecución

### 1. Clona el repositorio

Clona el repositorio desde este comando o en la interfaz de GitHub.

```bash
git clone git@github.com:JoseMolina94/web-py-api.git
```

### 2. Usando la Python API

Puedes usar si deseas las funciones de Python sin necesidad de instalar la interfaz gráfica de pruebas.

De ser asi entra en la carpeta de la **python-api**:

```bash
cd python-api
```

##### **Usando las funciones**:

Puedes usar las funciones mediante argumentos líneales ordenados, por ejemplo:

```bash
python main.py addition 2 2
```

O puedes hacerlo mediante el uso de argumentos nombrados mediante clave, por ejemplo:

```bash
python main.py addition a=2 b=2
```

Si tienes dudas sobre lo métodos o funciones usa:

```bash
python main.py addition --help
```

### 3. Ejecutando la API Python

Entra primero a la carpeta de la API de Python utilizando el comando:

```bash
cd pyton-api
```

Para este paso necesitas tener **FastAPI** instalado, en caso contrario utiliza el comando:

```bash
pip install fastapi uvicorn
```

Utiliza el comando para arrancar la API: 

```bash
uvicorn main:app --reload
```
O sí prefieres especificar el puerto

```bash
uvicorn main:app --reload --port 8000
```

Si entras en **http://127.0.0.1:8000** o en **[localhost](http://localhost:8000/)**

La interfaz gráfica de FastAPI (la documentación automática) debería estar disponible automáticamente en:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

Si abres http://localhost:8000 y no ves nada útil o una respuesta simple como {"detail":"Not Found"}, eso es normal, porque no tienes una ruta definida en /.

### 4. Ejecutando el cliente (Next.js)

Para ejecutar el cliente de pruebas debes utilizar estos comandos (con la Python API con **FastAPI** corriendo también) en una consola o terminal:

```bash
cd client-web-test
npm install
npm run dev
```

Esto abrira la interfaz en http://localhost:3000 y podrás verla y utilizarla de manera simple.

## Contenido adicional (Diagrama para una solución de como se integra Fracttal API)

Puedes ver los diagramas y una breve definición de cada componente en las imágenes dentro de la carpeta **erp-problem-solution**.


#### Gracias por leer