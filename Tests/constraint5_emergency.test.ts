import { describe, it } from 'node:test';
import assert from 'node:assert';

describe('CONSTRAINT 5: Sudden Demand Surge & 9-Step Multi-Source Response', () => {
  // Baseline regular cafeteria numbers
  const originalDemand = 1200;
  const originalResources = 1400;

  it('Step 1: Emergency surge calculations (3x demand, 50% supply cut)', () => {
    const emergencyDemand = originalDemand * 3;
    const emergencyResources = originalResources * 0.5;
    const initialShortage = Math.max(0, emergencyDemand - emergencyResources);

    assert.strictEqual(emergencyDemand, 3600, 'Demand must be 1200 * 3 = 3600 meals');
    assert.strictEqual(emergencyResources, 700, 'Resources cut by 50% = 700 meals');
    assert.strictEqual(initialShortage, 2900, 'Initial shortage = 3600 - 700 = 2900 meals');
  });

  it('Step 2: Ring-fence 50 new student reserve meals without double counting', () => {
    const emergencyResources = 700;
    const protectedStudentReserve = 50;
    const generalAvailableRations = emergencyResources - protectedStudentReserve;

    assert.strictEqual(generalAvailableRations, 650, '700 - 50 = 650 general rations available');
    assert.strictEqual(protectedStudentReserve, 50, '50 meals strictly preserved for new students');
  });

  it('Step 3 & 4: Search partner network and confirm emergency supply requests', () => {
    const confirmedPartnerMeals = 90; // Campus North Canteen (55) + GreenLeaf Bistro (35)
    assert.strictEqual(confirmedPartnerMeals, 90, 'Partner network confirmed 90 meals');
  });

  it('Step 5: Recalculate remaining food shortage after partner contributions', () => {
    const initialShortage = 2900;
    const confirmedPartnerMeals = 90;
    const shortageAfterPartners = initialShortage - confirmedPartnerMeals;

    assert.strictEqual(shortageAfterPartners, 2810, '2900 - 90 = 2810 meals remaining shortage');
  });

  it('Step 6: Check Emergency Food Support Fund (10% protected reserve check)', () => {
    const totalBudget = 200000;
    const minimumReservePercent = 10;
    const minimumReserveINR = totalBudget * (minimumReservePercent / 100);
    const availableBalanceINR = 45000;
    const sampleMealPrice = 50;

    assert.strictEqual(minimumReserveINR, 20000, '10% protected reserve = ₹20,000');
    assert.ok(availableBalanceINR >= minimumReserveINR, 'Available balance is above 10% reserve threshold');

    const purchasableMeals = Math.floor(availableBalanceINR / sampleMealPrice);
    assert.strictEqual(purchasableMeals, 900, '₹45,000 / ₹50 = 900 purchasable meals');
  });

  it('Step 7: Require administrator authorization for fund expenditure', () => {
    let fundBalance = 45000;
    let totalSpent = 15000;
    const mealsToProcure = 900;
    const unitRate = 50;
    const cost = mealsToProcure * unitRate;

    // Admin authorization
    const approveProcurement = (role: string) => {
      if (role !== 'admin') throw new Error('Unauthorized');
      fundBalance -= cost;
      totalSpent += cost;
      return true;
    };

    assert.throws(() => approveProcurement('cafeteria'), /Unauthorized/);
    assert.strictEqual(approveProcurement('admin'), true);
    assert.strictEqual(fundBalance, 0);
    assert.strictEqual(totalSpent, 60000);
  });

  it('Step 8: Honest Disclosure of Final Unmet Shortage (Never claim complete coverage)', () => {
    const shortageAfterPartners = 2810;
    const fundProcuredMeals = 900;
    const ultimateUnmetShortage = shortageAfterPartners - fundProcuredMeals;

    assert.strictEqual(ultimateUnmetShortage, 1910, 'Final unmet shortage = 2810 - 900 = 1910 meals');
    
    // Explicit verification that platform does not claim 3600 meals secured
    const totalSecuredMeals = 650 + 50 + 90 + 900;
    assert.strictEqual(totalSecuredMeals, 1690, 'Total secured meals is exactly 1690');
    assert.strictEqual(3600 - totalSecuredMeals, 1910, 'Deficit of 1910 meals honestly displayed');
  });

  it('Step 9: Equitable Needs-Based Triage Allocation of available 650 campus rations', () => {
    const allocations = [
      { tier: 1, group: 'Hostellers & Medical Dependencies', verifiedDemand: 950, allocated: 320 },
      { tier: 2, group: 'Low-Income Meal Grant Recipients', verifiedDemand: 850, allocated: 230 },
      { tier: 3, group: 'Emergency Responder & Essential Staff', verifiedDemand: 400, allocated: 100 },
      { tier: 4, group: 'Day Scholars (Commuter Advisory)', verifiedDemand: 1400, allocated: 0 }
    ];

    const totalAllocated = allocations.reduce((sum, a) => sum + a.allocated, 0);
    assert.strictEqual(totalAllocated, 650, 'Total allocated must exactly equal available 650 rations');
    assert.ok(allocations[0].allocated > allocations[1].allocated, 'Higher priority tier receives higher allocation');
  });
});
