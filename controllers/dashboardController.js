const mysql = require('../connection').con;


const admin_dashboard = async(req, res) => {
    try {
        if(req.session.admin_loggedin) {
            console.log('Welcome back, '+data.name);
            res.render("admin_dashboard", {data: data})
        }
        else {
            res.redirect("/error");
        }
    } catch (error) {
        console.log(error.message);
    }
}

const faculty_dashboard = async (req, res) => {
    try {
        if (req.session.faculty_loggedin) {
            console.log('Welcome back, ' + ' ' + data.emp_id+ " "+data.name);
            dob = data.dob.toLocaleDateString();
            doj = data.doj.toLocaleDateString();
            console.log(dob+" "+doj);
            return res.render('faculty_dashboard', {
                data: data,
                dob: dob,
                doj: doj
            });
        }
        else {
            return res.redirect('/error');
        }
    } catch (error) {
        console.log(error.message)
    }
};



const student_dashboard = async(req, res) => {
    try {
        if (req.session.student_loggedin) {
            console.log('Welcome back, ' + ' ' + data.regd_no+ " "+data.name);
            date = data.dob.toLocaleDateString();
            console.log(date);
            return res.render('student_dashboard', {
                data: data,
                date: date
            });
            // res.send('Welcome back, ' +' '+data);
        }
        else {
            res.redirect('/error')
        }
        res.end();
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    faculty_dashboard,
    student_dashboard,
    admin_dashboard
}