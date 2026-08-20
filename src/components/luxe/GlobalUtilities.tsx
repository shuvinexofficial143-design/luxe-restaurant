import StructuredData from "./StructuredData";
import RouteAnnouncer from "./RouteAnnouncer";
import ConsentBanner from "./ConsentBanner";
import PerformanceHints from "./PerformanceHints";

export default function GlobalUtilities() {
  return (
    <>
      <PerformanceHints />
      <StructuredData />
      <RouteAnnouncer />
      <ConsentBanner />
    </>
  );
}
