import { test, describe } from 'node:test';
import assert from 'node:assert';
import { dummy } from '../utils/list_helpers.js';

test('always return 1', () => assert.strictEqual(dummy([]), 1));
