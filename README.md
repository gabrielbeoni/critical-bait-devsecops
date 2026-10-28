# 🛡️ Critical Bait — Leroy Merlin

**Plataforma gamificada de conscientização em cibersegurança** para colaboradores da Leroy Merlin.

Em vez de disparar phishing real, ela ensina por meio de **exercícios interativos** a reconhecer golpes de **phishing**, **engenharia social**, proteger **senhas**, cuidar de **dados sensíveis (LGPD)** e responder a **incidentes** — com XP, níveis, ranking, conquistas e painel administrativo.

> 🎓 Treinamento educativo/defensivo. Nenhum e-mail real é enviado — tudo é simulado dentro da plataforma.

---

## ▶️ Como rodar

Não precisa instalar nada (sem Node, Python ou banco de dados).

### Opção 1 — Abrir direto (mais rápido)
Dê duplo clique no `index.html`. Funciona em qualquer navegador moderno.

### Opção 2 — Servidor local (recomendado)
No PowerShell, dentro da pasta do projeto:

```powershell
powershell -ExecutionPolicy Bypass -File tools/serve.ps1
```

Acesse **http://localhost:8080** (troque a porta com `-Port 9000`).

### Opção 3 — Live Server (VS Code)
Instale a extensão **Live Server**, clique com o botão direito no `index.html` → *Open with Live Server*.

---

## 🔐 Acesso

| Tipo | E-mail | Senha |
|------|--------|-------|
| **Admin** | `admin@leroymerlin.com` | Acesso demonstrativo desativado |
| **Cadastro** | Qualquer `@gmail.com` ou `@gmail.com.br` | Mín. 8 chars, maiúscula + minúscula + número |

O cadastro exige escolher **Departamento**, **Função** e **Filial**. Os dados são salvos no navegador (`localStorage`).

---

## 📚 Estrutura da Plataforma

### Módulo de Treinamento (teoria)
6 temas fundamentais que todo colaborador completa antes de acessar os exercícios práticos:

| # | Tema | Conceito |
|---|------|----------|
| 1 | 🎣 Phishing | O que é, como identificar |
| 2 | 🎭 Engenharia Social | Táticas de manipulação |
| 3 | 🔐 Senhas & 2FA | Força de senha, autenticação |
| 4 | 🦠 Malware | Vírus, ransomware, pen drives |
| 5 | 🗄️ LGPD | Proteção de dados pessoais |
| 6 | 🧹 Mesa Limpa | Segurança física na loja |

### Path de Treinamento (prática) — 10 módulos, 37 exercícios

| Dificuldade | Módulo | Exercícios |
|-------------|--------|------------|
| 🟢 Iniciante | Mesa Limpa | Varredura na Loja · Crachá, Tela e Gaveta · Visitante Inesperado |
| 🟢 Iniciante | Senhas & Acessos | Senha Fraca ou Forte? · Forje sua Frase-Senha · Cadê meu 2FA? · Compartilhou, Perdeu |
| 🟡 Intermediário | Caça ao Phishing | Inbox Suspeito · Smishing & WhatsApp · Detector de Links · Quem Mandou Isso? |
| 🟡 Intermediário | Golpes do Dia a Dia | PIX Armadilha · Boleto Adulterado · WhatsApp Clonado · Promoção Boa Demais |
| 🟡 Intermediário | E-mail Corporativo | Anexo ou Armadilha? · Responder a Todos · Encaminhei Errado |
| 🟡 Intermediário | Dados & LGPD | LGPD no Balcão · Classificação de Dados · Descarte Seguro · Quem Pode Ver? |
| 🔴 Avançado | Defesa contra Malware | Alerta de Malware · Pen Drive Perdido · Atualizou ou Arriscou? · Download Seguro? |
| 🔴 Avançado | Cenários Reais | A Ligação Falsa · O Chefe Mandou · O Fornecedor Urgente · Ajuda Demais |
| 🔴 Avançado | Trabalho Remoto & Wi-Fi | Wi-Fi de Shopping · Notebook na Mochila · Reunião Online · VPN: Por Quê? |
| 💀 Especialista | Quando Deu Ruim | Cliquei no Link! · Reportar Sem Medo · Ransomware na Tela |

### Sistema de Progressão

| Recurso | Detalhes |
|---------|----------|
| **XP** | Escalonado por dificuldade: 🟢40 · 🟡60 · 🔴85 · 💀120 por acerto |
| **20 Níveis** | Recruta → Aprendiz Cyber → Analista → Guardião → Hacker Elite → Mestre Cyber |
| **30 Conquistas** | 9 de missão · 5 de progressão · 6 de desempenho · 4 de ranking · 6 secretas |
| **Ranking** | Individual (top 10 + posição) e por Filial (XP total, membros, nível médio) |
| **36 Avatares** | Selecionáveis no perfil com picker visual |
| **Badges em destaque** | Até 3 conquistas fixadas no perfil |

---

## 🛠️ Painel Administrativo

| Aba | Funcionalidade |
|-----|----------------|
| **Visão Geral** | Colaboradores, missões concluídas, nível médio, ameaças bloqueadas, filial líder, missões com pior desempenho |
| **Usuários** | Lista completa (admins + membros), alterar tipo (Admin ↔ Membro), zerar progresso, remover |
| **Missões** | Desempenho médio por missão, ranking das mais jogadas |
| **Conteúdo** | Criar novas perguntas de quiz (aparecem imediatamente nos jogos), remover perguntas criadas |
| **Segurança** | Log de tentativas de SQL Injection, XSS e brute force |

---

## 🔒 Segurança (educativa)

| Proteção | Implementação | Como testar |
|----------|---------------|-------------|
| **XSS** | Escape de conteúdo dinâmico + CSP | Tentar `<script>` em campos → bloqueado |
| **Senhas** | Hash PBKDF2-SHA256 via Web Crypto (novos usuários) | Inspecionar localStorage: só salt+hash |
| **Brute force** | Bloqueio após 5 tentativas (60s) | Errar a senha 5x |
| **SQL Injection** | WAF educativo detecta e registra payloads | Login com `' OR 1=1 --` → log de segurança |
| **Anti-cópia** | Bloqueio de copy/paste/select nos exercícios | Tentar Ctrl+C durante um quiz |
| **Cronômetro** | Timer por pergunta (18-30s conforme dificuldade) | Deixar o tempo esgotar |

---

## 🗂️ Estrutura do Repositório

```
critical-bait/
│
├── index.html                  # Página principal (login + aplicação)
│
├── assets/
│   ├── css/
│   │   └── styles.css          # Tema Leroy Merlin (verde + cyber neon)
│   │
│   ├── js/
│   │   ├── data.js             # Conteúdo: módulos, missões, quizzes, cenários, e-mails
│   │   ├── auth.js             # Autenticação, PBKDF2, brute force, WAF
│   │   ├── state.js            # XP, níveis, conquistas, ranking
│   │   ├── games.js            # Motor de jogos, cronômetro, anti-cópia
│   │   ├── admin.js            # Painel administrativo
│   │   └── app.js              # Interface, navegação, views
│   │
│   └── images/                 # Imagens e ícones (futuro)
│
├── docs/
│   ├── ARCHITECTURE.md         # Arquitetura técnica
│   └── CHANGELOG.md            # Histórico de versões
│
├── tools/
│   └── serve.ps1               # Servidor local (PowerShell)
│
├── .gitignore
├── LICENSE
└── README.md                   # Este arquivo
```

---

## ✏️ Personalizar Conteúdo

| O quê | Onde |
|-------|------|
| Módulos e missões | `assets/js/data.js` → `CB.MODULES` |
| E-mails de phishing | `assets/js/data.js` → `CB.EMAILS` |
| Perguntas de quiz | `assets/js/data.js` → `CB.QUIZZES` (ou via painel admin) |
| Cenários de engenharia social | `assets/js/data.js` → `CB.SCENARIOS` |
| Cores e tema | `assets/css/styles.css` → variáveis CSS no topo |
| Curva de XP | `assets/js/state.js` → `CB.xpToNext()` |
| Domínios de e-mail permitidos | `assets/js/data.js` → `CB.EMAIL_DOMAINS` |
| Filiais e departamentos | `assets/js/data.js` → `CB.BRANCHES` / `CB.DEPARTMENTS` |

---

## 👥 Equipe

**CRITICAL BAIT** — Projeto de conscientização em cibersegurança para a campanha Leroy Merlin.

---

## 📄 Licença

Uso educacional. Desenvolvido como projeto acadêmico de cibersegurança.
