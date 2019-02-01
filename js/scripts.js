function Order(){
  this.pizzas = [],
  this.currentId = 0;
}

Order.prototype.getPrice = function(){
  var price = 0;
  this.pizzas.forEach(function(pizza){
    price += pizza.getPrice();
  });
  return price;
}

Order.prototype.addPizza = function(pizza){
  pizza.id = this.currentId;
  this.currentId += 1;
  this.pizzas.push(pizza);
}

Order.prototype.findPizza = function(id){
  for (var i = 0; i < this.pizzas.length; i++) {
    if (this.pizzas[i]){
      if (this.pizzas[i].id == id){
        return this.pizzas[i];
      }
    }
  };
  return false;
}

Order.prototype.isEmpty = function(){
  for (var i = 0; i < this.pizzas.length; i++) {
    if (this.pizzas[i]){
      return false;
    }
  };
  return true;
}

Order.prototype.deletePizza = function(id) {
  for (var i=0; i< this.pizzas.length; i++) {
    if (this.pizzas[i]) {
      if (this.pizzas[i].id == id) {
        delete this.pizzas[i];
        return true;
      }
    }
  };
  return false;
}

function Pizza(type, size){
  this.type = type,
  this.size = size,
  this.toppings = [],
  this.currentToppingId = 0
}

Pizza.prototype.getPrice = function(){
  var price = 0;
  this.toppings.forEach(function(topping){
    price += topping.getPrice();
  });
  price += this.size.getPrice();
  price += this.type.getPrice();
  return price;
}

Pizza.prototype.addTopping = function(topping){
  topping.id = this.currentToppingId;
  this.currentToppingId += 1;
  this.toppings.push(topping);
}

Pizza.prototype.findTopping = function(id){
  for (var i = 0; i < this.toppings.length; i++) {
    if (this.toppings[i]){
      if (this.toppings[i].id == id){
        return this.toppings[i];
      }
    }
  };
  return false;
}

function Topping (name, price){
  this.name = name,
  this.price = price
}

Topping.prototype.getPrice = function(){
  return this.price;
}

function Size (name, price){
  this.name = name,
  this.price = price
}

Size.prototype.getPrice = function(){
  return this.price;
}

function Type (name, price){
  this.name = name,
  this.price = price
}

Type.prototype.getPrice = function(){
  return this.price;
}

//-----------------------------------------------------------
// arrays for getPrice
var sizes = [["Large", 10], ["Medium", 8], ["Small", 6]];
var toppings = [["Bacon", 1.5], ["Chicken", 1.5], ["Cheese", 1], ["Onion", 0.75]];
var types = [["Cheese", 0], ["Pepperoni", 0.5], ["Custom", -0.5]];
//-----------------------------------------------------------
var order = new Order();

function displayOrder() {
  console.log(order);
  $(".show-pizza").hide();
  console.log(order.isEmpty());
  if (order.isEmpty()){
    $(".order").hide();
  } else {
    var pizzasList = $("ul#pizzas");
    var htmlForPizzasInfo = "";
    order.pizzas.forEach(function(pizza) {
      htmlForPizzasInfo += "<li id=" + pizza.id + ">" + pizza.type.name + " " + (pizza.getPrice()).toString() + "</li>";
    });
    pizzasList.html(htmlForPizzasInfo);

    $("#order-price").text("$" + order.getPrice().toString());
  }
};

function displayPizza(id) {
  var pizza = order.findPizza(id);
  console.log(pizza);

  $(".show-pizza").show();
  $("#type-of-pizza").html(pizza.type.name);
  $("#size-of-pizza").html(pizza.size.name);
  $("#pizza-price").html(pizza.getPrice().toString());
  displayToppings(pizza);

  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + pizza.id + ">Delete</button>");
};

function displayToppings(pizza) {
  var toppingsList = $("ul#toppings-details");
  var htmlForToppingsInfo = "";
  pizza.toppings.forEach(function(topping) {
    htmlForToppingsInfo += "<li>" + topping.name + "</li>";
  });
  toppingsList.html(htmlForToppingsInfo);
};

function attachPizzaListeners() {
  $("ul#pizzas").on("click", "li", function() {
    // $("ul#pizzas li").removeClass("bold");
    // this.addClass("bold");
    displayPizza(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    order.deletePizza(this.id);
    displayOrder();
  });
}

// ----------------------------------------------------------
// user-interface logic

$(document).ready(function() {

  attachPizzaListeners();

  $("#form").submit(function(event){
    event.preventDefault();

    var sizeIndex = parseInt($("input:radio[name=size]:checked").val());
    var typeIndex = parseInt($("input:radio[name=type]:checked").val());
    console.log(sizes);
    console.log(sizeIndex);
    console.log(sizes[sizeIndex][0]);
    var size = new Size(sizes[sizeIndex][0], sizes[sizeIndex][1]);
    var type = new Type(types[typeIndex][0], types[typeIndex][1]);
    var pizza = new Pizza(type, size);

    $("input:checkbox[name='toppings']:checked").each(function() {
      var id = parseInt($(this).val());
      var topping = new Topping(toppings[id][0], toppings[id][1]);
      pizza.addTopping(topping);
    });

    order.addPizza(pizza);

    displayOrder();
    console.log(order);

    $(".order").show();
  });
});
