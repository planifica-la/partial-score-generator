import { SubjectNamePipe } from './subject-name.pipe';

describe('SubjectNamePipe', () => {
  it('create an instance', () => {
    const pipe = new SubjectNamePipe();
    expect(pipe).toBeTruthy();
  });
});
