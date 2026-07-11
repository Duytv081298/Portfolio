export interface GameOptimization {
  metric: string;
  before: string;
  after: string;
  unit?: string;
}

export interface Game {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  genre: string;
  engine: string;
  platforms: string[];
  coverColor: string; // gradient color for placeholder
  coverColorSecondary: string;
  description: string;
  architecture: string;
  challenges: string[];
  solutions: string[];
  optimizations: GameOptimization[];
  tags: string[];
  featured: boolean;
  category: 'mobile' | 'playable' | 'instant' | 'web';
  videoUrl?: string;
}

export const games: Game[] = [
  {
    id: '1',
    slug: 'bloom-sort',
    title: 'Bloom Sort',
    subtitle: 'Relaxing flower sorting puzzle',
    genre: 'Puzzle',
    engine: 'Cocos Creator',
    platforms: ['Mobile', 'Playable Ad', 'AppLovin'],
    coverColor: '#FF6B9D',
    coverColorSecondary: '#C44569',
    description:
      'A satisfying flower sorting puzzle game where players arrange blooms by color into matching vases. Features smooth animations, haptic feedback, and progressively challenging levels.',
    architecture:
      'MVC architecture with centralized GameManager, event-driven communication between modules. Uses object pooling for flower instances and asset bundles for level packs.',
    challenges: [
      'Smooth drag & drop with physics-based settling animation',
      'Memory spikes when loading 100+ unique flower textures',
      'Playable Ad version needed to be under 5MB',
    ],
    solutions: [
      'Custom spring physics system with configurable damping and stiffness',
      'Texture atlas with runtime sprite slicing, reducing 100 textures to 4 atlases',
      'Asset compression pipeline: PNG → WebP, audio → low-bitrate MP3, code minification',
    ],
    optimizations: [
      { metric: 'Draw Calls', before: '180', after: '14', unit: '' },
      { metric: 'Memory', before: '145MB', after: '52MB', unit: '' },
      { metric: 'Bundle Size', before: '8.2MB', after: '2.8MB', unit: '' },
      { metric: 'Load Time', before: '4.8s', after: '1.6s', unit: '' },
      { metric: 'FPS', before: '42', after: '60', unit: 'stable' },
    ],
    tags: ['Puzzle', 'Sorting', 'Casual', 'Cocos Creator'],
    featured: true,
    category: 'mobile',
  },
  {
    id: '2',
    slug: 'screw-puzzle',
    title: 'Screw Puzzle: Nuts & Bolts',
    subtitle: 'Satisfying unscrewing mechanics',
    genre: 'Puzzle',
    engine: 'Cocos Creator',
    platforms: ['Mobile', 'Playable Ad', 'AppLovin', 'Google Play'],
    coverColor: '#4DA3FF',
    coverColorSecondary: '#2E86DE',
    description:
      'An engaging puzzle game where players unscrew bolts and organize them by color. Features realistic rotation physics, progressive difficulty, and rewarding completion animations.',
    architecture:
      'Component-based architecture with reusable Screw, Bolt, and Board components. Physics simulation handled by custom 2D rotation system optimized for mobile touch input.',
    challenges: [
      'Realistic screw rotation feel on touch devices',
      'Complex board layouts with overlapping screw paths',
      'Performance drops with 20+ animated screws on low-end devices',
    ],
    solutions: [
      'Custom touch-to-rotation mapping with momentum and friction',
      'Spatial partitioning for collision detection between screw paths',
      'LOD system: simplify animations for off-screen or distant screws',
    ],
    optimizations: [
      { metric: 'Draw Calls', before: '220', after: '18', unit: '' },
      { metric: 'Memory', before: '160MB', after: '58MB', unit: '' },
      { metric: 'Bundle Size', before: '7.5MB', after: '2.9MB', unit: '' },
      { metric: 'Load Time', before: '5.0s', after: '1.8s', unit: '' },
      { metric: 'FPS', before: '35', after: '60', unit: 'stable' },
    ],
    tags: ['Puzzle', 'Physics', 'Casual', 'Cocos Creator'],
    featured: true,
    category: 'mobile',
  },
  {
    id: '3',
    slug: 'coffee-please',
    title: 'Coffee Please',
    subtitle: 'Brew & serve coffee shop simulation',
    genre: 'Hyper Casual',
    engine: 'Cocos Creator',
    platforms: ['Playable Ad', 'AppLovin', 'Mobile'],
    coverColor: '#8B6914',
    coverColorSecondary: '#6F4E37',
    description:
      'A fast-paced coffee shop simulation where players brew, customize, and serve drinks to impatient customers. Time management meets puzzle mechanics.',
    architecture:
      'State machine-driven game flow with customer queue management. Event system for order tracking and scoring. Modular recipe system for easy content updates.',
    challenges: [
      'Managing multiple simultaneous customer orders without UI clutter',
      'Fluid pour animations with dynamic liquid physics',
      'Tight playable ad size constraints (< 3MB)',
    ],
    solutions: [
      'Scrollable queue with priority indicators and visual countdown timers',
      'Bezier curve-based liquid simulation using mesh deformation',
      'Aggressive asset optimization: procedural textures, shared materials',
    ],
    optimizations: [
      { metric: 'Draw Calls', before: '95', after: '12', unit: '' },
      { metric: 'Memory', before: '88MB', after: '34MB', unit: '' },
      { metric: 'Bundle Size', before: '5.1MB', after: '2.4MB', unit: '' },
      { metric: 'Load Time', before: '3.2s', after: '1.2s', unit: '' },
      { metric: 'FPS', before: '48', after: '60', unit: 'stable' },
    ],
    tags: ['Simulation', 'Time Management', 'Hyper Casual', 'Cocos Creator'],
    featured: true,
    category: 'playable',
  },
  {
    id: '4',
    slug: 'fall-guy-legend',
    title: 'Fall Guy Legend',
    subtitle: 'Obstacle course runner',
    genre: 'Hyper Casual',
    engine: 'Cocos Creator',
    platforms: ['Mobile', 'Playable Ad', 'AppLovin'],
    coverColor: '#00F5A0',
    coverColorSecondary: '#00C97B',
    description:
      'A vibrant obstacle course game inspired by battle royale runners. Players navigate through rotating platforms, swinging hammers, and slippery slopes to reach the finish line.',
    architecture:
      'Level-based architecture with procedural obstacle placement. Physics-driven character controller with ragdoll fallback for elimination sequences.',
    challenges: [
      'Smooth character physics on moving/rotating platforms',
      'Ragdoll transitions that feel natural',
      'Maintaining 60fps with complex obstacle animations',
    ],
    solutions: [
      'Kinematic character controller with platform velocity inheritance',
      'Pre-baked ragdoll poses with smooth blending from animated state',
      'GPU instancing for repeated obstacle meshes, culling off-screen elements',
    ],
    optimizations: [
      { metric: 'Draw Calls', before: '150', after: '22', unit: '' },
      { metric: 'Memory', before: '120MB', after: '48MB', unit: '' },
      { metric: 'Bundle Size', before: '6.0MB', after: '1.8MB', unit: '' },
      { metric: 'Load Time', before: '3.8s', after: '1.4s', unit: '' },
      { metric: 'FPS', before: '38', after: '60', unit: 'stable' },
    ],
    tags: ['Runner', 'Obstacle Course', 'Hyper Casual', 'Cocos Creator'],
    featured: true,
    category: 'mobile',
  },
  {
    id: '5',
    slug: 'tidy-master',
    title: 'Tidy Master',
    subtitle: 'Organize & clean satisfying gameplay',
    genre: 'Puzzle',
    engine: 'Cocos Creator',
    platforms: ['Playable Ad', 'AppLovin', 'Web'],
    coverColor: '#7C5CFF',
    coverColorSecondary: '#5A3FD9',
    description:
      'A satisfying cleaning and organization game. Players sort items, clean surfaces, and organize spaces with smooth drag mechanics and ASMR-like completion effects.',
    architecture:
      'Grid-based placement system with snap-to-grid mechanics. Undo/redo stack for player actions. Achievement system with visual progress tracking.',
    challenges: [
      'Natural-feeling item placement with grid snapping',
      'Diverse item shapes requiring flexible grid calculations',
      'Satisfying visual/audio feedback system',
    ],
    solutions: [
      'Weighted grid snapping with proximity-based alignment guides',
      'Polygon-based grid occupation calculation for irregular shapes',
      'Layered particle + screen shake + pitch-shifting audio feedback pipeline',
    ],
    optimizations: [
      { metric: 'Draw Calls', before: '130', after: '16', unit: '' },
      { metric: 'Memory', before: '95MB', after: '42MB', unit: '' },
      { metric: 'Bundle Size', before: '4.5MB', after: '2.1MB', unit: '' },
      { metric: 'Load Time', before: '2.8s', after: '1.1s', unit: '' },
      { metric: 'FPS', before: '50', after: '60', unit: 'stable' },
    ],
    tags: ['Organization', 'Cleaning', 'Puzzle', 'Cocos Creator'],
    featured: false,
    category: 'playable',
  },
  {
    id: '6',
    slug: 'cat-stack',
    title: 'Cat Stack',
    subtitle: 'Stack cute cats as high as you can',
    genre: 'Hyper Casual',
    engine: 'Cocos Creator',
    platforms: ['Playable Ad', 'AppLovin', 'Instant Game'],
    coverColor: '#FF5E7E',
    coverColorSecondary: '#D63657',
    description:
      'A charming stacking game where players balance adorable cats on top of each other. Simple one-tap mechanics with physics-based stacking and cute character designs.',
    architecture:
      'Simple game loop with physics-based stacking. Spine animation integration for cat characters. Score tracking with local leaderboard.',
    challenges: [
      'Precise physics stacking that feels fair to players',
      'Spine animations syncing with physics bodies',
      'Facebook Instant Game API integration',
    ],
    solutions: [
      'Custom physics material with high friction and adjusted restitution',
      'Animation-driven physics body shape updates per frame',
      'Abstracted platform layer for cross-platform deployment',
    ],
    optimizations: [
      { metric: 'Draw Calls', before: '85', after: '11', unit: '' },
      { metric: 'Memory', before: '72MB', after: '28MB', unit: '' },
      { metric: 'Bundle Size', before: '3.8MB', after: '1.5MB', unit: '' },
      { metric: 'Load Time', before: '2.5s', after: '0.9s', unit: '' },
      { metric: 'FPS', before: '55', after: '60', unit: 'stable' },
    ],
    tags: ['Stacking', 'Physics', 'Cute', 'Hyper Casual', 'Cocos Creator'],
    featured: false,
    category: 'instant',
  },
];

export function getGameBySlug(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}

export function getGamesByCategory(category: string): Game[] {
  if (category === 'all') return games;
  return games.filter((g) => g.category === category);
}

export function getFeaturedGames(): Game[] {
  return games.filter((g) => g.featured);
}
