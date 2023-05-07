const isLogin = async(req, res, next) => {
    try {
        if (req.session.loggedin) {}
         else {
            return res.redirect('/');
        }
        next();
    } catch (error) {
        console.log(error.message);
    }
}

const isLogout = async(req, res, next) => {
    try {
        if (req.session.admin_loggedin) {
            return res.redirect('/admin_dashboard');
        }
        else if (req.session.faculty_loggedin) {
            return res.redirect('/faculty_dashboard');
        }
        else if (req.session.student_loggedin) {
            return res.redirect('/student_dashboard');
        }
        next();

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    isLogin, 
    isLogout
}