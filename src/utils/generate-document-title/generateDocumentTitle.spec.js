import generateDocumentTitle from './generateDocumentTitle';

describe('generateDocumentTitle', () => {
  it('should generate title when passed a string', () => {
    const result = generateDocumentTitle('Timecard');
    expect(result).toEqual('Callisto | Timecard');
  });
});
