$(document).ready(function(){
  $('select').material_select();
  $(".button-collapse").sideNav();

    $(".animsition").animsition({
      inClass: 'fade-in-down',
      inDuration: 800
    });

    // cofeeShop ---------------------------------

    let cofeeShopInfo = {};
    let cofeeShopName ;
    let cofeeShopRent ;
    let asstsTotal = 0;

    $('#cs-btn').click(function(){
      $('#cofeeShop').addClass('hidin');
      $("#cofeeShop-wel").removeClass("hidin");
    });


    $('#goAhead').click(function() {
      $('#cofeeShop-wel').addClass('hidin');
      $("#cofeeShop-name").removeClass("hidin");
    })

    $('#goName').click(function() {
      cofeeShopName = $('#cofeeshop-name').val();
      cofeeShopInfo['name'] = cofeeShopName;
      $("#cofeeShop-name").addClass("hidin");
      $("#cofeeShop-rent").removeClass("hidin");
    })

    $('#goRent').click(function() {
      $('#rent-buy option').each(function() {
        if($('[value="2"]').is(':selected')){
          cofeeShopRent = "renting";
        } else if ($('[value="1"]').is(':selected')) {
          cofeeShopRent = "buying";
        }
        cofeeShopInfo['rent'] = cofeeShopRent;
        console.log(cofeeShopInfo);
        $("#cofeeShop-rent").addClass("hidin");
        $("#cofeeShop-assets").removeClass("hidin");
      })
    })

    $('.expresso').hover(function(){
      Materialize.toast('I can make atleast 3000 cup :)', 4000, 'expresso');
    });
    $('.nescafe').hover(function(){
      Materialize.toast('I can make atleast 3500 cup :)', 4000, 'nescafe');
    });
    $('.dulungo').hover(function(){
      Materialize.toast('I can make atleast 4000 cup :)', 4000, 'dulungo');
    });

    $('.expresso').dblclick(function(){
      $('.chousen-assts').append('<p>Expresso 300€</p>');
      $('.expresso').addClass('hidin');
      asstsTotal = asstsTotal + 300;
      console.log(asstsTotal);
    });
    $('.nescafe').dblclick(function(){
      $('.chousen-assts').append('<p>Nescafe 350€</p>');
      $('.nescafe').addClass('hidin');
      asstsTotal = asstsTotal + 350;
      console.log(asstsTotal);
    });
    $('.dulungo').dblclick(function(){
      $('.chousen-assts').append('<p>Dulungo 400€</p>');
      $('.dulungo').addClass('hidin');
      asstsTotal = asstsTotal + 400;
      console.log(asstsTotal);
    });






});
