import Navbar from "./Navbar";
import Contact from "./Contact/Contact";
import Footer from "./Contact/Footer";
export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Contact />
      <Footer />
    </>
  );
}
