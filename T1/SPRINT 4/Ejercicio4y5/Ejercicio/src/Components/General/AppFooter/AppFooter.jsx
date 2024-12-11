import React from 'react';
import './AppFooter.css';

function AppFooter() {
  return (
    <footer className="app-footer">
      <p>&copy; {new Date().getFullYear()} Esta web ha sido desarrollada en React.</p>
    </footer>
  );
}

export default AppFooter;