import type { UnwrapRef } from 'vue';
import type useEmblaCarousel from 'embla-carousel-vue';
import type {
  EmblaCarouselVueType,
} from 'embla-carousel-vue';

type CarouselApi = EmblaCarouselVueType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

export type UnwrapRefCarouselApi = UnwrapRef<CarouselApi>;

export interface CarouselProps {
  /** Embla Carousel options, such as loop or align. */
  opts?: CarouselOptions;
  /** Embla Carousel plugins, such as autoplay. */
  plugins?: CarouselPlugin;
  /** Scroll axis of the carousel; also sets which arrow keys navigate it. */
  orientation?: 'horizontal' | 'vertical';
}

export interface CarouselEmits {
  /** Emitted on mount with the Embla Carousel API instance. */
  'init-api': [payload: UnwrapRefCarouselApi];
}
