import Layout from "./components/Layout";
import Hero from "./components/Hero";
import About from "./components/About";
import Achievements from "./components/Achievements"; // ⭐ 新增
import Education from "./components/Education";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Contact from "./components/Contact";

// 注意：根据之前的对话，你已经移除了 GitHub，
// 并确认了 Skills 部分的修改。
// Achievements 已经新增。

function App() {
  return (
    <Layout>
      <Hero />
      <About />
      <Achievements />       {/* ⭐ 新增关键成就模块 */}
      <Education />
      <Experience />
      <Skills />
      <Contact />
    </Layout>
  );
}

export default App;
