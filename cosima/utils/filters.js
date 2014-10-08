var cosima = cosima || {};

/** @namespace */
cosima.filters = {};

cosima.filters.init = function() {
};

/**
 * Moving avarage filter.
 *
 * @constructor
 * @param {number} size - The inittial filter size.
 */
cosima.filters.Mvavrg = function(size)
{
  this.reset(size);
};

/**
 * Input and process value.
 *
 * @param {number} size - The inittial filter size.
 * @returns 
 */
cosima.filters.Mvavrg.prototype.input = function(v) {
  this.array[this.index] = v;

  var sum = 0.0;

  for(var i = 0; i < this.size; i++)
    sum += this.array[i];

  this.index = (this.index + 1) % this.size;

  return sum / this.size;
};

/**
 * Reset and (optionally) resize filter.
 *
 * @constructor
 * @param {number|null} size - The new filter size (optional)
 * @returns 
 */
cosima.filters.Mvavrg.prototype.reset = function(size) {
  if(!size)
    size = this.size;

  this.size = size;
  this.buffer = new ArrayBuffer(size * 4);
  this.array = new Float32Array(this.buffer);
  this.index = 0;
};

cosima.filters.init();
