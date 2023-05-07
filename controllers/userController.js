const index = async (req, res) => {
    try {
        return res.render('index');
    } catch (error) {
        console.log(error.message);
    }
}

const about = async (req, res) => {
    try {
        return res.render('about');
    } catch (error) {
        console.log(error.message);
    }
}

const academics = async (req, res) => {
    try {
        return res.render('academics');
    } catch (error) {
        console.log(error.message);
    }
}

const facilities = async (req, res) => {
    try {
        return res.render('facilities');
    } catch (error) {
        console.log(error.message);
    }
}

const help = async (req, res) => {
    try {
        return res.render('help');
    } catch (error) {
        console.log(error.message);
    }
}
const grievances = async(req, res) => {
    try {
        return res.render("grievances");
    } catch (error) {
        console.log(error.message);
    }
}
const emergency_contact = async(req, res) => {
    try {
        return res.render("emergency_contact");
    } catch (error) {
        console.log(error.message);
    }
}

const contact = async (req, res) => {
    try {
        return res.render('contact');
    } catch (error) {
        console.log(error.message);
    }
}
const e_books = async(req, res) => {
    try {
        return res.render("e_books");
    } catch (error) {
        console.log(error.message);
    }
}
const loginLoad = async (req, res) => {
    try {
        return res.render('login');
    } catch (error) {
        console.log(error.message);
    }
}

const logout = async (req, res) => {
    try {
        req.session.destroy();
        return res.redirect("/login")
    } catch (error) {
        console.log(error.message);
    }
};

const error = async(req, res) => {
    try {
        return res.render('404')
    } catch (error) {
        console.log(error.message);
    }
}

const register = async (req, res) => {
    try {
        if(req.session.admin_loggedin) {
            return res.render('register');
        }
        else {
            return res.redirect('/error')
        }
    } catch (error) {
        console.log(error.message);
    }
}






module.exports = {
    index,
    about,
    academics,
    facilities,
    help,
    e_books,
    grievances,
    emergency_contact,
    contact,
    loginLoad,
    register,
    logout,
    error,
}