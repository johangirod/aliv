import { pipe, min, max, compose, repeat, join, __ } from 'ramda';
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
    easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t },
    // bounce out effect
    easeOutElastic:function(t,b,c,d){
       var b = 0;
       var d = 1;
       var c = 1;
       var s=1.70158;
       var p=0;
       var a=c;
       if(t==0)return b;
       if((t/=d)==1)return b+c;if(!p)p=d*.3;
       if(a<Math.abs(c)){ a=c; var s=p/4;}
       else var s=p/(2*Math.PI)*Math.asin(c/a);
       return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b;
    },
}


const normalizedDistanceFrom = (element) => ({ x, y }) => {
    const { clientWidth: dx, clientHeight: dy } = element;
    let { offsetLeft: xElem, offsetTop: yElem } = element;
    xElem += dx / 2;
    yElem += dy / 2;
    return Math.sqrt(Math.pow((x - xElem) / (3*dx), 2) + Math.pow((y - yElem) / (3*dy), 2))
}


const gradient = (proximity) => {
    return `<radialGradient id="RadialGradient1" r="${proximity*100}%">
        <stop offset="0%" stop-color="rgba(255, 255, 255, 0)"/>
        <stop offset="100%" stop-color="rgba(255, 255, 255, 1)"/>
    </radialGradient>`;
}


const logo = (proximity) => {
    const trans = proximity * 50;
    document.getElementById('logo-1').setAttribute('transform',`translate(${-trans} ${-trans})`)
    document.getElementById('logo-2').setAttribute('transform',`translate(${trans} ${-trans}) rotate(${proximity*90} 100 100)`)
    document.getElementById('logo-3').setAttribute('transform',`translate(${trans} ${trans}) rotate(${proximity*180} 100 100)`)
    document.getElementById('logo-4').setAttribute('transform',`translate(${-trans} ${trans}) rotate(${-proximity*90} 100 100)`)
}

const displayGradient = (template) =>
    document.getElementById('RadialGradient1').outerHTML = template

const toCoordinate = ({ pageX: x, pageY: y }) => ({ x, y })

const proximity = pipe(
    toCoordinate,
    normalizedDistanceFrom(document.getElementById('logo')),
    x => x,
    min(1),
    x => 1 - x,
    EasingFunctions.easeInCubic,
    EasingFunctions.easeOutElastic
)

const doParallel = (f, g) => x => { f(x); g(x); }

document.onmousemove = pipe(
    proximity,
    logo
    // doParallel(
        // compose(displayGradient, gradient),
    // )
)


