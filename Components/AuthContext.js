import React, { createContext, useContext, useState, useEffect } from 'react';
import SQLite from 'react-native-sqlite-storage';

const AuthContext = createContext();

const db = SQLite.openDatabase({
  name: 'mydatabase.db',
  createFromLocation: 1,
});

export const initDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT);',
      [],
      (tx, results) => {
        console.log('Table users created successfully');
      },
      (error) => {
        console.error('Error creating table: ', error);
      }
    );
  });
};

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Check if there's a logged-in user in the SQLite database
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM users LIMIT 1;',
        [],
        (tx, results) => {
          if (results.rows.length > 0) {
            const user = results.rows.item(0);
            setLoggedInUser(user);
          }
        },
        (error) => {
          console.error('Error checking for logged-in user: ', error);
        }
      );
    });
  }, []);

  const adminSignIn = async (username, password) => {
    // Implement admin sign-in logic
    // For simplicity, let's assume a hardcoded admin username and password
    const adminUsername = 'admin';
    const adminPassword = 'admin';

    return new Promise((resolve, reject) => {
      if (username === adminUsername && password === adminPassword) {
        // Admin signed in successfully
        // You can perform additional admin-specific logic here
        resolve();
      } else {
        // Invalid admin credentials
        reject(new Error('Invalid admin credentials'));
      }
    });
  };

  const login = (user) => {
    setLoggedInUser(user);
  };

  const logout = () => {
    setLoggedInUser(null);
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, login, logout, adminSignIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
