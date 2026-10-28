/* ============================================================
   CRITICAL BAIT — Gestão de conteúdo e relatórios
   ============================================================ */
window.CB = window.CB || {};
CB._adminTab = "overview";

CB.applyContentOverrides = function(){
  /* guarda cópia das perguntas originais uma única vez */
  if(!CB._quizBase){
    CB._quizBase={};
    Object.keys(CB.QUIZZES).forEach(function(k){CB._quizBase[k]=CB.QUIZZES[k].slice();});
  }
  
  const cq=CB.DB.data.contentQuiz||{};
  Object.keys(CB._quizBase).forEach(function(k){
    const base=CB._quizBase[k];
    const extras=Array.isArray(cq[k]) ? cq[k] : [];
    const existentes=new Set(base.map(function(q){return q.q;}));
    const novas=extras.filter(function(q){
      return q && typeof q.q==="string" && !existentes.has(q.q);
    });
    CB.QUIZZES[k]=base.concat(novas);
  });
};

CB.viewAdmin = function(){
  if(!CB.Auth.isAdmin())return'<div class="panel">Acesso restrito.</div>';
  const tab=CB._adminTab;
  const defs=[["overview","Visão Geral"],["users","Usuários"],["missions","Missões"],["content","Conteúdo"]];
  const tabsHtml='<div class="rank-tabs">'+defs.map(function(d){return'<button class="rank-tab '+(tab===d[0]?"active":"")+'" data-at="'+d[0]+'">'+d[1]+"</button>";}).join("")+"</div>";
  let body="";
  if(tab==="overview")body=CB._adminOverview();
  else if(tab==="users")body=CB._adminUsers();
  else if(tab==="missions")body=CB._adminMissions();
  else if(tab==="content")body=CB._adminContent();
  CB._afterView=function(){
    document.querySelectorAll("[data-at]").forEach(function(b){b.onclick=function(){CB._adminTab=b.getAttribute("data-at");CB.go("admin");};});
    CB._bindAdminActions();
  };
  return'<h2 class="section-title">🛠️ Painel Administrativo</h2><p class="section-sub">Gestão da campanha de conscientização — Leroy Merlin.</p>'+tabsHtml+body;
};

CB._adminOverview=function(){
  const players=CB.DB.players();const totalUsers=players.length;
  let completed=0,levels=0;
  players.forEach(function(u){completed+=Object.keys(u.missions||{}).filter(function(k){return u.missions[k].completed;}).length;levels+=CB.levelInfo(u.xp).level;});
  const avg=totalUsers?(levels/totalUsers).toFixed(1):0;
  const blocked=0;
  const topB=CB.branchLeaderboard()[0];

  /* ── Gráfico 1: XP por filial (barras horizontais) ── */
  const branches=CB.branchLeaderboard().slice(0,8);
  const maxBXP=branches.length?branches[0].xp:1;
  const branchBars=branches.map(function(b){
    const pct=Math.round((b.xp/maxBXP)*100);
    return'<div class="chart-row"><span class="chart-label">'+CB.esc(b.branch.split(" - ")[0])+'</span>'+
      '<div class="chart-bar-track"><div class="chart-bar-fill" style="width:'+pct+'%"></div></div>'+
      '<span class="chart-val">'+b.xp.toLocaleString("pt-BR")+'</span></div>';
  }).join("");

  /* ── Gráfico 2: Desempenho por módulo (barras) ── */
  const modPerf=CB.MODULES.map(function(mod){
    let sum=0,n=0;
    mod.missions.forEach(function(mi){
      players.forEach(function(u){
        if(u.missions&&u.missions[mi.id]&&u.missions[mi.id].bestAccuracy){
          sum+=u.missions[mi.id].bestAccuracy;n++;
        }
      });
    });
    return{icon:mod.icon,title:mod.title.split(" ").slice(0,2).join(" "),avg:n?Math.round(sum/n):0};
  });
  modPerf.sort(function(a,b){return b.avg-a.avg;});
  const modBars=modPerf.map(function(m){
    const color=m.avg>=80?"var(--neon)":m.avg>=60?"var(--gold)":"var(--danger)";
    return'<div class="chart-row"><span class="chart-label">'+m.icon+" "+CB.esc(m.title)+'</span>'+
      '<div class="chart-bar-track"><div class="chart-bar-fill" style="width:'+m.avg+'%;background:'+color+'"></div></div>'+
      '<span class="chart-val">'+m.avg+'%</span></div>';
  }).join("");

  /* ── Gráfico 3: Distribuição de níveis (barras verticais) ── */
  const lvlDist={};
  players.forEach(function(u){var l=CB.levelInfo(u.xp).level;lvlDist[l]=(lvlDist[l]||0)+1;});
  const maxLvl=20;const maxCount=Math.max.apply(null,Object.values(lvlDist).concat([1]));
  var lvlBars="";
  for(var lv=1;lv<=maxLvl;lv++){
    var cnt=lvlDist[lv]||0;
    var h=cnt?Math.max(8,Math.round((cnt/maxCount)*100)):0;
    lvlBars+='<div class="vchart-col"><div class="vchart-bar" style="height:'+h+'%"'+(cnt?' title="'+cnt+' pessoa(s)"':"")+"></div>"+
      '<span class="vchart-lbl">'+lv+"</span></div>";
  }

  /* ── Gráfico 4: Taxa de conclusão (donut) ── */
  const totalMissions=CB.allMissions().length;
  const totalPossible=totalUsers*totalMissions;
  const completionRate=totalPossible?Math.round((completed/totalPossible)*100):0;

  /* ── Missões com menor desempenho ── */
  const weak=CB.weakPoints().slice(0,3);
  const weakHtml=weak.length?'<div class="panel" style="margin-top:16px"><h3 style="margin-bottom:10px">Pontos fracos da equipe</h3><table class="rank-table"><thead><tr><th>Missão</th><th>Módulo</th><th>Acerto médio</th><th>Respostas</th></tr></thead><tbody>'+
    weak.map(function(w){return"<tr><td>"+w.icon+" "+CB.esc(w.title)+"</td><td>"+CB.esc(w.module)+"</td>"+
      '<td><div class="acc-bar-wrap"><div class="acc-bar" style="width:'+w.avg+'%;background:var(--danger)"></div><span>'+w.avg+'%</span></div></td>'+
      "<td>"+w.n+"</td></tr>";}).join("")+"</tbody></table></div>":"";

  return'<div class="stat-row" style="grid-template-columns:repeat(4,1fr)">'+
    CB._stat(totalUsers,"Colaboradores")+CB._stat(completed,"Missões concluídas")+CB._stat(avg,"Nível médio")+CB._stat(CB.DB.players().reduce(function(a,u){return a+Object.keys(u.missions||{}).filter(function(k){return u.missions[k].completed;}).length;},0),"Total missões")+"</div>"+
    '<div class="grid cols-2" style="margin-top:16px">'+
    '<div class="panel"><h3 style="margin-bottom:14px">XP por Filial</h3><div class="chart-rows">'+branchBars+'</div></div>'+
    '<div class="panel"><h3 style="margin-bottom:14px">Desempenho por Módulo</h3><div class="chart-rows">'+modBars+'</div></div></div>'+
    '<div class="grid cols-2" style="margin-top:16px">'+
    '<div class="panel"><h3 style="margin-bottom:14px">Distribuição de Níveis</h3><div class="vchart">'+lvlBars+'</div><p class="section-sub" style="margin:8px 0 0;text-align:center">Nível dos colaboradores (1–20)</p></div>'+
    '<div class="panel" style="text-align:center"><h3 style="margin-bottom:14px">Taxa de Conclusão Geral</h3>'+
    '<div class="donut-wrap"><div class="donut" style="--pct:'+completionRate+'"><span class="donut-val">'+completionRate+'%</span></div></div>'+
    '<p class="section-sub" style="margin:12px 0 0">'+completed+' de '+totalPossible+' missões completadas</p></div></div>'+
    weakHtml+
    '<div style="margin-top:20px;text-align:center"><button class="btn-primary" id="export-pdf">EXPORTAR RELATÓRIO PDF</button></div>';
};

/* ─── EXPORTAR RELATÓRIO PDF ─── */
CB.exportAdminPDF=function(){
  var players=CB.DB.players();
  var totalUsers=players.length;
  var completed=0,levels=0;
  players.forEach(function(u){completed+=Object.keys(u.missions||{}).filter(function(k){return u.missions[k].completed;}).length;levels+=CB.levelInfo(u.xp).level;});
  var avg=totalUsers?(levels/totalUsers).toFixed(1):0;
  var blocked=0;
  var topB=CB.branchLeaderboard()[0];
  var totalMissions=CB.allMissions().length;
  var totalPossible=totalUsers*totalMissions;
  var completionRate=totalPossible?Math.round((completed/totalPossible)*100):0;
  var date=new Date().toLocaleDateString("pt-BR",{day:"2-digit",month:"long",year:"numeric"});
  var time=new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"});

  /* ranking filiais */
  var branchRows=CB.branchLeaderboard().map(function(b,i){
    return"<tr><td>"+(i+1)+"</td><td>"+CB.esc(b.branch)+"</td><td>"+b.xp.toLocaleString("pt-BR")+" XP</td><td>"+b.members+"</td><td>Lv "+b.avgLevel+"</td></tr>";
  }).join("");

  /* top 10 jogadores */
  var topPlayers=CB.leaderboard().slice(0,10).map(function(p,i){
    return"<tr><td>"+(i+1)+"</td><td>"+CB.esc(p.name)+"</td><td>"+CB.esc(p.branch)+"</td><td>"+p.xp.toLocaleString("pt-BR")+" XP</td><td>Lv "+p.level+"</td></tr>";
  }).join("");

  /* desempenho por módulo */
  var modRows=CB.MODULES.map(function(mod){
    var sum=0,n=0;
    mod.missions.forEach(function(mi){
      players.forEach(function(u){
        if(u.missions&&u.missions[mi.id]&&u.missions[mi.id].bestAccuracy){sum+=u.missions[mi.id].bestAccuracy;n++;}
      });
    });
    var avg2=n?Math.round(sum/n):0;
    return"<tr><td>"+mod.icon+" "+CB.esc(mod.title)+"</td><td>"+mod.missions.length+"</td><td>"+avg2+"%</td><td>"+(mod.difficulty||"—")+"</td></tr>";
  }).join("");

  /* pontos fracos */
  var weakRows=CB.weakPoints().slice(0,5).map(function(w){
    return"<tr><td>"+w.icon+" "+CB.esc(w.title)+"</td><td>"+CB.esc(w.module)+"</td><td>"+w.avg+"%</td><td>"+w.n+"</td></tr>";
  }).join("");



  var html='<!DOCTYPE html><html><head><meta charset="utf-8"><title>Relatório Critical Bait</title>'+
    '<style>'+
    'body{font-family:Segoe UI,system-ui,sans-serif;color:#1a2118;margin:0;padding:30px 40px;font-size:12px;line-height:1.5}'+
    'h1{color:#2b8a3e;font-size:22px;margin:0 0 4px}'+
    'h2{color:#2b8a3e;font-size:16px;margin:28px 0 10px;padding-bottom:6px;border-bottom:2px solid #e8ece5}'+
    'h3{font-size:13px;margin:16px 0 8px}'+
    '.header{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:3px solid #2b8a3e;padding-bottom:16px;margin-bottom:20px}'+
    '.header-right{text-align:right;color:#6b7a64;font-size:11px}'+
    '.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:16px 0}'+
    '.stat-box{background:#f4f6f3;border:1px solid #e2e6df;border-radius:8px;padding:12px;text-align:center}'+
    '.stat-num{font-size:24px;font-weight:800;color:#2b8a3e;display:block}'+
    '.stat-lbl{font-size:10px;color:#6b7a64;text-transform:uppercase;letter-spacing:1px}'+
    'table{width:100%;border-collapse:collapse;margin:8px 0}'+
    'th{background:#f4f6f3;color:#2b8a3e;text-align:left;padding:8px 10px;font-size:11px;border-bottom:2px solid #e2e6df}'+
    'td{padding:6px 10px;border-bottom:1px solid #f1f3f0;font-size:11px}'+
    'tr:nth-child(even){background:#fafbfa}'+
    '.footer{margin-top:30px;padding-top:12px;border-top:1px solid #e2e6df;color:#8a9590;font-size:10px;display:flex;justify-content:space-between}'+
    '.badge{display:inline-block;padding:2px 8px;border-radius:4px;font-size:10px;font-weight:600}'+
    '.badge-ok{background:#e8f5e9;color:#2b8a3e}.badge-warn{background:#fff3e0;color:#e65100}.badge-bad{background:#ffebee;color:#c62828}'+
    '@media print{body{padding:20px}h2{page-break-after:avoid}}'+
    '</style></head><body>'+

    '<div class="header"><div><h1>🛡️ CRITICAL BAIT</h1><p style="color:#6b7a64;margin:4px 0 0">Relatório da Campanha de Cibersegurança — Leroy Merlin</p></div>'+
    '<div class="header-right"><b>Gerado em:</b><br>'+date+'<br>'+time+'</div></div>'+

    '<h2>📊 Indicadores Gerais</h2>'+
    '<div class="stats">'+
    '<div class="stat-box"><span class="stat-num">'+totalUsers+'</span><span class="stat-lbl">Colaboradores</span></div>'+
    '<div class="stat-box"><span class="stat-num">'+completed+'</span><span class="stat-lbl">Missões concluídas</span></div>'+
    '<div class="stat-box"><span class="stat-num">'+avg+'</span><span class="stat-lbl">Nível médio</span></div>'+
    '<div class="stat-box"><span class="stat-num">'+completionRate+'%</span><span class="stat-lbl">Taxa de conclusão</span></div>'+
    '</div>'+
    (topB?'<p><b>Filial líder:</b> '+CB.esc(topB.branch)+' — '+topB.xp.toLocaleString("pt-BR")+' XP ('+topB.members+' colaboradores)</p>':'')+


    '<h2>🏬 Ranking por Filial</h2>'+
    '<table><thead><tr><th>#</th><th>Filial</th><th>XP Total</th><th>Membros</th><th>Nível médio</th></tr></thead><tbody>'+branchRows+'</tbody></table>'+

    '<h2>🏆 Top 10 Colaboradores</h2>'+
    '<table><thead><tr><th>#</th><th>Nome</th><th>Filial</th><th>XP</th><th>Nível</th></tr></thead><tbody>'+topPlayers+'</tbody></table>'+

    '<h2>📚 Desempenho por Módulo</h2>'+
    '<table><thead><tr><th>Módulo</th><th>Missões</th><th>Acerto médio</th><th>Dificuldade</th></tr></thead><tbody>'+modRows+'</tbody></table>'+

    (weakRows?'<h2>⚠️ Pontos Fracos da Equipe</h2>'+
    '<p style="color:#6b7a64">Missões com menor taxa de acerto — indicam temas que precisam de reforço.</p>'+
    '<table><thead><tr><th>Missão</th><th>Módulo</th><th>Acerto</th><th>Respostas</th></tr></thead><tbody>'+weakRows+'</tbody></table>':'')+



    '<div class="footer"><span>🛡️ Critical Bait — Leroy Merlin · Relatório gerado automaticamente</span><span>Classificação: Uso interno</span></div>'+
    '</body></html>';

  var w=window.open("","_blank");
  if(w){w.document.write(html);w.document.close();setTimeout(function(){w.print();},500);}
  else{CB.toast("Erro","Permita pop-ups para gerar o PDF.","⚠️");}
};

CB._adminUsers=function(){
  const allU=CB.DB.allUsers().slice().sort(function(a,b){return b.xp-a.xp;});
  const players=allU;
  const branchOpts=CB.BRANCHES.map(function(b){return'<option>'+CB.esc(b)+'</option>';}).join("");
  const rows=players.map(function(u){
    const isAdm=!!u.isAdmin;
    return"<tr><td><div class='rank-player'><span class='rank-avatar'>"+CB.esc(String(u.avatar||"🐟"))+"</span><span class='rank-name'>"+CB.esc(u.name)+(u.seed?' <span class="chip-seed">demo</span>':"")+"</span></div></td>"+
    "<td>"+CB.esc(u.email)+"</td>"+
    "<td>"+CB.esc(u.role)+"</td>"+
    '<td><select class="adm-branch-sel" data-branch-email="'+CB.esc(u.email)+'">'+CB.BRANCHES.map(function(b){return'<option'+(b===u.branch?' selected':'')+'>'+CB.esc(b)+'</option>';}).join("")+"</select></td>"+
    "<td>Lv "+CB.levelInfo(u.xp).level+"</td>"+
    '<td class="rank-xp">'+u.xp.toLocaleString("pt-BR")+"</td>"+
    '<td><span class="role-badge '+(isAdm?"role-admin":"role-member")+'">'+(isAdm?"Admin":"Membro")+"</span></td>"+
    "<td style='white-space:nowrap'>"+
    '<button class="btn-soft btn-xs" data-toggle-admin="'+CB.esc(u.email)+'">'+(isAdm?"→ Membro":"→ Admin")+"</button> "+
    '<button class="btn-soft btn-xs" data-reset="'+CB.esc(u.email)+'">zerar</button> '+
    '<button class="btn-soft btn-xs btn-danger" data-remove="'+CB.esc(u.email)+'">remover</button>'+
    "</td></tr>";
  }).join("");
  return'<div class="panel"><div class="adm-table-scroll"><table class="rank-table"><thead><tr><th>Nome</th><th>E-mail</th><th>Função</th><th>Filial</th><th>Nível</th><th>XP</th><th>Tipo</th><th>Ações</th></tr></thead><tbody>'+rows+"</tbody></table></div></div>";
};

CB._adminMissions=function(){
  var players=CB.DB.players();
  /* Desempenho por missão — todas as missões com stats */
  var missionStats=[];
  CB.MODULES.forEach(function(mod){
    mod.missions.forEach(function(mi){
      var sum=0,n=0,completions=0;
      players.forEach(function(u){
        if(u.missions&&u.missions[mi.id]){
          if(u.missions[mi.id].bestAccuracy){sum+=u.missions[mi.id].bestAccuracy;n++;}
          if(u.missions[mi.id].completed)completions++;
        }
      });
      missionStats.push({icon:mi.icon||mod.icon,title:mi.title,module:mod.title,avg:n?Math.round(sum/n):0,completions:completions,players:n,difficulty:mi.difficulty||mod.difficulty||"—"});
    });
  });
  missionStats.sort(function(a,b){return b.avg-a.avg;});

  var rows=missionStats.map(function(m){
    var color=m.avg>=80?"var(--neon)":m.avg>=60?"var(--gold)":"var(--danger)";
    return"<tr><td>"+m.icon+" "+CB.esc(m.title)+"</td><td>"+CB.esc(m.module)+"</td><td>"+CB.esc(m.difficulty)+"</td>"+
      '<td><div class="acc-bar-wrap"><div class="acc-bar" style="width:'+m.avg+'%;background:'+color+'"></div><span>'+m.avg+'%</span></div></td>'+
      "<td>"+m.completions+"</td><td>"+m.players+"</td></tr>";
  }).join("");

  return'<div class="panel"><h3 style="margin-bottom:14px">Desempenho por Missão</h3>'+
    '<div class="adm-table-scroll"><table class="rank-table"><thead><tr><th>Missão</th><th>Módulo</th><th>Dificuldade</th><th>Acerto médio</th><th>Conclusões</th><th>Jogadores</th></tr></thead><tbody>'+rows+"</tbody></table></div></div>";
};

CB._adminContent=function(){
  const quizCounts=Object.keys(CB.QUIZZES).map(function(k){return"<li><b>"+CB.esc(k)+"</b>: "+CB.QUIZZES[k].length+" perguntas</li>";}).join("");
  const modList=CB.MODULES.map(function(m){return"<li>"+m.icon+" <b>"+CB.esc(m.title)+"</b> — "+m.missions.map(function(mi){return CB.esc(mi.title);}).join(", ")+"</li>";}).join("");
  const quizOpts=Object.keys(CB.QUIZZES).map(function(k){return"<option>"+CB.esc(k)+"</option>";}).join("");

  
  var cq=CB.DB.data.contentQuiz||{};
  var customRows="";
  var customCount=0;
  Object.keys(cq).forEach(function(quizKey){
    (cq[quizKey]||[]).forEach(function(q,idx){
      customCount++;
      customRows+="<tr><td><span class='chip-seed'>"+CB.esc(quizKey)+"</span></td>"+
        "<td>"+CB.esc(q.q)+"</td>"+
        "<td>"+q.options.map(function(o,i){return(i===q.correct?"<b style='color:var(--neon)'>✔ ":"")+ CB.esc(o)+(i===q.correct?"</b>":"");}).join("<br>")+"</td>"+
        "<td><button class='btn-soft btn-xs btn-danger' data-delq='"+CB.esc(quizKey)+"' data-delqi='"+idx+"'>🗑️ remover</button></td></tr>";
    });
  });
  var customHtml=customCount>0
    ? '<div class="panel" style="margin-top:18px"><h3 style="margin-bottom:12px">Perguntas criadas pelo admin ('+customCount+')</h3>'+
      '<table class="rank-table"><thead><tr><th>Quiz</th><th>Pergunta</th><th>Opções</th><th>Ação</th></tr></thead><tbody>'+customRows+'</tbody></table></div>'
    : '<div class="panel" style="margin-top:18px"><h3 style="margin-bottom:12px">Perguntas criadas pelo admin</h3><p class="section-sub" style="margin:0">Nenhuma pergunta customizada ainda. Use o formulário acima para adicionar.</p></div>';

  return'<div class="grid cols-2">'+
    '<div class="panel"><h3 style="margin-bottom:12px">Nova pergunta de quiz</h3>'+
    '<label class="field-label">Quiz</label><div class="input-wrap"><select id="nq-quiz">'+quizOpts+"</select></div>"+
    '<label class="field-label">Pergunta</label><div class="input-wrap"><input id="nq-q" placeholder="Texto da pergunta"/></div>'+
    '<label class="field-label">Opção 1</label><div class="input-wrap"><input id="nq-o1"/></div>'+
    '<label class="field-label">Opção 2</label><div class="input-wrap"><input id="nq-o2"/></div>'+
    '<label class="field-label">Opção 3</label><div class="input-wrap"><input id="nq-o3"/></div>'+
    '<label class="field-label">Opção correta</label><div class="input-wrap"><select id="nq-correct"><option value="0">Opção 1</option><option value="1">Opção 2</option><option value="2">Opção 3</option></select></div>'+
    '<label class="field-label">Explicação</label><div class="input-wrap"><input id="nq-exp" placeholder="Por que essa é a resposta"/></div>'+
    '<button class="btn-primary" id="nq-add" style="margin-top:14px">Adicionar pergunta</button><div id="nq-msg" class="auth-msg"></div></div>'+
    '<div class="panel"><h3 style="margin-bottom:12px">Conteúdo atual</h3>'+
    '<p class="section-sub" style="margin:0 0 8px">Quizzes:</p><ul class="adm-list">'+quizCounts+"</ul>"+
    '<p class="section-sub" style="margin:14px 0 8px">Módulos & missões:</p><ul class="adm-list">'+modList+"</ul></div></div>"+
    customHtml;
};

/* Security tab removida */

CB._bindAdminActions=function(){
  // Barreira de interface apenas: permissões reais exigem validação no servidor.
  if(!CB.Auth.isAdmin())return;
  /* exportar PDF */
  var expBtn=document.getElementById("export-pdf");
  if(expBtn)expBtn.onclick=function(){try{CB.exportAdminPDF();}catch(e){CB.toast("Erro","Não foi possível gerar o relatório.","⚠️");console.error(e);}};

  
  document.querySelectorAll("[data-branch-email]").forEach(function(sel){
    sel.onchange=function(){
      var email=sel.getAttribute("data-branch-email");
      var u=CB.DB.data.users[email];
      if(u){u.branch=sel.value;CB.DB.save();CB.toast("Filial alterada",u.name+" → "+sel.value,"");}
    };
  });

  document.querySelectorAll("[data-toggle-admin]").forEach(function(b){
    b.onclick=function(){
      const email=b.getAttribute("data-toggle-admin");
      const u=CB.DB.data.users[email];
      if(!u)return;
      if(email===CB.ADMIN_EMAIL){CB.toast("Ação bloqueada","Não é possível alterar o administrador principal.","⛔");return;}
      const willBeAdmin=!u.isAdmin;
      if(confirm((willBeAdmin?"Tornar ":"Remover permissão de admin de ")+u.name+"?")){
        u.isAdmin=willBeAdmin;CB.DB.save();
        CB.toast("Tipo alterado",u.name+" → "+(willBeAdmin?"Admin":"Membro"),"🔄");CB.go("admin");
      }
    };
  });
  document.querySelectorAll("[data-reset]").forEach(function(b){
    b.onclick=function(){
      const u=CB.DB.data.users[b.getAttribute("data-reset")];
      if(u&&confirm("Zerar o progresso de "+u.name+"?")){u.xp=0;u.badges=[];u.missions={};u.streak=0;u.bestStreak=0;u.onboardingDone=false;u._obSteps=[];CB.DB.save();CB.toast("Progresso zerado",u.name,"");CB.go("admin");}
    };
  });
  document.querySelectorAll("[data-remove]").forEach(function(b){
    b.onclick=function(){
      const email=b.getAttribute("data-remove");const u=CB.DB.data.users[email];
      if(email===CB.ADMIN_EMAIL){CB.toast("Ação bloqueada","Não é possível remover o administrador principal.","⛔");return;}
      if(u&&confirm("Remover "+u.name+" definitivamente?")){delete CB.DB.data.users[email];CB.DB.save();CB.toast("Usuário removido",u.name,"🗑️");CB.go("admin");}
    };
  });
  const clear=document.getElementById("clear-log");
  if(clear)clear.onclick=function(){};
  const add=document.getElementById("nq-add");
  if(add)add.onclick=function(){
    const key=document.getElementById("nq-quiz").value;
    const q=document.getElementById("nq-q").value.trim();
    const opts=[document.getElementById("nq-o1").value.trim(),document.getElementById("nq-o2").value.trim(),document.getElementById("nq-o3").value.trim()];
    const correct=+document.getElementById("nq-correct").value;
    const exp=document.getElementById("nq-exp").value.trim();
    const msg=document.getElementById("nq-msg");
    if(!CB.Auth.isAdmin()){
      msg.className="auth-msg err";
      msg.textContent="Acesso restrito.";
      return;
    }
    if(!Object.prototype.hasOwnProperty.call(CB.QUIZZES,key) || !Array.isArray(CB.QUIZZES[key])){
      msg.className="auth-msg err";
      msg.textContent="Quiz inválido.";
      return;
    }
    if(!q||!opts[0]||!opts[1]||!opts[2]||!exp){msg.className="auth-msg err";msg.textContent="Preencha todos os campos.";return;}
    const question={q:q,options:opts,correct:correct,explain:exp};
    /* só adiciona — nunca substitui o que já existe */
    CB.QUIZZES[key].push(question);
    CB.DB.data.contentQuiz=CB.DB.data.contentQuiz||{};
    CB.DB.data.contentQuiz[key]=CB.DB.data.contentQuiz[key]||[];
    CB.DB.data.contentQuiz[key].push(question);
    CB.DB.save();
    const total=CB.QUIZZES[key].length;
    msg.className="auth-msg ok";
    msg.textContent="✅ Pergunta adicionada! Quiz '"+key+"' agora tem "+total+" perguntas.";
    ["nq-q","nq-o1","nq-o2","nq-o3","nq-exp"].forEach(function(id){var el=document.getElementById(id);if(el)el.value="";});
    CB.toast("Pergunta adicionada","Quiz "+key+" · "+total+" perguntas","➕");
  };

  
  document.querySelectorAll("[data-delq]").forEach(function(btn){
    btn.onclick=function(){
      var quizKey=btn.getAttribute("data-delq");
      var idx=parseInt(btn.getAttribute("data-delqi"),10);
      var cq=CB.DB.data.contentQuiz;
      if(!cq||!cq[quizKey]||!cq[quizKey][idx])return;
      var removedQ=cq[quizKey][idx].q;
      if(!confirm("Remover esta pergunta?\n\n\""+removedQ+"\""))return;
      
      cq[quizKey].splice(idx,1);
      if(cq[quizKey].length===0)delete cq[quizKey];
      CB.DB.save();
      /* remove do array em memória */
      var inMem=CB.QUIZZES[quizKey];
      if(inMem){
        for(var i=inMem.length-1;i>=0;i--){
          if(inMem[i].q===removedQ){inMem.splice(i,1);break;}
        }
      }
      CB.toast("Pergunta removida","Quiz "+quizKey,"");
      CB.go("admin");
    };
  });
};
