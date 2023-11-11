// Remplacez 'VOTRE_CLE_API' par votre clé d'API Google Cloud
const apiKey = 'AIzaSyB1904AQxkyNCmDtOrG7a4joppH5JcWbxA';

// Fonction pour envoyer l'image à l'API et traiter la réponse
function segmentImage(imageData) {
    const apiUrl = 'https://vision.googleapis.com/v1/images:annotate?key=' + apiKey;
    const requestData = {
        requests: [
            {
                image: {
                    content: imageData,
                },
                features: [
                    {
                        type: 'IMAGE_PROPERTIES',
                    },
                    {
                        type: 'OBJECT_LOCALIZATION',
                    },
                ],
            },
        ],
    };

    fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify(requestData),
    })
        .then((response) => response.json())
        .then((data) => {
            // Traitez la réponse de l'API ici
            console.log(data);
        })
        .catch((error) => {
            console.error('Erreur lors de la requête à l\'API Google Cloud Vision', error);
        });
}

// Utilisez cette fonction pour envoyer une image à l'API
function sendImageToAPI(imageData) {
    segmentImage(imageData);
}
