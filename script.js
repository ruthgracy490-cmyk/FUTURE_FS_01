const { useMemo, useState } = React;

const profile = {
  name: "Bollam Ruth",
  role: "Full Stack Web Developer",
  email: "ruthgracy490@gmail.com",
  phone: "+91 91823 62398",
  location: "Gollaprolu, Andhra Pradesh",
  address: "Karamangari Thota, near BhaskarRao Hospital, Gollaprolu",
  summary:
    "Computer Science diploma student with hands-on full stack web development experience, building responsive interfaces, backend functionality, and database-driven applications.",
};

const resumeDownloadHref = "/data/Bollam-Ruth-Resume.txt";

const skills = [
  ["Java", "I use Java for object-oriented programming, problem solving, and building a strong software development foundation."],
  ["Python", "I work with Python for clear logic, scripting, learning AI concepts, and solving programming challenges."],
  ["C/C++", "I understand core programming concepts, memory-aware logic, and structured problem solving through C and C++."],
  ["JavaScript", "I build interactive browser experiences, form flows, dynamic UI states, and responsive frontend features."],
  ["React", "I create reusable UI components and organize portfolio or application screens into maintainable sections."],
  ["SQL", "I design and query relational data for projects that need records, users, updates, and structured information."],
];

const skillCategories = [
  {
    title: "Languages",
    icon: "💻",
    tags: ["C++", "Python", "C", "Java", "C#", "JavaScript"],
    featured: "JavaScript",
  },
  {
    title: "AI / ML",
    icon: "🧠",
    tags: ["Machine Learning", "Deep Learning", "Data Science", "Azure AI", "Python ML"],
    featured: "Machine Learning",
  },
  {
    title: "Web / Full Stack",
    icon: "🌐",
    tags: ["React", "Node.js", "Express", "MongoDB", "MERN Stack"],
    featured: "React",
  },
  {
    title: "Cloud & DevOps",
    icon: "☁️",
    tags: ["AWS", "Azure", "Solutions Architecture", "Cloud Fundamentals"],
    featured: "AWS",
  },
  {
    title: "Databases",
    icon: "🗄️",
    tags: ["Microsoft SQL Server", "MongoDB"],
    featured: "MongoDB",
  },
  {
    title: "Core Competencies",
    icon: "🛠️",
    tags: ["DSA (C++)", "Debugging", "Problem Solving", "Collaboration"],
    featured: "DSA (C++)",
  },
];

const projects = [
  {
    title: "Smart City Development",
    type: "Civic Tech",
    mark: "SC",
    color: "#98e8d5",
    description:
      "Tracked and monitored city resources and activities such as traffic, infrastructure, and public services to help enable smarter city planning and operation.",
    tags: ["HTML", "CSS", "JavaScript", "Local Database"],
  },
  {
    title: "Alumni Management System",
    type: "Web App",
    mark: "AM",
    color: "#ffadc6",
    description:
      "A web platform connecting alumni, students, and administrators with alumni registration, profile management, event updates, job postings, and communication features.",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap", "PHP", "Node.js", "MySQL"],
  },
  {
    title: "EduLearn",
    type: "Education",
    mark: "EL",
    color: "#c9b8ff",
    description:
      "An online education courses platform with course browsing, enrollment, user authentication, progress tracking, and course management for students and instructors.",
    tags: ["HTML", "CSS", "JavaScript", "SQL"],
  },
];

const resume = {
  Experience: [
    ["Nov 2024 - May 2025", "Full Stack Web Development - Technical Hub", "Developed responsive web applications using HTML, CSS, JavaScript, React.js, Node.js, and MySQL. Built user-friendly interfaces and backend functionality for seamless application performance."],
  ],
  Education: [
    ["Aug 2022 - May 2025", "Aditya Engineering College", "Computer Science and Engineering Diploma, Surampalem. Percentage: 97%."],
    ["June - May", "Madhuri Vidyalaya (EM) High School", "Completed Class 10 in Gollaprolu with 96%."],
  ],
  Certifications: [
    ["2025", "Full Stack Development Certification - Technical Hub", "Completed practical full stack development training with frontend, backend, and database technologies."],
    ["2025", "Project Certificate - Coursera", "Completed project-based learning and strengthened applied development skills."],
    ["2025", "HTML & CSS Certification - Certiport Pearson", "Certified in building structured and styled web pages."],
    ["2025", "Enterprise Design Thinking Practitioner - IBM SkillsBuild", "Learned user-centered thinking for solving practical product and service problems."],
    ["2025", "NPTEL Programming in Java - Skill India", "Completed Java programming coursework through NPTEL and Skill India."],
    ["2025", "NPTEL Quantum Computing - Skill India", "Explored quantum computing foundations through NPTEL and Skill India."],
    ["2025", "Hackathon - Savishkar and ABVP", "Participated in hackathon-style problem solving and project development."],
    ["2025", "SQL Intermediate - HackerRank", "Certified in intermediate SQL querying and relational database concepts."],
    ["2025", "LLM for Young Developers - FutureSkills Prime", "Learned foundations of large language models and modern AI development."],
    ["2025", "Frontlines Edutech Pvt Ltd - ISO", "Completed industry-oriented certification training."],
    ["2025", "1M1B Green Skills Academy - Salesforce", "Completed green skills learning through 1M1B and Salesforce."],
    ["2025", "AI Skills Passport - EY", "Completed AI skills learning through EY."],
    ["2025", "AI and Environmental Stability - EY", "Studied the connection between AI learning and environmental sustainability."],
  ],
  "Honors & Awards": [
    ["Branch Rank 281", "ECET Rank", "Achieved branch rank 281 in ECET."],
    ["Selected", "Wipro Sim Scholar", "Selected as a Wipro Sim Scholar through a multi-stage evaluation process."],
  ],
};

function App() {
  const [filter, setFilter] = useState("All");
  const [tab, setTab] = useState("Experience");
  const [status, setStatus] = useState("");

  const visibleProjects = useMemo(() => {
    return filter === "All" ? projects : projects.filter((project) => project.type === filter);
  }, [filter]);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("Sending your message...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("API unavailable");
      form.reset();
      setStatus("Message sent. Thank you for reaching out.");
    } catch (error) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${data.name}`);
      const body = encodeURIComponent(`${data.message}\n\nFrom: ${data.name}\nEmail: ${data.email}`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus("Opening your email app as a fallback.");
    }
  }

  return (
    <main className="site-shell">
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href="#home" aria-label={`${profile.name} home`}>
          <span className="brand-mark">{profile.name.slice(0, 1)}</span>
          <span>B.Ruth</span>
        </a>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
        <a className="primary-button nav-cta" href="#contact">Contact</a>
      </nav>

      <header className="hero" id="home">
        <span className="orb orb-one"></span>
        <span className="orb orb-two"></span>
        <span className="orb orb-three"></span>
        <span className="orb orb-four"></span>
        <section className="hero-content">
          <h1>
            <span className="script-name">{profile.name}</span>
            <span className="role-line">{profile.role}</span>
          </h1>
          <p className="hero-copy">
            Aspiring Software Developer and Full-Stack Web Developer with strong problem-solving skills, practical project experience, and a proven track record of academic excellence and technical certifications. Eager to contribute to innovative software solutions and grow as a technology professional.
          </p>
          <div className="social-row" aria-label="Social profiles">
            <span>Find me on</span>
          <a href="https://www.hackerrank.com/profile/25A35A0501" target="_blank" rel="noreferrer" aria-label="HackerRank">
            <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2 3.5 6.9v10.2L12 22l8.5-4.9V6.9L12 2Zm3.1 15h-2.2v-4H11.1v4H8.9V7h2.2v3.9h1.8V7h2.2v10Z" />
            </svg>
          </a>
          <a href="https://leetcode.com/u/25A35A0501/" target="_blank" rel="noreferrer" aria-label="LeetCode">
            <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M14.2 3.2a1.35 1.35 0 0 1 1.9 1.9l-8.4 8.4 3.2 3.2a3.2 3.2 0 0 0 4.5 0l1.1-1.1a1.34 1.34 0 0 1 1.9 1.9l-1.1 1.1a5.87 5.87 0 0 1-8.3 0l-4.2-4.2a3.9 3.9 0 0 1 0-5.5l9.4-9.7Zm-3.4 8.1h8.3a1.25 1.25 0 0 1 0 2.5h-8.3a1.25 1.25 0 0 1 0-2.5Z" />
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/ruth-bollam-1061ab2a6/" target="_blank" rel="noreferrer" aria-label="LinkedIn">In</a>
          <a href="https://github.com/ruthgracy490-cmyk" target="_blank" rel="noreferrer" aria-label="GitHub">
            <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2C6.48 2 2 6.58 2 12.24c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.56 2.35 1.11 2.92.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.71 0 0 .84-.28 2.75 1.05A9.27 9.27 0 0 1 12 6.98c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.4.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9v2.77c0 .27.18.59.69.49A10.11 10.11 0 0 0 22 12.24C22 6.58 17.52 2 12 2Z" />
            </svg>
          </a>
          </div>
          <div className="hero-actions">
            <a className="primary-button" href="#contact">Hire me</a>
            <a className="secondary-button" href="#education">Resume</a>
          </div>
        </section>

        <aside className="profile-card" aria-label="Portfolio visual">
          <div className="human-illustration" aria-hidden="true">
            <span className="human-hair"></span>
            <span className="human-head"></span>
            <span className="human-neck"></span>
            <span className="human-body"></span>
            <span className="human-arm human-arm-left"></span>
            <span className="human-arm human-arm-right"></span>
          </div>
          <div className="profile-summary">
            <h2>{profile.name}</h2>
            <p>CSE</p>
            <p className="speciality-line">B.Tech</p>
          </div>
        </aside>
      </header>

      <section className="section" id="about">
        <div className="section-heading">
          <h2>About</h2>
          {/* <p>Hands-on full stack experience, practical problem solving, and strong academic performance.</p> */}
        </div>
        <div className="about-card">
          <p>
            I am a passionate Full-Stack Web Developer with a strong foundation in software development, web technologies, and problem solving. I build responsive, user-friendly web applications with HTML, CSS, JavaScript, React.js, Node.js, and SQL, and I enjoy turning practical ideas into polished digital experiences.
          </p>
          <br></br>
          <p>
            I am committed to continuous learning through certifications, projects, and teamwork. I focus on creating maintainable solutions, solving challenges efficiently, and delivering value in every project.
          </p>
          <br></br>
          {/* <p> From developing educational platforms and alumni management systems to working on smart city solutions, I have gained practical experience across the full software development lifecycle.

I believe that technology has the power to transform ideas into impactful solutions. Whether it's developing responsive web applications, optimizing databases, or learning emerging technologies such as AI and cloud platforms, I am always eager to take on new challenges and expand my knowledge.

Currently, I am seeking opportunities where I can contribute my technical skills, collaborate with talented teams, and continue growing as a software developer while creating meaningful and innovative products.</p>
         <br></br> */}
          <p>
            Email: <a className="about-email" href={`mailto:${profile.email}`}>{profile.email}</a>
          </p>
        </div>
      </section>

      <section className="section alt" id="skills">
        <div className="section-heading">
          <h2>Skills</h2>
          {/* <p>These are the programming languages, frameworks, and database skills I use to build practical applications.</p> */}
        </div>
        <div className="skills-grid">
          {skillCategories.map(({ title, icon, tags, featured }) => (
            <article className="skill-card" key={title}>
              <div className="skill-card-header">
                <span className="skill-icon">{icon}</span>
                <div>
                  <h3>{title}</h3>
                </div>
              </div>
              <div className="skill-tags">
                {tags.map((tag) => (
                  <span key={tag} className={`skill-tag ${tag === featured ? "featured" : ""}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="resume">
        <div className="section-heading">
          <h2>Projects</h2>
          {/* <p>Selected academic and training projects that show frontend development, backend thinking, and database usage.</p> */}
        </div>
        <div className="portfolio-filters" role="tablist" aria-label="Project filters">
          {["All", "Civic Tech", "Web App", "Education"].map((item) => (
            <button
              className={`filter-button ${filter === item ? "active" : ""}`}
              type="button"
              onClick={() => setFilter(item)}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="projects-grid">
          {visibleProjects.map((project) => (
            <article className="project-card" key={project.title}>
              <div className="project-media" style={{ "--project-color": project.color }}>
                {project.mark}
              </div>
              <div className="project-content">
                <p className="eyebrow">{project.type}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <ul className="tag-list">
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="education">
        <div className="section-heading">
          <h2>Education Journey</h2>
          <a className="secondary-button" href={resumeDownloadHref} download="Bollam-Ruth-Resume.txt">
            Download Resume
          </a>
          {/* <p>Track the education, certifications, experience, and honors that shaped my full stack development path.</p> */}
        </div>
        <div className="resume-layout">
          <aside className="resume-panel">
            <div className="resume-tabs" role="tablist" aria-label="Education sections">
              {Object.keys(resume).map((item) => (
                <button
                  className={`tab-button ${tab === item ? "active" : ""}`}
                  type="button"
                  onClick={() => setTab(item)}
                  key={item}
                >
                  {item}
                </button>
              ))}
            </div>
          </aside>
          <div className="timeline">
            {resume[tab].map(([year, title, detail]) => (
              <article className="timeline-item" key={`${year}-${title}`}>
                <time>{year}</time>
                <h3>{title}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section alt" id="contact">
        <div className="section-heading">
          <h2>Contact</h2>
          {/* <p>Have an internship opportunity, project idea, or collaboration request? Send the details and I will get back to you.</p> */}
        </div>
        <div className="contact-layout">
          <aside className="contact-panel">
            <h3>Why Contact Me?</h3>
            <p>{profile.summary}</p>
            <ul className="contact-list">
              <li><span>Email</span><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
              <li><span>Phone</span><a href={`tel:${profile.phone.replaceAll(" ", "")}`}>{profile.phone}</a></li>
              <li><span>Location</span>{profile.location}</li>
              <li><span>Address</span>{profile.address}</li>
            </ul>
          </aside>
          <form className="contact-panel contact-form" onSubmit={handleSubmit}>
            <div className="field-grid">
              <label>
                Name
                <input name="name" autoComplete="name" required />
              </label>
              <label>
                Email
                <input type="email" name="email" autoComplete="email" required />
              </label>
            </div>
            <label>
              Subject
              <input name="subject" required />
            </label>
            <label>
              Message
              <textarea name="message" required></textarea>
            </label>
            <button className="primary-button" type="submit">Send Message</button>
            <p className="form-status" role="status">{status}</p>
          </form>
        </div>
      </section>

      <footer className="footer">
        <span>(c) {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
        <a href="#home">Back to top</a>
      </footer>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
