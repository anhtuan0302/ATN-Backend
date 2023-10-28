var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

const ProductsModel = require('../models/products');
const CategoriesModel = require('../models/categories');
const UsersModel = require('../models/users');
const OrdersModel = require('../models/orders');

router.get('/api/users/:id', async (req, res) => {
  const id = req.params.id;
  const user = await UsersModel.findById(id);
  res.send(user);
});

router.get('/api/users', async (req, res) => {
  const users = await UsersModel.find();
  res.send(users);
});

router.put('/api/users/:id', async (req, res) => {
  const id = req.params.id;
  const editUser = req.body;
  await UsersModel.findByIdAndUpdate(id, editUser);
});

router.delete('/api/users/:id', async (req, res) => {
  const id = req.params.id;
  await UsersModel.findByIdAndDelete(id);
});

router.get('/api/products', async (req, res) => {
  const products = await ProductsModel.find();
  res.send(products);
});

router.get('/api/products/:id', async (req, res) => {
  const id = req.params.id;
  const product = await ProductsModel.findById(id);
  res.send(product);
});

router.post('/api/products/add', async (req, res) => {
  const product = req.body;
  await ProductsModel.create(product);
});

router.put('/api/products/:id', async (req, res) => {
  const id = req.params.id;
  const editProduct = req.body;
  await ProductsModel.findByIdAndUpdate(id, editProduct);
});

router.delete('/api/products/:id', async (req, res) => {
  const id = req.params.id;
  await ProductsModel.findByIdAndDelete(id);
});

router.get('/api/categories', async (req, res) => {
  const categories = await CategoriesModel.find();
  res.send(categories);
});

router.post('/api/categories/add', async (req, res) => {
  const category = req.body;
  await CategoriesModel.create(category);
});

router.get('/api/categories/:id', async (req, res) => {
  const id = req.params.id;
  const category = await CategoriesModel.findById(id);
  res.send(category);
});

router.put('/api/categories/:id', async (req, res) => {
  const id = req.params.id;
  const editCategory = req.body;
  await CategoriesModel.findByIdAndUpdate(id, editCategory);
});

router.delete('/api/categories/:id', async (req, res) => {
  const id = req.params.id;
  const category = await CategoriesModel.findByIdAndDelete(id);
  await category.remove();
});

router.get('/api/orders', async (req, res) => {
  const orders = await OrdersModel.find();
  res.send(orders);
});

router.post('/api/orders/add', async (req, res) => {
  const order = req.body;
  await OrdersModel.create(order);
});

router.get('/api/orders/:id', async (req, res) => {
  const id = req.params.id;
  const order = await OrdersModel.findById(id);
  res.send(order);
});

router.get('/api/orders/user/:email', async (req, res) => {
  const email = req.params.email;
  const orders = await OrdersModel.find({ email: email });
  res.send(orders);
});

router.put('/api/orders/:id', async (req, res) => {
  const id = req.params.id;
  const editOrder = req.body;
  await OrdersModel.findByIdAndUpdate(id, editOrder);
});

router.delete('/api/orders/:id', async (req, res) => {
  const id = req.params.id;
  await OrdersModel.findByIdAndDelete(id);
});

router.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await UsersModel.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Email or password is incorrect' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Email or password is incorrect' });
  }
  if (user.email === 'admin@atn.com') {
    return res.json({ message: 'Admin login successful' });
  }
  else{
    return res.json({ message: 'User login successful' });
  }
});

router.post('/api/register', async (req, res) => {
  const { email, password, name } = req.body;
  const existingUser = await UsersModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  const salRounds = 10;
  try {
    const hashedPassword = await bcrypt.hash(password, salRounds);
    const newUser = {
      email,
      password: hashedPassword,
      name: name,
      role: 'user',
    };
    await UsersModel.create(newUser);
    return res.json({ message: 'Register successful' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
