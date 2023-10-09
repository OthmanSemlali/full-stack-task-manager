import { NavLink } from "react-router-dom";


const NavLinks = ({ toggleSidebar }) => {
  return (
    <div className="nav-links">
      <NavLink
        to={"/dashboard"}
        className={({ isActive }) => {
          return isActive ? "nav-link active" : "nav-link";
        }}
        
        onClick={toggleSidebar}
        
      >
        Dashboard
      </NavLink>

      <NavLink
        to={"/dashboard/addTask"}
        className={"nav-link"}
  
        onClick={toggleSidebar}
    

        >
            Add task
        </NavLink>
    </div>
  );
};
export default NavLinks;
