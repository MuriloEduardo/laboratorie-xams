# API Laboratorie Xams

## Instruções de Uso
- Copiar arquivo `.env.sample` e renomear para `.env`
- A aplicação e o banco de dados mysql, podem ser iniciados através do docker-compose, com o comando:
`docker compose up -d`
- Rodar as migrações com: `docker exec laboratorie-xams-app npx knex migrate:latest`
- Acessar API através `http://localhost:3333/`