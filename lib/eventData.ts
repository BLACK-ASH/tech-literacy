export type Event = {
  id: string;
  title: string;
  description: string;
  details: string;
  maxMembers?: number;
  image: string;
  time: string;
  duration: string;
  type: "solo" | "team";
  bgColor: string;
};

export const colorMap: Record<string, string> = {
  orange: "bg-orange-500",
  sky: "bg-sky-500",
  purple: "bg-purple-700",
  green: "bg-green-700",
  teal: "bg-teal-600",
};


export const eventsData: Event[] = [
  {
    id: "trivia-quiz",
    title: "MindMatrix : The Ultimate Tech Trivia Showdown",
    description:
      "A fast-paced tech quiz where only the sharpest minds survive.",
    details:
      "MindMatrix challenges participants with rapid-fire questions from programming, AI, hardware, networking, cybersecurity, and real-world tech scenarios. Each round increases in difficulty, pushing participants' logic, speed, and accuracy. Only the most knowledgeable and quick-thinking contestants advance to the final showdown.",
    image: "/trivia-quiz.webp",
    time: "10:00 AM",
    duration: "2 hours",
    type: "solo",
    bgColor: "orange",
  },

  {
    id: "web-dev",
    title: "WebForge : Design & Build Challenge",
    description:
      "Build a clean, creative, and functional website under time pressure.",
    details:
      "WebForge tests both design and development skills as participants create a complete web experience within a limited timeframe. Judging is based on UI/UX quality, responsiveness, performance, accessibility, code structure, and originality. Competitors must combine aesthetics with technical precision to stand out.",
    maxMembers: 3,
    image: "/web-dev.jpg",
    time: "1:00 PM",
    duration: "2 hours",
    type: "team",
    bgColor: "sky",
  },

  {
    id: "debugging",
    title: "BugSlayer : Debugging Gauntlet",
    description:
      "Find and fix real-world bugs in the fastest time possible.",
    details:
      "BugSlayer throws participants into messy, unpredictable codebases filled with logical errors, broken functions, edge-case failures, and performance issues. Participants must identify the root cause quickly, implement fixes efficiently, and ensure stability. This event evaluates analytical thinking, coding expertise, and debugging accuracy under pressure.",
    image: "/debugging.png",
    time: "3:30 PM",
    duration: "2 hours",
    type: "solo",
    bgColor: "purple",
  },

  {
    id: "hackathon",
    title: "Lakhathon : Sprint to Innovation",
    description:
      "A rapid-fire hackathon where teams turn ideas into real solutions.",
    details:
      "Lakhathon pushes teams to brainstorm, prototype, and develop impactful solutions within a short time window. Participants work collaboratively through ideation, UI/UX planning, coding, debugging, and final presentation. Projects can span AI, web apps, automation tools, social innovation, or unique problem statements. Creativity, teamwork, and execution determine the winners.",
    maxMembers: 3,
    image: "/hackathon.avif",
    time: "2:00 PM",
    duration: "2 hours",
    type: "team",
    bgColor: "green",
  },

  {
    id: "tech-heist",
    title: "Codebreakers : The Great Tech Heist",
    description:
      "A strategic treasure hunt filled with puzzles, clues, and tech-based challenges.",
    details:
      "Codebreakers is a campus-wide treasure hunt where teams solve encrypted clues, decode ciphers, break patterns, and complete mini challenges at each checkpoint. Tasks involve logic, observation, teamwork, and problem-solving. Each correct clue pushes the team closer to the final treasure, making it a thrilling mix of strategy and speed.",
    maxMembers: 3,
    image: "/tech-heist.jpg",
    time: "11:30 AM",
    duration: "2 hours",
    type: "team",
    bgColor: "teal",
  },
];
