const getDistanceFromElement = (element, { x, y }) => {
    const { x: xElem, y: yElem } = element.offset()
    return Math.sqrt(Math.pow(x - xElem) + Math.pow(y - yElem));
}