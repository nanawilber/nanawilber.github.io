-- Social Profile Links (Fixed)
-- Added empty string for icon_url to satisfy NOT NULL constraint

INSERT INTO social_links (platform_name, platform_url, icon_url, display_order, is_active) VALUES 
('X', 'https://x.com/brapurple', '/images/x.svg', 10, true),
('Instagram', 'https://instagram.com/brapurple', '/images/instagram.svg', 11, true),
('Facebook', 'https://facebook.com/brapurple', '/images/facebook.svg', 12, true),
('Snapchat', 'https://snapchat.com/add/brapurple', '/images/snapchat.svg', 13, true),
('TikTok', 'https://tiktok.com/@brapurple', '/images/tiktok.svg', 14, true),
('YouTube', 'https://www.youtube.com/@Brapurple', '/images/youtube.svg', 15, true);
