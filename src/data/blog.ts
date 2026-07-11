export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  category: string;
  icon: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Tối ưu Draw Call trong Cocos Creator',
    excerpt:
      'Từ 220 draw calls xuống còn 18. Cách tôi sử dụng texture atlas, batching, và material sharing để giảm 92% draw calls.',
    date: '2024-12-15',
    readTime: '8 min',
    tags: ['Draw Call', 'Cocos Creator', 'Performance'],
    category: 'optimization',
    icon: '🎨',
  },
  {
    id: '2',
    title: 'Playable Ads dưới 5MB: Chiến lược tối ưu',
    excerpt:
      'Quy trình tối ưu từ 8MB xuống 2.9MB: TexturePacker, audio compression, code splitting, và asset pipeline.',
    date: '2024-11-20',
    readTime: '12 min',
    tags: ['Playable Ads', 'Bundle Size', 'Compression'],
    category: 'playable-ads',
    icon: '📦',
  },
  {
    id: '3',
    title: 'Quản lý Memory trong Game Mobile',
    excerpt:
      'Object Pooling, lazy loading, texture compression. Giảm memory từ 160MB xuống 58MB trong production.',
    date: '2024-10-08',
    readTime: '10 min',
    tags: ['Memory', 'Mobile', 'Pooling'],
    category: 'optimization',
    icon: '🧠',
  },
  {
    id: '4',
    title: 'Kiến trúc Game có thể mở rộng',
    excerpt:
      'MVC, ECS, và Event-Driven architecture. Cách thiết kế game system dễ maintain và scale cho hàng trăm level.',
    date: '2024-09-12',
    readTime: '15 min',
    tags: ['Architecture', 'Design Pattern', 'MVC'],
    category: 'architecture',
    icon: '🏗️',
  },
  {
    id: '5',
    title: 'Shader Optimization cho Mobile Game',
    excerpt:
      'Giảm GPU overdraw, simplify shader variants, và texture sampling optimization cho thiết bị low-end.',
    date: '2024-08-25',
    readTime: '9 min',
    tags: ['Shader', 'GPU', 'Mobile'],
    category: 'optimization',
    icon: '✨',
  },
  {
    id: '6',
    title: 'Object Pooling Pattern trong Game',
    excerpt:
      'Triển khai generic object pool với TypeScript. Loại bỏ hoàn toàn GC spike trong gameplay loop.',
    date: '2024-07-18',
    readTime: '7 min',
    tags: ['Pooling', 'TypeScript', 'Pattern'],
    category: 'architecture',
    icon: '♻️',
  },
];
