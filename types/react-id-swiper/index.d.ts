import React from 'react';

interface IReactIdSwiper {
  // react-id-swiper original parameter
  containerClass?: string;
  wrapperClass?: string;
  children?: any;
  rebuildOnUpdate?: boolean;
  shouldSwiperUpdate?: boolean;
  prevButtonCustomizedClass?: string;
  nextButtonCustomizedClass?: string;
  paginationCustomizedClass?: string;
  scrollbarCustomizedClass?: string;
  activeSlideKey?: string | number;

  // swiper parameter
  init?: boolean;
  initialSlide?: number;
  direction?: string;
  rtl?: boolean;
  speed?: number;
  setWrapperSize?: boolean;
  virtualTranslate?: boolean;
  width?: number;
  height?: number;
  autoHeight?: boolean;
  roundLengths?: boolean;
  nested?: boolean;
  uniqueNavElements?: boolean;
  effect?: string;
  runCallbacksOnInit?: boolean;

  // slides grid
  spaceBetween?: number;
  slidesPerView?: any;
  slidesPerColumn?: number;
  slidesPerColumnFill?: string;
  slidesPerGroup?: number;
  centeredSlides?: boolean;
  slidesOffsetBefore?: number;
  slidesOffsetAfter?: number;
  normalizeSlideIndex?: boolean;

  // grab cursor
  grabCursor?: boolean;

  // touches
  touchEventsTarget?: string;
  touchRatio?: number;
  touchAngle?: number;
  simulateTouch?: boolean;
  shortSwipes?: boolean;
  longSwipes?: boolean;
  longSwipesRatio?: number;
  longSwipesMs?: number;
  followFinger?: boolean;
  allowTouchMove?: boolean;
  threshold?: number;
  touchMoveStopPropagation?: boolean;
  iOSEdgeSwipeDetection?: boolean;
  iOSEdgeSwipeThreshold?: number;
  touchReleaseOnEdges?: boolean;
  passiveListeners?: boolean;

  // touch resistance
  resistance?: boolean;
  resistanceRatio?: number;

  // swiping / no swiping
  allowSlidePrev?: boolean;
  allowSlideNext?: boolean;
  noSwiping?: boolean;
  noSwipingClass?: string;
  swipeHandler?: any;

  // clicks
  preventClicks?: boolean;
  preventClicksPropagation?: boolean;
  slideToClickedSlide?: boolean;

  // freemode
  freeMode?: boolean;
  freeModeMomentum?: boolean;
  freeModeMomentumRatio?: number;
  freeModeMomentumVelocityRatio?: number;
  freeModeMomentumBounce?: boolean;
  freeModeMomentumBounceRatio?: number;
  freeModeMinimumVelocity?: number;
  freeModeSticky?: boolean;

  // progress
  watchSlidesProgress?: boolean;
  watchSlidesVisibility?: boolean;

  // images
  preloadImages?: boolean;
  updateOnImagesReady?: boolean;

  // loop
  loop?: boolean;
  loopAdditionalSlides?: number;
  loopedSlides?: number;
  loopFillGroupWithBlank?: boolean;

  // breakpoints
  breakpoints?: object;

  // observer
  observer?: boolean;
  observeParents?: boolean;

  // namespace
  containerModifierClass?: string;
  slideClass?: string;
  slideActiveClass?: string;
  slideDuplicatedActiveClass?: string;
  slideVisibleClass?: string;
  slideDuplicateClass?: string;
  slideNextClass?: string;
  slideDuplicatedNextClass?: string;
  slidePrevClass?: string;
  slideDuplicatedPrevClass?: string;

  // autoplay
  autoplay?:
    | boolean
    | {
        delay?: number;
        stopOnLast?: boolean;
        disableOnInteraction?: boolean;
      };

  // pagination
  pagination?: {
    el?: string;
    type?: string;
    bulletElement?: string;
    dynamicBullets?: boolean;
    hideOnClick?: boolean;
    clickable?: boolean;
    renderBullet?: (index: number, className: string) => any;
    renderFraction?: () => void;
    renderProgressbar?: () => void;
    renderCustom?: () => void;
    bulletClass?: string;
    bulletActiveClass?: string;
    modifierClass?: string;
    currentClass?: string;
    totalClass?: string;
    hiddenClass?: string;
    progressbarFillClass?: string;
    clickableClass?: string;
  };

  // scrollbar
  scrollbar?: {
    el?: any;
    hide?: boolean;
    draggable?: boolean;
    snapOnRelease?: boolean;
    dragSize?: string | number;
  };

  // navigation
  navigation?: {
    nextEl?: string;
    prevEl?: string;
    hideOnClick?: boolean;
    disabledClass?: string;
    hiddenClass?: string;
  };

  on?: any;
}

declare class ReactIdSwiper extends React.Component<IReactIdSwiper, any> {
  static defaultProps: {
    containerClass: string;
    wrapperClass: string;
    slideClass: string;
  };
  swiper: any;
  constructor();
  componentDidMount(): void;
  componentWillUnmount(): void;
  render(): JSX.Element;
}

export default ReactIdSwiper;
