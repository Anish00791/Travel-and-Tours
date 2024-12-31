'use strict';

$(document).ready(function() {
    // Cache jQuery selectors
    const $overlay = $("[data-overlay]");
    const $navbar = $("[data-navbar]");
    const $navOpenBtn = $("[data-nav-open-btn]");
    const $navCloseBtn = $("[data-nav-close-btn]");
    const $navLinks = $("[data-nav-link]");
    const $header = $("[data-header]");
    const $goTopBtn = $("[data-go-top]");

    // Toggle navigation with smooth animation
    function toggleNav() {
        $navbar.slideToggle(300).toggleClass("active");
        $overlay.fadeToggle(300).toggleClass("active");
    }

    // Event handlers for navigation
    $navOpenBtn.add($navCloseBtn).add($overlay).on("click", toggleNav);

    // Close navigation when clicking nav links
    $navLinks.on("click", function() {
        toggleNav();
        // Smooth scroll to section
        const target = $(this).attr("href");
        $('html, body').animate({
            scrollTop: $(target).offset().top - 70
        }, 800);
        return false;
    });

    // Scroll events with throttling
    let scrollTimer;
    $(window).on("scroll", function() {
        if (!scrollTimer) {
            scrollTimer = setTimeout(function() {
                if ($(window).scrollTop() >= 200) {
                    $header.addClass("active");
                    $goTopBtn.fadeIn().addClass("active");
                } else {
                    $header.removeClass("active");
                    $goTopBtn.fadeOut().removeClass("active");
                }
                scrollTimer = null;
            }, 100);
        }
    });

    // Smooth scroll to top
    $goTopBtn.on("click", function() {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
});