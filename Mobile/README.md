# The Invisible Cafeteria — Mobile Companion Application

> **Dedicated mobile client tailored for kitchen counter staff and NGO logistics drivers on the ground.**

---

## 📱 Mobile Capabilities

### 1. Driver Pickup & Inspection Manifest
- View assigned food pickup manifests sorted by safe distribution deadline.
- Real-time temperature probe logging (*e.g. 68.2°C*) to ensure food safety law compliance.
- 1-click status progression: `[Assigned]` ➔ `[Driver En Route]` ➔ `[Collected & Verified]` ➔ `[Delivered to Community]`.

### 2. Kitchen Floor Quick-Scanner
- Floor chef batch entry with automated surplus calculation:
  $$\text{Surplus} = \max(0, \text{Prepared} - \text{Consumed})$$
- Generates immediate redistribution notices to shelter drivers without needing a desktop workstation.

### 3. Crisis Directives & Emergency Push Notifications (Constraint 5)
- Real-time disaster triage alerts informing drivers which shelters receive 100% essential ration priority.

---

## 🚀 Building & Exporting to iOS / Android

The mobile application is ready to be wrapped as a native iOS/Android application using **Capacitor** or run as a standalone PWA:

```bash
cd c:\CAMPOS\Mobile
npm install
npm run build

# To add iOS / Android native wrappers:
npx cap add android
npx cap add ios
npx cap open android
```

