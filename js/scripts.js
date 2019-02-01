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

function Pizza(type, size){
  this.type = type,
  this.size = size,
  this.toppings = [],
  this.currentToppingId = 0
}

Pizza.prototype.getPrice = function(){
  var price = 0;
  this.toppings.forEach(function(toppings){
    price += this.toppings.getPrice();
    price += this.size.getPrice();
    price += this.type.getPrice();
  });
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
  return price;
}

function Size (name, price){
  this.name = name,
  this.price = price
}

Size.prototype.getPrice = function(){
  return price;
}

function Type (name, price){
  this.name = name,
  this.price = price
}

Type.prototype.getPrice = function(){
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



    console.log(order);

    $("#order").show();
  });
});
