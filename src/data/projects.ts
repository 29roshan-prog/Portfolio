import type { FilterKey, Project } from './types'

/**
 * Every project lives here. To add one: copy an entry, give it a unique slug,
 * create src/assets/projects/<slug>/ and drop screenshots named after each shot `id`.
 *
 * Rules this file follows (keep them):
 *  - `verify: true` on a technology = mentioned in notes, not yet confirmed from source.
 *  - `results` holds verified numbers only. Empty is fine.
 *  - `links` only get real URLs. No URL = no button.
 */

export const filters: { key: FilterKey | 'all'; label: string }[] = [
  { key: 'all', label: 'All projects' },
  { key: 'ai-ml', label: 'AI / Machine Learning' },
  { key: 'voice', label: 'Voice AI & Automation' },
  { key: 'fullstack', label: 'Full-stack applications' },
  { key: 'enterprise', label: 'Enterprise software' },
  { key: 'iot-research', label: 'IoT & Research' },
]

export const contextLabels: Record<Project['context'], string> = {
  personal: 'Independent project',
  academic: 'Academic / research',
  professional: 'Professional work',
  client: 'Client project',
  review: 'Project',
}

const projectList: Project[] = [
  // ───────────────────────────────────────────── ROCKY
  {
    slug: 'rocky',
    name: 'Rocky — AI Agency Assistant',
    tagline: 'An internal AI operator that plans ad campaigns, reads the CRM and briefs the team every morning.',
    category: 'AI agents / Marketing automation',
    filters: ['ai-ml', 'fullstack', 'enterprise'],
    context: 'professional',
    contextNote: 'Internal tool at Skyup Digital Solutions · built solo',
    visible: true,
    featured: true,
    order: 1,
    summary:
      'Rocky is Skyup\'s internal AI assistant. It drafts Meta ad campaigns, automates reel publishing, answers plain-English questions about the CRM, links ad spend to real leads and sends a morning brief with live numbers.',
    problem:
      'Agency teams jump between Meta Ads Manager, the CRM and spreadsheets to answer basic questions like "which ad set is actually bringing leads?"',
    contribution:
      'Built Rocky end to end: the Node/Express backend, React frontend, Meta and CRM integrations and the AI workflows on top of them.',
    overview: [
      'Rocky is an AI assistant built for the day-to-day work of a digital marketing agency. It sits on top of the tools the team already uses, Meta Ads and Skyup\'s own CRM, and turns them into one place to ask questions and get work drafted.',
      'It is designed to prepare work for people rather than act unsupervised: campaigns it creates start in a paused state for a human to review.',
    ],
    problemContext: [
      'Ad spend lives in Meta, leads live in the CRM, and the connection between them usually lives in someone\'s head or a weekly spreadsheet.',
      'Routine work, such as setting up campaigns, writing ad copy, publishing reels and preparing the morning update, takes hours that could go to strategy.',
    ],
    objectives: [
      'Connect ad spend to CRM outcomes so performance is measured in leads, not clicks.',
      'Let anyone on the team query the CRM in plain English.',
      'Draft Meta campaigns (strategy, targeting, copy) for human approval.',
      'Automate repetitive content work like reel captions and publishing.',
      'Start each day with a brief built from live data.',
    ],
    role: [
      'Designed and built the Node.js/Express (ESM) backend on MongoDB Atlas and the React 18 + Vite frontend.',
      'Built the Meta Ads Campaign Architect, which generates strategy, targeting and copy with AI and creates campaigns in a PAUSED state.',
      'Built the reel autopilot using Cloudinary for media, Whisper for transcription and GPT-4o vision for understanding the video.',
      'Integrated Rocky with Skyup\'s CRM by reading its MongoDB directly, and built the natural-language CRM query engine.',
      'Built campaign attribution that joins Meta ad-set spend to CRM leads, the morning brief, and a website builder module.',
    ],
    solution: [
      'Rocky\'s backend pulls live spend from Meta and lead outcomes from the CRM database. Attribution joins the two at the ad-set level, so the team sees what each ad set cost and which leads it produced.',
      'Questions typed in plain English are translated into CRM queries, run against the database, and summarised back.',
      'The Campaign Architect takes a brief and produces a full campaign plan with AI; the campaign is created in Meta as PAUSED so nothing spends money until someone approves it.',
      'The reel autopilot uploads media to Cloudinary, transcribes it with Whisper, uses GPT-4o vision to understand the content, and drafts captions for publishing.',
    ],
    flows: [
      {
        title: 'Spend-to-lead attribution and morning brief',
        steps: [
          [
            { label: 'Meta Ads', detail: 'Live ad-set spend', kind: 'input' },
            { label: 'Skyup CRM', detail: 'MongoDB leads & outcomes', kind: 'store' },
          ],
          { label: 'Attribution join', detail: 'Ad set ↔ leads', kind: 'process' },
          { label: 'LLM summary', detail: 'What changed, what needs action', kind: 'model' },
          { label: 'Morning brief', kind: 'output' },
        ],
      },
      {
        title: 'Campaign Architect',
        caption: 'AI drafts, a person approves. Nothing spends until then.',
        steps: [
          { label: 'Campaign brief', detail: 'Goal, audience, budget', kind: 'input' },
          { label: 'AI strategy', detail: 'Objective, targeting, copy', kind: 'model' },
          { label: 'Create in Meta', detail: 'Status: PAUSED', kind: 'rule' },
          { label: 'Human review', detail: 'Approve to go live', kind: 'output' },
        ],
      },
      {
        title: 'Reel autopilot',
        steps: [
          { label: 'Raw reel', kind: 'input' },
          { label: 'Cloudinary', detail: 'Media storage & processing', kind: 'store' },
          [
            { label: 'Whisper', detail: 'Transcription', kind: 'model' },
            { label: 'GPT-4o vision', detail: 'Visual understanding', kind: 'model' },
          ],
          { label: 'Caption & publish draft', kind: 'output' },
        ],
      },
    ],
    features: [
      { title: 'Campaign Architect', body: 'AI-generated strategy, targeting and ad copy; campaigns are created paused for review.' },
      { title: 'Spend-to-lead attribution', body: 'Joins Meta ad-set spend with CRM leads so each ad set is judged on real outcomes.' },
      { title: 'Plain-English CRM queries', body: 'Ask questions about leads and clients without writing a database query.' },
      { title: 'Morning brief', body: 'A daily summary built from live Meta spend and CRM results.' },
      { title: 'Reel autopilot', body: 'Transcribes and understands reels, then drafts captions for publishing.' },
      { title: 'Website builder', body: 'A module for generating client website drafts.' },
    ],
    shots: [
      { id: 'dashboard', title: 'Command center', caption: 'Concept design for Rocky\'s command-center dashboard.', frame: 'dashboard', aspect: '3 / 2',
        notes: ['Agency-wide numbers across clients', 'Meta, Google, SEO and social panels', 'Priorities and alerts', 'Ask Rocky prompt bar'] },
    ],
    stack: [
      { group: 'Frontend', items: [{ name: 'React 18' }, { name: 'Vite' }] },
      { group: 'Backend', items: [{ name: 'Node.js' }, { name: 'Express (ESM)' }] },
      { group: 'Database', items: [{ name: 'MongoDB Atlas' }] },
      { group: 'AI / ML', items: [{ name: 'OpenAI GPT-4o' }, { name: 'GPT-4o vision' }, { name: 'Whisper' }] },
      { group: 'Integrations', items: [{ name: 'Meta Marketing API' }, { name: 'Cloudinary' }, { name: 'Skyup CRM (MongoDB)' }] },
    ],
    challenges: [
      { title: 'Letting AI touch ad accounts safely', body: 'Creating campaigns through the API is powerful and risky. Forcing every AI-created campaign into PAUSED keeps a person in control of spend.' },
      { title: 'Joining two systems that don\'t share IDs', body: 'Meta and the CRM describe the same lead differently. Attribution depends on carrying ad-set information into the CRM and matching it reliably.' },
      { title: 'Natural language to database queries', body: 'Plain-English questions are ambiguous. The query engine has to map them onto the CRM\'s real fields and avoid confident answers to questions it can\'t answer.' },
    ],
    results: [
      'In daily use by the Skyup team for campaign setup, CRM questions and the morning update.',
      'Ad spend and lead outcomes now sit side by side at the ad-set level, replacing manual cross-checks between Meta and the CRM.',
      'AI-created campaigns cannot spend until a person approves them: every one is created in a paused state.',
    ],
    links: {},
    pending: [],
  },

  // ───────────────────────────────────────────── 2. SAANVI
  {
    slug: 'saanvi',
    name: 'Saanvi AI — Multilingual Voice Agent',
    tagline: 'A phone agent that listens and speaks in Indian languages, in real time.',
    category: 'Conversational AI / Voice automation',
    filters: ['voice', 'ai-ml'],
    context: 'professional',
    contextNote: 'Built solo at Skyup Digital Solutions',
    visible: true,
    featured: true,
    order: 2,
    summary:
      'Saanvi answers real telephone calls for lead qualification and callbacks. Caller audio streams in over SIP, is transcribed, answered by GPT-4.1-nano and spoken back with streaming text-to-speech, in Indian languages.',
    problem:
      'Businesses in India take calls in many languages. Most voice bots are English-first, slow to respond, and break down on 8 kHz phone audio.',
    contribution:
      'Built the whole pipeline solo: Node.js orchestration connecting telephony, speech recognition, the language model and speech synthesis over WebSockets.',
    overview: [
      'Saanvi is a voice agent for live phone conversations, built with Indian languages and business use cases in mind.',
      'The work is mostly in the plumbing: getting audio from a phone line to speech recognition, to a language model, to speech synthesis, and back to the caller quickly enough to feel like a conversation.',
    ],
    problemContext: [
      'Telephone audio is narrow-band (8 kHz), compressed and noisy, while most speech models expect 16 kHz or higher. Regional-language callers switch languages mid-sentence.',
      'Every stage in the loop adds delay. If the agent takes too long to start speaking, callers talk over it or hang up.',
    ],
    objectives: [
      'Handle inbound calls on a virtual number end to end.',
      'Support Indian-language speech recognition and synthesis.',
      'Stream audio in both directions to keep response time low.',
      'Let callers interrupt the agent without the conversation breaking.',
    ],
    role: [
      'Built the Node.js server that runs the call loop.',
      'Integrated FreJun SIP telephony and virtual-number call handling.',
      'Built the WebSocket audio bridge and the sample-rate conversion between telephony and speech models.',
      'Connected speech recognition, GPT-4.1-nano and streaming TTS into one call loop, evaluating Sarvam (Saaras, Bulbul), Deepgram, ElevenLabs and Gemini Live along the way.',
      'Tuned model choice and generation parameters to cut response latency.',
      'Debugged WebSocket setup sequencing, audio framing and sample-rate conversion in telephony streaming.',
    ],
    solution: [
      'FreJun delivers call audio over a WebSocket. The server converts 8 kHz telephony audio to the sample rate the speech model expects and forwards it for recognition.',
      'Transcribed text goes to GPT-4.1-nano with the conversation state. The reply is sent to Bulbul streaming TTS, and synthesized audio is converted back to telephony format and streamed to the caller chunk by chunk.',
      'Streaming at both ends lets playback start before the full reply is synthesized.',
    ],
    flows: [
      {
        title: 'Call lifecycle',
        caption: 'One conversational turn, from the caller\'s voice to the agent\'s reply.',
        steps: [
          { label: 'Incoming call', detail: 'Virtual number', kind: 'input' },
          { label: 'FreJun telephony', detail: 'SIP → WebSocket audio', kind: 'process' },
          { label: 'Audio processing', detail: '8 kHz resample, chunking', kind: 'process' },
          { label: 'Speech recognition', detail: 'Sarvam Saaras', kind: 'model' },
          { label: 'Conversational model', detail: 'GPT-4.1-nano', kind: 'model' },
          { label: 'Speech synthesis', detail: 'Sarvam Bulbul, streaming', kind: 'model' },
          { label: 'Playback to caller', detail: 'Streamed audio chunks', kind: 'output' },
        ],
      },
    ],
    features: [
      { title: 'Real phone calls', body: 'Works over SIP on a virtual number, not only in a browser demo.' },
      { title: 'Indian-language speech', body: 'Sarvam\'s Saaras and Bulbul models handle regional-language recognition and synthesis.' },
      { title: 'Streaming both ways', body: 'Audio is processed in chunks so the agent can begin speaking before its full reply is ready.' },
      { title: 'Interruptions', body: 'The call loop is designed so a caller speaking over the agent can cut playback.' },
    ],
    shots: [
      { id: 'conversation', title: 'Conversation view', caption: 'Transcript of a call turn by turn.', frame: 'dashboard', aspect: '16 / 10' },
      { id: 'analytics', title: 'Call analytics', caption: 'Call history and metadata.', frame: 'dashboard', aspect: '16 / 10' },
      { id: 'server-logs', title: 'Pipeline logs', caption: 'Server-side view of STT, LLM and TTS events during a call.', frame: 'terminal', aspect: '16 / 9' },
    ],
    stack: [
      { group: 'AI / ML', items: [{ name: 'OpenAI GPT-4.1-nano' }, { name: 'Gemini Live' }] },
      { group: 'Speech', items: [{ name: 'Sarvam AI Saaras (STT)' }, { name: 'Sarvam AI Bulbul (TTS)' }, { name: 'Deepgram' }, { name: 'ElevenLabs' }] },
      { group: 'Integrations', items: [{ name: 'FreJun SIP telephony' }, { name: 'WebSockets' }] },
      { group: 'Backend', items: [{ name: 'Node.js' }] },
    ],
    challenges: [
      { title: '8 kHz telephony audio', body: 'Phone audio has to be resampled up for recognition and back down for playback. Getting this wrong shows up as garbled transcripts or robotic, clipped speech.' },
      { title: 'Latency across four services', body: 'Telephony, STT, LLM and TTS each add delay. Streaming, chunked playback and model tuning brought the language model\'s first token down from about 1.2 s to 0.4 s.' },
      { title: 'Chunking and interruptions', body: 'Chunk too small and audio stutters; too large and the agent feels slow. Barge-in means stopping playback cleanly and discarding the stale reply.' },
      { title: 'Regional-language quality', body: 'Recognition and synthesis quality varies by language, accent and line quality, and needs testing per language.' },
    ],
    results: [
      'Language model first-token latency cut from about 1.2 s to 0.4 s through model selection and generation tuning (measured).',
      'Sub-second conversational turns recorded in testing.',
      'Runs on a real phone number over SIP, not a browser demo.',
    ],
    links: {},
    pending: [],
  },

  // ───────────────────────────────────────────── 3. WASTEWATER
  {
    slug: 'wastewater-ai',
    name: 'Wastewater Management AI',
    tagline: 'Predicting BOD and COD from water-quality readings for sewage treatment monitoring.',
    category: 'AI/ML / Environmental technology / IoT',
    filters: ['ai-ml', 'iot-research'],
    context: 'personal',
    contextNote: 'Built solo · software complete, not yet deployed at plant scale',
    visible: true,
    featured: false,
    order: 7,
    summary:
      'A Python pipeline that takes water-quality readings, predicts BOD and COD with machine learning and shows the results on a Streamlit dashboard. The software is complete; plant-scale deployment has not happened yet.',
    problem:
      'BOD and COD are key measures of treatment quality, but lab tests take hours to days. Operators need a faster signal of how the plant is performing.',
    contribution:
      'Built the software: data processing, the ML prediction workflow, the monitoring dashboard and the ESP32 data-acquisition design.',
    overview: [
      'A monitoring and prediction system for a sewage treatment plant. Parameters that can be measured continuously are used to estimate BOD (biochemical oxygen demand) and COD (chemical oxygen demand), which normally require slower laboratory analysis.',
      'Predictions and readings are presented in a Streamlit dashboard. The software side is finished; it has not yet been deployed with sensors at a working plant.',
    ],
    problemContext: [
      'BOD testing traditionally takes days and COD testing takes hours, so problems in treatment are often seen after the fact.',
      'Sensors can measure some parameters continuously. The question is whether those readings can give a useful estimate of the slower ones.',
    ],
    objectives: [
      'Acquire water-quality readings from sensors through an ESP32.',
      'Clean and prepare readings for modelling.',
      'Train ML models to estimate BOD and COD.',
      'Show live readings and predictions in a simple dashboard.',
      'Raise alerts and support treatment-control decisions.',
    ],
    role: [
      'Designed the ESP32-based data acquisition path for sensor readings.',
      'Built the Python preprocessing and feature pipeline.',
      'Developed the ML prediction workflow for BOD and COD.',
      'Built the Streamlit monitoring dashboard.',
    ],
    solution: [
      'The system is designed for an ESP32 to read connected sensors and send readings to a Python service.',
      'Readings are cleaned (missing values, outliers, units) and turned into model features.',
      'Trained models estimate BOD and COD, and the dashboard displays current readings, predictions and trends over time.',
    ],
    flows: [
      {
        title: 'Sensing to prediction',
        steps: [
          { label: 'Sensors / ESP32', detail: 'Water-quality readings', kind: 'input' },
          { label: 'Data acquisition', detail: 'Readings to Python', kind: 'process' },
          { label: 'Preprocessing', detail: 'Cleaning, features', kind: 'process' },
          { label: 'ML prediction', detail: 'BOD & COD estimates', kind: 'model' },
          { label: 'Streamlit dashboard', detail: 'Live values, trends', kind: 'output' },
        ],
      },
    ],
    features: [
      { title: 'Built for sensor input', body: 'The pipeline is designed to take readings from sensors through an ESP32.' },
      { title: 'BOD and COD estimation', body: 'ML models estimate parameters that normally need lab analysis.' },
      { title: 'Monitoring dashboard', body: 'A Streamlit app shows readings, predictions and trends in one place.' },
      { title: 'Alerts and control logic', body: 'Out-of-range readings raise alerts, and treatment-control logic is built into the pipeline.' },
    ],
    shots: [
      { id: 'dashboard', title: 'Monitoring dashboard', caption: 'Streamlit dashboard with live readings and predictions.', frame: 'browser', aspect: '16 / 10' },
      { id: 'prediction-graphs', title: 'Prediction graphs', caption: 'Predicted BOD / COD over time.', frame: 'plain', aspect: '16 / 9' },
      { id: 'hardware', title: 'Planned sensor node', caption: 'Schematic of the planned ESP32 sensor node.', frame: 'plain', aspect: '4 / 3' },
    ],
    stack: [
      { group: 'AI / ML', items: [{ name: 'Python' }, { name: 'Machine learning (regression)' }] },
      { group: 'Data', items: [{ name: 'Python data processing' }, { name: 'Pandas', verify: true }] },
      { group: 'Frontend', items: [{ name: 'Streamlit' }] },
      { group: 'IoT', items: [{ name: 'ESP32' }, { name: 'Sensor models (planned)', verify: true }] },
    ],
    challenges: [
      { title: 'Noisy real-world readings', body: 'Field sensors drift, drop out and read outliers. Preprocessing has to handle this before any prediction is meaningful.' },
      { title: 'Limited labelled data', body: 'Models need lab-measured BOD and COD values to learn from, and those are slow and expensive to collect.' },
    ],
    results: [
      'Software pipeline, prediction models and dashboard complete, designed for a 100 KLD treatment plant.',
      'Ready for sensor deployment; plant-scale rollout has not happened yet.',
    ],
    links: {},
    pending: [],
  },

  // ───────────────────────────────────────────── FAMILY CONNECT
  {
    slug: 'family-connect',
    name: 'Family Connect — Care@Sant',
    tagline: 'Live visit tracking and updates for families of people receiving home care.',
    category: 'Healthcare / Full-stack platform',
    filters: ['fullstack', 'enterprise'],
    context: 'client',
    contextNote: 'Built solo for a UK home-care client',
    visible: true,
    featured: true,
    order: 3,
    summary:
      'A care-coordination platform for the Care@Sant home-care service. Families see when a caretaker arrives, what was done during the visit and how their relative is doing, without phoning the office.',
    problem:
      'Families of elderly and home-care patients worry between visits and call the care office repeatedly to ask whether the caretaker came and what happened.',
    contribution:
      'Built the platform solo: three role-based dashboards, visit tracking, care records, chat and notifications.',
    overview: [
      'Family Connect is part of Care@Sant, a caregiving service in the UK. It brings patients, families, caretakers and administrators into one system where every visit, care activity and important update is recorded and visible.',
      'The idea is similar to live trip tracking in ride-hailing apps, adapted for home care: families can follow a visit from arrival to completion.',
    ],
    problemContext: [
      'Home care happens out of sight. Families rely on phone calls to find out whether a visit happened and how it went, which is stressful for them and time-consuming for the care office.',
      'Care providers also need a documented record of what care was delivered, by whom and when.',
    ],
    objectives: [
      'Give families real-time visibility into visits and daily care.',
      'Build trust between families, caretakers and the Care@Sant administration.',
      'Reduce repeated calls and manual follow-ups.',
      'Keep a transparent, documented record of care for each patient.',
    ],
    role: [
      'Worked with the client on scope, including the decision to keep an AI care advisor out of all three dashboards.',
      'Designed role-based access so each user sees only what their role allows.',
      'Built the Admin, Caretaker and Patient/Family dashboards.',
      'Built visit check-in and check-out, care-task and medication-support recording, chat and notifications.',
    ],
    solution: [
      'The admin creates a patient profile and care plan, assigns a caretaker and schedules visits.',
      'The caretaker uses a mobile-first dashboard to check in, complete assigned tasks, record medication status, meals and walks, add notes and report concerns, then check out.',
      'Each update appears on the family\'s care timeline with a notification. The admin monitors live visits, reviews records and handles concerns, and can see all conversations for accountability.',
    ],
    flows: [
      {
        title: 'Visit workflow',
        steps: [
          { label: 'Admin', detail: 'Patient profile & care plan', kind: 'input' },
          { label: 'Schedule visit', detail: 'Assign caretaker', kind: 'process' },
          { label: 'Caretaker check-in', kind: 'process' },
          { label: 'Care tasks recorded', detail: 'Meals, medication support, walks, notes', kind: 'store' },
          { label: 'Family notified', detail: 'Timeline & visit status', kind: 'output' },
          { label: 'Admin review', detail: 'Records, concerns, accountability', kind: 'rule' },
        ],
      },
      {
        title: 'Three dashboards, one care record',
        caption: 'Controlled access: each role sees only what it needs.',
        steps: [
          [
            { label: 'Admin dashboard', detail: 'Patients, schedules, live visits, reports, Operations Hub', kind: 'process' },
            { label: 'Caretaker dashboard', detail: 'Mobile-first: schedule, check-in, tasks, notes', kind: 'process' },
            { label: 'Family dashboard', detail: 'Timeline, visits, caretaker, updates', kind: 'process' },
          ],
          { label: 'Shared care record', detail: 'Visits, notes, medication status', kind: 'store' },
        ],
      },
    ],
    features: [
      { title: 'Visit tracking', body: 'Families see caretaker arrival, check-in, check-out and visit completion.' },
      { title: 'Care activity updates', body: 'Caretakers record meals, medication support, walks and assigned tasks.' },
      { title: 'Chat', body: 'Admin, caretakers and families can message each other, with all chats visible to admin.' },
      { title: 'Notifications', body: 'Families get care updates, alerts and visit notifications.' },
      { title: 'Care records', body: 'Patient-specific visit history, care notes, medication status and reports.' },
      { title: 'Operations Hub', body: 'Admin tools for schedules, live visit monitoring, alerts and reports.' },
    ],
    shots: [
      { id: 'admin', title: 'Admin dashboard', caption: 'Live visit monitoring and today\'s schedule.', frame: 'browser', aspect: '16 / 10',
        notes: ['Visits in progress, with check-in times', 'Alerts and concerns raised by caretakers', 'Schedule across caretakers'] },
      { id: 'caretaker', title: 'Caretaker dashboard', caption: 'Mobile-first visit screen with check-in and care tasks.', frame: 'phone', aspect: '9 / 19.5',
        notes: ['Check in and check out', 'Tick off assigned tasks', 'Record medication status and notes'] },
      { id: 'family', title: 'Family dashboard', caption: 'Care timeline for a family member.', frame: 'phone', aspect: '9 / 19.5',
        notes: ['Visit status in real time', 'Care activities as they are recorded', 'Caretaker details and chat'] },
    ],
    stack: [],
    challenges: [
      { title: 'Transparency without oversharing', body: 'Families, caretakers and admins need different views of the same record. Role-based permissions decide what each person can see and do.' },
      { title: 'Designing for caretakers on the move', body: 'Caretakers update records during visits on a phone, so the caretaker dashboard is mobile-first with as few taps as possible.' },
      { title: 'Knowing what not to build', body: 'An AI care advisor was deliberately left out. The platform coordinates care and communication; it doesn\'t replace medical professionals or emergency services.' },
    ],
    results: [
      'Families can follow each visit from check-in to check-out without phoning the care office.',
      'Every visit, task and medication-support note is recorded against the patient, giving Care@Sant a documented care history.',
      'Admin, caretakers and families work from one shared record instead of separate calls and messages.',
    ],
    links: {},
    pending: [],
    disclaimer:
      'Family Connect is a care-coordination and communication platform. It is not a replacement for medical professionals or emergency services.',
  },

  // ───────────────────────────────────────────── 4. SALES & SERVICE
  {
    slug: 'sales-service',
    name: 'Enterprise Sales & Service Management System',
    tagline: 'One configurable workspace for sales, service, invoicing and suppliers.',
    category: 'Enterprise SaaS / Full-stack development',
    filters: ['enterprise', 'fullstack'],
    context: 'client',
    contextNote: 'Built solo for a client · client details withheld',
    visible: true,
    featured: true,
    order: 6,
    summary:
      'A business workflow platform with a configurable management dashboard, separate sales and service records, staff access control, invoicing, supplier invoice distribution over email and WhatsApp, and GRN reminders.',
    problem:
      'Sales, service and purchasing were tracked in separate places, so invoices, supplier follow-ups and goods receipts slipped through the gaps.',
    contribution:
      'Built the whole platform solo, from requirements with the client through design, development and deployment.',
    overview: [
      'A configurable operations platform for a business that runs both sales and after-sales service.',
      'Management chooses which modules appear on the dashboard, staff see what their role allows, and invoices and supplier documents move through the system rather than by hand.',
    ],
    problemContext: [
      'Sales and service have different records, but share customers, products and invoices. Keeping them in spreadsheets and chat threads makes reporting slow and follow-ups easy to miss.',
      'Supplier invoices and Goods Receipt Notes (GRNs) need timely action; missed GRNs delay payments and stock reconciliation.',
    ],
    objectives: [
      'Give management a configurable overview dashboard.',
      'Keep sales and service records separate but connected.',
      'Control who can see and change what.',
      'Generate invoices and send supplier invoices by email and WhatsApp.',
      'Remind the team about pending GRNs.',
    ],
    role: [
      'Gathered requirements directly with the client and mapped their sales, service and purchasing process.',
      'Designed and built every module: dashboard, sales, service, invoicing, suppliers, GRN and access control.',
      'Built the email and WhatsApp delivery for supplier invoices and the GRN reminder schedule.',
      'Deployed the system and supported the client after launch.',
    ],
    solution: [
      'The platform is organised as modules: dashboard, sales, service, invoicing, suppliers, GRN and settings.',
      'Role-based access decides which modules and actions each staff member can use.',
      'Invoices are generated from sales and service records, and supplier invoices can be sent over email or WhatsApp from inside the app. GRN reminders surface pending receipts to the responsible staff.',
    ],
    flows: [
      {
        title: 'Sales and service flow',
        steps: [
          { label: 'Sale or service request', kind: 'input' },
          { label: 'Sales / service record', detail: 'Kept separately', kind: 'store' },
          { label: 'Invoice generation', kind: 'process' },
          { label: 'Reporting', detail: 'Management dashboard', kind: 'output' },
        ],
      },
      {
        title: 'Supplier flow',
        steps: [
          { label: 'Supplier invoice', kind: 'input' },
          [
            { label: 'Email', kind: 'process' },
            { label: 'WhatsApp', kind: 'process' },
          ],
          { label: 'GRN reminder', detail: 'Until receipt is recorded', kind: 'rule' },
          { label: 'Goods received', kind: 'output' },
        ],
      },
    ],
    features: [
      { title: 'Configurable dashboard', body: 'Management picks the modules and summaries they want to see.' },
      { title: 'Separate sales and service', body: 'Distinct records and workflows that still share customers and invoices.' },
      { title: 'Staff access control', body: 'Role-based permissions over modules and actions.' },
      { title: 'Invoices and supplier distribution', body: 'Generate invoices and send supplier invoices by email and WhatsApp.' },
      { title: 'GRN reminders', body: 'Pending goods receipts are surfaced until they are recorded.' },
    ],
    shots: [
      { id: 'dashboard', title: 'Management dashboard', caption: 'Configurable module overview.', frame: 'browser', aspect: '16 / 10' },
      { id: 'sales', title: 'Sales pipeline', caption: 'Sales records and stages.', frame: 'browser', aspect: '16 / 10' },
      { id: 'service', title: 'Service management', caption: 'Service tickets and status.', frame: 'browser', aspect: '16 / 10' },
      { id: 'invoices', title: 'Invoices & suppliers', caption: 'Invoice generation and supplier distribution.', frame: 'browser', aspect: '16 / 10' },
      { id: 'grn', title: 'GRN reminders', caption: 'Pending goods receipts.', frame: 'browser', aspect: '16 / 10' },
      { id: 'access', title: 'Access & settings', caption: 'Staff roles and permissions.', frame: 'browser', aspect: '16 / 10' },
    ],
    stack: [
      { group: 'Integrations', items: [{ name: 'Email' }, { name: 'WhatsApp' }] },
    ],
    challenges: [
      { title: 'Configurable without being confusing', body: 'Letting management toggle modules means every screen has to work with others switched off.' },
      { title: 'Permissions everywhere', body: 'Access rules have to hold across screens, exports and outgoing messages, not only in navigation.' },
    ],
    results: [
      'In day-to-day use by the client\'s team, with no issues raised since launch.',
      'Supplier invoices go out by email and WhatsApp from inside the app instead of by hand.',
      'Pending goods receipts are chased automatically until they\'re recorded.',
    ],
    links: {},
    pending: [],
  },

  // ───────────────────────────────────────────── 5. INSURANCE CRM
  {
    slug: 'insurance-crm',
    name: 'Insurance Management & CRM Platform',
    tagline: 'Customer, family and policy records for insurance advisors, with WhatsApp greetings built in.',
    category: 'Enterprise SaaS / CRM / Automation',
    filters: ['enterprise', 'fullstack'],
    context: 'client',
    contextNote: 'Built solo for a client · details withheld',
    visible: true,
    featured: false,
    order: 8,
    summary:
      'A CRM for insurance advisors covering customer and family profiles, policies, follow-up reminders, and WhatsApp templates for birthday and anniversary greetings.',
    problem:
      'Advisors keep relationships going with timely follow-ups and personal touches, but birthdays, renewals and family details live in notebooks and phone contacts.',
    contribution:
      'Built the platform solo: data model, CRM workflows, family profiles, date-based reminders and WhatsApp templates.',
    overview: [
      'A customer relationship platform shaped around how insurance advisors work: one customer often means a whole family of policyholders and important dates.',
      'The platform keeps customer and family data separate from advisor data, and uses those dates to drive greetings and follow-ups.',
    ],
    problemContext: [
      'An advisor\'s value is the relationship. Remembering a client\'s anniversary or a child\'s birthday matters, but doesn\'t scale by memory.',
      'Customer information (people, dates, policies) and advisor information (who manages whom, templates, schedules) need to be modelled separately.',
    ],
    objectives: [
      'Store customers with their family members and key dates.',
      'Track policies per customer.',
      'Remind advisors about follow-ups.',
      'Manage WhatsApp templates for greetings and engagement.',
    ],
    role: [
      'Worked with the client to model how advisors track customers, families and policies.',
      'Designed the data model separating customer and family data from advisor data.',
      'Built customer, family, policy and follow-up workflows and WhatsApp template management.',
      'Deployed and supported the platform.',
    ],
    solution: [
      'Customers have linked family profiles, each with optional birthday and anniversary dates.',
      'Advisor records are kept apart from customer data and own the follow-ups and templates.',
      'Dates and follow-up rules generate reminders, and WhatsApp templates are prepared for greetings.',
    ],
    flows: [
      {
        title: 'Relationship automation',
        steps: [
          [
            { label: 'Customer & family data', detail: 'Profiles, dates, policies', kind: 'store' },
            { label: 'Advisor data', detail: 'Assignments, templates', kind: 'store' },
          ],
          { label: 'Date & follow-up rules', kind: 'rule' },
          { label: 'Reminder / template', detail: 'WhatsApp', kind: 'process' },
          { label: 'Customer touchpoint', kind: 'output' },
        ],
      },
    ],
    features: [
      { title: 'Family profiles', body: 'Relatives are linked to the main customer, each with their own dates.' },
      { title: 'Policy records', body: 'Policies are tracked per customer.' },
      { title: 'Follow-up reminders', body: 'Advisors see who needs a call or message and when.' },
      { title: 'WhatsApp templates', body: 'Reusable templates for greetings and engagement.' },
    ],
    shots: [
      { id: 'dashboard', title: 'Customer dashboard', caption: 'Overview of customers and upcoming dates.', frame: 'browser', aspect: '16 / 10' },
      { id: 'family', title: 'Customer & family profile', caption: 'A customer with linked family members.', frame: 'browser', aspect: '16 / 10' },
      { id: 'policies', title: 'Policy management', caption: 'Policies per customer.', frame: 'browser', aspect: '16 / 10' },
      { id: 'templates', title: 'WhatsApp templates', caption: 'Greeting template management.', frame: 'browser', aspect: '16 / 10' },
    ],
    stack: [
      { group: 'Integrations', items: [{ name: 'WhatsApp templates' }] },
    ],
    challenges: [
      { title: 'Modelling families', body: 'One customer, many related people, each with their own dates and possibly policies — without duplicating records.' },
      { title: 'Consent and messaging rules', body: 'Automated WhatsApp messaging has template approval and opt-in requirements that shape what can be sent and when.' },
    ],
    results: [
      'Birthdays and anniversaries for customers and each family member surface automatically, so advisors never have to remember them.',
      'Customer, family and policy records live in one place instead of notebooks and phone contacts.',
    ],
    links: {},
    pending: [],
  },

  // ───────────────────────────────────────────── SKYUP WEBSITE
  {
    slug: 'skyup-website',
    name: 'Skyup Digital Solutions Website',
    tagline: 'A cinematic, scroll-driven agency site built with React 19, Vike SSR and Three.js.',
    category: 'Web development / Creative frontend',
    filters: ['fullstack'],
    context: 'professional',
    contextNote: 'Skyup\'s own site · built solo',
    visible: true,
    featured: true,
    order: 5,
    summary:
      'The redesigned skyupdigitalsolutions.com: a server-rendered React site with a 3D street homepage, an orbiting-planet services page, a space-themed About story and a Works page, all driven by scroll.',
    problem:
      'Agency sites tend to look the same. Skyup wanted a site that shows its creative and technical ability the moment it loads, without giving up SEO or speed.',
    contribution:
      'Designed and built the whole site solo: every page, the 3D and scroll animation system, performance work and deployment.',
    overview: [
      'A full redesign of Skyup\'s marketing website around a dark "cosmic" visual world. Each page tells its part of the story through scroll: walking down a 3D street of service shops, orbiting through service planets, floating through the Skyup universe.',
      'The site is server-rendered with Vike so content stays indexable while the heavy visuals load on the client.',
    ],
    problemContext: [
      'For a digital agency, the website is the portfolio. It needs to feel premium, but it also has to rank in search and stay fast on phones.',
      'Heavy 3D and scroll animation are easy to get wrong: pinned sections fight each other, bundles grow, and mobile layouts break.',
    ],
    objectives: [
      'Create a distinctive, story-driven experience on every main page.',
      'Keep pages server-rendered for SEO.',
      'Keep animation smooth and bundle sizes under control.',
      'Make every page work on mobile and laptop screens.',
    ],
    role: [
      'Built pages and sections for the homepage, Services, About and Works.',
      'Worked on the GSAP scroll system, fixing pin conflicts by flattening nested components into siblings.',
      'Built the Google Reviews section as a curved U-shaped slider and fixed case-study audio on the homepage.',
      'Rebuilt the Services page mobile modal using a React portal with a reliable scroll lock.',
      'Cut the Services page bundle by replacing a wildcard icon import (about 5.6 MB) with named imports.',
      'Fixed global scroll restoration between routes and an About page background bug.',
    ],
    solution: [
      'Vike provides server-side rendering and file-based routing for React 19. Three.js renders the 3D scenes, GSAP ScrollTrigger drives pinned, scroll-linked sequences, and Lenis smooths scrolling.',
      'Pinned sections were restructured as siblings rather than nested components so ScrollTrigger calculates positions correctly.',
      'Performance work was held to a strict rule: implementation-only changes with zero visual difference.',
    ],
    flows: [
      {
        title: 'Page rendering and animation',
        steps: [
          { label: 'Vike SSR', detail: 'Server-rendered HTML', kind: 'process' },
          { label: 'Hydration', detail: 'React 19', kind: 'process' },
          [
            { label: 'Three.js scenes', detail: '3D street, planets', kind: 'model' },
            { label: 'GSAP + Lenis', detail: 'Scroll-linked pins', kind: 'model' },
          ],
          { label: 'Story-driven page', kind: 'output' },
        ],
      },
    ],
    features: [
      { title: '3D street homepage', body: 'Services presented as shopfronts along a lit street you move through by scrolling.' },
      { title: 'Orbiting services', body: 'Each service is a planet in orbit around the Skyup logo.' },
      { title: 'About as a journey', body: 'An astronaut scroll story introducing the Skyup universe.' },
      { title: 'Works page', body: 'Case studies presented as missions.' },
      { title: 'Curved reviews slider', body: 'Google reviews on a U-shaped curved track.' },
      { title: 'Server-rendered', body: 'Vike SSR keeps pages indexable.' },
    ],
    shots: [
      { id: 'home', title: 'Homepage', caption: 'The 3D street hero, with services as shopfronts.', frame: 'browser', aspect: '1900 / 908',
        notes: ['Three.js street scene', 'Slide indicator for each service', 'Scroll-driven transitions'] },
      { id: 'services', title: 'Services', caption: 'Services orbiting the Skyup logo.', frame: 'browser', aspect: '1900 / 908',
        notes: ['Each planet opens a service', 'Mobile uses a portal-based modal'] },
      { id: 'about', title: 'About', caption: 'The start of the About page scroll story.', frame: 'browser', aspect: '1900 / 908' },
      { id: 'works', title: 'Works', caption: 'Works page hero. The figures shown are the agency\'s own.', frame: 'browser', aspect: '1900 / 908' },
    ],
    stack: [
      { group: 'Frontend', items: [{ name: 'React 19' }, { name: 'Vike (SSR)' }, { name: 'Tailwind CSS' }] },
      { group: 'Animation & 3D', items: [{ name: 'Three.js' }, { name: 'GSAP' }, { name: 'Lenis' }] },
    ],
    challenges: [
      { title: 'Pinned sections fighting each other', body: 'Nested pinned components made ScrollTrigger miscalculate offsets. Flattening them into siblings fixed the ordering.' },
      { title: 'A 5.6 MB page', body: 'A wildcard icon import pulled an entire icon library into the Services page. Switching to named imports removed it.' },
      { title: 'Performance without visual change', body: 'Optimisations had to leave animation and design exactly as they were, so the work focused on how things load and render, not what they look like.' },
    ],
    results: [
      'Live as the agency\'s main website at skyupdigitalsolutions.com.',
      'Removed a roughly 5.6 MB wildcard icon import from the Services page bundle.',
      'Performance fixes shipped with zero visual or animation change.',
    ],
    links: { live: 'https://skyupdigitalsolutions.com' },
    pending: [],
  },

  // ───────────────────────────────────────────── 8. MARKSHEET SCANNER
  {
    slug: 'marksheet-scanner',
    name: 'AI Marksheet & Document Scanner',
    tagline: 'Photograph a handwritten marksheet, get checked, structured marks back.',
    category: 'Mobile application / Computer vision',
    filters: ['ai-ml', 'fullstack'],
    context: 'client',
    contextNote: 'Built solo for a client',
    visible: true,
    featured: true,
    order: 4,
    summary:
      'An Android app with its own backend that reads marks from photographed handwritten documents, checks the arithmetic, and exports the results to Excel, CSV, PDF or Word.',
    problem:
      'Teachers and offices copy marks from handwritten sheets into spreadsheets by hand. It\'s slow, and one misread digit breaks a total.',
    contribution:
      'Built the Android app, the Node.js backend and the extraction pipeline solo, including billing and admin controls.',
    overview: [
      'A document-intelligence app focused on marksheets and similar handwritten records. It captures an image, extracts fields and marks with vision models, and validates the numbers before anything is exported.',
      'It is built as a product, not just a demo: model calls go through a backend, users have usage limits and credits, and admins control access.',
    ],
    problemContext: [
      'Marksheets vary by institution and are often handwritten, so a fixed-position OCR template breaks quickly.',
      'Extraction mistakes are costly: a wrong mark can change a result. People need to see which numbers look wrong before they trust the output.',
    ],
    objectives: [
      'Extract marks and fields from photographed handwritten documents.',
      'Handle different layouts through templates.',
      'Catch arithmetic inconsistencies before export.',
      'Export to the formats people already use.',
      'Keep API keys off the device and control usage.',
    ],
    role: [
      'Built the Android app in Kotlin with CameraX for capture.',
      'Built the Node.js backend that proxies all model requests, so no API keys live in the app.',
      'Designed the template-aware, two-pass extraction: detect the fields first, then extract the values.',
      'Added arithmetic validation that flags subtotals and totals that don\'t add up.',
      'Built exports to Excel, CSV, PDF and Word, plus usage limits, credit billing, push notifications and admin access controls.',
    ],
    solution: [
      'The app captures the document with CameraX and sends it to the backend. The backend runs a first pass to detect the fields and layout against a template, then a second pass to extract values.',
      'Vision models (Gemini and OpenAI) and Azure Document Intelligence handle recognition. Extracted marks are summed and compared against the written subtotals and totals, and mismatches are flagged for a person to check.',
      'Reviewed results export to Excel, CSV, PDF or Word.',
    ],
    flows: [
      {
        title: 'Two-pass extraction with validation',
        steps: [
          { label: 'Capture', detail: 'Kotlin + CameraX', kind: 'input' },
          { label: 'Backend proxy', detail: 'Node.js · keys server-side', kind: 'process' },
          { label: 'Pass 1: field detection', detail: 'Template-aware', kind: 'model' },
          { label: 'Pass 2: value extraction', detail: 'Gemini / OpenAI / Azure DI', kind: 'model' },
          { label: 'Arithmetic check', detail: 'Totals vs. subtotals', kind: 'rule' },
          { label: 'Review & export', detail: 'Excel · CSV · PDF · Word', kind: 'output' },
        ],
      },
    ],
    features: [
      { title: 'Handwriting extraction', body: 'Reads marks and fields from photos of handwritten documents.' },
      { title: 'Two-pass, template-aware', body: 'Finds the fields first, then reads the values, so different layouts work.' },
      { title: 'Arithmetic validation', body: 'Flags totals that don\'t match their parts for human review.' },
      { title: 'Four export formats', body: 'Excel, CSV, PDF and Word.' },
      { title: 'Usage and billing', body: 'Per-user limits, credit billing and push notifications.' },
      { title: 'Admin controls', body: 'Administrative access over users and usage.' },
    ],
    shots: [
      { id: 'capture', title: 'Scanning screen', caption: 'Capturing a marksheet.', frame: 'phone', aspect: '9 / 19.5' },
      { id: 'result', title: 'Extracted fields', caption: 'Structured extraction result.', frame: 'phone', aspect: '9 / 19.5' },
      { id: 'home', title: 'Home screen', caption: 'App home.', frame: 'phone', aspect: '9 / 19.5' },
    ],
    stack: [
      { group: 'Mobile', items: [{ name: 'Kotlin' }, { name: 'CameraX' }] },
      { group: 'Backend', items: [{ name: 'Node.js' }] },
      { group: 'AI / ML', items: [{ name: 'Gemini' }, { name: 'OpenAI' }, { name: 'Azure Document Intelligence' }] },
    ],
    challenges: [
      { title: 'Handwriting and layout variety', body: 'Fixed positions don\'t survive different institutions and handwriting. Splitting field detection from value extraction made layouts manageable.' },
      { title: 'Trusting the numbers', body: 'Vision models can misread a digit. Checking the arithmetic turns silent errors into visible flags.' },
      { title: 'Shipping safely', body: 'Moving every model call behind a backend proxy keeps keys off the device and makes usage limits and billing possible.' },
    ],
    results: [
      'Every extracted total is checked against its parts, so inconsistent marks are flagged before export instead of discovered later.',
      'No model API keys ship inside the app; all requests go through the backend.',
      'Exports straight to Excel, CSV, PDF and Word.',
    ],
    links: {},
    pending: [],
  },

  // ───────────────────────────────────────────── 9. SDN
  {
    slug: 'sdn-classification',
    name: 'SDN Network Traffic Classification',
    tagline: 'Classifying network flows with a decision tree inside an SDN controller.',
    category: 'Machine learning / Networking',
    filters: ['ai-ml', 'iot-research'],
    context: 'academic',
    contextNote: 'B.E. project · built solo',
    visible: true,
    featured: false,
    order: 9,
    summary:
      'Traffic generated in a Mininet topology is observed by a Ryu SDN controller, turned into flow features and classified with scikit-learn\'s DecisionTreeClassifier.',
    problem: 'Networks treat all traffic alike unless they know what it is. Software-defined networking makes it possible to classify flows centrally and act on them.',
    contribution: 'Built everything solo: the emulated network, controller integration, feature extraction and classifier.',
    overview: ['A research project combining SDN and machine learning: the controller sees flows, a model labels them.'],
    problemContext: ['In SDN the controller has a global view of flows, which makes it a natural place to classify traffic.'],
    objectives: ['Emulate a network with Mininet.', 'Collect flow statistics through a Ryu controller.', 'Train and test a decision tree classifier on flow features.'],
    role: ['Topology and traffic generation in Mininet.', 'Ryu controller application for flow statistics.', 'Feature engineering and model training in Python.'],
    solution: ['Mininet hosts generate traffic; the Ryu controller collects flow statistics, converts them to features, and a trained DecisionTreeClassifier labels each flow.'],
    flows: [
      {
        title: 'Classification workflow',
        steps: [
          { label: 'Mininet topology', detail: 'Emulated hosts & switches', kind: 'input' },
          { label: 'Ryu controller', detail: 'Flow statistics', kind: 'process' },
          { label: 'Feature extraction', kind: 'process' },
          { label: 'DecisionTreeClassifier', detail: 'scikit-learn', kind: 'model' },
          { label: 'Traffic class', kind: 'output' },
        ],
      },
    ],
    features: [
      { title: 'Emulated testbed', body: 'Repeatable experiments in Mininet.' },
      { title: 'Controller integration', body: 'Classification driven from Ryu flow data.' },
      { title: 'Interpretable model', body: 'A decision tree makes it clear which features drive each classification.' },
    ],
    shots: [
      { id: 'topology', title: 'Network topology', caption: 'Mininet topology.', frame: 'plain', aspect: '16 / 10' },
      { id: 'controller', title: 'Controller output', caption: 'Ryu controller logs.', frame: 'terminal', aspect: '16 / 9' },
      { id: 'evaluation', title: 'Model evaluation', caption: 'Classifier evaluation.', frame: 'plain', aspect: '16 / 10' },
    ],
    stack: [
      { group: 'Networking', items: [{ name: 'Mininet' }, { name: 'Ryu SDN controller' }] },
      { group: 'AI / ML', items: [{ name: 'Python' }, { name: 'scikit-learn DecisionTreeClassifier' }] },
    ],
    challenges: [{ title: 'Emulation vs reality', body: 'Mininet traffic is cleaner than real networks, so results describe the testbed, not production traffic.' }],
    results: [
      'Classifies live flows straight from the Ryu controller\'s flow statistics in an emulated network.',
      'Uses an interpretable decision tree, so every classification can be traced to the features behind it.',
    ],
    links: {},
    pending: [],
  },

  // ───────────────────────────────────────────── 11. SKYUP
  {
    slug: 'skyup',
    name: 'Skyup Digital Solutions — Founder',
    tagline: 'AI/ML Developer and team lead: client projects, internal AI tools and end-to-end delivery.',
    category: 'Professional work / Founder',
    filters: ['enterprise', 'voice', 'fullstack'],
    context: 'professional',
    contextNote: 'Founder · Bengaluru digital marketing & AI automation agency',
    visible: true,
    featured: false,
    order: 11,
    summary:
      'AI/ML Developer and Team Lead at Skyup Digital Solutions LLP. I lead AI development, work with clients directly and build and ship the software myself.',
    problem: 'Small and mid-sized businesses want AI and automation, but need someone who understands both the business and the build.',
    contribution: 'Client strategy, AI consulting and hands-on development, from first call to deployment.',
    overview: [
      'Skyup is a Bengaluru-based digital marketing and AI automation agency offering SEO, PPC, social media, web development, CRM software and AI automation.',
      'As AI/ML Developer and Team Lead, I work with clients directly: understanding their business, recommending where AI and automation fit, and then building and deploying it.',
      'Rocky, the Skyup website, Saanvi and several client systems on this page have their own case studies.',
    ],
    problemContext: ['Agency work spans many industries, each with its own workflows, data and constraints.'],
    objectives: ['Give clients a clear AI strategy tied to real business outcomes.', 'Build the systems that deliver it.', 'Run the agency itself on internal tools rather than manual work.'],
    role: [
      'Lead AI development and work with clients directly, translating business problems into software.',
      'Design, build and deploy client systems end to end.',
      'Built the agency\'s internal tools: Rocky, automated ad reporting, CRM lead nurturing, an SEO and GEO tracker, a project tracker and a reminders bot.',
    ],
    solution: [
      'Client engagements start with the business problem and end with deployed software: CRMs, voice agents, automation, dashboards and websites.',
      'Internally, the agency runs on tools I built, so reporting, lead follow-up and daily updates happen automatically.',
    ],
    flows: [],
    features: [
      { title: 'AI consulting for clients', body: 'Advising on where AI and automation should, and shouldn\'t, be used in a client\'s business.' },
      { title: 'Automated ad reporting', body: 'Meta Ads data stored in Supabase, with GPT-4o-mini insights and daily and weekly PDF reports and alerts.' },
      { title: 'CRM lead nurturing', body: 'Five WhatsApp nurture tracks triggered by lead status, sent only within business hours.' },
      { title: 'SEO & GEO tracker', body: 'Search Console and AI-search visibility tracking for clients.' },
      { title: 'Project tracker & reminders', body: 'Internal project tracking and a Telegram reminders bot.' },
      { title: 'Client systems', body: 'CRMs, voice agents, dashboards and websites built and deployed for clients.' },
    ],
    shots: [{ id: 'overview', title: 'Work areas', caption: 'The kinds of work delivered at Skyup.', frame: 'browser', aspect: '16 / 10' }],
    stack: [
      { group: 'Backend', items: [{ name: 'Node.js' }, { name: 'Express' }] },
      { group: 'Database', items: [{ name: 'MongoDB Atlas' }, { name: 'Supabase' }] },
      { group: 'Cloud', items: [{ name: 'AWS EC2' }, { name: 'PM2' }, { name: 'Docker' }] },
      { group: 'Integrations', items: [{ name: 'Meta Marketing API' }, { name: 'WhatsApp Business API' }, { name: 'MSG91' }, { name: 'OpenAI' }] },
    ],
    challenges: [
      { title: 'Business and build at once', body: 'Being the person who both advises the client and writes the code means strategy stays grounded in what can actually be built.' },
    ],
    results: [
      'Agency reporting, lead follow-up and daily updates run on in-house tools rather than manual work.',
      'Clients get technical advice and hands-on delivery from the same person, with no hand-off between the two.',
    ],
    links: { other: [{ label: 'skyupdigitalsolutions.com', url: 'https://skyupdigitalsolutions.com' }] },
    pending: [],
  },

  // ───────────────────────────────────────────── 12. QUINT EDGE (hidden)
  {
    slug: 'quint-edge',
    name: 'Quint Edge AI',
    tagline: 'AI product and web development.',
    category: 'AI solutions / Business technology',
    filters: ['ai-ml', 'fullstack'],
    context: 'review',
    visible: false, // flip to true when you're ready to publish
    featured: false,
    order: 12,
    summary: 'AI product and web development work under Quint Edge AI.',
    problem: 'To be added.',
    contribution: 'To be added.',
    overview: ['To be added.'],
    problemContext: ['To be added.'],
    objectives: ['To be added.'],
    role: ['To be added.'],
    solution: ['To be added.'],
    flows: [],
    features: [],
    shots: [{ id: 'main', title: 'Main screen', caption: 'Primary interface.', frame: 'browser', aspect: '16 / 10' }],
    stack: [],
    challenges: [],
    results: [],
    links: {},
    pending: ['All details; set visible: true to publish'],
  },
]

export const projects = projectList.filter((p) => p.visible).sort((a, b) => a.order - b.order)
export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
