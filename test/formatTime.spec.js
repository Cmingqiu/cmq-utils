import { describe, test } from 'jest';
import formatTime from '../src/formatTime';

describe('测试formatTime', () => {
  test(formatTime('2022-12-12 10:10:10')).toBe('2022-12-12');
});
