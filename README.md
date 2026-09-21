# Coaching & Conversation Style Assessment Web App

A self-discovery and diagnostic web application based on:
1. **The 2x2 Conversation Matrix & Archetype Framework**:
   - **Coach** *(Ask + Future/Solution)*: Inquires forward, facilitates co-creation of answers, and establishes self-accountability.
   - **Mentor** *(Tell + Future/Solution)*: **Strongly obvious dynamic** — when someone asks, the mentor *always comes out with the answer* using lived experience and career guidance.
   - **Consultant** *(Tell + Past/Problem)*: Diagnoses operational/system flaws, provides subject-matter expertise, and prescribes technical fixes.
   - **Counselor** *(Ask + Past/Problem)*: Inquires deeply into emotional roots, interpersonal friction, and historical baggage.
2. **Slide 20: Paradigm Shift Assessment**:
   - 6 polar continuum scales (1 to 10):
     - Focusing on weaknesses (1) ↔ Leveraging strengths (10)
     - Solving problems yourself (1) ↔ Helping others solve & eliminate problems (10)
     - Giving advice (1) ↔ Asking questions to draw out options (10)
     - Source of approval (1) ↔ Establishing a trustful relationship (10)
     - Demonstrating expertise (1) ↔ Being a role of excellence (10)
     - Imposing agenda (1) ↔ Accepting you are not in control (10)

---

## 🔐 Role-Based Access Control (Responder vs. Facilitator)

1. **For Participants / Responders**:
   - Access URL: `http://localhost:3000` (or directly open `index.html`)
   - Responders can only access **Assessment** and **My Report**.
   - The **Facilitator Dashboard** is secured behind a PIN modal.

2. **For Facilitators / Trainers**:
   - Facilitator access can be unlocked in two ways:
     1. Click the **Facilitator** button in the header and enter PIN: **`1234`**
     2. Or share/bookmark the direct facilitator link: **`http://localhost:3000?mode=facilitator`**
   - Once unlocked, facilitators can view all 3 tabs, review cohort majority statistics, aggregate charts, download CSVs, and sync to Google Sheets.
   - Click "Lock Facilitator Mode" at any time to return to the responder-only view.

---

## 🌐 Deployment Options

### Option 1: Instant Local Deployment (Ready Right Now)
- Double-click [`start-app.bat`](file:///C:/Users/junai/.gemini/antigravity/scratch/coaching-assessment-app/start-app.bat) to launch the app on `http://localhost:3000` and automatically open your browser.
- Anyone on your local WiFi/LAN can access it via your IP address (e.g. `http://192.168.x.x:3000`).

### Option 2: Free Public Cloud Hosting (GitHub Pages / Netlify / Vercel)
This app is a client-side web app (HTML + JS + CSS) with Google Sheets backend. You can host it online for free in under 2 minutes:

- **Netlify Drop (Easiest - 30 seconds)**:
  1. Visit [app.netlify.com/drop](https://app.netlify.com/drop)
  2. Drag and drop the `C:\Users\junai\.gemini\antigravity\scratch\coaching-assessment-app` folder.
  3. You will receive an instant public URL (e.g. `https://coaching-assessment-xyz.netlify.app`) to share with your participants!

- **GitHub Pages**:
  1. Create a repository on GitHub.
  2. Upload the files in this folder (`index.html`, `app.js`, `data.js`).
  3. Under **Settings > Pages**, set branch to `main` and save. Your site is live!
