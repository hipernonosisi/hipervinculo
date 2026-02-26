
## Add Delios Home Mobile Screenshot to Portfolio

### What will be done
Copy the uploaded mobile screenshot to `public/portfolio/delios-home-mobile.png` and update the Delios Home entry in `src/data/portfolioData.ts` to include the `imageMobile` property, so the portfolio grid shows the desktop+mobile mockup overlay (matching the style of all other projects).

### Technical Details
1. **Copy asset**: `user-uploads://image-338.png` to `public/portfolio/delios-home-mobile.png`
2. **Update `src/data/portfolioData.ts`**: Add `imageMobile: '/portfolio/delios-home-mobile.png'` to the Delios Home project entry

This will enable the mobile phone overlay that appears on the bottom-right corner of the portfolio card (22% width, protruding style), consistent with all other portfolio projects.
