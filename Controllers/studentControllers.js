
import Student from '../Models/studentModel.js'

export const Dashboard = async (req, res) => {
    try {
        const studentData = await Student.find();

        const totalStudents = studentData.length;

        const passedStudents = studentData.filter(student => student.Result === 'Pass').length;

        const failedStudents = studentData.filter(student => student.Result === 'Fail').length;

        
        console.log(studentData);
        console.log(totalStudents);
        console.log(passedStudents);
        console.log(failedStudents);
        res.json({
            status: true, message:"Dashboard count has shown Successfully",
            data: {
                totalStudents,
                passedStudents,
                failedStudents
            }
        });
    } catch (err) {
        console.log(err);
        res.json({ status: false, message: "Something went wrong" });
    }
};

export const createStudent = async (req, res) => {
  try {
    const { studentname, reg_no, email, dob, gender, phone, subject1, subject2, subject3, subject4, subject5 } = req.body;
    const passmark = 35;
    const student = await Student.findOne({ "email": email });
    if (!student) {
      const student1 = new Student();
      student1.studentname = studentname;
      student1.reg_no = reg_no,
      student1.email = email;
      student1.dob = dob;
      student1.gender = gender;
      student1.phone = phone;
      student1.subject1 = subject1;
      student1.subject2 = subject2;
      student1.subject3 = subject3;
      student1.subject4 = subject4;
      student1.subject5 = subject5;
      student1.Total = parseInt(subject1) + parseInt(subject2) + parseInt(subject3) + parseInt(subject4) + parseInt(subject5);
      student1.Average = parseFloat(student1.Total) / 5;
      student1.Result =  parseInt(subject1) >= passmark &&
        parseInt(subject2) >= passmark &&
        parseInt(subject3) >= passmark &&
        parseInt(subject4) >= passmark &&
        parseInt(subject5) >= passmark
        ? "Pass" : "Fail";

      student1.save();
      console.log(student1);
      console.log("got result")

      res.json({status:true,message:"Student Profile Created Successfully", data: student1});
    } else {
      res.json({status:false,message:"Student Profile already exists with the given email"});
    }
  } catch (err) {
    console.log(err);
    res.json({status:false,message:"Student Profile cannot be created. Something went wrong" });
  }
};


// export const updateStudent = async (req, res) => {
//     try {
//       const { studentname,reg_no,email,dob,gender,phone,subject1,subject2,subject3,subject4,subject5} = req.body;
//       const passmark = 35;
  
//       const student1 = await Student.findByIdAndUpdate({ _id: req.params.id, });
  
//       if (student1) {
//         student1.studentname=studentname,
//         student1.reg_no = reg_no,
//         student1.email = email,
//         student1.dob= dob,
//         student1.gender = gender,
//         student1.phone = phone,
//         student1.subject1 = subject1,
//         student1.subject2 = subject2,
//         student1.subject3 = subject3,
//         student1.subject4 = subject4,
//         student1.subject5 = subject5,

//         student1.Total =
//           parseInt(subject1) +
//           parseInt(subject2) +
//           parseInt(subject3) +
//           parseInt(subject4) +
//           parseInt(subject5);
//        student1.Average = parseFloat(student1.Total) / 5;
//         student1.Result =
//           parseInt(subject1) >= passmark &&
//           parseInt(subject2) >= passmark &&
//           parseInt(subject3) >= passmark &&
//           parseInt(subject4) >= passmark &&
//           parseInt(subject5) >= passmark
//           ? "Pass" :"Fail",
  
      
  
//         await student1.save(); // Save the updated student object
//         console.log(student1)
//         res.json({status:true,message:"Student Profile Updated Successfully",data: student1});
//       } else {
//         res.json({status:false,message:"Student Profile cannot be updated"});
//       }
//     } catch (err) {
//       console.log(err);
//       res.json({status:false,message:"Something went wrong" });
//     }
// };

export const updateStudent = async (req, res) => {
  try {
    const {
      studentname,
      reg_no,
      email,
      dob,
      gender,
      phone,
      subject1,
      subject2,
      subject3,
      subject4,
      subject5,
    } = req.body;

    const passmark = 35;

    const isNumber = (value) => !isNaN(parseFloat(value)) && isFinite(value);

    if (
      ![subject1, subject2, subject3, subject4, subject5].every(isNumber)
    ) {
      return res.json({ status: false, message: "Invalid subject scores" });
    }

    const student1 = await Student.findOneAndUpdate(
      { _id: req.params.id },
      {
        studentname,
        reg_no,
        email,
        dob,
        gender,
        phone,
        subject1,
        subject2,
        subject3,
        subject4,
        subject5,
      },
      { new: true } // Return the updated document
    );

    if (student1) {
      student1.Total =
        parseInt(subject1) +
        parseInt(subject2) +
        parseInt(subject3) +
        parseInt(subject4) +
        parseInt(subject5);
      student1.Average = parseFloat(student1.Total) / 5;
      student1.Result =
        parseInt(subject1) >= passmark &&
        parseInt(subject2) >= passmark &&
        parseInt(subject3) >= passmark &&
        parseInt(subject4) >= passmark &&
        parseInt(subject5) >= passmark
          ? "Pass"
          : "Fail";

      await student1.save(); // Save the updated student object
      console.log(student1);
      res.json({status: true,message: "Student Profile Updated Successfully",data: student1,});
    }
    else{
      res.json({ status: false, message: "Student Profile Cannot Update. Please check it" });
    }

 
  } catch (err) {
    console.log(err);
    res.json({ status: false, message: "Something went wrong" });
  }
};


export const viewStudent = async (req,res) =>{
  try{
    const student = await Student.findOne({_id:req.params.id});
    console.log(student);
      if(student){
          res.json({status:true,message:"Student Details Viewed Successfully!!!",data:student})
      }
      else{
        res.json({status:false,message:"Student Details cannot be viewed. Please try again"})
      }

  }
  catch(err){
    console.log(err);
    res.json({ status: false, message: "Something went wrong" });
  }
}


export const studentList = async (req, res) => {
    try {
      const allStudent = await Student.find({});
      if (allStudent) { // Check if any students are found
        console.log(allStudent)
        res.json({status: true,message: "Student List has been retrieved successfully",data: allStudent});
      } else {
        res.json({status: false,message: "No students found in the database"});
      }
    } catch (err) {
      console.log(err);
      res.json({status: false, message: "Something went wrong"});
    }
};



export const deleteStudent = async (req, res) => {
    try {
      const id = req.params.id;
      const student = await Student.findOneAndDelete({ _id: id });
  
      if (student) {
        console.log(student);
        res.json({status: true,message: "Student Profile Deleted Successfully",data: id});
      } else {
        res.json({ status: false, message: "Student Profile does not exist"});
      }
    } catch (err) {
      console.log(err);
      res.json({ status: false, message: "Something went wrong" });
    }
};


export const studentDashboard = async (req, res) => {
  try {
    const {reg_no,dob} = req.body;
    const student = await Student.findOne({reg_no:reg_no,dob:dob});
    console.log(student);
    if (student) {
      res.json({ status: true, message: "Student Details found Successfully",data:student});
    } else {
      res.json({ status: false, message: "Student Details not found. Please check the details" });
    }
  } catch (error) {
    console.log(error);
    res.json({ status: false, message: "Something went wrong" });
  }
};

// Assuming you have imported the necessary modules and initialized the Student model correctly.

export const searchStudent = async (req, res) => {
  try {
    const studentName = req.query.studentname; // Changed variable name to camelCase for consistency
    console.log(studentName);
    const students = await Student.find({ "studentname": { $regex: `${studentName}`, $options: 'i' } });
    console.log(students);

    if (students.length > 0) { // Check if there are any matching students in the array
      res.json({ status: true, message: "Student search results found successfully", data: students });
    } else {
      res.json({ status: false, message: "Student search not found. Please check the details" });
    }
  } catch (error) {
    console.log(error);
    res.json({ status: false, message: "Something went wrong" });
  }
}

