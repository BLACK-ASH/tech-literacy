export type Event = {
    id: string;
    title: string;
    description: string;
    image: string;
    time: string;
    type: "solo" | "team"
};

export const eventsData: Event[] = [
    {
        id: "trivia-quiz",
        title: "MindMatrix : The Ultimate Tech Trivia Showdown",
        description:
            "Step into the arena where only the sharpest minds survive. MindMatrix is an adrenaline-fueled tech quiz designed to push your logic, memory, and speed to the edge. From mind-twisting puzzles to cutting-edge tech questions, this battle will test your mastery of software, hardware, AI, programming, cybersecurity, and beyond. Every round gets tougher, every second counts, and only the most brilliant will emerge victorious.",
        image: "trivia-quiz.jpg",
        time: "10:00 AM",
        type: "solo"
    },

    {
        id: "web-dev",
        title: "WebForge : Design & Build Challenge",
        description:
            "Craft. Code. Conquer. WebForge challenges participants to build a stunning, functional, and optimized website within a limited time frame. Creativity meets clean code as you bring a complete digital experience to life. Judges will evaluate UI/UX excellence, performance, responsiveness, innovation, and technical depth. Whether you're a designer or a coder, this is your chance to forge the next big web experience.",
        image: "web-dev.jpg",
        time: "1:00 PM",
        type: "solo"
    },
    {
        id: "debugging",
        title: "BugSlayer : Debugging Gauntlet",
        description:
            "Enter the battlefield of broken code. BugSlayer is a fast-paced debugging challenge that throws real, messy, unpredictable bugs right at you. Participants must dissect faulty logic, optimize slow functions, fix cryptic errors, and stabilize codebases under tight time pressure. It’s a race against time and complexity—where precision, problem-solving, and deep technical insight determine the true champions.",
        image: "debugging.jpg",
        time: "3:30 PM",
        type: "solo"
    },
    {
        id: "hackathon",
        title: "Lakhathon : Sprint to Innovation",
        description:
            "Lakhathon is an intense hackathon where ideas transform into real-world tech solutions. Participants collaborate, brainstorm, code, and build under pressure as they tackle problem statements ranging from AI to social innovation. Expect late-game twists, rapid prototyping, debugging duels, and high-energy teamwork. Only the most resilient and creative minds will claim the final breakthrough.",
        image: "hackathon.jpg",
        time: "2:00 PM",
        type: "team"
    },

    {
        id: "tech-heist",
        title: "Codebreakers : The Great Tech Heist",
        description:
            "A high-stakes treasure hunt where technology meets strategy. Teams must decode clues, solve ciphers, crack hidden patterns, and navigate a network of brain-bending challenges scattered across the campus. Every puzzle solved takes you one step closer to uncovering the final treasure. Speed, teamwork, and intelligence decide who wins—this is not just a hunt, it’s a heist of the mind!",
        image: "tech-heist.jpg",
        time: "11:30 AM",
        type: "team"
    },
];