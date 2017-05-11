$(document).ready(function(){
  $('select').material_select();
  $(".button-collapse").sideNav();
    $(".animsition").animsition({
      inClass: 'fade-in-down',
      inDuration: 800
    });
    let cofeeShopInfo = [];

    $('#cs-btn').click(function(){
      $('#cofeeShop').addClass('hidin');
      $("#cofeeShop-wel").removeClass("hidin");
    });


    $('#goAhead').click(function() {
      $('#cofeeShop-wel').addClass('hidin');
      $("#cofeeShop-name").removeClass("hidin");
    })

    $('#goName').click(function() {
      const cofeeShopName = $('#cofeeshop-name').val();
      console.log(cofeeShopName);
      cofeeShopInfo.push(cofeeShopName);
      console.log(cofeeShopInfo);
      $("#cofeeShop-name").addClass("hidin");
      $("#cofeeShop-rent").removeClass("hidin");
    })

    $('#goRent').click(function() {
      let cofeeShopRent ;

      $('#rent-buy option').each(function() {
        if($('[value="2"]').is(':selected')){
          cofeeShopRent = "renting";
        } else if ($('[value="1"]').is(':selected')) {
          cofeeShopRent = "buying";
        }
        console.log(cofeeShopRent);
        cofeeShopInfo.push(cofeeShopRent);
        console.log(cofeeShopInfo);
        $("#cofeeShop-rent").addClass("hidin");
      })
    })






});
