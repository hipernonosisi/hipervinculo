#!/usr/bin/env python3
"""
PDF Margin QA Agent
Converts PDF pages to images and checks for text/content that appears
too close to page edges (potential cutoff issues).

Usage:
  python3 scripts/pdf-margin-qa.py <path-to-pdf> [--margin-px 30] [--output-dir /tmp/pdf-qa]

Reports pages where content is found within the margin zone.
"""

import sys
import subprocess
import os
import argparse
from pathlib import Path

try:
    from PIL import Image
    import numpy as np
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow", "numpy", "-q"])
    from PIL import Image
    import numpy as np


def convert_pdf_to_images(pdf_path: str, output_dir: str, dpi: int = 150) -> list[str]:
    """Convert PDF pages to JPEG images using pdftoppm."""
    os.makedirs(output_dir, exist_ok=True)
    prefix = os.path.join(output_dir, "page")
    subprocess.run(
        ["pdftoppm", "-jpeg", "-r", str(dpi), pdf_path, prefix],
        check=True, capture_output=True
    )
    images = sorted(Path(output_dir).glob("page-*.jpg"))
    return [str(p) for p in images]


def check_margins(image_path: str, margin_px: int = 30) -> dict:
    """
    Check if there's non-white content within the margin zones.
    Returns a dict with which edges have content too close.
    """
    img = Image.open(image_path).convert("L")  # grayscale
    arr = np.array(img)
    h, w = arr.shape

    # Threshold: anything darker than 240 is "content"
    threshold = 240
    content_mask = arr < threshold

    issues = []

    # Top margin
    top_zone = content_mask[:margin_px, :]
    if top_zone.any():
        rows_with_content = np.where(top_zone.any(axis=1))[0]
        closest = int(rows_with_content.min())
        issues.append(f"TOP edge: content at {closest}px from top (min safe: {margin_px}px)")

    # Bottom margin
    bottom_zone = content_mask[h - margin_px:, :]
    if bottom_zone.any():
        rows_with_content = np.where(bottom_zone.any(axis=1))[0]
        closest = int(rows_with_content.max())
        actual_dist = margin_px - closest - 1
        issues.append(f"BOTTOM edge: content at {actual_dist}px from bottom (min safe: {margin_px}px)")

    # Left margin
    left_zone = content_mask[:, :margin_px]
    if left_zone.any():
        cols_with_content = np.where(left_zone.any(axis=0))[0]
        closest = int(cols_with_content.min())
        issues.append(f"LEFT edge: content at {closest}px from left (min safe: {margin_px}px)")

    # Right margin
    right_zone = content_mask[:, w - margin_px:]
    if right_zone.any():
        cols_with_content = np.where(right_zone.any(axis=0))[0]
        closest = int(cols_with_content.max())
        actual_dist = margin_px - closest - 1
        issues.append(f"RIGHT edge: content at {actual_dist}px from right (min safe: {margin_px}px)")

    return {
        "page": os.path.basename(image_path),
        "has_issues": len(issues) > 0,
        "issues": issues,
    }


def main():
    parser = argparse.ArgumentParser(description="PDF Margin QA - check for text cutoff at page edges")
    parser.add_argument("pdf_path", help="Path to the PDF file")
    parser.add_argument("--margin-px", type=int, default=30, help="Margin zone in pixels at 150 DPI (~5mm)")
    parser.add_argument("--output-dir", default="/tmp/pdf-qa", help="Directory for temporary page images")
    parser.add_argument("--dpi", type=int, default=150, help="DPI for rendering")
    args = parser.parse_args()

    if not os.path.exists(args.pdf_path):
        print(f"❌ File not found: {args.pdf_path}")
        sys.exit(1)

    print(f"📄 Analyzing: {args.pdf_path}")
    print(f"📏 Margin threshold: {args.margin_px}px at {args.dpi} DPI\n")

    images = convert_pdf_to_images(args.pdf_path, args.output_dir, args.dpi)
    print(f"📃 {len(images)} pages converted\n")

    total_issues = 0
    for img_path in images:
        result = check_margins(img_path, args.margin_px)
        page_num = result["page"]
        if result["has_issues"]:
            total_issues += 1
            print(f"⚠️  {page_num}:")
            for issue in result["issues"]:
                print(f"    → {issue}")
        else:
            print(f"✅ {page_num}: OK")

    print(f"\n{'='*50}")
    if total_issues == 0:
        print("🎉 All pages pass margin check!")
    else:
        print(f"⚠️  {total_issues}/{len(images)} pages have potential margin issues")
    
    return total_issues


if __name__ == "__main__":
    sys.exit(0 if main() == 0 else 1)
