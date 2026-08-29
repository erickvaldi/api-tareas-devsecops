FROM node:24-alpine

ENV NODE_ENV=production
WORKDIR /app

# Instala las correcciones de seguridad disponibles y elimina gestores de
# paquetes que la aplicación no necesita durante su ejecución.
RUN apk upgrade --no-cache \
  && rm -rf /usr/local/lib/node_modules/npm \
    /usr/local/lib/node_modules/corepack \
    /opt/yarn-v* \
  && rm -f /usr/local/bin/npm \
    /usr/local/bin/npx \
    /usr/local/bin/corepack \
    /usr/local/bin/yarn \
    /usr/local/bin/yarnpkg

COPY --chown=node:node package.json package-lock.json ./
COPY --chown=node:node src ./src

USER node
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:8080/health').then((response) => { if (!response.ok) process.exit(1); }).catch(() => process.exit(1));"

CMD ["node", "src/server.js"]
