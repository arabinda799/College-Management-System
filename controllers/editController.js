const mysql = require('../connection').con;


const edit_student = async(req, res) => {
   try {
      const id = req.params.id;
      console.log(id);
      mysql.query("select * from students where id=?", [id], (err, results) => {
         if(!err) {
            return res.render("edit_student", {data: results});
         }
         else {
            console.log(err.message);
            res.redirect("/error");
         }
      })
      
   } catch (error) {
      console.log(error.message);
   }
}
const edit_employee = async(req, res) => {
   try {
      const id = req.params.id;
      console.log(id);
      mysql.query("select * from employees where id=?", [id], (err, results) => {
         if(!err) {
            return res.render("edit_employee", {data: results});
         }
         else {
            console.log(err.message);
            res.redirect("/error");
         }
      })
      
   } catch (error) {
      console.log(error.message);
   }
}


const update_employee = async(req, res) => {
   try {

      const { name, emp_id, type, position, dob, gender, phone, email, blood, address, doj, 
         qualification, department, aadhar, account, bank, marital_status
     } = req.body;
     let image = "";
     if (typeof req.file === "undefined") {
         image = "no-img.png";
     } else {
         image = req.file.filename;
     }
     console.log(req.body);
     console.log(req.file.filename);
     let qry1 = "update `employees` set `name`=?, `emp_id`=?, `type`=?, `position`=?, `dob`=?, `gender`=?, `phone`=?, `email`=?, `blood`=?, `address`=?, `doj`=?, `qualification`=?, `department`=?, `aadhar`=?, `account`=?, `bank`=?, `marital_status`=?, `image`=? where id=?";
     mysql.query(qry1, [name, emp_id, type, position, dob, gender, phone,email, blood, address, doj, qualification, 
      department, aadhar, account, bank, marital_status, image, req.params.id ], (err, results) => {
      if(err) {
         console.log(err.message);
         return res.redirect('/edit_employee/:id');
      }
      else {
         let qry2 = "select * from employees where id=?";
         mysql.query(qry2, [req.params.id], (err2, results2) => {
            if(err2) {
               console.log(err2.message);
               return res.redirect('/edit_employee/:id');
            }
            else {
               if(results2.length > 0) {
                  console.log("Success");
                  res.render("edit_employee", {success: true});
               }
               else {
                  console.log("failure");
                  res.render("edit_employee", {success: false})
               }
            } 
         });
      }
  });
   } catch (error) {
      console.log(error.message);
   }
}


module.exports = {
   edit_student,
   edit_employee,
   update_employee
}