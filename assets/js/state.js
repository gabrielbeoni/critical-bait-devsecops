/* ============================================================
   CRITICAL BAIT — Estado por usuário, XP/níveis, ranking
   Opera sobre o usuário logado (CB.Auth.current()).
   ============================================================ */
window.CB = window.CB || {};

CB.save = function () { CB.DB.save(); };

/* usuário atual (com fallback seguro p/ evitar erros) */
CB._guest = { name:"Convidado",email:"",dept:"—",role:"—",branch:"—",avatar:"🐟",xp:0,badges:[],streak:0,bestStreak:0,totalPlays:0,missions:{},coins:0,_certs:[],_obSteps:[],_pinnedBadges:[],onboardingDone:false,isAdmin:false,daily:{lastClaim:null,streak:0},inventory:{frames:[],titles:[]},equipped:{frame:null,title:null},visited:{} };
CB.user = function () {
  var u = CB.Auth.current();
  if(!u) return CB._guest;
  if(!u.badges)u.badges=[];
  if(!u.missions)u.missions={};
  if(!u._certs)u._certs=[];
  if(!u._obSteps)u._obSteps=[];
  if(!u._pinnedBadges)u._pinnedBadges=[];
  if(!u.daily)u.daily={lastClaim:null,streak:0};
  if(!u.inventory)u.inventory={frames:[],titles:[]};
  if(!u.equipped)u.equipped={frame:null,title:null};
  if(!u.visited)u.visited={};
  if(u.coins==null)u.coins=0;
  if(u.totalPlays==null)u.totalPlays=0;
  if(u.streak==null)u.streak=0;
  if(u.bestStreak==null)u.bestStreak=0;
  return u;
};

/* ---------- XP / Níveis (puro) ---------- */
/* XP por nível — progressivo: primeiros níveis rápidos, últimos exigem dedicação
   Fórmula: 150 + (level-1) × 40  →  nível 20 acumulado ≈ 9.690 XP
   Módulo teórico + Path 100% completo = ~10.000 XP */
CB.xpToNext = function (level) { return 150 + (level - 1) * 40; };

CB.levelInfo = function (xp) {
  let level = 1, rem = Math.max(0, xp | 0);
  while (rem >= CB.xpToNext(level)) { rem -= CB.xpToNext(level); level++; }
  const need = CB.xpToNext(level);
  return { level: level, intoLevel: rem, need: need, remaining: need - rem, pct: Math.max(0, Math.min(100, Math.round((rem / need) * 100))) };
};

CB.rankTitle = function (level) {
  if(CB._lang&&CB._lang!=="pt"&&CB.TRANSLATIONS&&CB.TRANSLATIONS.ranks&&CB.TRANSLATIONS.ranks[CB._lang]){
    var rk=CB.TRANSLATIONS.ranks[CB._lang];
    return rk[Math.min(level,rk.length)-1]||rk[0];
  }
  const t = CB.RANK_TITLES.find((r) => level >= r.min);
  return t ? t.title : "Recruta";
};

CB.addXP = function (amount) {
  const u = CB.user();
  const before = CB.levelInfo(u.xp).level;
  u.xp += Math.max(0, amount | 0);
  const after = CB.levelInfo(u.xp).level;
  const newBadges = CB.checkLevelBadges();
  CB.save();
  return { gained: amount, leveledUp: after > before, oldLevel: before, newLevel: after, newBadges: newBadges };
};

/* ---------- Badges ---------- */
CB.hasBadge = function (id) { return CB.user().badges.indexOf(id) !== -1; };
CB.badgeById = function (id) { return CB.BADGES.find((b) => b.id === id); };

CB.unlockBadge = function (id) {
  const u = CB.user();
  if (u.badges.indexOf(id) !== -1) return null;
  const b = CB.badgeById(id);
  if (!b) return null;
  u.badges.push(id);
  if (u.badges.length >= 10 && u.badges.indexOf("cyber-master") === -1 && id !== "cyber-master") u.badges.push("cyber-master");
  CB.save();
  return b;
};

CB.checkLevelBadges = function () {
  const level = CB.levelInfo(CB.user().xp).level;
  const out = [];
  if (level >= 10) { const b = CB.unlockBadge("rising-star"); if (b) out.push(b); }
  if (level >= 20) { const b = CB.unlockBadge("net-defender"); if (b) out.push(b); }
  return out;
};

/* ---------- Eventos de gameplay ---------- */
CB.afterAnswer = function (correct, opts) {
  opts = opts || {};
  const u = CB.user();
  const out = [];
  if (correct) {
    u.streak += 1;
    if (u.streak > u.bestStreak) u.bestStreak = u.streak;
    if (opts.fast) { const b = CB.unlockBadge("speedster"); if (b) out.push(b); }
    if (u.streak >= 10) { const b = CB.unlockBadge("response-elite"); if (b) out.push(b); }
    if (u.streak >= 15) { const b = CB.unlockBadge("untouchable"); if (b) out.push(b); }
    if (new Date().getHours() < 6) { const b = CB.unlockBadge("night-owl"); if (b) out.push(b); }
  } else {
    u.streak = 0;
  }
  CB.save();
  return out;
};

CB.moduleOf = function (missionId) {
  return CB.MODULES.find((m) => m.missions.some((mi) => mi.id === missionId));
};
CB.moduleCompleted = function (moduleId, user) {
  user = user || CB.user();
  const mod = CB.MODULES.find((m) => m.id === moduleId);
  if (!mod) return false;
  return mod.missions.every((mi) => user.missions[mi.id] && user.missions[mi.id].completed);
};

CB.completeMission = function (missionId, accuracy) {
  const u = CB.user();
  const wasCompleted = u.missions[missionId] && u.missions[missionId].completed;
  const m = u.missions[missionId] || { plays: 0, completed: false, bestAccuracy: 0 };
  m.plays += 1;
  m.completed = true;
  m.bestAccuracy = Math.max(m.bestAccuracy, accuracy);
  u.missions[missionId] = m;

  const out = [];
  const mission = CB.missionById(missionId);
  if (mission && mission.badge) { const b = CB.unlockBadge(mission.badge); if (b) out.push(b); }
  if (accuracy >= 100) {
    const b = CB.unlockBadge("perfect"); if (b) out.push(b);
    u._perfectCount = (u._perfectCount || 0) + 1;
    if (u._perfectCount >= 3) { const b2 = CB.unlockBadge("perfectionist"); if (b2) out.push(b2); }
  }
  if (wasCompleted && accuracy >= 70 && (u.missions[missionId].bestAccuracy - accuracy) < 0) {
    /* veio com nota melhor depois de ter errado */ const b = CB.unlockBadge("comeback"); if (b) out.push(b);
  }

  const mod = CB.moduleOf(missionId);
  if (mod && CB.moduleCompleted(mod.id, u)) { const b = CB.unlockBadge("module-master"); if (b) out.push(b); }

  u.totalPlays = (u.totalPlays || 0) + 1;
  if (u.totalPlays >= 20) { const b = CB.unlockBadge("marathoner"); if (b) out.push(b); }

  /* first-blood */
  const totalDone = Object.keys(u.missions).filter(function(k){return u.missions[k].completed;}).length;
  if (totalDone === 1) { const b = CB.unlockBadge("first-blood"); if (b) out.push(b); }
  if (totalDone === 3) { const b = CB.unlockBadge("hat-trick"); if (b) out.push(b); }

  /* all-modules: jogou em todos os módulos */
  const mids = CB.MODULES.map(function(mod){return mod.id;});
  const playedMods = new Set(CB.allMissions().filter(function(mi){return u.missions[mi.id]&&u.missions[mi.id].plays>0;}).map(function(mi){return mi.moduleId;}));
  if (mids.every(function(mid){return playedMods.has(mid);})) { const b = CB.unlockBadge("all-modules"); if (b) out.push(b); }

  /* ranking badges */
  const lb = CB.leaderboard();
  const me = lb.find(function(p){return p.you;});
  if (me) {
    if (me.pos <= 10) { const b = CB.unlockBadge("top10"); if (b) out.push(b); }
    if (me.pos <= 3)  { const b = CB.unlockBadge("top3"); if (b) out.push(b); }
  }
  const blb = CB.branchLeaderboard();
  const myBranch = u.branch;
  const bEntry = blb.find(function(b){return b.branch===myBranch;});
  if (bEntry && bEntry.pos <= 3) { const b = CB.unlockBadge("branch-pride"); if (b) out.push(b); }

  CB.save();
  return out;
};

/* ---------- Moedas ---------- */
CB.awardCoins = function (n) { const u = CB.user(); u.coins = (u.coins || 0) + Math.max(0, n | 0); CB.save(); return u.coins; };

/* ---------- Desafio diário + streak ---------- */
CB._today = function () { return new Date().toISOString().slice(0, 10); };
CB.dailyMissionId = function () {
  const ids = CB.allMissions().map((m) => m.id);
  const day = Math.floor(Date.now() / 86400000);
  return ids[day % ids.length];
};
CB.dailyState = function () {
  const u = CB.user();
  return { missionId: CB.dailyMissionId(), claimedToday: !!(u.daily && u.daily.lastClaim === CB._today()), streak: (u.daily && u.daily.streak) || 0 };
};
CB.claimDaily = function () {
  const u = CB.user(), today = CB._today();
  if (!u.daily) u.daily = { lastClaim: null, streak: 0 };
  if (u.daily.lastClaim === today) return { already: true, streak: u.daily.streak };
  const yest = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  u.daily.streak = u.daily.lastClaim === yest ? u.daily.streak + 1 : 1;
  u.daily.lastClaim = today;
  const bonusXP = 50 + u.daily.streak * 10;
  const coins = 30 + u.daily.streak * 5;
  CB.awardCoins(coins);
  const xpRes = CB.addXP(bonusXP);
  if (u.daily.streak >= 3) { const b = CB.unlockBadge("streak-3"); if (b && CB.toast) CB.toast("Conquista!",b.name,b.icon); }
  return { already: false, streak: u.daily.streak, bonusXP: bonusXP, coins: coins, xpRes: xpRes };
};

/* ---------- Loja ---------- */
CB.ownsItem = function (item) {
  const u = CB.user();
  if (item.type === "frame") return u.inventory.frames.indexOf(item.id) !== -1;
  if (item.type === "title") return u.inventory.titles.indexOf(item.id) !== -1;
  return false;
};
CB.buyItem = function (id) {
  const u = CB.user(), item = CB.shopItem(id);
  if (!item) return { ok: false, error: "Item inválido." };
  if (CB.ownsItem(item)) return { ok: false, error: "Você já possui este item." };
  if ((u.coins || 0) < item.cost) return { ok: false, error: "Moedas insuficientes." };
  u.coins -= item.cost;
  if (item.type === "frame") u.inventory.frames.push(id);
  else if (item.type === "title") u.inventory.titles.push(id);
  if (item.type === "frame") u.equipped.frame = id; else if (item.type === "title") u.equipped.title = id;
  CB.save();
  return { ok: true, item: item };
};
CB.equipItem = function (type, id) {
  const u = CB.user();
  if (type === "frame") u.equipped.frame = u.equipped.frame === id ? null : id;
  else if (type === "title") u.equipped.title = u.equipped.title === id ? null : id;
  CB.save();
};
CB.frameClass = function (u) { u = u || CB.user(); return u.equipped && u.equipped.frame ? u.equipped.frame : ""; };
CB.equippedTitle = function (u) { u = u || CB.user(); if (!u.equipped || !u.equipped.title) return ""; const it = CB.shopItem(u.equipped.title); return it ? it.value : ""; };

/* ---------- Explorer (badge secreta) ---------- */
CB.visit = function (view) {
  const u = CB.user();
  if (!u || u === CB._guest) return;
  if (!u.visited) u.visited = {};
  u.visited[view] = true;
  const need = ["dashboard", "modules", "ranking", "achievements", "shop", "profile"];
  if (need.every((v) => u.visited[v])) { const b = CB.unlockBadge("explorer"); if (b && CB.toast) CB.toast("Conquista secreta!", b.name, b.icon); }
  CB.save();
};


CB.weakPoints = function () {
  const agg = {};
  CB.DB.allUsers().forEach((u) => {
    Object.keys(u.missions || {}).forEach((mid) => {
      if (!agg[mid]) agg[mid] = { sum: 0, n: 0 };
      agg[mid].sum += u.missions[mid].bestAccuracy || 0; agg[mid].n += 1;
    });
  });
  const out = CB.allMissions().map((mi) => {
    const a = agg[mi.id];
    return { id: mi.id, title: mi.title, icon: mi.icon, module: mi.moduleTitle, avg: a && a.n ? Math.round(a.sum / a.n) : 0, n: a ? a.n : 0 };
  }).filter((x) => x.n > 0);
  out.sort((a, b) => a.avg - b.avg);
  return out;
};

/* ---------- Ranking individual ---------- */
CB.leaderboard = function () {
  const me = CB.user();
  const arr = CB.DB.players().map((u) => ({
    email: u.email, name: u.name, dept: u.dept, role: u.role, branch: u.branch,
    xp: u.xp, avatar: u.avatar, you: !!(me && u.email === me.email),
  }));
  arr.sort((a, b) => b.xp - a.xp);
  arr.forEach((p, i) => { p.pos = i + 1; p.level = CB.levelInfo(p.xp).level; });
  return arr;
};
CB.myRank = function () {
  const lb = CB.leaderboard();
  const me = lb.find((p) => p.you);
  return { rank: me ? me.pos : lb.length, total: lb.length };
};

/* ---------- Ranking de filiais ---------- */
CB.branchLeaderboard = function () {
  const map = {};
  CB.DB.allUsers().forEach((u) => {
    const b = u.branch || "—";
    if (!map[b]) map[b] = { branch: b, xp: 0, members: 0, levelSum: 0 };
    map[b].xp += u.xp; map[b].members += 1; map[b].levelSum += CB.levelInfo(u.xp).level;
  });
  const arr = Object.keys(map).map((k) => map[k]);
  arr.forEach((b) => { b.avgLevel = b.members ? Math.round(b.levelSum / b.members) : 0; });
  arr.sort((a, b) => b.xp - a.xp);
  arr.forEach((b, i) => (b.pos = i + 1));
  return arr;
};
CB.myBranchRank = function () {
  const u = CB.user();
  const lb = CB.branchLeaderboard();
  const me = lb.find((b) => b.branch === u.branch);
  return { rank: me ? me.pos : lb.length, total: lb.length };
};
