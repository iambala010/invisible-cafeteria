# The Invisible Cafeteria — System Architecture & Design Specification

## 1. System Overview

"The Invisible Cafeteria" is a smart cafeteria resource coordination and emergency food management platform. The platform coordinates food supply between central dining facilities, registered partner cafeterias/cafes (nearby and outer), and an emergency procurement financial reserve.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        THE INVISIBLE CAFETERIA                         │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
           ┌─────────────────────────┼─────────────────────────┐
           ▼                         ▼                         ▼
   👨‍🍳 Central Dining         🏪 Partner Network        💰 Emergency Fund
   - Kitchen Inventory CRUD  - Nearby Campus Canteens  - Min 10% Reserve (₹20k)
   - Auto Surplus Calculator - Outer City Suppliers    - Balance: ₹45,000
   - Student Reserve (50)    - Partner Food Inventory  - ₹50/meal Benchmark Rate
           │                         │                         │
           └─────────────────────────┼─────────────────────────┘
                                     ▼
                      🛡️ Administrator & Crisis Command
                      - 9-Step Multi-Source Response
                      - 3x Demand Surge / 50% Supply Cut
                      - Honest Deficit Triage Matrix
                      - Zero-Cloud Edge Privacy Vault
```

---

## 2. Mathematical Formulations

### A. Surplus Food Calculation
$$\text{Surplus Quantity} = \max(0, \text{Quantity Prepared} - \text{Quantity Consumed})$$

### B. Emergency Demand Surge (Constraint 5)
$$\text{Emergency Demand} = \text{Original Demand} \times 3 = 1,200 \times 3 = 3,600 \text{ meals}$$
$$\text{Emergency Resources} = \text{Original Resources} \times 0.5 = 1,400 \times 0.5 = 700 \text{ meals}$$
$$\text{Initial Shortage} = \max(0, \text{Emergency Demand} - \text{Emergency Resources}) = 2,900 \text{ meals}$$

### C. Ring-Fencing the New Student Reserve
$$\text{General Available Rations} = \text{Emergency Resources} - \text{Protected Student Reserve} = 700 - 50 = 650 \text{ meals}$$

### D. Partner Network Offset
$$\text{Shortage After Partners} = \text{Initial Shortage} - \text{Confirmed Partner Supplies} = 2,900 - 90 = 2,810 \text{ meals}$$

### E. Emergency Food Support Fund (10% Minimum Reserve)
$$\text{Minimum 10% Reserve} = \text{Total Budget} \times 10\% = ₹2,00,000 \times 0.10 = ₹20,000$$
$$\text{Purchasable Meals} = \left\lfloor \frac{\text{Current Balance}}{\text{Rate per Meal}} \right\rfloor = \left\lfloor \frac{₹45,000}{₹50} \right\rfloor = 900 \text{ meals}$$

### F. Honest Deficit Calculation
$$\text{Ultimate Unmet Shortage} = \text{Shortage After Partners} - \text{Fund Purchasable Meals} = 2,810 - 900 = 1,910 \text{ meals}$$
**Strict Policy:** The system never claims all 3,600 meals are secured. Only $650 + 50 + 90 + 900 = 1,690$ meals are accounted for; the remaining $1,910$ meals represent an unavoidable deficit managed via equitable needs-based rationing.

---

## 3. Privacy Architecture (Constraint 7)

1. **Zero External AI Egress**: No HTTP traffic leaves the browser or local edge node to cloud LLMs (OpenAI, Gemini, Anthropic).
2. **Local Heuristics**: Prediction models execute locally in deterministic JavaScript/TypeScript.
3. **PII Masking**: Student tokens (`NEW-STU-••••481`) and phone numbers (`+91 (984) •••-4819`) are masked on all UI views.
4. **Role-Based Access Control (RBAC)**: Strict separation of privileges across Cafeteria Staff, Partner Cafeterias, and Administrators.
5. **SHA-256 Audit Trail**: Every sensitive state change produces an immutable cryptographic fingerprint.
