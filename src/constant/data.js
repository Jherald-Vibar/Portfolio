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
  { label: "Dart", icon: SiDart, color: "#0175C2" },
];

export const PROJECTS = [
  {
    name: "LISAI",
    desc: "Payroll management system with MS Access frontend and MySQL backend via ODBC.",
    tags: ["VBA", "MySQL", "Access"],
  },
  {
    name: "Voyair",
    desc: "Laravel-based flight booking web app with a polished navy/yellow design system.",
    tags: ["Laravel", "Alpine.js", "Tailwind"],
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