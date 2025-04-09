import { Menu } from "@/components/website/Menu";
import About from "@/components/website/about/About";
import Experience from "@/components/website/experience/Experience";
import Projects from "@/components/website/projects/Projects";
import Header from "@/components/website/Header";

export default function Home() {
  return (
    <>
      <main className="min-h-screen flex flex-col md:flex-row">
        <header className="w-full p-20 md:fixed md:h-screen md:w-[40%] bg-background z-10">
          <Header />
          <nav className="hidden md:block p-8">
            <Menu />
          </nav>
        </header>

        <section className="w-full md:w-[60%] md:ml-[40%] p-4 overflow-y-auto">
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
