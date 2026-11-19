"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Toaster } from "sonner";

import { Sidebar } from "../../dashboard/Sidebar";
import { MobileHeader } from "../common/mobile/MobileHeader";
import { MobileBottomNav } from "../common/mobile/MobileBottomNav";
import { RightPanel } from "../../components/home/RightPanel";
import { ChatbotWidget } from "../common/ChatbotWidget";
import { CommonSectionModal } from "../commonSection/CommonSectionModal";
import { AutoSeo } from "../../components/ui/AutoSeo";
import PageLoader from "../../components/ui/Pageloader";
import JsonLd from "../../components/JsonLd";
// import { websiteSchema } from "../seo/websiteSchema";
// import { localBusinessSchema } from "../seo/localBusinessSchema";
// import { organizationSchema } from "../seo/organizationSchema";
import { upcomingEvents, caseStudies, awards } from "../../../public/home/home";

// section name -> URL
const ROUTES = {
  home: "/",
  profile: "/profile",
  events: "/events",
  digital: "/digital",
  exhibition: "/exhibition",
  activation: "/activation",
  presence: "/presence",
  terms: "/terms",
  dataprivacy: "/dataprivacy",
  privacypolicy: "/privacypolicy",
  about: "/about",
  casestudies: "/casestudies",
  awards: "/awards",
  messages: "/messages",
};

// lets any page call onNavigate without prop drilling
const NavContext = createContext(() => {});
export const useNav = () => useContext(NavContext);

export default function AppShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const [moreModalOpen, setMoreModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // active section comes from the URL now
  const activeSection = pathname === "/" ? "home" : pathname.slice(1);
  const hideRightPanel = pathname !== "/";

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 770);
      setIsTablet(window.innerWidth < 1160);
    };
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // hide the loader once the new route has rendered
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, [pathname]);

  const handleNavigate = (section) => {
    const href = ROUTES[section];
    if (!href || href === pathname) return;
    setLoading(true);
    window.scrollTo({ top: 0, behavior: "auto" });
    router.push(href);
  };

  return (
    <NavContext.Provider value={handleNavigate}>
      <div className="bg-background min-h-screen">
        <AutoSeo />
        {loading && <PageLoader />}

        {isMobile && (
          <MobileHeader
            onMessageClick={() => handleNavigate("messages")}
            onLogoClick={() => handleNavigate("home")}
            onNavigate={handleNavigate}
          />
        )}

        {!isMobile ? (
          <Sidebar
            activeSection={activeSection}
            onNavigate={(section) => {
              if (section === "messages") {
                setChatOpen(true);
                return;
              }
              handleNavigate(section);
            }}
            onMoreClick={() => setMoreModalOpen(true)}
          />
        ) : (
          <MobileBottomNav
            activeSection={activeSection}
            onNavigate={handleNavigate}
          />
        )}

        <div
          className={`flex items-start min-h-screen ${
            isMobile ? "ml-0" : "ml-[72px]"
          }`}
        >
          {!isMobile && !isTablet && <div className="flex-[4] min-w-0" />}

          <main
            className={`min-w-0 ${
              isMobile || isTablet ? "flex-1" : "flex-[0_0_630px] w-[630px]"
            } ${isMobile ? "pt-14 pb-20" : "pt-0 pb-0"}`}
          >
            <div className="pb-8">{children}</div>
          </main>

          {!isMobile && !isTablet && <div className="flex-[0.5] min-w-0" />}

          {!isTablet && (
            <div className={hideRightPanel ? "invisible" : "visible"}>
              <RightPanel
                events={upcomingEvents}
                caseStudies={caseStudies}
                awards={awards}
                onNavigate={handleNavigate}
              />
            </div>
          )}

          {!isMobile && !isTablet && <div className="flex-[5] min-w-0" />}
        </div>

        <CommonSectionModal
          isOpen={moreModalOpen}
          onClose={() => setMoreModalOpen(false)}
          onNavigate={handleNavigate}
        />

        {!isMobile && (
          <ChatbotWidget isOpen={chatOpen} onClose={() => setChatOpen(false)} />
        )}

        <Toaster position="bottom-center" richColors />
        {/* <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <JsonLd data={localBusinessSchema} /> */}
      </div>
    </NavContext.Provider>
  );
}