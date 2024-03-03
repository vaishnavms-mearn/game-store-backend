const users = require("../Models/userSchema");
const jwt = require("jsonwebtoken");

// Register logic
exports.register = async (req, res) => {
  console.log("Inside register function");
  const { username, email, password } = req.body;

  try {
    // Check if the email is already in the database
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(401).json("User already registered");
    }

    // If email not present, save to database
    const newUser = await users({
      username,
      email,
      password,
      purchasedGames: [],
    });
    await newUser.save(); // Save new user to the database
    return res.status(200).json("User successfully registered");
  } catch (err) {
    return res.status(500).json("Server error: " + err.message);
  }
};

// Login logic
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await users.findOne({ email, password });
    if (user) {
      // Token generation
      const token = jwt.sign({ userId: user._id }, "superkey2024");
      return res.status(200).json({ user, token });
    } else {
      return res.status(404).json("Invalid login");
    }
  } catch (err) {
    return res.status(500).json("Server error: " + err.message);
  }
};

// Add purchased game logic
const { ObjectId } = require("mongodb");
exports.addPurchasedGame = async (req, res) => {
  const { userId, gameId } = req.body;
  try {
    console.log("Received gameId:", gameId); // Log the received gameId

    // Check if gameId is a valid ObjectId
    if (!ObjectId.isValid(gameId)) {
      return res.status(400).json("Invalid gameId");
    }

    // Find the user by ID
    const user = await users.findById(userId);
    if (!user) {
      return res.status(404).json("User not found");
    }
    if (user.purchasedGames.includes(gameId)) {
      return res.status(400).json("Game already purchased");
    } else {
      user.purchasedGames.push(gameId);
      await user.save();
      return res.status(200).json("Purchased game successfully added");
    }
    // Add the purchased game ID to the user's purchasedGames array
  } catch (error) {
    return res
      .status(500)
      .json("Error adding purchased game: " + error.message);
  }
};
exports.getUsersById = async (req, res) => {
  const { userId } = req.params; // Access userId from request parameters
  console.log(userId);
  try {
    // Find the user by their ID in the database
    const user = await users.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user); // Send the user data to the client
  } catch (err) {
    console.error('Error fetching user by ID:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.addWishlist= async (req, res) => {
  const { userId, gameId } = req.body;
  console.log(userId);
  try {
    console.log("Received gameId:", gameId); // Log the received gameId

    // Check if gameId is a valid ObjectId
    if (!ObjectId.isValid(gameId)) {
      return res.status(400).json("Invalid gameId");
    }

    // Find the user by ID
    const user = await users.findById(userId);
    if (!user) {
      return res.status(404).json("User not found");
    }
    if (user.wishlist.includes(gameId)) {
      return res.status(400).json("Already in wishlist");
    } else {
      user.wishlist.push(gameId);
      await user.save();
      return res.status(200).json("Added to wishlist");
    }
    // Add the purchased game ID to the user's purchasedGames array
  } catch (error) {
    return res
      .status(500)
      .json("Error adding purchased game: " + error.message);
  }
};

exports.deletePurchasedGame = async (req, res) => {
  const { userId, gameId } = req.body;
  try {
    console.log("Received gameId:", gameId); // Log the received gameId

    // Check if gameId is a valid ObjectId
    if (!ObjectId.isValid(gameId)) {
      return res.status(400).json("Invalid gameId");
    }

    // Find the user by ID
    const user = await users.findById(userId);
    if (!user) {
      return res.status(404).json("User not found");
    }

    // Check if the game exists in the user's purchased games
    const gameIndex = user.purchasedGames.indexOf(gameId);
    if (gameIndex === -1) {
      return res.status(404).json("Game not found in purchased games");
    }

    // Remove the game from the purchased games array
    user.purchasedGames.splice(gameIndex, 1);
    await user.save();

    return res.status(200).json("Purchased game successfully deleted");
  } catch (error) {
    return res.status(500).json("Error deleting purchased game: " + error.message);
  }
};
exports.deleteFromWishlist = async (req, res) => {
  const { userId, gameId } = req.body;
  try {
      console.log("Received gameId:", gameId); // Log the received gameId

      // Check if gameId is a valid ObjectId
      if (!ObjectId.isValid(gameId)) {
          return res.status(400).json("Invalid gameId");
      }

      // Find the user by ID
      const user = await users.findById(userId);
      if (!user) {
          return res.status(404).json("User not found");
      }

      // Check if the game exists in the user's wishlist
      const gameIndex = user.wishlist.indexOf(gameId);
      if (gameIndex === -1) {
          return res.status(404).json("Game not found in wishlist");
      }

      // Remove the game from the wishlist array
      user.wishlist.splice(gameIndex, 1);
      await user.save();

      return res.status(200).json("Game successfully removed from wishlist");
  } catch (error) {
      return res.status(500).json("Error removing game from wishlist: " + error.message);
  }
};