import {
  createIcons,
  Sparkles,
  Mail,
  FileText,
  Table,
  Presentation,
  BookOpen,
  Video,
  FolderSync,
  Clapperboard,
  Search,
  Sun,
  Moon,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Cpu,
  Layers,
  ArrowRight,
  Filter,
  Terminal,
  HelpCircle
} from 'lucide';

// Initialize Lucide icons
createIcons({
  icons: {
    Sparkles,
    Mail,
    FileText,
    Table,
    Presentation,
    BookOpen,
    Video,
    FolderSync,
    Clapperboard,
    Search,
    Sun,
    Moon,
    Copy,
    Check,
    ExternalLink,
    ShieldCheck,
    Cpu,
    Layers,
    ArrowRight,
    Filter,
    Terminal,
    HelpCircle
  }
});

// Theme switcher
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlEl = document.documentElement;

if (
  localStorage.getItem('color-theme') === 'dark' ||
  (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  htmlEl.classList.add('dark');
} else {
  htmlEl.classList.remove('dark');
}

themeToggleBtn?.addEventListener('click', () => {
  if (htmlEl.classList.contains('dark')) {
    htmlEl.classList.remove('dark');
    localStorage.setItem('color-theme', 'light');
  } else {
    htmlEl.classList.add('dark');
    localStorage.setItem('color-theme', 'dark');
  }
});

// App Filter Buttons
const filterBtns = document.querySelectorAll('.app-filter-btn');
const appSections = document.querySelectorAll('.app-guide-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const selectedApp = btn.getAttribute('data-app');
    
    filterBtns.forEach(b => {
      b.classList.remove('bg-purple-600', 'text-white', 'shadow-md');
      b.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
    });

    btn.classList.add('bg-purple-600', 'text-white', 'shadow-md');
    btn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');

    appSections.forEach(card => {
      if (selectedApp === 'all' || card.getAttribute('data-app') === selectedApp) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Real-time Search
const searchInput = document.getElementById('search-input');
searchInput?.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase().trim();
  appSections.forEach(card => {
    const content = card.innerText.toLowerCase();
    card.style.display = content.includes(query) ? 'block' : 'none';
  });
});

// Copy button helper
document.addEventListener('click', async (e) => {
  const target = e.target.closest('.copy-trigger');
  if (!target) return;
  
  const textToCopy = target.getAttribute('data-copy') || target.closest('.code-container')?.querySelector('code')?.innerText;
  if (!textToCopy) return;

  await navigator.clipboard.writeText(textToCopy);
  const original = target.innerHTML;
  target.innerHTML = `<span class="inline-flex items-center gap-1 text-xs text-emerald-400 font-semibold"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Copied</span>`;
  setTimeout(() => {
    target.innerHTML = original;
  }, 2200);
});

// Interactive Prompt Generator Logic
const appSelect = document.getElementById('gen-app');
const goalSelect = document.getElementById('gen-goal');
const topicInput = document.getElementById('gen-topic');
const toneSelect = document.getElementById('gen-tone');
const outputBox = document.getElementById('gen-output');
const copyPromptBtn = document.getElementById('copy-generated-prompt');

const presets = {
  sheets: [
    { id: 'tracker', label: 'Create Project / Expense Tracker', template: (topic, tone) => `Create a structured table for tracking "${topic}". Include columns for Task/Item, Category, Assigned Owner, Start Date, Target Date, Status (Not Started, In Progress, Complete), Estimated Budget, Actual Cost, and Variance. Add suggested formulas for calculating total variance and completion percentages.` },
    { id: 'formula', label: 'Generate Complex Formula', template: (topic, tone) => `Write an advanced Google Sheets formula for: "${topic}". Explain step-by-step how the formula works, suggest edge cases to handle, and provide an alternative using modern array formulas or QUERY if applicable.` },
    { id: 'sentiment', label: 'Analyze Customer Feedback', template: (topic, tone) => `Analyze the customer feedback in column A regarding "${topic}". Categorize each entry into Positive, Neutral, or Negative sentiment, and highlight key recurring feature requests or pain points.` }
  ],
  gmail: [
    { id: 'catchup', label: 'Summarize Long Thread & Extract Tasks', template: (topic, tone) => `Summarize this email conversation regarding "${topic}". Group the summary into: 1) Executive Summary (2 sentences), 2) Key decisions agreed upon, and 3) Explicit action items with person responsible and deadlines.` },
    { id: 'draft', label: 'Draft Client Outreach / Follow-up', template: (topic, tone) => `Draft a ${tone} email to follow up with a prospective client regarding "${topic}". Clearly state the value proposition, reference our previous conversation, and suggest two specific 15-minute time slots for a follow-up demo.` },
    { id: 'tone', label: 'Professional Tone Shift', template: (topic, tone) => `Rewrite the following drafted response about "${topic}" with a ${tone} tone. Keep the core message direct and clear while ensuring diplomatic and constructive wording.` }
  ],
  docs: [
    { id: 'proposal', label: 'Draft Project Proposal / Scope', template: (topic, tone) => `Draft a comprehensive project proposal for "${topic}". Include Executive Summary, Problem Statement, Proposed Solution Architecture, Milestones & Timeline (Phases 1-4), Risk Mitigation Plan, and Key Success Metrics.` },
    { id: 'exec-summary', label: 'Generate Executive Briefing', template: (topic, tone) => `Review this document and generate a 1-page Executive Briefing on "${topic}". Use bullet points, bold key data findings, and conclude with recommended next steps for leadership.` }
  ],
  notebooklm: [
    { id: 'audio-prep', label: 'Audio Overview Source Curation', template: (topic, tone) => `Based on all uploaded sources regarding "${topic}", generate a structured synthesis highlighting contradictory viewpoints, key supporting evidence, and 5 thought-provoking discussion topics suitable for an Audio Overview deep dive podcast.` },
    { id: 'study-guide', label: 'Generate Study Guide & Source FAQ', template: (topic, tone) => `Create a comprehensive study guide and FAQ grounded strictly in the provided sources about "${topic}". For every major concept, cite the exact source document and section.` }
  ],
  slides: [
    { id: 'deck-outline', label: 'Pitch Deck Outline & Speaker Notes', template: (topic, tone) => `Generate a 10-slide presentation outline for "${topic}". For each slide provide: 1) Slide Title, 2) Core takeaway (1 sentence), 3) Recommended layout/visual asset description, and 4) Detailed conversational speaker notes with a ${tone} tone.` },
    { id: 'image-prompt', label: 'Imagen 3 Prompt for Slide Background', template: (topic, tone) => `Create a prompt for Gemini/Imagen 3 in Google Slides to generate a modern, high-resolution header illustration representing: "${topic}". Style: Clean minimalistic 3D glassmorphic elements, soft studio lighting, professional corporate palette.` }
  ],
  meet: [
    { id: 'meeting-notes', label: 'Format Automatic Meeting Notes', template: (topic, tone) => `Process the raw transcript for the meeting discussing "${topic}". Produce a clean meeting debrief structured with: Attendees, Key Decisions, Open Questions, and an Action Items table (Action, Owner, ETA).` }
  ]
};

function updateGoals() {
  const app = appSelect?.value || 'sheets';
  if (!goalSelect) return;
  goalSelect.innerHTML = '';
  const appGoals = presets[app] || [];
  appGoals.forEach(g => {
    const opt = document.createElement('option');
    opt.value = g.id;
    opt.textContent = g.label;
    goalSelect.appendChild(opt);
  });
  generatePrompt();
}

function generatePrompt() {
  const app = appSelect?.value || 'sheets';
  const goalId = goalSelect?.value;
  const topic = topicInput?.value || 'Q4 Team Goals & Performance KPIs';
  const tone = toneSelect?.value || 'professional and concise';
  
  const appGoals = presets[app] || [];
  const selectedGoal = appGoals.find(g => g.id === goalId) || appGoals[0];

  if (selectedGoal && outputBox) {
    outputBox.textContent = selectedGoal.template(topic, tone);
  }
}

appSelect?.addEventListener('change', updateGoals);
goalSelect?.addEventListener('change', generatePrompt);
topicInput?.addEventListener('input', generatePrompt);
toneSelect?.addEventListener('change', generatePrompt);

// Initialize generator on load
updateGoals();

copyPromptBtn?.addEventListener('click', async () => {
  if (!outputBox) return;
  await navigator.clipboard.writeText(outputBox.textContent);
  copyPromptBtn.innerHTML = `<span class="inline-flex items-center gap-1 text-emerald-400 font-semibold"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Copied to Clipboard</span>`;
  setTimeout(() => {
    copyPromptBtn.innerHTML = `<i data-lucide="copy" class="w-4 h-4"></i><span>Copy Generated Prompt</span>`;
    createIcons();
  }, 2000);
});
