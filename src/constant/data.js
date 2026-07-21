import {
  SiLaravel,
  SiFlutter,
  SiMysql,
  SiReact,
  SiPhp,
  SiDart,
  SiDocker,
  SiHtml5,
  SiJavascript,
  SiCss,
} from "react-icons/si";
import { FaMicrosoft } from "react-icons/fa";
import Sibol1 from '../assets/ProjectImages/Sibol/Sibol-1.png';
import Sibol2 from '../assets/ProjectImages/Sibol/Sibol-2.png';
import Sibol3 from '../assets/ProjectImages/Sibol/Sibol-3.png';
import Sibol4 from '../assets/ProjectImages/Sibol/Sibol-4.png';
import Sibol5 from '../assets/ProjectImages/Sibol/Sibol-5.png';
import Sibol6 from '../assets/ProjectImages/Sibol/Sibol-6.png';
import Sibol7 from '../assets/ProjectImages/Sibol/Sibol-7.png';
import TaskFlow1 from '../assets/ProjectImages/TaskFlow/taskflow-1.png';
import TaskFlow2 from '../assets/ProjectImages/TaskFlow/taskflow-2.png';
import TaskFlow3 from '../assets/ProjectImages/TaskFlow/taskflow-3.png';
import TaskFlow4 from '../assets/ProjectImages/TaskFlow/taskflow-4.png';
import TaskFlow5 from '../assets/ProjectImages/TaskFlow/taskflow-5.png';
import TaskFlow6 from '../assets/ProjectImages/TaskFlow/taskflow-6.png';
import TaskFlow7 from '../assets/ProjectImages/TaskFlow/taskflow-7.png';
import TaskFlow8 from '../assets/ProjectImages/TaskFlow/taskflow-8.png';
import TaskFlow9 from '../assets/ProjectImages/TaskFlow/taskflow-9.png';
import TaskFlow10 from '../assets/ProjectImages/TaskFlow/taskflow-10.png';
import TaskFlow11 from '../assets/ProjectImages/TaskFlow/taskflow-11.png';
import Voyair1 from '../assets/ProjectImages/Voyair/Voyair-1.png';
import Voyair2 from '../assets/ProjectImages/Voyair/Voyair-2.png';
import Voyair3 from '../assets/ProjectImages/Voyair/Voyair-3.png';
import Voyair4 from '../assets/ProjectImages/Voyair/Voyair-4.png';
import Voyair5 from '../assets/ProjectImages/Voyair/Voyair-5.png';
import Voyair6 from '../assets/ProjectImages/Voyair/Voyair-6.png';
import Voyair7 from '../assets/ProjectImages/Voyair/Voyair-7.png';
import Voyair8 from '../assets/ProjectImages/Voyair/Voyair-8.png';
import Voyair9 from '../assets/ProjectImages/Voyair/Voyair-9.png';
import Voyair10 from '../assets/ProjectImages/Voyair/Voyair-10.png';

export const SKILLS = [
  { label: "Laravel", icon: SiLaravel, color: "#FF2D20" },
  { label: "Flutter", icon: SiFlutter, color: "#02569B" },
  { label: "MySQL", icon: SiMysql, color: "#4479A1" },
  { label: "React", icon: SiReact, color: "#61DAFB" },
  { label: "Dart", icon: SiDart, color: "#0175C2" },
  { label: "HTML5", icon: SiHtml5, color: "#E34F26" },
  { label: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { label: "CSS", icon: SiCss, color: "#663399" },
  { label: "VBA / Access", icon: FaMicrosoft, color: "#A4373A" },
  { label: "Docker", icon: SiDocker, color: "#2496ED" },
  { label: "PHP", icon: SiPhp, color: "#777BB4" },
];

export const PROJECTS = [
  {
    name: "SIBOL",
    desc: "An IoT Web for smart gardening it used YoloV11 model for machine learning. It use Laravel for backend and React for Frontend",
    tags: ["React JS", "Laravel", "Python"],
    link: "https://sibol-frontend.onrender.com/",
    role: "Full Stack Developer",
    images: [Sibol1, Sibol2, Sibol3, Sibol4, Sibol5, Sibol6, Sibol7],
  },
  {
    name: "TaskFlow",
    desc: "Jira Like to do List with Drag and Drop and also use Google Auth for easy authentication.",
    tags: ["Vanilla Javascript", "Laravel", ],
    link: "https://taskflow-z40g.onrender.com/login",
    role: "Full Stack Developer",
    images: [TaskFlow1, TaskFlow2, TaskFlow3, TaskFlow4, TaskFlow5, TaskFlow6, TaskFlow7, TaskFlow8, TaskFlow9, TaskFlow10, TaskFlow11],
  },
  {
    name: "Voyair",
    desc: "Laravel-based flight booking web app with a polished navy/yellow design system.",
    tags: ["Laravel", "Alpine.js", "Tailwind"],
    role: "Full Stack Developer",
    images: [Voyair1, Voyair2, Voyair3, Voyair4, Voyair5, Voyair6, Voyair7, Voyair8, Voyair9, Voyair10],
  },
  {
    name: "Sentry",
    desc: "Flutter face recognition attendance kiosk with SQLite/Supabase sync architecture.",
    tags: ["Flutter", "Dart", "Supabase"],
  },
  {
    name: "Dine Touch",
    desc: "Restaurant kiosk app with full discount system compliant with RA 9994 & RA 9442.",
    tags: ["Flutter", "Dart"],
  },
];


export const EXPERIENCE = [
  {
    year: 2022,
    role: "Developer",
    note: "Developer at ITSA Organization at School, also doing Freelance Projects."
  },
  {
    year: 2023,
    role: "Head Developer at ITSA Org",
    note: "Creating a attendance and voting system for our school.",
  },
  {
    year: 2024, 
    role: "Assistance Developer",
    note: "Maintaining and updating the system for our school."
  }, 
  {
    year: 2025, 
    role: "Full Stack Dev/Database Dev at LISAI as INTERN",
    note: "Creating A Web, and make their legacy system much more faster by making the access query as pass through so that the formula and most select queries will do in server.",
  },
  {
    year: 2026,
    role: "MS Access Dev/Database Dev at LISAI as Part Time",
    note: "Fixing all the bugs in the system and make it much more faster."
  }
]

