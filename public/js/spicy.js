const obviousMessage = [
    "Did you know walking makes you move?",
    "Don't stick metal in an electrical outlet.",
    "To read faster, buy a yacht.",
    "Do not inhale water.",
    "Don't forget to breathe.",
    "Water is a drink where temperature is flavor.",
    "Press A to continue.",
    "Press X to doubt.",
    "Not eating is not healthy!",
    "Remember to buckle your seat belts!",
    "If you hate painting, don't be a painter.",
    "Did you know the human brain named itself?",
    "Make sure there isn't a jaguar in your bed before sleeping.",
    "Try not to eat poison.",
    "Wear more clothes when it's cold.",
    "Tell your friends to stay away from whales, trust me on this one.",
    "Avoid dying to live longer.",
    "To use a scratch & sniff sticker. (1): Scratch (2): Sniff",
    "A spoon is more useful than a knife when eating soup.",
    "Coconuts more dangerous than sharks.",
    "Opening your eyes can help your vision.",
    "Never plant carrots in your eyes.",
    "If you aren't breathing, you may not be alive.",
    "Every 60 seconds in africa a minute passes.",
    "The floor is made out of floor.",
    "Do not eat plastic.",
    "Do not drink patatos.",
    "To blink correctly, close your eyes and then open them."
]
var width = 800;
var height = 600;
var sizethang = 10
var color = "#f5f5f5";
var svgns = "http://www.w3.org/2000/svg";
var main = document.getElementsByClassName("main")[0];



// Data to be sent in the body of the PUT request (replace with your data)
var clicky = (id) => {
    fetch("/api/spicy", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
          // Add any other headers as needed
        },
        body: JSON.stringify({id: id, color: color})
      })
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json(); // Assuming the response is JSON; you can use response.text() for non-JSON responses
      }).then(data => {
        // This deletes the current SVG and updates it
        document.getElementsByClassName('test2')[0].remove()
        main.appendChild(createSVG(data.data))
        //console.log('Success:', data);
      }).catch(error => {
        console.error('Error:', error);
      });
}

var clicky2 = (setcolor) => {
  color = setcolor;
}

var createSVG = (rectData) => {
  let svg = document.createElementNS(svgns, "svg");
  svg.setAttribute('class', 'test2')
  svg.setAttribute('width', width);
  svg.setAttribute('height', height);
  svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

  rectData.sort((a, b) => a.id - b.id);
  let rect;
  for (let i = 0; i < height / sizethang; i++) {
    for (let j = 0; j < width / sizethang; j++) {
      rect = document.createElementNS(svgns, 'rect');
      rect.setAttribute('x', `${sizethang*j}`);
      rect.setAttribute('y', `${sizethang*i}`);
      rect.setAttribute('height', `${sizethang}`);
      rect.setAttribute('width', `${sizethang}`);
      rect.setAttribute('fill', rectData[(i*(width/sizethang))+j].color || "#ffffff");
      rect.setAttribute('onclick', `clicky(${rectData[(i*(width/sizethang))+j].id})`);
      svg.appendChild(rect)
    }
  }
  return svg;
}

var scuffy = document.getElementById("scuffy");
scuffy.addEventListener("submit", (e) => {
  e.preventDefault();
  if (/^#?([a-f0-9]{6})$/.test(scuffy.children[1].value)) {
    color = scuffy.children[1].value.charAt(0) == '#' ? scuffy.children[1].value : `#${scuffy.children[1].value}`;
  }
});

fetch("/api/spicy").then(response => {
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json(); // Assuming the response is JSON; you can use response.text() for non-JSON responses
}).then(data => {
  main.appendChild(createSVG(data.data));
}).catch(error => {
  console.error('Error:', error);
});

message = document.createElement('h4');
message.innerHTML = obviousMessage[Math.floor(Math.random() * obviousMessage.length)];
main.appendChild(message);