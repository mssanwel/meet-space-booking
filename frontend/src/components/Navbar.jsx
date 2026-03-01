import { NavLink } from 'react-router-dom'

export default function Navbar({ username, onLogout }) {
    return (
        <nav className="navbar">
            <div className="navbar-brand">⚡ MeetSpace</div>

            <div className="navbar-links">
                <NavLink to="/rooms" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
                    Browse Rooms
                </NavLink>
                <NavLink to="/my-bookings" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
                    My Bookings
                </NavLink>
            </div>

            <div className="navbar-user">
                <span className="username-badge">👤 {username}</span>
                <button className="btn btn-ghost btn-sm" onClick={onLogout}>Log out</button>
            </div>
        </nav>
    )
}
