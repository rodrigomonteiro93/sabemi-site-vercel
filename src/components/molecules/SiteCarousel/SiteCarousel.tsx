'use client';

import { useRef, useState, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper';
import type { SwiperOptions } from 'swiper/types';
import 'swiper/css';
import styles from './SiteCarousel.module.css';

const CHEVRON_LEFT = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const CHEVRON_RIGHT = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export interface SiteCarouselProps {
  slides: React.ReactNode[];
  className?: string;
  swiperClassName?: string;
  slideClassName?: string;
  prevButtonClassName?: string;
  nextButtonClassName?: string;
  prevLabel?: string;
  nextLabel?: string;
  iconSize?: 16 | 18;
  spaceBetween?: number;
  slidesPerView?: number;
  breakpoints?: SwiperOptions['breakpoints'];
  loop?: boolean;
  centeredSlides?: boolean;
}

export default function SiteCarousel({
  slides,
  className,
  swiperClassName,
  slideClassName,
  prevButtonClassName,
  nextButtonClassName,
  prevLabel = 'Anterior',
  nextLabel = 'Próximo',
  iconSize = 18,
  spaceBetween = 22,
  slidesPerView = 1,
  breakpoints,
  loop = false,
  centeredSlides = false,
}: SiteCarouselProps) {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [navState, setNavState] = useState({ prev: true, next: false });

  const updateNav = useCallback((swiper: SwiperInstance) => {
    setNavState({
      prev: loop ? false : swiper.isBeginning,
      next: loop ? false : swiper.isEnd,
    });
  }, [loop]);

  const icons = iconSize === 16
    ? {
        left: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        ),
        right: (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        ),
      }
    : { left: CHEVRON_LEFT, right: CHEVRON_RIGHT };

  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      <button
        type="button"
        className={[prevButtonClassName, navState.prev && styles.navDisabled].filter(Boolean).join(' ')}
        aria-label={prevLabel}
        disabled={navState.prev}
        onClick={() => swiperRef.current?.slidePrev()}
      >
        {icons.left}
      </button>

      <Swiper
        className={[styles.swiper, swiperClassName].filter(Boolean).join(' ')}
        modules={[A11y]}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        breakpoints={breakpoints}
        loop={loop}
        centeredSlides={centeredSlides}
        watchOverflow
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          updateNav(swiper);
        }}
        onSlideChange={updateNav}
        onBreakpoint={updateNav}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className={[styles.slide, slideClassName].filter(Boolean).join(' ')}>
            {slide}
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        className={[nextButtonClassName, navState.next && styles.navDisabled].filter(Boolean).join(' ')}
        aria-label={nextLabel}
        disabled={navState.next}
        onClick={() => swiperRef.current?.slideNext()}
      >
        {icons.right}
      </button>
    </div>
  );
}
