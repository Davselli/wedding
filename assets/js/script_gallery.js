document.addEventListener("DOMContentLoaded", function() {
    const gallery = document.getElementById('gallery');
    const imageFolder = 'assets/images/wedding/';
    const numberOfImages = 10; // Set this to the number of images you have in the folder

    for (let i = 1; i <= numberOfImages; i++) {
        let img = document.createElement('img');
        img.src = `${imageFolder}image${i}.jpg`;
        img.alt = `Wedding Image ${i}`;
        gallery.appendChild(img);
    }
});