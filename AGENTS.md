# Architecture rules
- Industrial Advisors proposal content lives in one typed content module consumed by both the web proposal and the PDF renderer, so commercial terms stay consistent.
- Industrial Advisors uses the existing A4 document-preview pattern with expandable web pages and a matching React PDF layout, so the proposal remains consistent with the agency's other proposals without clipping long content.
- Client-shareable proposals use dedicated public, noindex routes and are also registered in the existing admin proposal menu, so clients need no admin access.