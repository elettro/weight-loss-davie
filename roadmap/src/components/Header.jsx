import { NavLink } from 'react-router-dom';

const links = [
  ['/', 'Home'],
  ['/calculator', 'Calculator'],
  ['/dashboard', 'Dashboard'],
  ['/timeline', 'Timeline'],
  ['/comparison', 'Comparison']
];

function Header() {
  return (
    <header className="site-header">
      <div className="content-wrap nav-shell">
        <NavLink to="/" className="brand-mark">
          <span>GLP-1</span> Roadmap
        </NavLink>
        <nav className="main-nav">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} className="nav-link">
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
