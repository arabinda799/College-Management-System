const mysql = require('../connection').con;
const bcrypt = require('bcrypt');

const securePassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        return hashedPassword;
    } catch (error) {
        console.log(error.message);
    }
}



const employee_add = async (req, res) => {
    try {

        if(req.session.admin_loggedin) {
            const { name, emp_id, type, position, dob, gender, phone, email, blood, address, doj, 
                qualification, department, aadhar, account, bank, marital_status, password,cpassword
            } = req.body;
            const sPassword = await securePassword(password);
            let image = "";
            if (typeof req.file === "undefined") {
                image = "no-img.png";
            } else {
                image = req.file.filename;
            }
            console.log(req.body);
            console.log(req.file.filename);
    
            let qry1 = "select * from employees where emp_id = ? or email = ?";
            mysql.query(qry1, [emp_id, email], (err, results) => {
                if(err) {
                    console.log(err.message);
                    return res.redirect('/register');
                }
                else {
                    if(results.length > 0) {
                        console.log("Record exists");
                        console.log(results[0]);
                        // res.send(results[0]);
                        return res.render('register', {exist: true});
                    }
                    else {
                        if(password === cpassword) {
                            let qry2 = "INSERT INTO `employees` (`name`, `emp_id`, `type`, `position`, `dob`, `gender`, `phone`, `email`, `blood`, `address`, `doj`, `qualification`, `department`, `aadhar`, `account`, `bank`, `marital_status`, `image`, `password`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                            mysql.query(qry2, [name, emp_id, type, position, dob, gender, phone,email, blood, address, doj, qualification, 
                                department, aadhar, account, bank, marital_status, image, sPassword ], (err2, results2) => {
                                if(err2) {
                                    console.log(err2.message);
                                    return res.redirect('/register');
                                }
                                else {
                                    if(results2.affectedRows > 0) {
                                        console.log("Registered");
                                        return res.render('register', {success: true});
                                    }
                                    else {
                                        console.log(err2.message);
                                        return res.redirect('/register');
                                    }
                                }
                            });
                        }
    
                        else {
                            console.log("password don't match");
                            return res.render("register", {notMatch : true})
                        }
                    }
                }
            })
    
        }

        else {
            return res.redirect('/error');
        }
    } catch (error) {
        console.log(error.message);
    }
};





const student_add = async (req, res) => {
    try {

        if(req.session.admin_loggedin) {
            const { name, regd_no, roll_no, father_name, mother_name, dob, gender, phone, email, blood, address, father_phn, 
                semester, course, department, section, father_email, password,cpassword
            } = req.body;
            const sPassword = await securePassword(password);
            let image = "";
            if (typeof req.file === "undefined") {
                image = "no-img.png";
            } else {
                image = req.file.filename;
            }
            console.log(req.body);
            console.log(req.file.filename);
    
            let qry1 = "select * from students where regd_no = ? or email = ?";
            mysql.query(qry1, [regd_no, email], (err, results) => {
                if(err) {
                    console.log(err.message);
                    return res.redirect('/register');
                }
                else {
                    if(results.length > 0) {
                        console.log("Record exists");
                        console.log(results[0]);
                        // res.send(results[0]);
                        return res.render('register', {exist: true});
                    }
                    else {
                        if(password === cpassword) {
                            let qry2 = "INSERT INTO `students` (`name`, `regd_no`, `roll_no`, `father_name`, `mother_name`, `dob`, `gender`, `phone`, `email`, `blood`, `address`, `father_phn`, `semester`, `course`, `department`, `section`, `father_email`, `image`, `password`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                            mysql.query(qry2, [name, regd_no, roll_no, father_name, mother_name, dob, gender, phone, email, blood, address, father_phn, semester, course, department, section, father_email, image, sPassword ], (err2, results2) => {
                                if(err2) {
                                    console.log(err2.message);
                                    return res.render('register', {failure: true});
                                }
                                else {
                                    if(results2.affectedRows > 0) {
                                        console.log("Registered");
                                        return res.render('register', {success: true});
                                    }
                                    else {
                                        console.log(err2.message);
                                        return res.redirect('/register');
                                    }
                                }
                            })
                        }
    
                        else {
                            console.log("password don't match");
                            return res.render("register", {notMatch : true})
                        }
                    }
                }
            });
        }

        else {
            return res.redirect('/error');
        }

    } catch (error) {
        console.log(error.message);
    }
};





module.exports = {
    employee_add,
    student_add
}