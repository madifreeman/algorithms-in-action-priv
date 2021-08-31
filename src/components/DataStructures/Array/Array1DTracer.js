/* eslint-disable class-methods-use-this */

import Array2DTracer from './Array2DTracer';
import Array1DRenderer from './Array1DRenderer/index';

class Array1DTracer extends Array2DTracer {
  getRendererClass() {
    return Array1DRenderer;
  }

  init() {
    super.init();
    this.chartTracer = null;
  }

  set(array1d = [], algo) {
    const array2d = [array1d];
    super.set(array2d, algo);
    this.syncChartTracer();
  }

  patch(x, v) {
    super.patch(0, x, v);
  }

  depatch(x) {
    super.depatch(0, x);
  }

  // used to highlight sorted elements
  sorted(x) {
    super.sorted(0, x);
  }

  select(sx, ex = sx) {
    super.select(0, sx, 0, ex);
  }

  setVariables(vars, sx, ex = sx) {
    super.setVariables(vars, 0, sx, 0, ex,);
  }

  clearVariables() {
    super.clearVariables();
  }

  deselect(sx, ex = sx) {
    super.deselect(0, sx, 0, ex);
  }

  chart(key) {
    this.chartTracer = key ? this.getObject(key) : null;
    this.syncChartTracer();
  }

  syncChartTracer() {
    if (this.chartTracer) this.chartTracer.data = this.data;
  }

  swapElements(x, y) {
    const newData = this.data
    const tempItem = this.data[0][x];
    newData[0][x] = this.data[0][y];
    newData[0][y] = tempItem;
    this.data = newData
  }
}

export default Array1DTracer;
