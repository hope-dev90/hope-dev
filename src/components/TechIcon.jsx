import {
  FaNodeJs,
  FaJava,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaPhp,
  FaDocker,
  FaGitAlt,
  FaLinux,
  FaNetworkWired,
  FaShieldAlt,
  FaAws,
  FaGithub,
} from "react-icons/fa";
import {
  SiTypescript,
  SiSpringboot,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiKubernetes,
  SiTypo3,
} from "react-icons/si";
import { VscServerProcess } from "react-icons/vsc";
import { TbInfinity } from "react-icons/tb";

const map = {
  node:         { Icon: FaNodeJs,        color: "#3c873a" },
  typescript:   { Icon: SiTypescript,    color: "#3178c6" },
  java:         { Icon: FaJava,          color: "#e76f00" },
  spring:       { Icon: SiSpringboot,    color: "#6db33f" },
  react:        { Icon: FaReact,         color: "#61dafb" },
  express:      { Icon: SiExpress,       color: "#1b2a4a" },
  postgresql:   { Icon: SiPostgresql,    color: "#336791" },
  mongodb:      { Icon: SiMongodb,       color: "#47a248" },
  html:         { Icon: FaHtml5,         color: "#e34f26" },
  css:          { Icon: FaCss3Alt,       color: "#264de4" },
  php:          { Icon: FaPhp,           color: "#777bb4" },
  typo3:        { Icon: SiTypo3,         color: "#ff8700" },
  docker:       { Icon: FaDocker,        color: "#2496ed" },
  kubernetes:   { Icon: SiKubernetes,    color: "#326ce5" },
  cicd:         { Icon: TbInfinity,      color: "#e8622c" },
  git:          { Icon: FaGitAlt,        color: "#f05032" },
  linux:        { Icon: FaLinux,         color: "#111111" },
  networking:   { Icon: FaNetworkWired,  color: "#1b2a4a" },
  cybersecurity:{ Icon: FaShieldAlt,     color: "#1b2a4a" },
  aws:          { Icon: FaAws,           color: "#ff9900" },
  github:       { Icon: FaGithub,        color: "#111111" },
  network:      { Icon: FaNetworkWired,  color: "#1b2a4a" },
  shield:       { Icon: FaShieldAlt,     color: "#1b2a4a" },
  server:       { Icon: VscServerProcess,color: "#1b2a4a" },
};

export default function TechIcon({ name, size = 28, className = "" }) {
  const entry = map[name] || { Icon: FaReact, color: "#1b2a4a" };
  const { Icon, color } = entry;
  return <Icon size={size} color={color} className={className} />;
}
