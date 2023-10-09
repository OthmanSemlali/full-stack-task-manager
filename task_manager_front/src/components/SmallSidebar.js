import { FaTimes } from "react-icons/fa";
import NavLinks from "./NavLinks";
import Wrapper from "../assets/wrappers/SmallSidebar";
import { useUIContext } from "../context/UIContext";
// import Logo from "./Logo";

const SmallSidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useUIContext();

  return (
    <Wrapper>
      <div
        className={
          isSidebarOpen ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
          {/* <Logo /> */}
          Tasky.
          </header>
          <NavLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </Wrapper>
  );
};
export default SmallSidebar;
