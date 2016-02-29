import { pipe, min, compose, repeat, join, __ } from 'ramda';
window.trace = (...logs) => (x) => console.log(...logs, x) || x;

const EasingFunctions = {
    // no easing, no acceleration
    linear: function (t) { return t },
    // accelerating from zero velocity
    easeInQuad: function (t) { return t*t },
    // decelerating to zero velocity
    easeOutQuad: function (t) { return t*(2-t) },
    // acceleration until halfway, then deceleration
    easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
    // accelerating from zero velocity
    easeInCubic: function (t) { return t*t*t },
    // decelerating to zero velocity
    easeOutCubic: function (t) { return (--t)*t*t+1 },
    // acceleration until halfway, then deceleration
    easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
    // accelerating from zero velocity
    easeInQuart: function (t) { return t*t*t*t },
    // decelerating to zero velocity
    easeOutQuart: function (t) { return 1-(--t)*t*t*t },
    // acceleration until halfway, then deceleration
    easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
    // accelerating from zero velocity
    easeInQuint: function (t) { return t*t*t*t*t },
    // decelerating to zero velocity
    easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
    // acceleration until halfway, then deceleration
    easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t }
}


const normalizedDistanceFrom = (element) => ({ x, y }) => {
    const { clientWidth: dx, clientHeight: dy } = element;
    let { offsetLeft: xElem, offsetTop: yElem } = element;
    xElem += dx / 2;
    yElem += dy / 2;
    return Math.sqrt(Math.pow((x - xElem) / (4*dx), 2) + Math.pow((y - yElem) / (4*dy), 2))
}


const radialGradient = (distance) => {
    const color = compose(join(', '), repeat(__, 3), Math.round)(distance*255);
    console.log(color)
    return `<radialGradient id="RadialGradient1" r="${distance*150}%">
        <stop offset="0%" stop-color="rgba(0, 0, 0 ,0)"/>
        <stop offset="100%" stop-color="rgba(0, 0, 0, 1}"/>
    </radialGradient>`;
}

const displayGradient = (template) =>
    document.getElementById('RadialGradient1').outerHTML = template

const toCoordinate = ({ pageX: x, pageY: y }) => ({ x, y })

document.onmousemove = pipe(
    toCoordinate,
    normalizedDistanceFrom(document.getElementById('logo')),
    min(1),
    x => 1 - x,
    EasingFunctions.easeInCubic,
    radialGradient,
    displayGradient
)