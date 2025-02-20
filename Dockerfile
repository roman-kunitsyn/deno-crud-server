FROM denoland/deno:2.2.0

WORKDIR /app

COPY deno*.json ./
RUN deno install

COPY . .

EXPOSE ${PORT}

CMD ["deno", "run", "prod"]
