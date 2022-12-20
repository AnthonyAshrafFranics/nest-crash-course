import { Middleware } from './example.middleware';

describe('Middleware', () => {
  it('should be defined', () => {
    expect(new Middleware()).toBeDefined();
  });
});
