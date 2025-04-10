import { Menu } from "@/components/website/nav/Menu";
import About from "@/components/website/about/About";
import Experience from "@/components/website/experience/Experience";
import Projects from "@/components/website/projects/Projects";
import Header from "@/components/website/nav/Header";
import HeaderLinks from "@/components/website/nav/HeaderLinks";

export default function Home() {
  return (
    <>
      <main className="min-h-screen flex flex-col lg:flex-row">
        <header className="w-full pt-10 pb-2 lg:pt-20 lg:pb-30 lg:fixed lg:h-screen lg:w-[38%] bg-background z-10 flex flex-col">
          <div className="p-8 lg:pl-25">
            <Header />
          </div>
          <nav className="hidden lg:block p-8 pl-30">
            <Menu />
          </nav>
          <HeaderLinks />
        </header>

        <section className="w-full lg:w-[56%] lg:ml-[38%] pt-0 lg:pt-10 overflow-y-auto mb-40">
          <div id="about">
            <h2 className="text-2xl font-bold mb-6 px-8 lg:hidden">About</h2>
            <About />
          </div>
          <div
            id="experience"
            className="border-t border-b border-gray-800 py-8 my-8"
          >
            <h2 className="text-2xl font-bold mb-6 px-8 lg:hidden">Experience</h2>
            <Experience />
          </div>
          <div id="projects">
            <h2 className="text-2xl font-bold mb-6 px-8 lg:hidden">Projects</h2>
            <Projects />
          </div>
        </section>
      </main>
    </>
  );
}
