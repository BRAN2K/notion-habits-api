# Notion Habits API

Esta é uma API construída em Node.js com TypeScript para marcar hábitos diários como concluídos no Notion a partir da leitura de códigos QR.

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/notion-habits-api.git
   cd notion-habits-api
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env` e configure as variáveis de ambiente:

   ```env
   NOTION_TOKEN=seu_token_do_notion
   NOTION_DATABASE_ID=seu_database_id_do_notion
   PORT=3000
   ```

4. Execute o servidor:
   ```bash
   npm start
   ```

## Uso

### Marcar um hábito como concluído

Acesse a URL `/api/habit?habitName=Exercise` onde `habitName` é o nome do hábito:

```bash
curl -X GET "http://localhost:3000/api/habit?habitName=Exercise"
```

### Recuperar todas as propriedades de hábitos

Acesse a URL `/api/habits` para obter todos os hábitos como checkbox:

```bash
curl -X GET "http://localhost:3000/api/habits"
```

### Gerar QR code para um hábito

Acesse a URL `/api/qrcode?habitName=Exercise` para gerar um QR code específico para o hábito:

```bash
curl -X GET "http://localhost:3000/api/qrcode?habitName=Exercise" --output Exercise.png
```

### Gerar QR codes para todos os hábitos

Acesse a URL `/api/qrcode?habitName=all` para gerar QR codes para todos os hábitos:

```bash
curl -X GET "http://localhost:3000/api/qrcode?habitName=all" --output qrcodes.zip
```

## Uso / Documentação Swagger

Visite a URL `/api-docs` para saber mais sobre os endpoints da API:

```bash
curl -X GET "http://localhost:3000/api-docs"
```

## Configuração do Docker

### Pré-requisitos

Certifique-se de que o Docker está instalado em sua máquina. Você pode baixar e instalar o Docker a partir do [site oficial do Docker](https://www.docker.com/get-started).

### Configuração do Docker

1. **Construa a Imagem Docker**

   Execute o seguinte comando para construir a imagem Docker:

   ```bash
   docker build -t notion-habits-api .
   ```

   Este comando constrói a imagem Docker e a marca como `notion-habits-api`.
   <br>

2. **Execute o Container Docker**

   Execute o seguinte comando para iniciar um container a partir da imagem construída:

   ```bash
   docker run -p 8080:8080 --env-file .env my-notion-habits-api
   ```

   - `-p 8080:8080` mapeia a porta `8080` do container para a porta `8080` no seu host.
   - `--env-file .env` carrega variáveis de ambiente do arquivo `.env`.
   - `my-notion-habits-api` é o nome da imagem Docker.

## Continuous Deployment (CD)

Este projeto utiliza Google Cloud Run e Google Cloud Build para Continuous Deployment (CD), configurado diretamente através da interface do Google Cloud Platform (GCP).

### Google Cloud Run

- **Hospedagem**: A API é hospedada no Google Cloud Run, permitindo a execução de contêineres em uma infraestrutura gerenciada pela Google, garantindo alta escalabilidade e disponibilidade.
- **Escalabilidade**: A plataforma escala automaticamente com base na demanda, sem necessidade de intervenção manual.

### Google Cloud Build

- **Construção de Imagens**: Utiliza Google Cloud Build para construir e enviar imagens Docker para o Google Container Registry (GCR).
- **Pipeline Automatizado**: Configurado para acionar o processo de build e deploy automaticamente quando uma nova versão é lançada no repositório.

### Processo de CD

1. **Configuração do Build Trigger**:

   - Configurado na interface do GCP, o Cloud Build é acionado automaticamente quando uma nova tag de release é criada no repositório GitHub.

2. **Construção da Imagem Docker**:

   - O Cloud Build utiliza um `Dockerfile` presente no repositório para construir a imagem da aplicação.

3. **Deploy para o Cloud Run**:
   - Após a construção, a imagem Docker é enviada para o Google Container Registry e, em seguida, o Google Cloud Run é atualizado com a nova imagem.

### Configuração dos Segredos

As seguintes variáveis de ambiente foram configuradas diretamente no Google Cloud Platform:

- **NOTION_TOKEN**: Token de acesso ao Notion.
- **NOTION_DATABASE_ID**: ID do banco de dados no Notion.

Estas configurações garantem que a API possui as credenciais necessárias para acessar e atualizar dados no Notion.

## Apple Shortcut

Foi criado um Apple Shortcut para facilitar e agilizar a interação com a API diretamente do dispositivo iOS.

### Funcionalidades

1. **Listar Hábitos**:

   - Faz uma requisição à API para obter a lista de hábitos.
   - Apresenta os hábitos em uma lista para o usuário selecionar um.

2. **Marcar Hábito como Concluído**:
   - Com o hábito selecionado pelo usuário, faz uma nova requisição à API para marcá-lo como concluído.

### Processo do Atalho

- **Requisição de Listagem**: Faz uma requisição GET para o endpoint `/api/habits`.
- **Apresentação de Lista**: Transforma a resposta JSON em uma lista de opções para o usuário.
- **Requisição de Marcação**: Envia uma requisição GET para o endpoint `/api/habit`, passando o nome do hábito como parâmetro de query.

### Implementação

O atalho é implementado diretamente no aplicativo Atalhos (Shortcuts) do iOS, proporcionando uma maneira intuitiva e eficiente para gerenciar hábitos diários.

### Vídeo Demonstrativo

Veja o vídeo abaixo para um exemplo de uso do Apple Shortcut:

[![Apple Shortcut Demonstration](https://img.youtube.com/vi/<YOUR_VIDEO_ID>/0.jpg)](https://www.youtube.com/watch?v=<YOUR_VIDEO_ID>)
