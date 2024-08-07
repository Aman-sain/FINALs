document.addEventListener("DOMContentLoaded", function() {
    const navOpen = document.querySelector('.navOpen');
    const navClose = document.querySelector('.navClose');
    const navLinks = document.querySelector('.nav-links');
    const searchIcon = document.getElementById('searchIcon');
    const searchBox = document.querySelector('.search-box');

    navOpen.addEventListener('click', () => {
        navLinks.style.display = 'flex';
        navOpen.style.display = 'none';
        navClose.style.display = 'block';
    });

    navClose.addEventListener('click', () => {
        navLinks.style.display = 'none';
        navOpen.style.display = 'block';
        navClose.style.display = 'none';
    });

    searchIcon.addEventListener('click', () => {
        searchBox.style.display = (searchBox.style.display === 'none' || !searchBox.style.display) ? 'block' : 'none';
    });
});
