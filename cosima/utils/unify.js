var cosima = cosima || {};

/** @namespace */
cosima.unify = {};

/** 
 *  Initialize unify module.
 *  Unify processing across different platforms.
 *  Requires platform.js
 */
cosima.unify.init = function() {
  this.platform = 0;

  if(platform.os.family == "iOS")
    this.platform = 1;
  else if(platform.os.family == "Android")
    this.platform = 2;
};

/**
 * Unify acceleration (inplace).
 *
 * @param {Object} acc - A 3D acceleration object {x, y, z}.
 */
cosima.unify.acc = function(acc) {
  switch(this.platform)
  {
    case 0:
    case 1: // iOS
    {
      acc.x *= -1;
      acc.y *= -1;
      acc.z *= -1;
    }
      break;
    case 2: // Android
      break;
  }
};

cosima.unify.init();
