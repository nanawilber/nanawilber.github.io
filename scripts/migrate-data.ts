// Data Migration Script for Supabase CMS
// This script migrates data from lib/data.js to your Supabase database

import { supabase } from "./lib/supabase";
import { about, streamPlatforms, musicDetails } from "./lib/data";

async function migrateData() {
  console.log("🚀 Starting data migration...\n");

  try {
    // Migrate About Sections
    console.log("📝 Migrating about sections...");
    for (let i = 0; i < about.length; i++) {
      const section = about[i];
      const { error } = await supabase.from("about_sections").insert({
        title: section.title || null,
        content: section.content,
        image_url: null, // You'll need to upload images manually
        display_order: i,
      });

      if (error) {
        console.error(`❌ Error migrating about section ${i}:`, error);
      } else {
        console.log(`✅ Migrated about section ${i + 1}/${about.length}`);
      }
    }

    // Migrate Social Links (Streaming Platforms)
    console.log("\n🔗 Migrating social links...");
    for (let i = 0; i < streamPlatforms.length; i++) {
      const platform = streamPlatforms[i];
      const { error } = await supabase.from("social_links").insert({
        platform_name: platform.name,
        platform_url: platform.link,
        icon_url: platform.imageSrc,
        display_order: i,
        is_active: true,
      });

      if (error) {
        console.error(`❌ Error migrating ${platform.name}:`, error);
      } else {
        console.log(
          `✅ Migrated ${platform.name} (${i + 1}/${streamPlatforms.length})`,
        );
      }
    }

    // Migrate Releases (Music Details)
    console.log("\n🎵 Migrating releases...");
    for (let i = 0; i < musicDetails.length; i++) {
      const release = musicDetails[i];
      const { error } = await supabase.from("releases").insert({
        title: release.title,
        artwork_url: release.artwork,
        listen_url: release.listenUrl,
        watch_url: release.watchUrl,
        display_order: i,
        is_featured: i === 0, // Mark first release as featured
      });

      if (error) {
        console.error(`❌ Error migrating ${release.title}:`, error);
      } else {
        console.log(
          `✅ Migrated ${release.title} (${i + 1}/${musicDetails.length})`,
        );
      }
    }

    console.log("\n✨ Migration completed successfully!");
    console.log("\n📋 Summary:");
    console.log(`   - About sections: ${about.length}`);
    console.log(`   - Social links: ${streamPlatforms.length}`);
    console.log(`   - Releases: ${musicDetails.length}`);
    console.log("\n⚠️  Note: You still need to:");
    console.log(
      "   1. Upload images for about sections in the admin dashboard",
    );
    console.log("   2. Set release dates for your music");
    console.log("   3. Update hero content in the admin dashboard");
  } catch (error) {
    console.error("\n❌ Migration failed:", error);
  }
}

// Run migration
migrateData();
