const express = require('express');
const router = express.Router();

const Customer = require('../model/customer');


// // Add new products
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

router.get('/products/:cid', async (req, res) => {
	
	try {
		const order = await Customer.find(req.params.customer_id);
		if (!order) {
			return res.status(404).send({ error: 'customer not found' });
		}
		const lists = JSON.parse(order);
		console.log(lists);
		lists["Line_items"].push({price:59.8, 
			quantity:5,
			 tax_lines:
			 
				   [  
					      {
					 
						 price:59.8,
						 rate:0.06,
						 title:"salestax",
				       }	
					]
				
				
		});
			
	res.send(order);
		
	} catch (error) {
        res.status(500).send({ error: 'Internal server error' });
       
	}
});



// // Get  details using customer_id.

router.get('/:cid', async (req, res) => {
	
	try {
		const order = await Customer.find({customer_id:req.params.customer_id});
		
			
		
		if (!order) {
			return res.status(404).send({ error: 'customer not found' });
		}
		res.send(order);
	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});

// // Get  details using order_id.
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

// // update quantity using orderid and productid

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

		const quantity = await Customer.findById(product_id);
			
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



// // delete a product 
router.delete('/:id/delete/:pid', async (req, res) => {
	const customerId = req.params.id;
	const product_id = req.params.pid;
	try {
		const customer = await Customer.findById(customerId);
		console.log(customer);
		if (!customer) {
			
			return res.status(404).send({ error: 'customer not found' });
		}
		// const product = await Customer.findByIdAndDelete(Customer.findById(product_id));
		const product = await Customer.remove(req.params.pid);
		console.log(product);
		if (!product) {
			return res.status(404).send({ error: 'product not found' });
		}
		res.send(customer);
		
	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});

module.exports = router;