const imageInput = document.getElementById('imageInput');
        const imageCanvas = document.getElementById('imageCanvas');
        const ctx = imageCanvas.getContext('2d');
        let drawing = false;

        let lastX, lastY;
        let currentTool = 'pen';
        const labels = [];
        let isLabeling = false;
        const history = [];
        let isUndoing = false;

        imageInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            const imageURL = URL.createObjectURL(file);

            const img = new Image();
            img.onload = function() {
                imageCanvas.width = img.width;
                imageCanvas.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);
                saveToHistory();
            };
            img.src = imageURL;
        });

        imageCanvas.addEventListener('mousedown', (e) => {
            drawing = true;
            [lastX, lastY] = [e.offsetX, e.offsetY];
        });

        imageCanvas.addEventListener('mouseup', () => drawing = false);
        imageCanvas.addEventListener('mouseout', () => drawing = false);

        imageCanvas.addEventListener('mousemove', (e) => {
            const rect = imageCanvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
        
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.lineWidth = document.getElementById('penSize').value;
            ctx.strokeStyle = document.getElementById('penColor').value;
        
            if (isAnnotationMode) { // Vérifie si le mode d'annotation est activé
                if (isLabeling) {
                    addLabel(x, y);
                }
            } else { // Mode de dessin
                if (!drawing) return;
        
                if (currentTool === 'pen' || currentTool === 'marker') {
                    ctx.beginPath();
                    ctx.moveTo(lastX, lastY);
                    ctx.lineTo(x, y);
                    ctx.stroke();
                }
            }
        
            lastX = x;
            lastY = y;
            saveToHistory();
        });

        const penTool = document.getElementById('penTool');
        const markerTool = document.getElementById('markerTool');
        const labelTool = document.getElementById('labelTool');
        const saveButton = document.getElementById('saveButton');
        const undoButton = document.getElementById('undoButton');
        const segmentButton = document.getElementById('segmentButton');
        const annotateButton = document.getElementById('annotateButton');
           
        let isAnnotationMode = false;
        annotateButton.addEventListener('click', function() {
            if (isAnnotationMode) {
                isAnnotationMode = false;
                annotateButton.textContent = 'Activer le mode d\'annotation';
            } else {
                isAnnotationMode = true;
                annotateButton.textContent = 'Désactiver le mode d\'annotation';
            }
        });

        segmentButton.addEventListener('click', function() {
            // Obtenez l'image actuelle sur le canevas
            const imageData = imageCanvas.toDataURL('image/png');

            // Appelez la fonction pour envoyer l'image à l'API de segmentation
            segmentImage(imageData);
        });

        penTool.addEventListener('click', function() {
            currentTool = 'pen';
            drawing = true;
            ctx.globalCompositeOperation = 'source-over';
            isLabeling = false;
        });

        markerTool.addEventListener('click', function() {
            currentTool = 'marker';
            drawing = true;
            ctx.globalCompositeOperation = 'source-over';
            isLabeling = false;
        });

        labelTool.addEventListener('click', function() {
            currentTool = 'label';
            drawing = false;
            isLabeling = true;
        });


        const clearButton = document.getElementById('clearButton'); // Bouton Effacer

        clearButton.addEventListener('click', function() {
            ctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height); // Efface toutes les étiquettes
            labels.length = 0; // Efface également toutes les étiquettes
            redrawCanvas(); // Redessinez le canevas vide
        });

        undoButton.addEventListener('click', undo);

        function saveToHistory() {
            if (!isUndoing) {
                const snapshot = imageCanvas.toDataURL('image/png');
                history.push(snapshot);
            }
        }

        function undo() {
            if (history.length > 1) {
                isUndoing = true;
                history.pop();
                const lastSnapshot = history[history.length - 1];
                const img = new Image();
                img.onload = function() {
                    ctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
                    ctx.drawImage(img, 0, 0, img.width, img.height);
                    isUndoing = false;
                };
                img.src = lastSnapshot;
            }
        }

        function addLabel(x, y) {
            if (isAnnotationMode) {
                const label = prompt('Entrez le texte de l\'étiquette :', '');
        
                if (label !== null) {
                    labels.push({ x, y, text: label });
                    redrawCanvas();
                }
            }
        }

        function redrawCanvas() {
            const img = new Image();
            img.onload = function() {
                ctx.drawImage(img, 0, 0, img.width, img.height);
                for (const label of labels) {
                    ctx.font = '16px Arial';
                    ctx.fillStyle = 'red';
                    ctx.fillText(label.text, label.x, label.y);
                }
            };
            img.src = imageCanvas.toDataURL('image/png');
        }

        saveButton.addEventListener('click', function() {
            if (isLabeling) {
                isLabeling = false;
                redrawCanvas();
            }
            const dataURL = imageCanvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.href = dataURL;
            downloadLink.download = 'annotated_image.png';
            downloadLink.click();
        });