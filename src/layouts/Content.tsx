import type { ReactNode } from "react";
import "../styles/content.scss";

interface ContentProps {
  children: ReactNode;
}

export default function Content({ children }: ContentProps) {
  return <main className="content">{children}</main>;
}
