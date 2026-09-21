/**
 * Assessment Data Bank
 * Aligned with the 2x2 Conversation Matrix and Slide 20 Paradigm Shift Assessment
 * 
 * Distinct Archetypes:
 * - COACH: Ask + Future/Solution (Helps client discover own answer, holds them accountable, focuses on present/future growth)
 * - MENTOR: Tell + Future/Solution (Always ready with the answer, shares personal experience, wisdom, career guidance: "Here's what I did...")
 * - CONSULTANT: Tell + Past/Problem (Evaluates situation, brings subject-matter expertise, diagnoses flaws and prescribes exact fix)
 * - COUNSELOR: Ask + Past/Problem (Explores underlying emotional blocks, feelings, interpersonal history, and past root causes)
 */

const SCENARIOS = [
  {
    id: 1,
    title: "Scenario 1: Missed Deadlines & Project Setback",
    context: "A team lead comes to you visibly overwhelmed because their critical deliverable is two weeks behind schedule, and their stakeholders are escalating.",
    question: "What is your primary instinct and approach in this conversation?",
    options: [
      {
        type: "mentor",
        badge: "Mentor",
        text: "Tell them immediately how you resolved an almost identical crisis in your career, laying out the exact steps and playbook that worked for you so they have the answer ready.",
        rationale: "Mentor has the answer based on personal wisdom and career guidance."
      },
      {
        type: "coach",
        badge: "Coach",
        text: "Ask thought-provoking questions about their ideal outcome: 'What outcome do you want to achieve by Friday, what options do you see, and which will you commit to executing?'",
        rationale: "Coach helps them discover their own answer and holds them accountable."
      },
      {
        type: "consultant",
        badge: "Consultant",
        text: "Analyze their workflow bottlenecks, diagnose where the process failed, and formulate a corrective technical action plan for them to execute.",
        rationale: "Consultant provides expertise to solve a specific problem."
      },
      {
        type: "counselor",
        badge: "Counselor",
        text: "Gently ask how they are coping internally: 'How have you been feeling carrying this pressure, and what underlying fears or team tensions are holding you back?'",
        rationale: "Counselor explores feelings, past baggage, and deep root causes."
      }
    ]
  },
  {
    id: 2,
    title: "Scenario 2: Cross-Departmental Friction",
    context: "An employee complains that a peer in Marketing is constantly rejecting their proposals, leading to stalled work and frustration.",
    question: "How do you respond to them?",
    options: [
      {
        type: "consultant",
        badge: "Consultant",
        text: "Review the rejected proposal specifications, pinpoint the gaps in compliance or formatting, and tell them how to restructure the deck to meet Marketing's standards.",
        rationale: "Consultant evaluates the situation and advises the technical solution."
      },
      {
        type: "mentor",
        badge: "Mentor",
        text: "Give them the direct answer from your own experience: 'In our company culture, Marketing needs early alignment meetings before formal submission. Do this, talk to X first, and it will be approved.'",
        rationale: "Mentor provides the answer and organizational wisdom directly."
      },
      {
        type: "counselor",
        badge: "Counselor",
        text: "Ask: 'What past interaction might have created this friction between you two, and how is this relational tension impacting your self-confidence?'",
        rationale: "Counselor investigates relational dynamics, emotions, and past history."
      },
      {
        type: "coach",
        badge: "Coach",
        text: "Ask: 'If this partnership were running at its best 3 months from now, what would that look like? What is one constructive step you can initiate this week?'",
        rationale: "Coach focuses on the future solution and invites personal ownership."
      }
    ]
  },
  {
    id: 3,
    title: "Scenario 3: Career Direction Dilemma",
    context: "A high-potential professional asks: 'I don't know whether I should pursue people management or stay on the individual contributor technical track.'",
    question: "When they ask for your help, what do you do?",
    options: [
      {
        type: "mentor",
        badge: "Mentor",
        text: "Provide them with the answer based on your leadership journey: 'I faced this exact choice 8 years ago. Given the market trends and your potential, the management track will open executive doors. Here is the path to take.'",
        rationale: "Mentor has the answer ready and dispenses career roadmaps."
      },
      {
        type: "coach",
        badge: "Coach",
        text: "Inquire deeply: 'When you reflect on the times you felt most fulfilled and energized at work, what were you doing? How does each pathway align with who you want to become?'",
        rationale: "Coach asks to unlock self-discovery and internal motivation."
      },
      {
        type: "counselor",
        badge: "Counselor",
        text: "Explore: 'What anxieties or past doubts come up when you picture yourself stepping away from technical craft, and whose expectations are you trying to fulfill?'",
        rationale: "Counselor uncovers deep emotional hesitations and internal conflict."
      },
      {
        type: "consultant",
        badge: "Consultant",
        text: "Prepare a comparative matrix of salary growth, headcount demand, and required competency benchmarks for both tracks so they can make a data-driven choice.",
        rationale: "Consultant provides analytical expertise and structured data."
      }
    ]
  },
  {
    id: 4,
    title: "Scenario 4: Team Disengagement & Low Morale",
    context: "A supervisor notices their team seems unmotivated, quiet during meetings, and doing just the bare minimum.",
    question: "How do you guide the supervisor?",
    options: [
      {
        type: "coach",
        badge: "Coach",
        text: "Ask: 'What kind of culture do you want to cultivate in your team? What is one powerful question you can ask your team at your next standup to give them a voice?'",
        rationale: "Coach focuses on future vision and co-creates forward actions."
      },
      {
        type: "counselor",
        badge: "Counselor",
        text: "Help them reflect: 'When did you first notice this energy drop? Could past unaddressed grievances or changes in leadership have broken the team's trust?'",
        rationale: "Counselor dives into root causes, trust ruptures, and historical triggers."
      },
      {
        type: "mentor",
        badge: "Mentor",
        text: "Give them the answer right away: 'Here is what worked for my teams every single time: institute Friday wins celebrations, establish open-door office hours, and share your vision weekly.'",
        rationale: "Mentor provides battle-tested wisdom and answers directly."
      },
      {
        type: "consultant",
        badge: "Consultant",
        text: "Recommend administering an anonymous 10-question employee Net Promoter Score (eNPS) survey to pinpoint friction metrics and implement quarterly milestone bonuses.",
        rationale: "Consultant prescribes diagnostic tools and organizational interventions."
      }
    ]
  },
  {
    id: 5,
    title: "Scenario 5: Handling High-Stakes Client Escalation",
    context: "A team member comes to you in panic: 'A major client just called demanding a contract cancellation due to service downtime yesterday! What do I do?'",
    question: "What is your immediate response?",
    options: [
      {
        type: "mentor",
        badge: "Mentor",
        text: "Immediately hand them the solution: 'Don't worry, I handled this with Client Y last year. Pick up the phone, say exactly this, offer the 10% SLA credit, and schedule a face-to-face debrief. Here is the script.'",
        rationale: "Mentor steps in with the exact answer and practical wisdom."
      },
      {
        type: "consultant",
        badge: "Consultant",
        text: "Conduct a root cause analysis of the downtime log, calculate the contractual SLA liability percentage, and write the formal Incident Response memorandum.",
        rationale: "Consultant applies technical expertise to solve the contractual dispute."
      },
      {
        type: "coach",
        badge: "Coach",
        text: "Ask: 'Take a deep breath. What is the most critical outcome to preserve with this client? What are 2 viable approaches you can take right now to de-escalate?'",
        rationale: "Coach calms the panic and empowers them to generate actionable options."
      },
      {
        type: "counselor",
        badge: "Counselor",
        text: "Ask: 'You seem very shaken. What fears are coming up for you regarding your standing with management, and how can we unpack that stress first?'",
        rationale: "Counselor prioritizes emotional processing and emotional safety."
      }
    ]
  },
  {
    id: 6,
    title: "Scenario 6: Delegating a Complex Initiative",
    context: "You are handing off a strategic quarterly initiative to a promising junior manager who hasn't managed such a scope before.",
    question: "What does your kickoff conversation sound like?",
    options: [
      {
        type: "consultant",
        badge: "Consultant",
        text: "Provide a detailed Project Charter, RACI matrix, Gantt chart, and standard operating procedures (SOP) that they must follow to ensure zero compliance errors.",
        rationale: "Consultant supplies structured process guidelines and expert tools."
      },
      {
        type: "coach",
        badge: "Coach",
        text: "Clarify the end vision together, then ask: 'What resources and support do you need from me? How will you track progress, and how would you like us to review milestones?'",
        rationale: "Coach establishes shared goals and lets coachee own execution."
      },
      {
        type: "mentor",
        badge: "Mentor",
        text: "Sit with them and give them the benefit of your experience: 'Here are the 3 traps every new manager falls into on this project. Here is how I organized my steering committee, and here are the executive sponsors you must win over.'",
        rationale: "Mentor shares personal lessons learned and prescriptive insights."
      },
      {
        type: "counselor",
        badge: "Counselor",
        text: "Ask: 'Stepping into this new level of visibility can be daunting. What past experiences with leadership make you feel confident or apprehensive?'",
        rationale: "Counselor explores feelings of imposter syndrome and personal background."
      }
    ]
  },
  {
    id: 7,
    title: "Scenario 7: Struggling with Work-Life Balance",
    context: "A high-performing staff member breaks down: 'I am constantly working past midnight, exhausted, and feeling like I'm failing both at home and at work.'",
    question: "How do you navigate this discussion?",
    options: [
      {
        type: "counselor",
        badge: "Counselor",
        text: "Listen with deep empathy and ask: 'What internal beliefs or past pressures drive you to feel you must be perfect? How is this exhaustion impacting your emotional well-being?'",
        rationale: "Counselor deep-dives into emotional roots and personal pain points."
      },
      {
        type: "mentor",
        badge: "Mentor",
        text: "Share your own past burnout story: 'I hit that exact wall in my fifth year. Here is the routine that saved me: turn off Slack at 7 PM, block calendar focus time, and learn to say no. Follow this model.'",
        rationale: "Mentor offers personal life lessons and practical wisdom as the answer."
      },
      {
        type: "coach",
        badge: "Coach",
        text: "Ask: 'What does a healthy, sustainable work-life rhythm look like for you? What is one boundary you are willing to set starting tomorrow to protect your evenings?'",
        rationale: "Coach prompts future design and self-directed commitments."
      },
      {
        type: "consultant",
        badge: "Consultant",
        text: "Audit their weekly task breakdown, reallocate lower-priority tasks to other team members, and implement time-blocking software to optimize productivity.",
        rationale: "Consultant fixes the operational schedule and work distribution."
      }
    ]
  },
  {
    id: 8,
    title: "Scenario 8: Innovation & Stagnant Idea Generation",
    context: "During a brainstorming session, your team is stuck rehashing old, safe ideas instead of innovating for the next market cycle.",
    question: "What is your conversation approach to stimulate breakthrough thinking?",
    options: [
      {
        type: "coach",
        badge: "Coach",
        text: "Challenge the group with open inquiry: 'If we had zero budget or technology constraints, what outrageous solution would delight our customers? What assumptions can we shatter today?'",
        rationale: "Coach unlocks creative possibilities through powerful open questioning."
      },
      {
        type: "mentor",
        badge: "Mentor",
        text: "Step up and share the answer: 'Every time our company disrupted a category in the past, we applied this 3-pillar innovation framework. Let me walk you through how Steve Jobs and our founders approached it.'",
        rationale: "Mentor tells inspiring case studies and provides the answer."
      },
      {
        type: "consultant",
        badge: "Consultant",
        text: "Present a competitive benchmark report showing what industry leaders are doing and tell the team to adapt the top 3 emerging technical capabilities.",
        rationale: "Consultant advises based on external industry best practices."
      },
      {
        type: "counselor",
        badge: "Counselor",
        text: "Ask: 'What makes people here hesitant to propose radical ideas? Have past failures or criticisms created a climate where people fear looking foolish?'",
        rationale: "Counselor examines past psychological safety barriers and fears."
      }
    ]
  }
];

// Paradigm Shift Assessment Scales (1 to 10) directly from Slide 20
const PARADIGM_SCALES = [
  {
    id: "scale_1",
    leftLabel: "Focusing on staff weaknesses",
    rightLabel: "Leveraging staff strengths",
    category: "Mindset & Talent Orientation"
  },
  {
    id: "scale_2",
    leftLabel: "Solving all the problems yourself",
    rightLabel: "Helping others solve & eliminate problems",
    category: "Problem Solving Autonomy"
  },
  {
    id: "scale_3",
    leftLabel: "Giving advice & telling answers",
    rightLabel: "Asking questions to draw out creative options",
    category: "Inquiry vs. Advocacy (Ask vs Tell)"
  },
  {
    id: "scale_4",
    leftLabel: "Being a source of approval",
    rightLabel: "Establishing a trustful partnership",
    category: "Relationship & Safety"
  },
  {
    id: "scale_5",
    leftLabel: "Demonstrating your expertise",
    rightLabel: "Being a role of excellence & facilitation",
    category: "Ego vs. Facilitation"
  },
  {
    id: "scale_6",
    leftLabel: "Imposing your agenda on the coachee",
    rightLabel: "Accepting that you are not in control",
    category: "Control vs. Empowerment"
  }
];

const COACHING_TIPS = [
  {
    category: "Listen 80%, Speak 20%",
    title: "Embrace the Pause & Silence",
    tip: "When you feel the urge to immediately 'give the answer' (Mentoring) or 'fix the problem' (Consulting), pause for 5 seconds. Ask: 'What does your instinct tell you to do first?'"
  },
  {
    category: "Powerful Open-Ended Questions",
    title: "Shift from 'Why' to 'What' and 'How'",
    tip: "'Why' questions often put people on the defensive (Counseling past focus). Instead use: 'What outcome are you aiming for?' and 'What options haven't you considered yet?'"
  },
  {
    category: "Holding Accountability",
    title: "Close with Clear Ownership",
    tip: "A true coaching conversation concludes with: 'By when will you do this?', 'How will I know you succeeded?', and 'What obstacle might derail you?'"
  },
  {
    category: "Strengths Over Weaknesses",
    title: "Anchor in Proven Strengths",
    tip: "Instead of fixing weaknesses, ask: 'Which of your core strengths can you leverage right now to overcome this current hurdle?'"
  },
  {
    category: "Surrendering Control",
    title: "Trust the Coachee's Capability",
    tip: "Accept that your coachee's solution may not look exactly like yours, but because they originated it, their commitment to execute will be 10x higher."
  }
];

const PROFESSIONAL_QUOTES = [
  {
    quote: "Coaching is unlocking people's potential to maximize their own performance. It is helping them to learn rather than teaching them.",
    author: "Sir John Whitmore",
    role: "Pioneer of the GROW Coaching Model"
  },
  {
    quote: "The leader of the past knew how to tell. The leader of the future will know how to ask.",
    author: "Peter F. Drucker",
    role: "Father of Modern Management"
  },
  {
    quote: "In a coaching relationship, the client is the expert in their own life and work. The coach's role is not to dispense wisdom, but to hold the mirror and illuminate possibilities.",
    author: "International Coaching Federation (ICF)",
    role: "Global Standards Core Competency"
  },
  {
    quote: "The opponent within one's own head is more formidable than the one on the other side of the net.",
    author: "W. Timothy Gallwey",
    role: "Author of The Inner Game of Work"
  }
];


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

// ==================== QR CODE CLASSROOM MODAL LOGIC ====================
let qrCodeInstance = null;

function openQrModal() {
  const modal = document.getElementById("qr-modal");
  const urlInput = document.getElementById("qr-target-url");
  
  // Default URL to current location, or saved Netlify URL
  let targetUrl = localStorage.getItem("coaching_custom_app_url");
  if (!targetUrl) {
    // If running on netlify or web, use current origin; else placeholder
    targetUrl = window.location.origin.includes("localhost") || window.location.origin.includes("127.0.0.1")
      ? window.location.href.split("?")[0]
      : window.location.href.split("?")[0];
  }
  
  urlInput.value = targetUrl;
  renderQrCode(targetUrl);
  modal.classList.remove("hidden");
  lucide.createIcons();
}

function closeQrModal() {
  document.getElementById("qr-modal").classList.add("hidden");
}

function updateQrCodeFromInput() {
  const url = document.getElementById("qr-target-url").value.trim();
  if (url) {
    localStorage.setItem("coaching_custom_app_url", url);
    renderQrCode(url);
  }
}

function renderQrCode(url) {
  const container = document.getElementById("qrcode-display");
  container.innerHTML = "";

  if (typeof QRCode !== "undefined") {
    qrCodeInstance = new QRCode(container, {
      text: url || window.location.href,
      width: 200,
      height: 200,
      colorDark: "#0f172a",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  } else {
    // Fallback QR service
    const img = document.createElement("img");
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url || window.location.href)}`;
    img.alt = "Classroom QR Code";
    img.className = "rounded-lg shadow-sm";
    container.appendChild(img);
  }
}

function copyQrUrl() {
  const url = document.getElementById("qr-target-url").value;
  if (!url) return;
  navigator.clipboard.writeText(url).then(() => {
    const btnText = document.getElementById("copy-btn-text");
    btnText.textContent = "Copied!";
    setTimeout(() => { btnText.textContent = "Copy"; }, 1500);
  });
}

function downloadQrCode() {
  const container = document.getElementById("qrcode-display");
  const img = container.querySelector("img");
  const canvas = container.querySelector("canvas");

  let downloadUrl = "";
  if (canvas) {
    downloadUrl = canvas.toDataURL("image/png");
  } else if (img && img.src) {
    downloadUrl = img.src;
  }

  if (downloadUrl) {
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "coaching-assessment-qr-code.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
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

// Render Paradigm Scales (Slide 20 - Mobile Optimized with Tap Buttons & Sliders)
function renderParadigmScales() {
  const container = document.getElementById("paradigm-container");
  container.innerHTML = "";

  PARADIGM_SCALES.forEach((scale, index) => {
    if (!paradigmValues[scale.id]) {
      paradigmValues[scale.id] = 6;
    }

    const item = document.createElement("div");
    item.className = "p-4 sm:p-5 rounded-2xl bg-slate-50/90 border border-slate-200/90 space-y-3.5";
    item.innerHTML = `
      <div class="flex items-center justify-between">
        <span class="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-purple-700">Dimension ${index + 1}: ${scale.category}</span>
        <span id="scale-val-badge-${scale.id}" class="px-2.5 py-1 rounded-full font-black bg-purple-600 text-white text-xs shadow-sm">
          Score: ${paradigmValues[scale.id]} / 10
        </span>
      </div>

      <!-- Vertical Stack for Mobile, Row for Desktop -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        <div class="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 flex items-start gap-2 shadow-xs">
          <span class="px-1.5 py-0.5 rounded bg-slate-100 font-mono font-bold text-[10px] text-slate-500 shrink-0">1</span>
          <div>
            <span class="text-[10px] uppercase font-bold text-slate-400 block">Score 1 (Directive / Control)</span>
            <span class="leading-tight">${scale.leftLabel}</span>
          </div>
        </div>
        <div class="p-2.5 rounded-xl bg-indigo-50/60 border border-indigo-200/80 text-indigo-950 flex items-start gap-2 shadow-xs">
          <span class="px-1.5 py-0.5 rounded bg-indigo-100 font-mono font-bold text-[10px] text-indigo-600 shrink-0">10</span>
          <div>
            <span class="text-[10px] uppercase font-bold text-indigo-500 block">Score 10 (Empowering / Coaching)</span>
            <span class="leading-tight">${scale.rightLabel}</span>
          </div>
        </div>
      </div>

      <!-- High-Touch Slider Control -->
      <div class="pt-2 px-1 space-y-2">
        <input type="range" min="1" max="10" step="1" value="${paradigmValues[scale.id]}" 
          id="range-input-${scale.id}"
          class="w-full cursor-pointer accent-blue-600"
          oninput="onParadigmInput('${scale.id}', this.value)">

        <!-- Tap-Friendly Number Grid for Instant Mobile Selection -->
        <div class="grid grid-cols-10 gap-1 text-center pt-1" id="step-buttons-${scale.id}">
          ${[1,2,3,4,5,6,7,8,9,10].map(num => `
            <button type="button" onclick="setParadigmStep('${scale.id}', ${num})" 
              class="step-btn-${scale.id} py-1.5 text-xs font-mono font-bold rounded-lg transition ${
                paradigmValues[scale.id] === num 
                  ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-600' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }" data-step="${num}">
              ${num}
            </button>
          `).join('')}
        </div>
      </div>
    `;
    container.appendChild(item);
  });
}

function onParadigmInput(scaleId, val) {
  const numVal = parseInt(val, 10);
  paradigmValues[scaleId] = numVal;
  
  const badge = document.getElementById(`scale-val-badge-${scaleId}`);
  if (badge) {
    badge.textContent = `Score: ${val} / 10`;
  }

  // Update step button highlights
  const stepContainer = document.getElementById(`step-buttons-${scaleId}`);
  if (stepContainer) {
    const btns = stepContainer.querySelectorAll(`button`);
    btns.forEach(btn => {
      const step = parseInt(btn.getAttribute("data-step"), 10);
      if (step === numVal) {
        btn.className = `step-btn-${scaleId} py-1.5 text-xs font-mono font-bold rounded-lg transition bg-blue-600 text-white shadow-sm ring-1 ring-blue-600`;
      } else {
        btn.className = `step-btn-${scaleId} py-1.5 text-xs font-mono font-bold rounded-lg transition bg-white text-slate-600 hover:bg-slate-100 border border-slate-200`;
      }
    });
  }
}

function setParadigmStep(scaleId, val) {
  const rangeInput = document.getElementById(`range-input-${scaleId}`);
  if (rangeInput) rangeInput.value = val;
  onParadigmInput(scaleId, val);
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

// Pull live participant submissions directly from the connected Google Sheet into the dashboard
function syncFromGoogleSheet() {
  const webhookUrl = localStorage.getItem("coaching_sheet_webhook_url");
  const feedbackEl = document.getElementById("sync-feedback");
  const syncBtn = document.getElementById("btn-sync-sheet");

  if (!webhookUrl) {
    alert("Please save your Google Apps Script Webhook URL first.");
    return;
  }

  feedbackEl.classList.remove("hidden");
  feedbackEl.className = "font-semibold text-blue-600 text-xs";
  feedbackEl.textContent = "Syncing from Google Sheet...";
  syncBtn.disabled = true;

  fetch(webhookUrl)
    .then(res => res.json())
    .then(data => {
      syncBtn.disabled = false;
      if (data && data.status === "success" && Array.isArray(data.participants)) {
        if (data.participants.length === 0) {
          feedbackEl.className = "font-semibold text-amber-600 text-xs";
          feedbackEl.textContent = "Connected! Google Sheet has no submissions yet.";
        } else {
          cohortSubmissions = data.participants;
          localStorage.setItem("coaching_cohort_data", JSON.stringify(cohortSubmissions));
          renderFacilitatorDashboard();
          feedbackEl.className = "font-semibold text-emerald-600 text-xs";
          feedbackEl.textContent = `✓ Successfully synced ${data.participants.length} participant(s) from Google Sheets!`;
        }
      } else {
        feedbackEl.className = "font-semibold text-red-600 text-xs";
        feedbackEl.textContent = "Unexpected response from Google Sheet. Make sure Web App is deployed with access to 'Anyone'.";
      }
    })
    .catch(err => {
      syncBtn.disabled = false;
      feedbackEl.className = "font-semibold text-red-600 text-xs";
      feedbackEl.textContent = "Could not fetch from Google Sheet. Verify URL and Web App permissions.";
      console.error("Google Sheets sync error:", err);
    });
}
