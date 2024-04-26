import * as chai from 'chai';
import test from 'node:test';
import * as area from '../src/AreaTriangulo.js';

test('Calcular área de un triángulo', () => {
    let resultado = area.calcularArea(10, 5);
    assert.strictEqual(resultado, 25);
});










