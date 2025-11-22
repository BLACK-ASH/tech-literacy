import ThemeToggle from "@/components/theme-toggle";

const Footer = () => {
  return (
    <footer className="flex items-center justify-between px-4 py-2 border-t-2">
      {/* <p className="font-bold text-pretty text-primary text-xl md:text-2xl">
        Blackash -Tech
      </p> */}
      <div className="hover:underline text-sm md:text-base">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/BLACK-ASH/"
        >
          © 2024 Blackash . All rights reserved.
        </a>
      </div>
      <ThemeToggle />
    </footer>
  );
};

export default Footer;
