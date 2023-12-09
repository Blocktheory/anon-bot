import { Header } from "../../ui_components/shared";
import HomePage from "../../ui_components/home/HomePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anon bot - Home",
  description: "Anon bot",
};

export default function Home() {
  return (
    <div className="h-full">
      <Header />
      <HomePage />
    </div>
  );
}
