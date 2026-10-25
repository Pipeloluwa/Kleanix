"use client";
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setNavBg } from '../state_management/reducers/client-reducers/navBgState';
import NavBarComponent from '../components/shared-components/NavBarComponent';
import { FooterComponent } from '../components/shared-components/FooterComponent';
import TopAnnouncementBar from '../components/shared-components/TopAnnouncementBar';
import QuoteModal from '../components/shared-components/QuoteModal';
import LeaveReviewModal from '../components/shared-components/LeaveReviewModal';

const PageContainer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const parentDivRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = parentDivRef.current ? parentDivRef.current.scrollTop : window.scrollY;
      dispatch(setNavBg({ scrollValue: scrollPos }));
    };

    const container = parentDivRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    }
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dispatch]);

  return (
    <div ref={parentDivRef} className="min-h-screen h-screen overflow-y-auto flex flex-col bg-white text-slate-900 scroll-smooth">
      <TopAnnouncementBar />
      <NavBarComponent />
      <main className="flex-1">
        {children}
      </main>
      <FooterComponent />
      <QuoteModal />
      <LeaveReviewModal />
    </div>
  );
};

export default PageContainer;