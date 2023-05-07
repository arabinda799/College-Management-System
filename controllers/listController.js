const mysql = require('../connection').con;

const student_list = async (req, res) => {
   try {
      if (req.session.admin_loggedin) {
         mysql.query('SELECT * FROM students', (err, results) => {
            if (err) {
               console.log(err.message);
               return res.redirect("/");
            }
            else {
               // console.log(results);
               return res.render("student_list", { data: results })
            }

         });
      }
      else {
         return res.redirect("/error");
      }
   } catch (error) {
      console.log(error.message);
   }
}
const employee_list = async (req, res) => {
   try {
      if (req.session.admin_loggedin) {
         mysql.query('SELECT * FROM employees', (err, results) => {
            if (err) {
               console.log(err.message);
               return res.redirect("/");
            }
            else {
               // console.log(results);
               return res.render("employee_list", { data: results })
            }

         });
      }
      else {
         return res.redirect("/error");
      }
   } catch (error) {
      console.log(error.message);
   }
}
const student_search = async (req, res) => {
   try {
      if (req.session.loggedin) {
         let srch = req.body.search;
         console.log(srch);
         mysql.query('SELECT * FROM students where name like ? or email like ? or regd_no like ? or phone like ?', ['%' + srch + '%', '%' + srch + '%', '%' + srch + '%', '%' + srch + '%'], (err, results) => {
            if (!err) {
               res.render('student_list', { data: results });
            } else {
               return res.redirect("/student_list");
            }
            console.log('The data from user table : \n', results);
         });
      }
      else {
         return res.redirect("/error");
      }
   } catch (error) {
      console.log(error.message);
   }
}

module.exports = {
   student_list,
   employee_list,
   student_search
}