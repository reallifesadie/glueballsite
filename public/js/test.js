let main = document.getElementsByClassName('main')[0];
var clicky = () => {
    fetch("/api/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // Add any other headers as needed
        },
        body: JSON.stringify({data: {}})
    }).then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    }).then(data => {
        let test2 = document.createElement("p");
        test2.innerHTML = data.data
        main.appendChild(test2)
        console.log(data.data)
    }).catch(error => {
        console.error('Error:', error);
    });
}