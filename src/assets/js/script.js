(function ($, window) {
    "use strict";
  
    var thJs = {
      m: function () {
        thJs.d();
        thJs.methods();
      },
  
      d: function () {
        this._window = $(window);
        this._document = $(document);
        this._body = $("body");
        this._html = $("html");
      },
      methods: function () {
        // this.inlineCssActivation();
        // this.niceSelections();
        this.customCountrySelection();
        // this.swiperActivation();
        // this.categoryButtonActivation();
        // this.sudoCode();
        // this.successfullyAddInWishlist();
        // this.successfullyAddInCart();
        // this.productDetailsZoom();
        // this.productQuantity();
        // this.productReview();
        // this.productQuickView();
        // this.countdownActivation();
        // this.priceRangeSlider();
        // this.faqActivation();
        // this.skillBarActivation();
        // this.searchActivation();
        // this.mobileMenuActivation();
        this.wowActivation();
        // this.aosActivation();
        // this.jarallaxAactivation();
        // this.offCanvas();
        // this.siteCart();
        // this.checkoutToggole();
        // this.headerSticky();
        // this.teamCartSocialIconHideShow();
        // this.topToScroll();
        // this.preloader();
        this.triangleShepAnimation();
        this.wishListActivation();
      },
  

  

  

  
      // Start Header Sticky Activation
    //   headerSticky: function () {
    //     $(document).ready(function () {
    //       $(window).on("scroll", function () {
    //         var ScrollBarPostion = $(window).scrollTop();
    //         if (ScrollBarPostion > 100) {
    //           $(".vs__header-area-home-1__header-navigation, .vs__header-area-home-2, .vs__header-area-home-3__bottom-part").addClass("vs__header-sticky");
    //           $(".vs__category-nav").css("display", "none");
    //         } else {
    //           $(".vs__header-area-home-1__header-navigation, .vs__header-area-home-2, .vs__header-area-home-3__bottom-part").removeClass("vs__header-sticky");
    //           $(".vs__category-nav").css("display", "block");
    //         }
    //       })
    //     })
    //   },
      // End Header Sticky Activation

  
  

  

  

  

  


  

  


  

    // Start Wishlist Activation
    wishListActivation: function(){
      $(document).ready(function(){
        $('.th__wishlist-icon').on('click', function(e){
          e.preventDefault();
          $(this).toggleClass('active');
        });
      });
    },
    // End Wishlist Activation

    // Start Triangle Animation
    triangleShepAnimation: function(){
      const $paths = $('.fill-path');
      const groupSize = 3;
      let index = 0;
    
      const directions = ['fill-left', 'fill-top', 'fill-diagonal'];
    
      function cycleFill() {
        // Remove previous animations
        $paths.each(function() {
          $(this).removeClass('fill-left fill-top fill-diagonal').css('opacity', 0);
          this.getBoundingClientRect(); // force reflow
        });
    
        for (let i = 0; i < groupSize; i++) {
          const currentIndex = (index + i) % $paths.length;
          const direction = directions[i % directions.length];
          $paths.eq(currentIndex).addClass(direction);
        }
    
        index = (index + groupSize) % $paths.length;
      }
    
      $(document).ready(function() {
        cycleFill();
        setInterval(cycleFill, 2000);
      });
    },
    // End Triangle Animation

  

  


  
      //  Start Custom Country Selection
      customCountrySelection: function () {
        $(document).ready(function () {
          // Toggle dropdown when clicking on the language selector
          $('.selected-language').click(function (e) {
            e.stopPropagation();
            $('.language-dropdown').toggle();
          });
  
          // Close dropdown when clicking elsewhere on the page
          $(document).click(function () {
            $('.language-dropdown').hide();
          });
  
          // Change selected language when clicking on an option
          $('.language-option').click(function () {
            const lang = $(this).data('lang');
            const flagSvg = $(this).find('.flag').html();
            const langName = $(this).find('.language-name').text();
  
            // Update the selected language
            $('.selected-language .flag').html(flagSvg);
            $('.selected-language .language-name').text(langName);
  
            // Hide dropdown
            $('.language-dropdown').hide();
  
            // You can add additional code here to handle language change
            console.log('Language changed to: ' + lang);
          });
        });
      },
      //  End Custom Country Selection
  
      // Start Inline Css Activation
    //   inlineCssActivation: function () {
    //     $(document).ready(function () {
    //       $("[data-background]").each(function () {
    //         $(this).css(
    //           "background-image",
    //           "url( " + $(this).attr("data-background") + "  )"
    //         );
    //       });
    //     });
    //   },
      // End Inline Css Activation
  
  

  
  
      // Start Wow Activation
      wowActivation: function () {
        $(document).ready(function () {
          new WOW().init();
        });
      },
      // End Wow Activation
  
      // Start Jarallax Activation
      // jarallaxAactivation: function () {
      //   $(document).ready(function () {
      //     $('.jarallax').jarallax({
      //       speed: 0.4,
      //     });
      //   });
      // },
      // End Jarallax Activation
  
    };
  
    thJs.m();
  })(jQuery, window);
  