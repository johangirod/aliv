window.trace = (...logs) => (x) => console.log(...logs, x) || x;
import { SpringSystem, MathUtil } from 'rebound';
import { max } from 'ramda';
import createHistory from 'history/lib/createHashHistory'

const drawLogo = val => {
    const trans = val * 50;
    document.getElementById('logo-1').style.transform = `translate(${-trans}px, ${-trans}px) scale(${2-val})`
    document.getElementById('logo-2').style.transform = `translate(${trans}px, ${-trans}px) scale(${2-val}) rotate(${val*90}deg)`
    document.getElementById('logo-3').style.transform = `translate(${trans}px, ${trans}px) scale(${2-val}) rotate(${val*180}deg)`
    document.getElementById('logo-4').style.transform = `translate(${-trans}px, ${trans}px) scale(${2-val}) rotate(${-val*90}deg)`
}

const springSystem = new SpringSystem()
const logoSpring = springSystem.createSpring(50, 20)
const logo = document.getElementById('logo')
const brandLogo = document.getElementsByClassName('brand-text')
logo.addEventListener('mouseenter', () =>
    logoSpring.setEndValue(1)
)
logo.addEventListener('mouseleave', () =>
    logoSpring.setEndValue(0)
)
logoSpring.addListener({
    onSpringUpdate(logoSpring) {
        const val = logoSpring.getCurrentValue();
        drawLogo(val);
        [...brandLogo].forEach(el => {
            el.style.opacity =  max(0, val * 1.5 - 0.5)
            el.style.transform = `translate(0px, ${-val*100}px)`
        });
    }
});


[...document.getElementsByClassName('menu-link')].forEach(el => {
    el.addEventListener('click', e => {
        e.preventDefault();
        history.push({
            pathname: el.attributes.href.value
        })
    })
})

function printDesign() {
    document.getElementById('design').class = 'show'
    document.getElementsByClassName('brand-container').item(0).style.position = 'initial';
}

function routes(path) {
    switch (routes) {
        case '/design':
            return printDesign();
        case '/poetry':
            return printPoetry();
        case '/beats':
            return printBeats();
        case '/street':
            return printBeats();
        case '/':
            return printIndex();
    }
}
// Get the current location
const history = createHistory();
// Listen for changes to the current location
const unlisten = history.listen(location => {
    routes(location)
})
routes(history.getCurrentLocation().path)


