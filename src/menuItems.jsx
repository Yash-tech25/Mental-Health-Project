const getMenuItems = () => {

  const menuItems = [

    {
      title: "Home",
      url: "/",
    },

    {
      title: "Resources",
      submenu: [

        {
          title: "Articles",
          url: "/articles",
        },

        {
          title: "Initiatives",
          url: "/initiatives",
        },

      ],
    },

    {
      title: "Well Being",
      submenu: [

        {
          title: "Mood Tracker",
          url: "/mood-tracker",
        },

        {
          title: "Journal",
          url: "/daily-journal",
        },

        {
          title: "Wellness Tracker",
          url: "/wellness-tracker",
        },

        {
          title: "Quiz",
          url: "/quiz",
        },

        {
          title: "Relax",
          url: "/relax",
        },

      ],
    },

    {
      title: "Social",
      submenu: [

        {
          title: "Groups",
          url: "/support-groups",
        },

        {
          title: "Blogs",
          url: "/blogs",
        },

      ],
    },

    

  ];

  return menuItems;

};

export default getMenuItems;