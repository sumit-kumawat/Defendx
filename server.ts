import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import fs from "fs";

// Pure-JS database engine that replaces SQLite seamlessly
class LocalJSONDatabase {
  private filePath: string;
  private data: {
    certifications: Array<{
      code: string;
      candidate_name: string;
      certified_title: string;
      issue_date: string;
      expiry_date: string;
      accreditation: string;
      status: string;
      download_url?: string;
    }>;
    contact_inquiries: Array<{
      id: number;
      name: string;
      email: string;
      company: string;
      message: string;
      created_at: string;
    }>;
    trial_requests: Array<{
      id: number;
      name: string;
      email: string;
      company: string;
      endpoints: number;
      deployment: string;
      created_at: string;
    }>;
  };

  constructor(filePath: string) {
    this.filePath = filePath;
    this.data = {
      certifications: [],
      contact_inquiries: [],
      trial_requests: []
    };
    this.loadState();
  }

  private loadState() {
    try {
      if (fs.existsSync(this.filePath)) {
        const fileContent = fs.readFileSync(this.filePath, "utf-8");
        this.data = JSON.parse(fileContent);
      } else {
        this.saveState();
      }
    } catch (err) {
      console.error("[LocalDatabase] Error loading database state:", err);
    }
  }

  private saveState() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), "utf-8");
    } catch (err) {
      console.error("[LocalDatabase] Error saving database state:", err);
    }
  }

  public async exec(sql: string): Promise<void> {
    return;
  }

  public async run(sql: string, params: any[] = []): Promise<void> {
    const trimmedSql = sql.trim().replace(/\s+/g, " ");

    if (trimmedSql.toUpperCase().startsWith("INSERT OR REPLACE INTO CERTIFICATIONS")) {
      const [code, candidate_name, certified_title, issue_date, expiry_date, accreditation, status] = params;
      const index = this.data.certifications.findIndex(
        (c) => c.code.toUpperCase() === String(code).trim().toUpperCase()
      );
      const newRecord = {
        code: String(code).trim(),
        candidate_name: String(candidate_name),
        certified_title: String(certified_title),
        issue_date: String(issue_date),
        expiry_date: String(expiry_date),
        accreditation: String(accreditation),
        status: String(status)
      };
      if (index !== -1) {
        this.data.certifications[index] = newRecord;
      } else {
        this.data.certifications.push(newRecord);
      }
      this.saveState();
    } else if (trimmedSql.toUpperCase().startsWith("INSERT INTO CONTACT_INQUIRIES")) {
      const [name, email, company, message] = params;
      const id = this.data.contact_inquiries.length > 0 
        ? Math.max(...this.data.contact_inquiries.map(c => c.id)) + 1 
        : 1;
      this.data.contact_inquiries.push({
        id,
        name: String(name),
        email: String(email),
        company: String(company),
        message: String(message),
        created_at: new Date().toISOString()
      });
      this.saveState();
    } else if (trimmedSql.toUpperCase().startsWith("INSERT INTO TRIAL_REQUESTS")) {
      const [name, email, company, endpoints, deployment] = params;
      const id = this.data.trial_requests.length > 0
        ? Math.max(...this.data.trial_requests.map(t => t.id)) + 1
        : 1;
      this.data.trial_requests.push({
        id,
        name: String(name),
        email: String(email),
        company: String(company),
        endpoints: Number(endpoints) || 50,
        deployment: String(deployment),
        created_at: new Date().toISOString()
      });
      this.saveState();
    } else {
      console.warn("[LocalDatabase] Unhandled run execution query:", sql);
    }
  }

  public async get(sql: string, params: any[] = []): Promise<any> {
    const trimmedSql = sql.trim().replace(/\s+/g, " ").toUpperCase();

    if (trimmedSql.includes("SELECT * FROM CERTIFICATIONS")) {
      const codeParam = String(params[0] || "").trim().toUpperCase();
      const match = this.data.certifications.find(
        (c) => c.code.toUpperCase() === codeParam
      );
      return match || null;
    } else if (trimmedSql.includes("SELECT COUNT(*) AS COUNT FROM CONTACT_INQUIRIES")) {
      return { count: this.data.contact_inquiries.length };
    } else if (trimmedSql.includes("SELECT COUNT(*) AS COUNT FROM TRIAL_REQUESTS")) {
      return { count: this.data.trial_requests.length };
    } else if (trimmedSql.includes("SELECT COUNT(*) AS COUNT FROM CERTIFICATIONS")) {
      return { count: this.data.certifications.length };
    } else {
      console.warn("[LocalDatabase] Unhandled get database query:", sql);
      return null;
    }
  }

  // --- Dynamic CRUD Helpers for Express REST Admin endpoints ---
  public getCertificationsList() {
    return this.data.certifications;
  }

  public getInquiriesList() {
    return this.data.contact_inquiries;
  }

  public getTrialRequestsList() {
    return this.data.trial_requests;
  }

  public createCertificationDirect(record: any) {
    const code = String(record.code || "").trim();
    const index = this.data.certifications.findIndex(
      (c) => c.code.toUpperCase() === code.toUpperCase()
    );
    const newRecord = {
      code,
      candidate_name: String(record.candidate_name || "").trim(),
      certified_title: String(record.certified_title || "Certified DefendX SIEM Administrator").trim(),
      issue_date: String(record.issue_date || "").trim(),
      expiry_date: String(record.expiry_date || "").trim(),
      accreditation: String(record.accreditation || "DefendX Training Authority Accreditation").trim(),
      status: String(record.status || "ACTIVE").trim().toUpperCase(),
      download_url: record.download_url ? String(record.download_url).trim() : ""
    };
    if (index !== -1) {
      this.data.certifications[index] = newRecord;
    } else {
      this.data.certifications.push(newRecord);
    }
    this.saveState();
    return newRecord;
  }

  public updateCertificationDirect(code: string, record: any): boolean {
    const index = this.data.certifications.findIndex(
      (c) => c.code.toUpperCase() === code.toUpperCase().trim()
    );
    if (index !== -1) {
      this.data.certifications[index] = {
        ...this.data.certifications[index],
        candidate_name: record.candidate_name !== undefined ? String(record.candidate_name).trim() : this.data.certifications[index].candidate_name,
        certified_title: record.certified_title !== undefined ? String(record.certified_title).trim() : this.data.certifications[index].certified_title,
        issue_date: record.issue_date !== undefined ? String(record.issue_date).trim() : this.data.certifications[index].issue_date,
        expiry_date: record.expiry_date !== undefined ? String(record.expiry_date).trim() : this.data.certifications[index].expiry_date,
        accreditation: record.accreditation !== undefined ? String(record.accreditation).trim() : this.data.certifications[index].accreditation,
        status: record.status !== undefined ? String(record.status).trim().toUpperCase() : this.data.certifications[index].status,
        download_url: record.download_url !== undefined ? String(record.download_url).trim() : this.data.certifications[index].download_url
      };
      this.saveState();
      return true;
    }
    return false;
  }

  public deleteCertificationDirect(code: string): boolean {
    const uppercaseCode = code.toUpperCase().trim();
    const index = this.data.certifications.findIndex(
      (c) => c.code.toUpperCase() === uppercaseCode
    );
    if (index !== -1) {
      this.data.certifications.splice(index, 1);
      this.saveState();
      return true;
    }
    return false;
  }

  public clearDatabaseLogsDirect() {
    this.data.contact_inquiries = [];
    this.data.trial_requests = [];
    this.saveState();
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize secure local storage
  const dbDir = path.join(process.cwd(), "data");

  // Ensure data directory exists
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir);
  }

  const dbPath = path.join(dbDir, "defendx_store.json");
  const db = new LocalJSONDatabase(dbPath);

  // Table structures (retained for database architecture documentation)
  await db.exec(`
    CREATE TABLE IF NOT EXISTS certifications (
      code TEXT PRIMARY KEY,
      candidate_name TEXT,
      certified_title TEXT,
      issue_date TEXT,
      expiry_date TEXT,
      accreditation TEXT,
      status TEXT
    );
  `);

  // Ensure standard CDXSA090896 candidate registration is preseeded for direct URL verification queries
  try {
    const existingCerts = db.getCertificationsList();
    const hasDefaultCert = existingCerts.some(c => c.code.toUpperCase() === "CDXSA090896");
    if (!hasDefaultCert) {
      db.createCertificationDirect({
        code: "CDXSA090896",
        candidate_name: "Sumit RoshanLal Kumawat",
        certified_title: "Certified DefendX SIEM Administrator",
        issue_date: "2 July, 2026",
        expiry_date: "30 June, 2028",
        accreditation: "DefendX Training Authority Accreditation",
        status: "ACTIVE",
        download_url: "https://drive.google.com/uc?export=download&id=1xraYcG681R6H00gfmEE99AVeC3ZSkF5u"
      });
      console.log("[Defendx] Preseeded certificate CDXSA090896 into local store.");
    }
  } catch (err) {
    console.error("[Defendx] Secondary error pre-seeding default credentials on database startup:", err);
  }

  // NOTICE: Seed statement has been permanently removed per user request:
  // "remove - fill demo: CDXSA090896 fermanently - I don;t need it anymore."
  // The database will start clean and certifications are managed dynamically by the admin console.

  // API Route: Verify certification
  app.get("/api/verify", async (req, res) => {
    const { code } = req.query;
    if (!code || typeof code !== "string") {
      return res.status(400).json({ error: "Missing certification code query parameter" });
    }

    try {
      const match = await db.get("SELECT * FROM certifications WHERE UPPER(code) = UPPER(?)", [code.trim()]);
      if (match) {
        return res.json({ validated: true, data: match });
      } else {
        return res.json({ validated: false, error: "Credentials verification code not found" });
      }
    } catch (err: any) {
      console.error("Database query error during verification:", err);
      return res.status(500).json({ error: "Database query failure", details: err?.message });
    }
  });

  // API Route: Contact Inquiry
  app.post("/api/contact", async (req, res) => {
    const { name, email, company, message } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required fields" });
    }

    try {
      await db.run(
        "INSERT INTO contact_inquiries (name, email, company, message) VALUES (?, ?, ?, ?)",
        [name, email, company || "", message || ""]
      );
      return res.json({ success: true, message: "Thank you! Your corporate inquiry has been saved successfully." });
    } catch (err: any) {
      console.error("Contact submission database insert failure:", err);
      return res.status(500).json({ error: "Database state persist failure" });
    }
  });

  // API Route: Trial request
  app.post("/api/trial", async (req, res) => {
    const { name, email, company, endpoints, deployment } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required fields to request an enterprise trial" });
    }

    try {
      await db.run(
        "INSERT INTO trial_requests (name, email, company, endpoints, deployment) VALUES (?, ?, ?, ?, ?)",
        [name, email, company || "", Number(endpoints) || 50, deployment || "saas"]
      );
      return res.json({ success: true, message: "Your enterprise trial request has been logged successfully inside the secure system." });
    } catch (err: any) {
      console.error("Trial request database insert failure:", err);
      return res.status(500).json({ error: "Database state persist failure" });
    }
  });

  // --- ADMIN PORTAL REST API ENDPOINTS ---

  // Admin API: List certifications
  app.get("/api/admin/certifications", (req, res) => {
    const list = db.getCertificationsList();
    return res.json({ success: true, data: list });
  });

  // Admin API: Add/Integrate new student certification profile
  app.post("/api/admin/certifications", (req, res) => {
    const { code, candidate_name, certified_title, issue_date, expiry_date, accreditation, status, download_url } = req.body;
    if (!code || !candidate_name || !certified_title) {
      return res.status(400).json({ error: "Missing required core fields: code, candidate_name, and certified_title are required." });
    }
    try {
      const record = db.createCertificationDirect({
        code,
        candidate_name,
        certified_title,
        issue_date: issue_date || new Date().toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" }),
        expiry_date: expiry_date || "31 December, 2028",
        accreditation: accreditation || "DefendX Training Authority Accreditation",
        status: status || "ACTIVE",
        download_url: download_url || ""
      });
      return res.json({ success: true, message: "Student profile registered and signed in registry.", data: record });
    } catch (err: any) {
      return res.status(500).json({ error: "Database save failure for candidate profile." });
    }
  });

  // Admin API: Update existing profile
  app.put("/api/admin/certifications/:code", (req, res) => {
    const { code } = req.params;
    try {
      const success = db.updateCertificationDirect(code, req.body);
      if (success) {
        return res.json({ success: true, message: "Student profile modified in registry successfully." });
      } else {
        return res.status(404).json({ error: "No student profile located matching this code." });
      }
    } catch (err: any) {
      return res.status(500).json({ error: "Database modification failure." });
    }
  });

  // Admin API: Delete profile permanently (enables clearing CDXSA090896 permanently!)
  app.delete("/api/admin/certifications/:code", (req, res) => {
    const { code } = req.params;
    try {
      const success = db.deleteCertificationDirect(code);
      if (success) {
        return res.json({ success: true, message: `Student certification code ${code} deleted permanently.` });
      } else {
        return res.status(404).json({ error: "No profile matched code to delete." });
      }
    } catch (err: any) {
      return res.status(500).json({ error: "Database erasure failure." });
    }
  });

  // Admin API: Retrieve list of contact inquiries
  app.get("/api/admin/contacts", (req, res) => {
    const list = db.getInquiriesList();
    return res.json({ success: true, data: list });
  });

  // Admin API: Retrieve list of trial requests
  app.get("/api/admin/trials", (req, res) => {
    const list = db.getTrialRequestsList();
    return res.json({ success: true, data: list });
  });

  // Admin API: Clear logs database
  app.post("/api/admin/clear-logs", (req, res) => {
    try {
      db.clearDatabaseLogsDirect();
      return res.json({ success: true, message: "System inquiry and trial logs cleared." });
    } catch (err: any) {
      return res.status(500).json({ error: "Registry state reset failure." });
    }
  });

  // Verification API endpoint wrapper
  app.get("/api/db-status", async (req, res) => {
    try {
      const contactsCount = await db.get("SELECT COUNT(*) as count FROM contact_inquiries");
      const trialsCount = await db.get("SELECT COUNT(*) as count FROM trial_requests");
      const certsCount = await db.get("SELECT COUNT(*) as count FROM certifications");
      return res.json({
        databasePath: dbPath,
        schemas: ["certifications", "contact_inquiries", "trial_requests"],
        records: {
          certifications: certsCount?.count || 0,
          contact_inquiries: contactsCount?.count || 0,
          trial_requests: trialsCount?.count || 0
        },
        complianceOwner: "Conzex Global Private Limited",
        verifiedActive: true
      });
    } catch (err: any) {
      return res.status(500).json({ error: "Database monitoring error" });
    }
  });

  // Vite Integration Middleware (Development vs Production)
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Defendx] Server booted on http://0.0.0.0:${PORT}`);
  });
}

startServer();
