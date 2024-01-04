import SQLite from 'react-native-sqlite-storage';

// Open the database at the top level
const db = SQLite.openDatabase({
  name: 'mydatabase.db',
  createFromLocation: 1,
});

export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    const db = SQLite.openDatabase(
      {
        name: 'mydatabase.db',
      },
      () => {
        db.transaction(
          (tx) => {
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT);',
              [],
              () => {
                console.log('Table users created successfully');
                resolve(db);
              },
              (error) => {
                console.error('Error creating table: ', error);
                reject(error);
              }
            );
          },
          (error) => {
            console.error('Transaction error:', error);
            reject(error);
          }
        );
      },
      (error) => {
        console.error('Database opening error:', error);
        reject(error);
      }
    );
  });
};

export const registerUser = async (username, password) => {
  return new Promise((resolve, reject) => {
    try {
      // Ensure the database is initialized before performing any transactions
      initDatabase().then((db) => {
        db.transaction(
          (tx) => {
            tx.executeSql(
              'INSERT INTO users (username, password) VALUES (?, ?);',
              [username, password],
              (_, results) => {
                resolve(results.insertId);
              },
              (error) => {
                console.error('Error during registration:', error);
                reject(error);
              }
            );
          },
          (error) => {
            console.error('Transaction error:', error);
          }
        );
      });
    } catch (error) {
      console.error('Error during registration:', error);
      reject(error);
    }
  });
};
