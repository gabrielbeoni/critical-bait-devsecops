/* ============================================================
   CRITICAL BAIT — Minigames v3
   Novidades: cronômetro por pergunta, anti-cópia, info por missão
   ============================================================ */
window.CB = window.CB || {};

CB.esc = function(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});};
CB.shuffle = function(arr){const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};

CB.overlayEl=function(){return document.getElementById("overlay");};
CB.openOverlay=function(html){const o=CB.overlayEl();o.innerHTML=html;o.classList.remove("hidden");};
CB.closeOverlay=function(){const o=CB.overlayEl();o.classList.add("hidden");o.innerHTML="";};
CB.toast=function(title,body,icon){const stack=document.getElementById("toast-stack");const el=document.createElement("div");el.className="toast";el.innerHTML='<div class="t-ico">'+(icon||"🏅")+'</div><div><div class="t-title">'+CB.esc(title)+'</div><div class="t-body">'+CB.esc(body)+"</div></div>";stack.appendChild(el);setTimeout(function(){el.remove();},3900);};

/* ─── anti-cópia nas áreas de jogo ─── */
CB._noSelect = function(el){
  if(!el)return;
  el.addEventListener("copy",function(e){e.preventDefault();});
  el.addEventListener("paste",function(e){e.preventDefault();});
  el.addEventListener("cut",function(e){e.preventDefault();});
  el.addEventListener("contextmenu",function(e){e.preventDefault();});
  el.addEventListener("selectstart",function(e){e.preventDefault();});
  el.style.userSelect="none";
  el.style.webkitUserSelect="none";
};

CB.Game={
  /* XP por acerto — escalonado por dificuldade
     Módulo teórico: 6×50 + 200 bonus = 500 XP
     Path (estimativa com ~150 respostas certas):
       Iniciante ~40/acerto, Intermediário ~60, Avançado ~85, Especialista ~120
       Total path ≈ 9.500 → com módulo ≈ 10.000 = nível 20 */
  XP:{ bonus:60, timed:80 },
  _diffXP:{ "Iniciante":40, "Intermediário":60, "Avançado":85, "Especialista":120 },
  missionXP:function(){
    var mi=this.mission;
    if(!mi)return 60;
    var mod=CB.moduleOf(mi.id);
    if(mod&&mod.difficulty&&this._diffXP[mod.difficulty])return this._diffXP[mod.difficulty];
    return 60;
  },
  /* tempo por pergunta (segundos) */
  _qTimer:null,_qLeft:0,_qTotal:0,

  start:function(missionId,opts){
    opts=opts||{};
    const mission=CB.missionById(missionId);
    if(!mission)return;
    this.mission=mission;
    this._clearQTimer();
    this.session={missionId:missionId,idx:0,correct:0,total:0,xp:0,wrongClicks:0,newBadges:[],rounds:[],isDaily:!!opts.daily,timedOut:false};

    if(mission.type==="cleandesk"){this._startCleandesk();return;}
    if(mission.type==="phishing") this.session.rounds=CB.shuffle(CB.EMAILS).slice(0,mission.count||6).map(function(e){return{type:"phishing",data:e};});
    else if(mission.type==="smishing") this.session.rounds=CB.shuffle(CB.MESSAGES).slice(0,mission.count||5).map(function(e){return{type:"smishing",data:e};});
    else if(mission.type==="pwspot") this.session.rounds=CB.shuffle(CB.PASSWORDS).slice(0,mission.count||5).map(function(p){return{type:"pwClassify",data:p};});
    else if(mission.type==="pwcreate") this.session.rounds=[{type:"pwCreate"}];
    else if(mission.type==="social") this.session.rounds=CB.shuffle(CB.SCENARIOS).slice(0,mission.count||5).map(function(s){return{type:"social",data:s};});
    else if(mission.type==="quiz"){
      var pool=CB.QUIZZES[mission.quiz]||[];
      this.session.rounds=CB.shuffle(pool).map(function(q){
        /* embaralhar opções e atualizar índice da correta */
        var opts=q.options.map(function(o,i){return{text:o,wasCorrect:i===q.correct};});
        var shuffled=CB.shuffle(opts);
        var newCorrect=0;
        shuffled.forEach(function(o,i){if(o.wasCorrect)newCorrect=i;});
        return{type:"quiz",data:{q:q.q,options:shuffled.map(function(o){return o.text;}),correct:newCorrect,explain:q.explain}};
      });
    }
    else if(mission.type==="urlspot") this.session.rounds=CB.shuffle(CB.URLS).slice(0,mission.count||6).map(function(u){return{type:"urlspot",data:u};});

    this.session.total=this.session.rounds.length;
    this.render();
  },

  /* ─── cronômetro por pergunta ─── */
  _clearQTimer:function(){if(this._qTimer){clearInterval(this._qTimer);this._qTimer=null;}},
  _startQTimer:function(sec,onExpire){
    this._clearQTimer();
    this._qLeft=sec;this._qTotal=sec;
    this._updateQTimerUI();
    const self=this;
    this._qTimer=setInterval(function(){
      self._qLeft--;
      self._updateQTimerUI();
      if(self._qLeft<=0){self._clearQTimer();onExpire();}
    },1000);
  },
  _updateQTimerUI:function(){
    const bar=document.getElementById("q-timer-bar");
    const lbl=document.getElementById("q-timer-lbl");
    if(!bar||!lbl)return;
    const pct=Math.max(0,(this._qLeft/this._qTotal)*100);
    bar.style.width=pct+"%";
    bar.style.background=this._qLeft<=5?"var(--danger)":this._qLeft<=10?"var(--gold)":"var(--neon)";
    lbl.textContent="⏱ "+this._qLeft+"s";
  },

  _title:function(){return(this.mission.moduleIcon||"🎮")+"  "+this.mission.title;},

  render:function(){
    const s=this.session;
    const pct=Math.round((s.idx/s.total)*100);
    const timerSec=this.mission.timerSec;
    const timerHtml=timerSec?'<div class="q-timer-row"><span class="q-timer-lbl" id="q-timer-lbl">⏱ '+timerSec+'s</span><div class="q-timer-track"><div class="q-timer-bar" id="q-timer-bar" data-cb-style="width:100%;background:var(--neon)"></div></div></div>':"";
    const infoBtn=this.mission.info?'<button class="btn-soft btn-info-mis" id="mis-info-btn" title="Ver conceito">❓ Conceito</button>':"";
    const shell='<div class="game-modal pop"><div class="game-top">'+
      '<span class="gt-title">'+CB.esc(this._title())+'</span>'+infoBtn+
      '<button class="gt-close" id="game-close" title="Sair">✕</button></div>'+
      '<div class="game-body">'+
      '<div class="game-progress"><span class="gp-label">'+(s.idx+1)+"/"+s.total+'</span>'+
      '<div class="gp-track"><div class="gp-fill" data-cb-style="width:'+pct+'%"></div></div>'+
      '<span class="gp-label">✔ '+s.correct+'</span></div>'+timerHtml+
      '<div id="round-area"></div></div></div>';
    CB.openOverlay(shell);
    CB._noSelect(CB.overlayEl());

    const self=this;
    document.getElementById("game-close").onclick=function(){if(confirm("Sair da missão? O progresso desta partida será perdido.")){self._clearQTimer();CB.closeOverlay();}};
    if(this.mission.info){
      const btn=document.getElementById("mis-info-btn");
      if(btn)btn.onclick=function(){CB._showMissionInfo(self.mission.info);};
    }
    this._renderRound();
  },

  _renderRound:function(){
    const r=this.session.rounds[this.session.idx];
    this.roundStart=Date.now();
    if(r.type==="phishing") this._roundPhishing(r.data);
    else if(r.type==="smishing") this._roundSmishing(r.data);
    else if(r.type==="pwClassify") this._roundPwClassify(r.data);
    else if(r.type==="pwCreate") this._roundPwCreate();
    else if(r.type==="social") this._roundSocial(r.data);
    else if(r.type==="quiz") this._roundQuiz(r.data);
    else if(r.type==="urlspot") this._roundUrl(r.data);
  },

  /* helper: inicia timer se a missão tiver */
  _maybeTimer:function(){
    const self=this;
    const sec=this.mission.timerSec;
    if(!sec)return;
    this._startQTimer(sec,function(){
      self._clearQTimer();
      /* tempo esgotado → resposta errada */
      const area=document.getElementById("round-area");
      if(area){
        area.querySelectorAll("[data-ans],[data-opt],[data-pw],[data-weak]").forEach(function(b){b.disabled=true;});
        const fb=document.getElementById("fb");
        if(fb){
          fb.innerHTML='<div class="feedback bad pop"><h4>✖ Tempo esgotado!</h4><p data-cb-style="color:var(--text-dim)">Atenção! Tempo de resposta encerrado.</p>'+
            '<div data-cb-style="text-align:right;margin-top:14px"><button class="btn-primary" id="next-btn">'+(self.session.idx>=self.session.total-1?"VER RESULTADO ▸":"PRÓXIMO ▸")+"</button></div></div>";
          document.getElementById("next-btn").onclick=function(){if(self.session.idx>=self.session.total-1)self._finish();else{self.session.idx+=1;self.render();}};
        }
      }
      CB.afterAnswer(false,{});
    });
  },

  _roundUrl:function(item){
    const area=document.getElementById("round-area");
    area.innerHTML='<div class="quiz-question-box"><p class="quiz-q">Este endereço é o <b>site oficial</b> ou é <b>falso</b> (typosquatting)?</p></div>'+
      '<div class="url-bar"><span class="url-lock">🔒</span><span class="url-text">'+CB.esc(item.url)+"</span></div>"+
      '<div class="answer-row"><button class="btn-soft btn-safe" data-ans="legit">✅ Oficial</button>'+
      '<button class="btn-soft btn-danger" data-ans="fake">⚠️ Falso</button></div><div id="fb"></div>';
    const self=this;
    area.querySelectorAll("[data-ans]").forEach(function(btn){
      btn.onclick=function(){
        const saidLegit=btn.getAttribute("data-ans")==="legit";
        const correct=saidLegit===item.legit;
        area.querySelectorAll("[data-ans]").forEach(function(b){b.disabled=true;});
        self._feedback(correct,{xp:correct?self.missionXP():0,title:correct?"Correto!":"Observe o domínio com atenção.",list:[item.reason],tag:item.legit?"Site OFICIAL":"Site FALSO"});
      };
    });
    this._maybeTimer();
  },

  _roundPhishing:function(email){
    const area=document.getElementById("round-area");
    area.innerHTML='<div class="quiz-question-box"><p class="quiz-q">Este e-mail é confiável ou é uma tentativa de <b>phishing</b>?</p></div>'+
      '<div class="email-card"><div class="email-head">'+
      '<div class="email-row"><span class="email-lbl">De:</span><span>'+CB.esc(email.senderName)+" &lt;"+CB.esc(email.senderEmail)+"&gt;</span></div>"+
      '<div class="email-row"><span class="email-lbl">Assunto:</span><span>'+CB.esc(email.subject)+"</span></div></div>"+
      '<div class="email-body">'+CB.esc(email.body).replace(/\n/g,"<br>")+"</div></div>"+
      '<div class="answer-row"><button class="btn-soft btn-safe" data-ans="safe">✅ Confiável</button>'+
      '<button class="btn-soft btn-danger" data-ans="phish">🎣 Phishing</button></div><div id="fb"></div>';
    const self=this;
    area.querySelectorAll("[data-ans]").forEach(function(btn){
      btn.onclick=function(){
        const saidPhish=btn.getAttribute("data-ans")==="phish";
        const correct=saidPhish===email.isPhishing;
        area.querySelectorAll("[data-ans]").forEach(function(b){b.disabled=true;});
        self._feedback(correct,{xp:correct?self.missionXP():0,title:correct?"Correto!":"Atenção aos sinais de alerta.",list:email.clues,tag:email.isPhishing?"PHISHING":"E-MAIL LEGÍTIMO"});
      };
    });
    this._maybeTimer();
  },

  _roundSmishing:function(msg){
    const area=document.getElementById("round-area");
    area.innerHTML='<div class="quiz-question-box"><p class="quiz-q">Esta mensagem é confiável ou é um golpe (<b>smishing</b>)?</p></div>'+
      '<div class="chat-wrap"><div class="chat-head">'+CB.esc(msg.senderName)+' <span class="chat-ch">'+CB.esc(msg.channel)+"</span></div>"+
      '<div class="chat-bubble">'+CB.esc(msg.body)+"</div></div>"+
      '<div class="answer-row"><button class="btn-soft btn-safe" data-ans="safe">✅ Legítima</button>'+
      '<button class="btn-soft btn-danger" data-ans="phish">📵 Golpe</button></div><div id="fb"></div>';
    const self=this;
    area.querySelectorAll("[data-ans]").forEach(function(btn){
      btn.onclick=function(){
        const saidPhish=btn.getAttribute("data-ans")==="phish";
        const correct=saidPhish===msg.isPhishing;
        area.querySelectorAll("[data-ans]").forEach(function(b){b.disabled=true;});
        self._feedback(correct,{xp:correct?self.missionXP():0,title:correct?"Correto!":"Observe os sinais de alerta.",list:msg.clues,tag:msg.isPhishing?"GOLPE (SMISHING)":"MENSAGEM LEGÍTIMA"});
      };
    });
    this._maybeTimer();
  },

  _roundPwClassify:function(pw){
    const area=document.getElementById("round-area");
    area.innerHTML='<div class="quiz-question-box"><p class="quiz-q">Esta senha é <b>fraca</b> ou <b>forte</b>?</p></div>'+
      '<div class="pw-display"><code>'+CB.esc(pw.value)+"</code></div>"+
      '<div class="answer-row"><button class="btn-soft btn-safe" data-pw="strong">💪 Forte</button>'+
      '<button class="btn-soft btn-danger" data-pw="weak">⚠️ Fraca</button></div><div id="fb"></div>';
    const self=this;
    area.querySelectorAll("[data-pw]").forEach(function(btn){
      btn.onclick=function(){
        const saidWeak=btn.getAttribute("data-pw")==="weak";
        const correct=saidWeak===pw.weak;
        area.querySelectorAll("[data-pw]").forEach(function(b){b.disabled=true;});
        self._feedback(correct,{xp:correct?self.missionXP():0,title:correct?"Correto!":"Resposta incorreta.",list:[pw.reason],tag:pw.weak?"SENHA FRACA":"SENHA FORTE"});
      };
    });
    this._maybeTimer();
  },

  _roundPwCreate:function(){
    const self=this;
    const area=document.getElementById("round-area");
    area.innerHTML='<div class="quiz-question-box"><p class="quiz-q">Crie uma senha forte. Ela não será salva — apenas avaliada.</p></div>'+
      '<div class="pw-create-wrap">'+
      '<div class="input-wrap"><input id="pw-in" type="text" placeholder="Digite sua senha aqui" autocomplete="off" class="pw-create-input"/></div>'+
      '<div class="pw-strength-bar"><div id="pw-bar" data-cb-style="width:0%;height:100%;border-radius:99px;transition:all .3s;background:var(--danger)"></div></div>'+
      '<div id="pw-label" class="pw-strength-label">—</div>'+
      '<div id="pw-tips" class="pw-tips"></div>'+
      '<button class="btn-primary" id="pw-submit" disabled data-cb-style="margin-top:14px">✅ Confirmar senha</button>'+
      '<p class="section-sub" data-cb-style="margin-top:10px;font-size:0.8rem">Nenhum dado é enviado. Avaliação feita localmente.</p></div>'+
      '<div id="fb"></div>';

    const inp=document.getElementById("pw-in");
    const bar=document.getElementById("pw-bar");
    const lbl=document.getElementById("pw-label");
    const tips=document.getElementById("pw-tips");
    const sub=document.getElementById("pw-submit");

    /* anti-paste no campo de criação de senha */
    inp.addEventListener("paste",function(e){e.preventDefault();CB.toast("Aviso","Copiar e colar não vale — digite a senha para praticá-la 😄","⚠️");});
    inp.addEventListener("copy",function(e){e.preventDefault();});

    function score(v){
      let s=0,msgs=[];
      if(v.length>=12)s+=25;else msgs.push("Mínimo 12 caracteres");
      if(/[A-Z]/.test(v))s+=20;else msgs.push("Inclua maiúsculas");
      if(/[a-z]/.test(v))s+=20;else msgs.push("Inclua minúsculas");
      if(/[0-9]/.test(v))s+=15;else msgs.push("Inclua números");
      if(/[^A-Za-z0-9]/.test(v))s+=20;else msgs.push("Inclua símbolos (!@#...)");
      if(!/^(senha|password|leroy|admin|123|qwerty)/i.test(v))s+=0;else{s=Math.max(0,s-30);msgs.push("Evite palavras óbvias");}
      return{s:Math.min(100,s),msgs:msgs};
    }
    inp.addEventListener("input",function(){
      const v=inp.value;const r=score(v);
      const color=r.s>=80?"var(--neon)":r.s>=50?"var(--gold)":"var(--danger)";
      bar.style.width=r.s+"%";bar.style.background=color;
      const labels=["","Muito fraca",CB.tc("exercises","weak","Fraca"),"Razoável","Boa","Excelente"];
      lbl.textContent=v?labels[Math.min(5,Math.floor(r.s/20)+1)]:"—";lbl.style.color=color;
      tips.innerHTML=r.msgs.map(function(m){return'<span class="pw-tip">⚠ '+CB.esc(m)+"</span>";}).join("");
      sub.disabled=r.s<80;
    });
    document.getElementById("pw-submit").onclick=function(){
      const v=inp.value;const r=score(v);
      self._clearQTimer();
      self._feedback(r.s>=80,{xp:r.s>=80?self.missionXP():Math.floor(self.missionXP()*(r.s/100)),
        title:r.s>=80?"Senha aprovada!":"Senha não atingiu o nível mínimo.",
        list:r.s>=80?["Comprimento e complexidade adequados.","Sem padrões óbvios.","Bom trabalho!"]:r.msgs,
        tag:r.s>=80?"APROVADA":"REJEITADA"});
    };
  },

  _roundSocial:function(sc){
    const area=document.getElementById("round-area");
    area.innerHTML='<div class="social-card"><div class="sc-img">'+sc.img+"</div>"+
      '<div class="quiz-question-box" data-cb-style="margin:14px 0 0;border:none;padding:14px 16px">'+
      '<div class="sc-tactic"><span class="tactic-tag">'+CB.esc(sc.tactic)+"</span></div>"+
      '<p class="sc-text">'+CB.esc(sc.text)+"</p>"+
      '<p class="sc-question"><b>'+CB.esc(sc.question)+"</b></p></div>"+
      '<div class="social-opts" id="soc-opts">'+
      sc.options.map(function(o,i){return'<button class="soc-opt" data-opt="'+i+'">'+CB.esc(o.text)+"</button>";}).join("")+
      "</div><div id='fb'></div>";
    const self=this;
    area.querySelectorAll("[data-opt]").forEach(function(btn){
      btn.onclick=function(){
        const i=+btn.getAttribute("data-opt");
        const correct=sc.options[i].correct;
        area.querySelectorAll("[data-opt]").forEach(function(b){b.disabled=true;b.style.opacity=b===btn?"1":"0.5";});
        self._feedback(correct,{xp:correct?self.missionXP():0,title:correct?"Decisão correta!":"Cuidado — veja a explicação.",list:[sc.explain],tag:sc.tactic});
      };
    });
    this._maybeTimer();
  },

  _roundQuiz:function(q){
    const area=document.getElementById("round-area");
    area.innerHTML='<div class="quiz-question-box"><p class="quiz-q">'+CB.esc(q.q)+"</p></div>"+
      '<div class="quiz-opts">'+
      q.options.map(function(o,i){return'<button class="quiz-opt" data-opt="'+i+'">'+CB.esc(o)+"</button>";}).join("")+
      "</div><div id='fb'></div>";
    const self=this;
    area.querySelectorAll("[data-opt]").forEach(function(btn){
      btn.onclick=function(){
        const i=+btn.getAttribute("data-opt");
        const correct=i===q.correct;
        area.querySelectorAll("[data-opt]").forEach(function(b){
          b.disabled=true;
          if(+b.getAttribute("data-opt")===q.correct)b.classList.add("correct-opt");
          if(b===btn&&!correct)b.classList.add("wrong-opt");
        });
        self._feedback(correct,{xp:correct?self.missionXP():0,title:correct?"Correto!":"Resposta incorreta.",list:[q.explain],tag:correct?"✔ CERTO":"✖ ERRADO"});
      };
    });
    this._maybeTimer();
  },

  _feedback:function(correct,info){
    /* salvar para revisão */
    if(!this.session.review)this.session.review=[];
    this.session.review.push({q:info.title||"",correct:correct,explain:(info.list&&info.list[0])||"",tag:info.tag||""});
    this._clearQTimer();
    const fast=Date.now()-this.roundStart<12000;
    if(correct){this.session.correct+=1;this.session.xp+=info.xp||0;try{CB.Sound.play('correct');}catch(e){}}else{try{CB.Sound.play('wrong');}catch(e){}}
    const badges=CB.afterAnswer(correct,{fast:fast&&correct});
    badges.forEach(function(b){CB.toast("Conquista desbloqueada",b.name,b.icon);});
    const fb=document.getElementById("fb");
    const last=this.session.idx>=this.session.total-1;
    fb.innerHTML='<div class="feedback '+(correct?"good":"bad")+' pop"><h4>'+(correct?"✔ ":"✖ ")+CB.esc(info.title)+
      ' <span data-cb-style="float:right;font-size:0.8rem;color:var(--text-dim)">'+CB.esc(info.tag||"")+"</span></h4>"+
      (info.xp?'<p data-cb-style="color:var(--neon);font-weight:700">+'+info.xp+" XP</p>":"")+
      "<ul>"+info.list.map(function(c){return"<li>"+CB.esc(c)+"</li>";}).join("")+"</ul>"+
      '<div data-cb-style="text-align:right;margin-top:14px"><button class="btn-primary" id="next-btn">'+(last?"VER RESULTADO ▸":"PRÓXIMO ▸")+"</button></div></div>";
    const self=this;
    document.getElementById("next-btn").onclick=function(){if(last)self._finish();else{self.session.idx+=1;self.render();}};
    fb.scrollIntoView({behavior:"smooth",block:"nearest"});
  },

  _startCleandesk:function(){
    const cd=CB.CLEANDESK;
    const sensitive=cd.items.filter(function(i){return i.sensitive;});
    this.session.total=sensitive.length;
    let spots="";
    cd.items.forEach(function(it){spots+='<button class="cd-spot" data-id="'+it.id+'" data-sens="'+(it.sensitive?1:0)+'" title="?" data-cb-style="left:'+it.x+"%;top:"+it.y+"%;width:"+it.w+"%;height:"+it.h+'%">'+it.emoji+"</button>";});
    const shell='<div class="game-modal pop" data-cb-style="width:min(720px,94vw)"><div class="game-top">'+
      '<span class="gt-title">🧹  Missão Mesa Limpa</span>'+
      (this.mission.info?'<button class="btn-soft btn-info-mis" id="mis-info-btn">❓ Conceito</button>':"")+'<button class="gt-close" id="game-close">✕</button></div>'+
      '<div class="game-body"><p class="section-sub">'+CB.esc(cd.intro)+"</p>"+
      '<div class="cd-stage"><div class="cd-scene">'+
      '<div class="cd-floor"></div><div class="cd-counter"></div><div class="cd-monitor"></div>'+
      '<div class="cd-label cd-l1">FRENTE DE CAIXA / RETAGUARDA</div>'+spots+"</div></div>"+
      '<div class="cd-bar"><span id="cd-count">Encontrados: 0/'+sensitive.length+'</span>'+
      '<button class="btn-primary" id="cd-finish">CONCLUIR MISSÃO</button></div>'+
      '<div id="cd-log" class="cd-log"></div></div></div>';
    CB.openOverlay(shell);
    CB._noSelect(CB.overlayEl());
    const self=this;
    document.getElementById("game-close").onclick=function(){if(confirm("Sair da missão?"))CB.closeOverlay();};
    if(this.mission.info){const btn=document.getElementById("mis-info-btn");if(btn)btn.onclick=function(){CB._showMissionInfo(self.mission.info);};}

    const found={};
    const log=document.getElementById("cd-log");
    const counter=document.getElementById("cd-count");
    function addLog(ok,text){const d=document.createElement("div");d.className="cd-logline "+(ok?"good":"bad");d.innerHTML=(ok?"✔ ":"• ")+text;log.prepend(d);}
    document.querySelectorAll(".cd-spot").forEach(function(btn){
      btn.onclick=function(){
        const id=btn.getAttribute("data-id");const it=cd.items.find(function(x){return x.id===id;});
        if(btn.classList.contains("done")||btn.classList.contains("safe"))return;
        if(it.sensitive){
          btn.classList.add("done");found[id]=true;
          try{CB.Sound.play("correct");}catch(e){}self.session.correct=Object.keys(found).length;self.session.xp+=self.missionXP();
          counter.textContent="Encontrados: "+self.session.correct+"/"+self.session.total;
          addLog(true,"<b>"+CB.esc(it.label)+"</b> — "+CB.esc(it.explain)+' <span data-cb-style="color:var(--neon)">+'+self.missionXP()+" XP</span>");
          CB.afterAnswer(true,{});
          if(self.session.correct>=self.session.total)document.getElementById("cd-finish").classList.add("pulse");
        }else{try{CB.Sound.play("wrong");}catch(e){}
          btn.classList.add("safe");self.session.wrongClicks+=1;
          addLog(false,"<b>"+CB.esc(it.label)+"</b> — "+CB.esc(it.explain));
          CB.afterAnswer(false,{});
        }
      };
    });
    document.getElementById("cd-finish").onclick=function(){self._finish();};
  },

  _finish:function(){
    this._clearQTimer();
    const s=this.session;
    const accuracy=s.total?Math.round((s.correct/s.total)*100):0;
    const ok=accuracy>=60;const perfect=accuracy>=100&&s.wrongClicks===0;
    const perfectBonus=perfect?this.XP.bonus:0;
    const totalXP=s.xp+perfectBonus;
    const coins=10+Math.round(accuracy/5);
    const missionBadges=CB.completeMission(s.missionId,accuracy);
    const xpResult=CB.addXP(totalXP);CB.awardCoins(coins);
    let daily=null;if(s.isDaily)daily=CB.claimDaily();
    const uniqueNew=[];const seen={};
    s.newBadges.concat(missionBadges,xpResult.newBadges).forEach(function(b){if(b&&!seen[b.id]){seen[b.id]=1;uniqueNew.push(b);}});
    missionBadges.concat(xpResult.newBadges).forEach(function(b){CB.toast("Conquista desbloqueada",b.name,b.icon);});
    if(xpResult.leveledUp)CB.toast("SUBIU DE NÍVEL!","Nível "+xpResult.newLevel+" · "+CB.rankTitle(xpResult.newLevel),"🆙");
    if(daily&&!daily.already)CB.toast("Desafio diário!","Streak "+daily.streak+" dia(s) · +"+daily.coins+" 🪙","🔥");
    const li=CB.levelInfo(CB.user().xp);
    const badgesHtml=uniqueNew.length?'<p data-cb-style="margin-top:12px;color:var(--text-dim)">Novas conquistas: '+uniqueNew.map(function(b){return b.icon+" "+CB.esc(b.name);}).join(" · ")+"</p>":"";
    const statusTxt=ok?"MISSÃO CONCLUÍDA ✔":CB.t?CB.t("result_fail"):"MISSÃO ENCERRADA";
    const html='<div class="game-modal pop"><div class="game-body result-card">'+
      '<div class="r-status '+(ok?"":"fail")+'">'+statusTxt+"</div>"+
      '<div class="r-xp">+'+totalXP+" XP · +"+coins+" 🪙</div>"+
      '<div class="r-summary">Você acertou <b>'+s.correct+" de "+s.total+"</b> ("+accuracy+"%)."+
      (s.wrongClicks?" Cliques indevidos: "+s.wrongClicks+".":"")+
      (perfect?' <b data-cb-style="color:var(--neon)">Pontuação perfeita!</b>':"")+
      (perfectBonus?" Bônus: +"+perfectBonus+" XP.":"")+
      (daily&&!daily.already?" 🔥 Desafio diário: streak "+daily.streak+" · +"+daily.bonusXP+" XP.":"")+
      badgesHtml+"</div>"+
      (function(){
        var review=s.review||[];
        if(!review.length)return"";
        var errs=review.filter(function(r){return!r.correct;});
        if(!errs.length)return'<div class="r-review-ok"><span>🎯</span> Todas as respostas corretas!</div>';
        return'<div class="r-review"><h4>📋 Revisão dos erros ('+errs.length+')</h4>'+
          errs.map(function(r,i){
            return'<div class="r-review-item"><span class="r-review-num">'+(i+1)+'</span>'+
              '<div><b>'+CB.esc(r.tag||r.q)+'</b><p>'+CB.esc(r.explain)+'</p></div></div>';
          }).join("")+'</div>';
      })()+
      '<div class="result-level"><div data-cb-style="color:var(--text-dim)">Progresso para o próximo nível</div>'+
      '<div class="lu-top" data-cb-style="max-width:520px;margin:6px auto 0;display:flex;justify-content:space-between"><span>NÍVEL '+li.level+"</span><span>"+li.intoLevel+" / "+li.need+" XP</span></div>"+
      '<div class="rl-track"><div class="rl-fill" data-cb-style="width:'+li.pct+'%"></div></div></div>'+
      '<div class="result-actions"><button class="btn-primary" id="r-next">PRÓXIMA MISSÃO</button>'+
      '<button class="btn-ghost" id="r-replay">REVER MISSÃO</button>'+
      '<button class="btn-soft" id="r-home">VOLTAR AO PAINEL</button></div></div></div>';
    CB.openOverlay(html);
    CB._noSelect(CB.overlayEl());
    /* confetti */
    try{CB.confetti();}catch(e){}
    const self=this;
    document.getElementById("r-replay").onclick=function(){CB.Game.start(s.missionId);};
    document.getElementById("r-home").onclick=function(){CB.closeOverlay();CB.go("dashboard");};
    document.getElementById("r-next").onclick=function(){const ids=CB.allMissions().map(function(m){return m.id;});const next=ids[(ids.indexOf(s.missionId)+1)%ids.length];CB.Game.start(next);};
    CB.refreshChrome();
  },
};


/* rebinda handlers após fechar popup de conceito */
CB.Game._rebindAfterInfo=function(){
  var self=CB.Game;
  /* X para sair */
  var gc=document.getElementById("game-close");
  if(gc)gc.onclick=function(){if(confirm("Sair da missão? O progresso desta partida será perdido.")){self._clearQTimer();CB.closeOverlay();}};
  /* botão conceito */
  var infoBtn=document.getElementById("mis-info-btn");
  if(infoBtn&&self.mission&&self.mission.info)infoBtn.onclick=function(){CB._showMissionInfo(self.mission.info);};
  /* re-renderizar a questão atual para rebindar opções */
  try{self.render();}catch(e){}
};

/* ─── popup de conceito da missão ─── */
CB._showMissionInfo=function(html){
  var wasHidden=CB.overlayEl().classList.contains("hidden");
  var prev=wasHidden?null:CB.overlayEl().innerHTML;
  var modal='<div class="game-modal pop" data-cb-style="width:min(480px,92vw)"><div class="game-top">'+
    '<span class="gt-title">Conceito da Missão</span>'+
    '<button class="gt-close" id="info-close">✕</button></div>'+
    '<div class="game-body info-content">'+html+"</div></div>";
  CB.openOverlay(modal);
  document.getElementById("info-close").onclick=function(){
    if(prev){
      CB.overlayEl().innerHTML=prev;
      CB.overlayEl().classList.remove("hidden");
      /* rebindar handlers do jogo */
      try{CB.Game._rebindAfterInfo();}catch(e){}
    }else{CB.closeOverlay();}
  };
  CB.overlayEl().onclick=function(e){
    if(e.target===CB.overlayEl()){
      if(prev){
        CB.overlayEl().innerHTML=prev;
        CB.overlayEl().classList.remove("hidden");
        try{CB.Game._rebindAfterInfo();}catch(e){}
      }else{CB.closeOverlay();}
    }
  };
};
