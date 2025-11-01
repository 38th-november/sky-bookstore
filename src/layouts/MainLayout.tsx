import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import "../styles/global.scss";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="layout">
      <Header />
      <Content>{children}</Content>
      <Footer />
    </div>
  );
}
