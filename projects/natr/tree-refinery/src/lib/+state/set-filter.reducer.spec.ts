import {initialState, setFilterReducer} from './set-filter.reducer';

describe('SetFilter Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous +state', () => {
      const action = {} as any;

      const result = setFilterReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
