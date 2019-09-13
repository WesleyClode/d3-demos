function LightenDarkenColor(col, amt) {
    var usePound = false;
    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col, 16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}

const pxStr2numberReg = /([0-9]+\.?[0-9]+)px/

function tsPx2number(s) {
    return Number(pxStr2numberReg.exec(s)[1])
}

function calcWidthHeight(selector) {
    const eve = d3.select(selector)
    const w = eve.style('width')
    const h = eve.style('height')

    return [
        tsPx2number(w),
        tsPx2number(h)
    ]
}

function createSvg(w, h) {
    return d3.select('body')
        .append('svg')
        .attr('width', w)
        .attr('height', h)
        .append('g')
        .attr('transform', `translate(${ w / 2 }, ${ h / 2 })`)
}