Pasos para levantar la app en desarrollo

1. Levantar la base de datos

docker compose up -d

2. Crear una copia de el .env.template y renombrarlo a .env

3. Reemplazar las variables de entorno

4. Ejecutar el comando npm install para reconstruir los módulos de node

5. Ejecutar el comando npm run dev para ejecutar aplicación en desarrollo

6. Ejecutar estos comandos de Prisma

npx prisma migrate dev
npx prisma generate

7. Ejecutar el SEED para crear la base de datos local


Prisma commnads

npx prisma init
npx prisma migrate dev
npx prisma generate

Libreria para saber que actualizaciones de dependencias tenemos pendientes
https://www.npmjs.com/package/npm-check-updates
 comando para instalar, esto se realiza en el cdm 
 npm i npm-check-updates

se corre el comando, para conocer que actualizaciones tenemos pendientes en las dependencias

ncu en el proyecto

luego si se quieren actualizar se corre el comando

ncu --udgrade

libreria para guardar cookies del lado del cliente 
https://www.npmjs.com/package/cookies-next
comando: npm i cookies-next
