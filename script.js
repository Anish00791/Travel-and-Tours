'use strict';

document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const overlay = document.querySelector('[data-overlay]');
    const navbar = document.querySelector('[data-navbar]');
    const navOpenBtn = document.querySelector('[data-nav-open-btn]');
    const navCloseBtn = document.querySelector('[data-nav-close-btn]');
    const navLinks = document.querySelectorAll('[data-nav-link]');
    const header = document.querySelector('[data-header]');
    const goTopBtn = document.querySelector('[data-go-top]');
    const themeToggleCheckbox = document.getElementById('checkbox');

    // Function to toggle navbar
    const toggleNavbar = function() {
        navbar.classList.toggle('active');
        overlay.classList.toggle('active');
    };

    // Event listeners for navbar
    navOpenBtn.addEventListener('click', toggleNavbar);
    navCloseBtn.addEventListener('click', toggleNavbar);
    overlay.addEventListener('click', toggleNavbar);

    // Toggle navigation with animation
    function toggleNav() {
        // Using CSS transitions instead of jQuery animations
        navbar.classList.toggle('active');
        overlay.classList.toggle('active');
        navbar.style.display = navbar.classList.contains('active') ? 'block' : 'none';
    }

    // Event handlers for navigation
    [navOpenBtn, navCloseBtn, overlay].forEach(element => {
        element.addEventListener('click', toggleNav);
    });

    // Handle nav links click
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            toggleNav();
            
            // Smooth scroll to section
            const target = document.querySelector(this.getAttribute('href'));
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Scroll events with throttling
    let scrollTimer;
    window.addEventListener('scroll', function() {
        if (!scrollTimer) {
            scrollTimer = setTimeout(function() {
                if (window.pageYOffset >= 200) {
                    header.classList.add('active');
                    goTopBtn.style.display = 'block';
                    goTopBtn.classList.add('active');
                } else {
                    header.classList.remove('active');
                    goTopBtn.style.display = 'none';
                    goTopBtn.classList.remove('active');
                }
                scrollTimer = null;
            }, 100);
        }
    });

    // Smooth scroll to top
    goTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Theme toggle functionality
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    document.body.classList.add(savedTheme);
    themeToggleCheckbox.checked = savedTheme === 'dark-mode';

    themeToggleCheckbox.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light-mode');
        }
    });

    // Add CSS for smooth transitions
    const style = document.createElement('style');
    style.textContent = `
        .navbar {
            transition: all 0.3s ease;
        }
        .overlay {
            transition: opacity 0.3s ease;
        }
        .go-top {
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    // Search functionality
    const searchBtn = document.querySelector('.search-btn');
    const searchModal = document.getElementById('searchModal');
    const closeSearch = document.querySelector('.close-search');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    // Sample search data (you can replace this with your actual data)
    const searchData = [
        { title: 'San Miguel, Italy', description: 'Beautiful historic town in Italy' },
        { title: 'Burj Khalifa, Dubai', description: 'World\'s tallest building' },
        { title: 'Kyoto Temple, Japan', description: 'Historic Japanese temple' },
        // Add more destinations as needed
    ];

    // Open search modal
    searchBtn.addEventListener('click', () => {
        searchModal.style.display = 'block';
        searchInput.focus();
    });

    // Close search modal
    closeSearch.addEventListener('click', () => {
        searchModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === searchModal) {
            searchModal.style.display = 'none';
        }
    });

    // Search functionality
    searchInput.addEventListener('input', debounce(function() {
        const searchTerm = this.value.toLowerCase();
        const filteredResults = searchData.filter(item => 
            item.title.toLowerCase().includes(searchTerm) || 
            item.description.toLowerCase().includes(searchTerm)
        );
        
        displayResults(filteredResults);
    }, 300));

    // Debounce function to limit API calls
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Display search results
    function displayResults(results) {
        searchResults.innerHTML = '';
        
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-result-item"><p>No results found</p></div>';
            return;
        }

        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.innerHTML = `
                <h4>${result.title}</h4>
                <p>${result.description}</p>
            `;
            
            resultItem.addEventListener('click', () => {
                // Handle click on search result
                // You can add navigation logic here
                console.log(`Selected: ${result.title}`);
                searchModal.style.display = 'none';
            });
            
            searchResults.appendChild(resultItem);
        });
    }
});
