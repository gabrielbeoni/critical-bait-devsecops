/* ============================================================
   CRITICAL BAIT — Contas, autenticacao e seguranca
   SIMULACAO EDUCACIONAL CLIENT-SIDE

   IMPORTANTE: localStorage e dados do navegador sao controlados
   pelo visitante. Este modulo NAO oferece autenticacao real,
   autorizacao confiavel ou protecao de dados sensiveis.
   ============================================================ */

window.CB = window.CB || {};

/* ---------- Base64 <-> bytes ---------- */
function _b2b64(bytes) {
  let s = "";
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s);
}

function _b64b(str) {
  const bin = atob(str);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

/* ---------- Banco de dados local (somente demonstracao) ---------- */
CB.DB = {
  KEY: "criticalbait.db.v2",

  data: {
    users: {},
    currentEmail: null,
    contentMissions: {},
    securityLog: []
  },

  load: function () {
    // Restabelece um estado valido mesmo se o armazenamento estiver corrompido.
    this.data = {
      users: {},
      currentEmail: null,
      contentMissions: {},
      securityLog: []
    };

    try {
      const raw = localStorage.getItem(this.KEY);
      if (raw) {
        const stored = JSON.parse(raw);
        if (stored && typeof stored === "object" && !Array.isArray(stored)) {
          this.data.users = stored.users && typeof stored.users === "object" &&
            !Array.isArray(stored.users) ? stored.users : {};
          this.data.currentEmail = typeof stored.currentEmail === "string" ?
            stored.currentEmail : null;
          this.data.contentMissions = stored.contentMissions &&
            typeof stored.contentMissions === "object" &&
            !Array.isArray(stored.contentMissions) ? stored.contentMissions : {};
          this.data.securityLog = Array.isArray(stored.securityLog) ?
            stored.securityLog : [];
        }
      }
    } catch (e) {
      console.warn("Falha ao carregar dados locais do Critical Bait.");
    }
  },

  save: function () {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(this.data));
    } catch (e) {
      console.warn("Nao foi possivel salvar os dados locais.");
    }
  },

  newUser: function (p) {
    return {
      email: p.email,
      name: p.name,
      dept: p.dept,
      role: p.role,
      branch: p.branch,
      avatar: p.avatar || "🐟",
      isAdmin: !!p.isAdmin,
      seed: !!p.seed,
      auth: p.auth || null,
      xp: p.xp || 0,
      coins: p.coins || 0,
      badges: [],
      streak: 0,
      bestStreak: 0,
      totalPlays: 0,
      missions: {},
      daily: { lastClaim: null, streak: 0 },
      inventory: { frames: [], titles: [] },
      equipped: { frame: null, title: null },
      visited: {},
      lockout: { fails: 0, until: 0 },
      createdAt: Date.now()
    };
  },

  allUsers: function () {
    return Object.keys(this.data.users).map((key) => this.data.users[key]);
  },

  players: function () {
    return this.allUsers().filter((u) => u && !u.isAdmin);
  },

  seed: function () {
    this.load();
    let changed = false;
    const self = this;

    // Mantem os usuarios e rankings demonstrativos existentes.
    if (Array.isArray(CB.SEED_USERS) && typeof CB.allMissions === "function") {
      CB.SEED_USERS.forEach(function (s) {
        const email = String(s.name).toLowerCase() + "@leroymerlin.com";
        if (!self.data.users[email]) {
          const u = self.newUser({
            email: email,
            name: s.name,
            dept: s.dept,
            role: s.role,
            branch: s.branch,
            avatar: s.avatar,
            xp: s.xp,
            seed: true
          });
          u.onboardingDone = true;
          CB.allMissions().forEach(function (mi) {
            const base = (CB.BASE_ACCURACY && CB.BASE_ACCURACY[mi.id]) || 65;
            const acc = Math.max(25, Math.min(100,
              base + Math.floor(Math.random() * 30) - 15));
            u.missions[mi.id] = {
              plays: 1 + Math.floor(Math.random() * 4),
              completed: true,
              bestAccuracy: acc
            };
          });
          u.coins = Math.floor((s.xp || 0) / 8);
          self.data.users[email] = u;
          changed = true;
        }
      });
    }

    // Nunca mantem credenciais de administrador armazenadas em texto puro.
    if (typeof CB.ADMIN_EMAIL === "string") {
      const existingAdmin = this.data.users[CB.ADMIN_EMAIL];
      if (existingAdmin && existingAdmin.auth && existingAdmin.auth.algo === "plain") {
        existingAdmin.auth = null;
        changed = true;
      }
    }

    if (changed) this.save();
  }
};

/* ---------- Registro demonstrativo de eventos ---------- */
CB.Security = {
  // Nao apresenta este stub como um WAF ou protecao real.
  guard: function () {
    return { blocked: false };
  },

  record: function (type, details) {
    if (!CB.DB || !CB.DB.data) return;
    if (!Array.isArray(CB.DB.data.securityLog)) CB.DB.data.securityLog = [];
    CB.DB.data.securityLog.push({
      type: String(type || "event").slice(0, 80),
      details: String(details || "").slice(0, 200),
      at: Date.now()
    });
    if (CB.DB.data.securityLog.length > 100) {
      CB.DB.data.securityLog = CB.DB.data.securityLog.slice(-100);
    }
    CB.DB.save();
  },

  scan: function () {
    return { blocked: false };
  }
};

/* ---------- Autenticacao demonstrativa ---------- */
CB.Auth = {
  LOCK_TRIES: 5,
  LOCK_MS: 60000,
  PBKDF2_ITERATIONS: 120000,

  validateEmailDomain: function (email) {
    const e = String(email || "").trim().toLowerCase();
    return /^[^\s@]+@gmail\.com(?:\.br)?$/.test(e);
  },

  // Novo formato: 120 mil iteracoes, salt aleatorio de 16 bytes.
  // Formatos legados sao verificados separadamente, sem enfraquecer novos cadastros.
  hashPassword: async function (password, saltB64, iterations) {
    if (!window.crypto || !window.crypto.subtle ||
        typeof window.TextEncoder === "undefined") {
      throw new Error("Web Crypto indisponivel. Acesse via HTTPS ou localhost.");
    }

    const rounds = iterations === 10000 ? 10000 : this.PBKDF2_ITERATIONS;
    const salt = saltB64 ? _b64b(saltB64) :
      window.crypto.getRandomValues(new Uint8Array(16));
    const keyMaterial = await window.crypto.subtle.importKey(
      "raw", new TextEncoder().encode(String(password)), "PBKDF2", false,
      ["deriveBits"]
    );
    const bits = await window.crypto.subtle.deriveBits(
      { name: "PBKDF2", salt: salt, iterations: rounds, hash: "SHA-256" },
      keyMaterial, 256
    );
    return {
      salt: _b2b64(salt),
      hash: _b2b64(new Uint8Array(bits)),
      algo: rounds === 10000 ? "PBKDF2-SHA256-10k" : "PBKDF2-SHA256-120k"
    };
  },

  // Compatibilidade com a versao anterior, que usava um hash DJB2 fraco.
  // Somente verifica registros ja existentes; nunca gera novos hashes fracos.
  _verifyLegacyWeak: function (password, auth) {
    if (!auth || typeof auth.salt !== "string" ||
        typeof auth.hash !== "string") return false;
    let h = 5381;
    const s = auth.salt + String(password);
    for (let i = 0; i < s.length; i++) {
      h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
    }
    return String(h) === auth.hash;
  },

  verifyPassword: async function (password, auth) {
    if (!auth || typeof auth !== "object" ||
        typeof auth.salt !== "string" || typeof auth.hash !== "string") {
      return false;
    }
    if (auth.algo === "weak-fallback") {
      return this._verifyLegacyWeak(password, auth);
    }
    if (auth.algo !== "PBKDF2-SHA256-120k" &&
        auth.algo !== "PBKDF2-SHA256-10k") return false;

    // A versao antiga rotulava 10k incorretamente como 120k.
    const candidate = await this.hashPassword(password, auth.salt,
      auth.algo === "PBKDF2-SHA256-10k" ? 10000 : 120000);
    if (candidate.hash === auth.hash) return true;
    if (auth.algo === "PBKDF2-SHA256-120k") {
      const legacy = await this.hashPassword(password, auth.salt, 10000);
      return legacy.hash === auth.hash;
    }
    return false;
  },

  passwordStrengthError: function (pw) {
    if (typeof pw !== "string" || pw.length < 8) {
      return "A senha deve ter pelo menos 8 caracteres.";
    }
    if (!/[a-z]/.test(pw) || !/[A-Z]/.test(pw)) {
      return "Use letras maiusculas e minusculas.";
    }
    if (!/[0-9]/.test(pw)) {
      return "Inclua pelo menos um numero.";
    }
    if (/^(senha|password|123|qwerty|leroy|admin)/i.test(pw)) {
      return "Evite senhas obvias.";
    }
    return null;
  },

  register: async function (p) {
    p = p || {};
    const email = String(p.email || "").trim().toLowerCase();
    const name = String(p.name || "").trim();
    const g = CB.Security.guard({
      nome: name, email: email, departamento: p.dept,
      funcao: p.role, filial: p.branch
    }, email);
    if (g.blocked) return { ok: false, error: "Entrada bloqueada." };
    if (!name) return { ok: false, error: "Informe seu nome." };
    if (!this.validateEmailDomain(email)) {
      return { ok: false,
        error: "Use um e-mail @gmail.com ou @gmail.com.br para se cadastrar." };
    }
    if (CB.DB.data.users[email]) {
      return { ok: false, error: "Este e-mail ja possui cadastro." };
    }
    const pwErr = this.passwordStrengthError(p.password);
    if (pwErr) return { ok: false, error: pwErr };
    if (!p.dept || !p.role || !p.branch) {
      return { ok: false, error: "Selecione departamento, funcao e filial." };
    }

    let auth;
    try {
      auth = await this.hashPassword(p.password);
    } catch (e) {
      return { ok: false, error: "Cadastro indisponivel: e necessario HTTPS ou localhost." };
    }
    const user = CB.DB.newUser({
      email: email, name: name, dept: p.dept, role: p.role,
      branch: p.branch, avatar: p.avatar || "🐟", auth: auth
    });
    CB.DB.data.users[email] = user;
    CB.DB.data.currentEmail = email;
    CB.DB.save();
    return { ok: true, user: user };
  },

  login: async function (email, password) {
    email = String(email || "").trim().toLowerCase();
    const g = CB.Security.guard({ email: email, senha: password }, email);
    if (g.blocked) return { ok: false, error: "Login bloqueado." };
    const user = CB.DB.data.users[email];
    if (!user || !user.auth) {
      return { ok: false, error: "E-mail ou senha invalidos." };
    }
    const now = Date.now();
    if (user.lockout && user.lockout.until > now) {
      const wait = Math.ceil((user.lockout.until - now) / 1000);
      return { ok: false, locked: true,
        error: "Conta temporariamente bloqueada. Aguarde " + wait + "s." };
    }

    let ok = false;
    try {
      ok = await this.verifyPassword(password, user.auth);
    } catch (e) {
      return { ok: false, error: "Verificacao indisponivel: use HTTPS ou localhost." };
    }
    if (!ok) {
      user.lockout = user.lockout || { fails: 0, until: 0 };
      user.lockout.fails += 1;
      if (user.lockout.fails >= this.LOCK_TRIES) {
        user.lockout.until = now + this.LOCK_MS;
        user.lockout.fails = 0;
        CB.DB.save();
        CB.Security.record("login_lockout", email);
        return { ok: false, locked: true,
          error: "Muitas tentativas! Conta bloqueada por " +
            (this.LOCK_MS / 1000) + "s." };
      }
      const left = this.LOCK_TRIES - user.lockout.fails;
      CB.DB.save();
      return { ok: false,
        error: "E-mail ou senha invalidos. Tentativas restantes: " + left + "." };
    }

    // Migra hashes antigos somente apos a verificacao bem-sucedida.
    // Uma falha na migracao nao invalida um login que ja foi validado.
    try {
      const expected = await this.hashPassword(password, user.auth.salt, 120000);
      if (user.auth.algo !== "PBKDF2-SHA256-120k" ||
          user.auth.hash !== expected.hash) {
        user.auth = await this.hashPassword(password);
      }
    } catch (e) {
      console.warn("Nao foi possivel migrar o hash legado.");
    }
    user.lockout = { fails: 0, until: 0 };
    CB.DB.data.currentEmail = email;
    CB.DB.save();
    return { ok: true, user: user };
  },

  changePassword: async function (oldPw, newPw) {
    const user = this.current();
    if (!user) return { ok: false, error: "Sessao expirada." };
    const g = CB.Security.guard({ senha_atual: oldPw, nova_senha: newPw }, user.email);
    if (g.blocked) return { ok: false, error: "Operacao bloqueada." };

    let ok;
    try {
      ok = await this.verifyPassword(oldPw, user.auth);
    } catch (e) {
      return { ok: false, error: "Verificacao indisponivel: use HTTPS ou localhost." };
    }
    if (!ok) return { ok: false, error: "Senha atual incorreta." };
    const pwErr = this.passwordStrengthError(newPw);
    if (pwErr) return { ok: false, error: pwErr };
    if (await this.verifyPassword(newPw, user.auth)) {
      return { ok: false, error: "A nova senha deve ser diferente da atual." };
    }
    try {
      user.auth = await this.hashPassword(newPw);
    } catch (e) {
      return { ok: false, error: "Alteracao indisponivel: use HTTPS ou localhost." };
    }
    CB.DB.save();
    return { ok: true };
  },

  current: function () {
    const email = CB.DB.data.currentEmail;
    return email && CB.DB.data.users[email] ? CB.DB.data.users[email] : null;
  },

  isAdmin: function (u) {
    // Apenas controla a interface demonstrativa, NAO autoriza operacoes reais.
    u = u || this.current();
    return !!(u && u.isAdmin);
  },

  logout: function () {
    CB.DB.data.currentEmail = null;
    CB.DB.save();
  }
};
