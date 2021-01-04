const express = require('express');
const router = express.Router();

const Customer = require('../model/customer');
const AddProduct = require('../model/get_a_product');


router.post('/', async (req, res) => {
	console.log('Users route');
	const newCustomers = new Customer(req.body);
	try {
		await newCustomers.save();
		res.status(201).send(newCustomers);
	} catch (err) {
		
		res.status(500).send();
	}
});

// Add new products
router.post('/:cid', async (req, res) => {
	const neworder = new AddProduct(req.body);
	const customerId = req.customer_id;
	const product_id = req.productId;

	try {
		const customer = await Customer.find(customerId);
		if (!customer) {
			return res.status(404).send({ error: 'customer not found' });
		}
		const product = await AddProduct.find(product_id );
		if (!product) {
			return res.status(404).send({ error: 'Post not found' });
		}
		neworder.product_id  = product.id;
		
		await neworder.save();
		
		res.status(201).send(neworder);
	} catch (err) {
		
		res.status(500).send();
	}
});

// Get  details using customer_id.

router.get('/:cid', async (req, res) => {
	
	try {
		const order = await Customer.find(req.customer_id);
		if (!order) {
			return res.status(404).send({ error: 'customer not found' });
		}
		res.send(order);
	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});

// Get  details using order_id.
router.get('/:id', async (req, res) => {
	
	try {
		const order = await Customer.find(req.params.id);
		if (!order) {
			return res.status(404).send({ error: 'order not found' });
		}
		res.send(order);
	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});

// update quantity using orderid and productid

router.patch('/:id/:pid', async (req, res) => {
	const updates = Object.keys(req.body);
	console.log(updates);
	const allowedUpdates = ['quantity'];
	const isValidOperation = updates.every((update) => { 
		return allowedUpdates.includes(update);
	});

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid Operation' });
	}
 
	try {
		const order_id = req.params.id;
		const product_id = req.params.id;
		const customer= await Customer.findById(order_id);
		if (!customer) {
			return res.status(404).send({ error: 'customer not found' });
		}

		const quantity = await AddProduct.findById(product_id);
			
		if (!quantity) {
			return res.status(404).send({ error: 'User not found' });
		}
		updates.forEach((update) => {
			quantity[update] = req.body[update];
		});
		await quantity.save();
		res.send(quantity);
		
	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});



// delete a product 
router.delete('/:id/delete/:pid', async (req, res) => {
	const customerId = req.customer_id;
	const product_id = req.params.pid;
	try {
		const customer = await Customer.find(customerId);
		if (!customer) {
			return res.status(404).send({ error: 'customer not found' });
		}
		const product = await AddProduct.findByIdAndDelete(product_id);
		if (!product) {
			return res.status(404).send({ error: 'product not found' });
		}
		res.send(product);
		
	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});

module.exports = router;
