const { NavLink  } = ReactRouterDOM


export function AppHeader() {
    return (
        <header>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/book">Books</NavLink>
                <NavLink to="/about">About</NavLink>
            </nav>
        </header>
    )
}