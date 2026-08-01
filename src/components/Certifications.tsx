import "./styles/Certifications.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaMicrosoft, FaCode, FaCodeBranch, FaBrain, FaLinkedin } from "react-icons/fa6";

gsap.registerPlugin(useGSAP);

const certifications = [
  {
    title: "Az-900 Azure Cloud Computing Fundamental",
    subtitle: "Microsoft Certified",
    icon: <FaMicrosoft />,
    color: "#00a4ef",
  },
  {
    title: "Optum AI Dojo Certified",
    subtitle: "LLM-based solution design, and enterprise AI use cases.",
    icon: <FaBrain />,
    color: "#ff6b6b",
  },
  {
    title: "Advanced Prompt Engineering",
    subtitle: "LinkedIn Learning",
    icon: <FaLinkedin />,
    color: "#0a66c2",
  },
  {
    title: "Object-Oriented & Microservices Architecture",
    subtitle: "Proficient in object-oriented programming, both monolithic and microservices.",
    icon: <FaCode />,
    color: "#c2a4ff",
  },
  {
    title: "Version Control",
    subtitle: "Skilled in using version control tools like Git.",
    icon: <FaCodeBranch />,
    color: "#f1502f",
  }
];

const Certifications = () => {
  useGSAP(() => {
    gsap.from(".cert-card", {
      scrollTrigger: {
        trigger: ".certifications-section",
        start: "top 70%",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    });
  });

  return (
    <div className="certifications-section" id="certifications">
      <h2>Achievement/<span>Certificates</span></h2>
      <div className="cert-container">
        {certifications.map((cert, index) => (
          <div className="cert-card" key={index}>
            <div className="cert-icon" style={{ color: cert.color }}>
              {cert.icon}
            </div>
            <div className="cert-content">
              <h3>{cert.title}</h3>
              <p>{cert.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certifications;
