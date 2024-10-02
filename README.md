# Achieve Goals - backend

Achieve Goals é uma aplicação projetada para te ajudar a cadastrar e acompanhar suas metas diárias, organizadas por semana. O sistema permite que as metas sejam repetidas até 7 vezes, uma para cada dia da semana, oferecendo uma visão clara do histórico de cumprimento de metas ao longo do tempo. A comunicação entre frontend e backend é feita via APIs REST.

## Tecnologias Utilizadas

- Node.js
- TypeScript
- PostgreSQL
- Fastify
- Docker
- Drizzle ORM

## Funcionalidades

- Cadastro de metas diárias, com a possibilidade de repetição semanal (máximo de 7 repetições).
- Visualização do histórico de metas concluídas em semanas anteriores.
- Interface amigável e responsiva para fácil interação do usuário.
- Filtragem de metas por status (concluídas, pendentes).

## Instruções para Configuração

1. É necessario ter instalado docker e node.js.
2. Acessar a pasta deste projeto no terminal
3. Iniciar o docker
```bash
#rodar docker
docker compose up -d
```
4. Rodar as migrations e iniciar o banco
```bash
#ao criar tabela/campo novo
npx drizzle-kit generate

#rodar no banco de dados
npx drizzle-kit migrate

#ver o banco de dados online
npx drizzle-kit studio
```
5. Caso queira iniciar com alguns dados para ver como funciona a aplicação
```bash
#criar dados iniciais
npm run seed
```

## Contato

<img align="left" src="https://avatars.githubusercontent.com/renyzeraa?size=100">

Made with ❤️ by [Renan Silva](https://github.com/renyzeraa)! <br>
🛠 Frontend Developer <br>
📍 Santa Catarina - Brazil <br>

<a href="https://www.linkedin.com/in/renyzeraa" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white" alt="LinkedIn Badge" height="20"></a>&nbsp;
<a href="mailto:renansilvaytb@gmail.com" target="_blank"><img src="https://img.shields.io/badge/Gmail-D14836?style=flat&logo=gmail&logoColor=white" alt="Gmail Badge" height="20"></a>&nbsp;
<a href="#"><img src="https://img.shields.io/badge/Discord-%237289DA.svg?logo=discord&logoColor=white" title="renan_s#7826" alt="Discord Badge" height="20"></a>&nbsp;
<a href="https://www.github.com/renyzeraa" target="_blank"><img src="https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white" alt="GitHub Badge" height="20"></a>&nbsp;

<br clear="left"/>