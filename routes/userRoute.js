const express = require("express");
const userRouter = express();
const userController = require("../controller/userController");
const cartController = require("../controller/cartController");
const orderController = require('../controller/orderController');
const couponController = require('../controller/couponController');
const wishlistController = require('../controller/wishlistController');
const auth = require('../midddleware/auth');

//set view engine
userRouter.set('view engine', 'ejs');
userRouter.set('views', './views/user')

//Home Routes
userRouter.get("/", auth.isLogout, userController.loadHome);
userRouter.get("/home", auth.checkBlocked, userController.loadHome)

//Error Routes
userRouter.get("/error403", userController.error403);
userRouter.get("/error404", userController.error404);
userRouter.get("/error500", userController.error500);
      
// Register Routes
userRouter.get("/register", auth.isLogout, userController.loadRegister)
userRouter.post("/register", userController.verifyRegister)

// Otp Routes
userRouter.get("/otp", auth.isLogout, userController.loadOtp)
userRouter.post("/otp", userController.verifyOtp)
userRouter.post('/resendOtp', auth.isLogout, userController.resendOtp);

// Login Routes
userRouter.get("/login", auth.isLogout, userController.loadLogin)
userRouter.post("/login", userController.verifyLogin)
userRouter.get("/logout", auth.isLogin, userController.logoutUser)

//Product Routes
userRouter.get('/shop', auth.checkBlocked, userController.loadShop)
userRouter.get('/productDetails', auth.checkBlocked, auth.isLogin, userController.loadProductDetails)

//Cart Routes
userRouter.get('/cart', auth.checkBlocked, auth.isLogin, cartController.loadCart);
userRouter.post('/addToCart', auth.checkBlocked, auth.isLogin, cartController.addToCart);
userRouter.post('/updateCart', auth.checkBlocked, auth.isLogin, cartController.updateCart);
userRouter.delete('/cart/removeItem', auth.checkBlocked, auth.isLogin, cartController.removeItem);
userRouter.get('/productQuantityInCart', auth.checkBlocked, auth.isLogin, userController.getproductQuantityInCart);

//Checkout Routes
userRouter.get('/checkout', auth.checkBlocked, auth.isLogin, cartController.loadCheckout);
userRouter.post('/placeOrder', auth.checkBlocked, auth.isLogin, orderController.placeOrder);
userRouter.post('/applyCoupon', auth.checkBlocked, auth.isLogin, couponController.applyCoupon);
userRouter.post('/verifyPayment', auth.checkBlocked, auth.isLogin, orderController.verifyPayment)
userRouter.get('/confirmation', auth.checkBlocked, auth.isLogin, orderController.load_orderConfirmation);
userRouter.post('/addToWallet', auth.checkBlocked, auth.isLogin, orderController.addMoneyToWallet);
userRouter.post('/verifyAddToWallet', auth.checkBlocked, auth.isLogin, orderController.verifyAddMoneyToWallet);

// Profile Routes
userRouter.get('/profile', auth.checkBlocked, auth.isLogin, userController.loadProfile);
userRouter.get('/editProfile', auth.checkBlocked, auth.isLogin, userController.load_EditProfile);
userRouter.put('/editProfile', auth.checkBlocked, auth.isLogin, userController.updateUserProfile);
userRouter.put('/updatePassword', auth.checkBlocked, auth.isLogin, userController.updatePassword);
userRouter.get('/forgotPassword', userController.load_forgotPassword);
userRouter.post('/forgotPassword', userController.forgotPassword);
userRouter.get('/resetPassword', userController.load_resetPassword);
userRouter.post('/resetPassword', userController.resetPassword);
userRouter.get('/wallet', auth.checkBlocked, auth.isLogin, userController.load_Wallet);


//Address Routes
userRouter.get('/address', auth.checkBlocked, auth.isLogin, userController.load_AddAddress);
userRouter.post('/address', auth.checkBlocked, auth.isLogin, userController.addAddress);
userRouter.get('/manageAddress', auth.checkBlocked, auth.isLogin, userController.load_manageAddress);
userRouter.delete('/deleteAddress/:addressId', auth.checkBlocked, auth.isLogin, userController.deleteAddress);
userRouter.get('/editAddress', auth.checkBlocked, auth.isLogin, userController.load_EditAddress);
userRouter.post('/editAddress', auth.checkBlocked, auth.isLogin, userController.editAddress);

//Order Routes
userRouter.get('/orders', auth.checkBlocked, auth.isLogin, orderController.load_userOrders);
userRouter.get('/singleOrder', auth.checkBlocked, auth.isLogin, orderController.load_SingleOrder);
userRouter.post('/cancelOrder', auth.checkBlocked, auth.isLogin, orderController.cancelOrder);
userRouter.post('/returnOrder', auth.checkBlocked, auth.isLogin, orderController.cancelOrder);

//Wishlist Routes
userRouter.get('/wishlist', auth.checkBlocked, auth.isLogin, wishlistController.load_Wishlist);
userRouter.post('/addToWishlist', auth.checkBlocked, auth.isLogin, wishlistController.addToWishlist);
userRouter.delete('/removeFromWishlist', auth.checkBlocked, auth.isLogin, wishlistController.removeFromWishlist);

//Invoice Routes
userRouter.get('/invoice', auth.checkBlocked, auth.isLogin, orderController.invoiceDownload);



module.exports = userRouter;