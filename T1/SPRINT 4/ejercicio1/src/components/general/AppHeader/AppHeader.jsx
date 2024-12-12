import React from 'react';
import { Link } from 'react-router';
import './AppHeader.css';

function AppHeader() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/GuildMemberManagement">
            <button className='root'>GuildMemberManagement</button>
          </Link>
        </li>
        <li>
          <Link to="/PartyFinder">
            <button className='root'>PartyFinder</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default AppHeader;