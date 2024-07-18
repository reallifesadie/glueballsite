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
let sizethang = 10

var main = document.getElementsByClassName("main")[0];
    
var svgns = "http://www.w3.org/2000/svg";
var svg = document.createElementNS(svgns, "svg");
svg.setAttribute('width', width);
svg.setAttribute('height', height);
svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

fetch("/api/spicy").then(response => {
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json(); // Assuming the response is JSON; you can use response.text() for non-JSON responses
}).then(data => {
    data.data.sort((a, b) => a.id - b.id);
    let rect;
    for (let i = 0; i < height / sizethang; i++) {
        for (let j = 0; j < width / sizethang; j++) {
            rect = document.createElementNS(svgns, 'rect');
            rect.setAttribute('x', `${sizethang*j}`);
            rect.setAttribute('y', `${sizethang*i}`);
            rect.setAttribute('height', `${sizethang}`);
            rect.setAttribute('width', `${sizethang}`);
            rect.setAttribute('fill', data.data[(i*(width/sizethang))+j].color || "#ffffff");
            rect.setAttribute('onclick', `clicky(${data.data[(i*(width/sizethang))+j].id})`);
            //console.log(`${data.data[(i*(width/sizethang))+j].id} ${(i*(width/sizethang))+j}`)
            svg.appendChild(rect)
        }
    }
}).catch(error => {
    console.error('Error:', error);
});

main.appendChild(svg);
message = document.createElement('h4');
message.innerHTML = obviousMessage[Math.floor(Math.random() * obviousMessage.length)]
main.appendChild(message)

// Data to be sent in the body of the PUT request (replace with your data)
var clicky = (id) => {
    fetch("/api/spicy", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
          // Add any other headers as needed
        },
        body: JSON.stringify({id: id, color: "#ffffff"})
      })
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json(); // Assuming the response is JSON; you can use response.text() for non-JSON responses
      }).then(data => {
        console.log('Success:', data);
      }).catch(error => {
        console.error('Error:', error);
      });
}