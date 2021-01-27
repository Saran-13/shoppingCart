const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const LineSchema = new Schema({
   
   
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


const customerSchema = new Schema({
    
   
    created_at:{
        type:Date,
        default:Date.now()
    },
    customer_id:{
        type:String,
        required:true
    },
    Line_items:[LineSchema]   
    


        
          });


module.exports = Customer = mongoose.model('customers',customerSchema);