# 🚨 Sistema de Denúncias Online

Um sistema web para denúncias anônimas com fila de moderação automática. Permite que usuários reportem violência, assédio e discriminação de forma segura e sem burocracia.

---

## 🏗️ Arquitetura do Projeto

O projeto é dividido em:

### **Frontend** (React + Vite)
- Responsável por toda a interface do usuário
- Localizado em: `frontend/`
- Stack: React, JSX, CSS puro

### Estrutura do Frontend

```
frontend/src/
├── componentes/
│   ├── Banner/          # Cabeçalho do site
│   ├── Botao/           # Componente de botão
│   ├── Historia/        # Seção "Por que denunciar?"
│   ├── Navbar/          # Navegação (scroll para seções)
│   ├── Paienel/         # Visualização do uso de lista do site
│   └── Triagem/         # Seção onde é realizado o sistema de triagem 
├── App.jsx              # Componente raiz
├── fila.js              # Fila de moderação (Queue)
└── main.jsx             # Ponto de entrada
```

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Node.js (v16+)
- npm ou yarn

### Instalação e Execução

1. **Navegue até a pasta do frontend:**
   ```bash
   cd frontend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse no navegador:**
   ```
   http://localhost:5173/AEP-2026/
   ```

---

## 📋 Como Funciona

### Fluxo de Denúncias

1. **Usuário acessa o site** → Vê o banner e a navegação
2. **Clica em "Por que denúnciar?"** → Scroll para seção Historia com informações
3. **Responde um simples questionario** → Scroll para o sistema de triagem 
4. **Preenche o questionario:**
   - Nome (opcional - vira "Anônimo" se não preencher)
   - Marca X nos campos convenientes
5. **Clica em "Enviar e ver encaminhamento"** → Respostas entram na fila e baseado nelas informa o local de denunciar e para ler mais sobre
6. **Sistema mostra mensagem de recomendação** Informa site para se informar e informa site e telefone para denunciar

### Fila de Moderação

- Cada resposta é armazenada em uma `Queue` (estrutura de dados FIFO)
- Um número de protocolo único (001, 002, 003...) é gerado para cada envio

### Navegação

- **Botão "Por que denúnciar?"** → Leva até a seção Historia
- **Botão "Verifique onde denunciar!"** → Leva até o formulário
- **Botão "Lista de encaminhamentos realizados"** → Lista uma quantidade base de denuncias já informadas e registra as novas

### Componentes Principais

- **Banner**: Cabeçalho com imagem e título, contém o Navbar
- **Navbar**: Navegação com 3 botões (cores: azul #081534, texto branco)
- **Historia**: Explica por que denunciar
- **Triagem**: Coleta dados do usuário pelo formulario
- **Painel**: Retona a fila criada

---

## 🎨 Estilo Visual

- **Cor principal:** #081534 (azul escuro - banner e navbar)
- **Destaque:** #FFFB99 (amarelo - "ONLINE" no banner)
- **Cards/Inputs:** Fundo branco com sombra (`box-shadow: 10px 10px 30px rgba(0, 0, 0)`)
- **Fonte:** Arial, sans-serif
- **Separadores no Navbar:** Pipe "|" entre botões
