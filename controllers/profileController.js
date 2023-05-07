const mysql = require('../connection').con;


const admin_profile = async(req, res) => {
    try {
        if(req.session.admin_loggedin) {
            return res.render("admin_profile", {data: data});
        }
        else {
            return res.redirect('/login');
        }
    } catch (error) {
        console.log(error.message);
    }
}

const faculty_profile = async(req, res) => {
    try {
        if(req.session.faculty_loggedin) {
            return res.render("faculty_profile", {data: data});
        }
        else {
            return res.redirect('/login');
        }
    } catch (error) {
        console.log(error.message);
    }
}

const student_profile = async(req, res) => {
    try {
        if(req.session.student_loggedin) {
            return res.render("student_profile", {data: data});
        }
        else {
            return res.redirect('/login');
        }
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    faculty_profile,
    student_profile,
    admin_profile
}