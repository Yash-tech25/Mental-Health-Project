import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

const MenuItems = ({ items, depthLevel }) => {

  const [dropdown, setDropdown] = useState(false);

  const ref = useRef();


  useEffect(() => {

    const handler = (event) => {

      if (
        dropdown &&
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        setDropdown(false);
      }

    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {

      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);

    };

  }, [dropdown]);


  const onMouseEnter = () => {

    if (window.innerWidth > 960) {
      setDropdown(true);
    }

  };


  const onMouseLeave = () => {

    if (window.innerWidth > 960) {
      setDropdown(false);
    }

  };


  // ==========================================
  // NORMAL LINK
  // ==========================================

  if (!items.submenu) {

    return (

      <li
        className="menu-items"
        ref={ref}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >

        <Link
          to={items.url}
          onClick={() => setDropdown(false)}
        >
          {items.title}
        </Link>

      </li>

    );

  }


  // ==========================================
  // MENU WITH SUBMENU
  // ==========================================

  return (

    <li
      className="menu-items"
      ref={ref}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >

      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={dropdown}
        onClick={() =>
          setDropdown((previous) => !previous)
        }
      >

        {items.title}

        {depthLevel > 0 ? (
          <span>&raquo;</span>
        ) : (
          <span className="arrow" />
        )}

      </button>


      <Dropdown
        depthLevel={depthLevel}
        submenus={items.submenu}
        dropdown={dropdown}
      />

    </li>

  );

};

export default MenuItems;