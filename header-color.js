window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const headerLogo = document.querySelector('header .logo a');
    const headerLinks = document.querySelectorAll('header .links a');

    let isBlackSection = false;

    sections.forEach(function(section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            const backgroundColor = window.getComputedStyle(section).backgroundColor;

            // Check if the background color is black
            if (backgroundColor === 'rgb(0, 0, 0)') {
                headerLogo.style.color = 'white';
                headerLinks.forEach(function(link) {
                    link.style.color = 'white';
                });
                isBlackSection = true;
            } else {
                headerLogo.style.color = 'black';
                headerLinks.forEach(function(link) {
                    link.style.color = 'black';
                });
                isBlackSection = false;
            }
        }
    });

    // Ensure that the header text color is set to white only when a section with a black background is visible
    if (isBlackSection) {
        headerLogo.style.color = 'white';
        headerLinks.forEach(function(link) {
            link.style.color = 'white';
        });
    }
});
