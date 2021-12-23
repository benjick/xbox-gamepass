export interface ReviewSummary {
  completed: boolean;
}

export interface MastheadScreenshot {
  fullRes: string;
  thumbnail: string;
}

export interface BannerScreenshot {
  fullRes: string;
}

export interface Rating {
  value: string;
  imageSrc: string;
}

export interface Screenshot {
  fullRes: string;
  thumbnail: string;
}

export interface Trailer {
  title: string;
  videoId: string;
  channelId: string;
  description: string;
  externalUrl: string;
  channelTitle: string;
  publishedDate: Date;
  youtubeVideoId: string;
}

export interface MonetizationFeatures {
  hasLootBoxes: boolean;
}

export interface Company {
  name: string;
  type: string;
}

export interface Platform {
  id: number;
  name: string;
  shortName: string;
  imageSrc: string;
  releaseDate: Date;
  displayRelease?: any;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Affiliate {
  externalUrl: string;
  name: string;
}

export interface OpenCriticGame {
  reviewSummary: ReviewSummary;
  mastheadScreenshot: MastheadScreenshot;
  bannerScreenshot: BannerScreenshot;
  Rating: Rating;
  newsSearchEnabled: boolean;
  isFeatured: boolean;
  type: string;
  Skus: string[];
  percentRecommended: number;
  numReviews: number;
  numTopCriticReviews: number;
  numUserReviews: number;
  medianScore: number;
  averageScore: number;
  topCriticScore: number;
  percentile: number;
  tier: string;
  hasLootBoxes?: any;
  isMajorTitle: boolean;
  name: string;
  description: string;
  screenshots: Screenshot[];
  trailers: Trailer[];
  twitchName?: any;
  embargoDate: Date;
  steamId: string;
  monetizationFeatures: MonetizationFeatures;
  Companies: Company[];
  Platforms: Platform[];
  Genres: Genre[];
  Affiliates: Affiliate[];
  id: number;
  firstReleaseDate: Date;
  createdAt: Date;
  updatedAt: Date;
  firstReviewDate: Date;
  latestReviewDate: Date;
}
