const games = require("../Models/gameSchema");
//add project logic
exports.addGames = async (req, res) => {
  console.log("inside add games");
  //userid get
  const userId = req.payload;
  //addprojectdetails
  const {
    title,
    description,
    rating,
    price,
    category,
    logoImage,
    link,
    homeButton,
  } = req.body;
  // get image
  image = req.file.filename;
  console.log(image);
  // logic of adding project
  try {
    const existingProject = await games.findOne({ link });
    if (existingProject) {
      res.status(406).json("Game already added");
    } else {
      const newGame = new games({
        title,
        description,
        rating,
        price,
        category,
        logoImage,
        image,
        link,
      });
      await newGame.save(); //save new user to database
      res.status(200).json(newGame);
    }
  } catch(err) {
    res.status(404).json({ message: err.message });
  }
};
//get user project
exports.getAllGames= async (req, res) => {
  try {
    //get project informationof particular user
    const allGames = await games.find();
    res.status(200).json(allGames); //send response to client
  } catch (err) {
    res.status(401).json(err.err.message);
  }
};
exports.getGamesById = async (req, res) => {
  console.log(req.params);
  const  gameId  = req.params.id;

  try {
    // Find the game by its ID in the database
    const game = await games.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    res.status(200).json(game); // Send the game data to the client
  } catch (err) {
    console.error('Error fetching game by ID:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// //get all projects
// exports.getAllProjects = async (req, res) => {
//   const searchKey = req.query.search;
//   const query = {
//     language: {
//       $regex: searchKey,
//       $options: "i",
//     },
//   };
//   try {
//     const allProjects = await projects.find(query);
//     console.log(allProjects);
//     res.status(200).json(allProjects);
//   } catch (err) {
//     res.status(401).json(err.message);
//   }
// };
// //get home projects
// exports.getHomeProjects = async (req, res) => {
//   try {
//     const homeProjects = await projects.find().limit(3);
//     console.log(homeProjects);
//     res.status(200).json(homeProjects);
//   } catch (err) {
//     res.status(401).json(err.message);
//   }
// };
// //4 edit project
exports.editGames = async (req, res) => {
  const {
    title,
    description,
    rating,
    price,
    category,
    logoImage,
    image,
    link,
    homeButton,
  } = req.body;
  const uploadImage = req.file ? req.file.filename : image;
  const userId = req.payload;
  const { id } = req.params;
  try {
    //find particular project id in mongo db and add the updated details
    const updateGame= await games.findByIdAndUpdate(
      { _id: id },
      {
        title,
        description,
        rating,
        price,
        category,
        logoImage,
        image:uploadImage,
        link,
        homeButton,
      },
      { new: true }
    );
    //save the updated details
    await updateGame.save();
    //send responseback to client
    res.status(200).json(updateGame);
  } catch (err) {
    res.status(401).json(err);
  }
};
//5 delete projects
exports.deleteGames = async (req, res) => {
  const { gid } = req.params;
  try {
    const deleteData = await games.findOneAndDelete({ _id: gid });
    res.status(200).json(deleteData);
  } catch (err) {
    res.status(401).json(err);
  }
};
// // Import Razorpay
// const Razorpay = require('razorpay');

// // Initialize Razorpay instance with your API key and secret
// const razorpay = new Razorpay({
//   key_id: 'rzp_test_sR5YVeBhQBZz4N',
//   key_secret: '9kfxBJEsxKDeeHQW9V5TK40T',
// });

// // Function to create a Razorpay order
// exports.createOrder = async (req, res) => {
//   try {
//     const { amount, currency } = req.body;
// console.log(amount);
// console.log(currency);
//     // Create an order
//     const order = await razorpay.orders.create({
//       amount: amount * 100, // Razorpay expects amount in smallest currency unit (e.g., paise for INR)
//       currency: currency,
//       payment_capture: 1, // Automatically capture payment after order creation
//     });

//     // Send the order ID to the client
//     res.status(200).json({ orderId: order.id });
//   } catch (error) {
//     console.error('Error creating Razorpay order:', error);
//     res.status(500).json({ error: 'Unable to create Razorpay order' });
//   }
// };
