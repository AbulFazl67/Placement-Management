const connection = require('../db.js');
const app = require('../express.js');

// ----------------- LOGIN API -----------------
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT user_id, name, email, role FROM users WHERE email=? AND password=?";
    connection.execute(sql, [username, password], (err, result) => {
        if (err) {
            return res.status(500).send({ error: err });
        }

        if (result.length === 0) {
            return res.status(401).send({ error: "Invalid email or password" });
        }

        // send user data including role
        res.status(200).send({ user: result[0] });
    });
});

// ----------------- SIGNUP API -----------------
app.post('/api/signup', (req, res) => {
    const { name, email, password, role, skills, job_preference, placed } = req.body;
    console.warn(req.body);
    const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    
    connection.execute(sql, [name, email, password, role], (err, result) => {
        if (!err) {
            if (role === "student") {
                // yaha table name correct kiya aur student_id ko insertId se liya
                const studentQuery = "INSERT INTO profiles (user_id, skills) VALUES (?, ?)";
                connection.execute(studentQuery, [result.insertId, skills], (studentErr, studentResult) => {
                    if (studentErr) {
                        console.error("Error inserting into student_profiles table:", studentErr);
                        res.status(500).send({ error: studentErr });
                    } else {
                        console.log("Student record created successfully:", studentResult);
                        res.status(200).send({ result: `Student ${name} registered successfully!` });
                    }
                });
            } else {
                res.status(200).send({ result: `User ${name} successfully registered for the role => ${role}` });
            }
        } else {
            res.status(500).send({ error: err });
        }
    });
});
