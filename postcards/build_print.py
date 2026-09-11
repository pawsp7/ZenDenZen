#!/usr/bin/env python3
"""Build postcard print HTML — backs only, 10.7 × 13.8 cm."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent

MOTIFS = """
    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="sprite">
      <symbol id="motif-arriving" viewBox="0 0 36 36" fill="none">
        <circle cx="18" cy="19" r="11.2" stroke="#2a2620" stroke-width="1.5" stroke-linecap="round" stroke-dasharray="58 12" transform="rotate(-28 18 19)"/>
        <circle cx="26.2" cy="8.8" r="1.55" fill="#b08d55" stroke="none"/>
      </symbol>
      <symbol id="motif-horizon" viewBox="0 0 36 36" fill="none">
        <path d="M3 27 L13.5 13 L21 24 L27.5 16 L34 27" stroke="#7d8c6c" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="24.5" cy="10" r="2" fill="#b08d55" stroke="none"/>
      </symbol>
      <symbol id="motif-tended" viewBox="0 0 36 36" fill="none">
        <path d="M18 30 V16" stroke="#2a2620" stroke-width="1.4" stroke-linecap="round"/>
        <path d="M18 22 C12 20 11 13 16 12 C17 17 18 20 18 22" stroke="#7d8c6c" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M18 20 C24 18 26 12 21 11 C20 16 18 19 18 20" stroke="#7d8c6c" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round"/>
      </symbol>
      <symbol id="motif-later" viewBox="0 0 36 36" fill="none">
        <path d="M21 8.2 A10.4 10.4 0 1 0 21 27.8 A7.6 7.6 0 1 1 21 8.2 Z" stroke="#2a2620" stroke-width="1.45" stroke-linejoin="round"/>
        <circle cx="26.4" cy="10.2" r="1.45" fill="#b08d55" stroke="none"/>
      </symbol>
    </svg>
"""

CARDS = [
    {
        "id": "arriving",
        "prompt": "To the you who is arriving",
        "wish": "a quiet hope, sent forward",
        "letter_lines": 10,
        "address_lines": 4,
    },
    {
        "id": "horizon",
        "prompt": "May the days ahead be kind",
        "wish": "the path keeps opening",
        "letter_lines": 10,
        "address_lines": 4,
    },
    {
        "id": "tended",
        "prompt": "What you plant with care",
        "wish": "arriving in a little while",
        "letter_lines": 10,
        "address_lines": 4,
    },
    {
        "id": "later",
        "prompt": "This quiet will find you",
        "wish": "a light for the later hour",
        "letter_lines": 10,
        "address_lines": 4,
    },
]


def lines(n):
    return "<span></span>" * n


def card(c):
    return f"""
          <article class="card theme-{c['id']}">
            <div class="frame"></div>
            <header class="head">
              <svg aria-hidden="true"><use href="#motif-{c['id']}"/></svg>
              <p class="event">Postcards to Future Me</p>
              <h3 class="prompt">{c['prompt']}</h3>
            </header>
            <div class="split">
              <section class="letter">
                <p class="salute">Dear future me,</p>
                <div class="lines" aria-hidden="true">{lines(c['letter_lines'])}</div>
              </section>
              <div class="rule" aria-hidden="true"></div>
              <section class="address">
                <div class="stamp">stamp</div>
                <p class="label">My address</p>
                <div class="lines" aria-hidden="true">{lines(c['address_lines'])}</div>
              </section>
            </div>
            <footer class="foot">
              <span class="date">Written <span class="blank"></span></span>
              <span class="wish">{c['wish']}</span>
            </footer>
          </article>"""


def exact_pages():
    return "\n        ".join(
        f'<div class="page">{card(c)}\n        </div>' for c in CARDS
    )


def sheet_2x2():
    cells = "\n        ".join(card(c) for c in CARDS)
    return f'<div class="pack">\n        {cells}\n        </div>'


def a4_sheets():
    sheets = []
    for c in CARDS:
        sheets.append(
            f"""<div class="sheet">
          <p class="cut-label">{c['id']} · Postcards to Future Me · trim to 10.7 × 13.8 cm</p>
          <div class="trim">
            <span class="mark tl-h"></span><span class="mark tl-v"></span>
            <span class="mark tr-h"></span><span class="mark tr-v"></span>
            <span class="mark bl-h"></span><span class="mark bl-v"></span>
            <span class="mark br-h"></span><span class="mark br-v"></span>
            {card(c)}
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

(ROOT / "print-exact.html").write_text(
    HEAD.format(
        title="Print Postcards to Future Me — 10.7 × 13.8 cm",
        print_css="print-exact.css",
        motifs=MOTIFS,
    )
    + "        "
    + exact_pages()
    + FOOT
)

(ROOT / "print-a4.html").write_text(
    HEAD.format(
        title="Print Postcards to Future Me on A4 — crop to 10.7 × 13.8 cm",
        print_css="print-a4.css",
        motifs=MOTIFS,
    )
    + "        "
    + a4_sheets()
    + FOOT
)

(ROOT / "print-sheet.html").write_text(
    HEAD.format(
        title="Print Postcards to Future Me — 21.4 × 27.6 cm sheet",
        print_css="print-sheet.css",
        motifs=MOTIFS,
    )
    + "        "
    + sheet_2x2()
    + FOOT
)

print("wrote print-exact.html, print-a4.html, and print-sheet.html")
