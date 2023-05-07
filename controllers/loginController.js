const mysql = require('../connection').con;
const bcrypt = require('bcrypt');


const admin_login = async (req, res) => {
    try {
        const {email, password} = req.body;
        console.log(email+" "+password);
        let qry = 'select * from user where email =?';
        mysql.query(qry, [email], async(err, results) => {
            console.log(results[0]);
            if(results.length > 0) {
                if (results[0].password === password) {
                    req.session.admin_loggedin = true;
                    req.session.data = results[0];
                    data = req.session.data;
                    console.log("Logged in");
                    // return res.send(results[0]);
                    return res.redirect('/admin_dashboard');
                }
                else {
                    console.log("Incorrect email or password");
                    return res.render('login', {error: true});
                }
            }
            else {
                console.log("Incorrect email or password");
                return res.render('login', {error: true})
            }
        })
    } catch (error) {
        console.log(error.message);
    }
}

// Faculty Login
const faculty_login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email + " " + password);
        mysql.query('select * from employees where email =?', [email], async (error, results) => {
            if (results.length > 0) {
                console.log(results);
                const comparePassword = await bcrypt.compare(password, results[0].password);
                console.log(comparePassword);
                if (comparePassword) {
                    console.log("logged in");
                    req.session.faculty_loggedin = true;
                    req.session.data = results[0];
                    data = req.session.data;
                    console.log(data.email);
                    return res.redirect('/faculty_dashboard');
                }
                else {
                    console.log("Incorrect email or password");
                    return res.render('login', {error: true})
                }
            }
            else {
                console.log("Incorrect email or password");
                return res.render('login', {error: true})
            }
        });
    }
    catch (error) {
        console.log(error.message);
    }
};



// Student Login
const student_login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email + " " + password);
        mysql.query('select * from students where email =?', [email], async (error, results) => {
            if (results.length > 0) {
                console.log(results);
                const comparePassword = await bcrypt.compare(password, results[0].password);
                console.log(comparePassword);
                if (comparePassword) {
                    console.log("logged in");
                    req.session.student_loggedin = true;
                    req.session.data = results[0];
                    data = req.session.data;
                    console.log(data.email);
                    return res.redirect('/student_dashboard');
                }
                else {
                    console.log("Incorrect email or password");
                    return res.render('login', {error: true})
                }
            }
            else {
                console.log("Incorrect email or password");
                return res.render('login', {error: true})
            }
        });
    }
    catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    admin_login,
    faculty_login,
    student_login,
}