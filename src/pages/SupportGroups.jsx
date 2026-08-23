// =========================================================
// SUPPORT GROUP PLATFORMS
// =========================================================

const groupPlatforms = [

  {
    title:
      "NAMI Support Groups",

    category:
      "Peer & Family Support",

    image:
      "https://softr-assets-eu-prod.s3.eu-central-1.amazonaws.com/applications/dc9ae6d5-587e-4620-b757-6617e92e3147/assets/66994a18-4bd7-4220-900c-49adedf30c09.gif",

    tags: [
      "Peer Support",
      "Family Support"
    ],

    description:
      "Explore NAMI support groups for people living with mental health conditions as well as family members and loved ones looking for peer connection and shared understanding.",

    link:
      "https://www.nami.org/support-groups/nami-family-support-group/",

    buttonText:
      "Explore NAMI Groups",
  },


  {
    title:
      "HealthUnlocked PTSD Support",

    category:
      "PTSD Community",

    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYeb49KwHtPH-ML61jVV3QTVnYDifSuxTzKpS9SoKpdnxIFdcLGjXSYDer&s=10",

    tags: [
      "PTSD",
      "Online Community"
    ],

    description:
      "An online community focused on PTSD where people can read experiences, ask questions, share thoughts, and connect with others navigating trauma-related challenges.",

    link:
      "https://healthunlocked.com/ptsd-support",

    buttonText:
      "Visit PTSD Community",
  },


  {
    title:
      "TheMindClan Sharing Spaces",

    category:
      "India-Based Communities",

    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVwpa8sGL5J_p8gtWXKfzDrrqWCTTjm28lvI-TfSOIwYeGsCCvXTRbt74&s=10",

    tags: [
      "India",
      "Peer Groups",
      "Inclusive"
    ],

    description:
      "Explore community-led sharing spaces and peer support groups across different experiences, identities, concerns, and formats.",

    link:
      "https://themindclan.com/sharing_spaces/",

    buttonText:
      "Explore Sharing Spaces",
  },


  {
    title:
      "HeyPeers",

    category:
      "Online Peer Support",

    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWtnGn574PG6cUebm5zEAryDLiDrbZGnEWUrZ_-LLi5iRs3aIB97FllLE&s=10",

    tags: [
      "Online",
      "Peer Support"
    ],

    description:
      "Browse online peer-support groups covering different emotional, mental health, and life experiences, with options to connect from wherever you are.",

    link:
      "https://www.heypeers.com/online-support-groups",

    buttonText:
      "Browse Online Groups",
  },


  {
    title:
      "SoulUp Groups",

    category:
      "Group Support",

    image:
      "https://www.happiesthealth.com/wp-content/uploads/2022/07/Support-group-discussion-IS.jpg",

    tags: [
      "Group Support",
      "Multiple Topics"
    ],

    description:
      "Explore group-based support spaces across a variety of emotional and life concerns, designed around conversation, connection, and shared experiences.",

    link:
      "https://www.soulup.in/collections/all-soulup-groups",

    buttonText:
      "Explore SoulUp Groups",
  },

];


const SupportGroups = () => {

  return (

    <section className="support-resource-section">


      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="support-section-heading">

        <div>

          <h2>
            Find a support community
          </h2>


          <p>
            Different platforms host different kinds of peer and group
            support. Explore these directories to find a space that
            matches your experiences, preferences, location, or comfort
            level.
          </p>

        </div>

      </div>


      {/* =====================================================
          SUPPORT PLATFORM SLIDER
      ===================================================== */}

      <div className="support-platform-slider">

        {groupPlatforms.map(
          (platform) => (

            <article
              key={
                platform.title
              }
              className="support-platform-card"
            >


              {/* IMAGE */}

              <div className="support-platform-image">

                <img
                  src={
                    platform.image
                  }
                  alt={
                    `${platform.title} logo or community illustration`
                  }
                  loading="lazy"
                />


                <span className="support-platform-category">
                  {platform.category}
                </span>

              </div>


              {/* CONTENT */}

              <div className="support-platform-content">

                <h3>
                  {platform.title}
                </h3>


                <div className="support-platform-tags">

                  {platform.tags.map(
                    (tag) => (

                      <span
                        key={
                          tag
                        }
                      >
                        {tag}
                      </span>

                    )
                  )}

                </div>


                <p>
                  {platform.description}
                </p>


                <a
                  href={
                    platform.link
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="support-platform-link"
                >

                  {platform.buttonText}


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


export default SupportGroups;