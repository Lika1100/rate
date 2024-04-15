import { studentsPageSlice } from "./studentsPage";

describe('comparatorChangeSlice.reducer', function() {
    it('should change desc if the same column was clicked', () => {
      const a = () => {};

      const state = {
        sorting: {
          keyExtractor: a,
          desc: true
        },
      };
      const action = studentsPageSlice.actions.setSorting(a);

      const actualResult = studentsPageSlice.reducer(state, action);
      const expectedResult = {
        sorting: {
          keyExtractor: a,
          desc: false
        },
      };

      expect(actualResult).toEqual(expectedResult);
    })
    it('should change keyExtractor and keep desk true if different column was clicked and desc was true', () => {
        const a = () => {};
        const b = () => {};

        const state = {
            sorting: {
              keyExtractor: a,
              desc: true
            },
        };
        const action = studentsPageSlice.actions.setSorting(b);

        const actualResult = studentsPageSlice.reducer(state, action);
        const expectedResult = {
            sorting: {
              keyExtractor: b,
              desc: true
            },
          };
        expect(actualResult).toEqual(expectedResult);
    })
    it('should change keyExtractor and set desk true if different column was clicked and desc was false', () => {
        const a = () => {};
        const b = () => {};

        const state = {
            sorting: {
              keyExtractor: a,
              desc: false
            },
        };
        const action = studentsPageSlice.actions.setSorting(b);

        const actualResult = studentsPageSlice.reducer(state, action);
        const expectedResult = {
            sorting: {
              keyExtractor: b,
              desc: true
            },
          };
        expect(actualResult).toEqual(expectedResult);
    })
})