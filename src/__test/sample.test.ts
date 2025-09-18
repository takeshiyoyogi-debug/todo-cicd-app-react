import { test, expect } from 'vitest';

function sum(a: number, b: number) {
    return a + b;
}

test('sum test', () => {
    //実行したい関数と期待値をセット
    expect(sum(1, 1)).toBe(2);
});