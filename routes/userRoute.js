const express = require("express");
const route = express();
const hbs = require('hbs');
var path = require('path');
const multer = require('multer');
const session = require('express-session');
const auth = require("../middleware/auth");


// console.log(__dirname);
const views = path.join(__dirname, '../views/pages')
const layouts = path.join(__dirname,'../views/layouts');

route.set('views', views);
hbs.registerPartials(layouts);
route.set('view engine', 'hbs');

route.use(express.urlencoded({extended: true}));
route.use(express.json());
hbs.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});

const userController = require("../controllers/userController");
const loginController = require("../controllers/loginController");
const registerController = require("../controllers/registerController");
const profileController = require("../controllers/profileController");
const dashboardController = require("../controllers/dashboardController");
const listController = require("../controllers/listController");
const editController = require("../controllers/editController");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/userImages'));
    },
    filename: (req, file, cb) => {
        const name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});
const upload = multer({ storage: storage });

route.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


route.get('/', userController.index);
route.get('/about', userController.about);
route.get('/academics', userController.academics);
route.get('/facilities', userController.facilities);
route.get('/help', userController.help);
route.get('/grievances', userController.grievances);
route.get('/emergency_contact', userController.emergency_contact);
route.get('/contact', userController.contact);
route.get('/login', userController.loginLoad);
route.get('/logout', userController.logout);
route.get('/error', userController.error);
route.get('/e-books', userController.e_books);
route.get('/register', userController.register);
route.get('/faculty_dashboard', dashboardController.faculty_dashboard);
route.get('/student_dashboard', dashboardController.student_dashboard);
route.get('/admin_dashboard', dashboardController.admin_dashboard);
route.get('/faculty_profile', profileController.faculty_profile);
route.get('/student_profile', profileController.student_profile);
route.get('/admin_profile', profileController.admin_profile);
route.get('/student_list', listController.student_list);
route.get('/employee_list', listController.employee_list);
route.post('/student_search', listController.student_search);
route.get('/edit_student/:id', editController.edit_student);
route.get('/edit_employee/:id', editController.edit_employee);

route.post('/admin_login', loginController.admin_login);
route.post('/faculty_login', loginController.faculty_login);
route.post('/student_login', loginController.student_login);
route.post('/student_add', upload.single('image'), registerController.student_add);
route.post('/employee_add', upload.single('image'), registerController.employee_add);
route.post("/update_employee/:id", upload.single('image'), editController.update_employee);


module.exports = route;