import Image from "next/image";
import { StoriesCarousel } from "./components/home/StoriesCarousel";
import { clients } from "../public/home/home";
export default function Home() {
  return (
    <>
      <StoriesCarousel
        clients={clients}
        onStoryClick={(id) => setActiveStory(id)}
      />
      <FeedWithInfiniteScroll
        onNavigate={setActiveSection}
        logo={logo}
        isFeedPaused={activeStory !== null}
      />
    </>
  );
}
