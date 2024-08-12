let output = document.getElementById("output");
let fouff = document.getElementById("sendthing");

fouff.addEventListener("submit", (event) => {
    event.preventDefault();
    thingbox = {
        method: fouff[1].value,
        headers: {
          'Content-Type': 'application/json'
          // Add any other headers as needed
        }
    }
    if(fouff[1].value != "GET") {
        console.log(fouff[1].value);
        thingbox.body = JSON.stringify(fouff[2]);
    }
    fetch(fouff[0].value, thingbox).then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    }).then(data => {
        let test2 = document.createElement("p");
        test2.innerHTML = data.data
        output.appendChild(test2)
        console.log(data.data)
    }).catch(error => {
        console.error('Error:', error);
    });
});
