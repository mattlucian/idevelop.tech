# Image Attributions

This file tracks all third-party images used in the idevelop.tech website, particularly from Unsplash.

---

## 📋 STANDARD ATTRIBUTION PROCESS

### For Claude Code / AI Assistants:

When the user says **"please attribute this image per our attribution process"**, follow these steps:

1. **Locate the image** by searching this file for:
   - The image ID (e.g., `web-design-hero`)
   - The image URL or Unsplash photo ID
   - The service/page name

2. **Update the attribution** by replacing the "TBD" section with the provided information

3. **Required fields for each image:**
   ```markdown
   ### [Service/Page Name]
   - **Image ID**: `unique-identifier-here` (kebab-case)
   - **Image URL**: `https://images.unsplash.com/photo-XXXXX`
   - **Unsplash Photo**: Full Unsplash photo page URL
   - **Attribution**: Photo by [Name](photographer-link) on [Unsplash](photo-link)
   - **Description**: Brief description of the image
   - **Date Added**: YYYY-MM-DD
   ```

4. **Always preserve existing attributions** - never remove or overwrite completed entries

### For Developers:

- Add new images following the format above
- Use descriptive Image IDs in kebab-case (e.g., `integration-hero`, `about-team-photo`)
- Include full attribution HTML with proper UTM parameters
- Update the code reference comment when changing image URLs

---

## Services Page Images

### Web & Brand Design Service
- **Image ID**: `web-design-hero`
- **Image URL**: `https://images.unsplash.com/photo-1542744173-b3cd6377db95`
- **Code Location**: `/src/views/ServiceBrowserView.vue` (line ~91)
- **Unsplash Photo**: https://unsplash.com/photos/a-desk-with-two-computer-monitors-and-a-keyboard-pd-Hekt6naQ
- **Attribution**: Photo by [Tran Mau Tri Tam ✪](https://unsplash.com/@tranmautritam?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/a-desk-with-two-computer-monitors-and-a-keyboard-pd-Hekt6naQ?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
- **Description**: Silver iMac displaying design work on screen
- **Date Added**: 2025-10-22

### Tech Admin Service
- **Image ID**: `tech-admin-hero`
- **Image URL**: `https://images.unsplash.com/photo-1581089781785-603411fa81e5`
- **Code Location**: `/src/views/ServiceBrowserView.vue` (line ~55)
- **Unsplash Photo**: https://unsplash.com/photos/woman-sitting-on-black-office-rolling-chair-in-front-of-computer-monitor-yhCHx8Mc-Kc
- **Attribution**: Photo by [ThisisEngineering](https://unsplash.com/@thisisengineering?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/woman-sitting-on-black-office-rolling-chair-in-front-of-computer-monitor-yhCHx8Mc-Kc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
- **Description**: Woman working at computer monitor - technical administration workspace
- **Date Added**: 2025-10-22

### Integration Services
- **Image ID**: `integration-hero`
- **Image URL**: `https://images.unsplash.com/photo-1707733260992-73ff6dbed163`
- **Code Location**: `/src/views/ServiceBrowserView.vue` (line ~73)
- **Unsplash Photo**: https://unsplash.com/photos/a-cell-phone-is-connected-to-a-light-switch-We56jns_zLE
- **Attribution**: Photo by [Jakub Żerdzicki](https://unsplash.com/@jakubzerdzicki?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/a-cell-phone-is-connected-to-a-light-switch-We56jns_zLE?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
- **Description**: Phone connected to devices - representing seamless system integration
- **Date Added**: 2025-10-22

### Cloud Computing Consultations Service
- **Image ID**: `cloud-consulting-hero`
- **Image URL**: `https://images.unsplash.com/photo-1619410283995-43d9134e7656`
- **Code Location**: `/src/views/ServiceBrowserView.vue` (line ~96)
- **Unsplash Photo**: https://unsplash.com/photos/black-flat-screen-computer-monitor-mZnx9429i94
- **Attribution**: Photo by [Juanjo Jaramillo](https://unsplash.com/@juanjodev02?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/black-flat-screen-computer-monitor-mZnx9429i94?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
- **Description**: Code displayed on computer monitor - cloud infrastructure workspace
- **Date Added**: 2025-10-22

### AI Enablement Service
- **Image ID**: `ai-enablement-hero`
- **Image URL**: `https://images.unsplash.com/photo-1718241905559-f76f2718ddc1`
- **Code Location**: `/src/views/ServiceBrowserView.vue` (line ~78)
- **Unsplash Photo**: https://unsplash.com/photos/a-laptop-computer-sitting-on-top-of-a-wooden-table-aGZSbHGz6F0
- **Attribution**: Photo by [BoliviaInteligente](https://unsplash.com/@boliviainteligente?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/a-laptop-computer-sitting-on-top-of-a-wooden-table-aGZSbHGz6F0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
- **Description**: AI/technology visualization representing artificial intelligence integration
- **Date Added**: 2025-10-22

### eCommerce Operations Service
- **Image ID**: `ecommerce-ops-hero`
- **Image URL**: `https://images.unsplash.com/photo-1664455340023-214c33a9d0bd`
- **Code Location**: `/src/views/ServiceBrowserView.vue` (line ~96)
- **Unsplash Photo**: https://unsplash.com/photos/a-toy-shopping-cart-BQ9usyzHx_w
- **Attribution**: Photo by [Shutter Speed](https://unsplash.com/@shutter_speed_?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/a-toy-shopping-cart-BQ9usyzHx_w?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
- **Description**: Shopping cart representing eCommerce operations and online store management
- **Date Added**: 2025-10-22

---

## TODO: Attribution Page Implementation

Create a dedicated `/attribution` route that displays all image credits in a user-friendly format. This page should:
- List all photographers and their work
- Include proper Unsplash attribution links
- Follow Unsplash's attribution guidelines
- Be accessible from the footer

---

## Unsplash License Information

All images from Unsplash are used under the [Unsplash License](https://unsplash.com/license):
- Photos can be used for free
- No permission needed
- Attribution is appreciated but not required (we provide it anyway!)
