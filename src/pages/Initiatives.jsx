
import MentalHealthInitiative from "./MentalHealthInitiative";

const initiatives = [
  {
    title: "National Mental Health Programme (NMHP)",
    text: "Launched by the Government of India to address the inadequacy of mental health care infrastructure in the country. It aims to ensure the availability and accessibility of essential mental health care, particularly for vulnerable sections of the population.",
    image:
      "https://cdn.pixabay.com/photo/2022/10/18/11/02/mood-7529903_640.png",
    link:
      "https://nhm.gov.in/index1.php?lang=1&level=2&sublinkid=1043&lid=359",
  },

  {
    title: "MINDS Foundation",
    text: "Aims to destigmatize mental health and provide access to high-quality and cost-effective mental health care. It works through education, accessible care, continuous research, and the development of effective intervention programs.",
    image:
      "https://cdn.pixabay.com/photo/2022/10/18/11/02/woman-7529904_640.png",
    link: "https://www.mindsfoundation.org/",
  },

  {
    title: "Sangath",
    text: "Focuses on mental health development across children, adolescents, youth, and adults. Through research and community-based initiatives, Sangath develops effective solutions and collaborates with government services to improve access to mental health care.",
    image:
      "https://cdn.pixabay.com/photo/2022/08/17/20/00/psychotherapy-7393379_640.png",
    link: "https://sangath.in/",
  },

  {
    title: "The Banyan",
    text: "Provides housing, mental health care, and opportunities for homeless people living with mental health conditions to reconnect with their families and communities. Through its programs, the organization also works to make mental health services more accessible.",
    image:
      "https://cdn.pixabay.com/photo/2022/10/18/11/02/mood-7529905_1280.png",
    link: "https://thebanyan.org/",
  },

  {
    title: "Time to Change",
    text: "A UK-based initiative focused on challenging mental health stigma and discrimination. It has worked with people with lived experience, workplaces, and schools to encourage open conversations and improve understanding of mental health.",
    image:
      "https://cdn.pixabay.com/photo/2022/08/19/17/51/brain-7397412_1280.png",
    link: "https://www.time-to-change.org.uk/",
  },

  {
    title: "The Black Dog Institute",
    text: "Works to improve mental health and wellbeing through research, education, and evidence-based programs. Its workplace initiatives help organizations build supportive environments and improve awareness and understanding of mental health.",
    image:
      "https://cdn.pixabay.com/photo/2018/04/25/22/49/cranium-3350798_640.png",
    link:
      "https://www.blackdoginstitute.org.au/education-services/workplaces/",
  },
];

const Initiatives = () => {
  return (
    <div className="initiatives-container">

      <div className="initiatives-heading">
        <span className="initiatives-heading-label">
          RESOURCES
        </span>

        <h1>Mental Health Initiatives</h1>

        <p>
          Explore organizations and programs working to improve mental
          health awareness, accessibility, support, and wellbeing around
          the world.
        </p>
      </div>

      <div className="initiatives-list">
        {initiatives.map((initiative, index) => (
          <MentalHealthInitiative
            key={initiative.title}
            title={initiative.title}
            text={initiative.text}
            image={initiative.image}
            alt={`${initiative.title} illustration`}
            link={initiative.link}
            reverse={index % 2 !== 0}
          />
        ))}
      </div>

    </div>
  );
};

export default Initiatives;