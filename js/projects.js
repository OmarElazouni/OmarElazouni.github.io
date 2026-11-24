/* Case-study content for the featured projects.
   `shots` lists screenshots in assets/img/<id>/. Missing files are skipped automatically. */
window.PROJECTS = {
  erp: {
    title: "Enterprise ERP Suite",
    cover: "assets/img/erp/warehouse-dashboard.webp",
    flow: [
      { t: "CashFlow", d: "Projects & sales orders, cash in/out" },
      { t: "Warehouse", d: "Stock ledger, requests, deliveries" },
      { t: "AI Advisor", d: "Claude suggests transfers & purchases" },
      { t: "Quotation", d: "Schedules → schematics, I/O, BOM" }
    ],
    html: `
      <p class="lead">An engineering contractor was running stock, cash and quotations on scattered Excel workbooks. I designed and built three connected web apps that replaced them with audited, role-based workflows — and used LLMs where they remove real manual work, never where they could move money or stock on their own.</p>

      <div class="metric-grid">
        <div class="metric"><b>3</b><span>production apps, one design system</span></div>
        <div class="metric"><b>62</b><span>Postgres tables, row-level security on every one</span></div>
        <div class="metric"><b>230+</b><span>database functions — every stock change is transactional</span></div>
        <div class="metric"><b>170+</b><span>API endpoints</span></div>
        <div class="metric"><b>80%</b><span>test-coverage gate in CI</span></div>
      </div>

      <h3>How the apps connect</h3>
      {{flow}}

      <div class="module">
        <h3>1 · Warehouse Management System</h3>
        <p>Multi-site stock control with a full movement ledger: project material requests from reservation through scan-checked delivery, purchasing and reorder, transfers between sites, stock counts, returns, FIFO batches and serial numbers.</p>
        <ul>
          <li><b>AI Warehouse Advisor</b> — sends Claude 13 weeks of shipments, days-of-cover and what other sites can spare; Claude proposes transfers and purchases. Every suggestion is re-checked against the real numbers before it is shown, and accepting one only creates a <em>draft</em>. Per-user and per-company rate limits plus caching keep cost predictable.</li>
          <li><b>Works on the warehouse floor</b> — installable PWA with offline counting and receiving, camera barcode/QR scanning (ZXing WebAssembly) and a kiosk print station for thermal labels.</li>
          <li><b>45 screens</b> — dashboard, requests, deliveries, purchase orders, inventory, counts, transfers, serials, alerts, 6 report types, audit log and printable documents. Fully bilingual English/Arabic with right-to-left layout.</li>
          <li><b>Built to be trusted</b> — 40 tables, ~205 Postgres functions, 80 migrations, ~139 API handlers; tested with Vitest, pgTAP, Supertest and Playwright; Docker images with blue-green deploys from GitHub Actions and nightly backups.</li>
        </ul>
        <div class="chips"><span class="chip">Next.js 16</span><span class="chip">React 19</span><span class="chip">Tailwind 4</span><span class="chip">Express 5</span><span class="chip">zod</span><span class="chip">Supabase / Postgres 17</span><span class="chip">Claude API</span><span class="chip">Playwright</span><span class="chip">Docker</span><span class="chip">GitHub Actions</span></div>
        {{gallery:warehouse}}
      </div>

      <div class="module">
        <h3>2 · CashFlow</h3>
        <p>Replaces a four-tab cash-flow workbook (Cash In, Cash Out, Cash Position, Summary) with a multi-user app that keeps a full audit trail.</p>
        <ul>
          <li>Collections with instalments, overdue tracking, notes receivable and cheques, petty cash, loans and multi-currency transfers.</li>
          <li>Daily cash position and per-project dashboards with charts.</li>
          <li>Admin approval workflow for sensitive changes (date changes, write-offs, deletions) and a complete audit log.</li>
          <li>Excel round-trip in the finance team's original template, so adoption didn't require new habits.</li>
          <li>22 tables, 90 migrations, 3 roles (admin, cash-in, cash-out); it is the source of the project and sales-order list the Warehouse app reads.</li>
        </ul>
        <div class="chips"><span class="chip">Next.js server actions</span><span class="chip">Supabase / Postgres</span><span class="chip">Recharts</span><span class="chip">SheetJS</span><span class="chip">Docker</span></div>
        {{gallery:cashflow}}
      </div>

      <div class="module">
        <h3>3 · BMS Quotation Engine</h3>
        <p>Turns a building's equipment schedule into the full set of deliverables for a Building Management System quotation — work that used to take engineers days.</p>
        <ul>
          <li>Generates a control schematic per equipment item (PNG/PDF/JSON), a consolidated I/O list, panel allocation with a hardware bill of materials, and a building architecture/riser drawing.</li>
          <li><b>Claude reading</b> — converts messy inputs (PDF schedules, scanned or photographed drawings, custom workbooks) into the standard input format. Model choice (Opus / Sonnet / Haiku) is a setting, and the app still works fully offline without a key.</li>
          <li>Never guesses: unclear input raises an entry in an <em>open-questions register</em> for the engineer.</li>
          <li>Versioned JSON-schema contract, 36 endpoints, ~30 test modules, CLI + web UI. Largest run: 400 equipment items in about 4.5 minutes.</li>
        </ul>
        <div class="chips"><span class="chip">Python</span><span class="chip">FastAPI</span><span class="chip">pandas</span><span class="chip">matplotlib</span><span class="chip">pdfplumber</span><span class="chip">jsonschema</span><span class="chip">Claude API</span></div>
        {{gallery:bms}}
      </div>

      <p class="note">Built for a private client; company names, live URLs and client data are omitted. Screenshots come from separate demo databases with made-up data; all amounts and counts are blurred and company branding is hidden.</p>
    `,
    galleries: {
      warehouse: [
        ["warehouse-dashboard.webp", "Dashboard — stock health and pending work"],
        ["warehouse-requests.webp", "Project material requests through their whole cycle"],
        ["warehouse-advisor.webp", "Warehouse Advisor (demo mode shown; live mode calls Claude)"],
        ["warehouse-inventory.webp", "Inventory with per-site balances and stock value"],
        ["warehouse-item.webp", "Item page: stock per site, FIFO batches, QR label"],
        ["warehouse-reorder.webp", "Reorder: below-minimum items, buy or transfer"],
        ["warehouse-dashboard-ar.webp", "Arabic right-to-left interface"]
      ],
      cashflow: [
        ["cashflow-summary.webp", "Executive summary: actuals vs forecast"],
        ["cashflow-position.webp", "Daily cash position across accounts"],
        ["cashflow-cashin.webp", "Cash In: collections and instalments"],
        ["cashflow-cashout.webp", "Cash Out: payments by account and project"],
        ["cashflow-projects.webp", "Projects: the whole sales-order book"],
        ["cashflow-approvals.webp", "Approvals for sensitive changes"]
      ],
      bms: [
        ["bms-quotation.webp", "Quotation result: points, panels, open questions"],
        ["bms-schematic.webp", "Auto-generated AHU control schematic"],
        ["bms-architecture.webp", "Auto-generated building riser drawing"],
        ["bms-run.webp", "New quotation: template, PDF extraction and Claude reading"]
      ]
    }
  },

  theftguard: {
    title: "TheftGuard — AI Store Surveillance",
    cover: "assets/img/theftguard/theftguard-alerts.webp",
    flow: [
      { t: "RTSP cameras", d: "Reader thread per camera, auto-reconnect" },
      { t: "Detect & track", d: "YOLO26m + BoT-SORT" },
      { t: "Pose", d: "YOLO11-pose, 85 body features" },
      { t: "Behaviour", d: "3× BiGRU ensemble, vote window" },
      { t: "Alert", d: "Snapshot + clip → Telegram" }
    ],
    html: `
      <p class="lead">Small retail stores already have CCTV, but nobody is watching it. TheftGuard is a packaged Windows product that turns those cameras into an AI guard: it flags suspicious behaviour, detects fire and smoke early, counts visitors at the door and sends alerts with video evidence to the owner's phone.</p>

      <div class="metric-grid">
        <div class="metric"><b>0</b><span>fire/smoke false alarms over 7.95 h from 9 real store cameras</span></div>
        <div class="metric"><b>5 / 5</b><span>fire test videos detected</span></div>
        <div class="metric"><b>4 s</b><span>smoke alarm before the first visible flame</span></div>
        <div class="metric"><b>24 / 24</b><span>door crossings counted on a 26-min test video</span></div>
        <div class="metric"><b>11.6/s</b><span>AI checks per camera (1080p, RTX 5070 Laptop)</span></div>
      </div>

      <h3>Pipeline</h3>
      {{flow}}

      <h3>Engineering highlights</h3>
      <ul>
        <li><b>Behaviour, not objects.</b> Each tracked person is cropped, run through a pose model and turned into 85 body features sampled every 0.18 s. An ensemble of three bidirectional GRUs scores 32-sample windows, and an alert needs several positive votes in a sliding window — then a per-person cool-down — so one odd frame never triggers an alarm.</li>
        <li><b>One GPU, many cameras.</b> A single GPU worker schedules all inference: live cameras get priority at up to 12 fps, uploaded videos use the remaining capacity. Reader threads keep only the newest frame and reconnect with exponential back-off.</li>
        <li><b>Fire &amp; smoke</b> with a dedicated YOLO26s model checked about once a second and confirmed over a short voting window, tuned on long real-store footage to keep false alarms at zero.</li>
        <li><b>Visitor counting</b> — draw an in/out line at any angle over the live view; people are counted when their feet cross it, with a filter that removes false counts from hidden legs. Hourly and daily totals.</li>
        <li><b>Evidence-first alerts</b> — every alert stores a snapshot and an MP4 clip from 8 s before to 2 s after; Telegram gets the first alert instantly, then 5-minute summaries to avoid spam.</li>
        <li><b>Shippable product</b> — Inno Setup installer with bundled Python, runs as a Windows service under a limited account, self-restarts after GPU errors; Admin and Operator roles, login lockout, Arabic/English UI; 125 commits and 28 test files.</li>
        <li><b>Profiling-driven tuning</b> — e.g. disabling the tracker's camera-motion compensation saved ~27 ms per call on static CCTV; a longer track buffer raised median track life from 2.5 s to 3.2 s.</li>
      </ul>
      <div class="chips"><span class="chip">PyTorch (CUDA 12.8)</span><span class="chip">Ultralytics YOLO26 / YOLO11-pose</span><span class="chip">BoT-SORT</span><span class="chip">BiGRU</span><span class="chip">OpenCV</span><span class="chip">FFmpeg</span><span class="chip">FastAPI</span><span class="chip">React + Vite</span><span class="chip">SQLite</span><span class="chip">Telegram Bot API</span></div>

      <h3>Screens</h3>
      {{gallery:main}}

      <p class="note">Camera footage, counts and scores are blurred; camera addresses are masked.</p>
    `,
    galleries: {
      main: [
        ["theftguard-alerts.webp", "Alerts with snapshot, score and clip"],
        ["theftguard-alerts-ar.webp", "Arabic right-to-left interface"],
        ["theftguard-visitors.webp", "People counter: in/out crossings on a recording"],
        ["theftguard-videos.webp", "Uploaded video analysis with alert timeline"],
        ["theftguard-cameras.webp", "Camera setup: theft, gate counting, fire, clips"]
      ]
    }
  },

  fortress: {
    title: "Fortress Gate — Smart Security Gate",
    cover: "assets/img/fortress/fortress-blocked.webp",
    flow: [
      { t: "Gate photo", d: "Camera frame or upload" },
      { t: "Plate detector", d: "YOLO11s @ 960 px" },
      { t: "Character detector", d: "YOLO11n, 1 class" },
      { t: "Character reader", d: "Custom 290k-param CNN, 26 classes" },
      { t: "Decision engine", d: "Approved · not approved · blocked · blacklisted" }
    ],
    html: `
      <p class="lead">A security platform for residential compounds. Guards scan cars and visitor ID cards at the gate; the system reads the Egyptian Arabic licence plate, checks it against residents, visitors and blacklists, and returns a decision in under a second. Residents, guards and admins each get their own portal.</p>

      <h3>The problem: Arabic plates</h3>
      <p>The first version used a vision-language model (Qwen3-VL-4B) to read plates. Benchmarking showed it simply couldn't read Arabic-Indic digits: <b>6.7%</b> whole-plate accuracy. I built a dedicated three-stage reader instead.</p>

      <div class="metric-grid">
        <div class="metric"><b>99.8%</b><span>single-character accuracy (1,464 / 1,467)</span></div>
        <div class="metric"><b>90.1%</b><span>full-photo plate accuracy on 262 held-out photos</span></div>
        <div class="metric"><b>95.3%</b><span>accuracy from a cropped plate</span></div>
        <div class="metric"><b>0.995</b><span>plate-detector mAP50</span></div>
        <div class="metric"><b>13×</b><span>more accurate than the VLM baseline</span></div>
      </div>

      <h3>Plate-reading pipeline</h3>
      {{flow}}

      <h3>Engineering highlights</h3>
      <ul>
        <li><b>Leak-free evaluation</b> — train/test splits grouped by plate text so the same car never appears in both; labels rebuilt from the raw dataset and rare characters oversampled.</li>
        <li><b>Right-to-left logic</b> — characters are sorted spatially, Arabic-Indic digits normalised and letters ordered right-to-left before matching.</li>
        <li><b>Swappable reader</b> — the app's plate-reader interface supports mock, VLM, local ONNX and other back-ends, so the trained models dropped in without touching the gate logic.</li>
        <li><b>Full product</b> — pnpm monorepo with a Next.js web app, an Android app and a shared UI package; Supabase (Postgres, Auth, Storage, Realtime) with row-level security isolating each compound's data.</li>
        <li><b>Gate features</b> — resident phone + one-time-code login, guard kiosk with PIN and permission levels, ID-card OCR, visitor tracking with overstay flagging, blacklist management, unit-tested decision engine.</li>
      </ul>
      <div class="chips"><span class="chip">PyTorch</span><span class="chip">Ultralytics YOLO11</span><span class="chip">Custom CNN</span><span class="chip">ONNX Runtime</span><span class="chip">Next.js</span><span class="chip">Android</span><span class="chip">Supabase</span><span class="chip">Docker</span></div>

      <h3>Gate decisions &amp; screens</h3>
      {{gallery:main}}

      <p class="note">Trained on the EALPR Egyptian plate dataset (Youssef et al., ACIRS 2022). Licence plates are blurred; boxes and confidences come from the trained plate detector. App screens use the project's test fixture, with phone and plate numbers blurred.</p>
    `,
    galleries: {
      main: [
        ["fortress-approved.webp", "Plate detected → approved"],
        ["fortress-not-approved.webp", "Plate detected → not approved"],
        ["fortress-blocked.webp", "Plate detected → blocked"],
        ["fortress-blacklisted.webp", "Plate detected → blacklisted"],
        ["fortress-guard.webp", "Guard kiosk: alerts, quick entry types, today's activity"],
        ["fortress-entry.webp", "Visitor entry: QR permit or plate / ID scan"],
        ["fortress-events.webp", "Admin: tamper-proof access log with each decision"],
        ["fortress-approvals.webp", "Admin: approval queue for out-of-hours entries"],
        ["fortress-rules.webp", "Admin: access windows per category"],
        ["fortress-residents.webp", "Admin: residents and units"]
      ]
    }
  },

  churn: {
    title: "AI Churn Prediction Assistant",
    cover: "assets/img/churn/churn-chat-1.webp",
    flow: [
      { t: "Marketing user", d: "Describes a customer in plain English" },
      { t: "Local LLM agent", d: "Qwen via Ollama: text → tool call" },
      { t: "Guardrails", d: "Pydantic validation + check against the chat" },
      { t: "Churn model", d: "Balanced logistic regression → probability" },
      { t: "Answer", d: "Risk, retention levers, actions, assumptions" }
    ],
    html: `
      <p class="lead">A telecom marketing team wanted to know which customers were about to leave, without writing code and without sending customer data to a third-party AI service. I built a proof of concept that pairs a classical churn classifier with a local open-source LLM: the team describes a customer in plain English and gets a churn probability, a risk level and what would most reduce it.</p>

      <div class="metric-grid">
        <div class="metric"><b>79%</b><span>of churners caught (recall 0.786) on the held-out test set</span></div>
        <div class="metric"><b>0.841</b><span>ROC-AUC on 1,409 test customers</span></div>
        <div class="metric"><b>10</b><span>algorithms compared, plus 4 class-balanced variants</span></div>
        <div class="metric"><b>7,043</b><span>customers in the public IBM Telco dataset, 26.5% churned</span></div>
        <div class="metric"><b>0</b><span>third-party AI APIs: everything runs on-premise</span></div>
      </div>

      <h3>How a question is answered</h3>
      {{flow}}

      <h3>Key design decision: the LLM never predicts</h3>
      <p>The language model only turns the conversation into structured inputs, calls the model through a validated tool and explains the numbers it gets back. Every probability comes from the trained classifier, so results are reproducible and auditable, and the LLM can't invent them.</p>

      <h3>The model</h3>
      <ul>
        <li><b>Right metric for imbalanced data</b> — with 26.5% churners, always answering "stays" scores 73.5% accuracy. Models were compared on recall, precision, F1 and ROC-AUC instead.</li>
        <li><b>Class weighting mattered more than the algorithm</b> — the good models all ranked customers equally well (ROC-AUC ≈ 0.84), but balanced versions caught 73–79% of churners against 48–57% for the plain ones.</li>
        <li><b>Chose balanced logistic regression</b> — within 0.014 F1 of the best model (LightGBM, balanced), with one readable coefficient per feature for the marketing team and the fastest serving time.</li>
        <li><b>Tested feature engineering honestly</b> — tenure groups, service counts and interaction features gave no measurable gain, so they were removed to keep the model simple.</li>
      </ul>

      <h3>Making a small local LLM reliable</h3>
      <ul>
        <li><b>Tool schema from Pydantic</b> — the tool's parameters and allowed values come from one validated model; common wording ("fiber", "2 years", "monthly") is mapped to dataset values.</li>
        <li><b>Asks instead of guessing</b> — five fields are required; if one is missing the assistant asks for it, and defaults for optional fields are listed as assumptions.</li>
        <li><b>Checks the LLM against the conversation</b> — in testing, the 3B model turned "3-year contract" into "Two year" and invented a bill. The agent now verifies in code that every required value really appears in the user's messages before scoring.</li>
        <li><b>What-if retention levers</b> — the same model re-scores the customer with one change at a time (longer contract, automatic payment, added support) and reports the new risk.</li>
        <li><b>Usable by other systems</b> — FastAPI exposes <code>/chat</code> for people and <code>/predict</code> for a CRM, with Swagger docs; <code>start.py</code> checks the whole setup and starts everything with one command.</li>
      </ul>
      <div class="chips"><span class="chip">pandas</span><span class="chip">scikit-learn</span><span class="chip">XGBoost</span><span class="chip">LightGBM</span><span class="chip">Ollama</span><span class="chip">Qwen2.5</span><span class="chip">Pydantic</span><span class="chip">FastAPI</span><span class="chip">Gradio</span></div>

      <h3>Architecture &amp; screens</h3>
      {{gallery:main}}

      <p class="note">Trained on the public IBM Telco Customer Churn dataset. The customer in the chat is a made-up example; this demo run used qwen3:8b, since the LLM is a one-line setting (the project ships with Qwen2.5).</p>
    `,
    galleries: {
      main: [
        ["churn-architecture.webp", "Architecture: online chat service and offline training"],
        ["churn-chat-1.webp", "Plain-English question → churn risk, retention levers, assumptions"],
        ["churn-chat-2.webp", "Follow-up what-if: the same customer on a two-year contract"],
        ["churn-api.webp", "REST API with Swagger docs, for a CRM to call directly"]
      ]
    }
  }
};
