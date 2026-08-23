const SupportGroups2 = () => {

  const organisations = [

    {
      title:
        "PeakMind",

      category:
        "Mental Wellness",

      description:
        "Explore mental wellness resources and ways to connect with support focused on emotional well-being and personal development.",

      link:
        "https://www.peakmind.in/contact",

      image:
        "https://uploads-ssl.webflow.com/6239d45df8c8f750082d66ea/62fba161f8884c2e80b96b7b_PEAKMINDLOGONEWres2-p-500.png",
    },


    {
      title:
        "Mpower",

      category:
        "Mental Health Services",

      description:
        "Explore professional mental health services, awareness initiatives, and resources across different areas of emotional well-being.",

      link:
        "https://mpowerminds.com/contact",

      image:
        "https://mpowerminds.com/assets/img/root/Mpower%20Logo-04.svg",
    },


    {
      title:
        "Kashmir Lifeline",

      category:
        "Emotional Support",

      description:
        "Explore mental health and emotional well-being resources and ways to connect with psychological support.",

      link:
        "https://www.kashmirlifeline.org/contact.php",

      image:
        "https://www.kashmirlifeline.org/static/img/logos/logo-kll.png",
    },


    {
      title:
        "Parivarthan",

      category:
        "Counselling Support",

      description:
        "Explore counselling and mental health resources designed to provide emotional support for individuals and families.",

      link:
        "https://parivarthan.org/contact/",

      image:
        "https://parivarthan.org/wp-content/uploads/2020/03/parivarthan-gray-logo.png",
    },


    {
      title:
        "Arpan",

      category:
        "Community Support",

      description:
        "Explore community-oriented mental health resources and group-based spaces for connection and emotional support.",

      link:
        "https://www.arpan.org.in/whatsapp-groups/",

      image:
        "https://www.arpan.org.in/wp-content/uploads/2019/04/Arpan-English-Logo-cc-e1584098567989.jpg",
    },

  ];


  return (

    <section
      className="
        support-resource-section
        support-organisations
      "
    >

      <div className="support-section-heading">

        <span></span>

        <div>

          <h2>
            Looking for broader support?
          </h2>

          <p>
            These organisations offer mental health resources,
            counselling information, community programs, or ways
            to connect with additional support.
          </p>

        </div>

      </div>


      <div className="groups-slider">

        {organisations.map(
          (organisation) => (

            <article
              key={
                organisation.title
              }
              className="
                groups-card
                organisation-card
              "
            >

              <div
                className="
                  groups-card-image
                  organisation-logo
                "
              >

                <img
                  src={
                    organisation.image
                  }
                  alt={
                    `${organisation.title} logo`
                  }
                  loading="lazy"
                />

                <span className="groups-card-category">
                  {organisation.category}
                </span>

              </div>


              <div className="groups-card-content">

                <h3>
                  {organisation.title}
                </h3>


                <p>
                  {organisation.description}
                </p>


                <a
                  href={
                    organisation.link
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="groups-card-link"
                >

                  Visit organisation

                  <span aria-hidden="true">
                    →
                  </span>

                </a>

              </div>

            </article>

          )
        )}

      </div>

    </section>

  );

};


export default SupportGroups2;