"use client";
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setNavBg } from '../state_management/reducers/client-reducers/navBgState';
import NavBarComponent from '../components/shared-components/NavBarComponent';
import { FooterComponent } from '../components/shared-components/FooterComponent';
import TopAnnouncementBar from '../components/shared-components/TopAnnouncementBar';
import QuoteModal from '../components/shared-components/QuoteModal';

const PageContainer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      dispatch(setNavBg({ scrollValue: window.scrollY }));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 scroll-smooth">
      <TopAnnouncementBar />
      <NavBarComponent />
      <main className="flex-1">
        {children}
      </main>
      <FooterComponent />
      <QuoteModal />
    </div>
  );
};

export default PageContainer;
