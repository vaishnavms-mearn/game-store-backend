const userController=require('../Controllers/userController')
const jwtMiddleware=require('../Middlewares/jwtMiddleware')
const gameController=require('../Controllers/gameController')
const multerConfig=require('../Middlewares/multerMiddlware')
const express =require('express')
const router =new express.Router()

router.post('/register',userController.register)

router.post('/login',userController.login)

router.post('/games/add',multerConfig.single('image'),gameController.addGames)

router.get('/games/get-games',gameController.getAllGames)
router.delete('/games/delete-games/:gid',multerConfig.single('image'),gameController.deleteGames)
router.put('/games/edit-games/:id',multerConfig.single('image'),gameController.editGames)
//4 Get user project API  routes-localhost:4000/projects/all-user-projects
router.get('/games/:id', multerConfig.single('image'),gameController.getGamesById);
router.post('/games/add-purchased-games',userController.addPurchasedGame);
router.get('/get-users/:userId',userController.getUsersById);
router.post('/wishlist/:gid',userController.addWishlist);
router.delete('/deletefromwishlist/:gid',userController.deleteFromWishlist);
router.delete('/deletefromlibrary/:gid',userController.deletePurchasedGame);
router.put('/update-users/:id',userController.updateUser);

module.exports=router