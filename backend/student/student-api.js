const app = require('../express.js')
const db = require('../db.js')
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder jaha photo store hoga
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique name
  },
});

const upload = multer({ storage });



app.post('/api/student-register', (req, res) => {
  const { name, email, password } = { ...req.body }
  console.warn(req.body.email)
  console.warn(email, password)
  const query = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";

  db.execute(query, [name, email, password, "Student"], (err, results) => {
    if (err) {
      res.status(500).json({ error: err })
    } else {
      res.status(200).json({ data: "Student Registered Successfully" })
    }
  })

})

app.post('/api/applyJobs', (req, res) => {
  const { student_id, job_id } = { ...req.body }
  console.warn(req.body)
  const query = "INSERT INTO applications (student_id, job_id, status) VALUES (?, ?, ?)";
  db.execute(query, [student_id, job_id, "Applied"], (err, results) => {
    if (err) {
      console.warn(err)
      res.status(500).json({ error: err })
    } else {
      res.status(200).json({ data: "Job Applied Successfully" })
    }
  })
})

app.get('/api/appliedJobs/:student_id', (req, res) => {
  const { student_id } = req.params;
  console.log("Student ID:", student_id);

  const sql = `
    SELECT 
      st.*,
      sp.student_id,
      a.status AS application_status
    FROM users st
    JOIN student_profiles sp ON sp.user_id = st.user_id
    JOIN applications a ON a.student_id = sp.student_id
    WHERE sp.student_id = ?
  `;

  db.execute(sql, [student_id], (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error });
    } else {
      res.status(200).json({ data: result });
    }
  });
});

app.get('/api/getUserid/:student_id', (req, res) => {
  const { student_id } = req.params;
  console.log("Student ID:", student_id);

  const sql = `
    SELECT 
      st.*,
      sp.student_id,
      a.status AS application_status,
      jp.title as job_title
    FROM users st
    JOIN student_profiles sp ON sp.user_id = st.user_id
    JOIN applications a ON a.student_id = sp.student_id
    JOIN job_posts jp ON jp.job_id = a.job_id
    WHERE st.user_id = ?
  `;

  db.execute(sql, [student_id], (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error });
    } else {
      res.status(200).json({ data: result });
    }
  });
});

// abul fazl
app.get('/api/profile/:user_id', (req, res) => {
  const { user_id } = req.params;

  const sql = `
    SELECT u.*, sp.*
    FROM users u
    LEFT JOIN profiles sp ON u.user_id = sp.user_id
    WHERE u.user_id = ?;
  `;

  db.execute(sql, [user_id], (err, results) => {
    if (err) {
      console.error("SQL Error:", err);
      // just log the error, but don't send 500
      return res.json({ data: null });
    }

    // even if profile not found, send whatever data is there
    if (results.length === 0) {
      return res.json({ data: null });
    }

    return res.json({ data: results[0] });
  });
});


app.put("/update-profile/:user_id", (req, res) => {
  const user_id = req.params.user_id;
  const { phone, dob, course, semester, skills, resume } = req.body;

  const sql = `
    UPDATE profiles 
    SET phone = ?, dob = ?, course = ?, semester = ?, skills = ?, resume = ?
    WHERE user_id = ?
  `;

  const values = [phone, dob, course, semester, skills, resume, user_id];

  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (result.affectedRows === 0)
      return res.json({ message: "No record found for this user_id" });

    res.json({ message: "Profile updated successfully" });
  });
});

// end here


/* app.post("/api/applyJob", (req, res) => {
    const { student_id, job_id } = req.body;
    console.warn(req.body);
    const sql = "INSERT INTO applications (student_id, job_id, status) VALUES (?, ?, ?)";
    db.execute(sql, [student_id, job_id, "Applied"], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send({ message: "Cannot apply for job" });
        } else {
            console.log("Job applied successfully");
            return res.status(200).send({ result: "Job applied successfully" });
        }
    });
}); */

app.get('/api/student/jobs', (req, res) => {
  const sql = "SELECT * FROM job_posts"; // ya tu apni table ka naam de
  
  db.execute(sql, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    } else {
      res.status(200).json(results);
    }
  });
});

app.get('/api/student/applications/:student_id', (req, res) => {
  const { student_id } = req.params;

  const sql = `
    SELECT 
      jp.title,
      jp.description,
      a.status,
      a.applied_at
    FROM applications a
    JOIN job_posts jp ON a.job_id = jp.job_id
    WHERE a.student_id = ?
  `;

  db.execute(sql, [student_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length === 0) {
      return res.status(200).json([]); 
    }
    res.status(200).json(results);
  });
});


app.post("/api/upload-photo/:user_id", upload.single("photo"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  const photoPath = `/uploads/${req.file.filename}`;

  const sql = "UPDATE profiles SET photo=? WHERE user_id=?";
  db.query(sql, [photoPath, req.params.user_id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json({ photo: photoPath });
  });
});

app.post("/api/upload-resume/:user_id", upload.single("resume"), (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
  const resumePath = `/uploads/${req.file.filename}`;

  const sql = "UPDATE profiles SET resume=? WHERE user_id=?";
  db.query(sql, [resumePath, req.params.user_id], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });
    res.json({ resume: resumePath });
  });
});

