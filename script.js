//listener for clicks on the show cart toggle button
$('.view-cart').on('click', function() {
  $('.show').toggleClass('show');
  $('.shopping-cart').toggleClass('show');
});

$('.view-manager').on('click' ,function() {
  $('.show').toggleClass('show');
  $('.create-item').toggleClass('show');
});

