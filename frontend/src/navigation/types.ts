export type RootStackParamList = {
  MainTabs: undefined;
  ContestDetails: { contestId: string };
};

export type MainTabParamList = {
  Home: undefined;
  Explore: undefined;
  Create: { capturedUri?: string; mediaType?: 'image' | 'video' } | undefined;
  Competitions: undefined;
  Profile: undefined;
};
