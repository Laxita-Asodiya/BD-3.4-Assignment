const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;
let cors = require('cors');

app.use(cors());
app.use(express.static('static'));

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

function addCartItem(productId, name, price, quantity) {
  let data = {
    productId: productId,
    name: name,
    price: price,
    quantity: quantity,
  };

  cart.push(data);
  return cart;
}

function editItemQuantity(productId, quantity) {
  cart.find((ele) => {
    if (ele.productId === Number(productId)) {
      ele.quantity = Number(quantity);
    }
  });
  return cart;
}

function deleteProduct(ele, productId) {
  return ele.productId !== Number(productId);
}

function allProducts(ele) {
  return ele;
}

function totalQuantity() {
  let count = 0;
  cart.forEach((ele) => {
    count += ele.quantity;
  });

  return count;
}

function totalPrice() {
  let price = 0;
  cart.forEach((ele) => {
    price += ele.price;
  });
  return price;
}

app.get('/cart/add', (req, res) => {
  let productId = req.query.productId;
  let name = req.query.name;
  let price = req.query.price;
  let quantity = req.query.quantity;

  let result = addCartItem(productId, name, price, quantity);
  res.json({ cartItems: result });
});

app.get('/cart/edit', (req, res) => {
  let productId = req.query.productId;
  let quantity = req.query.quantity;

  let result = editItemQuantity(productId, quantity);

  res.json({ cartItems: result });
});

app.get('/cart/delete', (req, res) => {
  let productId = req.query.productId;
  let result = cart.filter((ele) => deleteProduct(ele, productId));

  res.json({ cartItems: result });
});

app.get('/cart', (req, res) => {
  let result = cart.filter((ele) => allProducts(ele));
  res.json({ cartItems: result });
});

app.get('/cart/total-quantity', (req, res) => {
  let result = totalQuantity();

  res.json({ totalQuantity: result });
});

app.get('/cart/total-price', (req, res) => {
  let result = totalPrice();

  res.json({ totalPrice: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
