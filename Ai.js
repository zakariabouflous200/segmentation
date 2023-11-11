// JavaScript
const imageCanvas = document.getElementById('imageCanvas');
const annotateButtonAi = document.getElementById('annotateButtonAi');

const imageInput = document.getElementById('imageInput');

imageInput.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const imageURL = URL.createObjectURL(file);
        const img = new Image();
        img.onload = function() {
            const ctx = imageCanvas.getContext('2d');
            imageCanvas.width = img.width;
            imageCanvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
        };
        img.src = imageURL;
    }
});



// Chargez le modèle COCO-SSD
cocoSsd.load().then(model => {
    annotateButtonAi.addEventListener('click', async () => {
        const ctx = imageCanvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, imageCanvas.width, imageCanvas.height);
        
        // Prédisez les objets dans l'image
        const predictions = await model.detect(imageData);

        // Dessinez les boîtes de délimitation des objets
        ctx.drawImage(imageCanvas, 0, 0); // Assurez-vous que l'image est visible sur le canevas

        predictions.forEach(prediction => {
            const [x, y, width, height] = prediction.bbox;
            const label = `${prediction.class} (${Math.round(prediction.score * 100)}%)`;

            // Dessinez une boîte de délimitation
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.rect(x, y, width, height);
            ctx.stroke();

            // Affichez le label à côté de la boîte de délimitation
            ctx.font = '18px Arial';
            ctx.fillStyle = 'red';
            ctx.fillText(label, x, y > 10 ? y - 5 : 10);
        });
    });
});
