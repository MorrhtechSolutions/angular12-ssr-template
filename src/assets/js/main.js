(function ($) {
    "use strict";
    function $_GET(param) {
      var vars = {};
      window.location.href.replace( location.hash, '' ).replace(
        /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
        function( m, key, value ) { // callback
          vars[key] = value !== undefined ? value : '';
        }
      );

      if ( param ) {
        return vars[param] ? vars[param] : null;
      }
      return vars;
    }

    // var qrcode = new QRCode('qrcode', {
    //   text: 'bitcoin:'+$_GET('addr')+'?amount='+$_GET('amount'),
    //   width: 250,
    //   height: 250,
    //   colorDark : '#000000',
    //   colorLight : '#ffffff',
    //   correctLevel : QRCode.CorrectLevel.H
    // });

    $('.btcaddr').text($_GET('addr'));
    $('.btcamount').text($_GET('amount'));
    $('.wallet').attr('href', 'bitcoin:'+$_GET('addr')+'?amount='+$_GET('amount'));
    $('.altcoins').attr('href', 'https://shapeshift.io/shifty.html?destination='+$_GET('addr')+'&output=BTC&apiKey=&amount='+$_GET('amount'));
 
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    // Testimonials carousel
    $(".testimonials-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('filter-active');
        $(this).addClass('filter-active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });

})(jQuery);

function clickId(id){
    let elem = document.getElementById(id);
    if(elem){
        elem.click();
    }
}
