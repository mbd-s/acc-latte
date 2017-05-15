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
      Materialize.toast('Expresso: I can make atleast 3000 cup :)', 3000, 'cyan rounded', 'expresso');
    });
    $('.expresso').click(function(){
      $('.choosen-assts').append('<p>Expresso 300€</p>');
      $('.expresso').addClass('hidin');
      asstsTotal = asstsTotal + 300;
    });

    $('.nescafe').hover(function(){
      Materialize.toast('Nescafe: I can make atleast 3500 cup :)', 3000, 'cyan rounded', 'nescafe');
    });
    $('.nescafe').click(function(){
      $('.choosen-assts').append('<p>Nescafe 350€</p>');
      $('.nescafe').addClass('hidin');
      asstsTotal = asstsTotal + 350;
    });

    $('.dulungo').hover(function(){
      Materialize.toast('Dulungo: I can make atleast 4000 cup :)', 3000, 'cyan rounded', 'dulungo');
    });
    $('.dulungo').click(function(){
      $('.choosen-assts').append('<p>Dulungo 400€</p>');
      $('.dulungo').addClass('hidin');
      asstsTotal = asstsTotal + 400;
    });

    $('.renault').click(function(){
      $('.choosen-assts').append('<p>Renault 5000€</p>');
      $('.renault').addClass('hidin');
      asstsTotal = asstsTotal + 5000;
    });
    $('.nissan').click(function(){
      $('.choosen-assts').append('<p>Nissan 5500€</p>');
      $('.nissan').addClass('hidin');
      asstsTotal = asstsTotal + 5500;
    });
    $('.mercedes').click(function(){
      $('.choosen-assts').append('<p>Mercedes Benz 7000€</p>');
      $('.mercedes').addClass('hidin');
      asstsTotal = asstsTotal + 7000;
    });

    $('.takeaway').click(function(){
      $('.choosen-assts').append('<p>Take away 3000€</p>');
      $('.takeaway').addClass('hidin');
      asstsTotal = asstsTotal + 3000;
    });
    $('.highchares').click(function(){
      $('.choosen-assts').append('<p>Hi Chares 4500€</p>');
      $('.highchares').addClass('hidin');
      asstsTotal = asstsTotal + 4500;
    });
    $('.lether').click(function(){
      $('.choosen-assts').append('<p>Lether 8000€</p>');
      $('.lether').addClass('hidin');
      asstsTotal = asstsTotal + 7000;
    });

    $('#goAssets').click(function() {
      if (asstsTotal === 0) {
        Materialize.toast('You need to pick something dear)', 3000, 'cyan rounded');
      } else {
        console.log(asstsTotal);
      }
    });



});
