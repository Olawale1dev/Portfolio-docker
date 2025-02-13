const mysql = require('mysql2');

// Create connection to MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',  // Your MySQL user
  password: '',  // Your MySQL password
  database: 'myportfolio', // Your database name
});

// Create followers table
const createFollowersTable = `
  CREATE TABLE IF NOT EXISTS followers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    follow_date DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`;

connection.query(createFollowersTable, (err, results) => {
  if (err) {
    console.error('Error creating followers table:', err);
  } else {
    console.log('Followers table created successfully');
  }
});

// Close connection
connection.end();
