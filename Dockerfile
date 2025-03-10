# Fase 1: Construcción del proyecto
FROM node:18-alpine as builder

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos el package.json y el package-lock.json
COPY package*.json ./

# Instalamos las dependencias del proyecto
RUN npm install

# Copiamos todo el código fuente al contenedor
COPY . .

# Construimos el proyecto usando Vite
RUN npm run build

# Fase 2: Servir la aplicación construida
FROM nginx:alpine

# Copiamos los archivos construidos a la carpeta de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponemos el puerto en el que Nginx va a servir la aplicación
EXPOSE 80

# Iniciamos Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
