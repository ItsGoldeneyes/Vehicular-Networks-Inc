const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 5000; // 
const db = require("./config/db");

app.use(express.json());
app.use(cors());


// // MySQL database configuration
// const dbConfig = {
//   host: 'localhost', // MySQL host
//   user: 'root',      // Replace with your MySQL user
//   password: 'yashyerasi',      // Replace with your MySQL password
//   database: 'cps714_database' // Replace with your MySQL database name
// };

// // Create a MySQL connection pool
// const pool = mysql.createPool(dbConfig);

// Routes

// Fetch all users from EndUser table
app.get('/api/users', (req, res) => {
  console.log("fetching all users");
  const query = 'SELECT * FROM Users'; // Changed to use EndUser table
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
    res.json(results);  // Send the users to the frontend
  });
});

// Update a user in EndUser table
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { fName, lName, UName, Email, Password, role, accessLevel } = req.body;
  const query = 'UPDATE Users SET fName = ?, lName = ?, UName = ?, Email = ?, Password = ?, role = ?, accessLevel = ? WHERE User_ID = ?';
  db.query(query, [fName, lName, UName, Email, Password, role, accessLevel, id], (err, results) => {
    if (err) {
      console.error('Error updating user:', err);
      return res.status(500).json({ error: 'Failed to update user' });
    }
    res.json({ id, fName, lName, UName, Email, Password, role, accessLevel }); // Send updated user data back to the frontend
  });
});

// Create a new user in EndUser table
app.post('/api/users', (req, res) => {
  const { fName, lName, UName, Email, Password, role, accessLevel } = req.body;
  db.query(
    'INSERT INTO EndUser (fName, lName, UName, Email, Password, role, accessLevel) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [fName, lName, UName, Email, Password, role, accessLevel],
    (err, results) => {
      if (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ error: 'User creation failed', details: err.message });
        return;
      }
      res.json({ message: 'User created successfully', userId: results.insertId });
    }
  );
});

// **Tickets Routes**
// Fetch all tickets
app.get('/api/tickets', (req, res) => {
  console.log("fetching all tickets");
  db.query('SELECT * FROM Tickets', (err, results) => {
    if (err) {
      console.error('Error fetching tickets:', err);
      res.status(500).json({ error: 'Database error', details: err.message });
      return;
    }
    res.json(results);
  });
});

// Update a ticket
app.put('/api/tickets/:id', (req, res) => {
  const { id } = req.params;
  const { Admin_ID, Status, feedback, Date_resolved } = req.body;
  const query = 'UPDATE Tickets SET Admin_ID = ?, Status = ?, Feedback = ?, Date_resolved = ? WHERE Ticket_ID = ?';
  db.query(query, [Admin_ID, Status, feedback, Date_resolved, id], (err, results) => {
    if (err) {
      console.error('Error updating ticket:', err);
      return res.status(500).json({ error: 'Failed to update ticket' });
    }
    res.json({ id, Admin_ID, Status, feedback, Date_resolved }); 
  });
});

// Create a new ticket
app.post('/tickets', (req, res) => {
  const { Submitter_ID, TicketDescription, TicketPriority, Status } = req.body;
  db.query(
    'INSERT INTO Tickets (Submitter_ID, TicketDescription, TicketPriority, Status) VALUES (?, ?, ?, ?)',
    [Submitter_ID, TicketDescription, TicketPriority, Status],
    (err, results) => {
      if (err) {
        console.error('Error creating ticket:', err);
        res.status(500).json({ error: 'Ticket creation failed', details: err.message });
        return;
      }
      res.json({ message: 'Ticket created successfully', ticketId: results.insertId });
    }
  );
});

// **Rewards Routes**
// Fetch all rewards
app.get('/api/rewards', (req, res) => {
  console.log("fetching all rewards");
  db.query('SELECT * FROM Rewards', (err, results) => {
    if (err) {
      console.error('Error fetching rewards:', err);
      res.status(500).json({ error: 'Database error', details: err.message });
      return;
    }
    res.json(results);
  });
});

// Update a reward
app.put('/api/rewards/:id', (req, res) => {
  const { id } = req.params;
  const { Points, Status } = req.body;
  console.log(Points, Status);
  const query = 'UPDATE Rewards SET Points_required = ?, Status = ? WHERE Reward_ID = ?';
  db.query(query, [Points, Status, id], (err, results) => {
    if (err) {
      console.error('Error updating ticket:', err);
      return res.status(500).json({ error: 'Failed to update reward' });
    }
    res.json({ id, Points, Status }); 
  });
});

// Create a new reward
app.post('/api/rewards', (req, res) => {
  const { Points, Status, Name, Description } = req.body;
  db.query(
    'INSERT INTO Rewards (Points_required, rewardName, RewardsDescription, Status) VALUES (?, ?, ?, ?)',
    [Points, Name, Description, Status],
    (err, results) => {
      if (err) {
        console.error('Error creating reward:', err);
        res.status(500).json({ error: 'Reward creation failed', details: err.message });
        return;
      }
      res.json({ message: 'Reward created successfully', rewardId: results.insertId });
    }
  );
});

// **RedeemReward Routes**
// Fetch all redeemed rewards
app.get('/redeem-rewards', (req, res) => {
  db.query('SELECT * FROM RedeemReward', (err, results) => {
    if (err) {
      console.error('Error fetching redeemed rewards:', err);
      res.status(500).json({ error: 'Database error', details: err.message });
      return;
    }
    res.json(results);
  });
});

// Redeem a reward
app.post('/redeem-rewards', (req, res) => {
  const { User_ID, Reward_ID, RedeemDate, Status, Redeemed_in } = req.body;
  db.query(
    'INSERT INTO RedeemReward (User_ID, Reward_ID, RedeemDate, Status, Redeemed_in) VALUES (?, ?, ?, ?, ?)',
    [User_ID, Reward_ID, RedeemDate, Status, Redeemed_in],
    (err, results) => {
      if (err) {
        console.error('Error redeeming reward:', err);
        res.status(500).json({ error: 'Reward redemption failed', details: err.message });
        return;
      }
      res.json({ message: 'Reward redeemed successfully', redemptionId: results.insertId });
    }
  );
});

// **Learning Content Routes**
// Fetch all learning content
app.get('/api/content', (req, res) => {
  console.log("fetching all content");
  db.query('SELECT * FROM Learning_Content', (err, results) => {
    if (err) {
      console.error('Error fetching learning content:', err);
      res.status(500).json({ error: 'Database error', details: err.message });
      return;
    }
    res.json(results);
  });
});

// Create new learning content
app.post('/api/content', (req, res) => {
  const { AdminID, Title, ContentDescription, ContentType, DateUploaded, ScheduledDate, link } = req.body;
  db.query(
    'INSERT INTO Learning_Content (AdminID, Title, ContentDescription, ContentType, DateUploaded, ScheduledDate, Link) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [AdminID, Title, ContentDescription, ContentType, DateUploaded, ScheduledDate, link],
    (err, results) => {
      if (err) {
        console.error('Error creating content:', err);
        res.status(500).json({ error: 'Content creation failed', details: err.message });
        return;
      }
      res.json({ message: 'Content created successfully', contentId: results.insertId });
    }
  );
});

// **Admin Routes**

// **User Points Routes**
// Fetch all user points
app.get('/user-points', (req, res) => {
  db.query('SELECT * FROM UserPoints', (err, results) => {
    if (err) {
      console.error('Error fetching user points:', err);
      res.status(500).json({ error: 'Database error', details: err.message });
      return;
    }
    res.json(results);
  });
});

// Add points for a user
app.post('/user-points', (req, res) => {
  const { User_ID, Points } = req.body;
  db.query(
    'INSERT INTO UserPoints (User_ID, Points) VALUES (?, ?)',
    [User_ID, Points],
    (err, results) => {
      if (err) {
        console.error('Error adding points:', err);
        res.status(500).json({ error: 'Points addition failed', details: err.message });
        return;
      }
      res.json({ message: 'Points added successfully', pointsId: results.insertId });
    }
  );
});

// **User Rewards Routes**
// Fetch all user rewards
app.get('/user-rewards', (req, res) => {
  db.query('SELECT * FROM UserRewards', (err, results) => {
    if (err) {
      console.error('Error fetching user rewards:', err);
      res.status(500).json({ error: 'Database error', details: err.message });
      return;
    }
    res.json(results);
  });
});

// Redeem reward for user
app.post('/user-rewards', (req, res) => {
  const { User_ID, Reward_ID, PointsRedeemed } = req.body;
  db.query(
    'INSERT INTO UserRewards (User_ID, Reward_ID, PointsRedeemed) VALUES (?, ?, ?)',
    [User_ID, Reward_ID, PointsRedeemed],
    (err, results) => {
      if (err) {
        console.error('Error redeeming reward for user:', err);
        res.status(500).json({ error: 'User reward redemption failed', details: err.message });
        return;
      }
      res.json({ message: 'User reward redeemed successfully', userRewardId: results.insertId });
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
