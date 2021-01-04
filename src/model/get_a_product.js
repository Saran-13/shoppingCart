const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Customer = require('./customer');
const ProductSchema = new Schema({
    customer_id:{
        type: Schema.Types.ObjectId,
        ref: 'customers'
    },
    productId:{
        type:String,
        required:true
    },
        price:{
            type:Number,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
        tax_lines:{
            type:Array,
            price:{
            type:Number,
            required:true
        },
        rate:{
            type:Number,
            required:true
        },
        title:{
            type:String,
            required:true
        }
    }
   
});
module.exports = AddProduct = mongoose.model('AddProducts',ProductSchema);
