//Loads .env file contents into process.env by default.
require('dotenv').config()
//import express
const express =require('express')
//import cors
const cors =require('cors')
//import route
const router =require('./Router/route')
//db connection import
const db=require('./DB/connection')
const pfServer=express()
pfServer.use(cors())
pfServer.use(express.json())//Returns midddleware that only parses json
pfServer.use(router)
pfServer.use('/uploads',express.static('./uploads'))
//server listen
//port creation
const stripe=require('stripe')(process.env.SECRET_STRIPE_KEY)

pfServer.post("/checkout", async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        line_items: req.body.items?.map((item) => {
          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: item.title,
              },
              unit_amount: item.price * 100,
            },
            quantity: '1',
          };
        }),
        customer_email: req.body.email, // Include customer email
        billing_address_collection: 'required', // Require billing address
        success_url: "https://deluxe-fenglisu-043a11.netlify.app/library",
        cancel_url: "https://deluxe-fenglisu-043a11.netlify.app/cancel",
      });
      res.json({ url: session.url });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});


const PORT= 4000 || process.env.PORT
pfServer.listen(PORT,()=>{
    console.log('Listening on port ' +PORT);
})

//http=get resolving to http :// localhost/4000
pfServer.get("/",(req,res)=>{
res.send('<h1>Game Store is started</h1>')
})