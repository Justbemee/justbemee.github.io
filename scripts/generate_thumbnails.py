#!/usr/bin/env python3
import html
import re
import shutil
import subprocess
from pathlib import Path
from urllib.parse import unquote

ROOT = Path(__file__).resolve().parents[1]
IMAGE_DIR = ROOT / "images"
THUMB_DIR = IMAGE_DIR / "thumbnails"
PAGES = ("gallery.html", "all-paintings.html")
THUMBNAIL_SIZES = ((720, 72), (560, 65), (420, 58))

CARD_RE = re.compile(
    r'(?P<open><a\b(?=[^>]*\bclass=["\'][^"\']*\bgallery-item\b[^"\']*["\'])[^>]*>)'
    r'(?P<body>.*?)'
    r'(?P<close></a>)',
    re.IGNORECASE | re.DOTALL,
)
DATA_SRC_RE = re.compile(r'\bdata-src\s*=\s*(["\'])(.*?)\1', re.IGNORECASE | re.DOTALL)
IMG_SRC_RE = re.compile(
    r'(?P<before><img\b[^>]*?\bsrc=(?P<quote>["\']))'
    r'(?P<path>.*?)'
    r'(?P<after>(?P=quote)[^>]*>)',
    re.IGNORECASE,
)
IMG_TAG_RE = re.compile(r'<img\b[^>]*>', re.IGNORECASE)
DECODING_RE = re.compile(r'\bdecoding\s*=', re.IGNORECASE)


def make_thumbnail(source_url):
    source_path = (ROOT / unquote(html.unescape(source_url))).resolve()
    if not source_path.is_relative_to(IMAGE_DIR.resolve()):
        raise ValueError(f"Image must be inside images/: {source_url}")
    if not source_path.is_file():
        raise FileNotFoundError(f"Painting image not found: {source_url}")

    THUMB_DIR.mkdir(parents=True, exist_ok=True)
    thumbnail_path = THUMB_DIR / f"{source_path.name}.webp"
    needs_generation = (
        not thumbnail_path.exists()
        or source_path.stat().st_mtime_ns > thumbnail_path.stat().st_mtime_ns
        or thumbnail_path.stat().st_size >= source_path.stat().st_size
    )
    if needs_generation:
        for max_edge, quality in THUMBNAIL_SIZES:
            subprocess.run(
                [
                    "magick",
                    str(source_path),
                    "-auto-orient",
                    "-strip",
                    "-resize",
                    f"{max_edge}x{max_edge}>",
                    "-quality",
                    str(quality),
                    str(thumbnail_path),
                ],
                check=True,
            )
            if thumbnail_path.stat().st_size < source_path.stat().st_size:
                break
            thumbnail_path.unlink()

    if not thumbnail_path.exists():
        print(f"Keeping original; no smaller thumbnail produced: {source_url}")
        return source_path.relative_to(ROOT).as_posix()

    if needs_generation:
        print(f"Created {thumbnail_path.relative_to(ROOT).as_posix()}")

    return thumbnail_path.relative_to(ROOT).as_posix()


def rewrite_page(page_path):
    source = page_path.read_text(encoding="utf-8")
    updated_cards = 0

    def rewrite_card(match):
        nonlocal updated_cards
        source_match = DATA_SRC_RE.search(match.group("open"))
        if not source_match:
            return match.group(0)

        thumbnail_url = make_thumbnail(source_match.group(2))
        body, replacements = IMG_SRC_RE.subn(
            lambda image_match: (
                image_match.group("before")
                + html.escape(thumbnail_url, quote=True)
                + image_match.group("after")
            ),
            match.group("body"),
            count=1,
        )
        if replacements != 1:
            raise ValueError(f"Could not find gallery thumbnail in {page_path.name}")

        def add_async_decoding(image_match):
            tag = image_match.group(0)
            if DECODING_RE.search(tag):
                return tag
            return tag[:-1] + ' decoding="async">'

        body = IMG_TAG_RE.sub(add_async_decoding, body, count=1)
        updated_cards += 1
        return match.group("open") + body + match.group("close")

    updated = CARD_RE.sub(rewrite_card, source)
    if updated_cards == 0:
        raise ValueError(f"No gallery cards found in {page_path.name}")
    if updated != source:
        page_path.write_text(updated, encoding="utf-8")
    print(f"Updated {updated_cards} gallery thumbnails in {page_path.name}")


def main():
    if shutil.which("magick") is None:
        raise SystemExit("ImageMagick is required. Install it, then rerun this script.")

    for page_name in PAGES:
        rewrite_page(ROOT / page_name)


if __name__ == "__main__":
    main()
