import fs from 'fs';
import path from 'path';
import 'dotenv/config';

async function generateSitemap() {
  const gasUrl = process.env.VITE_GAS_API_URL;
  let baseUrl = "https://example.com"; 

  console.log("Generating sitemap...");

  if (gasUrl && !gasUrl.includes("ganti_dengan_id")) {
    try {
      console.log("Fetching settings from Google Apps Script...");
      const res = await fetch(`${gasUrl}?action=get_settings`);
      const json = await res.json();
      
      if (json.status === "success" && json.data) {
        if (json.data["URL Website"]) {
          baseUrl = json.data["URL Website"].replace(/\/$/, ""); // Remove trailing slash
          console.log(`Found URL Website in GAS: ${baseUrl}`);
        } else {
          console.log("URL Website not found in GAS settings, using fallback.");
        }
      }
    } catch (error) {
      console.error("Failed to fetch settings from GAS for sitemap generation. Using fallback URL.", error);
    }
  } else {
    console.log("VITE_GAS_API_URL is missing or placeholder. Using fallback URL.");
  }

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/profil</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/berita</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/guru</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/fasilitas</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/ppdb</loc>
    <changefreq>yearly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
`;

  const publicDir = path.resolve(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  const sitemapPath = path.resolve(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapContent, 'utf-8');
  console.log(`Sitemap successfully generated at ${sitemapPath} using base URL: ${baseUrl}`);
}

generateSitemap();
