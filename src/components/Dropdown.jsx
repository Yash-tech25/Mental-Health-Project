import MenuItems from "./MenuItems";


const Dropdown = ({
  submenus,
  dropdown,
  depthLevel
}) => {

  // =========================================================
  // NEXT DEPTH LEVEL
  // =========================================================

  const nextDepthLevel =
    depthLevel + 1;


  // =========================================================
  // NESTED DROPDOWN CLASS
  // =========================================================

  const dropdownClass =
    nextDepthLevel > 1
      ? "dropdown-submenu"
      : "";


  return (

    <ul
      className={
        `dropdown ${dropdownClass} ${
          dropdown
            ? "show"
            : ""
        }`
      }
    >

      {submenus.map(
        (submenu) => (

          <MenuItems
            items={
              submenu
            }
            key={
              `${submenu.title}-${submenu.url || "submenu"}`
            }
            depthLevel={
              nextDepthLevel
            }
          />

        )
      )}

    </ul>

  );

};


export default Dropdown;