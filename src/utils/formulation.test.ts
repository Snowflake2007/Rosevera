import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INGREDIENTS_DATA,
  RESEARCH_PAPERS,
  validateObservationEntry,
  scaleBatchQuantities,
  clamp,
  lerp,
  getSectionProgress
} from './formulation';

test('INGREDIENTS_DATA contains exactly the 6 required project ingredients with correct units', () => {
  assert.equal(INGREDIENTS_DATA.length, 6);
  
  const expectedMap = {
    'Aloe Vera Gel': '20 g',
    'Rose Water': '25 ml',
    'Glycerin': '4 ml',
    'Coconut Oil': '5 ml',
    'Distilled Water': '10 g',
    'Vitamin E': '2 capsules'
  };

  for (const item of INGREDIENTS_DATA) {
    assert.ok(item.name in expectedMap);
    assert.equal(item.quantity, expectedMap[item.name as keyof typeof expectedMap]);
  }
});

test('RESEARCH_PAPERS includes all 5 required scientific references', () => {
  assert.equal(RESEARCH_PAPERS.length, 5);
  const citations = RESEARCH_PAPERS.map(p => p.citation);
  assert.ok(citations.some(c => c.includes('Lodén & Wessman (2001)')));
  assert.ok(citations.some(c => c.includes("Dal'Belo, Gaspar & Maia Campos (2006)")));
  assert.ok(citations.some(c => c.includes('Agero & Verallo-Rowell (2004)')));
  assert.ok(citations.some(c => c.includes('Fox et al. (2014)')));
  assert.ok(citations.some(c => c.includes('Fluhr, Darlenski & Surber (2008)')));
});

test('validateObservationEntry validates required fields correctly', () => {
  const invalid = validateObservationEntry({});
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.length >= 4);

  const valid = validateObservationEntry({
    date: '2026-10-23',
    appearance: 'Smooth cream',
    colour: 'Ivory',
    texture: 'Light',
    recorder: 'Siddhi Dhokale'
  });
  assert.equal(valid.valid, true);
  assert.equal(valid.errors.length, 0);
});

test('scaleBatchQuantities scales numeric quantities while strictly preserving separate original units', () => {
  const doubleBatch = scaleBatchQuantities(2);
  assert.equal(doubleBatch.length, 6);
  
  const aloe = doubleBatch.find(i => i.name === 'Aloe Vera Gel');
  assert.equal(aloe?.quantity, '40 g');
  assert.equal(aloe?.originalUnit, 'g');

  const roseWater = doubleBatch.find(i => i.name === 'Rose Water');
  assert.equal(roseWater?.quantity, '50 ml');
  assert.equal(roseWater?.originalUnit, 'ml');

  const vitE = doubleBatch.find(i => i.name === 'Vitamin E');
  assert.equal(vitE?.quantity, '4 capsules');
  assert.equal(vitE?.originalUnit, 'capsules');
});

test('clamp and lerp functions behave accurately', () => {
  assert.equal(clamp(5, 0, 10), 5);
  assert.equal(clamp(-3, 0, 10), 0);
  assert.equal(clamp(15, 0, 10), 10);

  assert.equal(lerp(10, 20, 0.5), 15);
  assert.equal(lerp(0, 100, 0), 0);
  assert.equal(lerp(0, 100, 1), 100);
});

test('getSectionProgress computes local progress smoothly within defined bounds', () => {
  assert.equal(getSectionProgress(0.1, 0.2, 0.5), 0);
  assert.equal(getSectionProgress(0.6, 0.2, 0.5), 1);
  assert.ok(Math.abs(getSectionProgress(0.35, 0.2, 0.5) - 0.5) < 0.0001);
});
