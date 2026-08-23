import { Link } from "react-router-dom";


const mentalIllnesses = [

  {
    id: 1,

    title:
      "Anxiety Disorder",

    description:
      "A mental health disorder characterized by excessive worry and fear.",

    image:
      "https://www.calmclinic.com/storage/images/213/qoxihx/main/w1600.png",

    link:
      "/anxiety",
  },


  {
    id: 2,

    title:
      "Depression",

    description:
      "A common and serious medical illness that negatively affects how you feel, the way you think and how you act.",

    image:
      "https://t3.ftcdn.net/jpg/04/11/89/90/360_F_411899029_ObkcYwrNRmrmIDl44lhfWV7NRQtqjQDx.jpg",

    link:
      "/depression",
  },


  {
    id: 3,

    title:
      "Obsessive-Compulsive Disorder",

    description:
      "A common, chronic, and long-lasting disorder involving recurring thoughts and repetitive behaviors.",

    image:
      "https://media.istockphoto.com/id/2183990898/vector/woman-with-ocd-syndrome-clutches-head-for-fear-of-contracting-infection-due-to-hygiene.jpg?s=612x612&w=0&k=20&c=ooSfEjYWQodK9HHoXYf75IGabdqV4LcPsrQmNQaSxp8=",

    link:
      "/ocd",
  },


  {
    id: 4,

    title:
      "Panic Disorder",

    description:
      "A condition involving sudden episodes of intense fear that may trigger strong physical reactions.",

    image:
      "https://images.prismic.io/cerebral/42857718-d8da-4e17-8a20-b8d1fdd31158_Panic%20Attacks.png?ixlib=gatsbyFP&auto=compress%2Cformat&fit=max&w=3420&h=1897",

    link:
      "/panicdisorder",
  },


  {
    id: 5,

    title:
      "Bipolar Disorder",

    description:
      "A mood disorder involving significant changes in mood, energy, activity levels, and concentration.",

    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPcGLdRM1yXyiPCTN6KMDsypH7FHMnrlX1Lw&usqp=CAU",

    link:
      "/bipolar-article",
  },


  {
    id: 6,

    title:
      "Schizophrenia",

    description:
      "A serious mental health condition that can affect how a person thinks, feels, and behaves.",

    image:
      "https://www.health.com/thmb/sMXUhpkvLq2h7VEBwdjnOH1vHIQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Health-Schizophrenia-Overview-PaigeMcLaughlin-Final-e784ef4214264c8ea708309a09c4901e.jpg",

    link:
      "/schizophrenia",
  },


  {
    id: 7,

    title:
      "Post-Traumatic Stress Disorder",

    description:
      "A mental health condition that can develop after experiencing or witnessing a traumatic event.",

    image:
      "https://d2jx2rerrg6sh3.cloudfront.net/images/Article_Images/ImageForArticle_7061_1662009165227664.jpg",

    link:
      "/ptsd",
  },


  {
    id: 8,

    title:
      "Psychosis",

    description:
      "A condition in which a person may experience difficulty distinguishing between what is real and what is not.",

    image:
      "https://t4.ftcdn.net/jpg/20/24/25/69/360_F_2024256976_IwKA7cqi7eZZlnE8zKqTvYc2WXb97sBQ.jpg",

    link:
      "/psychosis",
  },

];


const Articles = () => {

  return (

    <div className="carousel">

      {mentalIllnesses.map(
        (illness) => (

          <article
            className="carousel-item"
            key={
              illness.id
            }
          >


            {/* =========================================
                IMAGE
            ========================================= */}

            {illness.image ? (

              <img
                src={
                  illness.image
                }
                alt={
                  illness.title
                }
                loading="lazy"
              />

            ) : (

              <div
                className="article-image-placeholder"
                aria-hidden="true"
              >
                🧠
              </div>

            )}


            {/* =========================================
                TITLE
            ========================================= */}

            <h2>
              {illness.title}
            </h2>


            {/* =========================================
                DESCRIPTION
            ========================================= */}

            <p>
              {illness.description}
            </p>


            {/* =========================================
                LINK
            ========================================= */}

            <Link
              to={
                illness.link
              }
              className="read-more"
            >
              Read More
            </Link>

          </article>

        )
      )}

    </div>

  );

};


export default Articles;