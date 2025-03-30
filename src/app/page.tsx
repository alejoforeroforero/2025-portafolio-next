import { Menu } from "@/components/website/Menu";
import About from "@/components/website/About";
import Experience from "@/components/website/Experience";
import Projects from "@/components/website/Projects";
import Header from "@/components/website/Header";

export default function Home() {
  return (
    <>
      <main className="min-h-screen flex flex-col md:flex-row">
        <header className="w-full md:fixed md:h-screen md:w-[30%] bg-background border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-800 z-10">
          <Header />
          <nav className="hidden md:block">
            <Menu />
          </nav>
        </header>

        <section className="w-full md:w-[70%] md:ml-[30%] p-4 overflow-y-auto">
          <div id="about">
            <About />
          </div>
          <div id="experience">
            <Experience />
          </div>
          <div id="projects">
            <Projects />
          </div>
        </section>
      </main>
    </>
  );
}
