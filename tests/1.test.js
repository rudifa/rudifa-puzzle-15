import {expect, test} from 'vitest';
import {Puzzle15Model} from '../src/puzzle-15-model';

test('should work as expected', () => {
  expect(Math.sqrt(4)).toBe(2);
  expect([1, 2]).toEqual([1, 2]);
  expect([1, 2].sort()).toEqual([2, 1].sort());
});

test('create a model instance', () => {
  let model = new Puzzle15Model(); // create a default 4x4 grid
  expect(model.grid.length).toBe(16);
  expect(model.grid[0]).toBe(1);
  expect(model.grid[1]).toBe(2);
  expect(model.grid[2]).toBe(3);
  model.swap(0, 1);
  expect(model.grid[0]).toBe(2);
  expect(model.grid[1]).toBe(1);
});

test('neighbors', () => {
  let model = new Puzzle15Model(16); // create a 4x4 grid
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

test('distance', () => {
  let model = new Puzzle15Model(16);
  expect(model.distance(0)).toBe(0);
  expect(model.distance(1)).toBe(0);
  expect(model.distance(2)).toBe(0);
  expect(model.distance(3)).toBe(0);
  expect(model.distance(4)).toBe(0);
  expect(model.distance(5)).toBe(0);
  expect(model.distance(6)).toBe(0);
  expect(model.distance(7)).toBe(0);
  expect(model.distance(8)).toBe(0);
  expect(model.distance(9)).toBe(0);
  expect(model.distance(10)).toBe(0);
  expect(model.distance(11)).toBe(0);
  expect(model.distance(12)).toBe(0);
  expect(model.distance(13)).toBe(0);
  expect(model.distance(14)).toBe(0);
  expect(model.distance(15)).toBe(0);
});

test('scramble', () => {
  let model = new Puzzle15Model(16);
  let total1 = model.totalDistance();
  // console.log(`model.grid: ${model.grid} total1: ${total1}`);
  expect(total1).toBe(0);
  model.swap(2, 1);
  model.swap(3, 7);
  model.scramble(30);
  let total2 = model.totalDistance();
  expect(total1).toBeLessThan(total2);
  // console.log(`model.grid: ${model.grid} total1: ${total1}, total2: ${total2}`);
});

test('to - from json', () => {
  let model = new Puzzle15Model(16);
  model.scramble(30);
  let json = model.toJson();
  let model2 = new Puzzle15Model(16);
  model2.fromJson(json);
  expect(model2.grid).toEqual(model.grid);
  // console.log(`json: ${json}`);
});
