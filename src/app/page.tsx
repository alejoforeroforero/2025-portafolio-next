import { Menu } from "@/components/website/Menu";
import About from "@/components/website/about/About";
import Experience from "@/components/website/experience/Experience";
import Projects from "@/components/website/projects/Projects";
import Header from "@/components/website/Header";

export default function Home() {
  return (
    <>
      <main className="min-h-screen flex flex-col md:flex-row">
        <header className="w-full pt-20 pl-25 md:fixed md:h-screen md:w-[38%] bg-background z-10">
          <Header />
          <nav className="hidden md:block p-8">
            <Menu />
          </nav>
        </header>

        <section className="w-full md:w-[56%] md:ml-[38%] pt-10 overflow-y-auto mb-40">
          <div id="about">
            <About />
          </div>
          <div id="experience" className="border-t border-b border-gray-800 py-8 my-8">
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
