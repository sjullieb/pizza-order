function Order{
  this.pizzas = [],
  this.currentId = 0;
}

Order.prototype.getPrice = function(){
  var price = 0;
  this.pizzas.forEach(function(pizza){
    price += pizza.getPrice();
  return price;
  });
}

Order.prototype.addPizza = function(pizza){
  pizza.id = this.currentId;
  this.currentId += 1;
  this.pizzas.push(pizzas);
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

function Pizza(type, size){
  this.type = type,
  this.size = size,
  this.toppings = []
}

Pizza.prototype.getPrice = function(){
  var price = 0;
  this.toppingss.forEach(function(toppings){
    price += this.toppings.getPrice();
  price += this.size.getPrice();
  price += this.type.getPrice();
  return price;
  });
}

Pizza.prototype.addTopping = function(topping){
  topping.id = this.currentId;
  this.currentId += 1;
  this.toppings.push(toppings);
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

Toppings.prototype.getPrice = function()){
  return price;
}

function Size (name, price){
  this.name = name,
  this.price = price
}

Size.prototype.getPrice = function()){
  return price;
}

function Type (name, price){
  this.name = name,
  this.price = price
}

Type.prototype.getPrice = function()){
  return price;
}

//-----------------------------------------------------------
// arrays for getPrice
var sizes = [["Large", 10], ["Medium", 8], ["Small", 6]];
var toppings = [["Bacon", 1.5], ["Chicken", 1.5], ["Cheese", 1], ["Onion", 0.75]];
var types = [["Cheese", 0], ["Peperroni", 0.5], ["Custom", -0.5]];
//-----------------------------------------------------------
var order = new Order();
// ----------------------------------------------------------
// user-interface logic

$(document).ready(function() {

  $("#form").submit(function(event){
    event.preventDefault();

    var size = new Size(name, price);
    var type = new Type(name, price);

    var pizza = new Pizza(type, size);
    order.addPizza(pizza);

    console.log(order);

    $("#order").show();
  });
