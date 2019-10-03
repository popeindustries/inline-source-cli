'use strict';

const { expect } = require('chai');
const exec = require('child_process').exec;
const readFile = require('fs').readFile;

describe('Inline Source CLI', () => {
  it('should inline the file properly', (done) => {
    exec('node dist/index.js test/fixtures/foo.html test/out/foo.html', (err, stdout, stderr) => {
      readFile('test/out/foo.html', 'utf8', (err, data) => {
        expect(data).to.equal(
          '<script>var foo = this;\nconsole.log(foo);\n</script>\n'
        );
        done();
      });
    });
  });

  it('should inline and compress the file properly', (done) => {
    exec('node dist/index.js --compress test/fixtures/foo.html test/out/foo.html', (err, stdout, stderr) => {
      readFile('test/out/foo.html', 'utf8', (err, data) => {
        expect(data).to.equal(
          '<script>var foo=this;console.log(foo);</script>\n'
        );
        done();
      });
    });
  });
});
