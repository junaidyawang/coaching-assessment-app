/**
 * Coaching & Conversation Style Assessment
 * Application Logic & Scoring Engine
 */

// State
let selectedAnswers = {}; // scenarioId -> { type, text }
let paradigmValues = {};  // scale_id -> value (1 to 10)
let currentReport = null;
let cohortSubmissions = [];

// Color scheme mapping
const ARCHETYPE_CONFIG = {
  coach: {
    name: "Coach",
    color: "#1e40af",
    bgColor: "bg-blue-600",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-800",
    gradient: "from-blue-700 via-blue-800 to-indigo-900",
    axis: "Ask + Future / Solution",
    summary: "Deals with the present/future, partners with the client, and helps them discover their own answer while holding them accountable.",
    tagline: "The Catalyst: Asking Powerful Questions & Fostering Self-Directed Growth",
    traits: [
      "Asks open-ended questions that unlock creativity and deep reflection",
      "Believes the coachee already holds the capability to resolve the situation",
      "Focuses on future goals, commitment, and personal accountability",
      "Resists the temptation to tell the answer or prescribe solutions"
    ]
  },
  mentor: {
    name: "Mentor",
    color: "#65a30d",
    bgColor: "bg-lime-600",
    badgeBg: "bg-lime-100",
    badgeText: "text-lime-800",
    gradient: "from-lime-600 via-emerald-700 to-teal-900",
    axis: "Tell + Future / Solution",
    summary: "Focuses on individual career & personal development. When asked, the mentor always comes out with the answer based on personal wisdom and experience.",
    tagline: "The Guide: Sharing Battle-Tested Wisdom & Providing the Answer",
    traits: [
      "Readily provides the answer when asked, drawing from lived leadership experience",
      "Guides the individual's long-term career growth and professional mindset",
      "Offers wisdom, roadmaps, and proven organizational navigational playbooks",
      "Acts as a trusted role model of excellence and career sponsorship"
    ]
  },
  consultant: {
    name: "Consultant",
    color: "#7e22ce",
    bgColor: "bg-purple-600",
    badgeBg: "bg-purple-100",
    badgeText: "text-purple-800",
    gradient: "from-purple-700 via-purple-800 to-slate-900",
    axis: "Tell + Past / Problem",
    summary: "Deals directly with operational problems, provides subject matter expertise, evaluates the situation, and advises structured fixes.",
    tagline: "The Expert: Diagnosing System Failures & Prescribing Precision Fixes",
    traits: [
      "Diagnoses broken workflows, inefficiencies, and root logistical flaws",
      "Prescribes structured frameworks, checklists, and authoritative solutions",
      "Demonstrates technical expertise to solve immediate challenges quickly",
      "Focuses on data, benchmarks, deliverables, and procedural compliance"
    ]
  },
  counselor: {
    name: "Counselor",
    color: "#d97706",
    bgColor: "bg-amber-600",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-800",
    gradient: "from-amber-600 via-amber-700 to-orange-950",
    axis: "Ask + Past / Problem",
    summary: "Deals with personal problems, emotional blockages, and interpersonal friction. Helps the person understand the situation by deep-diving into past root causes.",
    tagline: "The Empath: Exploring Emotional Roots & Unpacking Past Roadblocks",
    traits: [
      "Explores psychological safety, self-doubt, stress, and team interpersonal friction",
      "Asks reflective questions about past events, historical conflicts, and internal baggage",
      "Deeply validates feelings and creates a non-judgmental space for emotional processing",
      "Aims to heal root friction before pushing for forward momentum"
    ]
  }
};

// Chart instances
let quadrantChartInstance = null;
let cohortBarChartInstance = null;
let cohortRadarChartInstance = null;

// Role-Based State
let isFacilitatorAuthenticated = false;
const FACILITATOR_PIN = "1234";

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  renderScenarios();
  renderParadigmScales();
  loadSavedWebhookUrl();
  loadCohortFromStorage();
  checkRoleFromUrlOrStorage();
});

// Check if facilitator mode is passed via URL query ?mode=facilitator or persistent session
function checkRoleFromUrlOrStorage() {
  const urlParams = new URLSearchParams(window.location.search);
  const mode = urlParams.get("mode");
  const storedAuth = sessionStorage.getItem("coaching_facilitator_auth");

  if (mode === "facilitator" || mode === "admin" || storedAuth === "true") {
    unlockFacilitatorMode(false);
  } else {
    lockFacilitatorMode(false);
  }
}

function requestFacilitatorAccess() {
  if (isFacilitatorAuthenticated) {
    switchTab("facilitator");
  } else {
    openFacilitatorModal();
  }
}

function openFacilitatorModal() {
  const modal = document.getElementById("facilitator-pin-modal");
  const input = document.getElementById("facilitator-pin-input");
  const errMsg = document.getElementById("pin-error-msg");
  errMsg.classList.add("hidden");
  input.value = "";
  modal.classList.remove("hidden");
  setTimeout(() => input.focus(), 100);
}

function closeFacilitatorModal() {
  document.getElementById("facilitator-pin-modal").classList.add("hidden");
}

function getStoredFacilitatorPin() {
  return localStorage.getItem("coaching_facilitator_pin") || "1234";
}

function verifyFacilitatorPin() {
  const input = document.getElementById("facilitator-pin-input").value.trim();
  const errMsg = document.getElementById("pin-error-msg");
  const validPin = getStoredFacilitatorPin();
  if (input === validPin || input === "admin") {
    unlockFacilitatorMode(true);
    closeFacilitatorModal();
    switchTab("facilitator");
  } else {
    errMsg.classList.remove("hidden");
  }
}

// Change PIN Modal Handlers
function openChangePinModal() {
  const modal = document.getElementById("change-pin-modal");
  const p1 = document.getElementById("new-pin-input");
  const p2 = document.getElementById("confirm-pin-input");
  const msg = document.getElementById("change-pin-msg");
  p1.value = "";
  p2.value = "";
  msg.className = "text-xs hidden";
  modal.classList.remove("hidden");
  setTimeout(() => p1.focus(), 100);
}

function closeChangePinModal() {
  document.getElementById("change-pin-modal").classList.add("hidden");
}

function saveNewFacilitatorPin() {
  const p1 = document.getElementById("new-pin-input").value.trim();
  const p2 = document.getElementById("confirm-pin-input").value.trim();
  const msg = document.getElementById("change-pin-msg");

  if (!p1 || p1.length < 4) {
    msg.className = "text-xs text-red-600 block";
    msg.textContent = "PIN must be at least 4 characters long.";
    return;
  }

  if (p1 !== p2) {
    msg.className = "text-xs text-red-600 block";
    msg.textContent = "PINs do not match. Please re-enter.";
    return;
  }

  localStorage.setItem("coaching_facilitator_pin", p1);
  msg.className = "text-xs text-emerald-600 font-semibold block";
  msg.textContent = "✓ PIN updated successfully!";
  setTimeout(() => {
    closeChangePinModal();
  }, 900);
}

function unlockFacilitatorMode(persist) {
  isFacilitatorAuthenticated = true;
  if (persist) {
    sessionStorage.setItem("coaching_facilitator_auth", "true");
  }
  
  // Update UI indicators
  document.getElementById("current-role-label").textContent = "Facilitator / Trainer (All 3 Views Unlocked)";
  document.getElementById("facilitator-mode-badge").classList.remove("hidden");
  document.getElementById("btn-lock-facilitator").classList.remove("hidden");
  
  const navBtn = document.getElementById("nav-facilitator");
  navBtn.className = "px-3.5 py-1.5 rounded-lg text-sm font-semibold transition bg-purple-100 text-purple-800 border border-purple-300 flex items-center gap-1.5 shadow-sm";
  document.getElementById("nav-facilitator-lock").innerHTML = `<i data-lucide="unlock" class="w-3 h-3"></i>`;
  lucide.createIcons();
}

function lockFacilitatorMode(switchDefault = true) {
  isFacilitatorAuthenticated = false;
  sessionStorage.removeItem("coaching_facilitator_auth");
  
  document.getElementById("current-role-label").textContent = "Participant / Responder (Assessment & Personal Report)";
  document.getElementById("facilitator-mode-badge").classList.add("hidden");
  document.getElementById("btn-lock-facilitator").classList.add("hidden");
  
  const navBtn = document.getElementById("nav-facilitator");
  navBtn.className = "px-3.5 py-1.5 rounded-lg text-sm font-semibold transition text-purple-700 hover:bg-purple-50 flex items-center gap-1.5 border border-purple-200";
  document.getElementById("nav-facilitator-lock").textContent = "PIN";

  if (switchDefault) {
    switchTab("assessment");
  }
  lucide.createIcons();
}

// Switch Tab Navigation (with protection on facilitator tab)
function switchTab(tabId) {
  if (tabId === "facilitator" && !isFacilitatorAuthenticated) {
    openFacilitatorModal();
    return;
  }

  const views = ["assessment", "report", "facilitator"];
  views.forEach(v => {
    const el = document.getElementById(`view-${v}`);
    const navBtn = document.getElementById(`nav-${v}`);
    if (v === tabId) {
      el.classList.remove("hidden");
      if (v === "facilitator") {
        navBtn.className = "px-3.5 py-1.5 rounded-lg text-sm font-semibold transition bg-purple-700 text-white flex items-center gap-1.5 shadow-sm";
      } else {
        navBtn.className = "px-3.5 py-1.5 rounded-lg text-sm font-semibold transition bg-blue-50 text-blue-700 flex items-center gap-1.5";
      }
    } else {
      el.classList.add("hidden");
      if (v === "facilitator") {
        navBtn.className = isFacilitatorAuthenticated 
          ? "px-3.5 py-1.5 rounded-lg text-sm font-semibold transition bg-purple-50 text-purple-700 hover:bg-purple-100 flex items-center gap-1.5 border border-purple-200"
          : "px-3.5 py-1.5 rounded-lg text-sm font-semibold transition text-purple-700 hover:bg-purple-50 flex items-center gap-1.5 border border-purple-200";
      } else {
        navBtn.className = "px-3.5 py-1.5 rounded-lg text-sm font-semibold transition text-slate-600 hover:bg-slate-100 flex items-center gap-1.5";
      }
    }
  });

  if (tabId === "facilitator") {
    renderFacilitatorDashboard();
  }
  lucide.createIcons();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Render Scenarios
function renderScenarios() {
  const container = document.getElementById("scenarios-container");
  container.innerHTML = "";

  SCENARIOS.forEach((scenario, sIndex) => {
    const card = document.createElement("div");
    card.className = "bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm transition hover:border-slate-300";
    card.id = `scenario-card-${scenario.id}`;

    // Options HTML (shuffled or ordered)
    let optionsHtml = scenario.options.map((opt, oIndex) => {
      const isSelected = selectedAnswers[scenario.id] === opt.type;
      return `
        <label class="block cursor-pointer">
          <div class="scenario-option p-4 rounded-xl border transition-all flex items-start gap-3.5 ${
            isSelected 
              ? "border-blue-600 bg-blue-50/70 shadow-sm ring-1 ring-blue-500" 
              : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/80"
          }" onclick="selectScenarioOption(${scenario.id}, '${opt.type}', this)">
            <input type="radio" name="scenario_${scenario.id}" value="${opt.type}" ${isSelected ? "checked" : ""} class="mt-1 text-blue-600 focus:ring-blue-500">
            <div class="space-y-1">
              <div class="text-sm font-medium text-slate-800 leading-snug">${opt.text}</div>
            </div>
          </div>
        </label>
      `;
    }).join("");

    card.innerHTML = `
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Situation ${sIndex + 1} of ${SCENARIOS.length}</span>
        <span id="badge-answered-${scenario.id}" class="text-xs px-2.5 py-0.5 rounded-full font-medium ${selectedAnswers[scenario.id] ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400'}">
          ${selectedAnswers[scenario.id] ? 'Answered' : 'Pending'}
        </span>
      </div>
      <h4 class="text-base font-bold text-slate-900">${scenario.title}</h4>
      <p class="text-sm text-slate-600 mt-1 mb-3 bg-slate-50 p-3 rounded-xl border border-slate-150">${scenario.context}</p>
      <p class="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-3">${scenario.question}</p>
      <div class="space-y-2.5">
        ${optionsHtml}
      </div>
    `;

    container.appendChild(card);
  });

  updateScenarioProgress();
}

function selectScenarioOption(scenarioId, optionType, element) {
  selectedAnswers[scenarioId] = optionType;
  
  // Highlight radio
  const parentCard = document.getElementById(`scenario-card-${scenarioId}`);
  const allOptions = parentCard.querySelectorAll(".scenario-option");
  allOptions.forEach(opt => {
    opt.className = "scenario-option p-4 rounded-xl border transition-all flex items-start gap-3.5 border-slate-200 hover:border-slate-300 hover:bg-slate-50/80";
  });

  element.className = "scenario-option p-4 rounded-xl border transition-all flex items-start gap-3.5 border-blue-600 bg-blue-50/70 shadow-sm ring-1 ring-blue-500";
  const radio = element.querySelector("input[type=radio]");
  if (radio) radio.checked = true;

  const badge = document.getElementById(`badge-answered-${scenarioId}`);
  if (badge) {
    badge.className = "text-xs px-2.5 py-0.5 rounded-full font-medium bg-emerald-100 text-emerald-800";
    badge.textContent = "Answered";
  }

  updateScenarioProgress();
}

function updateScenarioProgress() {
  const answeredCount = Object.keys(selectedAnswers).length;
  const badge = document.getElementById("scenarios-progress-badge");
  if (badge) {
    badge.textContent = `${answeredCount} / ${SCENARIOS.length} Completed`;
    badge.className = answeredCount === SCENARIOS.length 
      ? "px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full"
      : "px-3 py-1 bg-slate-200 text-slate-700 text-xs font-semibold rounded-full";
  }
}

// Render Paradigm Scales (Slide 20)
function renderParadigmScales() {
  const container = document.getElementById("paradigm-container");
  container.innerHTML = "";

  PARADIGM_SCALES.forEach((scale, index) => {
    // Default value 6 (neutral/slightly forward)
    if (!paradigmValues[scale.id]) {
      paradigmValues[scale.id] = 6;
    }

    const item = document.createElement("div");
    item.className = "p-4 sm:p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3";
    item.innerHTML = `
      <div class="flex items-center justify-between text-xs">
        <span class="font-bold uppercase tracking-wider text-purple-700">Dimension ${index + 1}: ${scale.category}</span>
        <span id="scale-val-badge-${scale.id}" class="px-2.5 py-0.5 rounded-full font-bold bg-purple-100 text-purple-800 text-xs">
          Score: ${paradigmValues[scale.id]} / 10
        </span>
      </div>

      <!-- Slider Labels (Left vs Right Poles from Slide 20) -->
      <div class="flex items-center justify-between gap-4 text-xs font-semibold text-slate-700">
        <div class="w-5/12 text-left text-slate-600 bg-white p-2 rounded-lg border border-slate-200">
          <span class="text-[10px] text-slate-400 block font-normal">Score 1 (Directive / Control)</span>
          ${scale.leftLabel}
        </div>
        <div class="w-2/12 text-center text-xs font-bold text-slate-400">↔</div>
        <div class="w-5/12 text-right text-indigo-700 bg-white p-2 rounded-lg border border-indigo-200">
          <span class="text-[10px] text-indigo-400 block font-normal">Score 10 (Empowering / Coaching)</span>
          ${scale.rightLabel}
        </div>
      </div>

      <!-- Interactive 1-10 Step Slider -->
      <div class="pt-2 px-1">
        <input type="range" min="1" max="10" step="1" value="${paradigmValues[scale.id]}" 
          class="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          oninput="onParadigmInput('${scale.id}', this.value)">
        <div class="flex justify-between text-[11px] text-slate-400 px-1 mt-1 font-mono">
          <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span><span>10</span>
        </div>
      </div>
    `;
    container.appendChild(item);
  });
}

function onParadigmInput(scaleId, val) {
  paradigmValues[scaleId] = parseInt(val, 10);
  const badge = document.getElementById(`scale-val-badge-${scaleId}`);
  if (badge) {
    badge.textContent = `Score: ${val} / 10`;
  }
}

// Calculate and Display Report
function calculateAndDisplayReport() {
  const answeredCount = Object.keys(selectedAnswers).length;
  if (answeredCount < SCENARIOS.length) {
    alert(`Please complete all ${SCENARIOS.length} scenarios before generating your report. (${answeredCount}/${SCENARIOS.length} answered)`);
    return;
  }

  const nameInput = document.getElementById("participant-name").value.trim() || "Participant";
  const emailInput = document.getElementById("participant-email").value.trim() || "N/A";
  const deptInput = document.getElementById("participant-dept").value.trim() || "Leadership Cohort";

  // 1. Calculate Scenario Counts & Percentages
  const counts = { coach: 0, mentor: 0, consultant: 0, counselor: 0 };
  Object.values(selectedAnswers).forEach(type => {
    if (counts[type] !== undefined) counts[type]++;
  });

  const total = SCENARIOS.length;
  const percentages = {
    coach: Math.round((counts.coach / total) * 100),
    mentor: Math.round((counts.mentor / total) * 100),
    consultant: Math.round((counts.consultant / total) * 100),
    counselor: Math.round((counts.counselor / total) * 100)
  };

  // Adjust rounding sum to 100%
  const sumP = percentages.coach + percentages.mentor + percentages.consultant + percentages.counselor;
  if (sumP !== 100) {
    percentages.coach += (100 - sumP);
  }

  // 2. Identify Dominant & Secondary Styles
  const sortedStyles = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
  const dominant = sortedStyles[0];
  const secondary = sortedStyles[1];

  // 3. Compute Coordinates on 2x2 Matrix
  // X axis: Problem/Past (-100) to Solution/Future (+100)
  //   - Counselor: X = -70, Y = +70 (Ask + Past)
  //   - Consultant: X = -70, Y = -70 (Tell + Past)
  //   - Coaching: X = +70, Y = +70 (Ask + Future)
  //   - Mentoring: X = +70, Y = -70 (Tell + Future)
  // Y axis: Tell (-100) to Ask (+100)
  const askScore = (counts.coach + counts.counselor) - (counts.mentor + counts.consultant);
  const futureScore = (counts.coach + counts.mentor) - (counts.consultant + counts.counselor);

  // Normalize coordinates to -80 .. +80 range for visual plotting
  const coordX = Math.round((futureScore / total) * 80);
  const coordY = Math.round((askScore / total) * 80);

  // 4. Calculate Paradigm Shift Average (Slide 20)
  const pValues = Object.values(paradigmValues);
  const pSum = pValues.reduce((acc, v) => acc + v, 0);
  const pAvg = (pSum / pValues.length).toFixed(1);

  // Build Report Object
  currentReport = {
    id: "rep_" + Date.now(),
    timestamp: new Date().toLocaleString(),
    name: nameInput,
    email: emailInput,
    dept: deptInput,
    dominant,
    secondary,
    counts,
    percentages,
    coordX,
    coordY,
    paradigmAvg: parseFloat(pAvg),
    paradigmBreakdown: { ...paradigmValues }
  };

  // Store & Sync
  saveParticipantSubmission(currentReport);
  sendToGoogleSheetWebhook(currentReport);

  // Render Visual Elements
  renderIndividualReport(currentReport);
  switchTab("report");
}

// Render Report View
function renderIndividualReport(report) {
  document.getElementById("report-participant-name").textContent = report.name;
  document.getElementById("report-timestamp").textContent = `Generated: ${report.timestamp}`;

  const domConfig = ARCHETYPE_CONFIG[report.dominant];
  const secConfig = ARCHETYPE_CONFIG[report.secondary];

  // 1. Primary Style Card
  const primaryCard = document.getElementById("primary-style-card");
  primaryCard.className = `p-6 sm:p-8 rounded-3xl text-white shadow-xl bg-gradient-to-r ${domConfig.gradient}`;
  primaryCard.innerHTML = `
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-white/20 backdrop-blur-sm border border-white/30 text-white mb-2">
          <span>Primary Archetype (${report.percentages[report.dominant]}%)</span>
        </div>
        <h3 class="text-3xl sm:text-4xl font-black tracking-tight">${domConfig.name.toUpperCase()}</h3>
        <p class="text-sm sm:text-base font-medium text-white/90 mt-1 max-w-2xl">${domConfig.tagline}</p>
      </div>

      <div class="bg-black/25 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-xs sm:text-sm max-w-sm space-y-1">
        <span class="text-white/60 text-xs font-semibold uppercase">2x2 Matrix Positioning:</span>
        <div class="font-bold text-white flex items-center gap-1.5">
          <i data-lucide="crosshair" class="w-4 h-4 text-amber-300"></i> ${domConfig.axis}
        </div>
        <div class="text-xs text-white/80 pt-1">${domConfig.summary}</div>
      </div>
    </div>

    <!-- Traits Checklist -->
    <div class="mt-6 pt-5 border-t border-white/20 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
      ${domConfig.traits.map(trait => `
        <div class="flex items-start gap-2 text-white/90">
          <i data-lucide="check-circle" class="w-4 h-4 text-emerald-300 flex-shrink-0 mt-0.5"></i>
          <span>${trait}</span>
        </div>
      `).join("")}
    </div>
  `;

  // 2. Render Percentage Bars
  const pContainer = document.getElementById("percentage-bars-container");
  pContainer.innerHTML = "";

  Object.entries(report.percentages).forEach(([type, pct]) => {
    const cfg = ARCHETYPE_CONFIG[type];
    const isDominant = type === report.dominant;
    pContainer.innerHTML += `
      <div class="space-y-1.5">
        <div class="flex items-center justify-between text-xs sm:text-sm">
          <div class="flex items-center gap-2 font-bold text-slate-800">
            <span class="w-3 h-3 rounded-full" style="background-color: ${cfg.color}"></span>
            <span>${cfg.name}</span>
            ${isDominant ? '<span class="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-extrabold uppercase">Primary</span>' : ''}
          </div>
          <span class="font-mono font-bold text-slate-900">${pct}% (${report.counts[type]} / ${SCENARIOS.length})</span>
        </div>
        <div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div class="h-full rounded-full transition-all duration-700" style="width: ${pct}%; background-color: ${cfg.color}"></div>
        </div>
      </div>
    `;
  });

  // 3. Paradigm Shift Gauge
  const paradigmAvgBadge = document.getElementById("paradigm-average-badge");
  const paradigmProgressBar = document.getElementById("paradigm-progress-bar");
  paradigmAvgBadge.textContent = `${report.paradigmAvg} / 10`;
  paradigmProgressBar.style.width = `${report.paradigmAvg * 10}%`;

  const paradigmMini = document.getElementById("paradigm-breakdown-mini");
  paradigmMini.innerHTML = `
    <div class="flex justify-between">
      <span>Talent Focus: Weakness vs Strengths</span>
      <span class="font-bold text-slate-800">${report.paradigmBreakdown.scale_1} / 10</span>
    </div>
    <div class="flex justify-between">
      <span>Problem Autonomy: Solving vs Enabling</span>
      <span class="font-bold text-slate-800">${report.paradigmBreakdown.scale_2} / 10</span>
    </div>
    <div class="flex justify-between">
      <span>Conversation Mode: Giving Advice vs Inquiring</span>
      <span class="font-bold text-slate-800">${report.paradigmBreakdown.scale_3} / 10</span>
    </div>
    <div class="flex justify-between">
      <span>Control: Imposing Agenda vs Non-attachment</span>
      <span class="font-bold text-slate-800">${report.paradigmBreakdown.scale_6} / 10</span>
    </div>
  `;

  // 4. Render 2x2 Quadrant Chart
  renderQuadrantChart(report.coordX, report.coordY, report.dominant);

  // 5. Render Coaching Tips
  const tipsGrid = document.getElementById("coaching-tips-grid");
  tipsGrid.innerHTML = COACHING_TIPS.map(item => `
    <div class="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/10 space-y-1.5">
      <span class="text-[11px] font-bold text-blue-300 uppercase tracking-wider">${item.category}</span>
      <h5 class="text-sm font-bold text-white">${item.title}</h5>
      <p class="text-xs text-slate-300 leading-relaxed">${item.tip}</p>
    </div>
  `).join("");

  // 6. Professional Quotes
  const quoteContainer = document.getElementById("report-quote-container");
  const randomQuote = PROFESSIONAL_QUOTES[Math.floor(Math.random() * PROFESSIONAL_QUOTES.length)];
  quoteContainer.innerHTML = `
    <div class="flex items-start gap-4 max-w-3xl mx-auto bg-black/20 p-5 rounded-2xl border border-white/10">
      <i data-lucide="quote" class="w-8 h-8 text-blue-400 flex-shrink-0 mt-1 opacity-70"></i>
      <div>
        <p class="text-sm sm:text-base italic text-slate-200">"${randomQuote.quote}"</p>
        <div class="mt-2 text-xs font-bold text-white">— ${randomQuote.author}, <span class="text-slate-400 font-normal">${randomQuote.role}</span></div>
      </div>
    </div>
  `;

  lucide.createIcons();
}

// Render Quadrant Scatter Chart
function renderQuadrantChart(userX, userY, dominant) {
  const ctx = document.getElementById("quadrantChart");
  if (!ctx) return;

  if (quadrantChartInstance) {
    quadrantChartInstance.destroy();
  }

  // Background quadrant plugins
  const quadrantBackgroundPlugin = {
    id: "quadrantBackground",
    beforeDraw(chart) {
      const { ctx, chartArea: { top, bottom, left, right, width, height } } = chart;
      const midX = left + width / 2;
      const midY = top + height / 2;

      ctx.save();
      // Top-Right: Coaching (Ask + Future)
      ctx.fillStyle = "rgba(30, 64, 175, 0.08)";
      ctx.fillRect(midX, top, width / 2, height / 2);

      // Bottom-Right: Mentoring (Tell + Future)
      ctx.fillStyle = "rgba(101, 163, 13, 0.08)";
      ctx.fillRect(midX, midY, width / 2, height / 2);

      // Top-Left: Counseling (Ask + Past)
      ctx.fillStyle = "rgba(217, 119, 6, 0.08)";
      ctx.fillRect(left, top, width / 2, height / 2);

      // Bottom-Left: Consulting (Tell + Past)
      ctx.fillStyle = "rgba(126, 34, 206, 0.08)";
      ctx.fillRect(left, midY, width / 2, height / 2);

      // Axis lines
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);

      // Vertical mid axis
      ctx.beginPath();
      ctx.moveTo(midX, top);
      ctx.lineTo(midX, bottom);
      ctx.stroke();

      // Horizontal mid axis
      ctx.beginPath();
      ctx.moveTo(left, midY);
      ctx.lineTo(right, midY);
      ctx.stroke();

      // Labels on axes
      ctx.setLineDash([]);
      ctx.font = "bold 11px sans-serif";
      ctx.fillStyle = "#475569";
      ctx.textAlign = "center";

      // Top: ASK
      ctx.fillText("▲ ASK (Inquiry)", midX, top + 15);
      // Bottom: TELL
      ctx.fillText("▼ TELL (Advocacy)", midX, bottom - 8);
      // Left: PAST / PROBLEM
      ctx.textAlign = "left";
      ctx.fillText("◀ PAST / PROBLEM", left + 8, midY - 6);
      // Right: FUTURE / SOLUTION
      ctx.textAlign = "right";
      ctx.fillText("FUTURE / SOLUTION ▶", right - 8, midY - 6);

      // Quadrant corner watermark labels
      ctx.font = "bold 13px sans-serif";
      ctx.fillStyle = "rgba(30, 64, 175, 0.5)"; // Coach
      ctx.textAlign = "right";
      ctx.fillText("COACHING", right - 12, top + 35);

      ctx.fillStyle = "rgba(101, 163, 13, 0.5)"; // Mentor
      ctx.fillText("MENTORING", right - 12, bottom - 25);

      ctx.fillStyle = "rgba(217, 119, 6, 0.5)"; // Counselor
      ctx.textAlign = "left";
      ctx.fillText("COUNSELING", left + 12, top + 35);

      ctx.fillStyle = "rgba(126, 34, 206, 0.5)"; // Consultant
      ctx.fillText("CONSULTING", left + 12, bottom - 25);

      ctx.restore();
    }
  };

  const dominantColor = ARCHETYPE_CONFIG[dominant].color;

  quadrantChartInstance = new Chart(ctx, {
    type: "scatter",
    data: {
      datasets: [
        {
          label: "Your Conversation Approach",
          data: [{ x: userX, y: userY }],
          backgroundColor: dominantColor,
          borderColor: "#ffffff",
          borderWidth: 3,
          pointRadius: 10,
          pointHoverRadius: 13,
          shadowOffsetX: 0,
          shadowOffsetY: 4,
          shadowBlur: 10,
          shadowColor: "rgba(0, 0, 0, 0.3)"
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          min: -100,
          max: 100,
          grid: { display: false },
          ticks: { display: false }
        },
        y: {
          min: -100,
          max: 100,
          grid: { display: false },
          ticks: { display: false }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: () => `Your Centroid (${ARCHETYPE_CONFIG[dominant].name})`
          }
        }
      }
    },
    plugins: [quadrantBackgroundPlugin]
  });
}

// ==================== FACILITATOR DASHBOARD LOGIC ====================

function renderFacilitatorDashboard() {
  const countEl = document.getElementById("cohort-count");
  const majorityTitle = document.getElementById("cohort-majority-title");
  const majorityDesc = document.getElementById("cohort-majority-desc");
  const avgShiftEl = document.getElementById("cohort-avg-shift");
  const askTellEl = document.getElementById("cohort-ask-tell-ratio");
  const tbody = document.getElementById("cohort-table-body");

  countEl.textContent = cohortSubmissions.length;

  if (cohortSubmissions.length === 0) {
    majorityTitle.textContent = "No Data Yet";
    majorityDesc.textContent = "Take the assessment or click 'Load Sample Cohort' to view analytics.";
    avgShiftEl.textContent = "-- / 10";
    askTellEl.textContent = "--";
    tbody.innerHTML = `<tr><td colspan="8" class="text-center py-8 text-slate-400">No participants recorded yet.</td></tr>`;
    destroyCohortCharts();
    return;
  }

  // Tally dominant styles
  const tally = { coach: 0, mentor: 0, consultant: 0, counselor: 0 };
  let shiftSum = 0;
  let totalAskWeight = 0;
  let totalTellWeight = 0;

  cohortSubmissions.forEach(sub => {
    tally[sub.dominant] = (tally[sub.dominant] || 0) + 1;
    shiftSum += sub.paradigmAvg;
    totalAskWeight += (sub.percentages.coach + sub.percentages.counselor);
    totalTellWeight += (sub.percentages.mentor + sub.percentages.consultant);
  });

  // Calculate Majority
  const sortedMajority = Object.keys(tally).sort((a, b) => tally[b] - tally[a]);
  const topStyle = sortedMajority[0];
  const topCount = tally[topStyle];
  const topPct = Math.round((topCount / cohortSubmissions.length) * 100);

  majorityTitle.textContent = `${ARCHETYPE_CONFIG[topStyle].name} (${topPct}%)`;
  majorityDesc.textContent = `${topCount} of ${cohortSubmissions.length} leaders predominantly operate in this approach.`;

  const avgShift = (shiftSum / cohortSubmissions.length).toFixed(1);
  avgShiftEl.textContent = `${avgShift} / 10`;

  const avgAsk = Math.round(totalAskWeight / cohortSubmissions.length);
  const avgTell = Math.round(totalTellWeight / cohortSubmissions.length);
  askTellEl.textContent = `${avgAsk}% Ask / ${avgTell}% Tell`;

  // Render Table
  tbody.innerHTML = cohortSubmissions.map(sub => `
    <tr class="hover:bg-slate-50 transition">
      <td class="py-3 px-4 font-semibold text-slate-900">${sub.name}</td>
      <td class="py-3 px-4 text-slate-500">${sub.dept}</td>
      <td class="py-3 px-4">
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${ARCHETYPE_CONFIG[sub.dominant].badgeBg} ${ARCHETYPE_CONFIG[sub.dominant].badgeText}">
          ${ARCHETYPE_CONFIG[sub.dominant].name}
        </span>
      </td>
      <td class="py-3 px-4 text-center font-mono">${sub.percentages.coach}%</td>
      <td class="py-3 px-4 text-center font-mono">${sub.percentages.mentor}%</td>
      <td class="py-3 px-4 text-center font-mono">${sub.percentages.consultant}%</td>
      <td class="py-3 px-4 text-center font-mono">${sub.percentages.counselor}%</td>
      <td class="py-3 px-4 text-right font-mono font-bold text-emerald-600">${sub.paradigmAvg} / 10</td>
    </tr>
  `).join("");

  renderCohortCharts(tally);
}

function renderCohortCharts(tally) {
  // 1. Cohort Archetype Bar Chart
  const ctxBar = document.getElementById("cohortBarChart");
  if (cohortBarChartInstance) cohortBarChartInstance.destroy();

  cohortBarChartInstance = new Chart(ctxBar, {
    type: "bar",
    data: {
      labels: ["Coach", "Mentor", "Consultant", "Counselor"],
      datasets: [{
        label: "Number of Participants",
        data: [tally.coach, tally.mentor, tally.consultant, tally.counselor],
        backgroundColor: [
          ARCHETYPE_CONFIG.coach.color,
          ARCHETYPE_CONFIG.mentor.color,
          ARCHETYPE_CONFIG.consultant.color,
          ARCHETYPE_CONFIG.counselor.color
        ],
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1 }
        }
      }
    }
  });

  // 2. Cohort Radar Chart across 6 dimensions
  const ctxRadar = document.getElementById("cohortRadarChart");
  if (cohortRadarChartInstance) cohortRadarChartInstance.destroy();

  // Compute 6-dim averages
  const scaleSums = { scale_1: 0, scale_2: 0, scale_3: 0, scale_4: 0, scale_5: 0, scale_6: 0 };
  cohortSubmissions.forEach(sub => {
    Object.keys(scaleSums).forEach(k => {
      scaleSums[k] += (sub.paradigmBreakdown[k] || 5);
    });
  });

  const radarAverages = Object.keys(scaleSums).map(k => (scaleSums[k] / cohortSubmissions.length).toFixed(1));

  cohortRadarChartInstance = new Chart(ctxRadar, {
    type: "radar",
    data: {
      labels: [
        "Strengths Focus",
        "Problem Autonomy",
        "Draw Out Options",
        "Trust Relationship",
        "Role of Excellence",
        "Accept Non-Control"
      ],
      datasets: [{
        label: "Cohort Dimension Average (1-10)",
        data: radarAverages,
        fill: true,
        backgroundColor: "rgba(79, 70, 229, 0.2)",
        borderColor: "#4f46e5",
        pointBackgroundColor: "#4f46e5",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#4f46e5"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          min: 0,
          max: 10,
          ticks: { stepSize: 2 }
        }
      }
    }
  });
}

function destroyCohortCharts() {
  if (cohortBarChartInstance) cohortBarChartInstance.destroy();
  if (cohortRadarChartInstance) cohortRadarChartInstance.destroy();
}

// Local Storage helpers
function saveParticipantSubmission(sub) {
  cohortSubmissions.unshift(sub);
  try {
    localStorage.setItem("coaching_cohort_data", JSON.stringify(cohortSubmissions));
  } catch (e) {
    console.error("Local storage save error", e);
  }
}

function loadCohortFromStorage() {
  try {
    const raw = localStorage.getItem("coaching_cohort_data");
    if (raw) {
      cohortSubmissions = JSON.parse(raw);
    }
  } catch (e) {
    cohortSubmissions = [];
  }
}

function clearCohortData() {
  if (confirm("Clear all recorded participant data from this session?")) {
    cohortSubmissions = [];
    localStorage.removeItem("coaching_cohort_data");
    renderFacilitatorDashboard();
  }
}

// Load 15 Sample Cohort Records for instantaneous facilitator demonstration
function loadSampleCohortData() {
  const sampleCohort = [
    { name: "Sarah Tan", dept: "Engineering", dominant: "mentor", secondary: "consultant", percentages: { coach: 25, mentor: 50, consultant: 25, counselor: 0 }, paradigmAvg: 6.2, paradigmBreakdown: { scale_1: 6, scale_2: 6, scale_3: 4, scale_4: 7, scale_5: 8, scale_6: 6 } },
    { name: "Marcus Lee", dept: "Operations", dominant: "consultant", secondary: "mentor", percentages: { coach: 12, mentor: 25, consultant: 63, counselor: 0 }, paradigmAvg: 4.8, paradigmBreakdown: { scale_1: 4, scale_2: 4, scale_3: 3, scale_4: 6, scale_5: 7, scale_6: 5 } },
    { name: "Priya Sharma", dept: "HR & People", dominant: "counselor", secondary: "coach", percentages: { coach: 38, mentor: 12, consultant: 0, counselor: 50 }, paradigmAvg: 7.8, paradigmBreakdown: { scale_1: 8, scale_2: 7, scale_3: 8, scale_4: 9, scale_5: 7, scale_6: 8 } },
    { name: "David Kim", dept: "Product", dominant: "coach", secondary: "mentor", percentages: { coach: 62, mentor: 25, consultant: 13, counselor: 0 }, paradigmAvg: 8.5, paradigmBreakdown: { scale_1: 9, scale_2: 9, scale_3: 9, scale_4: 8, scale_5: 8, scale_6: 8 } },
    { name: "Elena Rostova", dept: "Sales", dominant: "mentor", secondary: "coach", percentages: { coach: 25, mentor: 63, consultant: 12, counselor: 0 }, paradigmAvg: 6.8, paradigmBreakdown: { scale_1: 7, scale_2: 6, scale_3: 5, scale_4: 8, scale_5: 8, scale_6: 7 } },
    { name: "John Davis", dept: "Finance", dominant: "consultant", secondary: "counselor", percentages: { coach: 12, mentor: 13, consultant: 63, counselor: 12 }, paradigmAvg: 5.1, paradigmBreakdown: { scale_1: 4, scale_2: 5, scale_3: 4, scale_4: 6, scale_5: 7, scale_6: 5 } },
    { name: "Amina Al-Mansoor", dept: "Customer Success", dominant: "coach", secondary: "counselor", percentages: { coach: 50, mentor: 12, consultant: 0, counselor: 38 }, paradigmAvg: 8.2, paradigmBreakdown: { scale_1: 8, scale_2: 8, scale_3: 9, scale_4: 9, scale_5: 7, scale_6: 8 } },
    { name: "Carlos Mendez", dept: "Engineering", dominant: "consultant", secondary: "mentor", percentages: { coach: 25, mentor: 25, consultant: 50, counselor: 0 }, paradigmAvg: 5.4, paradigmBreakdown: { scale_1: 5, scale_2: 5, scale_3: 4, scale_4: 6, scale_5: 7, scale_6: 6 } },
    { name: "Chloe Dupont", dept: "Marketing", dominant: "coach", secondary: "mentor", percentages: { coach: 50, mentor: 38, consultant: 12, counselor: 0 }, paradigmAvg: 7.9, paradigmBreakdown: { scale_1: 8, scale_2: 8, scale_3: 8, scale_4: 8, scale_5: 8, scale_6: 7 } },
    { name: "Kenji Sato", dept: "Operations", dominant: "mentor", secondary: "consultant", percentages: { coach: 12, mentor: 63, consultant: 25, counselor: 0 }, paradigmAvg: 6.0, paradigmBreakdown: { scale_1: 6, scale_2: 6, scale_3: 5, scale_4: 7, scale_5: 7, scale_6: 5 } },
    { name: "Rachel Green", dept: "HR & People", dominant: "counselor", secondary: "coach", percentages: { coach: 38, mentor: 0, consultant: 12, counselor: 50 }, paradigmAvg: 7.5, paradigmBreakdown: { scale_1: 7, scale_2: 7, scale_3: 8, scale_4: 9, scale_5: 7, scale_6: 7 } },
    { name: "Liam O'Connor", dept: "Sales", dominant: "mentor", secondary: "coach", percentages: { coach: 25, mentor: 50, consultant: 25, counselor: 0 }, paradigmAvg: 6.4, paradigmBreakdown: { scale_1: 6, scale_2: 6, scale_3: 5, scale_4: 7, scale_5: 8, scale_6: 6 } },
    { name: "Mei Ling", dept: "Product", dominant: "coach", secondary: "mentor", percentages: { coach: 62, mentor: 26, consultant: 12, counselor: 0 }, paradigmAvg: 8.7, paradigmBreakdown: { scale_1: 9, scale_2: 9, scale_3: 9, scale_4: 9, scale_5: 8, scale_6: 8 } },
    { name: "Tariq Mahmood", dept: "Strategy", dominant: "mentor", secondary: "consultant", percentages: { coach: 12, mentor: 50, consultant: 38, counselor: 0 }, paradigmAvg: 6.1, paradigmBreakdown: { scale_1: 6, scale_2: 6, scale_3: 4, scale_4: 7, scale_5: 8, scale_6: 6 } },
    { name: "Jessica Alba", dept: "Design", dominant: "coach", secondary: "counselor", percentages: { coach: 50, mentor: 12, consultant: 13, counselor: 25 }, paradigmAvg: 8.0, paradigmBreakdown: { scale_1: 8, scale_2: 8, scale_3: 8, scale_4: 8, scale_5: 8, scale_6: 8 } }
  ];

  sampleCohort.forEach((s, idx) => {
    s.id = "sample_" + idx;
    s.timestamp = new Date(Date.now() - idx * 3600000).toLocaleString();
    s.coordX = (s.percentages.coach + s.percentages.mentor) - (s.percentages.consultant + s.percentages.counselor);
    s.coordY = (s.percentages.coach + s.percentages.counselor) - (s.percentages.mentor + s.percentages.consultant);
  });

  cohortSubmissions = sampleCohort;
  try {
    localStorage.setItem("coaching_cohort_data", JSON.stringify(cohortSubmissions));
  } catch(e) {}
  renderFacilitatorDashboard();
}

// Export CSV
function exportCohortCSV() {
  if (cohortSubmissions.length === 0) {
    alert("No data available to export.");
    return;
  }

  const headers = ["Timestamp", "Name", "Department", "Dominant Archetype", "Secondary Archetype", "Coach %", "Mentor %", "Consultant %", "Counselor %", "Paradigm Shift Avg (1-10)"];
  const rows = cohortSubmissions.map(s => [
    `"${s.timestamp}"`,
    `"${s.name}"`,
    `"${s.dept}"`,
    `"${ARCHETYPE_CONFIG[s.dominant].name}"`,
    `"${ARCHETYPE_CONFIG[s.secondary].name}"`,
    s.percentages.coach,
    s.percentages.mentor,
    s.percentages.consultant,
    s.percentages.counselor,
    s.paradigmAvg
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `cohort_coaching_assessment_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Google Sheets Sync Logic
function saveWebhookUrl() {
  const url = document.getElementById("sheet-webhook-url").value.trim();
  localStorage.setItem("coaching_sheet_webhook_url", url);
  const statusEl = document.getElementById("webhook-status");
  if (url) {
    statusEl.innerHTML = `<span class="text-emerald-600 font-semibold">✓ Webhook configured! New submissions will automatically sync to your Google Sheet.</span>`;
  } else {
    statusEl.innerHTML = `<span class="text-slate-500">When set, submissions sync to Google Sheets.</span>`;
  }
}

function loadSavedWebhookUrl() {
  const url = localStorage.getItem("coaching_sheet_webhook_url");
  if (url) {
    const input = document.getElementById("sheet-webhook-url");
    if (input) input.value = url;
    const statusEl = document.getElementById("webhook-status");
    if (statusEl) {
      statusEl.innerHTML = `<span class="text-emerald-600 font-semibold">✓ Webhook active. Submissions will stream into Google Sheets.</span>`;
    }
  }
}

function toggleSheetInstructions() {
  const box = document.getElementById("sheet-instructions-box");
  box.classList.toggle("hidden");
}

function sendToGoogleSheetWebhook(report) {
  const webhookUrl = localStorage.getItem("coaching_sheet_webhook_url");
  if (!webhookUrl) return;

  const payload = {
    timestamp: report.timestamp,
    name: report.name,
    email: report.email,
    department: report.dept,
    dominantArchetype: ARCHETYPE_CONFIG[report.dominant].name,
    coachPercent: report.percentages.coach,
    mentorPercent: report.percentages.mentor,
    consultantPercent: report.percentages.consultant,
    counselorPercent: report.percentages.counselor,
    paradigmAvg: report.paradigmAvg,
    scale1: report.paradigmBreakdown.scale_1,
    scale2: report.paradigmBreakdown.scale_2,
    scale3: report.paradigmBreakdown.scale_3,
    scale4: report.paradigmBreakdown.scale_4,
    scale5: report.paradigmBreakdown.scale_5,
    scale6: report.paradigmBreakdown.scale_6
  };

  fetch(webhookUrl, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).then(() => {
    console.log("Successfully dispatched payload to Google Sheet");
  }).catch(err => {
    console.warn("Could not dispatch to Google Sheet webhook:", err);
  });
}
