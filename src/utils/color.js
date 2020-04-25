function getDarkColor(color, level) {
    var r = /^#[0-9A-Fa-f]{6}$/
    if (!r.test(color)) return console.error('Color must meet format')
    var rgbc = HexToRgb(color);
    for (var i = 0; i < 3; i++) rgbc[i] = Math.floor(rgbc[i] * (1 - level));
    return RgbToHex(rgbc[0], rgbc[1], rgbc[2]);
}
/**
 * @return {void}
 */
function HexToRgb (str) {
    var r = /^#[0-9A-Fa-f]{6}$/
    if (!r.test(str)) return console.error('Color must meet format')
    str = str.replace("#", "")
    var hxs = str.match(/../g)
    for (var i = 0; i < 3; i++) hxs[i] = parseInt(hxs[i], 16)
    return hxs
}

/**
 * transform color
 * @return {void}
 */
function RgbToHex (a, b, c) {
    var r = /^\d{1,3}$/;
    if (!r.test(a) || !r.test(b) || !r.test(c)) return console.error('Color must meet format')
    var hexs = [a.toString(16), b.toString(16), c.toString(16)]
    for (var i = 0; i < 3; i++) if (hexs[i].length == 1) hexs[i] = "0" + hexs[i]
    return "#" + hexs.join("")
}

export {
    getDarkColor,
    HexToRgb,
    RgbToHex
}