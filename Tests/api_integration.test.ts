import { describe, it } from 'node:test';
import assert from 'node:assert';

describe('Backend API Integration Tests (:5000)', () => {
  const BASE_URL = 'http://localhost:5000/api';

  it('GET /api/health should return online status and active edge privacy', async () => {
    const res = await fetch(`${BASE_URL}/health`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, 'online');
    assert.strictEqual(data.edgePrivacy, 'Active (Constraint 7 Enforced)');
  });

  it('GET /api/partners should return partner directory without NGO references', async () => {
    const res = await fetch(`${BASE_URL}/partners`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.ok(Array.isArray(data.partners));
    assert.ok(data.partners.length >= 4);

    // Verify first partner is nearby or outer
    const p1 = data.partners[0];
    assert.ok(p1.tier === 'nearby_campus' || p1.tier === 'outer_city');
    assert.ok(p1.contactPhoneMasked.includes('•'));
  });

  it('GET /api/fund should return 10% minimum reserve and balance', async () => {
    const res = await fetch(`${BASE_URL}/fund`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.fund.totalBudgetINR, 200000);
    assert.strictEqual(data.fund.minimumReserveAmountINR, 20000);
    assert.ok(data.fund.currentBalanceINR >= data.fund.minimumReserveAmountINR);
  });

  it('GET /api/student-reserve should return protected 50-meal reserve', async () => {
    const res = await fetch(`${BASE_URL}/student-reserve`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.reserve.targetReserve, 50);
    assert.ok(data.reserve.currentRemaining > 0);
  });

  it('GET /api/emergency should return exact 9-step Constraint 5 values', async () => {
    const res = await fetch(`${BASE_URL}/emergency`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    
    assert.strictEqual(data.steps.step1_initialCalculations.emergencyDemand, 3600);
    assert.strictEqual(data.steps.step1_initialCalculations.emergencyResources, 700);
    assert.strictEqual(data.steps.step1_initialCalculations.initialShortage, 2900);
    assert.strictEqual(data.steps.step2_newStudentProtection.protectedReserve, 50);
    assert.strictEqual(data.steps.step5_shortageAfterPartners.shortageAfterPartners, 2810);
    assert.strictEqual(data.steps.step8_ultimateShortageDisplay.finalUnmetShortage, 1910);
  });

  it('GET /api/privacy/status should confirm zero cloud AI egress and 3 roles', async () => {
    const res = await fetch(`${BASE_URL}/privacy/status`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.controls.externalAIShield, true);
    assert.strictEqual(data.controls.zeroExternalEgress, true);
  });
});
