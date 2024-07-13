var svgElement = document.getElementById("cringe")
var panZoomTiger = svgPanZoom(svgElement, {
    dblClickZoomEnabled: false,
    minZoom: 0.1,
    maxZoom: 10,
    fit: false
})

// This should allow when you click on a node on the svg it will select the propper node
var doFillDiv = (id) => {
    alert(`You clicked the node with id ${id}.`)
}