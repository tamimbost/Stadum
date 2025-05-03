(function ($, window) {
  "use strict";

  /**
   * Main Object for the theme JavaScript logic
   * thJs acts as a namespace to prevent global scope pollution.
   */
  var thJs = {

    /**
     * Main initializer method - called immediately to start everything.
     * This triggers declaration of selectors and all functional modules.
     */
    m: function () {
      thJs.d();          // Declare DOM elements for reuse
      thJs.methods();    // Initialize all functional methods
    },

    /**
     * Commonly used DOM elements are cached here for performance
     * Reduces repetitive DOM queries and increases maintainability
     */
    d: function () {
      this._window = $(window);
      this._document = $(document);
      this._body = $("body");
      this._html = $("html");
    },

    /**
     * All functional modules are initialized here
     * This keeps the `m` method clean and modular
     */
    methods: function () {
      this.inlineCssActivation();       // Sets background images using data attributes
      this.customCountrySelection();    // Dropdown logic for language/country selection
      this.swiperActivation();          // Initializes Swiper sliders
      this.wowActivation();             // WOW.js scroll animation
      this.jarallaxActivation();        // Jarallax parallax effect
      this.triangleShepAnimation();     // SVG triangle fill animation
      this.wishListActivation();        // Wishlist icon toggle
      this.videoPopupActivation();      // Video popup (magnificPopup)
      this.headerSticky();              // Sticky header on scroll
      this.backToTopInit();             // Back-to-top progress circle
      this.siteSmoothScroll();          // Smooth scrolling using Lenis
      this.mobileMenuActivation();      // Mobile menu overlay with animation
    },

    /**
     * Smooth scrolling with Lenis for better UX
     * Enhances default scroll behavior with momentum and easing
     */
    siteSmoothScroll: function () {
      const lenis = new Lenis({
        lerp: 0.09,
        smooth: true,
        smoothWheel: true,
        smoothTouch: false,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    },

    /**
     * Back to Top button with SVG scroll progress animation
     * Also includes smooth scrolling to top when clicked
     */
    backToTopInit: function () {
      $(document).ready(function () {
        var progressPath = document.querySelector('.progress-wrap path');
        var pathLength = progressPath.getTotalLength();

        // Setup path for scroll animation
        progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
        progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect(); // Trigger reflow

        progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';

        var updateProgress = function () {
          var scroll = $(window).scrollTop();
          var height = $(document).height() - $(window).height();
          var progress = pathLength - (scroll * pathLength / height);
          progressPath.style.strokeDashoffset = progress;
        };

        updateProgress();
        $(window).scroll(updateProgress);

        // Toggle button visibility
        $(window).on('scroll', function () {
          if ($(this).scrollTop() > 50) {
            $('.progress-wrap').addClass('active-progress');
          } else {
            $('.progress-wrap').removeClass('active-progress');
          }
        });

        // Scroll to top action
        $('.progress-wrap').on('click', function (event) {
          event.preventDefault();
          $('html, body').animate({ scrollTop: 0 }, 550);
        });
      });
    },

    /**
     * Sticky Header Activation
     * Adds `.sticky` class to header on scroll to enhance navigation visibility
     */
    headerSticky: function () {
      $(document).ready(function () {
        $(window).on("scroll", function () {
          var ScrollBarPosition = $(window).scrollTop();
          if (ScrollBarPosition > 100) {
            $(".sticky-wrapper").addClass("sticky");
          } else {
            $(".sticky-wrapper").removeClass("sticky");
          }
        });
      });
    },

    /**
     * Wishlist icon toggle
     * Changes icon style on click to represent added/removed state
     */
    wishListActivation: function () {
      $('.th__wishlist-icon').on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
      });
    },

    /**
     * Triangle animation effect
     * Animates fill-direction class on SVG paths in a cycle
     */
    triangleShepAnimation: function () {
      const $paths = $('.fill-path');
      const groupSize = 3;
      let index = 0;
      const directions = ['fill-left', 'fill-top', 'fill-diagonal'];

      function cycleFill() {
        $paths.each(function () {
          $(this).removeClass('fill-left fill-top fill-diagonal').css('opacity', 0);
          this.getBoundingClientRect(); // Force reflow
        });

        for (let i = 0; i < groupSize; i++) {
          const currentIndex = (index + i) % $paths.length;
          const direction = directions[i % directions.length];
          $paths.eq(currentIndex).addClass(direction);
        }

        index = (index + groupSize) % $paths.length;
      }

      cycleFill();
      setInterval(cycleFill, 2000);
    },

    /**
     * Video popup activation using Magnific Popup
     * Supports YouTube/Vimeo via iframe
     */
    videoPopupActivation: function () {
      $('.th__video-play-button').magnificPopup({
        type: 'iframe'
      });
    },

    /**
     * Language / Country selector logic
     * Toggles language dropdown and updates UI on selection
     */
    customCountrySelection: function () {
      $('.selected-language').on('click', function (e) {
        e.stopPropagation();
        $('.language-dropdown').toggle();
      });

      $(document).on('click', function () {
        $('.language-dropdown').hide();
      });

      $('.language-option').on('click', function () {
        const lang = $(this).data('lang');
        const flagSvg = $(this).find('.flag').html();
        const langName = $(this).find('.language-name').text();

        $('.selected-language .flag').html(flagSvg);
        $('.selected-language .language-name').text(langName);
        $('.language-dropdown').hide();

        console.log('Language changed to: ' + lang);
      });
    },

    /**
     * Applies background image dynamically from data attribute
     * Useful for keeping HTML cleaner and more flexible
     */
    inlineCssActivation: function () {
      $("[data-background]").each(function () {
        $(this).css("background-image", "url(" + $(this).attr("data-background") + ")");
      });
    },

    /**
     * WOW.js animation on scroll trigger
     * Adds animation classes to elements as they appear in viewport
     */
    wowActivation: function () {
      new WOW().init();
    },

    /**
     * Parallax effect for backgrounds using Jarallax
     */
    jarallaxActivation: function () {
      $('.jarallax').jarallax({
        speed: 0.4
      });
    },

    /**
     * Swiper slider activation for multiple components
     * Supports instructors carousel, hero banner, testimonials
     */
    swiperActivation: function () {
      if ($(".th__home-three-instructros-slider").length > 0) {
        new Swiper(".th__home-three-instructros-slider", {
          slidesPerView: 4,
          spaceBetween: 24,
          loop: true,
          breakpoints: {
            150: { slidesPerView: 1 },
            550: { slidesPerView: 2 },
            991: { slidesPerView: 3 },
            1199: { slidesPerView: 4 }
          },
          navigation: {
            nextEl: ".th__swiper-next-arrow",
            prevEl: ".th__swiper-prev-arrow"
          }
        });
      }

      if ($(".th__hero-slider-home-3").length > 0) {
        new Swiper(".th__hero-slider-home-3", {
          slidesPerView: 1,
          effect: "fade",
          loop: true,
          speed: 2000,
          autoplay: {
            delay: 3000
          },
          pagination: {
            el: ".swiper-pagination",
            clickable: true
          }
        });
      }

      if ($(".th__testimonial-slider").length > 0) {
        new Swiper(".th__testimonial-slider", {
          loop: true,
          grabCursor: true,
          navigation: {
            nextEl: ".th__testimonial-next-arrow",
            prevEl: ".th__testimonial-prev-arrow"
          },
          on: {
            slideChange: function () {
              rotateImages();
            }
          }
        });

        function rotateImages() {
          const $last = $(".image-stack img").last();
          $last.prependTo(".image-stack");
          updateImageStack();
        }

        function updateImageStack() {
          const $images = $(".image-stack img");
          $images.removeClass("active second third rest");

          $images.each(function (index) {
            if (index === 0) $(this).addClass("active");
            else if (index === 1) $(this).addClass("second");
            else if (index === 2) $(this).addClass("third");
            else $(this).addClass("rest");
          });
        }

        updateImageStack(); // Initialize once on load
      }
    },

    /**
     * Mobile menu with animated overlay and submenu toggles
     * Uses custom CSS variables to create click ripple animation
     */
    mobileMenuActivation: function () {
      $('.th__mobile-menubar').click(function (e) {
        var rect = e.target.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        $('.th__overlay').css({
          '--x': x + 'px',
          '--y': y + 'px'
        }).addClass('th__animating');

        setTimeout(function () {
          $('.th__mobile-menu, .th__overlay').addClass('th__active');
          animateNavItems();
        }, 50);

        setTimeout(function () {
          $('.th__overlay').removeClass('th__animating');
        }, 500);
      });

      $('.th__close-btn, .th__overlay').click(function () {
        $('.th__mobile-menu, .th__overlay').removeClass('th__active');
      });

      $('.th__nav-link').click(function (e) {
        e.preventDefault();

        var $submenu = $(this).next('.th__submenu');
        var $toggleBtn = $(this).find('.th__toggle-btn');

        $('.th__submenu').not($submenu).slideUp().removeClass('th__active');
        $('.th__toggle-btn').not($toggleBtn).removeClass('th__active');

        $submenu.slideToggle(function () {
          if ($submenu.is(':visible')) {
            $submenu.addClass('th__active');
            $toggleBtn.addClass('th__active');
            animateSubmenuItems($submenu);
          } else {
            $submenu.removeClass('th__active');
            $toggleBtn.removeClass('th__active');
          }
        });
      });

      function animateNavItems() {
        $('.th__nav-item').each(function (index) {
          $(this).css({
            'animation': `fadeInRight 0.3s ease forwards ${index * 0.1}s`,
            'opacity': '0'
          });
        });
      }

      function animateSubmenuItems($submenu) {
        $submenu.find('.th__submenu-item').each(function (index) {
          $(this).css({
            'animation': `fadeInDown 0.3s ease forwards ${index * 0.1}s`,
            'opacity': '0'
          });
        });
      }

      $(window).on('resize', function () {
        if ($(window).width() > 1199) {
          $('.th__mobile-menu, .th__overlay').removeClass('th__active');
          $('.th__submenu').slideUp().removeClass('th__active');
          $('.th__toggle-btn').removeClass('th__active');
        }
      });
    }
  };

  // Initialize all on document ready
  thJs.m();

})(jQuery, window);
