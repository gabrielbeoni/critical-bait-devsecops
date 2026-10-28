/* ============================================================
   CRITICAL BAIT — App v3
   Novidades: onboarding obrigatório, tela de módulos com info,
   admin com alternância membro/admin, estatísticas de missão
   ============================================================ */
window.CB = window.CB || {};
CB.AVATARS=["🐟","🐱","🤖","🦊","🦉","🐉","🥷","👾","🦅","🐺","🦾","⚡","🐯","🦝","🐙","🛡️","🦇","🐸","🦖","🐧","🦈","🐼","🦁","🐵","🦄","🐝","🐲","🎭","🧙","🦸","👻","🤠","🧛","🦂","🐨","🦜"];

/* ─── SONS (Web Audio API — sem arquivos externos) ─── */
CB._audioCtx=null;
CB._getAudio=function(){
  if(!CB._audioCtx)try{CB._audioCtx=new(window.AudioContext||window.webkitAudioContext)();}catch(e){}
  return CB._audioCtx;
};
CB.sound={
  correct:function(){
    var ctx=CB._getAudio();if(!ctx||CB._muted)return;
    var o=ctx.createOscillator();var g=ctx.createGain();
    o.connect(g);g.connect(ctx.destination);
    o.type="sine";o.frequency.value=880;
    g.gain.setValueAtTime(0.15,ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+0.3);
    o.start(ctx.currentTime);o.stop(ctx.currentTime+0.3);
    /* segundo tom mais agudo */
    var o2=ctx.createOscillator();var g2=ctx.createGain();
    o2.connect(g2);g2.connect(ctx.destination);
    o2.type="sine";o2.frequency.value=1320;
    g2.gain.setValueAtTime(0.12,ctx.currentTime+0.1);
    g2.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+0.4);
    o2.start(ctx.currentTime+0.1);o2.stop(ctx.currentTime+0.4);
  },
  wrong:function(){
    var ctx=CB._getAudio();if(!ctx||CB._muted)return;
    var o=ctx.createOscillator();var g=ctx.createGain();
    o.connect(g);g.connect(ctx.destination);
    o.type="square";o.frequency.value=200;
    g.gain.setValueAtTime(0.1,ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+0.25);
    o.start(ctx.currentTime);o.stop(ctx.currentTime+0.25);
  },
  badge:function(){
    var ctx=CB._getAudio();if(!ctx||CB._muted)return;
    [523,659,784].forEach(function(f,i){
      var o=ctx.createOscillator();var g=ctx.createGain();
      o.connect(g);g.connect(ctx.destination);
      o.type="sine";o.frequency.value=f;
      g.gain.setValueAtTime(0.12,ctx.currentTime+i*0.12);
      g.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+i*0.12+0.25);
      o.start(ctx.currentTime+i*0.12);o.stop(ctx.currentTime+i*0.12+0.25);
    });
  },
  click:function(){
    var ctx=CB._getAudio();if(!ctx||CB._muted)return;
    var o=ctx.createOscillator();var g=ctx.createGain();
    o.connect(g);g.connect(ctx.destination);
    o.type="sine";o.frequency.value=600;
    g.gain.setValueAtTime(0.06,ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+0.08);
    o.start(ctx.currentTime);o.stop(ctx.currentTime+0.08);
  }
};
CB._muted=false;

/* ─── TEMA CLARO/ESCURO ─── */
CB._theme=localStorage.getItem("cb_theme")||"dark";
CB.applyTheme=function(){
  document.documentElement.setAttribute("data-theme",CB._theme);
};
CB.toggleTheme=function(){
  CB._theme=CB._theme==="dark"?"light":"dark";
  localStorage.setItem("cb_theme",CB._theme);
  CB.applyTheme();
};


CB._rankTab="mybranch";

CB.eyeOpen='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>';
CB.eyeOff='<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20C5 20 1 13 1 13a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 7 11 7a18.5 18.5 0 0 1-2.16 3.19M14.12 14.12a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';
CB.eyeBtn=function(){return'<button type="button" class="pw-toggle" aria-label="Mostrar senha">'+CB.eyeOpen+"</button>";};

CB.brandCB=function(){return'<span class="brand-cb"><svg width="28" height="28" viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M24 3 L42 10 V24 C42 35 34 42 24 45 C14 42 6 35 6 24 V10 Z" fill="#0a2415" stroke="#2bee6b" stroke-width="2"/><path d="M30 15 a6 6 0 1 0 0 9 v8" stroke="#2bee6b" stroke-width="2.6" fill="none" stroke-linecap="round"/><circle cx="30" cy="33" r="2.2" fill="#2bee6b"/></svg><span class="cb-name">CRITICAL <b>BAIT</b></span></span>';};
CB.brandLM=function(){return'<span class="lm-logo"><span class="lm-tri"></span><span class="lm-text">LEROY<br>MERLIN</span></span>';};
CB.renderBrands=function(){
  const set=function(id,html){const el=document.getElementById(id);if(el)el.innerHTML=html;};
  set("brand-cb",CB.brandCB());set("brand-lm",CB.brandLM());
  /* sidebar brand */
  const sb=document.getElementById("sidebar-brand");
  if(sb){
    sb.innerHTML=CB.brandCB();
    sb.onclick=function(){CB.go("dashboard");};
  }
};

CB.refreshChrome=function(){
  var u;try{u=CB.user();}catch(e){return;}
  if(!u)return;
  var li=CB.levelInfo(u.xp||0);var el=document.getElementById("topbar-user");
  /* botões de tema e som na topbar */
  var themeBtn=document.getElementById("theme-toggle");
  if(themeBtn){themeBtn.onclick=function(){var dark=CB.Theme.toggle();themeBtn.innerHTML=dark?"☾ Alternar Tema":"☀ Alternar Tema";CB.toast(dark?"Tema escuro":"Tema claro",dark?"Modo noturno ativado":"Modo diurno ativado","");};}
  var soundBtn=document.getElementById("sound-toggle");
  if(soundBtn){soundBtn.onclick=function(){var on=CB.Sound.toggle();soundBtn.textContent=on?"🔊":"🔇";};}
  if(el)el.innerHTML='<div class="tb-userinfo"><div class="tb-username">'+CB.esc(u.name)+"</div>"+
    '<div class="tb-xpbar"><div class="tb-xpfill" style="width:'+li.pct+'%"></div></div>'+
    '<div class="tb-xptext">XP: '+(u.xp||0).toLocaleString("pt-BR")+" · "+li.intoLevel+"/"+li.need+"</div></div>"+
    '<div class="level-badge"><small>NÍVEL</small><b>'+li.level+"</b></div>";
  const adm=document.getElementById("nav-admin");if(adm)adm.classList.toggle("hidden",!CB.Auth.isAdmin());
  const rnk=document.getElementById("nav-ranking");if(rnk)rnk.classList.toggle("hidden",!CB.Auth.isAdmin());
  try{if(u&&u.missions)CB.checkNewCerts();}catch(e){}
};

CB.showLevelsModal=function(){
  const u=CB.user(),cur=CB.levelInfo(u.xp).level,MAX=20;let cum=0,rows="";
  for(let L=1;L<=MAX;L++){const isCur=L===cur,done=L<=cur;rows+='<tr class="'+(isCur?"lvl-cur":"")+'"><td><b>Nível '+L+"</b></td><td>"+CB.esc(CB.rankTitle(L))+'</td><td class="rank-xp">'+cum.toLocaleString("pt-BR")+" XP</td><td>"+(isCur?"◀ você":(done?"✔":"🔒"))+"</td></tr>";cum+=CB.xpToNext(L);}
  const html='<div class="game-modal pop" style="width:min(480px,92vw)"><div class="game-top"><span class="gt-title">🎖️ Níveis & Patentes</span><button class="gt-close" id="lvl-close">✕</button></div><div class="game-body"><p class="section-sub">Você está no <b>Nível '+cur+'</b> · Patente <b style="color:var(--neon)">'+CB.esc(CB.rankTitle(cur))+"</b> · "+(u.xp||0).toLocaleString("pt-BR")+" XP.</p><div class=\"lvl-scroll\"><table class=\"rank-table lvl-table\"><thead><tr><th>Nível</th><th>Patente</th><th>XP necessário</th><th></th></tr></thead><tbody>"+rows+"</tbody></table></div><p class=\"section-sub\" style=\"margin-top:12px\">A partir do <b>Nível "+MAX+"</b>, a patente máxima é <b style=\"color:var(--neon)\">Mestre Cyber</b>.</p></div></div>";
  CB.openOverlay(html);
  const ov=CB.overlayEl();ov.onclick=function(e){if(e.target===ov)CB.closeOverlay();};
  document.getElementById("lvl-close").onclick=CB.closeOverlay;
};

/* ─── verificar se onboarding foi concluído ─── */
CB.onboardingDone=function(u){
  u=u||CB.user();
  if(u.onboardingDone)return true;
  if(!u._obSteps)return false;
  return CB.ONBOARDING.steps.every(function(s){return u._obSteps.indexOf(s.id)!==-1;});
}

CB.go=function(view){
  if(view==="admin"&&!CB.Auth.isAdmin())view="dashboard";
  if(view==="ranking"&&!CB.Auth.isAdmin()){CB.toast("Acesso restrito","Ranking disponível apenas para administradores","");view="dashboard";}
  /* bloqueia módulos e ranking se onboarding não feito */
  if(!CB.onboardingDone()&&(view==="path"||view==="ranking"||view==="achievements")){
    CB._flashOnboarding();return;
  }
  document.querySelectorAll(".nav-item").forEach(function(b){b.classList.toggle("active",b.getAttribute("data-view")===view);});
  const map={dashboard:CB.viewDashboard,modulo:CB.viewModulo,path:CB.viewPath,ranking:CB.viewRanking,achievements:CB.viewAchievements,profile:CB.viewProfile,admin:CB.viewAdmin};
  var viewFn=map[view]||CB.viewDashboard;
  try{
    document.getElementById("view").innerHTML=viewFn();
  }catch(e){
    console.error("View render error ["+view+"]:",e);
    document.getElementById("view").innerHTML='<div class="panel" style="padding:30px"><h3 style="color:var(--danger)">Erro ao carregar: '+view+'</h3><p>'+CB.esc(e.message)+'</p><p style="margin-top:12px"><button class="btn-primary" onclick="localStorage.clear();location.reload()">🔄 Resetar e recarregar</button></p></div>';
  }
  try{CB.refreshChrome();}catch(e){console.error("refreshChrome error:",e);}
  if(CB._afterView){var f=CB._afterView;CB._afterView=null;try{f();}catch(e){console.error("_afterView error:",e);}}
  if(!CB._noScroll)window.scrollTo(0,0);CB._noScroll=false;
  try{CB.visit(view);}catch(e){}
};
CB._flashOnboarding=function(){CB.toast("Atenção","Complete o Módulo de Treinamento primeiro","");CB.go("modulo");};

CB._stat=function(val,label){return'<div class="stat"><div class="stat-val">'+val+'</div><div class="stat-label">'+label+"</div></div>";};
CB.moduleProgress=function(mod){const u=CB.user();const done=mod.missions.filter(function(mi){return u.missions[mi.id]&&u.missions[mi.id].completed;}).length;return{done:done,total:mod.missions.length,pct:Math.round((done/mod.missions.length)*100)};};

/* ─── DASHBOARD ─── */

CB.DAILY_TIPS=[
  "Nunca compartilhe sua senha — nem com colegas de confiança.",
  "Sempre verifique o domínio do e-mail (depois do @) antes de clicar.",
  "Bloqueie a tela (Win+L) mesmo para ausências de 1 minuto.",
  "Pen drives desconhecidos podem conter malware. Entregue ao TI.",
  "Atualizações de sistema corrigem falhas que criminosos já conhecem.",
  "Wi-Fi público pode ser interceptado. Use VPN ou rede móvel.",
  "Urgência + pedido de dados = provável golpe. Desconfie sempre.",
  "Documentos com CPF devem ir para a fragmentadora, nunca para o lixo.",
  "Códigos 2FA nunca devem ser compartilhados com ninguém.",
  "Se clicou num link suspeito: troque a senha e avise o TI na hora.",
  "Um e-mail com logo perfeito ainda pode ser phishing. Cheque o remetente.",
  "Não instale programas sem autorização do TI — mesmo os gratuitos.",
  "Crachá é pessoal e intransferível. Qualquer ação fica no SEU nome.",
  "Número novo + urgência + PIX = golpe clássico. Ligue pro número antigo.",
  "Antes de compartilhar a tela, feche abas, e-mails e mensagens pessoais."
];
CB.dailyTip=function(){var tips=CB._lang!=='pt'&&CB.TRANSLATIONS.daily_tips[CB._lang]?CB.TRANSLATIONS.daily_tips[CB._lang]:CB.DAILY_TIPS;var d=new Date();var i=(d.getFullYear()*366+d.getMonth()*31+d.getDate())%tips.length;return tips[i];};

CB.viewDashboard=function(){
  var u;try{u=CB.user();}catch(e){u=null;}
  if(!u)return'<div class="panel"><p>Carregando...</p></div>';
  var li=CB.levelInfo(u.xp||0);
  var rank,brank;
  try{rank=CB.myRank();}catch(e){rank={rank:"—"};}
  try{brank=CB.myBranchRank();}catch(e){brank={rank:"—"};}

  /* Se não fez o módulo teórico → tela de boas-vindas */
  if(!CB.onboardingDone()){
    CB._afterView=function(){
      var goBtn=document.getElementById("go-modulo-btn");
      if(goBtn)goBtn.onclick=function(){CB.go("modulo");};
    };
    return '<div class="welcome-banner" style="flex-direction:column;align-items:center;text-align:center;padding:40px 20px">'+
      '<h2>Bem-vindo, '+CB.esc(u.name)+'!</h2>'+
      '<p style="color:var(--text-dim);max-width:480px;margin:12px auto 8px">Antes de acessar as missões práticas do Path, você precisa completar o <b>Módulo de Treinamento</b> — são 6 temas fundamentais de segurança.</p>'+
      '<p style="color:var(--text-mute);font-size:0.85rem;max-width:440px;margin:0 auto 24px">Depois de concluir, todas as abas serão desbloqueadas: Path, Ranking, Conquistas e mais!</p>'+
      '<button class="btn-primary" id="go-modulo-btn" style="font-size:1.1rem;padding:16px 32px">INICIAR MÓDULO</button></div>';
  }

  /* Dashboard normal (após módulo concluído) */
  var totalMissions=CB.allMissions().length;
  var doneMissions=0;
  try{doneMissions=CB.allMissions().filter(function(mi){return u.missions[mi.id]&&u.missions[mi.id].completed;}).length;}catch(e){}
  var totalPct=Math.round((doneMissions/totalMissions)*100);
  var certReady=false;
  try{certReady=CB.MODULES.every(function(m){return CB.moduleCompleted(m.id,u);});}catch(e){}

  /* cards de módulos recentes */
  var cards=CB.MODULES.slice(0,3).map(function(m){
    var p=CB.moduleProgress(m);
    return'<div class="mission-card" data-module="'+m.id+'">'+(p.pct===100?'<span class="m-tag">✔ COMPLETO</span>':"")+
      '<div class="m-ico">'+m.icon+'</div><h4>'+CB.esc(m.title)+'</h4>'+
      '<div class="lu-track"><div class="lu-fill" style="width:'+p.pct+'%"></div></div>'+
      '<span class="m-xp">'+p.done+'/'+p.total+'</span></div>';
  }).join("");

  CB._afterView=function(){
    var certBtn=document.getElementById("get-cert");
    if(certBtn)certBtn.onclick=function(){
      try{CB.showCertificate();}catch(e){CB.toast("Erro","Certificado indisponível","");}
    };
    document.querySelectorAll("[data-module]").forEach(function(c){c.onclick=function(){CB._noScroll=true;CB.go("path");};});
  };

  return '<div class="welcome-banner"><div><h2>Olá, '+CB.esc(u.name)+'</h2>'+
    '<p style="color:var(--text-dim)">'+CB.rankTitle(li.level)+' · Nível '+li.level+' · '+CB.esc(u.branch)+'</p></div></div>'+


    '<div class="stat-row">'+
    CB._stat((u.xp||0).toLocaleString("pt-BR"),"XP Total")+
    CB._stat(doneMissions+"/"+totalMissions,"Missões")+
    CB._stat(u.badges.length,"Conquistas")+
    CB._stat("#"+(rank.rank||"—"),"Ranking")+
    CB._stat("#"+(brank.rank||"—"),"Filial")+
    CB._stat(totalPct+"%","Progresso")+"</div>"+



    (certReady?'<div class="panel" style="margin:18px 0;text-align:center;padding:28px"><h3 style="color:var(--neon);margin-bottom:8px">🎓 Parabéns!</h3><p style="color:var(--text-dim);margin-bottom:16px">Todos os módulos concluídos. Seu certificado está pronto!</p><button class="btn-primary" id="get-cert">📜 VER CERTIFICADO</button></div>':"")+

    '<div class="missions-head"><h2 class="section-title">Path de treinamento</h2><span class="section-sub" style="margin:0">Clique para treinar</span></div>'+
    '<div class="grid cols-3">'+cards+'</div>';
};

/* ─── TREINAMENTO (learning path estilo TryHackMe/HTB) ─── */

/* ─── MÓDULO DE TREINAMENTO (teoria) — visual redesenhado ─── */
CB._moduloStep=0;
CB.viewModulo=function(){
  var u;try{u=CB.user();}catch(e){u=null;}
  if(!u)return'<div class="panel"><p>Carregando...</p></div>';
  var steps=CB.ONBOARDING.steps;
  var completedSteps=(u._obSteps||[]);
  var allDone=steps.every(function(s){return completedSteps.indexOf(s.id)!==-1;});
  if(allDone&&!u.onboardingDone){u.onboardingDone=true;CB.unlockBadge("onboarding-done");CB.addXP(200);CB.save();}
  var doneCount=completedSteps.length;
  var pct=Math.round((doneCount/steps.length)*100);

  var subtitles_pt={
    "ob-1":"Como identificar e-mails e mensagens falsas",
    "ob-2":"Quando alguém tenta te manipular",
    "ob-3":"Crie senhas fortes e proteja seus acessos",
    "ob-4":"Vírus, ransomware e pen drives suspeitos",
    "ob-5":"Proteja dados pessoais de clientes e colegas",
    "ob-6":"Segurança no ambiente físico da loja"
  };
  var subtitles_en={
    "ob-1":"How to identify fake emails and messages",
    "ob-2":"When someone tries to manipulate you",
    "ob-3":"Create strong passwords and protect your access",
    "ob-4":"Viruses, ransomware and suspicious USB drives",
    "ob-5":"Protect personal data of clients and colleagues",
    "ob-6":"Security in the physical store environment"
  };
  var subtitles_es={
    "ob-1":"Cómo identificar correos y mensajes falsos",
    "ob-2":"Cuando alguien intenta manipularte",
    "ob-3":"Crea contraseñas fuertes y protege tus accesos",
    "ob-4":"Virus, ransomware y USB sospechosos",
    "ob-5":"Protege datos personales de clientes y colegas",
    "ob-6":"Seguridad en el ambiente físico de la tienda"
  };
  var subtitles=CB._lang==="en"?subtitles_en:CB._lang==="es"?subtitles_es:subtitles_pt;

  var cards=steps.map(function(s,i){
    var done=completedSteps.indexOf(s.id)!==-1;
    var sub=subtitles[s.id]||"";
    return '<div class="mv-card '+(done?"mv-done":"mv-pending")+'" data-mod-step="'+i+'">'+
      '<div class="mv-status">'+(done?'<span class="mv-check">✓</span>':'<span class="mv-num">'+(i+1)+'</span>')+'</div>'+
      '<div class="mv-icon">'+s.icon+'</div>'+
      '<h3 class="mv-title">'+(CB.TRANSLATIONS.onboarding[CB._lang]&&CB.TRANSLATIONS.onboarding[CB._lang][s.id]?CB.esc(CB.TRANSLATIONS.onboarding[CB._lang][s.id].title):CB.esc(s.title))+'</h3>'+
      '<p class="mv-sub">'+CB.esc(sub)+'</p>'+
      '<div class="mv-action">'+(done?'<span class="mv-badge-done">CONCLUÍDO</span>':'<span class="mv-badge-go">INICIAR →</span>')+'</div>'+
      '</div>';
  }).join("");

  CB._afterView=function(){
    document.querySelectorAll("[data-mod-step]").forEach(function(card){
      card.onclick=function(){
        var idx=+card.getAttribute("data-mod-step");
        CB._showModuloStep(idx);
      };
    });
  };

  return '<div class="mv-header">'+
    '<div class="mv-header-text"><h2>Módulo de Treinamento</h2>'+
    '<p>Aprenda os fundamentos de segurança em 6 temas rápidos.</p></div>'+
    '<div class="mv-progress-ring">'+
    '<div class="mv-ring" style="--pct:'+pct+'"><span class="mv-ring-val">'+doneCount+'/'+steps.length+'</span></div>'+
    '</div></div>'+
    (allDone?'<div class="mod-complete-banner">Módulo completo — o Path está desbloqueado.</div>':
      '<div class="mv-hint">Complete todos os temas para desbloquear o Path de exercícios práticos.</div>')+
    '<div class="mv-grid">'+cards+'</div>';
};

CB._showModuloStep=function(idx){
  var u=CB.user();
  var steps=CB.ONBOARDING.steps;
  var s=steps[idx];
  var completedSteps=(u._obSteps||[]);
  var done=completedSteps.indexOf(s.id)!==-1;

  /* Converter content HTML em versão visual compacta com cards internos */
  /* traduzir conteúdo se idioma != pt */
  var tr=CB.TRANSLATIONS.onboarding[CB._lang]&&CB.TRANSLATIONS.onboarding[CB._lang][s.id];
  if(tr){
    var tipHtml='<div class="mv-visual-intro">'+CB.esc(tr.intro)+'</div><div class="mv-visual-grid">'+
      tr.tips.map(function(t){return'<div class="mv-tip"><span>'+t[0]+'</span><b>'+CB.esc(t[1])+'</b>'+CB.esc(t[2])+'</div>';}).join('')+
      '</div><div class="mv-visual-rule"><span>💡</span> '+CB.esc(tr.rule)+'</div>';
    s={id:s.id,icon:s.icon,title:tr.title,content:tipHtml,quiz:{q:tr.quiz.q,options:tr.quiz.options,correct:s.quiz.correct,explain:tr.quiz.explain}};
  }
  var visualContent=s.content
    .replace(/<h4>/g,'<h4 class="mv-popup-h4">')
    .replace(/<ul>/g,'<ul class="mv-popup-list">')
    .replace(/<p>/g,'<p class="mv-popup-p">');

  var html='<div class="game-modal pop" style="width:min(500px,92vw)"><div class="game-top">'+
    '<span class="gt-title"><span style="font-size:1.4rem;margin-right:8px">'+s.icon+'</span> '+CB.esc(s.title)+'</span>'+
    '<button class="gt-close" id="mod-close">✕</button></div>'+
    '<div class="game-body" style="padding:20px 24px">'+
    '<div class="mv-popup-content">'+visualContent+'</div>'+
    (done?'<div class="mv-popup-done"><span>✅</span> Já completado!</div>'+
      '<div style="text-align:center;margin-top:16px"><button class="btn-primary" id="mod-back">VOLTAR</button></div>'
    :'<div class="mv-popup-quiz">'+
      '<div class="mv-quiz-header">Responda para completar</div>'+
      '<p class="mv-quiz-q">'+CB.esc(s.quiz.q)+'</p>'+
      '<div class="mv-quiz-opts">'+
      s.quiz.options.map(function(o,i){return'<button class="mv-opt" data-obi="'+i+'">'+CB.esc(o)+'</button>';}).join("")+
      '</div><div id="mod-fb"></div></div>')+
    '</div></div>';

  CB.openOverlay(html);

  document.getElementById("mod-close").onclick=function(){CB.closeOverlay();};
  var backBtn=document.getElementById("mod-back");
  if(backBtn)backBtn.onclick=function(){CB.closeOverlay();};

  if(!done){
    document.querySelectorAll(".mv-opt").forEach(function(btn){
      btn.onclick=function(){
        var i=+btn.getAttribute("data-obi");
        var correct=i===s.quiz.correct;
        document.querySelectorAll(".mv-opt").forEach(function(b){
          b.disabled=true;b.style.opacity=".6";
          if(+b.getAttribute("data-obi")===s.quiz.correct){b.classList.add("mv-opt-correct");b.style.opacity="1";}
          if(b===btn&&!correct){b.classList.add("mv-opt-wrong");b.style.opacity="1";}
        });
        var fb=document.getElementById("mod-fb");
        if(correct){
          if(!u._obSteps)u._obSteps=[];
          if(u._obSteps.indexOf(s.id)===-1)u._obSteps.push(s.id);
          CB.addXP(50);CB.save();try{CB.Sound.play('correct');}catch(e){}
          var allNow=steps.every(function(st){return u._obSteps.indexOf(st.id)!==-1;});
          if(allNow&&!u.onboardingDone){u.onboardingDone=true;CB.unlockBadge("onboarding-done");CB.addXP(200);CB.save();try{CB.Sound.play("badge");}catch(e){}CB.toast("Módulo completo","Path desbloqueado · +200 XP","");}
          fb.innerHTML='<div class="mv-fb mv-fb-ok"><h4>✔ Correto! +50 XP</h4><p>'+CB.esc(s.quiz.explain)+'</p>'+
            '<button class="btn-primary" id="mod-next" style="margin-top:14px">'+(idx+1<steps.length&&!allNow?"PRÓXIMO TEMA →":"CONCLUIR ✓")+'</button></div>';
          document.getElementById("mod-next").onclick=function(){CB.closeOverlay();if(idx+1<steps.length&&!allNow){CB._showModuloStep(idx+1);}else{CB.go("modulo");}};
        }else{
          try{CB.Sound.play('wrong');}catch(e){}fb.innerHTML='<div class="mv-fb mv-fb-err"><h4>✖ Tente novamente</h4><p>'+CB.esc(s.quiz.explain)+'</p>'+
            '<button class="btn-soft" id="mod-retry" style="margin-top:12px">TENTAR DE NOVO</button></div>';
          document.getElementById("mod-retry").onclick=function(){
            document.querySelectorAll(".mv-opt").forEach(function(b){b.disabled=false;b.style.opacity="1";b.classList.remove("mv-opt-correct","mv-opt-wrong");});
            fb.innerHTML="";
          };
        }
      };
    });
  }
};

CB._pathOpen=null;
CB.viewPath=function(){
  var u;try{u=CB.user();}catch(e){u=null;}
  if(!u)return'<div class="panel"><p>Carregando...</p></div>';
  var totalMissions=CB.allMissions().length;
  var doneMissions=CB.allMissions().filter(function(mi){return u.missions[mi.id]&&u.missions[mi.id].completed;}).length;
  var totalPct=Math.round((doneMissions/totalMissions)*100);
  var obDone=CB.onboardingDone();

  /* agrupar por dificuldade */
  var diffLabels={"Iniciante":"Iniciante","Intermediário":"Intermediário","Avançado":"Avançado","Especialista":"Especialista"};
  var lastDiff="";

  var searchTerm=(CB._pathSearch||"").toLowerCase();
  var filterDiff=CB._pathFilter||"all";
  var filteredMods=CB.MODULES.filter(function(m){
    if(filterDiff!=="all"&&m.difficulty!==filterDiff)return false;
    if(searchTerm){
      var inTitle=m.title.toLowerCase().indexOf(searchTerm)!==-1;
      var inMissions=m.missions.some(function(mi){return mi.title.toLowerCase().indexOf(searchTerm)!==-1;});
      return inTitle||inMissions;
    }
    return true;
  });
  var nodes=filteredMods.map(function(m,idx){
    var p=CB.moduleProgress(m);
    var isOpen=CB._pathOpen===m.id;
    var done=p.pct===100;
    var started=p.done>0;
    var isTraining=m.id==="treinamento";
    var locked=!isTraining&&!obDone;
    var status=done?"done":(started||isTraining?"active":(locked?"locked":"ready"));
    var side=idx%2===0?"left":"right";

    /* separador de dificuldade */
    var diffSep="";
    if(m.difficulty&&m.difficulty!==lastDiff){
      lastDiff=m.difficulty;
      diffSep='<div class="path-diff-sep"><span class="path-diff-badge diff-'+(m.difficulty.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/ç/g,"c"))+'">'+(diffLabels[m.difficulty]||m.difficulty)+'</span></div>';
    }

    /* exercícios dentro */
    var inner="";
    if(isOpen&&!locked){
      inner='<div class="path-exercises">';
      m.missions.forEach(function(mi){
        var ms=u.missions[mi.id]||{plays:0,bestAccuracy:0,completed:false};
        var timerBadge=mi.timerSec?'<span class="timer-badge">⏱ '+mi.timerSec+'s</span>':"";
        inner+='<div class="path-exercise">'+
          '<div class="path-ex-left"><span class="path-ex-ico">'+mi.icon+'</span>'+
          '<div><b>'+CB.esc(mi.title)+(ms.completed?' <span class="chip-done">✔</span>':"")+'</b>'+
          '<p>'+CB.esc(mi.desc)+'</p>'+timerBadge+
          '<span class="path-ex-meta">Partidas: '+ms.plays+' · Melhor: '+ms.bestAccuracy+'%</span></div></div>'+
          '<div class="path-ex-actions">'+
          (mi.info?'<button class="btn-soft btn-xs mis-info-btn" data-info="'+mi.id+'" title="Conceito">❓</button>':"")+
          '<button class="btn-primary btn-xs mini-play" data-mission="'+mi.id+'">▶ JOGAR</button>'+
          '</div></div>';
      });
      inner+='</div>';
    }

    return diffSep+'<div class="path-node '+side+" "+status+(isTraining?" training":"")+'" data-path-idx="'+idx+'">'+
      '<div class="path-connector"><div class="path-line"></div><div class="path-dot"><span>'+
      (done?"✔":(isTraining?"🎓":(idx)))+'</span></div></div>'+
      '<div class="path-card'+(locked?" path-locked":"")+'" data-path-toggle="'+m.id+'">'+
      (locked?'<div class="path-lock-overlay"><span>🔒</span><small>Complete o treinamento</small></div>':"")+
      '<div class="path-card-head">'+
      '<span class="path-icon">'+m.icon+'</span>'+
      '<div class="path-card-info"><h3>'+CB.esc(m.title)+'</h3>'+
      '<p>'+CB.esc(m.desc)+'</p>'+
      '<div class="path-stats"><span>'+p.done+'/'+p.total+' missões</span>'+
      '<div class="path-bar"><div class="path-bar-fill" style="width:'+p.pct+'%"></div></div>'+
      '<span>'+p.pct+'%</span></div></div>'+
      (!locked?'<span class="path-chevron '+(isOpen?"open":"")+'">▾</span>':"")+
      (done&&!isTraining?'<button class="btn-soft btn-xs cert-mod-btn" data-certmod="'+m.id+'" title="Ver selo de conclusão" style="margin-left:8px;flex:none">📜</button>':"")+
      '</div>'+inner+
      '</div></div>';
  }).join("");

  CB._afterView=function(){
    document.querySelectorAll("[data-path-toggle]").forEach(function(card){
      card.onclick=function(e){
        if(e.target.closest(".mini-play")||e.target.closest(".mis-info-btn"))return;
        if(card.classList.contains("path-locked")){CB.toast("Bloqueado","Complete o Módulo de Treinamento primeiro","");return;}
        var mid=card.getAttribute("data-path-toggle");
        CB._pathOpen=CB._pathOpen===mid?null:mid;
        CB._noScroll=true;CB.go("path");
      };
    });
    document.querySelectorAll(".mini-play").forEach(function(b){b.onclick=function(e){e.stopPropagation();CB.Game.start(b.getAttribute("data-mission"));};});
    document.querySelectorAll(".cert-mod-btn").forEach(function(b){
      b.onclick=function(e){e.stopPropagation();CB.showModuleCert(b.getAttribute("data-certmod"));};
    });
    document.querySelectorAll(".mis-info-btn").forEach(function(b){
      b.onclick=function(e){e.stopPropagation();
        var mi=CB.missionById(b.getAttribute("data-info"));
        if(mi&&mi.info)CB._showMissionInfo(mi.info);
      };
    });
  };

  /* filtro e busca */
  var filterHtml='<div class="path-toolbar">'+
    '<div class="path-search-wrap"><span>🔍</span><input type="text" id="path-search" placeholder="Buscar missão..." value="'+(CB._pathSearch||'')+'"></div>'+
    '<div class="path-filters">'+
    '<button class="path-filter-btn'+(!CB._pathFilter||CB._pathFilter==="all"?" active":"")+'" data-pf="all">Todos</button>'+
    '<button class="path-filter-btn'+(CB._pathFilter==="Iniciante"?" active":"")+'" data-pf="Iniciante">🟢 Iniciante</button>'+
    '<button class="path-filter-btn'+(CB._pathFilter==="Intermediário"?" active":"")+'" data-pf="Intermediário">🟡 Intermediário</button>'+
    '<button class="path-filter-btn'+(CB._pathFilter==="Avançado"?" active":"")+'" data-pf="Avançado">🔴 Avançado</button>'+
    '<button class="path-filter-btn'+(CB._pathFilter==="Especialista"?" active":"")+'" data-pf="Especialista">💀 Especialista</button>'+
    '</div></div>';

  /* bind busca e filtros */
  var oldAfter=CB._afterView;
  CB._afterView=function(){
    if(oldAfter)oldAfter();
    var searchEl=document.getElementById("path-search");
    if(searchEl){searchEl.oninput=function(){CB._pathSearch=searchEl.value;CB._noScroll=true;CB.go("path");};}
    document.querySelectorAll("[data-pf]").forEach(function(btn){
      btn.onclick=function(){CB._pathFilter=btn.getAttribute("data-pf");CB._pathSearch="";CB._noScroll=true;CB.go("path");};
    });
  };

  return '<div class="path-header">'+
    '<div><h2 class="section-title">Trilha de Treinamento</h2>'+
    '<p class="section-sub">'+CB.MODULES.length+' módulos · '+totalMissions+' missões · Progresso: <b style="color:var(--neon)">'+totalPct+'%</b></p></div>'+
    '<div class="path-overview"><div class="path-overview-bar"><div class="path-overview-fill" style="width:'+totalPct+'%"></div></div>'+
    '<span>'+doneMissions+'/'+totalMissions+'</span></div></div>'+
    filterHtml+
    '<div class="path-track">'+nodes+'</div>';
};

/* ─── RANKING ─── */
CB.viewRanking=function(){
  var u;try{u=CB.user();}catch(e){u=null;}
  if(!u)return'<div class="panel"><p>Carregando...</p></div>';
  var isAdmin=CB.Auth.isAdmin();
  const tab=CB._rankTab;

  /* colaborador: só aba da filial dele. Admin: individual + todas as filiais */
  let tabs;
  if(isAdmin){
    tabs='<div class="rank-tabs"><button class="rank-tab '+(tab==="ind"?"active":"")+'" data-rt="ind">👤 Individual</button>'+
      '<button class="rank-tab '+(tab==="matriz"?"active":"")+'" data-rt="matriz">🏢 Matriz</button>'+
      '<button class="rank-tab '+(tab==="branch"?"active":"")+'" data-rt="branch">🏬 Filiais</button></div>';
  }else{
    tabs='<div class="rank-tabs"><button class="rank-tab active" data-rt="mybranch">🏬 '+CB.esc(u.branch)+'</button></div>';
  }

  let table;
  if(tab==="branch"&&isAdmin){
    /* ADMIN: ranking de TODAS as filiais */
    const lb=CB.branchLeaderboard(),myb=u.branch;
    const rows=lb.map(function(b){const medal=b.pos===1?"🥇":b.pos===2?"🥈":b.pos===3?"🥉":b.pos;
      return'<tr class="rank-row'+(b.branch===myb?" you":"")+'"><td class="rank-pos">'+medal+"</td>"+
      '<td><div class="rank-player"><span class="rank-avatar">🏬</span><span class="rank-name">'+CB.esc(b.branch)+(b.branch===myb?'<span class="you-tag">SUA FILIAL</span>':"")+"</span></div></td>"+
      '<td class="rank-xp">'+b.xp.toLocaleString("pt-BR")+" XP</td><td>"+b.members+"</td><td>Lv "+b.avgLevel+"</td></tr>";}).join("");
    table='<div class="panel"><table class="rank-table"><thead><tr><th>#</th><th>Filial</th><th>XP Total</th><th>Membros</th><th>Nível médio</th></tr></thead><tbody>'+rows+"</tbody></table></div>";
  }else if(tab==="matriz"&&isAdmin){
    /* ADMIN: ranking da Matriz */
    const lb=CB.leaderboard().filter(function(p){return p.branch==="Matriz - SP";});
    lb.forEach(function(p,i){p.pos=i+1;});
    function medal3(pos){return pos===1?"🥇":pos===2?"🥈":pos===3?"🥉":pos;}
    function row3(p){return'<tr class="rank-row'+(p.you?" you":"")+'"><td class="rank-pos">'+medal3(p.pos)+"</td>"+
      '<td><div class="rank-player"><span class="rank-avatar">'+(p.avatar||"🐟")+'</span><span class="rank-name">'+CB.esc(p.name)+(p.you?'<span class="you-tag">VOCÊ</span>':"")+"</span></div></td>"+
      '<td class="rank-xp">'+p.xp.toLocaleString("pt-BR")+" XP</td><td>Lv "+p.level+"</td></tr>";}
    const bodyM=lb.map(row3).join("");
    table='<div class="panel"><h3 style="margin-bottom:12px">🏢 Ranking da Matriz</h3>'+
      '<table class="rank-table"><thead><tr><th>#</th><th>Jogador</th><th>XP Total</th><th>Nível</th></tr></thead><tbody>'+(bodyM||'<tr><td colspan="4" style="text-align:center;color:var(--text-mute)">Nenhum colaborador na Matriz ainda.</td></tr>')+"</tbody></table></div>";
  }else if(tab==="ind"&&isAdmin){
    /* ADMIN: ranking individual de TODOS */
    const lb=CB.leaderboard(),top=lb.slice(0,10),inTop=top.some(function(p){return p.you;}),me=lb.find(function(p){return p.you;});
    function medal(pos){return pos===1?"🥇":pos===2?"🥈":pos===3?"🥉":pos;}
    function row(p){return'<tr class="rank-row'+(p.you?" you":"")+'"><td class="rank-pos">'+medal(p.pos)+"</td>"+
      '<td><div class="rank-player"><span class="rank-avatar">'+(p.avatar||"🐟")+'</span><span class="rank-name">'+CB.esc(p.name)+(p.you?'<span class="you-tag">VOCÊ</span>':"")+"</span></div></td>"+
      '<td class="rank-xp">'+p.xp.toLocaleString("pt-BR")+" XP</td><td>Lv "+p.level+"</td><td>🏬 "+CB.esc(p.branch)+"</td></tr>";}
    let body=top.map(row).join("");
    if(!inTop&&me)body+='<tr><td colspan="5" style="text-align:center;color:var(--text-mute)">· · ·</td></tr>'+row(me);
    table='<div class="panel"><table class="rank-table"><thead><tr><th>#</th><th>Jogador</th><th>XP Total</th><th>Nível</th><th>Filial</th></tr></thead><tbody>'+body+"</tbody></table></div>";
  }else{
    /* COLABORADOR: ranking só da própria filial */
    const myBranch=u.branch;
    const lb=CB.leaderboard().filter(function(p){return p.branch===myBranch;});
    lb.forEach(function(p,i){p.pos=i+1;});
    const me=lb.find(function(p){return p.you;});
    function medal2(pos){return pos===1?"🥇":pos===2?"🥈":pos===3?"🥉":pos;}
    function row2(p){return'<tr class="rank-row'+(p.you?" you":"")+'"><td class="rank-pos">'+medal2(p.pos)+"</td>"+
      '<td><div class="rank-player"><span class="rank-avatar">'+(p.avatar||"🐟")+'</span><span class="rank-name">'+CB.esc(p.name)+(p.you?'<span class="you-tag">VOCÊ</span>':"")+"</span></div></td>"+
      '<td class="rank-xp">'+p.xp.toLocaleString("pt-BR")+" XP</td><td>Lv "+p.level+"</td></tr>";}
    const body=lb.map(row2).join("");
    const branchInfo=CB.branchLeaderboard().find(function(b){return b.branch===myBranch;});
    const branchPos=branchInfo?branchInfo.pos:"—";
    table='<div class="panel" style="margin-bottom:16px"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:8px">'+
      '<div><h3 style="margin:0">🏬 '+CB.esc(myBranch)+'</h3>'+
      '<span class="section-sub" style="margin:0">'+(branchInfo?branchInfo.members+" colaboradores · "+branchInfo.xp.toLocaleString("pt-BR")+" XP total":"")+'</span></div>'+
      '<div class="rank-title" style="font-size:1.1rem">Posição entre filiais: <b style="color:var(--neon)">#'+branchPos+'</b></div></div></div>'+
      '<div class="panel"><table class="rank-table"><thead><tr><th>#</th><th>Jogador</th><th>XP Total</th><th>Nível</th></tr></thead><tbody>'+body+"</tbody></table></div>";
  }
  CB._afterView=function(){document.querySelectorAll("[data-rt]").forEach(function(b){b.onclick=function(){CB._rankTab=b.getAttribute("data-rt");CB.go("ranking");};});};
  const titulo=isAdmin?"Ranking Global":"Ranking — "+CB.esc(u.branch);
  const sub=isAdmin?"Visão geral de todos os colaboradores e filiais.":"Veja sua posição entre os colegas da sua filial.";
  return'<h2 class="section-title">'+titulo+'</h2><p class="section-sub">'+sub+'</p>'+tabs+table;
};

/* ─── CONQUISTAS ─── */
CB.viewAchievements=function(){
  const u=CB.user(),total=CB.BADGES.length,unlocked=u.badges.length,pct=Math.round((unlocked/total)*100),li=CB.levelInfo(u.xp);
  const grid=CB.BADGES.map(function(b,i){const has=u.badges.indexOf(b.id)!==-1;
    return'<div class="badge '+(has?"unlocked":"locked")+'"><div class="b-hex">'+(has?b.icon:"🔒")+"</div>"+
    "<h4>"+(i+1)+". "+CB.esc(b.name)+"</h4><p>"+CB.esc(b.desc)+"</p>"+
    (has?'<div class="b-date">✔ DESBLOQUEADA</div>':'<div class="b-locked">🔒 '+CB.esc(b.cond)+"</div>")+"</div>";}).join("");
  return'<div class="ach-head"><div><h2 class="section-title">Suas Conquistas</h2>'+
    '<p class="section-sub" style="margin:0">'+CB.esc(u.name)+" · Patente: "+CB.rankTitle(li.level)+"</p></div>"+
    '<div class="ach-progress-ring"><div class="ring" style="--p:'+pct+';position:relative"><div class="ring-inner">'+pct+'%</div></div>'+
    '<div><div style="color:var(--text-dim)">Total de badges</div><div style="font-family:var(--font-display);font-size:1.6rem;color:var(--neon)">'+unlocked+" / "+total+"</div>"+
    '<div style="color:var(--text-dim)">Nível '+li.level+" · "+(u.xp||0).toLocaleString("pt-BR")+" XP</div></div></div></div>"+
    '<div class="badge-grid">'+grid+"</div>";
};

/* ─── CERTIFICADOS NO PERFIL ─── */

/* ─── CERTIFICADOS ─── */
CB.canGetCertificate=function(u){
  u=u||CB.user();
  if(!u||!u.missions)return false;
  if(!CB.onboardingDone(u))return false;
  try{return CB.MODULES.every(function(m){return CB.moduleCompleted(m.id,u);});}catch(e){return false;}
};

CB.checkNewCerts=function(){
  var u;try{u=CB.user();}catch(e){return;}
  if(!u||!u.missions)return;
  if(!u._certs)u._certs=[];
  CB.MODULES.forEach(function(m){
    var certId="mod-"+m.id;
    try{
      if(u._certs.indexOf(certId)===-1&&CB.moduleCompleted(m.id,u)){
        u._certs.push(certId);
        try{CB.Sound.play("badge");}catch(e){}CB.toast("Novo certificado","Selo de conclusão: "+m.title,"");
      }
    }catch(e){}
  });
  if(u._certs.indexOf("final")===-1&&CB.canGetCertificate(u)){
    u._certs.push("final");
    try{CB.Sound.play("badge");}catch(e){}CB.toast("Certificado Final","Guardião da Cibersegurança desbloqueado","");
  }
  try{CB.save();}catch(e){}
};

CB.showCertificate=function(){
  var u=CB.user();
  if(!CB.canGetCertificate(u)){CB.toast("Atenção","Complete todos os módulos primeiro","");return;}
  var li=CB.levelInfo(u.xp||0);
  var dt=new Date().toLocaleDateString("pt-BR",{day:"2-digit",month:"long",year:"numeric"});
  var tm=CB.allMissions().length;
  var h='<div class="cert-overlay" id="cert-overlay"><div class="cert-page"><div class="cert-border">'+
    '<div class="cert-header"><div class="cert-logos">🛡️ <span class="cert-brand">CRITICAL <b>BAIT</b></span> | <span class="cert-lm">LEROY MERLIN</span></div>'+
    '<div class="cert-ribbon">CERTIFICADO DE CONCLUSÃO</div></div>'+
    '<div class="cert-body"><p class="cert-declare">Certificamos que</p>'+
    '<h2 class="cert-name">'+CB.esc(u.name)+'</h2>'+
    '<p class="cert-desc">completou com êxito o <b>Programa de Conscientização em Cibersegurança</b> da Leroy Merlin.</p>'+
    '<div class="cert-topics"><span>🎣 Phishing</span><span>🎭 Eng. Social</span><span>🔐 Senhas</span><span>🦠 Malware</span><span>🗄️ LGPD</span><span>🧹 Mesa Limpa</span><span>📧 E-mail</span><span>🏠 Remoto</span><span>🚨 Incidentes</span></div>'+
    '<div class="cert-stats"><div class="cert-stat"><b>'+tm+'</b><small>Exercícios</small></div>'+
    '<div class="cert-stat"><b>Nv '+li.level+'</b><small>'+CB.rankTitle(li.level)+'</small></div>'+
    '<div class="cert-stat"><b>'+(u.xp||0).toLocaleString("pt-BR")+'</b><small>XP</small></div>'+
    '<div class="cert-stat"><b>'+(u.badges||[]).length+'/30</b><small>Badges</small></div></div>'+
    '<div class="cert-sign"><div class="cert-col"><p>'+dt+'</p><div class="cert-line"></div><p class="cert-label">Data</p></div>'+
    '<div class="cert-col"><p>'+CB.esc(u.dept)+' · '+CB.esc(u.branch)+'</p><div class="cert-line"></div><p class="cert-label">Depto · Filial</p></div></div>'+
    '<p class="cert-id">ID: CB-'+Date.now().toString(36).toUpperCase()+'</p>'+
    '</div></div></div><div class="cert-actions">'+
    '<button class="btn-primary" id="cert-print">🖨️ IMPRIMIR / SALVAR PDF</button>'+
    '<button class="btn-soft" id="cert-close">FECHAR</button></div></div>';
  document.getElementById("modais").innerHTML=h;
  document.getElementById("cert-print").onclick=function(){window.print();};
  document.getElementById("cert-close").onclick=function(){document.getElementById("modais").innerHTML="";};
};

CB.showModuleCert=function(modId){
  var u=CB.user();
  var mod=CB.MODULES.find(function(m){return m.id===modId;});
  if(!mod)return;
  var dt=new Date().toLocaleDateString("pt-BR",{day:"2-digit",month:"long",year:"numeric"});
  var h='<div class="cert-overlay" id="cert-overlay"><div class="cert-page cert-mini"><div class="cert-border">'+
    '<div class="cert-header"><div class="cert-logos">🛡️ <span class="cert-brand">CRITICAL <b>BAIT</b></span> | <span class="cert-lm">LEROY MERLIN</span></div>'+
    '<div class="cert-ribbon cert-ribbon-mod">SELO DE CONCLUSÃO</div></div>'+
    '<div class="cert-body"><div class="cert-mod-icon">'+mod.icon+'</div>'+
    '<h3 class="cert-mod-title">'+CB.esc(mod.title)+'</h3>'+
    '<p class="cert-declare" style="margin-top:8px">Concluído por</p>'+
    '<h2 class="cert-name" style="font-size:1.6rem">'+CB.esc(u.name)+'</h2>'+
    '<p class="cert-desc">Completou todas as <b>'+mod.missions.length+' missões</b> · Dificuldade: <b>'+CB.esc(mod.difficulty||"—")+'</b></p>'+
    '<div class="cert-sign" style="margin-top:20px"><div class="cert-col"><p>'+dt+'</p><div class="cert-line"></div><p class="cert-label">Data</p></div>'+
    '<div class="cert-col"><p>'+CB.esc(u.branch)+'</p><div class="cert-line"></div><p class="cert-label">Filial</p></div></div>'+
    '<p class="cert-id">ID: CB-M-'+modId.toUpperCase()+'-'+Date.now().toString(36).toUpperCase()+'</p>'+
    '</div></div></div><div class="cert-actions">'+
    '<button class="btn-primary" id="cert-print">🖨️ IMPRIMIR / SALVAR PDF</button>'+
    '<button class="btn-soft" id="cert-close">FECHAR</button></div></div>';
  document.getElementById("modais").innerHTML=h;
  document.getElementById("cert-print").onclick=function(){window.print();};
  document.getElementById("cert-close").onclick=function(){document.getElementById("modais").innerHTML="";};
};

CB._buildCertSection=function(u){
  if(!u)return'';
  var certs=u._certs||[];
  if(!certs.length)return'<div class="panel" style="margin-bottom:18px"><h3 style="margin-bottom:12px">Meus Certificados</h3><p class="section-sub" style="margin:0">Complete módulos para ganhar selos de conclusão.</p></div>';
  var cards="";
  CB.MODULES.forEach(function(m){
    if(certs.indexOf("mod-"+m.id)!==-1){
      cards+='<div class="cert-card"><div class="cert-card-ico">'+m.icon+'</div><div class="cert-card-info"><b>'+CB.esc(m.title)+'</b><small>Selo de conclusão</small></div><button class="btn-soft btn-xs" data-dlcert="'+m.id+'">📥 Ver</button></div>';
    }
  });
  if(certs.indexOf("final")!==-1){
    cards+='<div class="cert-card cert-card-final"><div class="cert-card-ico">🏆</div><div class="cert-card-info"><b>Guardião da Cibersegurança</b><small>Certificado completo</small></div><button class="btn-primary btn-xs" data-dlcert="final">📥 Ver</button></div>';
  }
  return'<div class="panel" style="margin-bottom:18px"><h3 style="margin-bottom:12px">Meus Certificados <span style="color:var(--neon);font-size:0.85rem">('+certs.length+')</span></h3><div class="cert-cards">'+cards+'</div></div>';
};

/* ─── PERFIL ─── */
CB.viewProfile=function(){
  var u;try{u=CB.user();}catch(e){u=null;}
  if(!u)return'<div class="panel"><p>Erro ao carregar perfil. Faça login novamente.</p></div>';
  var li=CB.levelInfo(u.xp||0);var rank;
  try{rank=CB.myRank();}catch(e){rank={rank:"—"};}
  const sel=function(id,list,cur){return'<select id="'+id+'">'+list.map(function(o){return'<option'+(o===cur?" selected":"")+">"+CB.esc(o)+"</option>";}).join("")+"</select>";};
  const missionStats=CB.allMissions().map(function(mi){
    const ms=u.missions[mi.id]||{plays:0,bestAccuracy:0};
    const barW=ms.bestAccuracy;
    const barColor=ms.bestAccuracy>=80?"var(--neon)":ms.bestAccuracy>=60?"var(--gold)":"var(--danger)";
    return"<tr><td>"+mi.icon+" "+CB.esc(mi.title)+"</td><td>"+ms.plays+"</td><td>"+
      '<div class="acc-bar-wrap"><div class="acc-bar" style="width:'+barW+'%;background:'+barColor+'"></div><span>'+ms.bestAccuracy+"%</span></div></td></tr>";
  }).join("");

  /* conquistas desbloqueadas para exibir no perfil */
  const earnedBadges=CB.BADGES.filter(function(b){return u.badges.indexOf(b.id)!==-1;});
  const pinnedIds=u._pinnedBadges||[];
  const pinned=pinnedIds.map(function(id){return CB.BADGES.find(function(b){return b.id===id;});}).filter(Boolean);
  const unpinned=earnedBadges.filter(function(b){return pinnedIds.indexOf(b.id)===-1;});

  const pinnedHtml=pinned.length?pinned.map(function(b){
    return'<div class="profile-badge-pin" data-unpin="'+b.id+'" title="Clique para remover do destaque"><span class="pb-ico">'+b.icon+'</span><span class="pb-name">'+CB.esc(b.name)+'</span></div>';
  }).join(""):'<p style="color:var(--text-mute);font-size:0.85rem;margin:0">Nenhuma conquista em destaque ainda. Clique nas badges abaixo para destacar até 3.</p>';

  const earnedGrid=earnedBadges.length?earnedBadges.map(function(b){
    const isPinned=pinnedIds.indexOf(b.id)!==-1;
    return'<button class="profile-badge-item '+(isPinned?"pinned":"")+'" data-pin="'+b.id+'" title="'+(isPinned?"Remover do destaque":"Destacar no perfil")+'">'+
      '<span>'+b.icon+'</span><small>'+CB.esc(b.name)+'</small></button>';
  }).join(""):'<p style="color:var(--text-mute);font-size:0.85rem">Complete missões para desbloquear conquistas.</p>';

  CB._afterView=function(){
    /* certificados: botões de ver/download */
    document.querySelectorAll("[data-dlcert]").forEach(function(btn){
      btn.onclick=function(){
        var id=btn.getAttribute("data-dlcert");
        if(id==="final"){CB.showCertificate();}
        else{CB.showModuleCert(id);}
      };
    });

    /* avatar picker como popup centralizado */
    var avClick=document.getElementById("avatar-click");
    if(avClick){
      avClick.onclick=function(){
        var u2=CB.user();
        var grid=CB.AVATARS.map(function(a){
          return'<button class="av-pick-btn'+(a===u2.avatar?" av-current":"")+'" data-av="'+a+'">'+a+'</button>';
        }).join("");
        var html='<div class="game-modal pop" style="width:min(380px,92vw)"><div class="game-top">'+
          '<span class="gt-title">Escolha seu Avatar</span>'+
          '<button class="gt-close" id="av-close">✕</button></div>'+
          '<div class="game-body"><div class="av-picker-grid-popup">'+grid+'</div></div></div>';
        CB.openOverlay(html);
        document.getElementById("av-close").onclick=function(){CB.closeOverlay();};
        CB.overlayEl().onclick=function(e){if(e.target===CB.overlayEl())CB.closeOverlay();};
        document.querySelectorAll(".av-pick-btn").forEach(function(b){
          b.onclick=function(){CB.user().avatar=b.getAttribute("data-av");CB.save();CB.closeOverlay();CB.go("profile");};
        });
      };
    }

    /* pin/unpin badges */
    document.querySelectorAll("[data-pin]").forEach(function(btn){
      btn.onclick=function(){
        var id=btn.getAttribute("data-pin");
        var u2=CB.user();
        if(!u2._pinnedBadges)u2._pinnedBadges=[];
        var idx=u2._pinnedBadges.indexOf(id);
        if(idx!==-1){u2._pinnedBadges.splice(idx,1);}
        else{if(u2._pinnedBadges.length>=3){CB.toast("Limite","Máximo de 3 em destaque. Remova uma antes de adicionar outra.","⚠️");return;}u2._pinnedBadges.push(id);try{CB.Sound.play("correct");}catch(e){}}
        CB.save();CB.go("profile");
      };
    });
    document.querySelectorAll("[data-unpin]").forEach(function(btn){
      btn.onclick=function(){
        var id=btn.getAttribute("data-unpin");
        var u2=CB.user();
        if(!u2._pinnedBadges)return;
        var idx=u2._pinnedBadges.indexOf(id);
        if(idx!==-1){u2._pinnedBadges.splice(idx,1);CB.save();CB.go("profile");}
      };
    });

    const saveInfo=document.getElementById("save-info");
    if(saveInfo)saveInfo.onclick=function(){const u2=CB.user();u2.dept=document.getElementById("p-dept").value;u2.role=document.getElementById("p-role").value;u2.branch=document.getElementById("p-branch").value;CB.save();CB.toast("Perfil atualizado",u2.role+" · "+u2.branch,"✅");CB.go("profile");};
    const chg=document.getElementById("change-pass");
    if(chg)chg.onclick=async function(){const oldp=document.getElementById("cp-old").value,np=document.getElementById("cp-new").value;const msg=document.getElementById("cp-msg");chg.disabled=true;const r=await CB.Auth.changePassword(oldp,np);chg.disabled=false;msg.className="auth-msg "+(r.ok?"ok":"err");msg.textContent=r.ok?"✅ Senha alterada com sucesso!":r.error;if(r.ok){document.getElementById("cp-old").value="";document.getElementById("cp-new").value="";}};

    CB._bindPwToggles(document.getElementById("view"));
    var pLogout=document.getElementById("profile-logout");
    if(pLogout)pLogout.onclick=function(){CB.Auth.logout();CB.showLogin();};
  };

  return'<div class="profile-head"><div class="profile-avatar" id="avatar-click" title="Clique para trocar o avatar" style="cursor:pointer;position:relative">'+(u.avatar||"🐟")+'<span class="av-edit-hint">✏️</span></div>'+
    '<div class="profile-meta"><h2>'+CB.esc(u.name)+"</h2>"+
    '<div class="rank-title">'+CB.rankTitle(li.level)+" · Nível "+li.level+"</div>"+
    '<div class="dept">'+CB.esc(u.email)+" · #"+rank.rank+" no ranking</div>"+
    '<div class="profile-pinned">'+pinnedHtml+'</div>'+
    '</div></div>'+
    CB._buildCertSection(u)+
    '<div class="panel" style="margin-bottom:18px"><h3 style="margin-bottom:12px">Conquistas em destaque <span style="color:var(--text-mute);font-size:0.8rem;font-weight:400">(clique para destacar até 3)</span></h3>'+
    '<div class="profile-badges-grid">'+earnedGrid+'</div></div>'+
    '<div class="grid cols-2">'+
    '<div class="panel"><h3 style="margin-bottom:14px">📊 Estatísticas</h3><div class="stat-row" style="grid-template-columns:repeat(2,1fr)">'+
    CB._stat((u.xp||0).toLocaleString("pt-BR"),"XP total")+CB._stat(u.badges.length+"/"+CB.BADGES.length,"Conquistas")+
    CB._stat(u.bestStreak,"Melhor sequência")+CB._stat("#"+rank.rank,"Ranking")+"</div></div>"+
    '<div class="panel"><h3 style="margin-bottom:14px">🏢 Meus dados</h3>'+
    '<label class="field-label">Departamento</label><div class="input-wrap">'+sel("p-dept",CB.DEPARTMENTS,u.dept)+"</div>"+
    '<label class="field-label">Função</label><div class="input-wrap">'+sel("p-role",CB.ROLES,u.role)+"</div>"+
    '<label class="field-label">Filial</label><div class="input-wrap">'+sel("p-branch",CB.BRANCHES,u.branch)+"</div>"+
    '<button class="btn-soft" id="save-info" style="margin-top:14px">💾 Salvar dados</button></div></div>'+
    '<div class="grid cols-2" style="margin-top:18px">'+
    '<div class="panel"><h3 style="margin-bottom:14px">🔑 Trocar senha</h3>'+
    '<label class="field-label">Senha atual</label><div class="input-wrap"><input id="cp-old" type="password" placeholder="••••••••"/>'+CB.eyeBtn()+"</div>"+
    '<label class="field-label">Nova senha</label><div class="input-wrap"><input id="cp-new" type="password" placeholder="mín. 8, forte"/>'+CB.eyeBtn()+"</div>"+
    '<button class="btn-primary" id="change-pass" style="margin-top:14px">Alterar senha</button><div id="cp-msg" class="auth-msg"></div></div>'+
    '<div class="panel"><h3 style="margin-bottom:14px">Desempenho</h3>'+
    '<div class="perf-scroll"><table class="rank-table"><thead><tr><th>Missão</th><th>Partidas</th><th>Melhor %</th></tr></thead><tbody>'+missionStats+"</tbody></table></div></div></div>"+
    '<div style="margin-top:18px;text-align:right"><button class="btn-soft" id="profile-logout" style="color:var(--danger)">⎋ Sair da conta</button></div>';
};

/* ─── AUTENTICAÇÃO ─── */
CB.populateSelects=function(){const fill=function(id,list){const el=document.getElementById(id);if(el)el.innerHTML=list.map(function(o){return"<option>"+CB.esc(o)+"</option>";}).join("");};fill("reg-dept",CB.DEPARTMENTS);fill("reg-role",CB.ROLES);fill("reg-branch",CB.BRANCHES);};
CB.authMsg=function(text,ok){const m=document.getElementById("auth-msg");m.className="auth-msg "+(ok?"ok":"err");m.textContent=text||"";};
CB.showApp=function(){
  var ld=document.getElementById("landing");if(ld)ld.style.display="none";
  document.getElementById("login-screen").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");
  try{CB.refreshChrome();}catch(e){console.error(e);}
  CB.go("dashboard");
};
CB.showLogin=function(){
  var ld=document.getElementById("landing");if(ld)ld.style.display="none";
  document.getElementById("app").classList.add("hidden");
  document.getElementById("login-screen").classList.remove("hidden");
};

CB.showLanding=function(){
  var landing=document.getElementById("landing");
  if(landing){
    landing.style.display="";landing.style.opacity="1";
    document.getElementById("app").classList.add("hidden");
    document.getElementById("login-screen").classList.add("hidden");
  }else{
    CB.showLogin();
  }
};

CB._goToLogin=function(){
  var landing=document.getElementById("landing");
  if(landing){
    landing.style.transition="opacity .4s";landing.style.opacity="0";
    setTimeout(function(){landing.style.display="none";CB.showLogin();},400);
  }else{CB.showLogin();}
};
CB._bindPwToggles=function(root){(root||document).querySelectorAll(".pw-toggle").forEach(function(eye){if(eye._cb_bound)return;eye._cb_bound=true;eye.addEventListener("click",function(e){e.preventDefault();const wrap=eye.closest(".input-wrap");const inp=wrap&&wrap.querySelector("input");if(inp){const show=inp.type==="password";inp.type=show?"text":"password";eye.innerHTML=show?CB.eyeOff:CB.eyeOpen;eye.setAttribute("aria-label",show?"Ocultar senha":"Mostrar senha");}});});};


/* ─── SONS (Web Audio API) ─── */
CB.Sound={
  _ctx:null,
  _getCtx:function(){if(!this._ctx)try{this._ctx=new(window.AudioContext||window.webkitAudioContext)();}catch(e){}return this._ctx;},
  _enabled:true,
  toggle:function(){this._enabled=!this._enabled;try{localStorage.setItem("cb.sound",this._enabled?"1":"0");}catch(e){}return this._enabled;},
  init:function(){try{var v=localStorage.getItem("cb.sound");if(v==="0")this._enabled=false;}catch(e){}},
  play:function(type){
    if(!this._enabled)return;
    var ctx=this._getCtx();if(!ctx)return;
    try{
      var osc=ctx.createOscillator();
      var gain=ctx.createGain();
      osc.connect(gain);gain.connect(ctx.destination);
      gain.gain.value=0.15;
      if(type==="correct"){
        osc.type="sine";osc.frequency.value=880;
        gain.gain.setValueAtTime(0.15,ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+0.3);
        osc.start(ctx.currentTime);osc.stop(ctx.currentTime+0.3);
        /* segundo tom mais alto */
        var osc2=ctx.createOscillator();var g2=ctx.createGain();
        osc2.connect(g2);g2.connect(ctx.destination);
        osc2.type="sine";osc2.frequency.value=1174;
        g2.gain.setValueAtTime(0.12,ctx.currentTime+0.12);
        g2.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+0.4);
        osc2.start(ctx.currentTime+0.12);osc2.stop(ctx.currentTime+0.4);
      }else if(type==="wrong"){
        osc.type="square";osc.frequency.value=220;
        gain.gain.setValueAtTime(0.1,ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+0.25);
        osc.start(ctx.currentTime);osc.stop(ctx.currentTime+0.25);
      }else if(type==="badge"){
        osc.type="sine";osc.frequency.value=660;
        gain.gain.setValueAtTime(0.12,ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+0.15);
        osc.start(ctx.currentTime);osc.stop(ctx.currentTime+0.15);
        var o2=ctx.createOscillator();var g2=ctx.createGain();
        o2.connect(g2);g2.connect(ctx.destination);o2.type="sine";o2.frequency.value=880;
        g2.gain.setValueAtTime(0.12,ctx.currentTime+0.15);
        g2.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+0.3);
        o2.start(ctx.currentTime+0.15);o2.stop(ctx.currentTime+0.3);
        var o3=ctx.createOscillator();var g3=ctx.createGain();
        o3.connect(g3);g3.connect(ctx.destination);o3.type="sine";o3.frequency.value=1174;
        g3.gain.setValueAtTime(0.12,ctx.currentTime+0.3);
        g3.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+0.5);
        o3.start(ctx.currentTime+0.3);o3.stop(ctx.currentTime+0.5);
      }else if(type==="click"){
        osc.type="sine";osc.frequency.value=600;
        gain.gain.setValueAtTime(0.06,ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01,ctx.currentTime+0.08);
        osc.start(ctx.currentTime);osc.stop(ctx.currentTime+0.08);
      }
    }catch(e){}
  }
};

/* ─── TEMA CLARO/ESCURO ─── */
CB.Theme={
  _dark:true,
  init:function(){try{var v=localStorage.getItem("cb.theme");if(v==="light"){this._dark=false;document.body.classList.add("light-theme");}}catch(e){}},
  toggle:function(){
    this._dark=!this._dark;
    document.body.classList.toggle("light-theme",!this._dark);
    try{localStorage.setItem("cb.theme",this._dark?"dark":"light");}catch(e){}
    return this._dark;
  },
  isDark:function(){return this._dark;}
};


/* ─── CONFETTI ─── */
CB.confetti=function(){
  var container=document.createElement("div");
  container.className="confetti-container";
  document.body.appendChild(container);
  var colors=["#2BEE6B","#19E0C8","#FFD700","#FF6B6B","#A78BFA","#78BE20","#FF9F43","#54A0FF"];
  for(var i=0;i<60;i++){
    var piece=document.createElement("div");
    piece.className="confetti-piece";
    var color=colors[Math.floor(Math.random()*colors.length)];
    var left=Math.random()*100;
    var delay=Math.random()*1.5;
    var duration=2+Math.random()*2;
    var size=6+Math.random()*6;
    var rotation=Math.random()*360;
    var drift=(Math.random()-0.5)*200;
    piece.style.cssText="left:"+left+"%;width:"+size+"px;height:"+(size*0.4)+"px;background:"+color+
      ";animation-delay:"+delay+"s;animation-duration:"+duration+"s;--drift:"+drift+"px;--rot:"+rotation+"deg";
    container.appendChild(piece);
  }
  setTimeout(function(){container.remove();},5000);
};


/* ─── INTERNACIONALIZAÇÃO ─── */
CB.LANGS={
  pt:{
    lang:"Português",flag:"BR",
    login_title:"Acesse sua conta",login_sub:"Faça login ou crie uma conta para começar.",
    tab_login:"Entrar",tab_register:"Cadastrar",
    email:"E-mail",password:"Senha",name:"Nome completo",dept:"Departamento",role:"Função",branch:"Filial",
    remember:"Lembrar-me",forgot:"Esqueceu a senha?",btn_login:"ENTRAR",btn_register:"CRIAR CONTA",
    login_note:"Ambiente de treinamento — apenas e-mails @gmail.com",
    back:"Voltar",
    nav_dashboard:"Dashboard",nav_modulo:"Módulo",nav_path:"Path",nav_achievements:"Conquistas",nav_profile:"Perfil",nav_ranking:"Ranking",nav_admin:"Admin",
    theme:"Alternar Tema",logout:"Sair",
    welcome:"Olá,",
    brand_sub:"Plataforma de Conscientização<br>em Cibersegurança",
    brand_f1:"Treinamento gamificado para equipes",
    brand_f2:"Simulações de phishing e engenharia social",
    brand_f3:"Certificados e ranking por filial",
    brand_org:"Uma iniciativa",
    onboard_title:"Bem-vindo,",onboard_msg:"Antes de acessar as missões práticas do Path, você precisa completar o <b>Módulo de Treinamento</b> — são 6 temas fundamentais de segurança.",
    onboard_sub:"Depois de concluir, todas as abas serão desbloqueadas: Path, Ranking, Conquistas e mais!",
    onboard_btn:"INICIAR MÓDULO DE TREINAMENTO",
    xp_total:"XP Total",missions:"Missões",achievements_lbl:"Conquistas",ranking_lbl:"Ranking",branch_lbl:"Filial",progress:"Progresso",
    path_title:"Trilha de Treinamento",path_modules:"módulos",path_missions:"missões",
    modulo_title:"Módulo de Treinamento",modulo_sub:"Aprenda os fundamentos de segurança em 6 temas rápidos.",
    modulo_hint:"Complete todos os temas para desbloquear o Path de exercícios práticos.",
    modulo_done:"Módulo completo — o Path está desbloqueado.",
    quiz_respond:"Responda para completar",correct:"Correto!",wrong:"Tente novamente",next_theme:"PRÓXIMO TEMA →",finish:"CONCLUIR",
    profile_title:"Perfil",certs_title:"Meus Certificados",certs_empty:"Complete módulos para ganhar selos de conclusão.",
    perf_title:"Desempenho",badges_title:"Conquistas em destaque",
    cert_complete:"CERTIFICADO DE CONCLUSÃO",cert_seal:"SELO DE CONCLUSÃO",cert_print:"IMPRIMIR / SALVAR PDF",cert_close:"FECHAR",
    admin_overview:"Visão Geral",admin_users:"Usuários",admin_missions:"Missões",admin_content:"Conteúdo",
    export_pdf:"EXPORTAR RELATÓRIO PDF",
    filter_all:"Todos",filter_init:"Iniciante",filter_inter:"Intermediário",filter_adv:"Avançado",filter_exp:"Especialista",
    search_placeholder:"Buscar missão...",
    result_done:"MISSÃO CONCLUÍDA",result_fail:"MISSÃO ENCERRADA",result_perfect:"Pontuação perfeita!",
    review_title:"Revisão dos erros",review_ok:"Todas as respostas corretas.",
    btn_next:"PRÓXIMA MISSÃO",btn_replay:"REVER MISSÃO",btn_home:"VOLTAR AO PAINEL",
    mission_complete:"Missão concluída",
    confirm_exit:"Sair da missão? O progresso desta partida será perdido."
  },
  en:{
    lang:"English",flag:"US",
    login_title:"Sign in to your account",login_sub:"Log in or create an account to get started.",
    tab_login:"Sign In",tab_register:"Register",
    email:"Email",password:"Password",name:"Full name",dept:"Department",role:"Role",branch:"Branch",
    remember:"Remember me",forgot:"Forgot password?",btn_login:"SIGN IN",btn_register:"CREATE ACCOUNT",
    login_note:"Training environment — only @gmail.com emails",
    back:"Back",
    nav_dashboard:"Dashboard",nav_modulo:"Module",nav_path:"Path",nav_achievements:"Achievements",nav_profile:"Profile",nav_ranking:"Ranking",nav_admin:"Admin",
    theme:"Toggle Theme",logout:"Sign Out",
    welcome:"Hello,",
    brand_sub:"Cybersecurity<br>Awareness Platform",
    brand_f1:"Gamified training for teams",
    brand_f2:"Phishing and social engineering simulations",
    brand_f3:"Certificates and branch ranking",
    brand_org:"An initiative by",
    onboard_title:"Welcome,",onboard_msg:"Before accessing the practical Path missions, you need to complete the <b>Training Module</b> — 6 fundamental security topics.",
    onboard_sub:"Once completed, all tabs will be unlocked: Path, Ranking, Achievements and more!",
    onboard_btn:"START TRAINING MODULE",
    xp_total:"Total XP",missions:"Missions",achievements_lbl:"Achievements",ranking_lbl:"Ranking",branch_lbl:"Branch",progress:"Progress",
    path_title:"Training Path",path_modules:"modules",path_missions:"missions",
    modulo_title:"Training Module",modulo_sub:"Learn security fundamentals in 6 quick topics.",
    modulo_hint:"Complete all topics to unlock the practical exercises Path.",
    modulo_done:"Module complete — Path is unlocked.",
    quiz_respond:"Answer to complete",correct:"Correct!",wrong:"Try again",next_theme:"NEXT TOPIC →",finish:"FINISH",
    profile_title:"Profile",certs_title:"My Certificates",certs_empty:"Complete modules to earn completion seals.",
    perf_title:"Performance",badges_title:"Featured Achievements",
    cert_complete:"COMPLETION CERTIFICATE",cert_seal:"COMPLETION SEAL",cert_print:"PRINT / SAVE PDF",cert_close:"CLOSE",
    admin_overview:"Overview",admin_users:"Users",admin_missions:"Missions",admin_content:"Content",
    export_pdf:"EXPORT PDF REPORT",
    filter_all:"All",filter_init:"Beginner",filter_inter:"Intermediate",filter_adv:"Advanced",filter_exp:"Expert",
    search_placeholder:"Search mission...",
    result_done:"MISSION COMPLETE",result_fail:"MISSION ENDED",result_perfect:"Perfect score!",
    review_title:"Error review",review_ok:"All answers correct.",
    btn_next:"NEXT MISSION",btn_replay:"REVIEW MISSION",btn_home:"BACK TO PANEL",
    mission_complete:"Mission complete",
    confirm_exit:"Leave mission? Progress will be lost."
  },
  es:{
    lang:"Español",flag:"ES",
    login_title:"Accede a tu cuenta",login_sub:"Inicia sesión o crea una cuenta para comenzar.",
    tab_login:"Entrar",tab_register:"Registrar",
    email:"Correo",password:"Contraseña",name:"Nombre completo",dept:"Departamento",role:"Función",branch:"Sucursal",
    remember:"Recordarme",forgot:"¿Olvidó la contraseña?",btn_login:"ENTRAR",btn_register:"CREAR CUENTA",
    login_note:"Entorno de capacitación — solo correos @gmail.com",
    back:"Volver",
    nav_dashboard:"Panel",nav_modulo:"Módulo",nav_path:"Path",nav_achievements:"Logros",nav_profile:"Perfil",nav_ranking:"Ranking",nav_admin:"Admin",
    theme:"Cambiar Tema",logout:"Salir",
    welcome:"Hola,",
    brand_sub:"Plataforma de Concientización<br>en Ciberseguridad",
    brand_f1:"Capacitación gamificada para equipos",
    brand_f2:"Simulaciones de phishing e ingeniería social",
    brand_f3:"Certificados y ranking por sucursal",
    brand_org:"Una iniciativa de",
    onboard_title:"Bienvenido,",onboard_msg:"Antes de acceder a las misiones prácticas del Path, debes completar el <b>Módulo de Capacitación</b> — 6 temas fundamentales de seguridad.",
    onboard_sub:"Al completar, se desbloquearán todas las pestañas: Path, Ranking, Logros y más.",
    onboard_btn:"INICIAR MÓDULO DE CAPACITACIÓN",
    xp_total:"XP Total",missions:"Misiones",achievements_lbl:"Logros",ranking_lbl:"Ranking",branch_lbl:"Sucursal",progress:"Progreso",
    path_title:"Ruta de Capacitación",path_modules:"módulos",path_missions:"misiones",
    modulo_title:"Módulo de Capacitación",modulo_sub:"Aprende los fundamentos de seguridad en 6 temas rápidos.",
    modulo_hint:"Completa todos los temas para desbloquear el Path de ejercicios prácticos.",
    modulo_done:"Módulo completado — el Path está desbloqueado.",
    quiz_respond:"Responde para completar",correct:"¡Correcto!",wrong:"Inténtalo de nuevo",next_theme:"SIGUIENTE TEMA →",finish:"FINALIZAR",
    profile_title:"Perfil",certs_title:"Mis Certificados",certs_empty:"Completa módulos para obtener sellos.",
    perf_title:"Desempeño",badges_title:"Logros destacados",
    cert_complete:"CERTIFICADO DE FINALIZACIÓN",cert_seal:"SELLO DE FINALIZACIÓN",cert_print:"IMPRIMIR / GUARDAR PDF",cert_close:"CERRAR",
    admin_overview:"General",admin_users:"Usuarios",admin_missions:"Misiones",admin_content:"Contenido",
    export_pdf:"EXPORTAR INFORME PDF",
    filter_all:"Todos",filter_init:"Principiante",filter_inter:"Intermedio",filter_adv:"Avanzado",filter_exp:"Experto",
    search_placeholder:"Buscar misión...",
    result_done:"MISIÓN COMPLETADA",result_fail:"MISIÓN FINALIZADA",result_perfect:"¡Puntuación perfecta!",
    review_title:"Revisión de errores",review_ok:"Todas las respuestas correctas.",
    btn_next:"SIGUIENTE MISIÓN",btn_replay:"REVISAR MISIÓN",btn_home:"VOLVER AL PANEL",
    mission_complete:"Misión completada",
    confirm_exit:"¿Salir de la misión? Se perderá el progreso."
  }
};
CB._lang="pt";
CB.t=function(key){return(CB.LANGS[CB._lang]||CB.LANGS.pt)[key]||key;};
CB.setLang=function(lang){
  if(!CB.LANGS[lang])return;
  CB._lang=lang;
  try{localStorage.setItem("cb.lang",lang);}catch(e){}
  CB._applyLang();
};
CB._initLang=function(){try{var v=localStorage.getItem("cb.lang");if(v&&CB.LANGS[v])CB._lang=v;}catch(e){}CB._applyLang();};
CB._applyLang=function(){
  /* Login screen */
  var el;
  el=document.querySelector(".login-card-title");if(el)el.textContent=CB.t("login_title");
  el=document.querySelector(".login-card-sub");if(el)el.textContent=CB.t("login_sub");
  document.querySelectorAll(".auth-tab").forEach(function(t){
    if(t.getAttribute("data-tab")==="login")t.textContent=CB.t("tab_login");
    if(t.getAttribute("data-tab")==="register")t.textContent=CB.t("tab_register");
  });
  el=document.querySelector("#login-form .btn-block");if(el)el.textContent=CB.t("btn_login");
  el=document.querySelector("#register-form .btn-block");if(el)el.textContent=CB.t("btn_register");
  el=document.querySelector(".login-note");if(el)el.innerHTML=CB.t("login_note");
  el=document.getElementById("forgot-link");if(el)el.textContent=CB.t("forgot");
  el=document.querySelector(".login-brand-sub");if(el)el.innerHTML=CB.t("brand_sub");

  /* Nav items */
  var navMap={dashboard:"nav_dashboard",modulo:"nav_modulo",path:"nav_path",achievements:"nav_achievements",profile:"nav_profile",ranking:"nav_ranking",admin:"nav_admin"};
  document.querySelectorAll(".nav-item").forEach(function(n){
    var v=n.getAttribute("data-view");
    if(navMap[v]){var ico=n.querySelector(".nav-ico");n.textContent="";if(ico)n.appendChild(ico);n.appendChild(document.createTextNode(" "+CB.t(navMap[v])));}
  });
  /* Sidebar bottom */
  el=document.getElementById("theme-toggle");if(el)el.innerHTML=(CB.Theme&&CB.Theme.isDark()?"<span class=\"sb-ico\">◑</span> ":"<span class=\"sb-ico\">◐</span> ")+CB.t("theme");
  el=document.getElementById("logout-btn");if(el)el.innerHTML='<span class="sb-ico">↗</span> '+CB.t("logout");
  /* Lang selector highlight */

  /* Atualizar dropdowns de idioma */
  var flags={pt:"🇧🇷",en:"🇺🇸",es:"🇪🇸"};
  var names={pt:"Português",en:"English",es:"Español"};
  var codes={pt:"PT",en:"EN",es:"ES"};
  el=document.getElementById("lang-toggle");if(el)el.innerHTML=flags[CB._lang]+' '+codes[CB._lang]+' <span class="lang-arrow">▾</span>';
  el=document.getElementById("sidebar-lang-flag");if(el)el.textContent=flags[CB._lang];
  el=document.getElementById("sidebar-lang-label");if(el)el.textContent=names[CB._lang];
  document.querySelectorAll(".lang-opt").forEach(function(b){b.classList.toggle("active",b.getAttribute("data-lang")===CB._lang);});

};

CB.init=function(){
  CB.Sound.init();CB.Theme.init();CB._initLang();
  CB.renderBrands();CB.populateSelects();
  CB.DB.seed();CB.applyContentOverrides();
  document.querySelectorAll(".nav-item").forEach(function(b){b.onclick=function(){CB.go(b.getAttribute("data-view"));};});
  document.getElementById("logout-btn").onclick=function(){CB.Auth.logout();CB.showLogin();};

  document.addEventListener("click",function(e){
    const lvl=e.target.closest(".level-badge");
    if(lvl&&!document.getElementById("app").classList.contains("hidden"))CB.showLevelsModal();
  });
  CB._bindPwToggles();

  document.querySelectorAll(".auth-tab").forEach(function(t){t.onclick=function(){document.querySelectorAll(".auth-tab").forEach(function(x){x.classList.toggle("active",x===t);});const tab=t.getAttribute("data-tab");document.getElementById("login-form").classList.toggle("hidden",tab!=="login");document.getElementById("register-form").classList.toggle("hidden",tab!=="register");CB.authMsg("");};});
  /* idioma — dropdowns */
  var langToggle=document.getElementById("lang-toggle");
  var langMenu=document.getElementById("lang-menu");
  if(langToggle&&langMenu){
    langToggle.onclick=function(e){e.stopPropagation();langMenu.classList.toggle("hidden");};
  }
  var sidebarLangToggle=document.getElementById("sidebar-lang-toggle");
  var sidebarLangMenu=document.getElementById("sidebar-lang-menu");
  if(sidebarLangToggle&&sidebarLangMenu){
    sidebarLangToggle.onclick=function(e){e.stopPropagation();sidebarLangMenu.classList.toggle("hidden");};
  }
  document.querySelectorAll(".lang-opt").forEach(function(b){
    b.onclick=function(e){e.stopPropagation();CB.setLang(b.getAttribute("data-lang"));
      if(langMenu)langMenu.classList.add("hidden");
      if(sidebarLangMenu)sidebarLangMenu.classList.add("hidden");
    };
  });
  document.addEventListener("click",function(){
    if(langMenu)langMenu.classList.add("hidden");
    if(sidebarLangMenu)sidebarLangMenu.classList.add("hidden");
  });

  document.getElementById("forgot-link").onclick=function(e){e.preventDefault();CB.authMsg("Em produção, enviaríamos um link de redefinição ao seu e-mail corporativo.",true);};

  /* botão voltar para landing */
  var backBtn=document.getElementById("login-back-btn");
  if(backBtn)backBtn.onclick=function(){
    var landing=document.getElementById("landing");
    if(landing){
      document.getElementById("login-screen").classList.add("hidden");
      landing.style.display="";landing.style.opacity="1";
      if(!CB._noScroll)window.scrollTo(0,0);CB._noScroll=false;
    }
  };

  document.getElementById("login-form").onsubmit=async function(e){e.preventDefault();CB.authMsg("");const email=document.getElementById("login-email").value;const pass=document.getElementById("login-pass").value;const r=await CB.Auth.login(email,pass);
    if(r.ok){try{CB.Sound.play("badge");}catch(e){}CB.showApp();CB.toast("Bem-vindo!",r.user.name,"");}
    else{CB.authMsg(r.error,false);var c=document.querySelector(".login-card");if(c){c.classList.remove("shake");void c.offsetWidth;c.classList.add("shake");}}};

  document.getElementById("register-form").onsubmit=async function(e){e.preventDefault();CB.authMsg("");const r=await CB.Auth.register({name:document.getElementById("reg-name").value,email:document.getElementById("reg-email").value,password:document.getElementById("reg-pass").value,dept:document.getElementById("reg-dept").value,role:document.getElementById("reg-role").value,branch:document.getElementById("reg-branch").value});if(r.ok){CB.showApp();CB.toast("Conta criada","Bem-vindo, "+r.user.name,"");}else CB.authMsg(r.error,false);};

  /* começa na landing page — login só quando clicar "acessar" */
  CB.Auth.logout();
  var landing=document.getElementById("landing");
  if(landing){
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("app").classList.add("hidden");
    /* botões da landing → login */
    ["lp-login-top","lp-start","lp-start2"].forEach(function(id){
      var btn=document.getElementById(id);if(btn)btn.onclick=function(){CB._goToLogin();};
    });
    var scrollBtn=document.getElementById("lp-scroll");
    if(scrollBtn)scrollBtn.onclick=function(){
      var t=document.getElementById("lp-about");
      if(t)t.scrollIntoView({behavior:"smooth"});
    };
  }else{
    CB.showLogin();
  }
};

document.addEventListener("DOMContentLoaded",CB.init);
