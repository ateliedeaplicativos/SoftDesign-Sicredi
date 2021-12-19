import { User } from './user';

describe('User', () => {
  it('should create an instance', () => {
    expect(new User()).toBeTruthy();
  });

  it('new instance - must have corret values', () => {
    let user = new User();
    expect(user.id).toBe(null);
    expect(user.userName).toBe('');
    expect(user.password).toBe('');
  });
});
