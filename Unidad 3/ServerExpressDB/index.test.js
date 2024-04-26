import * as chai  from 'chai';
import test from 'node.test';
import * as areas from '../src/modulo.js'

chai.use(chaiHttp);

describe('Prueba del modulo.js', () => {
    it('fails, as expected', function(done) { // <= Pass in done callback
        chai.request('http://localhost:8000')
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(123);
          done();                               // <= Call done to signal callback end
        });
      });
      
      it('succeeds silently!', () => {   // <= No done callback
        chai.request('http://localhost:8000')
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(123);    // <= Test completes before this runs
        });
      });
})