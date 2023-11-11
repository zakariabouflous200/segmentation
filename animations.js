function checkVisibility() {
    const elements = document.querySelectorAll('.about-content, .about2-content, .about3-content, #home-content');

    elements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        // Vérifiez si l'élément est visible dans la fenêtre
        if (elementTop < window.innerHeight - 100 && elementBottom > 10) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        } else {
            // Lorsque l'élément n'est plus visible, masquez-le à nouveau
            element.style.opacity = 0;
            element.style.transform = 'translateY(40px)';
        }
    });
}

window.addEventListener('scroll', checkVisibility);
window.addEventListener('resize', checkVisibility);

// Déclenchez la fonction une fois au chargement de la page
window.addEventListener('load', checkVisibility);
