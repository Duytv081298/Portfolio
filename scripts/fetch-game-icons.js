/* eslint-disable */
const fs = require('fs');
const path = require('path');

const STORE_LINKS_PATH = path.join(__dirname, '..', 'src', 'data', 'storeLinks.json');
const GAME_ICONS_PATH = path.join(__dirname, '..', 'src', 'data', 'gameIcons.json');

async function scrapeGooglePlayIcon(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) return null;
    const html = await res.text();
    
    // Look for og:image
    const ogImageMatch = html.match(/<meta[^>]*property="og:image"[^>]*content="([^"]*)"/i);
    if (ogImageMatch && ogImageMatch[1]) {
      let iconUrl = ogImageMatch[1];
      if (iconUrl.includes('googleusercontent.com')) {
        // Strip existing parameters and force a high-res square parameter
        iconUrl = iconUrl.split('=')[0] + '=s256-rw';
      }
      return iconUrl;
    }
  } catch (err) {
    console.error(`Error scraping Google Play icon from ${url}: ${err.message}`);
  }
  return null;
}

async function scrapeAppStoreIcon(url) {
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) return null;
    const html = await res.text();
    
    const matches = html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi) || [];
    for (const match of matches) {
      const content = match.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '').trim();
      try {
        const parsed = JSON.parse(content);
        if (parsed['@type'] === 'SoftwareApplication' && parsed.image) {
          let iconUrl = parsed.image;
          // Clean up size parameters at the end and replace with 256x256
          const parts = iconUrl.split('/');
          if (parts.length > 1) {
            parts[parts.length - 1] = '256x256bb.png';
            iconUrl = parts.join('/');
          }
          return iconUrl;
        }
      } catch (e) {}
    }
  } catch (err) {
    console.error(`Error scraping App Store icon from ${url}: ${err.message}`);
  }
  return null;
}

async function main() {
  console.log('Starting game icons fetcher...');
  if (!fs.existsSync(STORE_LINKS_PATH)) {
    console.error(`Store links file not found at ${STORE_LINKS_PATH}`);
    process.exit(1);
  }
  
  const storeLinks = JSON.parse(fs.readFileSync(STORE_LINKS_PATH, 'utf8'));
  let gameIcons = {};
  if (fs.existsSync(GAME_ICONS_PATH)) {
    try {
      gameIcons = JSON.parse(fs.readFileSync(GAME_ICONS_PATH, 'utf8'));
      console.log(`Loaded ${Object.keys(gameIcons).length} existing icons from cache.`);
    } catch (e) {
      console.log('Could not parse existing cache, starting fresh.');
    }
  }

  const forceUpdate = process.argv.includes('--force') || process.argv.includes('-f');
  if (forceUpdate) {
    console.log('Force update enabled. Re-fetching all icons from stores...');
  }

  const slugs = Object.keys(storeLinks);
  console.log(`Processing ${slugs.length} games...`);

  let updatedCount = 0;
  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    const links = storeLinks[slug];

    // Skip if cached and forceUpdate is disabled
    if (gameIcons[slug] && !forceUpdate) {
      console.log(`[${i + 1}/${slugs.length}] ${slug} already cached.`);
      continue;
    }

    console.log(`[${i + 1}/${slugs.length}] Fetching icon for: ${slug}`);
    let iconUrl = null;

    let googlePlayUrl = links.googlePlay;
    if (googlePlayUrl && !googlePlayUrl.startsWith('http')) {
      googlePlayUrl = `https://play.google.com/store/apps/details?id=${googlePlayUrl}`;
    }

    let appStoreUrl = links.appStore;
    if (appStoreUrl && !appStoreUrl.startsWith('http')) {
      appStoreUrl = `https://apps.apple.com/us/app/id${appStoreUrl}`;
    }

    if (googlePlayUrl) {
      console.log(`Fetching Google Play icon from: ${googlePlayUrl}`);
      iconUrl = await scrapeGooglePlayIcon(googlePlayUrl);
    }
    
    if (!iconUrl && appStoreUrl) {
      console.log(`Google Play failed or absent. Fetching App Store icon from: ${appStoreUrl}`);
      iconUrl = await scrapeAppStoreIcon(appStoreUrl);
    }

    if (iconUrl) {
      console.log(`   -> SUCCESS: ${iconUrl}`);
      gameIcons[slug] = iconUrl;
      updatedCount++;
      // Save every success to avoid losing progress
      fs.writeFileSync(GAME_ICONS_PATH, JSON.stringify(gameIcons, null, 2), 'utf8');
    } else {
      console.log(`   -> FAILED to resolve icon`);
    }

    // Add a slight delay to respect store rate limits
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\nFetch completed. Updated ${updatedCount} icons. Total icons stored: ${Object.keys(gameIcons).length}`);
}

main();
