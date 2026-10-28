/* ============================================================
   CRITICAL BAIT — Dados v4: 10 módulos, 37 exercícios
   Público: todos os setores (RH, comercial, vendas, TI, loja)
   ============================================================ */
window.CB = window.CB || {};

CB.ADMIN_EMAIL = "admin@leroymerlin.com";
CB.EMAIL_DOMAINS = ["@gmail.com", "@gmail.com.br"];

CB.DEPARTMENTS = ["Jardim","Construção","Tintas","Madeira","Elétrica","Hidráulica","Decoração","Organização","Ferramentas","Caixa / Frente de Loja","Logística / Depósito","Administrativo"];
CB.ROLES = ["Operador(a) de Caixa","Vendedor(a)","Atendimento ao Cliente","Estoque & Logística","Compras & Suprimentos","Limpeza & Conservação","Segurança Patrimonial","Gerência","Tecnologia (TI)","Administrativo / RH"];
CB.BRANCHES = ["Matriz - SP","Morumbi - SP","Interlagos - SP","Tijuca - RJ","Niterói - RJ","Campinas - SP","Curitiba - PR","Porto Alegre - RS","Salvador - BA","Recife - PE","Belo Horizonte - MG","Brasília - DF","Fortaleza - CE"];

/* ══════════════ MÓDULO TEÓRICO (6 temas) ══════════════ */
CB.ONBOARDING = {
  steps: [
    { id:"ob-1",icon:"🎣",title:"O que é Phishing?",
      content:'<div class="mv-visual-intro">Golpistas enviam mensagens falsas para roubar seus dados.</div>'+
        '<div class="mv-visual-grid">'+
        '<div class="mv-tip"><span>⏰</span><b>Urgência falsa</b>"Sua conta será bloqueada em 24h!"</div>'+
        '<div class="mv-tip"><span>🔗</span><b>Links suspeitos</b>Endereços encurtados ou com domínio estranho</div>'+
        '<div class="mv-tip"><span>👤</span><b>Remetente genérico</b>"Prezado colaborador" — sem seu nome</div>'+
        '<div class="mv-tip"><span>🔑</span><b>Pede dados</b>Senha, CPF, código 2FA, dados bancários</div>'+
        '</div>'+
        '<div class="mv-visual-rule">'+'<span>→</span> Desconfie sempre. Verifique o domínio do e-mail (depois do @).</div>',
      quiz:{q:"E-mail do 'RH' pedindo sua senha para 'atualizar o sistema'. O que fazer?",options:["Forneço a senha, é urgente","Não forneço — RH nunca pede senhas por e-mail","Forneço só se vier de e-mail corporativo"],correct:1,explain:"Nenhum setor legítimo pede sua senha por e-mail."} },
    { id:"ob-2",icon:"🎭",title:"Engenharia Social",
      content:'<div class="mv-visual-intro">Manipulação psicológica para fazer você agir sem pensar.</div>'+
        '<div class="mv-visual-grid">'+
        '<div class="mv-tip"><span>👔</span><b>Autoridade</b>"Sou o diretor, preciso disso agora."</div>'+
        '<div class="mv-tip"><span>⚡</span><b>Urgência</b>"Se não fizer em 10 min, perdemos tudo."</div>'+
        '<div class="mv-tip"><span>🤝</span><b>Empatia</b>"Me ajuda, só dessa vez."</div>'+
        '<div class="mv-tip"><span>🔌</span><b>Isca (Baiting)</b>Pen drive com etiqueta "Salários 2024"</div>'+
        '</div>'+
        '<div class="mv-visual-rule">'+'<span>→</span> Verifique a identidade por um canal diferente do pedido.</div>',
      quiz:{q:"Ligação do 'TI' pedindo seu código 2FA. Você:",options:["Passo o código, é o suporte","Nunca passo — desligo e ligo pro TI oficial","Passo só os 3 primeiros dígitos"],correct:1,explain:"Códigos 2FA NUNCA devem ser compartilhados."} },
    { id:"ob-3",icon:"🔐",title:"Senhas & Autenticação",
      content:'<div class="mv-visual-intro">Senha fraca = porta aberta. Proteja seus acessos.</div>'+
        '<div class="mv-visual-grid">'+
        '<div class="mv-tip mv-tip-bad"><span>❌</span><b>Senha fraca</b>leroy2024, 123456, Senha@123</div>'+
        '<div class="mv-tip mv-tip-good"><span>✅</span><b>Senha forte</b>Tr0vão#Azul_92! — longa e imprevisível</div>'+
        '<div class="mv-tip"><span>📱</span><b>2FA / MFA</b>Segundo fator protege mesmo com senha vazada</div>'+
        '<div class="mv-tip"><span>🚫</span><b>Nunca compartilhe</b>Seu login = sua responsabilidade</div>'+
        '</div>'+
        '<div class="mv-visual-rule">'+'<span>→</span> Use no mínimo 12 caracteres, sem dados pessoais.</div>',
      quiz:{q:"Qual senha é mais segura?",options:["leroy2024","Senha@123","Tr0vão#Azul_92!"],correct:2,explain:"Combina letras, números e símbolos sem padrão óbvio."} },
    { id:"ob-4",icon:"🦠",title:"Malware & Dispositivos",
      content:'<div class="mv-visual-intro">Software malicioso que invade seu computador ou celular.</div>'+
        '<div class="mv-visual-grid">'+
        '<div class="mv-tip"><span>📎</span><b>Anexos perigosos</b>.exe, .bat, .zip com executáveis</div>'+
        '<div class="mv-tip"><span>🔌</span><b>Pen drive</b>Nunca conecte dispositivos desconhecidos</div>'+
        '<div class="mv-tip"><span>🔄</span><b>Atualizações</b>Mantenha tudo atualizado — sempre</div>'+
        '<div class="mv-tip"><span>🚨</span><b>PC estranho?</b>Lento, janelas abrindo sozinhas → TI</div>'+
        '</div>'+
        '<div class="mv-visual-rule">'+'<span>→</span> Não instale nada sem autorização do TI.</div>',
      quiz:{q:"Pen drive no estacionamento com etiqueta 'Salários 2024'. O que faz?",options:["Conecto para ver de quem é","Entrego ao TI sem conectar","Levo para casa"],correct:1,explain:"Pen drives 'perdidos' são iscas (baiting). Nunca conecte."} },
    { id:"ob-5",icon:"🗄️",title:"LGPD & Dados",
      content:'<div class="mv-visual-intro">Dados pessoais de clientes e colegas são protegidos por lei.</div>'+
        '<div class="mv-visual-grid">'+
        '<div class="mv-tip"><span>📋</span><b>Só o necessário</b>Colete apenas o que precisa</div>'+
        '<div class="mv-tip"><span>🗑️</span><b>Descarte seguro</b>Fragmentadora para papéis com dados</div>'+
        '<div class="mv-tip"><span>💻</span><b>Sistema oficial</b>Dados só nos sistemas — nunca no papel</div>'+
        '<div class="mv-tip"><span>📱</span><b>Nunca por WhatsApp</b>Dados pessoais em apps pessoais = violação</div>'+
        '</div>'+
        '<div class="mv-visual-rule">'+'<span>→</span> Violações geram multas pesadas e danos à reputação.</div>',
      quiz:{q:"Cliente pede para guardar o CPF num papel no balcão. Ideal é:",options:["Anoto, agiliza o atendimento","Registro apenas no sistema oficial","Mando por WhatsApp"],correct:1,explain:"Dados pessoais só nos sistemas oficiais."} },
    { id:"ob-6",icon:"🧹",title:"Mesa Limpa",
      content:'<div class="mv-visual-intro">Segurança também é física. Proteja o que está à vista.</div>'+
        '<div class="mv-visual-grid">'+
        '<div class="mv-tip"><span>🖥️</span><b>Tela bloqueada</b>Saiu da mesa? Win+L — sempre</div>'+
        '<div class="mv-tip"><span>🪪</span><b>Crachá pessoal</b>Nunca empreste, mesmo para colegas</div>'+
        '<div class="mv-tip"><span>🖨️</span><b>Impressora</b>Retire documentos imediatamente</div>'+
        '<div class="mv-tip"><span>🚪</span><b>Sem carona</b>Não deixe ninguém entrar sem crachá</div>'+
        '</div>'+
        '<div class="mv-visual-rule">'+'<span>→</span> 5 minutos bastam para alguém acessar tudo.</div>',
      quiz:{q:"Vai tomar café por 5 minutos. O que faz com o PC?",options:["Deixo aberto, é rápido","Bloqueio a tela (Win+L) — sempre","Desligo completamente"],correct:1,explain:"Qualquer ausência sem bloqueio é um risco."} },
  ]
};

/* ══════════════ E-MAILS DE PHISHING ══════════════ */
CB.EMAILS = [
  { senderName:"RH Benefícios Leroy",senderEmail:"rh-beneficios@leroymerllin-rh.com",subject:"🎉 Você recebeu um BÔNUS de R$ 850 — confirme em 24h!",body:"Prezado colaborador,\n\nParabéns! Você foi selecionado para receber um bônus exclusivo de R$ 850,00. Para liberar o valor você precisa CONFIRMAR seus dados em até 24 horas, caso contrário o benefício será cancelado.\n\nConfirme aqui: http://bit.ly/leroy-bonus-2024\n\nAtenciosamente,\nEquipe de Recompensas",isPhishing:true,clues:["Domínio falso: 'leroymerllin-rh.com' (Merlin escrito errado).","Saudação genérica: 'Prezado colaborador'.","Urgência: prazo de 24h.","Link encurtado (bit.ly) escondendo destino real.","Oferta boa demais para ser verdade."]},
  { senderName:"Comunicação TI",senderEmail:"ti.comunicacao@leroymerlin.com.br",subject:"Manutenção programada no Portal RH — sábado 02/06, 22h às 23h",body:"Olá, time!\n\nInformamos que o Portal RH ficará indisponível no sábado, 02/06, entre 22h e 23h, para manutenção programada. Nenhuma ação é necessária da sua parte.\n\nEm caso de dúvidas, abra um chamado pelo Service Desk interno.\n\nEquipe de TI · Leroy Merlin",isPhishing:false,clues:["Domínio oficial: 'leroymerlin.com.br'.","Não pede senha, dados nem clique em links externos.","Tom informativo, sem urgência.","Orienta canal interno oficial (Service Desk)."]},
  { senderName:"Empresa Exemplo",senderEmail:"seguranca@empresa-falsa.exemplo",subject:"Sua senha expira HOJE — reative sua conta agora",body:"Caro usuário,\n\nDetectamos uma atividade incomum na sua conta. Sua senha expira HOJE. Para evitar o bloqueio permanente, faça login imediatamente:\n\nhttps://exemplo-falso.com.br/login\n\nSe você não reativar, sua conta será desativada.",isPhishing:true,clues:["Domínio com letra trocada: 'empresa-exemplo' (zero no lugar do 'o').","URL falsa em domínio externo 'exemplo-falso.com.br'.","Urgência e ameaça de bloqueio.","Saudação genérica 'Caro usuário'."]},
  { senderName:"Financeiro — Fornecedores",senderEmail:"financeiro@leroy-merlin-pagamentos.net",subject:"URGENTE: dados bancários atualizados — reenvio de boleto",body:"Prezados,\n\nInformamos que nossa conta bancária foi alterada. Favor efetuar o pagamento do boleto em anexo na NOVA conta abaixo ainda HOJE para evitar juros:\n\nBanco 077 · Ag 0001 · CC 99888-1\n\nQualquer atraso será de responsabilidade do setor.",isPhishing:true,clues:["Domínio diferente do oficial: 'leroy-merlin-pagamentos.net'.","Mudança de conta bancária (fraude BEC).","Pressão por pagamento imediato.","Ameaça velada de responsabilizar o setor."]},
  { senderName:"Gente & Gestão",senderEmail:"gentepessoas@leroymerlin.com.br",subject:"Nova parceria: descontos em academias para colaboradores",body:"Oi, pessoal!\n\nFechamos uma nova parceria com redes de academia. Os descontos já estão disponíveis na nossa intranet, em Benefícios > Saúde & Bem-estar.\n\nAcesse pela intranet (não é necessário informar senha por e-mail).\n\nAbraços, Gente & Gestão",isPhishing:false,clues:["Domínio oficial 'leroymerlin.com.br'.","Direciona para a intranet oficial.","Reforça: não pedir senha por e-mail.","Tom institucional sem urgência."]},
  { senderName:"Central de Prêmios",senderEmail:"premios@leroymerlin-recompensas.com",subject:"Parabéns!!! Você foi SORTEADO com um iPhone 15 🎁",body:"VOCE GANHOU!!!\n\nSeu e-mail foi sorteado no programa de fidelidade. Para receber seu iPhone 15, preencha seus dados (CPF, endereço e senha do sistema) no formulário:\n\nwww.resgate-premio-leroy.com\n\nAproveite antes que acabe!",isPhishing:true,clues:["Domínio externo suspeito.","Erros de português e excesso de caixa alta.","Pede CPF e SENHA do sistema.","Prêmio inesperado — isca clássica."]},
  { senderName:"Nota Fiscal Eletrônica",senderEmail:"nf-eletronica@notafiscal-br.info",subject:"NF-e em atraso — regularize para evitar bloqueio do CNPJ",body:"Prezado cliente,\n\nConsta uma nota fiscal pendente. Baixe o arquivo em anexo (NF-e.zip) e execute para regularizar sua situação e evitar o bloqueio do CNPJ.\n\nAbra o anexo o quanto antes.",isPhishing:true,clues:["Domínio genérico '.info'.","Anexo .zip executável — vetor de malware.","Ameaça de bloqueio de CNPJ.","Pede para 'executar' o arquivo."]},
  { senderName:"João Silva",senderEmail:"joao.silva@leroymerlin.com.br",subject:"Ata da reunião de equipe — quinta-feira",body:"Fala, equipe!\n\nSegue um resumo dos pontos que combinamos na reunião de quinta. Qualquer ajuste, me avisem.\n\nValeu!\nJoão",isPhishing:false,clues:["Colega em domínio oficial.","Assunto cotidiano.","Sem links, anexos suspeitos.","Tom natural."]},
];

/* ══════════════ SMS / WHATSAPP ══════════════ */
CB.MESSAGES = [
  { senderName:"+55 11 99999-0001",channel:"SMS",body:"LEROY MERLIN: Detectamos acesso suspeito. Confirme sua conta em leroy-seguranca.click ou ela será bloqueada em 2h.",isPhishing:true,clues:["Link suspeito '.click'.","Urgência e ameaça.","Empresa não pede confirmação por link em SMS."]},
  { senderName:"Gerência da Loja",channel:"WhatsApp",body:"Oi! Reunião de equipe amanhã às 8h na sala de treinamento. Confirma presença por aqui. 👍",isPhishing:false,clues:["Mensagem cotidiana e coerente.","Não pede dados nem dinheiro.","Sem links nem urgência artificial."]},
  { senderName:"+55 21 98888-0002",channel:"WhatsApp",body:"Aqui é o RH. Precisamos atualizar seu PIX para o pagamento. Me envie sua chave e a senha do banco para confirmar.",isPhishing:true,clues:["RH nunca pede senha de banco.","Número desconhecido se passando por setor interno.","Pedido de dados financeiros."]},
  { senderName:"Correios",channel:"SMS",body:"Sua encomenda está retida. Pague a taxa de R$ 3,98 em: exemplo-entrega.com.br/pague",isPhishing:true,clues:["Domínio suspeito, diferente do oficial.","Taxa pequena para baixar a guarda.","Golpe de encomenda comum."]},
  { senderName:"Critical Bait",channel:"App",body:"Você concluiu a missão de Phishing! Continue treinando para subir no ranking. 🚀",isPhishing:false,clues:["Notificação do próprio app.","Não solicita dados.","Sem links externos."]},
];

/* ══════════════ SENHAS ══════════════ */
CB.PASSWORDS = [
  { value:"123456",weak:true,reason:"Sequência numérica — a mais vazada do mundo." },
  { value:"leroy2024",weak:true,reason:"Nome da empresa + ano: previsível." },
  { value:"Senha@123",weak:true,reason:"Padrão clássico testado primeiro." },
  { value:"joao1990",weak:true,reason:"Nome + data de nascimento são públicos." },
  { value:"Tr0vão#Azul_92!",weak:false,reason:"Longa, com maiúsculas, números e símbolos." },
  { value:"cavalo-bateria-grampo-correto",weak:false,reason:"Frase-senha longa e imprevisível." },
  { value:"qwerty",weak:true,reason:"Sequência do teclado — trivial." },
  { value:"V!nho&Maré7chuva",weak:false,reason:"Palavras aleatórias com símbolos." },
];

/* ══════════════ URLS (typosquatting) ══════════════ */
CB.URLS = [
  { url:"https://www.leroymerlin.com.br",legit:true,reason:"Domínio oficial correto." },
  { url:"https://www.leroymerlim.com.br",legit:false,reason:"Typosquatting: 'merliM' com M no lugar do N." },
  { url:"https://leroy-merlin.shop",legit:false,reason:"Sufixo '.shop' não oficial." },
  { url:"https://login.leroymerlin.com.br",legit:true,reason:"Subdomínio do domínio oficial." },
  { url:"https://www.leroymerlin.promo-brasil.com",legit:false,reason:"Domínio REAL é 'promo-brasil.com'." },
  { url:"https://www.leroymerlln.com.br",legit:false,reason:"Typosquatting: 'merlLn' (L no lugar do I)." },
  { url:"https://intranet.leroymerlin.com.br",legit:true,reason:"Subdomínio interno oficial." },
  { url:"https://www.leroymerlin-ofertas.net",legit:false,reason:"Sufixo '-ofertas' e '.net' — domínio falso." },
  { url:"https://leroymerlin.com.br.seguro-login.com",legit:false,reason:"Domínio real é 'seguro-login.com'." },
];

/* ══════════════ ENGENHARIA SOCIAL — CENÁRIOS ══════════════ */
CB.SCENARIOS = [
  { img:"📞",text:"Você recebe uma ligação. A pessoa diz ser do 'Suporte de TI' e precisa da sua senha para 'corrigir um erro urgente'.",question:"Qual é a atitude correta?",options:[{text:"Informo a senha, é o suporte.",correct:false},{text:"Não passo a senha. Encerro e ligo para o TI pelo canal oficial.",correct:true},{text:"Passo só por telefone, nunca por e-mail.",correct:false}],tactic:"Pretexting + Autoridade",explain:"O TI nunca pede sua senha. Sempre verifique pelo canal oficial." },
  { img:"🔌",text:"Você encontra um pen drive no estacionamento com etiqueta 'Salários 2024 — Confidencial'.",question:"O que você faz?",options:[{text:"Conecto no PC para ver de quem é.",correct:false},{text:"Levo para casa para olhar com calma.",correct:false},{text:"Entrego à Segurança/TI sem conectar.",correct:true}],tactic:"Baiting (Isca)",explain:"Pen drives 'perdidos' podem ser iscas para instalar malware. Nunca conecte." },
  { img:"💬",text:"WhatsApp de número novo: 'seu gerente' pedindo para comprar R$ 2.000 em cartões-presente AGORA.",question:"Como reagir?",options:[{text:"Compro os cartões, é o gerente.",correct:false},{text:"Confirmo pelo contato oficial antes de qualquer ação.",correct:true},{text:"Peço só metade para garantir.",correct:false}],tactic:"Fraude do CEO",explain:"Número novo + pedido urgente + não pode falar = golpe. Confirme por canal conhecido." },
  { img:"🚪",text:"Um técnico de uniforme quer entrar na área restrita sem crachá. Diz que é 'manutenção de emergência'.",question:"O que fazer?",options:[{text:"Deixo entrar, tem uniforme.",correct:false},{text:"Peço que aguarde e aciono o responsável para confirmar.",correct:true},{text:"Peço para entrar rápido.",correct:false}],tactic:"Tailgating + Pretexting",explain:"Uniforme não é credencial. Toda visita precisa ser confirmada." },
  { img:"📧",text:"E-mail do 'RH' com link para atualizar dados bancários em 'novo sistema' para não atrasar o salário.",question:"O que fazer?",options:[{text:"Clico e atualizo para não perder o salário.",correct:false},{text:"Ignoro o link e acesso a intranet/RH oficial diretamente.",correct:true},{text:"Respondo pedindo confirmação.",correct:false}],tactic:"Phishing + Urgência",explain:"RH não pede dados bancários por link. Acesse sempre o sistema oficial." },
  { img:"🛠️",text:"Ligação de 'fornecedor parceiro' pedindo que você leia o código na sua tela para 'restabelecer o sistema'.",question:"Qual a resposta segura?",options:[{text:"Leio o código, é só para religar.",correct:false},{text:"Não compartilho códigos. Confirmo identidade pelo canal oficial.",correct:true},{text:"Leio só os primeiros dígitos.",correct:false}],tactic:"Pretexting + Urgência",explain:"Códigos 2FA nunca devem ser compartilhados. Urgência impede você de pensar." },
  { img:"🤝",text:"Um colega novo pede sua senha emprestada 'só para terminar um relatório urgente' porque a dele ainda não foi criada.",question:"Você:",options:[{text:"Empresto só dessa vez, coitado.",correct:false},{text:"Não empresto e oriento a pedir acesso ao TI.",correct:true},{text:"Digito minha senha no computador dele sem falar.",correct:false}],tactic:"Exploração de Empatia",explain:"Emprestar credenciais é risco grave mesmo com boas intenções. Cada pessoa precisa do próprio acesso." },
];

/* ══════════════ MESA LIMPA (cena interativa) ══════════════ */
CB.CLEANDESK = {
  intro:"Esta é a frente de caixa / retaguarda da loja no fim do expediente. Clique em TUDO que representa um dado ou acesso exposto indevidamente.",
  items:[
    { id:"postit",x:21,y:17,w:12,h:10,emoji:"🟨",sensitive:true,label:"Post-it com senha",explain:"Senha anotada e colada no monitor." },
    { id:"pc",x:38,y:26,w:14,h:14,emoji:"💻",sensitive:true,label:"PC desbloqueado",explain:"Computador logado sem bloqueio de tela." },
    { id:"cpf",x:60,y:55,w:14,h:11,emoji:"📄",sensitive:true,label:"Documento com CPF",explain:"Dados pessoais de cliente expostos." },
    { id:"badge",x:9,y:60,w:11,h:10,emoji:"🪪",sensitive:true,label:"Crachá esquecido",explain:"Crachá pode ser usado por terceiros." },
    { id:"phone",x:80,y:22,w:10,h:12,emoji:"📱",sensitive:true,label:"Celular desbloqueado",explain:"Apps abertos sem proteção." },
    { id:"report",x:78,y:60,w:13,h:12,emoji:"📊",sensitive:true,label:"Relatório 'Confidencial'",explain:"Documento sensível à vista." },
    { id:"drawer",x:40,y:66,w:14,h:12,emoji:"💵",sensitive:true,label:"Gaveta de dinheiro aberta",explain:"Valores sem supervisão." },
    { id:"plant",x:5,y:20,w:9,h:12,emoji:"🪴",sensitive:false,label:"Planta",explain:"A planta está segura. 🙂" },
    { id:"mug",x:26,y:40,w:8,h:9,emoji:"☕",sensitive:false,label:"Caneca de café",explain:"Café liberado!" },
    { id:"cabinet",x:90,y:45,w:9,h:16,emoji:"🗄️",sensitive:false,label:"Armário trancado",explain:"Prática correta." },
  ],
};

/* ══════════════ QUIZZES (por tema) ══════════════ */
CB.QUIZZES = {

  /* MÓDULO 0 — Treinamento Inicial */
  treinamento: [
    { q:"Você recebe um e-mail do 'RH' pedindo sua senha para 'atualizar o sistema'. O que fazer?",options:["Forneço a senha, é urgente","Não forneço — o RH nunca pede senhas por e-mail","Forneço só se vier de e-mail corporativo"],correct:1,explain:"Nenhum setor legítimo pede sua senha por e-mail. Sempre reporte ao TI." },
    { q:"Alguém liga dizendo ser do TI e pede seu código de autenticação (2FA). Você:",options:["Passo o código, é o suporte","Nunca passo. Desligo e ligo para o TI pelo ramal oficial","Passo só os primeiros 3 dígitos"],correct:1,explain:"Códigos de autenticação NUNCA devem ser compartilhados. O TI legítimo não pede isso." },
    { q:"Qual dessas senhas é a mais segura?",options:["leroy2024","Senha@123","Tr0vão#Azul_92!"],correct:2,explain:"A terceira combina letras, números e símbolos sem padrão óbvio." },
    { q:"Você encontrou um pen drive no estacionamento com a etiqueta 'Salários 2024'. O que faz?",options:["Conecto para ver de quem é","Entrego ao TI/Segurança sem conectar em nenhum equipamento","Levo para casa para analisar"],correct:1,explain:"Pen drives 'perdidos' são iscas para instalar malware. Nunca conecte — entregue ao TI." },
    { q:"Um cliente pediu para você guardar o CPF dele anotado num papel no balcão. O ideal é:",options:["Anoto, vai agilizar o atendimento","Registro apenas no sistema oficial, nunca deixo dados à vista","Mando por WhatsApp pessoal"],correct:1,explain:"Dados pessoais só devem estar nos sistemas oficiais. Expô-los viola a LGPD." },
    { q:"Você vai tomar café por 5 minutos. O que faz com o computador?",options:["Deixo aberto, é rápido","Bloqueio a tela (Win+L) — sempre, mesmo por 1 minuto","Desligo completamente"],correct:1,explain:"Qualquer ausência sem bloqueio é um risco. Crie o hábito de travar a tela." },
  ],
  /* MÓDULO 1 — Quem Mandou Isso? */
  sender: [
    { q:"O nome exibido num e-mail diz 'Diretoria Leroy Merlin'. Isso garante que é verdadeiro?",options:["Sim, o nome é verificado automaticamente","Não — qualquer pessoa pode alterar o nome exibido","Só se tiver foto de perfil"],correct:1,explain:"O nome exibido é livre. O que importa é o domínio depois do @." },
    { q:"Você recebeu um e-mail de suporte@leroym3rlin.com. O que chama atenção?",options:["Nada, é o domínio oficial","O '3' no lugar do 'e' — domínio falso","O 'suporte' é suspeito"],correct:1,explain:"Trocar letras por números (e→3, o→0) é typosquatting. Leia o domínio com atenção." },
    { q:"Um e-mail com logo perfeito da empresa e assinatura bonita pode ser phishing?",options:["Não, se tem logo é legítimo","Sim — logos e assinaturas são fáceis de copiar","Depende da fonte da letra"],correct:1,explain:"Golpistas copiam logos e assinaturas fielmente. Sempre cheque o domínio e o conteúdo." },
    { q:"Para verificar se um e-mail é legítimo, o mais confiável é:",options:["Olhar o nome do remetente","Checar o domínio completo do e-mail (depois do @)","Ver se tem imagens bonitas"],correct:1,explain:"O domínio é a única parte que não pode ser falsificada facilmente." },
  ],
  /* MÓDULO 2 — Mesa (quiz complementar) */
  mesa: [
    { q:"Você vai ao banheiro e volta em 2 minutos. Precisa bloquear a tela?",options:["Não, é muito rápido","Sim — SEMPRE, mesmo por 1 minuto","Só se tiver cliente por perto"],correct:1,explain:"2 minutos bastam para acessar e-mails, enviar dados ou instalar algo." },
    { q:"Um colega pede para usar seu crachá 'só para entrar rápido'. O correto é:",options:["Emprestar, é colega de confiança","Não emprestar — crachá é pessoal e intransferível","Emprestar só se for gerente"],correct:1,explain:"Crachá é pessoal. Se ele entrar com seu crachá, qualquer ação fica registrada em SEU nome." },
    { q:"Ao imprimir um relatório com dados de clientes, você deve:",options:["Pegar depois, quando der","Retirar da impressora imediatamente e guardar","Pedir para alguém pegar pra você"],correct:1,explain:"Documentos sensíveis na bandeja podem ser lidos por qualquer pessoa que passe." },
    { q:"Final do expediente. Um papel com CPF de cliente está na sua mesa. Você:",options:["Joga no lixo comum","Fragmenta na fragmentadora ou descarta de forma segura","Guarda na gaveta sem trancar"],correct:1,explain:"CPF é dado pessoal protegido pela LGPD. Descarte seguro (fragmentadora) é obrigatório." },
  ],
  visitor: [
    { q:"Um 'técnico' chega sem aviso prévio para 'verificar o ar-condicionado'. O que fazer?",options:["Deixar entrar, tem colete da empresa","Barrar e confirmar com o responsável se a visita está agendada","Pedir só o nome e liberar"],correct:1,explain:"Visitas técnicas precisam ser agendadas e confirmadas pelo responsável interno." },
    { q:"Alguém segura a porta para uma pessoa sem crachá entrar atrás de você. Isso se chama:",options:["Educação básica","Tailgating — uma falha de segurança física","Trabalho em equipe"],correct:1,explain:"Tailgating é quando alguém entra carona na sua autenticação. Peça gentilmente que a pessoa passe o crachá." },
    { q:"Um entregador pede para deixar uma caixa dentro da área restrita. Você:",options:["Deixa, é só uma caixa","Recebe na portaria e não permite acesso à área restrita","Pede para ele mesmo levar até a sala"],correct:1,explain:"Entregas devem ser recebidas na portaria. Área restrita exige autorização." },
  ],
  /* MÓDULO 3 — Malware expandido */
  malware: [
    { q:"Achou um pen drive na loja. O que fazer?",options:["Conectar para ver o conteúdo","Entregar à TI/Segurança sem conectar","Levar para casa"],correct:1,explain:"Pen drives desconhecidos podem conter malware. Nunca conecte." },
    { q:"Um site pede para instalar um 'plugin' para ver um vídeo. Você:",options:["Instala na hora","Não instala — pode ser malware disfarçado","Desliga o antivírus para instalar"],correct:1,explain:"Plugins inesperados são vetores de malware. Não instale." },
    { q:"O antivírus pede atualização. O ideal é:",options:["Adiar para sempre","Atualizar — mantém proteção contra ameaças novas","Desinstalar o antivírus"],correct:1,explain:"Atualizações corrigem falhas. Mantenha tudo atualizado." },
    { q:"Seu computador ficou lento e abre janelas sozinho. Você:",options:["Ignora","Aciona a TI — pode ser infecção","Formata sem avisar"],correct:1,explain:"Comportamento anômalo pode indicar malware. Acione a TI." },
    { q:"Pode baixar programas 'piratas' no computador da empresa?",options:["Sim, economiza","Não, é risco de malware e é ilegal","Só de sites conhecidos"],correct:1,explain:"Software pirata é fonte de malware e viola políticas." },
  ],
  updates: [
    { q:"Aquela notificação de 'atualização disponível' que você adia todo dia serve para quê?",options:["Irritar você","Corrigir falhas de segurança que criminosos já conhecem","Mudar as cores do sistema"],correct:1,explain:"Atualizações corrigem vulnerabilidades. Adiar é manter a porta aberta." },
    { q:"O sistema pede para reiniciar após uma atualização. Você:",options:["Adia por semanas","Reinicia assim que possível — faz parte da proteção","Desliga o computador sem reiniciar"],correct:1,explain:"Muitas atualizações só se aplicam após reiniciar." },
    { q:"É seguro usar um sistema operacional que já não recebe atualizações (ex: Windows 7)?",options:["Sim, funciona igual","Não — sem atualizações, novas falhas nunca são corrigidas","Só se usar antivírus"],correct:1,explain:"Sistema sem suporte é alvo fácil. Falhas novas nunca serão corrigidas." },
  ],
  /* MÓDULO 5 — Senhas extras */
  mfa: [
    { q:"O que é autenticação em dois fatores (2FA)?",options:["Usar duas senhas iguais","Segunda comprovação além da senha (app, SMS, token)","Trocar a senha duas vezes por mês"],correct:1,explain:"MFA exige um segundo fator além da senha." },
    { q:"Você recebe um código 2FA sem ter tentado entrar. O que fazer?",options:["Repasso para o 'suporte' que ligou","Troco minha senha — alguém está tentando entrar","Digito no primeiro site que pedir"],correct:1,explain:"Código não solicitado = tentativa de invasão. Troque a senha." },
    { q:"Qual a melhor forma de guardar muitas senhas diferentes?",options:["Post-it no monitor","Gerenciador de senhas","Mesma senha em tudo"],correct:1,explain:"Gerenciadores criam e guardam senhas únicas com segurança." },
    { q:"Uma boa senha deve ter:",options:["Seu nome e ano de nascimento","No mínimo 12 caracteres, variados, sem dados pessoais","Apenas números fáceis"],correct:1,explain:"Tamanho e imprevisibilidade dificultam força bruta." },
    { q:"Pode reutilizar a senha do e-mail pessoal no sistema da empresa?",options:["Sim, facilita","Não — reutilização propaga vazamentos entre contas","Só se for forte"],correct:1,explain:"Se um sistema vaza, todos que compartilham a senha ficam expostos." },
  ],
  share: [
    { q:"Seu colega pede sua senha 'só para terminar um relatório'. Você:",options:["Empresta, é urgente","Não empresta e orienta a pedir acesso ao TI","Digita a senha no PC dele sem falar"],correct:1,explain:"Credenciais são pessoais. Qualquer ação com seu login é sua responsabilidade." },
    { q:"Você saiu de férias. Pode deixar sua senha com o substituto?",options:["Sim, para ele resolver as coisas","Não — ele deve ter acesso próprio provisório via TI","Sim, se for de confiança"],correct:1,explain:"O TI pode criar acesso temporário. Compartilhar senha viola a política da empresa." },
    { q:"Anotar senhas num caderno trancado na gaveta é seguro?",options:["É a melhor opção","Não ideal — use um gerenciador de senhas digital","Perfeitamente seguro"],correct:1,explain:"Cadernos podem ser encontrados. Gerenciadores criptografam as senhas." },
  ],
  /* MÓDULO 6 — Golpes do dia a dia */
  golpes: [
    { q:"Você recebe um PIX de R$ 0,01 com a mensagem 'confirme seus dados clicando aqui'. Isso é:",options:["Verificação normal do banco","Golpe para fazer você clicar num link falso","Presente surpresa"],correct:1,explain:"Bancos não pedem confirmação por PIX. O link leva a uma página falsa." },
    { q:"Um boleto chega por e-mail de um fornecedor real, mas a conta bancária é diferente do habitual. Você:",options:["Paga direto, o valor está certo","Confirma a mudança ligando para o fornecedor no telefone que já tinha","Paga e depois verifica"],correct:1,explain:"Boleto adulterado é golpe comum. Confirme SEMPRE por outro canal." },
    { q:"Mensagem de WhatsApp: 'Oi, troquei de número. Preciso de um PIX urgente.' Você:",options:["Transfere, é o contato","Liga para o número ANTIGO para confirmar antes","Pede o CPF para confirmar"],correct:1,explain:"Número novo + urgência + PIX = golpe clássico. Confirme pelo número antigo." },
    { q:"Instagram da loja recebe mensagem: 'Patrocínio de R$ 5.000, clique para aceitar'. O que fazer?",options:["Clicar e aceitar rápido","Ignorar e reportar — propostas legítimas vêm por canais oficiais","Responder pedindo mais informações"],correct:1,explain:"Golpistas usam redes sociais para phishing. Ofertas reais vêm por canais oficiais." },
    { q:"'Promoção exclusiva! Últimas unidades! Clique AGORA!' — o que isso indica?",options:["Uma boa oportunidade","Possível golpe usando urgência e escassez","Campanha de marketing normal"],correct:1,explain:"Urgência extrema + escassez + link = tática clássica de phishing." },
  ],
  /* MÓDULO 7 — LGPD */
  lgpd: [
    { q:"Cliente pede para 'guardar' o CPF num papel no balcão. O ideal é:",options:["Anotar e deixar no balcão","Registrar somente no sistema oficial","Mandar por WhatsApp pessoal"],correct:1,explain:"Dados pessoais só nos sistemas oficiais, nunca expostos." },
    { q:"O que é 'dado pessoal sensível' pela LGPD?",options:["Nome e e-mail","Dados de saúde, biometria, religião","Número da nota fiscal"],correct:1,explain:"Dados sensíveis têm proteção reforçada." },
    { q:"Recebeu planilha com dados de clientes por engano. O correto é:",options:["Repassar para colegas","Avisar o responsável/DPO e não divulgar","Salvar no pen drive pessoal"],correct:1,explain:"Comunique o incidente e jamais copie os dados." },
    { q:"Pode usar e-mail de cliente para enviar promoção pessoal sua?",options:["Sim, é cliente","Não — dados só para a finalidade autorizada","Só uma vez"],correct:1,explain:"LGPD exige finalidade e base legal. Uso não autorizado é violação." },
    { q:"Documentos com dados de clientes devem ser descartados:",options:["No lixo comum","Na fragmentadora ou descarte seguro","Deixar na mesa"],correct:1,explain:"Descarte seguro evita recuperação de dados do lixo." },
  ],
  dataclass: [
    { q:"Tabela de preços pública da loja. Classificação?",options:["Pública","Confidencial","Sensível"],correct:0,explain:"Preços já divulgados são informação pública." },
    { q:"Lista de clientes com CPF. Classificação?",options:["Pública","Confidencial / Dados pessoais","Pode divulgar"],correct:1,explain:"Dados pessoais são confidenciais e protegidos pela LGPD." },
    { q:"Senha do sistema de caixa. Classificação?",options:["Pública","Confidencial — nunca compartilhar","Interna, pode colar no monitor"],correct:1,explain:"Credenciais são confidenciais e individuais." },
    { q:"Organograma interno da loja. Classificação?",options:["Uso interno","Pública para concorrentes","Sensível (saúde)"],correct:0,explain:"Uso interno — não é pública nem é dado sensível." },
  ],
  descarte: [
    { q:"Um HD antigo com dados de clientes vai ser descartado. O correto é:",options:["Jogar no lixo eletrônico","Apagar os arquivos e formatar antes de descartar","Destruir fisicamente ou usar software de apagamento seguro"],correct:2,explain:"Formatação simples não apaga os dados de verdade. Destruição física ou apagamento seguro são necessários." },
    { q:"Papel com dados de clientes deve ser descartado:",options:["Rasgando ao meio","Na fragmentadora (corte em tiras ou confete)","Amassando e jogando no lixo"],correct:1,explain:"Fragmentadora é o único método seguro para papel com dados sensíveis." },
    { q:"Pen drive corporativo com dados antigos. O que fazer?",options:["Formatar e reutilizar sem avisar","Devolver ao TI para apagamento seguro","Guardar na gaveta indefinidamente"],correct:1,explain:"O TI tem ferramentas para apagar de forma segura antes de reutilizar ou descartar." },
  ],
  /* MÓDULO 8 — E-mail seguro */
  email_seg: [
    { q:"Um e-mail tem um anexo chamado 'Relatorio_Final.exe'. O que fazer?",options:["Abrir, é um relatório","NÃO abrir — .exe é um programa executável, possível malware","Renomear para .pdf e abrir"],correct:1,explain:"Extensão .exe significa programa executável. Relatórios legítimos vêm em .pdf ou .xlsx." },
    { q:"Extensões de anexo perigosas incluem:",options:["PDF e DOCX","EXE, BAT, SCR, ZIP com executável dentro","JPG e PNG"],correct:1,explain:".exe, .bat, .scr são executáveis. ZIPs podem esconder executáveis. PDFs e imagens são mais seguros." },
    { q:"Você recebeu um e-mail com dados de salários de toda a equipe que não deveria ver. O que fazer?",options:["Ler rapidinho e apagar","Avisar o remetente do erro e apagar sem repassar","Encaminhar para os colegas"],correct:1,explain:"Avisar o remetente evita que mais pessoas recebam por engano. Nunca repasse dados que não são para você." },
  ],
  replyall: [
    { q:"Você quer responder só ao seu gerente, mas clicou em 'Responder a Todos' num e-mail com 200 pessoas. O que fazer?",options:["Nada, ninguém vai perceber","Enviar imediatamente uma retratação pedindo desculpas ao grupo","Avisar o gerente e, se necessário, pedir ao TI para ajudar"],correct:2,explain:"Dependendo do conteúdo, pode ser necessário envolver o TI. Avise o gerente primeiro." },
    { q:"Um colega respondeu a todos com dados de RH que deveriam ser sigilosos. Você:",options:["Encaminha para mais gente","Avisa o colega e o RH sobre o vazamento","Finge que não viu"],correct:1,explain:"Reportar rapidamente minimiza o dano. Não espalhe." },
    { q:"Antes de encaminhar um e-mail longo, você deve:",options:["Encaminhar direto, quem receber que leia","Ler todo o histórico — pode ter informação confidencial escondida lá embaixo","Encaminhar só se for urgente"],correct:1,explain:"E-mails encaminhados carregam todo o histórico. Pode haver dados sigilosos escondidos nas respostas anteriores." },
  ],
  /* MÓDULO 9 — Trabalho remoto */
  remoto: [
    { q:"Você está no café e precisa acessar o sistema da empresa. O Wi-Fi é aberto. O que fazer?",options:["Conectar direto, é rápido","Usar o 4G/5G do celular ou a VPN da empresa","Pedir a senha ao garçom e confiar"],correct:1,explain:"Wi-Fi aberto pode ser interceptado. Use rede móvel ou VPN." },
    { q:"Trabalhar com a tela visível em avião ou café é arriscado porque:",options:["Ninguém presta atenção","Qualquer pessoa pode ler informações confidenciais (shoulder surfing)","É proibido por lei"],correct:1,explain:"Shoulder surfing é espiar por cima do ombro. Use película de privacidade." },
    { q:"Notebook da empresa foi furtado. A primeira ação é:",options:["Esperar até segunda-feira","Comunicar a TI/segurança imediatamente para bloqueio remoto","Só registrar B.O."],correct:1,explain:"Bloqueio remoto e revogação de acesso devem acontecer em horas, não dias." },
  ],
  meeting: [
    { q:"Numa videochamada, seu colega compartilhou a tela com o e-mail aberto e senhas salvas apareceram. O que fazer?",options:["Anotar as senhas, pode ser útil","Avisar o colega reservadamente para fechar","Fazer screenshot e mostrar depois"],correct:1,explain:"Avise discretamente. A pessoa pode nem ter percebido a exposição." },
    { q:"Antes de compartilhar a tela numa reunião online, você deve:",options:["Compartilhar direto","Fechar tudo que não é relevante — abas, e-mails, mensagens pessoais","Minimizar a janela do chat"],correct:1,explain:"Notificações, abas de e-mail e mensagens podem vazar informações." },
    { q:"É seguro gravar uma reunião online sem avisar os participantes?",options:["Sim, é minha reunião","Não — todos devem ser informados e consentir","Só se eu for o organizador"],correct:1,explain:"Gravação sem consentimento pode violar a LGPD e políticas internas." },
  ],
  /* MÓDULO 10 — Incidentes */
  incidente: [
    { q:"Você digitou sua senha numa página que depois percebeu ser falsa. O que fazer PRIMEIRO?",options:["Apagar o e-mail e seguir o dia","Trocar a senha imediatamente e avisar a TI","Esperar para ver se acontece algo"],correct:1,explain:"Trocar a senha corta o acesso do invasor. Avisar permite bloquear para os colegas." },
    { q:"Por que reportar incidentes mesmo quando 'não aconteceu nada'?",options:["Para complicar a vida de quem errou","Para a equipe de segurança bloquear a ameaça e proteger todos","Não precisa, se não aconteceu nada"],correct:1,explain:"Reportar cedo permite bloquear o remetente/link para TODA a empresa." },
    { q:"Um colega admite que clicou num link suspeito. Qual a melhor reação?",options:["Brincar com ele na frente de todos","Agradecer o aviso e acionar a segurança — cultura sem punição","Registrar no relatório de desempenho"],correct:1,explain:"Punir quem reporta cria silêncio. Silêncio transforma clique em incidente grave." },
  ],
  ransomware: [
    { q:"Arquivos começam a ser renomeados com extensão estranha (ex: .locked). O que fazer?",options:["Reiniciar o computador","Desconectar da rede (cabo/Wi-Fi) e chamar a TI imediatamente","Tentar renomear de volta"],correct:1,explain:"Desconectar impede que o ransomware se espalhe pela rede." },
    { q:"Uma tela vermelha pede pagamento em Bitcoin para devolver seus arquivos. Você:",options:["Paga para resolver logo","NÃO paga — aciona a TI e segurança","Tenta negociar um valor menor"],correct:1,explain:"Pagar financia o crime e não garante que os dados voltem." },
    { q:"O que mais ajuda a empresa a se recuperar de um ransomware?",options:["Ter a senha do hacker","Ter backups atualizados e testados","Ter um antivírus caro"],correct:1,explain:"Backups atualizados permitem restaurar tudo sem depender do criminoso." },
  ],
};

/* ══════════════ 10 MÓDULOS / 37 EXERCÍCIOS ══════════════ */
CB.MODULES = [
  /* ═══ INICIANTE ═══ */
  { id:"cleandesk",icon:"🧹",title:"Mesa Limpa",desc:"Segurança no ambiente físico da loja.",difficulty:"Iniciante",
    missions:[
      { id:"mesa-limpa",type:"cleandesk",icon:"🖥️",title:"Varredura na Loja",desc:"Ache os dados expostos na cena.",badge:"clean-desk",timerSec:null,info:"<h4>🧹 Mesa Limpa</h4><p>Dados expostos fisicamente são tão perigosos quanto digitais. Tela desbloqueada, CPF no balcão — tudo conta.</p>" },
      { id:"mesa-quiz",type:"quiz",icon:"🔒",title:"Crachá, Tela e Gaveta",desc:"Boas práticas no dia a dia.",quiz:"mesa",timerSec:20,info:"<h4>🔒 Práticas físicas</h4><p>Bloqueio de tela, crachá pessoal, impressora, descarte seguro.</p>" },
      { id:"visitor-quiz",type:"quiz",icon:"🚪",title:"Visitante Inesperado",desc:"O que fazer com gente sem crachá?",quiz:"visitor",timerSec:22,info:"<h4>🚪 Controle de acesso</h4><p>Uniforme não é credencial. Visitas precisam ser confirmadas.</p>" },
    ]},
  { id:"passwords",icon:"🔐",title:"Senhas & Acessos",desc:"Para todo mundo, não só TI.",difficulty:"Iniciante",
    missions:[
      { id:"pw-spot",type:"pwspot",icon:"🔎",title:"Senha Fraca ou Forte?",desc:"Classifique senhas.",count:5,badge:"password-master",timerSec:18,info:"<h4>🔎 Classificação</h4><p>Senhas com nome, data ou padrão são as primeiras que o atacante tenta.</p>" },
      { id:"pw-create",type:"pwcreate",icon:"🛡️",title:"Forje sua Frase-Senha",desc:"Crie uma senha forte.",badge:"password-master",timerSec:null,info:"<h4>🛡️ Frase-senha</h4><p>4 palavras aleatórias separadas por símbolos.</p>" },
      { id:"pw-mfa",type:"quiz",icon:"🔑",title:"Cadê meu 2FA?",desc:"Autenticação em dois fatores.",quiz:"mfa",timerSec:22,info:"<h4>🔑 MFA</h4><p>Segundo fator protege mesmo com senha vazada.</p>" },
      { id:"pw-share",type:"quiz",icon:"🚫",title:"Compartilhou, Perdeu",desc:"Por que nunca emprestar login.",quiz:"share",timerSec:20,info:"<h4>🚫 Compartilhamento</h4><p>Seu login, sua responsabilidade.</p>" },
    ]},
  /* ═══ INTERMEDIÁRIO ═══ */
  { id:"phishing",icon:"🎣",title:"Caça ao Phishing",desc:"Identifique e-mails, SMS e links fraudulentos.",difficulty:"Intermediário",
    missions:[
      { id:"phish-mail",type:"phishing",icon:"📧",title:"Inbox Suspeito",desc:"E-mails: confiável ou golpe?",count:6,badge:"phishing-detective",timerSec:25,info:"<h4>📧 Phishing por e-mail</h4><p>Observe: domínio do remetente, urgência, links e pedidos de dados.</p>" },
      { id:"phish-sms",type:"smishing",icon:"📱",title:"Smishing & WhatsApp",desc:"Mensagens suspeitas no celular.",count:5,badge:"smishing-pro",timerSec:20,info:"<h4>📱 Smishing</h4><p>Phishing via SMS/WhatsApp. Links inesperados com urgência.</p>" },
      { id:"url-spot",type:"urlspot",icon:"🌐",title:"Detector de Links",desc:"URL oficial ou falsa?",count:6,badge:"site-detective",timerSec:20,info:"<h4>🌐 Typosquatting</h4><p>Domínios parecidos com o real. Leia da direita para a esquerda.</p>" },
      { id:"sender-check",type:"quiz",icon:"🔍",title:"Quem Mandou Isso?",desc:"Identifique remetentes forjados.",quiz:"sender",timerSec:22,info:"<h4>🔍 Remetente falso</h4><p>O nome exibido pode ser qualquer coisa. O domínio importa.</p>" },
    ]},
  { id:"golpes",icon:"📱",title:"Golpes do Dia a Dia",desc:"PIX, WhatsApp, boleto e promoções.",difficulty:"Intermediário",
    missions:[
      { id:"golpe-pix",type:"quiz",icon:"💸",title:"PIX Armadilha",desc:"Reconheça golpes de PIX.",quiz:"golpes",count:2,timerSec:22,info:"<h4>💸 Golpe do PIX</h4><p>PIX de centavos com link, 'conta segura' — tudo isca.</p>" },
      { id:"golpe-boleto",type:"quiz",icon:"📄",title:"Boleto Adulterado",desc:"Confira antes de pagar.",quiz:"golpes",count:1,timerSec:22,info:"<h4>📄 Boleto falso</h4><p>Conta bancária diferente? Confirme por telefone.</p>" },
      { id:"golpe-whats",type:"quiz",icon:"💬",title:"WhatsApp Clonado",desc:"'Troquei de número'...",quiz:"golpes",count:1,timerSec:22,info:"<h4>💬 WhatsApp clonado</h4><p>Número novo + urgência + PIX = golpe.</p>" },
      { id:"golpe-promo",type:"quiz",icon:"🎁",title:"Promoção Boa Demais",desc:"Ofertas e sorteios falsos.",quiz:"golpes",count:1,timerSec:20,info:"<h4>🎁 Promoção falsa</h4><p>Urgência + escassez + link = isca.</p>" },
    ]},
  { id:"email",icon:"📧",title:"E-mail Corporativo Seguro",desc:"Boas práticas de e-mail.",difficulty:"Intermediário",
    missions:[
      { id:"email-anexo",type:"quiz",icon:"📎",title:"Anexo ou Armadilha?",desc:"Reconheça anexos perigosos.",quiz:"email_seg",timerSec:20,info:"<h4>📎 Anexos</h4><p>.exe, .bat, .scr = perigo. Relatórios vêm em PDF.</p>" },
      { id:"email-reply",type:"quiz",icon:"↩️",title:"Responder a Todos",desc:"Quando o e-mail vaza informação.",quiz:"replyall",timerSec:22,info:"<h4>↩️ Reply All</h4><p>Um clique errado pode vazar dados para 200 pessoas.</p>" },
      { id:"email-fwd",type:"quiz",icon:"➡️",title:"Encaminhei Errado",desc:"Vazamento por e-mail.",quiz:"replyall",count:1,timerSec:22,info:"<h4>➡️ Encaminhar</h4><p>E-mails encaminhados carregam o histórico completo.</p>" },
    ]},
  { id:"data",icon:"🗄️",title:"Dados & LGPD",desc:"Proteção de dados para todos.",difficulty:"Intermediário",
    missions:[
      { id:"lgpd-quiz",type:"quiz",icon:"⚖️",title:"LGPD no Balcão",desc:"Situações reais da loja.",quiz:"lgpd",timerSec:22,info:"<h4>⚖️ LGPD</h4><p>Proteger dados pessoais é obrigação de todos.</p>" },
      { id:"data-class",type:"quiz",icon:"🏷️",title:"Classificação de Dados",desc:"Público, interno ou confidencial?",quiz:"dataclass",timerSec:18,info:"<h4>🏷️ Classificação</h4><p>Cada tipo de dado tem regras de acesso.</p>" },
      { id:"data-descarte",type:"quiz",icon:"🗑️",title:"Descarte Seguro",desc:"Papel, HD, pen drive.",quiz:"descarte",timerSec:22,info:"<h4>🗑️ Descarte</h4><p>Jogar no lixo ≠ descartar com segurança.</p>" },
      { id:"data-access",type:"quiz",icon:"👁️",title:"Quem Pode Ver?",desc:"Controle de acesso a dados.",quiz:"dataclass",count:2,timerSec:20,info:"<h4>👁️ Controle de acesso</h4><p>Cada pessoa só acessa o necessário.</p>" },
    ]},
  /* ═══ AVANÇADO ═══ */
  { id:"malware",icon:"🦠",title:"Defesa contra Malware",desc:"Vírus, ransomware e pen drives.",difficulty:"Avançado",
    missions:[
      { id:"malware-quiz",type:"quiz",icon:"🛡️",title:"Alerta de Malware",desc:"Quiz sobre como se proteger.",quiz:"malware",timerSec:22,info:"<h4>🦠 Malware</h4><p>Vírus, ransomware, spyware. Entram por anexos e downloads.</p>" },
      { id:"pendrive-scen",type:"social",icon:"🔌",title:"Pen Drive Perdido",desc:"Cenários de decisão com dispositivos.",count:3,badge:"malware-analyst",timerSec:30,info:"<h4>🔌 Baiting</h4><p>Dispositivos 'perdidos' são iscas. Nunca conecte.</p>" },
      { id:"updates-quiz",type:"quiz",icon:"🔄",title:"Atualizou ou Arriscou?",desc:"Importância das atualizações.",quiz:"updates",timerSec:20,info:"<h4>🔄 Atualizações</h4><p>Cada atualização adiada é uma porta aberta.</p>" },
      { id:"download-quiz",type:"quiz",icon:"⬇️",title:"Download Seguro?",desc:"De onde baixar é tão importante quanto o quê.",quiz:"malware",count:2,timerSec:20,info:"<h4>⬇️ Downloads</h4><p>Só baixe de fontes oficiais.</p>" },
    ]},
  { id:"social",icon:"🎭",title:"Cenários Reais",desc:"Engenharia social no dia a dia.",difficulty:"Avançado",
    missions:[
      { id:"soc-call",type:"social",icon:"📞",title:"A Ligação Falsa",desc:"Pretexting por telefone.",count:2,badge:"social-eng",timerSec:30,info:"<h4>📞 Vishing</h4><p>Golpista liga fingindo ser suporte. Confirme por canal oficial.</p>" },
      { id:"soc-boss",type:"social",icon:"👔",title:"O Chefe Mandou",desc:"Fraude do CEO/gerente.",count:2,badge:"social-eng",timerSec:30,info:"<h4>👔 Fraude do CEO</h4><p>Mensagem urgente do 'chefe'. Confirme pessoalmente.</p>" },
      { id:"soc-vendor",type:"social",icon:"📦",title:"O Fornecedor Urgente",desc:"BEC e troca de conta.",count:2,badge:"social-eng",timerSec:30,info:"<h4>📦 BEC</h4><p>E-mail com conta bancária nova. Ligue para confirmar.</p>" },
      { id:"soc-help",type:"social",icon:"🤝",title:"Ajuda Demais",desc:"Quando a gentileza vira vulnerabilidade.",count:1,badge:"social-eng",timerSec:30,info:"<h4>🤝 Empatia explorada</h4><p>Pedir ajuda é tática de engenharia social.</p>" },
    ]},
  { id:"remoto",icon:"🏠",title:"Trabalho Remoto & Wi-Fi",desc:"Home office e redes públicas.",difficulty:"Avançado",
    missions:[
      { id:"wifi-quiz",type:"quiz",icon:"📶",title:"Wi-Fi de Shopping",desc:"Redes públicas vs VPN.",quiz:"remoto",timerSec:22,info:"<h4>📶 Wi-Fi público</h4><p>Rede aberta pode ser do atacante. Use VPN.</p>" },
      { id:"notebook-quiz",type:"quiz",icon:"💼",title:"Notebook na Mochila",desc:"Cuidados fora da loja.",quiz:"remoto",count:1,timerSec:22,info:"<h4>💼 Dispositivo móvel</h4><p>Notebook furtado = dados expostos. Avise a TI.</p>" },
      { id:"meeting-quiz",type:"quiz",icon:"📹",title:"Reunião Online",desc:"O que não pode aparecer na tela.",quiz:"meeting",timerSec:22,info:"<h4>📹 Videochamada</h4><p>Compartilhar tela mostra tudo. Feche o desnecessário.</p>" },
      { id:"vpn-quiz",type:"quiz",icon:"🔐",title:"VPN: Por Quê?",desc:"Para que serve e quando usar.",quiz:"remoto",count:1,timerSec:20,info:"<h4>🔐 VPN</h4><p>VPN criptografa sua conexão em rede pública.</p>" },
    ]},
  /* ═══ ESPECIALISTA ═══ */
  { id:"incidente",icon:"🚨",title:"O Que Fazer Quando Deu Ruim",desc:"Resposta a incidentes sem pânico.",difficulty:"Especialista",
    missions:[
      { id:"inc-click",type:"quiz",icon:"🖱️",title:"Cliquei no Link!",desc:"Passo a passo depois do erro.",quiz:"incidente",timerSec:22,info:"<h4>🖱️ Depois do clique</h4><p>Trocar senha → avisar TI → não apagar o e-mail.</p>" },
      { id:"inc-report",type:"quiz",icon:"📣",title:"Reportar Sem Medo",desc:"Cultura de reporte.",quiz:"incidente",count:1,timerSec:22,info:"<h4>📣 Sem punição</h4><p>Quem reporta protege todos.</p>" },
      { id:"inc-ransom",type:"quiz",icon:"💀",title:"Ransomware na Tela",desc:"O que fazer nos primeiros minutos.",quiz:"ransomware",timerSec:22,info:"<h4>💀 Ransomware</h4><p>Desconecte da rede, NÃO pague, acione TI.</p>" },
    ]},
];

CB.allMissions=function(){var out=[];CB.MODULES.forEach(function(m){m.missions.forEach(function(mi){out.push(Object.assign({moduleId:m.id,moduleTitle:m.title,moduleIcon:m.icon},mi));});});return out;};
CB.missionById=function(id){return CB.allMissions().find(function(m){return m.id===id;});};

/* ══════════════ 30 CONQUISTAS ══════════════ */
CB.BADGES = [
  { id:"phishing-detective",icon:"🕵️",name:"Detetive de Phishing",desc:"Identifique e-mails maliciosos.",cond:"Conclua Inbox Suspeito." },
  { id:"smishing-pro",icon:"📲",name:"Caçador de Smishing",desc:"Detecte golpes no celular.",cond:"Conclua Smishing & WhatsApp." },
  { id:"site-detective",icon:"🌐",name:"Detetive de Sites",desc:"Reconheça typosquatting.",cond:"Conclua Detector de Links." },
  { id:"clean-desk",icon:"🧹",name:"Mesa Limpa",desc:"Proteja dados no ambiente físico.",cond:"Conclua Varredura na Loja." },
  { id:"malware-analyst",icon:"🦠",name:"Analista de Malware",desc:"Defenda-se de vírus.",cond:"Conclua Alerta de Malware." },
  { id:"social-eng",icon:"🎭",name:"Anti-Engenharia Social",desc:"Identifique manipulações.",cond:"Conclua Cenários Reais." },
  { id:"password-master",icon:"🔑",name:"Mestre das Senhas",desc:"Crie e gerencie senhas fortes.",cond:"Conclua missões de senha." },
  { id:"access-guru",icon:"🧩",name:"Guru dos Acessos",desc:"Domine a autenticação em dois fatores.",cond:"Conclua Cadê meu 2FA." },
  { id:"data-guardian",icon:"🗄️",name:"Guardião de Dados",desc:"Proteja dados (LGPD).",cond:"Conclua o módulo de Dados." },
  { id:"onboarding-done",icon:"🎓",name:"Guardião Certificado",desc:"Completou o treinamento inicial.",cond:"Conclua o onboarding." },
  { id:"rising-star",icon:"🚀",name:"Estrela em Ascensão",desc:"Alcançou o Nível 10.",cond:"Chegue ao Nível 10." },
  { id:"net-defender",icon:"🛡️",name:"Defensor de Rede",desc:"Alcançou o Nível 20.",cond:"Chegue ao Nível 20." },
  { id:"module-master",icon:"🏆",name:"Especialista",desc:"Conclua um módulo inteiro.",cond:"Complete todas as missões de um módulo." },
  { id:"cyber-master",icon:"🏅",name:"Mestre Cyber",desc:"Desbloqueie 10 badges.",cond:"Colete 10 conquistas." },
  { id:"speedster",icon:"⚡",name:"Velocista",desc:"Acertou rápido.",cond:"Acerte com tempo de sobra." },
  { id:"perfect",icon:"🌟",name:"Pontuação Perfeita",desc:"100% sem erros.",cond:"Termine uma missão sem erros." },
  { id:"response-elite",icon:"🚨",name:"Elite de Resposta",desc:"10 acertos seguidos.",cond:"10 acertos seguidos." },
  { id:"untouchable",icon:"💎",name:"Intocável",desc:"15 acertos seguidos.",cond:"Conquista secreta",secret:true },
  { id:"first-blood",icon:"🩸",name:"Primeiro Sangue",desc:"Sua primeira missão.",cond:"Conclua qualquer missão." },
  { id:"hat-trick",icon:"🎩",name:"Hat-trick",desc:"3 missões diferentes.",cond:"Conclua 3 missões." },
  { id:"top10",icon:"📈",name:"Top 10",desc:"Entrou no top 10.",cond:"Chegue ao top 10." },
  { id:"top3",icon:"🥇",name:"Pódio",desc:"Entrou no top 3.",cond:"Chegue ao top 3." },
  { id:"branch-pride",icon:"🏬",name:"Orgulho da Filial",desc:"Filial no top 3.",cond:"Filial no top 3." },
  { id:"all-modules",icon:"🗺️",name:"Explorador Completo",desc:"Jogou em todos os módulos.",cond:"Uma missão de cada módulo." },
  { id:"night-owl",icon:"🦉",name:"Coruja Cibernética",desc:"Treinou de madrugada.",cond:"Conquista secreta",secret:true },
  { id:"marathoner",icon:"🏃",name:"Maratonista",desc:"20 partidas.",cond:"Conquista secreta",secret:true },
  { id:"explorer",icon:"🧭",name:"Explorador",desc:"Visitou todas as áreas.",cond:"Conquista secreta",secret:true },
  { id:"comeback",icon:"🔄",name:"Volta por Cima",desc:"Voltou e venceu.",cond:"Conquista secreta",secret:true },
  { id:"streak-3",icon:"🔥",name:"Em Chamas",desc:"3 dias seguidos.",cond:"Conquista secreta",secret:true },
  { id:"perfectionist",icon:"🎯",name:"Perfeccionista",desc:"Gabaritou 3 missões.",cond:"Conquista secreta",secret:true },
];

CB.RANK_TITLES=[{min:20,title:"Mestre Cyber"},{min:15,title:"Hacker Elite"},{min:10,title:"Guardião"},{min:6,title:"Analista de Segurança"},{min:3,title:"Aprendiz Cyber"},{min:1,title:"Recruta"}];

CB.SEED_USERS=[
  {name:"Chrono_Raider",dept:"Ferramentas",role:"Tecnologia (TI)",branch:"Morumbi - SP",xp:12480,avatar:"🤖"},
  {name:"Nova_Fury",dept:"Tintas",role:"Gerência",branch:"Interlagos - SP",xp:9120,avatar:"👾"},
  {name:"Nexus_Pulse",dept:"Construção",role:"Vendedor(a)",branch:"Tijuca - RJ",xp:7340,avatar:"🦾"},
  {name:"Phantom_Core",dept:"Logística / Depósito",role:"Estoque & Logística",branch:"Morumbi - SP",xp:5210,avatar:"🥷"},
  {name:"Cipher_Storm",dept:"Decoração",role:"Vendedor(a)",branch:"Campinas - SP",xp:3960,avatar:"🦊"},
  {name:"Apex_Legenda",dept:"Jardim",role:"Atendimento ao Cliente",branch:"Curitiba - PR",xp:3210,avatar:"🦅"},
  {name:"Void_Runner",dept:"Madeira",role:"Vendedor(a)",branch:"Tijuca - RJ",xp:2480,avatar:"🐺"},
  {name:"Glitch_Gamer",dept:"Administrativo",role:"Administrativo / RH",branch:"Niterói - RJ",xp:1870,avatar:"🐉"},
  {name:"Sonic_Flare",dept:"Elétrica",role:"Vendedor(a)",branch:"Morumbi - SP",xp:1320,avatar:"⚡"},
  {name:"Cyber_Huntress",dept:"Organização",role:"Segurança Patrimonial",branch:"Porto Alegre - RS",xp:980,avatar:"🐱"},
  {name:"Byte_Knight",dept:"Hidráulica",role:"Compras & Suprimentos",branch:"Salvador - BA",xp:720,avatar:"🐯"},
  {name:"Pixel_Rogue",dept:"Caixa / Frente de Loja",role:"Operador(a) de Caixa",branch:"Recife - PE",xp:540,avatar:"🦝"},
  {name:"Echo_Vortex",dept:"Construção",role:"Vendedor(a)",branch:"Campinas - SP",xp:360,avatar:"🦉"},
  {name:"Data_Wraith",dept:"Logística / Depósito",role:"Estoque & Logística",branch:"Belo Horizonte - MG",xp:240,avatar:"🐙"},
  {name:"Neon_Spectre",dept:"Jardim",role:"Limpeza & Conservação",branch:"Brasília - DF",xp:120,avatar:"🐢"},
];

CB.TOP_MISSIONS=[{icon:"🎣",name:"Caça ao Phishing"},{icon:"🧹",name:"Missão Mesa Limpa"},{icon:"⚖️",name:"LGPD no Balcão"}];
CB.SHOP=[
  {id:"frame-neon",type:"frame",name:"Moldura Neon",icon:"🟢",cost:300},
  {id:"frame-cyan",type:"frame",name:"Moldura Cyber",icon:"🔵",cost:450},
  {id:"frame-purple",type:"frame",name:"Moldura Púrpura",icon:"🟣",cost:500},
  {id:"frame-gold",type:"frame",name:"Moldura Ouro",icon:"🟡",cost:800},
  {id:"title-hunter",type:"title",name:"Título: Caçador de Phishing",icon:"🎣",cost:400,value:"Caçador de Phishing"},
  {id:"title-ninja",type:"title",name:"Título: Ninja Cibernético",icon:"🥷",cost:700,value:"Ninja Cibernético"},
  {id:"title-guardian",type:"title",name:"Título: Guardião Supremo",icon:"🛡️",cost:1000,value:"Guardião Supremo"},
  {id:"title-legend",type:"title",name:"Título: Lenda da Loja",icon:"👑",cost:1500,value:"Lenda da Loja"},
];
CB.shopItem=function(id){return CB.SHOP.find(function(s){return s.id===id;});};
CB.BASE_ACCURACY={"phish-mail":72,"phish-sms":55,"url-spot":60,"sender-check":70,"mesa-limpa":63,"mesa-quiz":75,"visitor-quiz":68,"malware-quiz":74,"pendrive-scen":65,"updates-quiz":78,"soc-call":68,"soc-boss":62,"soc-vendor":60,"soc-help":72,"pw-spot":78,"pw-create":86,"pw-mfa":80,"pw-share":75,"golpe-pix":65,"golpe-boleto":70,"golpe-whats":68,"golpe-promo":72,"lgpd-quiz":75,"data-class":70,"data-descarte":73,"email-anexo":76,"email-reply":65,"email-fwd":68,"wifi-quiz":72,"notebook-quiz":74,"meeting-quiz":70,"inc-click":78,"inc-report":80,"inc-ransom":69};
