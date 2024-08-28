const dropdown2 = document.getElementById('dropdown2');
const dropdown1 = document.getElementById('dropdown1');
dropdown2.style.display = 'none'
dropdown1.style.display = 'none'

function toggleDropdown(element) {
    var spock = document.getElementById(element)
    spock.style.display = spock.style.display === 'block' ? 'none' : 'block';
}

const images = ['/pictures/icecream/1.png', '/pictures/icecream/1.png', '/pictures/icecream/3.png', '/pictures/icecream/4.png', '/pictures/icecream/5.png', '/pictures/icecream/6.png', '/pictures/icecream/7.png', '/pictures/icecream/8.png', '/pictures/icecream/9.png']; // Add your image URLs here
const imageContainer = document.querySelector('.image-container');

function createImage() {
    const img = document.createElement('img');
    img.classList.add('image');

    const size = Math.random() * 50 + 10;
    img.style.width = `${size}px`;
    img.style.height = `${size}px`;

    img.src = images[Math.floor(Math.random() * images.length)]; // Random image from the array

    img.style.left = `${Math.random() * 100}vw`;
    img.style.animationDuration = `${Math.random() * 3 + 2}s`;

    imageContainer.appendChild(img);

    setTimeout(() => {
        img.remove();
    }, 5000);
}

setInterval(createImage, 200);