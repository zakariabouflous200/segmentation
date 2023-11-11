const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
    dropdown.addEventListener('mouseenter', () => {
        dropdown.querySelector('.dropdown-content').style.opacity = '1';
        dropdown.querySelector('.dropdown-content').style.transform = 'translateY(0)';
    });

    dropdown.addEventListener('mouseleave', () => {
        dropdown.querySelector('.dropdown-content').style.opacity = '0';
        dropdown.querySelector('.dropdown-content').style.transform = 'translateY(-10px)';
    });
});
