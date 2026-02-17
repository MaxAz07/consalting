// Translations
const translations = {
    kk: {
        chatTitle: 'Заңды консалтинг',
        statusText: 'Желіде',
        welcomeMessage: 'Сәлеметсіз бе! Мен Жетысу мемлекеттік университеті бойынша заңды консалтинг чат-ботымын. Сізге қалай көмектесе аламын?',
        quickLabel: 'Жылдам сұрақтар:',
        placeholder: 'Сұрағыңызды жазыңыз...',
        sendText: 'Жіберу',
        disclaimer: 'AI көмекшісі жалпы ақпарат береді. Нақты заңды кеңес алу үшін университеттің заңды бөліміне хабарласыңыз.',
        contactsTitle: 'Байланыс',
        rightsText: 'Барлық құқықтар қорғалған',
        quickQuestions: {
            rights: 'Студенттің құқықтары қандай?',
            apply: 'Университетке қалай түсуге болады?',
            grant: 'Грантқа қалай өтініш беруге болады?',
            leave: 'Академиялық демалыс қалай алуға болады?'
        },
        responses: {
            rights: 'Студент мынадай құқықтарға ие: сапалы білім алу, оқу материалдарына қол жеткізу, академиялық демалыс, басқа ЖОО-ға ауысу, оқудан шығарылғаннан кейін қалпына келтіру, бағаларға шағымдану.',
            apply: 'Оқуға түсу үшін: құжаттарды онлайн немесе қабылдау комиссиясына тапсырыңыз, ҰБТ/КТА тапсырыңыз, аттестат пен медициналық анықтама ұсыныңыз. Қабылдау мерзімі: маусым- тамыз.',
            grant: 'Гранттар ҰБТ нәтижелері бойынша бәсекелестік негізде беріледі. Мемлекеттік грант оқудың толық құнын қамтиды. Сондай-ақ, ұйымдардан мақсатты гранттар бар.',
            leave: 'Академиялық демалыс 1 жылға медициналық көрсеткіштер бойынша, қаржы қиындықтары немесе отбасылық жағдайлар бойынша беріледі. Деканатқа өтініш жазу керек.',
            default: 'Сұрағыңыз үшін рахмет! Нақтырақ кеңес алу үшін университеттің заңды бөліміне хабарласыңыз немесе жай сұрағыңызды нақтырақ сипаттап беріңіз.'
        }
    },
    ru: {
        chatTitle: 'Юридический консалтинг',
        statusText: 'Online',
        welcomeMessage: 'Здравствуйте! Я чат-бот юридического консалтинга Жетысуского государственного университета. Чем могу помочь?',
        quickLabel: 'Быстрые вопросы:',
        placeholder: 'Введите ваш вопрос...',
        sendText: 'Отправить',
        disclaimer: 'AI assistant provides general information. For specific legal advice, please contact the university legal department.',
        contactsTitle: 'Контакты',
        rightsText: 'Все права защищены',
        quickQuestions: {
            rights: 'Какие права у студента?',
            apply: 'Как поступить?',
            grant: 'Как получить грант?',
            leave: 'Академический отпуск'
        },
        responses: {
            rights: 'Студенты имеют право на: качественное образование, доступ к учебным материалам, академический отпуск, перевод в другой вуз, восстановление после отчисления, обжалование оценок.',
            apply: 'Для поступления необходимо: подать документы онлайн или в приёмную комиссию, сдать ЕНТ/КТА, предоставить аттестат и медицинскую справку. Сроки подачи: июнь-август.',
            grant: 'Гранты выделяются на конкурсной основе по результатам ЕНТ. Правительственный грант покрывает полную стоимость обучения. Также доступны целевые гранты от организаций.',
            leave: 'Академический отпуск предоставляется на 1 год по медицинским показаниям, финансовым трудностям или семейным обстоятельствам. Необходимо подать заявление в деканат.',
            default: 'Благодарю за вопрос! Для получения детальной консультации рекомендую обратиться в юридический отдел университета или задать более конкретный вопрос о вашей ситуации.'
        }
    },
    en: {
        chatTitle: 'Legal Consulting',
        statusText: 'Online',
        welcomeMessage: 'Hello! I am the legal consulting chat bot for Zhetysu State University. How can I help you?',
        quickLabel: 'Quick questions:',
        placeholder: 'Type your question...',
        sendText: 'Send',
        disclaimer: 'AI assistant provides general information. For specific legal advice, please contact the university legal department.',
        contactsTitle: 'Contact',
        rightsText: 'All rights reserved',
        quickQuestions: {
            rights: 'What are student rights?',
            apply: 'How to apply?',
            grant: 'How to get a grant?',
            leave: 'Academic leave'
        },
        responses: {
            rights: 'Students have the right to: quality education, access to study materials, academic leave, transfer to another university, reinstatement after expulsion, grade appeals.',
            apply: 'To apply: submit documents online or to the admissions office, pass UNT/CTA, provide a certificate and medical certificate. Application period: June-August.',
            grant: 'Grants are awarded on a competitive basis based on UNT results. Government grant covers full tuition. Targeted grants from organizations are also available.',
            leave: 'Academic leave is granted for 1 year for medical reasons, financial difficulties, or family circumstances. You need to submit an application to the dean\'s office.',
            default: 'Thank you for your question! For detailed consultation, I recommend contacting the university legal department or asking a more specific question about your situation.'
        }
    }
};

// State
let currentLang = 'ru';
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const langBtn = document.getElementById('langBtn');
const langDropdown = document.getElementById('langDropdown');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    updateWelcomeTime();
    setupEventListeners();
});

// Update welcome message time
function updateWelcomeTime() {
    const timeEl = document.getElementById('welcomeTime');
    if (timeEl) {
        timeEl.textContent = getCurrentTime();
    }
}

// Get current time
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Setup event listeners
function setupEventListeners() {
    // Language selector
    langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('active');
    });

    document.addEventListener('click', () => {
        langDropdown.classList.remove('active');
    });

    document.querySelectorAll('.lang-option').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            changeLanguage(lang);
        });
    });

    // Send message
    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Quick question buttons
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.dataset.question;
            const text = btn.textContent;
            sendQuickQuestion(question, text);
        });
    });
}

// Change language
function changeLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];

    // Update language button
    const flags = { kk: '🇰🇿', ru: '🇷🇺', en: '🇬🇧' };
    document.getElementById('currentLang').textContent = lang.toUpperCase();

    // Update texts
    document.getElementById('chatTitle').textContent = t.chatTitle;
    document.getElementById('statusText').textContent = t.statusText;
    document.getElementById('welcomeMessage').textContent = t.welcomeMessage;
    document.getElementById('quickLabel').textContent = t.quickLabel;
    document.getElementById('messageInput').placeholder = t.placeholder;
    document.getElementById('sendText').textContent = t.sendText;
    document.getElementById('disclaimer').textContent = t.disclaimer;
    document.getElementById('contactsTitle').textContent = t.contactsTitle;
    document.getElementById('rightsText').textContent = t.rightsText;

    // Update quick buttons
    document.getElementById('btnRights').textContent = t.quickQuestions.rights;
    document.getElementById('btnApply').textContent = t.quickQuestions.apply;
    document.getElementById('btnGrant').textContent = t.quickQuestions.grant;
    document.getElementById('btnLeave').textContent = t.quickQuestions.leave;

    // Close dropdown
    langDropdown.classList.remove('active');
}

// Send message
function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    addUserMessage(text);
    messageInput.value = '';

    // Show typing indicator
    showTypingIndicator();

    // Generate response
    setTimeout(() => {
        removeTypingIndicator();
        const response = generateResponse(text);
        addBotMessage(response);
    }, 1500);
}

// Send quick question
function sendQuickQuestion(questionKey, questionText) {
    addUserMessage(questionText);
    showTypingIndicator();

    setTimeout(() => {
        removeTypingIndicator();
        const t = translations[currentLang];
        const response = t.responses[questionKey] || t.responses.default;
        addBotMessage(response);
    }, 1500);
}

// Add user message
function addUserMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
            </svg>
        </div>
        <div class="message-content">
            <p>${escapeHtml(text)}</p>
            <span class="message-time">${getCurrentTime()}</span>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

// Add bot message
function addBotMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="10" rx="2"/>
                <circle cx="12" cy="5" r="2"/>
                <path d="M12 7v4"/>
            </svg>
        </div>
        <div class="message-content">
            <p>${escapeHtml(text)}</p>
            <span class="message-time">${getCurrentTime()}</span>
        </div>
    `;
    chatMessages.appendChild(messageDiv);
    scrollToBottom();
}

// Show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="11" width="18" height="10" rx="2"/>
                <circle cx="12" cy="5" r="2"/>
                <path d="M12 7v4"/>
            </svg>
        </div>
        <div class="message-content">
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    chatMessages.appendChild(typingDiv);
    scrollToBottom();
}

// Remove typing indicator
function removeTypingIndicator() {
    const typing = document.getElementById('typingIndicator');
    if (typing) {
        typing.remove();
    }
}

// Scroll to bottom
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Generate response based on input
function generateResponse(input) {
    const t = translations[currentLang];
    const lower = input.toLowerCase();

    // Check for keywords
    if (lower.includes('прав') || lower.includes('құқық') || lower.includes('right')) {
        return t.responses.rights;
    }
    if (lower.includes('поступ') || lower.includes('түс') || lower.includes('apply') || lower.includes('admission')) {
        return t.responses.apply;
    }
    if (lower.includes('грант') || lower.includes('grant')) {
        return t.responses.grant;
    }
    if (lower.includes('отпуск') || lower.includes('демалыс') || lower.includes('leave')) {
        return t.responses.leave;
    }
    if (lower.includes('перевод') || lower.includes('ауысу') || lower.includes('transfer')) {
        return currentLang === 'ru' 
            ? 'Перевод в другой вуз возможен после 1 курса при наличии академической разницы не более 10%. Требуется согласие обоих вузов.'
            : currentLang === 'kk'
            ? 'Басқа ЖОО-ға ауысу 1 курстан кейін академиялық айырма 10%-дан аспаған жағдайда мүмкін. Екі ЖОО-ның келісімі қажет.'
            : 'Transfer to another university is possible after 1st year with academic difference not exceeding 10%. Consent of both universities is required.';
    }
    if (lower.includes('стипендия') || lower.includes('стипендия') || lower.includes('scholarship')) {
        return currentLang === 'ru'
            ? 'Стипендия назначается при отсутствии академических задолженностей и среднем балле не ниже 3.0. Размер зависит от успеваемости: 0.8-1.5 МРП.'
            : currentLang === 'kk'
            ? 'Стипендия академиялық қарыздардың болмаған жағдайында және орта балл 3.0-ден төмен емес болғанда тағайындалады. Мөлшері оқу үлгеріміне байланысты: 0,8-1,5 АЕК.'
            : 'Scholarship is awarded with no academic debts and GPA not lower than 3.0. Amount depends on performance: 0.8-1.5 MCI.';
    }
    if (lower.includes('отчислен') || lower.includes('шығар') || lower.includes('expel')) {
        return currentLang === 'ru'
            ? 'Отчисление возможно по собственному желанию, за академическую неуспеваемость (3 и более неудовлетворительных оценок), нарушение устава. Восстановление возможно в течение 2 лет.'
            : currentLang === 'kk'
            ? 'Оқудан шығару өз еркіңізбен, академиялық үлгерімсіздік үшін (3 және одан көп қанағаттанарлықсыз баға), ережені бұзғаны үшін мүмкін. 2 жыл ішінде қалпына келтіру мүмкін.'
            : 'Expulsion is possible at own request, for academic failure (3 or more unsatisfactory grades), violation of charter. Reinstatement is possible within 2 years.';
    }

    return t.responses.default;
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

async function sendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;

  addUserMessage(text);
  messageInput.value = '';
  showTypingIndicator();

  try {
    const response = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }

    const data = await response.json();
    removeTypingIndicator();
    addBotMessage(data.answer || "Ошибка ответа");
  } catch (e) {
    console.error("Fetch error:", e);
    removeTypingIndicator();
    addBotMessage("Ошибка подключения к серверу");
  }
}

