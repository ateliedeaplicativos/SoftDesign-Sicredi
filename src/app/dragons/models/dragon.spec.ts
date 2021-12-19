import { Dragon } from './dragon';

describe('Dragon', () => {
  it('should create an instance', () => {
    expect(new Dragon()).toBeTruthy();
  });

  it('constructor - without parameters - need to set correct values', () => {
    let drag = new Dragon();
    expect(drag.id).toEqual('');
    expect(drag.name).toEqual('');
    expect(drag.type).toEqual('');
    expect(drag.createdAt).toEqual('');
  });

  it('constructor - with parameters - need to set correct values', () => {
    let _parameters = {
      id: '1',
      name: 'old dragon',
      type: 'water',
      createdAt: '2021-01-01',
    }
    let drag = new Dragon(_parameters);
    expect(drag.id).toEqual(_parameters.id);
    expect(drag.name).toEqual(_parameters.name);
    expect(drag.type).toEqual(_parameters.type);
    expect(drag.createdAt).toEqual(_parameters.createdAt);
  });
});
