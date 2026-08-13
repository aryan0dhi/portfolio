import About from "@/components/About";
import Contact from "@/components/Contact";
import FeaturedVaila from "@/components/FeaturedVaila";
import Nav from "@/components/Nav";
import Now from "@/components/Now";
import SectionProgress from "@/components/SectionProgress";
import SignalJourney from "@/components/SignalJourney";
import Skills from "@/components/Skills";
import SectionWithDivider from "@/components/SectionWithDivider";
import WorkExplorer from "@/components/WorkExplorer";

export default function Home() {
  return (
    <main>
      <Nav />
      <SectionProgress />
      <SignalJourney>
        <SectionWithDivider>
          <FeaturedVaila />
        </SectionWithDivider>
        <SectionWithDivider>
          <WorkExplorer />
        </SectionWithDivider>
        <SectionWithDivider>
          <Skills />
        </SectionWithDivider>
        <SectionWithDivider>
          <About />
        </SectionWithDivider>
        <SectionWithDivider>
          <Now />
        </SectionWithDivider>
        <SectionWithDivider hideDivider>
          <Contact />
        </SectionWithDivider>
      </SignalJourney>
    </main>
  );
}
