#!/usr/bin/env python3
"""Build postcard print HTML from shared card faces."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent

MOTIFS = """
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="sprite">
      <symbol id="motif-stillness" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r="11.5" fill="none" stroke="#2a2620" stroke-width="1.7" stroke-linecap="round" stroke-dasharray="62 10" transform="rotate(-24 18 18)"/>
        <circle cx="26.5" cy="9.5" r="1.6" fill="#c4a574"/>
      </symbol>
      <symbol id="motif-breathe" viewBox="0 0 36 36">
        <path d="M4 26 L13 12 L22 26 Z" fill="#8a9a78" opacity="0.85"/>
        <path d="M14 26 L24 10 L33 26 Z" fill="#6f7a6a"/>
        <circle cx="24.5" cy="8" r="2" fill="#c4a574"/>
      </symbol>
      <symbol id="motif-balance" viewBox="0 0 36 36">
        <ellipse cx="18" cy="25.5" rx="9" ry="3.4" fill="#5c5852"/>
        <ellipse cx="18" cy="20.2" rx="7" ry="2.8" fill="#8a8378"/>
        <ellipse cx="18" cy="15.4" rx="5.1" ry="2.3" fill="#4f4b46"/>
        <ellipse cx="20.2" cy="12.6" rx="2.1" ry="1.1" fill="#8a9a78"/>
      </symbol>
    </svg>
"""

CARDS = [
    {
        "id": "stillness",
        "n": "one",
        "alt": "Ink enso circle and a gold sun on rice paper",
    },
    {
        "id": "breathe",
        "n": "two",
        "alt": "Misty watercolor mountains under a gold sun",
    },
    {
        "id": "balance",
        "n": "three",
        "alt": "Stacked river stones with a leaf and sand ripples",
    },
]


def front(card):
    return f"""
          <article class="card front theme-{card['id']}">
            <img class="art" src="./art/{card['id']}.jpg" alt="{card['alt']}" />
            <div class="frame"></div>
            <p class="word">{card['id']}</p>
          </article>"""


def back(card):
    return f"""
          <article class="card back theme-{card['id']}">
            <div class="back-head">
              <svg aria-hidden="true"><use href="#motif-{card['id']}"/></svg>
              <div>
                <p class="back-kicker">Postcard {card['n']}</p>
                <div class="name">{card['id']}</div>
              </div>
            </div>
            <div class="split">
              <section>
                <p class="label">A quiet note</p>
                <div class="lines" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
              </section>
              <div class="rule" aria-hidden="true"></div>
              <section class="address">
                <div class="stamp">stamp</div>
                <p class="label">Post</p>
                <div class="lines" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
              </section>
            </div>
            <div class="back-foot">
              <span class="brand">ZenDenZen</span>
              <span>10.7 × 13.8 cm</span>
            </div>
          </article>"""


def exact_pages():
    pages = []
    for card in CARDS:
        pages.append(f'<div class="page">{front(card)}\n        </div>')
        pages.append(f'<div class="page">{back(card)}\n        </div>')
    return "\n        ".join(pages)


def a4_sheets():
    sheets = []
    for card in CARDS:
        for side, body in (("front", front(card)), ("back", back(card))):
            sheets.append(
                f"""<div class="sheet">
          <p class="cut-label">{card['id']} · {side} · trim to 10.7 × 13.8 cm</p>
          <div class="trim">
            <span class="mark tl-h"></span><span class="mark tl-v"></span>
            <span class="mark tr-h"></span><span class="mark tr-v"></span>
            <span class="mark bl-h"></span><span class="mark bl-v"></span>
            <span class="mark br-h"></span><span class="mark br-v"></span>
            {body}
          </div>
        </div>"""
            )
    return "\n        ".join(sheets)


HEAD = """<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>{title}</title>
    <link rel="stylesheet" href="./fonts.css" />
    <link rel="stylesheet" href="./cards.css" />
    <link rel="stylesheet" href="./{print_css}" />
  </head>
  <body>
    {motifs}
"""

FOOT = """
  </body>
</html>
"""

exact = (
    HEAD.format(
        title="Print zen postcards — 10.7 × 13.8 cm",
        print_css="print-exact.css",
        motifs=MOTIFS,
    )
    + "        "
    + exact_pages()
    + FOOT
)

a4 = (
    HEAD.format(
        title="Print zen postcards on A4 — crop to 10.7 × 13.8 cm",
        print_css="print-a4.css",
        motifs=MOTIFS,
    )
    + "        "
    + a4_sheets()
    + FOOT
)

(ROOT / "print-exact.html").write_text(exact)
(ROOT / "print-a4.html").write_text(a4)
print("wrote print-exact.html and print-a4.html")
