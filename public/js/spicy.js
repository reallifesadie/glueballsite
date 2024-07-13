var width = 600;
var height = 800;
let sizethang = 10
    
var svgns = "http://www.w3.org/2000/svg";

var main = document.getElementsByClassName("main")[0];
// let test2 = document.createElement("h1");
// test2.innerHTML = "Test2"
// main.appendChild(test2);

var svg = document.createElementNS(svgns, "svg");
svg.setAttribute('width', width);
svg.setAttribute('height', height);
svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");


let rect;

for (let i = 0; i < width / sizethang; i++) {
    for (let j = 0; j < height / sizethang; j++) {
        rect = document.createElementNS(svgns, 'rect');
        rect.setAttribute('x', `${sizethang*i}`);
        rect.setAttribute('y', `${sizethang*j}`);
        rect.setAttribute('height', `${sizethang}`);
        rect.setAttribute('width', `${sizethang}`);
        rect.setAttribute('fill', `#${Math.round(0xffffff * Math.random()).toString(16)}`);
        svg.appendChild(rect)
    }
}

main.appendChild(svg);