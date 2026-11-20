'use client';
import Image from "next/image";
import { StoriesCarousel } from "./components/home/StoriesCarousel";
import FeedWithInfiniteScroll from "./components/home/FeedWithInfiniteScroll";
import { StoryViewer } from "./components/home/StoryViewer";
import { clients } from "../public/home/home";
import logo from "../public/assets/images/logo.webp";
import { useState } from "react";
import { useEffect } from "react";
export default function Home() {
    const [activeSection, setActiveSection] = useState("home");
     const [activeStory, setActiveStory] = useState(null);
       useEffect(() => {
         window.scrollTo({ top: 0, behavior: "smooth" });
       }, []);
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
       {activeStory !== null && (
        <StoryViewer
          clients={clients}
          activeClientId={activeStory}
          onClose={() => setActiveStory(null)}
        />
      )}
    </>
  );
}
