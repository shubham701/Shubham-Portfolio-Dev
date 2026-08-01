import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in Computer Sci. & Engineering</h4>
                <h5>GLA University</h5>
              </div>
              <h3>2019</h3>
            </div>
            <p>
              Graduated with a Bachelor of Technology in Computer Science & Engineering. Learned the fundamentals of programming, software engineering, and database management.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Associate Consultant</h4>
                <h5>Capgemini</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Built and enhanced scalable backend services for Morgan Stanley using .NET Core, C#, REST APIs, and CI/CD pipelines within an Agile delivery environment.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Engineer</h4>
                <h5>Optum</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Developing and maintaining scalable .NET Core APIs supporting enterprise healthcare applications. Leveraging Generative AI and LLM workflows to accelerate solution design and improve productivity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
