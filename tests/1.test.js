import {expect, test} from 'vitest';
import {Puzzle15Model} from '../src/puzzle-15-model';

test('should work as expected', () => {
  expect(Math.sqrt(4)).toBe(2);
});

test('create a model instance', () => {
  let model = new Puzzle15Model(16);
  expect(model.grid.length).toBe(16);
  expect(model.grid[0]).toBe(1);
  expect(model.grid[1]).toBe(2);
  expect(model.grid[2]).toBe(3);
  model.swap(0, 1);
  expect(model.grid[0]).toBe(2);
  expect(model.grid[1]).toBe(1);
});
