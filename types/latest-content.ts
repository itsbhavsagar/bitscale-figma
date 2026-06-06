interface LatestContentSlideTheme {
  backgroundColor: string;
  labelColor: string;
  borderColor: string;
  dotInactiveColor: string;
}

export interface LatestContentSlide {
  id: string;
  title: string;
  description: string;
  postedLabel: string;
  theme: LatestContentSlideTheme;
  thumbnailSrc?: string;
  videoUrl?: string;
}

export interface LatestContentConfig {
  label: string;
  slides: LatestContentSlide[];
  autoRotateMs: number;
}
