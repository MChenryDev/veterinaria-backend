## Instalar Node.js:
`node -v`
`npm -v`

## Ejecuta el siguiente comando para crear un archivo package.json, que manejará las dependencias de tu proyecto.
`npm init -y`

## Instalar dependencias: Vamos a instalar las siguientes dependencias:

- express: Para manejar las rutas y peticiones.
- mysql2: Para conectarse a la base de datos MySQL.
- dotenv: Para gestionar variables de entorno (credenciales de la base de datos, etc.).
- nodemon: Para reiniciar automáticamente el servidor cuando hagas cambios en tu código.
`npm install express mysql2 dotenv`
`npm install --save-dev nodemon`

## Configurar nodemon: En el archivo package.json, modifica el script para que nodemon ejecute el servidor automáticamente. Busca la sección "scripts" y modifícala así:
`"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}`
