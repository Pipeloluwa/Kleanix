import HeroComponent from "./components/home-components/HeroComponent";
import TrustFeaturesComponent from "./components/home-components/TrustFeaturesComponent";
import ServicesComponent from "./components/home-components/ServicesComponent";
import ChecklistComparison from "./components/home-components/ChecklistComparison";
import SuburbCoverageChecker from "./components/home-components/SuburbCoverageChecker";
import FaqComponent from "./components/home-components/FaqComponent";
import CtaBanner from "./components/home-components/CtaBanner";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <HeroComponent />
      <TrustFeaturesComponent />
      <ServicesComponent />
      <ChecklistComparison />
      <SuburbCoverageChecker />
      <FaqComponent />
      <CtaBanner />
    </div>
  );
}
