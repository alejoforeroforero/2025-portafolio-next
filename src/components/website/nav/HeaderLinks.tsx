import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

const HeaderLinks = () => {
  return (
    <div className="mt-auto pb-8">
      <div className="w-1/2 mx-auto flex justify-evenly">
        <a
          href="https://www.linkedin.com/in/alejoforeroforero"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="text-[25px] text-[#979595] hover:text-[#ff6347] transition-colors duration-[2000ms]" />
        </a>
        <a
          href="https://www.github.com/alejoforeroforero"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="text-[25px] text-[#979595] hover:text-[#ff6347] transition-colors duration-[2000ms]" />
        </a>
        <a
          href="https://www.instagram.com/alejoforeroforero"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="text-[25px] text-[#979595] hover:text-[#ff6347] transition-colors duration-[2000ms]" />
        </a>
      </div>
      <div className="w-1/2 mx-auto mt-8 flex justify-evenly">
        <a 
          href="/resume.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm"
        >
          View My Resume
        </a>
      </div>
    </div>
  );
};

export default HeaderLinks;
