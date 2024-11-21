const mysql = require("mysql2");
require("dotenv").config();

console.log(process.env.DB_HOST); 

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL");

  db.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`, (err) => {
    if (err) throw err;
    console.log(`Database ${process.env.DB_NAME} created or exists already`);

    db.changeUser({ database: process.env.DB_NAME }, (err) => {
      if (err) throw err;

      const createUsersTable = `
        CREATE TABLE IF NOT EXISTS Users (
          User_ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          fName VARCHAR(50),
          lName VARCHAR(50),
          UName VARCHAR(50) UNIQUE,
          Email VARCHAR(100) UNIQUE,
          Password VARCHAR(50),
          role ENUM('superadmin', 'admin', 'enduser'),
          accessLevel INT CHECK (accessLevel BETWEEN 1 AND 3)
        )`;

      const createUserPointsTable = `
        CREATE TABLE IF NOT EXISTS User_Points (
          Points_ID INT PRIMARY KEY,
          User_ID INT,
          Points_earned INT,
          Points_redeemed INT,
          Total_points INT,
          Updated_Timestamp TIMESTAMP,
          FOREIGN KEY (User_ID) REFERENCES Users(User_ID)
        )`;

      const createUserFeedbackTable = `
        CREATE TABLE IF NOT EXISTS User_Feedback (
          Submission_ID INT PRIMARY KEY,
          User_ID INT,
          Rating INT,
          Comments TEXT,
          Date_submitted DATE,
          FOREIGN KEY (User_ID) REFERENCES Users(User_ID)
        )`;

      // const createTicketsTable = `
      //   CREATE TABLE IF NOT EXISTS Tickets (
      //     Ticket_ID INT PRIMARY KEY,
      //     Submitter_ID INT,
      //     Admin_ID INT,
      //     TicketDescription TEXT,
      //     Date_created DATE,
      //     Date_resolved DATE,
      //     TicketPriority VARCHAR(20),
      //     Status VARCHAR(20),
      //     FOREIGN KEY (Submitter_ID) REFERENCES Users(User_ID),
      //     FOREIGN KEY (Admin_ID) REFERENCES Users(User_ID)
      //   )`;

      const createTicketsTable = `
        CREATE TABLE IF NOT EXISTS Tickets (
          Ticket_ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          Submitter_ID INT NOT NULL,
          Admin_ID INT,
          TicketDescription TEXT,
          Date_created DATE,
          Date_resolved DATE,
          TicketPriority VARCHAR(20),
          Status VARCHAR(20),
          Feedback TEXT,
          FOREIGN KEY (Submitter_ID) REFERENCES Users(User_ID),
          FOREIGN KEY (Admin_ID) REFERENCES Users(User_ID)
        )`;

      const createRewardsTable = `
        CREATE TABLE IF NOT EXISTS Rewards (
          Reward_ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          Points_required INT,
          rewardName VARCHAR(100),
          RewardsDescription TEXT,
          Status VARCHAR(20)
        )`;

      const createRedeemRewardTable = `
        CREATE TABLE IF NOT EXISTS RedeemReward (
          Redemption_ID INT PRIMARY KEY,
          User_ID INT,
          Reward_ID INT,
          RedeemDate DATE,
          Status VARCHAR(20),
          Redeemed_in INT,
          FOREIGN KEY (User_ID) REFERENCES Users(User_ID),
          FOREIGN KEY (Reward_ID) REFERENCES Rewards(Reward_ID)
        )`;

      const createLearningContentTable = `
        CREATE TABLE IF NOT EXISTS Learning_Content (
          ContentID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          AdminID INT,
          Title VARCHAR(100),
          ContentDescription TEXT,
          ContentType VARCHAR(50),
          DateUploaded DATE,
          ScheduledDate DATE,
          Link TEXT,
          FOREIGN KEY (AdminID) REFERENCES Users(User_ID)
        )`;

      db.query(createUsersTable, (err) => {
        if (err) throw err;
      });
      db.query(createUserPointsTable, (err) => {
        if (err) throw err;
      });
      db.query(createUserFeedbackTable, (err) => {
        if (err) throw err;
      });
      db.query(createTicketsTable, (err) => {
        if (err) throw err;
      });
      db.query(createRewardsTable, (err) => {
        if (err) throw err;
      });
      db.query(createRedeemRewardTable, (err) => {
        if (err) throw err;
      });
      db.query(createLearningContentTable, (err) => {
        if (err) throw err;
      });


      // Insert test data
      const insertUsers = `
        INSERT IGNORE INTO Users (fName, lName, UName, Email, Password, role, accessLevel) VALUES
        ('Alice', 'Smith', 'asmith', 'asmith@example.com', 'password123', 'superadmin', 3),
        ('John', 'Doe', 'jdoe', 'jdoe@example.com', 'securepass', 'enduser', 1),
        ('Jane', 'Doe', 'jdoe2', 'janedoe@example.com', 'pass456', 'admin', 2),
        ('Wahaj', 'Haider', 'waj', 'wahaj.haider@torontomu.ca', 'password', 'superadmin', 3)
      `;
      db.query(insertUsers, (err) => {
        if (err) throw err;
      });

      const insertUserPoints = `
        INSERT IGNORE INTO User_Points (Points_ID, User_ID, Points_earned, Points_redeemed, Total_points, Updated_Timestamp)
        VALUES (1, 2, 100, 20, 80, CURRENT_TIMESTAMP)
      `;
      db.query(insertUserPoints, (err) => {
        if (err) throw err;
      });

      const insertUserFeedback = `
        INSERT IGNORE INTO User_Feedback (Submission_ID, User_ID, Rating, Comments, Date_submitted)
        VALUES (1, 2, 5, 'Great experience!', CURDATE())
      `;
      db.query(insertUserFeedback, (err) => {
        if (err) throw err;
      });

      const insertTickets = `
      INSERT IGNORE INTO Tickets (Submitter_ID, Admin_ID, TicketDescription, Date_created, Date_resolved, TicketPriority, Status)
      VALUES 
      (2, 1, 'Issue with points calculation', CURDATE(), NULL, 'High', 'Open'),
      (2, 1, 'Login issue', CURDATE(), NULL, 'Medium', 'In Progress'),
      (2, 1, 'Payment not processed', CURDATE(), NULL, 'Low', 'Closed')
    `;
    db.query(insertTickets, (err) => {
      if (err) throw err;
    });

      const insertReward1 = `
        INSERT IGNORE INTO Rewards (Reward_ID, Points_required, rewardName, RewardsDescription, Status)
        VALUES (1, 50, 'Gift Card', 'Redeemable for a $10 gift card', 'Active')
      `;
      db.query(insertReward1, (err) => {
        if (err) throw err;
      });

      const insertReward2 = `
        INSERT IGNORE INTO Rewards (Reward_ID, Points_required, rewardName, RewardsDescription, Status)
        VALUES (2, 100, 'Headphones', 'Redeemable for a pair of headphones', 'Inactive')
      `;
      db.query(insertReward2, (err) => {
        if (err) throw err;
      });

      const insertRedeemReward = `
        INSERT IGNORE INTO RedeemReward (Redemption_ID, User_ID, Reward_ID, RedeemDate, Status, Redeemed_in)
        VALUES (1, 2, 1, CURDATE(), 'Redeemed', 1)
      `;
      db.query(insertRedeemReward, (err) => {
        if (err) throw err;
      });

      const insertLearningContent = `
        INSERT IGNORE INTO Learning_Content (ContentID, AdminID, Title, ContentDescription, ContentType, DateUploaded, ScheduledDate, Link)
        VALUES (1, 1, 'SQL Basics', 'An introductory guide to SQL.', 'Tutorial', CURDATE(), NULL, 'https://www.w3schools.com/sql/')
      `;
      db.query(insertLearningContent, (err) => {
        if (err) throw err;
      });

      console.log("All tables created and test data inserted.");
    });
  });
});

module.exports = db;
