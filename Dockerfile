# Use a imagem oficial do Node.js
FROM node:18

# Diretório de trabalho
WORKDIR /usr/src/app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Definir variáveis de ambiente
ENV PORT=8080
ENV NODE_ENV=production

# Expor a porta em que a aplicação irá rodar
EXPOSE ${PORT}

# Comando para iniciar a aplicação
CMD ["npm", "start"]
