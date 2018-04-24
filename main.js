var newText;
var categories = [];
var orders = {"count":[],"id":[]};
// Список всех категорий
function loadCategories() {
  $.ajax({
    url: "http://localhost:2403/categories",
    type: "GET",
    success: function(data) {
      categories = data;
      }
  });
}
//Получение категории по id
function loadCategoryById(id){
  for(var i=0;i<categories.length;i++){
    if(id === categories[i].id){
      return categories[i].name;
    }
  }
}
//Список всех продуктов
function loadProducts() {
  $.ajax({
    url: "http://localhost:2403/products",
    type: "GET",
    success: function(data) {
      loadCategories();
      products = [];
      $("#all-main table tbody").html("");
      for (var i = 0; i < data.length; i++) {
        $("#all-main .products tbody ").append(
          "<tr data-id="+data[i].id +"><td>" + (i + 1) + '</td>\
          <td><div class="textName">' + data[i].name + '</div></td>\
          <td><div class="textName">'+ data[i].price+'</div></td>\
          <td><div class="textName">'+ data[i].description+'</div></td>\
          <td><div class="textName">'+ loadCategoryById(data[i].category)+'</div></td>\
          <td><button type="button" class="btnAddToCart btn btn-outline-success">Add in cart</button></td></tr>'
        );
      }
    }
  });
}
//Обрабокта кнопки продукты
function showProducts(){
  $("#products").click(function(){
  $(".all-main").hide();
  $("#all-main").show();
  $("#productTable").show();
  $("#cartTable").hide();
});
}
function showCart(){
  $("#cart").click(function(){
  $(".all-main").hide();
  $("#all-main").show();
  $("#cartTable").show();
  $("#productTable").hide();
});
}
var cart = [];
function addToCart(){
  var flag = true;
  $("body").on("click",".btnAddToCart", function(e){
      for(var i=0;i<orders.id.length;i++){
        if(orders.id[i] === $(e.target).parents("tr").data("id")){
          orders.count[i]++;
          flag = false;
        }
      }
      if(flag){
        orders.id.push($(e.target).parents("tr").data("id"));
        orders.count.push(1);
        $(e.target).parents("tr").clone().appendTo("#cartTable tbody");
      }
      flag = true;
      for(var i=0;i<orders.id.length;i++){
        $("#cartTable tbody tr:nth-child("+(i+1)+") td:last-child").html('<div class="btn-group" role="group"><button class="btnPlus btn btn-outline-danger btn-sm">+</button><input type="text" value='+orders.count[i]+'><button class="btnMinus btn btn-outline-success btn-sm">-</button></div>');
    // $("#cartTable tbody tr td:first-child").html(i+1);
      }
  });
}
function plusCount(){
  $("body").on("click",".btnPlus",function(e){
    e.target.parentElement.children[1].value++;
    for(var i=0;i<orders.id.length;i++){
      if(orders.id[i] === $(e.target).parents("tr").data("id")){
        orders.count[i]++;
      }
    }
  });
}
function minusCount(){
  $("body").on("click",".btnMinus",function(e){
    if(e.target.parentElement.children[1].value!=1){
      e.target.parentElement.children[1].value--;
      for(var i=0;i<orders.id.length;i++){
        if(orders.id[i] === $(e.target).parents("tr").data("id")){
          orders.count[i]--;
        }
      }
    }
    
  });
}
$(document).ready(function() {
  loadCategories();
  loadProducts();
  showProducts();
  showCart();
  addToCart();
  plusCount();
  minusCount();
});