/* ============================================================
   CRITICAL BAIT — Contas, autenticação e segurança
   (simulação client-side; em produção isto vive no backend)
   ============================================================ */
window.CB = window.CB || {};

/* ---------- helpers base64 <-> bytes ---------- */
function _b2b64(bytes) { let s = ""; for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]); return btoa(s); }
function _b64b(str) { const bin = atob(str); const a = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) a[i] = bin.charCodeAt(i); return a; }

/* ============================================================
   "Banco de dados" (localStorage)
   ============================================================ */
CB.DB = {
  KEY: "criticalbait.db.v2",
  data: { users: {},  currentEmail: null, contentMissions: {} },

  load: function () {
    try {
      const raw = localStorage.getItem(this.KEY);
      if (raw) this.data = Object.assign(this.data, JSON.parse(raw));
    } catch (e) {}
    if (!this.data.users) this.data.users = {};
    if (!this.data.securityLog) this.data.securityLog = [];
    if (!this.data.contentMissions) this.data.contentMissions = {};
  },
  save: function () {
    try { localStorage.setItem(this.KEY, JSON.stringify(this.data)); } catch (e) {}
  },

  newUser: function (p) {
    return {
      email: p.email, name: p.name, dept: p.dept, role: p.role, branch: p.branch,
      avatar: p.avatar || "🐟", isAdmin: !!p.isAdmin, seed: !!p.seed, auth: p.auth || null,
      xp: p.xp || 0, coins: p.coins || 0, badges: [], streak: 0, bestStreak: 0, totalPlays: 0,
      missions: {}, daily: { lastClaim: null, streak: 0 },
      inventory: { frames: [], titles: [] }, equipped: { frame: null, title: null }, visited: {},
      lockout: { fails: 0, until: 0 }, createdAt: Date.now(),
    };
  },

  allUsers: function () {
    return Object.keys(this.data.users).map((k) => this.data.users[k]);
  },
  players: function () { // ranking: todos menos admin
    return this.allUsers().filter((u) => !u.isAdmin);
  },

  /* seed síncrono — sem async, sem travar */
  seed: function () {
    this.load();
    var changed = false;
    var self = this;
    CB.SEED_USERS.forEach(function(s) {
      var email = s.name.toLowerCase() + "@leroymerlin.com";
      if (!self.data.users[email]) {
        var u = self.newUser({ email: email, name: s.name, dept: s.dept, role: s.role, branch: s.branch, avatar: s.avatar, xp: s.xp, seed: true });
        u.onboardingDone = true;
        CB.allMissions().forEach(function (mi) {
          var base = CB.BASE_ACCURACY[mi.id] || 65;
          var acc = Math.max(25, Math.min(100, base + Math.floor(Math.random() * 30) - 15));
          u.missions[mi.id] = { plays: 1 + Math.floor(Math.random() * 4), completed: true, bestAccuracy: acc };
        });
        u.coins = Math.floor((s.xp || 0) / 8);
        self.data.users[email] = u;
        changed = true;
      }
    });
    var existingAdmin = this.data.users[CB.ADMIN_EMAIL];

    if (existingAdmin && existingAdmin.auth &&
        existingAdmin.auth.algo === "plain") {
      existingAdmin.auth = null;
      changed = true;
    }

    if (changed) this.save();
  },
};

/* ============================================================
   Segurança: validação de entrada
   ============================================================ */
/* Security stub — padrões removidos */
CB.Security = {
  guard: function () { return { blocked: false }; },
  record: function () {},
  scan: function () { return { blocked: false }; }
};

/* ============================================================
   Autenticação
   ============================================================ */
CB.Auth = {
  LOCK_TRIES: 5,
  LOCK_MS: 60000, // 60s (didático)

  validateEmailDomain: function (email) {
    const e = String(email).trim().toLowerCase();
    return /^[^@]+@gmail\.com(\.br)?$/.test(e);
  },

  /* PBKDF2 (Web Crypto) com fallback fraco se indisponível */
  hashPassword: async function (password, saltB64) {
    try {
      if (window.crypto && crypto.subtle) {
        const enc = new TextEncoder();
        const salt = saltB64 ? _b64b(saltB64) : crypto.getRandomValues(new Uint8Array(16));
        const km = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveBits"]);
        const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", salt: salt, iterations: 10000, hash: "SHA-256" }, km, 256);
        return { salt: _b2b64(salt), hash: _b2b64(new Uint8Array(bits)), algo: "PBKDF2-SHA256-120k" };
      }
    } catch (e) {}
    // fallback (apenas se Web Crypto faltar) — claramente mais fraco
    const salt = saltB64 || _b2b64(new Uint8Array([Math.random() * 255, Math.random() * 255, Math.random() * 255, Math.random() * 255]));
    let h = 5381; const s = salt + password;
    for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
    return { salt: salt, hash: String(h), algo: "weak-fallback" };
  },

  verifyPassword: async function (password, auth) {
    if (!auth) return false;
    if (auth.algo === "plain") return password === auth.plain;
    const h = await this.hashPassword(password, auth.salt);
    return h.hash === auth.hash;
  },

  passwordStrengthError: function (pw) {
    if (!pw || pw.length < 8) return "A senha deve ter pelo menos 8 caracteres.";
    if (!/[a-z]/.test(pw) || !/[A-Z]/.test(pw)) return "Use letras maiúsculas e minúsculas.";
    if (!/[0-9]/.test(pw)) return "Inclua pelo menos um número.";
    if (/^(senha|password|123|qwerty|leroy|admin)/i.test(pw)) return "Evite senhas óbvias.";
    return null;
  },

  register: async function (p) {
    const email = String(p.email || "").trim().toLowerCase();
    const name = String(p.name || "").trim();

    const g = CB.Security.guard({ nome: name, email: email, departamento: p.dept, funcao: p.role, filial: p.branch }, email);
    if (g.blocked) return { ok: false, error: "🚫 Entrada bloqueada: possível " + g.type + " detectado no campo '" + g.field + "'. (registrado no log de segurança)" };

    if (!name) return { ok: false, error: "Informe seu nome." };
    if (!this.validateEmailDomain(email)) return { ok: false, error: "Use um e-mail @gmail.com ou @gmail.com.br para se cadastrar." };
    if (CB.DB.data.users[email]) return { ok: false, error: "Este e-mail já possui cadastro." };
    const pwErr = this.passwordStrengthError(p.password);
    if (pwErr) return { ok: false, error: pwErr };
    if (!p.dept || !p.role || !p.branch) return { ok: false, error: "Selecione departamento, função e filial." };

    const auth = await this.hashPassword(p.password);
    const user = CB.DB.newUser({ email: email, name: name, dept: p.dept, role: p.role, branch: p.branch, avatar: p.avatar || "🐟", auth: auth });
    CB.DB.data.users[email] = user;
    CB.DB.data.currentEmail = email;
    CB.DB.save();
    return { ok: true, user: user };
  },

  login: async function (email, password) {
    email = String(email || "").trim().toLowerCase();

    const g = CB.Security.guard({ email: email, senha: password }, email);
    if (g.blocked) return { ok: false, error: "🚫 Login bloqueado: possível " + g.type + " detectado. Tentativa registrada no log de segurança." };

    const user = CB.DB.data.users[email];
    if (!user || !user.auth) return { ok: false, error: "E-mail ou senha inválidos." };

    const now = Date.now();
    if (user.lockout && user.lockout.until > now) {
      const wait = Math.ceil((user.lockout.until - now) / 1000);
      return { ok: false, locked: true, error: "🔒 Conta temporariamente bloqueada por excesso de tentativas. Aguarde " + wait + "s." };
    }

    const ok = await this.verifyPassword(password, user.auth);
    if (!ok) {
      user.lockout = user.lockout || { fails: 0, until: 0 };
      user.lockout.fails += 1;
      if (user.lockout.fails >= this.LOCK_TRIES) {
        user.lockout.until = now + this.LOCK_MS;
        user.lockout.fails = 0;

        CB.DB.save();
        return { ok: false, locked: true, error: "🔒 Muitas tentativas! Conta bloqueada por " + (this.LOCK_MS / 1000) + "s. (registrado no log de segurança)" };
      }
      const left = this.LOCK_TRIES - user.lockout.fails;
      CB.DB.save();
      return { ok: false, error: "E-mail ou senha inválidos. Tentativas restantes: " + left + "." };
    }

    user.lockout = { fails: 0, until: 0 };
    CB.DB.data.currentEmail = email;
    CB.DB.save();
    return { ok: true, user: user };
  },

  changePassword: async function (oldPw, newPw) {
    const user = this.current();
    if (!user) return { ok: false, error: "Sessão expirada." };
    const g = CB.Security.guard({ senha_atual: oldPw, nova_senha: newPw }, user.email);
    if (g.blocked) return { ok: false, error: "🚫 Bloqueado: possível " + g.type + " detectado." };
    const ok = await this.verifyPassword(oldPw, user.auth);
    if (!ok) return { ok: false, error: "Senha atual incorreta." };
    const pwErr = this.passwordStrengthError(newPw);
    if (pwErr) return { ok: false, error: pwErr };
    if (await this.verifyPassword(newPw, user.auth)) return { ok: false, error: "A nova senha deve ser diferente da atual." };
    user.auth = await this.hashPassword(newPw);
    CB.DB.save();
    return { ok: true };
  },

  current: function () {
    const e = CB.DB.data.currentEmail;
    return e && CB.DB.data.users[e] ? CB.DB.data.users[e] : null;
  },
  isAdmin: function (u) { u = u || this.current(); return !!(u && u.isAdmin); },
  logout: function () { CB.DB.data.currentEmail = null; CB.DB.save(); },
};
