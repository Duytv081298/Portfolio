export interface PlayableAd {
  id: string;
  slug: string;
  title: string;
  category: 'puzzle' | 'hyper-casual' | 'sorting' | 'screw' | 'simulation';
  htmlFile: string; // filename in the source folder
  publicPath: string; // path served by Next.js from public/
  folderName: string; // original folder name in Demo/Playable
  sdk: string;
  engine: string;
  platform: string;
  coverColor: string;
  coverColorSecondary: string;
}

export const playableAds: PlayableAd[] = [
  { id: '1', slug: 'arrow', title: 'Arrow', category: 'hyper-casual', htmlFile: 'PA125_Knit_Away_Duy_210426_applovin.html', publicPath: '/playable/arrow/index.html', folderName: 'Arrow', sdk: 'AppLovin', engine: 'Cocos Creator', platform: 'Mobile', coverColor: '#FF6B6B', coverColorSecondary: '#C44569' },
  { id: '2', slug: 'ball-away', title: 'Ball Away', category: 'hyper-casual', htmlFile: '', publicPath: '/playable/ball-away/index.html', folderName: 'Ball Away', sdk: 'AppLovin', engine: 'Cocos Creator', platform: 'Mobile', coverColor: '#4ECDC4', coverColorSecondary: '#2EAF7D' },
  { id: '3', slug: 'block-buster', title: 'Block Buster', category: 'puzzle', htmlFile: '', publicPath: '/playable/block-buster/index.html', folderName: 'Block Buster', sdk: 'AppLovin', engine: 'Cocos Creator', platform: 'Mobile', coverColor: '#FFD93D', coverColorSecondary: '#F0A500' },
  { id: '4', slug: 'block-rotate', title: 'Block Rotate', category: 'puzzle', htmlFile: '', publicPath: '/playable/block-rotate/index.html', folderName: 'Block Rotate', sdk: 'AppLovin', engine: 'Cocos Creator', platform: 'Mobile', coverColor: '#6C5CE7', coverColorSecondary: '#4834D4' },
  { id: '5', slug: 'blockhole', title: 'Block Hole', category: 'puzzle', htmlFile: '', publicPath: '/playable/blockhole/index.html', folderName: 'BlockHole', sdk: 'AppLovin', engine: 'Cocos Creator', platform: 'Mobile', coverColor: '#00CEC9', coverColorSecondary: '#00A8A4' },
  { id: '6', slug: 'bloom-sort', title: 'Bloom Sort', category: 'sorting', htmlFile: 'BloomSort_V3_Duy_180725_applovin.html', publicPath: '/playable/bloom-sort/index.html', folderName: 'Bloom Sort', sdk: 'AppLovin', engine: 'Cocos Creator', platform: 'Mobile', coverColor: '#FF6B9D', coverColorSecondary: '#C44569' },
  { id: '7', slug: 'bus-screw', title: 'Bus Screw', category: 'screw', htmlFile: '', publicPath: '/playable/bus-screw/index.html', folderName: 'Bus Screw', sdk: 'AppLovin', engine: 'Cocos Creator', platform: 'Mobile', coverColor: '#FDCB6E', coverColorSecondary: '#E17055' },
  { id: '8', slug: 'cake-sort', title: 'Cake Sort', category: 'sorting', htmlFile: '', publicPath: '/playable/cake-sort/index.html', folderName: 'Cake Sort', sdk: 'AppLovin', engine: 'Cocos Creator', platform: 'Mobile', coverColor: '#E17055', coverColorSecondary: '#D63031' },
  { id: '9', slug: 'car-blast', title: 'Car Blast', category: 'hyper-casual', htmlFile: '', publicPath: '/playable/car-blast/index.html', folderName: 'Car Blast', sdk: 'AppLovin', engine: 'Cocos Creator', platform: 'Mobile', coverColor: '#0984E3', coverColorSecondary: '#0652DD' },
  { id: '10', slug: 'cat-stack', title: 'Cat Stack', category: 'hyper-casual', htmlFile: '', publicPath: '/playable/cat-stack/index.html', folderName: 'Cat Stack', sdk: 'AppLovin', engine: 'Cocos Creator', platform: 'Mobile', coverColor: '#FF5E7E', coverColorSecondary: '#D63657' },
  { id: '11', slug: 'coffee-hole', title: 'Coffee Hole', category: 'hyper-casual', htmlFile: '', publicPath: '/playable/coffee-hole/index.html', folderName: 'Coffee Hole', sdk: 'AppLovin', engine: 'Cocos Creator', platform: 'Mobile', coverColor: '#A0522D', coverColorSecondary: '#6F4E37' },
  { id: '12', slug: 'coffee-please', title: 'Coffee Please', category: 'simulation', htmlFile: 'Coffee_Please_Duy_V12_180325_applovin.html', publicPath: '/playable/coffee-please/index.html', folderName: 'Coffee Please', sdk: 'AppLovin', engine: 'Cocos Creator', platform: 'Mobile', coverColor: '#8B6914', coverColorSecondary: '#6F4E37' },
  { id: '13', slug: 'color-nuts-jam', title: 'Color Nuts Jam', category: 'screw', htmlFile: '', publicPath: '/playable/color-nuts-jam/index.html', folderName: 'Color Nuts Jam', sdk: 'AppLovin', engine: 'Cocos Creator', platform: 'Mobile', coverColor: '#E056A0', coverColorSecondary: '#C44569' },
  { id: '14', slug: 'dreamy-harverst', title: 'Dreamy Harvest', category: 'simulation', htmlFile: '', publicPath: '/playable/dreamy-harverst/index.html', folderName: 'Dreamy Harverst', sdk: 'AppLovin', engine: 'Cocos Creator', platform: 'Mobile', coverColor: '#78E08F', coverColorSecondary: '#38ADA9' },
  { id: '15', slug: 'dreamyroom', title: 'Dreamyroom', category: 'simulation', htmlFile: '', publicPath: '/playable/dreamyroom/index.html', folderName: 'Dreamyroom', sdk: 'AppLovin', engine: 'Cocos Creator', platform: 'Mobile', coverColor: '#B8A9C9', coverColorSecondary: '#8E7CC3' },
  { id: '16', slug: 'drink-sort', title: 'Drink Sort', category: 'sorting', htmlFile: '', publicPath: '/playable/drink-sort/index.html', folderName: 'Drink Sort', sdk: 'AppLovin', engine: 'Cocos Creator', platform: 'Mobile', coverColor: '#74B9FF', coverColorSecondary: '#0984E3' },
  { id: '17', slug: 'fall-guy', title: 'Fall Guy', category: 'hyper-casual', htmlFile: 'Fall_Guy_Legend_Duy_V4_250924_applovin.html', publicPath: '/playable/fall-guy/index.html', folderName: 'Fall Guy', sdk: 'AppLovin', engine: 'Cocos Creator', platform: 'Mobile', coverColor: '#00F5A0', coverColorSecondary: '#00C97B' },
  { id: '18', slug: 'farm-tap', title: 'Farm Tap', category: 'hyper-casual', htmlFile: '', publicPath: '/playable/farm-tap/index.html', folderName: 'Farm Tap', sdk: 'AppLovin', engine: 'Cocos Creator', platform: 'Mobile', coverColor: '#55E6C1', coverColorSecondary: '#1B9CFC' },
  { id: '19', slug: 'foodie-mania', title: 'Foodie Mania', category: 'simulation', htmlFile: '', publicPath: '/playable/foodie-mania/index.html', folderName: 'Foodie Mania', sdk: 'AppLovin', engine: 'Cocos Creator', platform: 'Mobile', coverColor: '#FF6348', coverColorSecondary: '#FF4757' },
  { id: '20', slug: 'goods-frenzy', title: 'Goods Frenzy', category: 'sorting', htmlFile: '', publicPath: '/playable/goods-frenzy/index.html', folderName: 'Goods Frenzy', sdk: 'AppLovin', engine: 'Cocos Creator', platform: 'Mobile', coverColor: '#F8C291', coverColorSecondary: '#E55039' },
  { id: '21', slug: 'helpthem', title: 'Help Them', category: 'puzzle', htmlFile: '', publicPath: '/playable/helpthem/index.html', folderName: 'HelpThem', sdk: 'AppLovin', engine: 'Cocos Creator', platform: 'Mobile', coverColor: '#B71540', coverColorSecondary: '#6F1E51' },
  { id: '22', slug: 'knit-away', title: 'Knit Away', category: 'hyper-casual', htmlFile: '', publicPath: '/playable/knit-away/index.html', folderName: 'Knit Away', sdk: 'AppLovin', engine: 'Cocos Creator', platform: 'Mobile', coverColor: '#A3CB38', coverColorSecondary: '#009432' },
  { id: '23', slug: 'number-match', title: 'Number Match', category: 'puzzle', htmlFile: '', publicPath: '/playable/number-match/index.html', folderName: 'Number Match', sdk: 'AppLovin', engine: 'Cocos Creator', platform: 'Mobile', coverColor: '#4DA3FF', coverColorSecondary: '#2E86DE' },
  { id: '24', slug: 'piggyaway', title: 'Piggy Away', category: 'hyper-casual', htmlFile: '', publicPath: '/playable/piggyaway/index.html', folderName: 'PiggyAway', sdk: 'AppLovin', engine: 'Cocos Creator', platform: 'Mobile', coverColor: '#FDA7DF', coverColorSecondary: '#D980FA' },
  { id: '25', slug: 'satistory', title: 'Satistory', category: 'simulation', htmlFile: '', publicPath: '/playable/satistory/index.html', folderName: 'Satistory', sdk: 'AppLovin', engine: 'Cocos Creator', platform: 'Mobile', coverColor: '#F97F51', coverColorSecondary: '#E55039' },
  { id: '26', slug: 'screw-land', title: 'Screw Land', category: 'screw', htmlFile: '', publicPath: '/playable/screw-land/index.html', folderName: 'Screw Land', sdk: 'AppLovin', engine: 'Cocos Creator', platform: 'Mobile', coverColor: '#3DC1D3', coverColorSecondary: '#006266' },
  { id: '27', slug: 'screw-puzzle', title: 'Screw Puzzle', category: 'screw', htmlFile: '', publicPath: '/playable/screw-puzzle/index.html', folderName: 'Screw Puzzle Nuts and Bolts', sdk: 'AppLovin', engine: 'Cocos Creator', platform: 'Mobile', coverColor: '#4DA3FF', coverColorSecondary: '#2E86DE' },
  { id: '28', slug: 'screw-town', title: 'Screw Town', category: 'screw', htmlFile: '', publicPath: '/playable/screw-town/index.html', folderName: 'Screw Town', sdk: 'AppLovin', engine: 'Cocos Creator', platform: 'Mobile', coverColor: '#7C5CFF', coverColorSecondary: '#5A3FD9' },
  { id: '29', slug: 'tidy-master', title: 'Tidy Master', category: 'puzzle', htmlFile: '', publicPath: '/playable/tidy-master/index.html', folderName: 'Tidy Master', sdk: 'AppLovin', engine: 'Cocos Creator', platform: 'Mobile', coverColor: '#26DE81', coverColorSecondary: '#0FB9B1' },
  { id: '30', slug: 'wordsout', title: 'Words Out', category: 'puzzle', htmlFile: '', publicPath: '/playable/wordsout/index.html', folderName: 'WordsOut', sdk: 'AppLovin', engine: 'Cocos Creator', platform: 'Mobile', coverColor: '#FD79A8', coverColorSecondary: '#E84393' },
];

export const playableCategories = [
  { label: 'All', value: 'all' },
  { label: 'Puzzle', value: 'puzzle' },
  { label: 'Hyper Casual', value: 'hyper-casual' },
  { label: 'Sorting', value: 'sorting' },
  { label: 'Screw', value: 'screw' },
  { label: 'Simulation', value: 'simulation' },
];

export function getPlayablesByCategory(category: string): PlayableAd[] {
  if (category === 'all') return playableAds;
  return playableAds.filter((p) => p.category === category);
}
