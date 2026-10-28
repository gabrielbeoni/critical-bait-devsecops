# 🏗️ Arquitetura Técnica — Critical Bait

## Visão Geral

Aplicação **100% client-side** (HTML + CSS + JavaScript vanilla), sem dependências externas, sem build step, sem framework. Roda direto no navegador via `file://` ou qualquer servidor estático.

```
┌─────────────────────────────────────────────────┐
│                   NAVEGADOR                      │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │  LOGIN   │→ │  MÓDULO  │→ │   PATH   │      │
│  │ (auth.js)│  │ (app.js) │  │(games.js)│      │
│  └──────────┘  └──────────┘  └──────────┘      │
│       │              │             │             │
│       ▼              ▼             ▼             │
│  ┌─────────────────────────────────────────┐    │
│  │            STATE (state.js)              │    │
│  │     XP · Níveis · Badges · Ranking      │    │
│  └─────────────────────────────────────────┘    │
│       │                                         │
│       ▼                                         │
│  ┌─────────────────────────────────────────┐    │
│  │          localStorage (DB)               │    │
│  │   Usuários · Progresso · Conteúdo admin  │    │
│  └─────────────────────────────────────────┘    │
│                                                  │
│  ┌──────────┐  ┌──────────┐                     │
│  │  ADMIN   │  │   DATA   │ (conteúdo estático) │
│  │(admin.js)│  │ (data.js)│                     │
│  └──────────┘  └──────────┘                     │
└─────────────────────────────────────────────────┘
```

## Responsabilidade de cada arquivo

| Arquivo | Responsabilidade | Dependências |
|---------|-----------------|--------------|
| `data.js` | Todo o conteúdo: módulos, missões, e-mails, quizzes, cenários, badges, seed users | Nenhuma |
| `auth.js` | Banco (localStorage), autenticação, PBKDF2, WAF, brute force | `data.js` |
| `state.js` | XP, níveis, badges, ranking, missões completadas, daily streak | `data.js`, `auth.js` |
| `games.js` | Motor de jogos, renderização de exercícios, cronômetro, anti-cópia | `data.js`, `state.js` |
| `admin.js` | Painel administrativo, gestão de usuários e conteúdo | `data.js`, `auth.js`, `state.js` |
| `app.js` | Interface principal, navegação, views, onboarding | Todos os anteriores |

## Ordem de carregamento

```html
<script src="assets/js/data.js"></script>    <!-- 1. Conteúdo -->
<script src="assets/js/auth.js"></script>    <!-- 2. DB + Auth -->
<script src="assets/js/state.js"></script>   <!-- 3. Estado -->
<script src="assets/js/games.js"></script>   <!-- 4. Jogos -->
<script src="assets/js/admin.js"></script>   <!-- 5. Admin -->
<script src="assets/js/app.js"></script>     <!-- 6. App (init) -->
```

A ordem importa: cada script depende dos anteriores já estarem carregados no objeto global `window.CB`.

## Fluxo de dados

1. **Login** → `auth.js` valida domínio, verifica hash, controla brute force
2. **Módulo** → `app.js` renderiza os 6 temas teóricos com quiz inline
3. **Path** → `app.js` renderiza a trilha, `games.js` roda os exercícios
4. **XP/Badges** → `state.js` calcula e persiste no localStorage
5. **Admin** → `admin.js` lê/escreve no mesmo localStorage

## Segurança

- **Senhas**: PBKDF2-SHA256 (10k iterações) via Web Crypto API para novos cadastros
- **Admin demo**: senha em texto plano (campo `auth.plain`) — apenas para demo
- **WAF**: regex para SQLi e XSS, registra tentativas no log
- **CSP**: Content Security Policy no `<meta>` do HTML
- **Anti-cópia**: event listeners bloqueiam copy/paste/select nos exercícios

## Persistência

Tudo em `localStorage` sob a chave `criticalbait.db.v3`. Estrutura:

```json
{
  "users": { "email@...": { "xp": 0, "badges": [], "missions": {}, ... } },
  "securityLog": [],
  "currentEmail": null,
  "contentQuiz": {}
}
```
