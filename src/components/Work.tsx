import "./styles/Work.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const projects = [
  { 
    name: "Ubiquity", 
    category: "Backend & AI", 
    tools: ".NET Core, C#, MongoDB, REST API, GenAI",
    description: [
      "Developed and enhanced scalable REST APIs using .NET Core, following SOLID Principles, Dependency Injection, and standard Design Patterns.",
      "Optimized MongoDB queries using LINQ and C# driver, improving API response time by 30%.",
      "Leveraged Generative AI, Prompt Engineering, and LLM-based workflows to accelerate solution design, code analysis, debugging, and API documentation.",
      "Performed API debugging, performance tuning, and Unit Testing to ensure application reliability and maintainability."
    ]
  },
  { 
    name: "WSA Financial", 
    category: "Microservices", 
    tools: ".NET Core, C#, WebAPI, LINQ",
    description: [
      "Designed and developed enterprise REST APIs and microservices using .NET Core.",
      "Gained familiarity with equities, fixed income, and derivatives.",
      "Proficient in all aspects of software life cycle like Build/Release/Deploy and CI/CD pipeline.",
      "Attended defect triaging calls and meetings on a daily basis with developers, QAs, SM, and client."
    ]
  },
  { 
    name: "EBC", 
    category: "Web API", 
    tools: ".NET Framework, C#",
    description: [
      "Designed and tested APIs, building them from scratch.",
      "Worked to fix higher and lower environment defects to ensure smooth delivery of the features.",
      "Used Agile development methodology of software development."
    ]
  },
];

const Work = () => {
  useGSAP(() => {
  let translateX: number = 0;

  function setTranslateX() {
    const box = document.getElementsByClassName("work-box");
    const rectLeft = document
      .querySelector(".work-container")!
      .getBoundingClientRect().left;
    const rect = box[0].getBoundingClientRect();
    const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
    let padding: number =
      parseInt(window.getComputedStyle(box[0]).padding) / 2;
    translateX = rect.width * box.length - (rectLeft + parentWidth) + padding;
  }

  setTranslateX();

  let timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".work-section",
      start: "top top",
      end: `+=${translateX}`, // Use actual scroll width
      scrub: true,
      pin: true,
      id: "work",
    },
  });

  timeline.to(".work-flex", {
    x: -translateX,
    ease: "none",
  });

  // Clean up (optional, good practice)
  return () => {
    timeline.kill();
    ScrollTrigger.getById("work")?.kill();
  };
}, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.name}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
                <div className="work-details" style={{ marginTop: "15px" }}>
                  <ul style={{ listStyleType: "disc", paddingLeft: "20px", fontSize: "14px", lineHeight: "1.6", color: "var(--light-gray)" }}>
                    {project.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
