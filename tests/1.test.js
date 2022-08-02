import {expect, test} from 'vitest';
import {Puzzle15Model} from '../src/puzzle-15-model';

test('should work as expected', () => {
  expect(Math.sqrt(4)).toBe(2);
  expect([1, 2]).toEqual([1, 2]);
  expect([1, 2].sort()).toEqual([2, 1].sort());
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

test('test neighbors', () => {
  let model = new Puzzle15Model(16);
  expect(model.neighbors(0)).toEqual([1, 4]);
  expect(model.neighbors(1)).toEqual([0, 2, 5]);
  expect(model.neighbors(2)).toEqual([1, 3, 6]);
  expect(model.neighbors(3)).toEqual([2, 7]);
  expect(model.neighbors(4)).toEqual([0, 5, 8]);
  expect(model.neighbors(5)).toEqual([1, 4, 6, 9]);
  expect(model.neighbors(6)).toEqual([2, 5, 7, 10]);
  expect(model.neighbors(7)).toEqual([3, 6, 11]);
  expect(model.neighbors(8)).toEqual([4, 9, 12]);
  expect(model.neighbors(9)).toEqual([5, 8, 10, 13]);
  expect(model.neighbors(10)).toEqual([6, 9, 11, 14]);
  expect(model.neighbors(11)).toEqual([7, 10, 15]);
  expect(model.neighbors(12)).toEqual([8, 13]);
  expect(model.neighbors(13)).toEqual([9, 12, 14]);
  expect(model.neighbors(14)).toEqual([10, 13, 15]);
  expect(model.neighbors(15)).toEqual([11, 14]);
});
