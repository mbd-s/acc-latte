$(document).ready(function(){
  $('select').material_select();
  $(".button-collapse").sideNav();
    $(".animsition").animsition({
      inClass: 'fade-in-down',
      inDuration: 800
    });

    $('#cs-btn').click(function(){
      $('#cofeeShop').addClass('hidin');
      $("#cofeeShop-wel").removeClass("hidin");
    });

    $('#goAhead').click(function() {
      $('#cofeeShop-wel').addClass('hidin');
      $("#cofeeShop-info").removeClass("hidin");
    })



});
