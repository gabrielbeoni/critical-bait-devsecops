/* ============================================================
   TRADUÇÕES COMPLETAS — EN + ES
   PT é o base (data.js), estas são as traduções
   ============================================================ */

CB.TRANSLATIONS = {
  /* ── Módulos do ONBOARDING ── */
  onboarding: {
    en: {
      "ob-1": { title: "What is Phishing?", intro: "Scammers send fake messages to steal your data.",
        tips: [["⏰","Fake urgency",'"Your account will be blocked in 24h!"'],["🔗","Suspicious links","Shortened or strange domain URLs"],["👤","Generic sender",'"Dear employee" — without your name'],["🔑","Asks for data","Password, ID, 2FA code, bank details"]],
        rule: "Always be suspicious. Check the email domain (after the @).",
        quiz: { q: "Email from 'HR' asking your password to 'update the system'. What do you do?", options: ["I provide the password, it's urgent","I don't provide it — HR never asks for passwords by email","I only provide if it comes from corporate email"], explain: "No legitimate department asks for your password by email." }
      },
      "ob-2": { title: "Social Engineering", intro: "Psychological manipulation to make you act without thinking.",
        tips: [["👔","Authority",'"I\'m the director, I need this now."'],["⚡","Urgency",'"If you don\'t do it in 10 min, we lose everything."'],["🤝","Empathy",'"Help me, just this once."'],["🔌","Baiting",'USB drive labeled "Salaries 2024"']],
        rule: "Verify identity through a different channel than the request.",
        quiz: { q: "'IT' calls asking for your 2FA code. You:", options: ["I give the code, it's support","I never give it — I hang up and call official IT","I give only the first 3 digits"], explain: "2FA codes should NEVER be shared." }
      },
      "ob-3": { title: "Passwords & Authentication", intro: "Weak password = open door. Protect your access.",
        tips: [["❌","Weak password","leroy2024, 123456, Password@123"],["✅","Strong password","Tr0vão#Azul_92! — long and unpredictable"],["📱","2FA / MFA","Second factor protects even with leaked password"],["🚫","Never share","Your login = your responsibility"]],
        rule: "Use at least 12 characters, no personal data.",
        quiz: { q: "Which password is more secure?", options: ["leroy2024","Password@123","Tr0vão#Azul_92!"], explain: "Combines letters, numbers and symbols without obvious pattern." }
      },
      "ob-4": { title: "Malware & Devices", intro: "Malicious software that invades your computer or phone.",
        tips: [["📎","Dangerous attachments",".exe, .bat, .zip with executables"],["🔌","USB drive","Never connect unknown devices"],["🔄","Updates","Keep everything updated — always"],["🚨","Strange PC?","Slow, windows opening alone → IT"]],
        rule: "Don't install anything without IT authorization.",
        quiz: { q: "USB drive in parking lot labeled 'Salaries 2024'. What do you do?", options: ["I connect to see whose it is","I hand it to IT without connecting","I take it home"], explain: "'Lost' USB drives can be bait (baiting). Never connect." }
      },
      "ob-5": { title: "LGPD & Data", intro: "Personal data of clients and colleagues are protected by law.",
        tips: [["📋","Only what's needed","Collect only what you need"],["🗑️","Secure disposal","Shredder for papers with data"],["💻","Official system","Data only in systems — never on paper"],["📱","Never via WhatsApp","Personal data in personal apps = violation"]],
        rule: "Violations generate heavy fines and reputation damage.",
        quiz: { q: "Client asks to keep their ID number on paper at the counter. Ideal is:", options: ["I write it down, speeds up service","I register only in the official system","I send via WhatsApp"], explain: "Personal data only in official systems." }
      },
      "ob-6": { title: "Clean Desk", intro: "Security is also physical. Protect what's in plain sight.",
        tips: [["🖥️","Lock screen","Left the desk? Win+L — always"],["🪪","Personal badge","Never lend, even to colleagues"],["🖨️","Printer","Remove documents immediately"],["🚪","No tailgating","Don't let anyone in without a badge"]],
        rule: "5 minutes is enough for someone to access everything.",
        quiz: { q: "Going for coffee for 5 minutes. What do you do with the PC?", options: ["I leave it open, it's quick","I lock the screen (Win+L) — always","I shut it down completely"], explain: "Any absence without locking is a risk." }
      }
    },
    es: {
      "ob-1": { title: "¿Qué es el Phishing?", intro: "Los estafadores envían mensajes falsos para robar tus datos.",
        tips: [["⏰","Urgencia falsa",'"¡Tu cuenta será bloqueada en 24h!"'],["🔗","Enlaces sospechosos","URLs acortadas o con dominio extraño"],["👤","Remitente genérico",'"Estimado colaborador" — sin tu nombre'],["🔑","Pide datos","Contraseña, DNI, código 2FA, datos bancarios"]],
        rule: "Desconfía siempre. Verifica el dominio del correo (después del @).",
        quiz: { q: "Correo de 'RRHH' pidiendo tu contraseña para 'actualizar el sistema'. ¿Qué haces?", options: ["Proporciono la contraseña, es urgente","No la proporciono — RRHH nunca pide contraseñas por correo","Solo si viene de correo corporativo"], explain: "Ningún departamento legítimo pide tu contraseña por correo." }
      },
      "ob-2": { title: "Ingeniería Social", intro: "Manipulación psicológica para hacerte actuar sin pensar.",
        tips: [["👔","Autoridad",'"Soy el director, necesito esto ahora."'],["⚡","Urgencia",'"Si no lo haces en 10 min, perdemos todo."'],["🤝","Empatía",'"Ayúdame, solo esta vez."'],["🔌","Cebo (Baiting)",'USB con etiqueta "Salarios 2024"']],
        rule: "Verifica la identidad por un canal diferente al de la solicitud.",
        quiz: { q: "Llamada de 'TI' pidiendo tu código 2FA. Tú:", options: ["Doy el código, es soporte","Nunca lo doy — cuelgo y llamo al TI oficial","Doy solo los primeros 3 dígitos"], explain: "Los códigos 2FA NUNCA deben compartirse." }
      },
      "ob-3": { title: "Contraseñas y Autenticación", intro: "Contraseña débil = puerta abierta. Protege tus accesos.",
        tips: [["❌","Contraseña débil","leroy2024, 123456, Clave@123"],["✅","Contraseña fuerte","Tr0vão#Azul_92! — larga e impredecible"],["📱","2FA / MFA","Segundo factor protege incluso con contraseña filtrada"],["🚫","Nunca compartir","Tu login = tu responsabilidad"]],
        rule: "Usa al menos 12 caracteres, sin datos personales.",
        quiz: { q: "¿Cuál contraseña es más segura?", options: ["leroy2024","Clave@123","Tr0vão#Azul_92!"], explain: "Combina letras, números y símbolos sin patrón obvio." }
      },
      "ob-4": { title: "Malware y Dispositivos", intro: "Software malicioso que invade tu computadora o celular.",
        tips: [["📎","Adjuntos peligrosos",".exe, .bat, .zip con ejecutables"],["🔌","USB","Nunca conectes dispositivos desconocidos"],["🔄","Actualizaciones","Mantén todo actualizado — siempre"],["🚨","¿PC extraño?","Lento, ventanas abriéndose solas → TI"]],
        rule: "No instales nada sin autorización de TI.",
        quiz: { q: "USB en el estacionamiento con etiqueta 'Salarios 2024'. ¿Qué haces?", options: ["Lo conecto para ver de quién es","Lo entrego a TI sin conectar","Me lo llevo a casa"], explain: "Los USB 'perdidos' pueden ser trampas (baiting). Nunca los conectes." }
      },
      "ob-5": { title: "LGPD y Datos", intro: "Los datos personales de clientes y colegas están protegidos por ley.",
        tips: [["📋","Solo lo necesario","Recopila solo lo que necesitas"],["🗑️","Eliminación segura","Trituradora para papeles con datos"],["💻","Sistema oficial","Datos solo en sistemas — nunca en papel"],["📱","Nunca por WhatsApp","Datos personales en apps personales = violación"]],
        rule: "Las violaciones generan multas pesadas y daño reputacional.",
        quiz: { q: "Cliente pide guardar su DNI en un papel en el mostrador. Lo ideal es:", options: ["Lo anoto, agiliza la atención","Lo registro solo en el sistema oficial","Lo mando por WhatsApp"], explain: "Datos personales solo en los sistemas oficiales." }
      },
      "ob-6": { title: "Escritorio Limpio", intro: "La seguridad también es física. Protege lo que está a la vista.",
        tips: [["🖥️","Pantalla bloqueada","¿Saliste del escritorio? Win+L — siempre"],["🪪","Credencial personal","Nunca la prestes, ni a colegas"],["🖨️","Impresora","Retira documentos inmediatamente"],["🚪","Sin colados","No dejes entrar a nadie sin credencial"]],
        rule: "5 minutos bastan para que alguien acceda a todo.",
        quiz: { q: "Vas por café por 5 minutos. ¿Qué haces con la PC?", options: ["La dejo abierta, es rápido","Bloqueo la pantalla (Win+L) — siempre","La apago completamente"], explain: "Cualquier ausencia sin bloqueo es un riesgo." }
      }
    }
  },

  /* ── Títulos dos módulos do PATH ── */
  modules: {
    en: {
      phishing: "Phishing — Fake Emails", social: "Social Engineering", passwords: "Passwords & MFA",
      malware: "Malware & Devices", lgpd: "LGPD & Data Protection", cleandesk: "Clean Desk & Physical Security",
      smishing: "Smishing & WhatsApp", urlspot: "URL Analysis", pwcreate: "Password Creation", advanced: "Advanced Quiz"
    },
    es: {
      phishing: "Phishing — Correos Falsos", social: "Ingeniería Social", passwords: "Contraseñas y MFA",
      malware: "Malware y Dispositivos", lgpd: "LGPD y Protección de Datos", cleandesk: "Escritorio Limpio y Seguridad Física",
      smishing: "Smishing y WhatsApp", urlspot: "Análisis de URL", pwcreate: "Creación de Contraseñas", advanced: "Quiz Avanzado"
    }
  },

  /* ── Dificuldades ── */
  difficulty: {
    en: { "Iniciante": "Beginner", "Intermediário": "Intermediate", "Avançado": "Advanced", "Especialista": "Expert" },
    es: { "Iniciante": "Principiante", "Intermediário": "Intermedio", "Avançado": "Avanzado", "Especialista": "Experto" }
  },

  /* ── Rank titles ── */
  ranks: {
    en: ["Cyber Apprentice","Cyber Cadet","Recruit","Analyst","Guardian","Sentinel","Defender","Specialist","Expert","Investigator",
         "Strategist","Architect","Commander","Captain","Master","Director","Mentor","Legend","Guardian Elite","Cyber Champion"],
    es: ["Aprendiz Cyber","Cadete Cyber","Recluta","Analista","Guardián","Centinela","Defensor","Especialista","Experto","Investigador",
         "Estratega","Arquitecto","Comandante","Capitán","Maestro","Director","Mentor","Leyenda","Guardián Élite","Campeón Cyber"]
  },

  /* ── Badges ── */
  badges: {
    en: {
      "first-blood":"First Blood","first-blood-d":"Complete your first mission",
      "perfect":"Perfect Score","perfect-d":"100% accuracy in a mission",
      "onboarding-done":"Training Complete","onboarding-done-d":"Finish the training module",
      "streak-3":"3-Day Streak","streak-3-d":"Play 3 days in a row",
      "streak-7":"Weekly Warrior","streak-7-d":"Play 7 days in a row",
      "xp-1000":"XP Hunter","xp-1000-d":"Reach 1,000 XP",
      "xp-5000":"XP Master","xp-5000-d":"Reach 5,000 XP",
      "all-phishing":"Anti-Phishing","all-phishing-d":"Complete all phishing missions",
      "all-social":"Anti-Social Engineering","all-social-d":"Complete all social engineering missions",
      "all-passwords":"Password Master","all-passwords-d":"Complete all password missions",
      "all-malware":"Anti-Malware","all-malware-d":"Complete all malware missions",
      "all-lgpd":"LGPD Guardian","all-lgpd-d":"Complete all LGPD missions",
      "all-cleandesk":"Clean Desk Pro","all-cleandesk-d":"Complete all clean desk missions",
      "level-5":"Level 5","level-5-d":"Reach level 5",
      "level-10":"Level 10","level-10-d":"Reach level 10",
      "level-15":"Level 15","level-15-d":"Reach level 15",
      "level-20":"Maximum Level","level-20-d":"Reach level 20",
      "missions-10":"10 Missions","missions-10-d":"Complete 10 missions",
      "missions-20":"20 Missions","missions-20-d":"Complete 20 missions",
      "missions-all":"All Missions","missions-all-d":"Complete all missions",
      "speed-demon":"Speed Demon","speed-demon-d":"Finish a mission in under 30 seconds"
    },
    es: {
      "first-blood":"Primera Sangre","first-blood-d":"Completa tu primera misión",
      "perfect":"Puntuación Perfecta","perfect-d":"100% de acierto en una misión",
      "onboarding-done":"Capacitación Completa","onboarding-done-d":"Finaliza el módulo de capacitación",
      "streak-3":"Racha de 3 Días","streak-3-d":"Juega 3 días seguidos",
      "streak-7":"Guerrero Semanal","streak-7-d":"Juega 7 días seguidos",
      "xp-1000":"Cazador de XP","xp-1000-d":"Alcanza 1.000 XP",
      "xp-5000":"Maestro de XP","xp-5000-d":"Alcanza 5.000 XP",
      "all-phishing":"Anti-Phishing","all-phishing-d":"Completa todas las misiones de phishing",
      "all-social":"Anti-Ingeniería Social","all-social-d":"Completa todas las misiones de ingeniería social",
      "all-passwords":"Maestro de Contraseñas","all-passwords-d":"Completa todas las misiones de contraseñas",
      "all-malware":"Anti-Malware","all-malware-d":"Completa todas las misiones de malware",
      "all-lgpd":"Guardián LGPD","all-lgpd-d":"Completa todas las misiones de LGPD",
      "all-cleandesk":"Escritorio Limpio Pro","all-cleandesk-d":"Completa todas las misiones de escritorio limpio",
      "level-5":"Nivel 5","level-5-d":"Alcanza el nivel 5",
      "level-10":"Nivel 10","level-10-d":"Alcanza el nivel 10",
      "level-15":"Nivel 15","level-15-d":"Alcanza el nivel 15",
      "level-20":"Nivel Máximo","level-20-d":"Alcanza el nivel 20",
      "missions-10":"10 Misiones","missions-10-d":"Completa 10 misiones",
      "missions-20":"20 Misiones","missions-20-d":"Completa 20 misiones",
      "missions-all":"Todas las Misiones","missions-all-d":"Completa todas las misiones",
      "speed-demon":"Demonio de Velocidad","speed-demon-d":"Termina una misión en menos de 30 segundos"
    }
  },

  /* ── Instruções dos exercícios ── */
  exercises: {
    en: {
      phishing_q: "Is this email trustworthy or a <b>phishing</b> attempt?",
      smishing_q: "Is this message trustworthy or a scam (<b>smishing</b>)?",
      url_q: "Is this address the <b>official website</b> or <b>fake</b> (typosquatting)?",
      pw_classify_q: "Is this password <b>weak</b> or <b>strong</b>?",
      pw_create_q: "Create a strong password. It won't be saved — just evaluated.",
      safe: "Safe", suspicious: "Suspicious", weak: "Weak", strong: "Strong",
      next: "NEXT", finish: "FINISH", concept: "Concept", exit: "EXIT",
      correct_fb: "Correct!", wrong_fb: "Incorrect.",
      plays: "Plays", best: "Best %", mission: "Mission"
    },
    es: {
      phishing_q: "¿Este correo es confiable o es un intento de <b>phishing</b>?",
      smishing_q: "¿Este mensaje es confiable o es una estafa (<b>smishing</b>)?",
      url_q: "¿Esta dirección es el <b>sitio oficial</b> o es <b>falsa</b> (typosquatting)?",
      pw_classify_q: "¿Esta contraseña es <b>débil</b> o <b>fuerte</b>?",
      pw_create_q: "Crea una contraseña fuerte. No será guardada — solo evaluada.",
      safe: "Seguro", suspicious: "Sospechoso", weak: "Débil", strong: "Fuerte",
      next: "SIGUIENTE", finish: "FINALIZAR", concept: "Concepto", exit: "SALIR",
      correct_fb: "¡Correcto!", wrong_fb: "Incorrecto.",
      plays: "Partidas", best: "Mejor %", mission: "Misión"
    }
  },

  /* ── Admin ── */
  admin: {
    en: {
      collaborators: "Collaborators", missions_done: "Missions completed", avg_level: "Average level",
      total_missions: "Total missions", xp_branch: "XP by Branch", perf_module: "Performance by Module",
      level_dist: "Level Distribution", completion_rate: "Completion Rate",
      weak_points: "Team weak points", name: "Name", email: "Email", role: "Role", branch: "Branch",
      level: "Level", type: "Type", actions: "Actions", member: "Member",
      to_admin: "→ Admin", to_member: "→ Member", reset: "reset", remove: "remove",
      branch_changed: "Branch changed", generated: "Generated on", internal: "Internal use"
    },
    es: {
      collaborators: "Colaboradores", missions_done: "Misiones completadas", avg_level: "Nivel promedio",
      total_missions: "Total misiones", xp_branch: "XP por Sucursal", perf_module: "Desempeño por Módulo",
      level_dist: "Distribución de Niveles", completion_rate: "Tasa de Finalización",
      weak_points: "Puntos débiles del equipo", name: "Nombre", email: "Correo", role: "Función", branch: "Sucursal",
      level: "Nivel", type: "Tipo", actions: "Acciones", member: "Miembro",
      to_admin: "→ Admin", to_member: "→ Miembro", reset: "resetear", remove: "eliminar",
      branch_changed: "Sucursal cambiada", generated: "Generado el", internal: "Uso interno"
    }
  },

  /* ── Dicas do dia ── */
  daily_tips: {
    en: [
      "Never share your password — not even with trusted colleagues.",
      "Always check the email domain (after the @) before clicking.",
      "Lock your screen (Win+L) even for 1-minute absences.",
      "Unknown USB drives may contain malware. Hand them to IT.",
      "System updates fix flaws that criminals already know about.",
      "Public Wi-Fi can be intercepted. Use VPN or mobile data.",
      "Urgency + data request = likely scam. Always be suspicious.",
      "Documents with personal IDs should go to the shredder, never the trash.",
      "2FA codes should never be shared with anyone.",
      "If you clicked a suspicious link: change your password and notify IT immediately."
    ],
    es: [
      "Nunca compartas tu contraseña — ni con colegas de confianza.",
      "Siempre verifica el dominio del correo (después del @) antes de hacer clic.",
      "Bloquea la pantalla (Win+L) incluso para ausencias de 1 minuto.",
      "Los USB desconocidos pueden contener malware. Entrégalos a TI.",
      "Las actualizaciones corrigen fallas que los criminales ya conocen.",
      "El Wi-Fi público puede ser interceptado. Usa VPN o datos móviles.",
      "Urgencia + solicitud de datos = probable estafa. Desconfía siempre.",
      "Los documentos con datos personales van a la trituradora, nunca a la basura.",
      "Los códigos 2FA nunca deben compartirse con nadie.",
      "Si hiciste clic en un enlace sospechoso: cambia tu contraseña y notifica a TI."
    ]
  }
};

/* ── Helper para traduzir conteúdo ── */
CB.tc=function(category, key, fallback){
  if(CB._lang==="pt") return fallback||key;
  var cat=CB.TRANSLATIONS[category];
  if(!cat||!cat[CB._lang]) return fallback||key;
  var val=cat[CB._lang][key];
  return val!==undefined?val:(fallback||key);
};
