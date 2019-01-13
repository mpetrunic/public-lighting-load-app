/**
 * @return {number}
 */
function Interpolate(start, end, steps, count) {
  const s = start,
    e = end,
    final = s + (((e - s) / steps) * count);
  return Math.floor(final);
}

function Color(_r, _g, _b) {
  let r, g, b;
  const setColors = function(_r, _g, _b) {
    r = _r;
    g = _g;
    b = _b;
  };

  setColors(_r, _g, _b);
  this.getColors = function() {
    return {
      r: r,
      g: g,
      b: b
    };
  };
}

const red = new Color(232, 0, 0);
const blue = new Color(0,0,255);

export default function pick(value) {
  console.log({value})
  const startColors = blue.getColors(),
    endColors = red.getColors();
  const r = Interpolate(startColors.r, endColors.r, 100, value);
  const g = Interpolate(startColors.g, endColors.g, 100, value);
  const b = Interpolate(startColors.b, endColors.b, 100, value);
  return {r, g, b};
}
