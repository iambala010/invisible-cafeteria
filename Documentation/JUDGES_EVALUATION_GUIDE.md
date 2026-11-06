# Hackathon Judges' Evaluation Guide — The Invisible Cafeteria

## 1. Quick Verification Flow (3 Minutes)

1. **Launch the Application**:
   - Web App: Open `http://localhost:5173`
   - API Backend: Verify `http://localhost:5000/api/health` returns `status: "online"` and `edgePrivacy: "Active"`

2. **Run the Automated Test Suite**:
   ```bash
   npm test
   ```
   **Expected**: 24 tests passing (100% pass rate in ~250ms).

---

## 2. Walkthrough Checklist for All Evaluation Criteria

| Requirement | Where to Verify in UI | Key Verification Points |
| :--- | :--- | :--- |
| **1. Partner Cafeteria Network** | Navigation $\rightarrow$ **Partner Network** | - Directory split into Nearby Campus and Outer City canteens.<br>- Displays food items, available surplus, contact details, and distance.<br>- Dispatch emergency requests; confirmed meals reduce the shortage. |
| **2. Partner Cafe Portal (CRUD)** | Switch Role $\rightarrow$ **Partner Cafeteria** $\rightarrow$ **Partner Cafe Portal** | - Edit cafe profile details.<br>- Full CRUD on food menu (Add dish, edit portions/deadlines, delete).<br>- Accept/decline incoming campus supply requests.<br>- Strict data isolation: partners only see their own store. |
| **3. New Partner Registration** | Switch Role $\rightarrow$ **Register Partner Cafe** | - External cafes self-register with category, contact, and location.<br>- Queued with status `pending_approval`.<br>- Administrator can 1-click approve from Partner Network. |
| **4. Emergency Food Support Fund (10%)** | Navigation $\rightarrow$ **Emergency Food Fund** | - Total Budget: ₹2,00,000.<br>- Mandatory 10% Reserve: ₹20,000 locked.<br>- Available Balance: ₹45,000.<br>- Benchmark Rate: ₹50/meal.<br>- Real-time alert if balance approaches 10% floor.<br>- Admin authorization modal and audit log. |
| **5. New Student Meal Reserve (50 Meals)** | Navigation $\rightarrow$ **New Student Reserve** | - At least 50 meals strictly preserved.<br>- Ring-fenced: never counted as general surplus or emergency rations.<br>- Issue meal modal with department and masked token (`NEW-STU-••••481`).<br>- Replenishment alert triggers below 15 meals; 1-click restore to 50. |
| **6. Constraint 5: Sudden Demand Surge** | Top Banner / Navigation $\rightarrow$ **Emergency Surge Mode** | - 3x demand surge: 1,200 $\times$ 3 = 3,600 meals.<br>- 50% supply contraction: 1,400 $\times$ 0.5 = 700 meals.<br>- Initial Shortage = 2,900 meals.<br>- **9-Step Sequence**: Student reserve preserved $\rightarrow$ Partner supply added (+90) $\rightarrow$ Fund potential added (+900) $\rightarrow$ **Honest deficit disclosure: 1,910 meals unmet**.<br>- 4-tier vulnerability triage matrix with staff sign-off. |
| **7. Constraint 7: Strict Privacy Restriction** | Navigation $\rightarrow$ **Privacy & Data Vault** | - 0 cloud AI calls; deterministic edge heuristics.<br>- Masked PII across all views.<br>- 3-Role RBAC permission matrix (Cafeteria Staff, Partner Cafeteria, Admin).<br>- SHA-256 cryptographic audit logs with exportable CSV. |
| **8. Readable Graphs & UX** | Navigation $\rightarrow$ **Main Dashboard** | - All charts feature explicit units (Meals, INR ₹, Percentage %).<br>- Labelled X and Y axes, color-coded legends, and explanatory footnotes. |
