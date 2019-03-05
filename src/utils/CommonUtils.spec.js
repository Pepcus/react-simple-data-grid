import { describe } from 'mocha';
import assert from 'assert';
import { getNoOfPages } from './CommonUtils';
import { tableData } from '../../demo/Data';

describe('CommonUtils', () => {
  describe('#getNoOfPages()', () => {
    it('should return no. of pages when data and records per page is given ', () => {
      assert.equal(getNoOfPages(tableData(), 25), 20);
    });
  });
});
