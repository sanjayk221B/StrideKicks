const express = require('express');
const adminRouter = express();
const adminController = require('../controller/adminController');
const productsController = require('../controller/productsController')
const path = require('path')

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, "..", "public", "images"))
    },
    filename: (req, file, callback) => {
        const name = Date.now() + '-' + file.originalname;
        callback(null, name)
    }
})

const upload = multer({ storage: storage }).array('images', 4)



//set view engine
adminRouter.set('view engine', 'ejs');
adminRouter.set('views', './views/admin');

adminRouter.use(express.static(path.resolve(__dirname, 'public')))

adminRouter.get('/', adminController.loadDashboard);

//login and logout
adminRouter.get('/login', adminController.loadLogin);
adminRouter.post('/login', adminController.adminLogin);
adminRouter.get('/logout', adminController.loadLogin);

//User management routes
adminRouter.get('/users', adminController.loadUsers);
adminRouter.post('/users/:action/:id', adminController.updateUserStatus);


//Product management routes
adminRouter.get('/products', productsController.loadProducts);
adminRouter.post('/products/:id',productsController.updateProductStatus)

adminRouter.get('/addProducts', productsController.load_AddProducts);
adminRouter.post('/addProducts', upload, productsController.addProducts);

adminRouter.get('/editProducts/:id', productsController.load_EditProducts)
adminRouter.post('/editProducts',upload,productsController.editProducts);
adminRouter.post('/deleteProducts/:productId',productsController.deleteProducts)
adminRouter.post('/deleteImage',productsController.deleteImage)

//Category management routes
adminRouter.get('/categories', adminController.loadCategories);
adminRouter.post('/categories/:action/:id', adminController.updateCategoryStatus)

adminRouter.get('/addCategories', adminController.load_AddCategories);
adminRouter.post('/addCategories', adminController.addCategories);

adminRouter.get('/editCategories', adminController.load_EditCategories);
adminRouter.post('/editCategories', adminController.editCategories);

adminRouter.delete('/deleteCategories/:id',adminController.deleteCategories)





module.exports = adminRouter;