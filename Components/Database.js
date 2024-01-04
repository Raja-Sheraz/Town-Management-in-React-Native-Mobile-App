import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'mydatabase.db',
    createFromLocation: 1,
  },
  () => {
    db.transaction((tx) => {
      // Create the "announcements" table if it doesn't exist
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS announcements (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          text TEXT,
          startDate TEXT,
          endDate TEXT
        );`
      );
    });
  },
  (error) => {
    console.error('Error opening database:', error);
  }
);

export default db;
