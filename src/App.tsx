import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { ProofBar } from "./components/ProofBar";
import { SelectedWork } from "./components/SelectedWork";
import { Built } from "./components/Built";
import { Story } from "./components/Story";
import { Toolkit } from "./components/Toolkit";
import { Contact } from "./components/Contact";
import { Reveal } from "./components/Reveal";

export default function App() {
  return (
    <div id="top">
      <Nav />
      <Hero />
      <Reveal><ProofBar /></Reveal>
      <Reveal><Built /></Reveal>
      <Reveal><SelectedWork /></Reveal>
      <Reveal><Story /></Reveal>
      <Reveal><Toolkit /></Reveal>
      <Reveal><Contact /></Reveal>
    </div>
  );
}
