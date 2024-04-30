// import assert from 'node:assert';
// let assert

//import * as areas from 'chai'
//import test from 'node:test';
//import * as areas from './src/modulo.js';
const areas = require('../src/modulo.js')

areas.numAleatorio=jest.fn( () => 5)

test('un triangulo de base y altura 4, el area debe ser 4',() => {
    let resultado=areas.calcularArea(2,4);
    except(resultado).toBe(4);
});
