#!/usr/bin/env python3
"""Hipervinculo Ebook: Amazon FBA Sin Inventario - 50 pages ES"""
import os, io
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm, cm
from reportlab.lib.colors import HexColor, white, black
from reportlab.pdfgen import canvas as canvas_mod
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import ImageReader
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np

# Brand — matched to the live website
DARK = HexColor("#2F4F3E")
LIME = HexColor("#8BC34A")
CREAM = HexColor("#FFFFFF")
TEXT = HexColor("#2A2A2A")
MUTED = HexColor("#6B7280")
LIGHT = HexColor("#F5F6F2")
LINE = HexColor("#E5E7DE")
MARGIN = 20*mm
CONTENT_W = A4[0] - 2*MARGIN

ASSETS = "/mnt/documents/ebook-assets"
OUT = "/mnt/documents/Amazon_FBA_Sin_Inventario_Hipervinculo.pdf"
PW, PH = A4

# Font: Inter — exact family used by the website
try:
    pdfmetrics.registerFont(TTFont("Inter", "/tmp/inter-fonts/extras/ttf/Inter-Regular.ttf"))
    pdfmetrics.registerFont(TTFont("Inter-SB", "/tmp/inter-fonts/extras/ttf/Inter-SemiBold.ttf"))
    pdfmetrics.registerFont(TTFont("Inter-B", "/tmp/inter-fonts/extras/ttf/Inter-Bold.ttf"))
    pdfmetrics.registerFont(TTFont("Inter-EB", "/tmp/inter-fonts/extras/ttf/Inter-ExtraBold.ttf"))
    from reportlab.pdfbase.pdfmetrics import registerFontFamily
    registerFontFamily("Inter", normal="Inter", bold="Inter-B")
    F, FSB, FB, FEB = "Inter", "Inter-SB", "Inter-B", "Inter-EB"
except Exception as e:
    print("Font load failed:", e)
    F, FSB, FB, FEB = "Helvetica", "Helvetica-Bold", "Helvetica-Bold", "Helvetica-Bold"

c = canvas_mod.Canvas(OUT, pagesize=A4)
page_num = [0]
total_pages = 50

# ---------- helpers ----------
def page_bg(color=CREAM):
    c.setFillColor(color); c.rect(0, 0, PW, PH, fill=1, stroke=0)

def header_bar(title=None, chapter=None):
    c.setFillColor(LIME); c.rect(0, PH-8, PW, 8, fill=1, stroke=0)
    if title:
        c.setFillColor(MUTED); c.setFont(F, 7.5)
        c.drawString(MARGIN, PH-22, title.upper())
    if chapter:
        c.setFillColor(DARK); c.setFont(FB, 7.5)
        c.drawRightString(PW-MARGIN, PH-22, chapter.upper())

def footer():
    n = page_num[0]
    if n == 0: return
    c.setFillColor(MUTED); c.setFont(F, 7.5)
    c.drawString(MARGIN, 12*mm, "HIPERVINCULO  ·  AMAZON FBA SIN INVENTARIO 2026")
    c.drawRightString(PW-MARGIN, 12*mm, f"{n} / {total_pages}")
    c.setStrokeColor(LINE); c.setLineWidth(0.5)
    c.line(MARGIN, 16*mm, PW-MARGIN, 16*mm)



def chapter_hero(name):
    """Small circular brand illustration at top-right of chapter intro page."""
    path = f"{ASSETS}/{name}.png"
    import os
    if not os.path.exists(path): return
    size = 30*mm
    x = PW - 20*mm - size
    y = PH - 30*mm - size + 4*mm
    # cream circle background
    c.setFillColor(CREAM); c.circle(x + size/2, y + size/2, size/2 + 1, fill=1, stroke=0)
    # clip to circle
    c.saveState()
    p = c.beginPath()
    p.circle(x + size/2, y + size/2, size/2)
    c.clipPath(p, stroke=0, fill=0)
    c.drawImage(path, x, y, size, size, mask='auto', preserveAspectRatio=True, anchor='c')
    c.restoreState()
    # thin lime ring
    c.setStrokeColor(LIME); c.setLineWidth(1.2)
    c.circle(x + size/2, y + size/2, size/2 + 0.6, stroke=1, fill=0)

def newpage(bg=CREAM, title=None, chapter=None):
    if page_num[0] > 0: c.showPage()
    page_num[0] += 1
    page_bg(bg)
    if page_num[0] > 1:
        header_bar(title, chapter); footer()

def wrap_text(text, font, size, max_w):
    """Wrap text into lines that fit max_w."""
    words = text.split()
    lines = []; cur = ""
    for w in words:
        test = (cur + " " + w).strip()
        if c.stringWidth(test, font, size) <= max_w:
            cur = test
        else:
            if cur: lines.append(cur)
            cur = w
    if cur: lines.append(cur)
    return lines

def fit_text(text, font, size, max_w, min_size=5.8):
    while size > min_size and c.stringWidth(text, font, size) > max_w:
        size -= 0.2
    return size

def draw_para(text, x, y, max_w, font=F, size=10, leading=14, color=TEXT, align="left"):
    c.setFillColor(color); c.setFont(font, size)
    lines = wrap_text(text, font, size, max_w)
    for line in lines:
        if align == "center":
            c.drawCentredString(x + max_w/2, y, line)
        else:
            c.drawString(x, y, line)
        y -= leading
    return y

def draw_title(text, x, y, size=28, color=DARK, font=FB):
    c.setFillColor(color); c.setFont(font, size)
    c.drawString(x, y, text)
    return y - size

def draw_h2(text, x, y, size=18, color=DARK):
    c.setFillColor(color); c.setFont(FB, size)
    c.drawString(x, y, text)
    # Website-style accent placed with clear separation from text descenders
    c.setFillColor(LIME); c.rect(x, y-size*0.72, 34*mm, 2.2, fill=1, stroke=0)
    return y - size - 12

def draw_chip(text, x, y, fill=LIME, txt=white):
    w = c.stringWidth(text, FSB, 8) + 16
    c.setFillColor(fill); c.roundRect(x, y, w, 14, 7, fill=1, stroke=0)
    c.setFillColor(txt); c.setFont(FSB, 8)
    c.drawString(x+8, y+4.2, text)
    return w

def draw_website_stat_row(y, stats, top_line=True):
    if top_line:
        c.setStrokeColor(LINE); c.setLineWidth(0.5)
        c.line(MARGIN, y+16, PW-MARGIN, y+16)
    seg = CONTENT_W / len(stats)
    for i, (big, small) in enumerate(stats):
        cx = MARGIN + seg*i + seg/2
        c.setFillColor(DARK); c.setFont(F, 22)
        c.drawCentredString(cx, y, big)
        c.setFillColor(MUTED); c.setFont(F, 9)
        c.drawCentredString(cx, y-12, small.upper())

def draw_table(x, y, col_w, cols, rows, font_size=8.2, row_h=22, header_h=22, first_bold=True, highlights=None):
    highlights = highlights or set()
    c.setFillColor(DARK); c.rect(x, y-header_h, sum(col_w), header_h, fill=1, stroke=0)
    c.setFillColor(white); c.setFont(FB, font_size)
    cx = x
    for i, col in enumerate(cols):
        fs = fit_text(col, FB, font_size, col_w[i]-10)
        c.setFont(FB, fs); c.drawString(cx+6, y-header_h+7, col); cx += col_w[i]
    y -= header_h
    for ri, row in enumerate(rows):
        is_hi = ri in highlights or (row and str(row[0]).upper() == "TOTAL") or (row and "Margen" in str(row[0]))
        c.setFillColor(LIME if is_hi else (white if ri%2==0 else LIGHT))
        c.rect(x, y-row_h, sum(col_w), row_h, fill=1, stroke=0)
        c.setStrokeColor(LINE); c.setLineWidth(0.35)
        c.line(x, y-row_h, x+sum(col_w), y-row_h)
        cx = x
        for i, cell in enumerate(row):
            font = FB if (first_bold and i == 0) or is_hi else F
            fs = fit_text(str(cell), font, font_size, col_w[i]-10)
            c.setFillColor(DARK if (i == 0 or is_hi) else TEXT)
            c.setFont(font, fs)
            c.drawString(cx+6, y-row_h+7, str(cell))
            cx += col_w[i]
        y -= row_h
    return y

def draw_centered_wrapped(text, x, y, w, h, font=FB, size=8.5, color=white, leading=10):
    lines = wrap_text(text, font, size, w-8)
    if len(lines) * leading > h-6:
        size = max(6.2, size - 1.2)
        leading = max(8, leading - 1)
        lines = wrap_text(text, font, size, w-8)
    start_y = y + h/2 + ((len(lines)-1)*leading)/2 - size/3
    c.setFillColor(color); c.setFont(font, size)
    for line in lines[:3]:
        c.drawCentredString(x+w/2, start_y, line)
        start_y -= leading

def draw_flow_boxes(x, y, w, labels, colors=None, box_h=22, gap=8):
    colors = colors or [DARK] * len(labels)
    box_w = (w - gap*(len(labels)-1)) / len(labels)
    for i, label in enumerate(labels):
        bx = x + i*(box_w+gap)
        c.setFillColor(colors[i]); c.roundRect(bx, y, box_w, box_h, 5, fill=1, stroke=0)
        draw_centered_wrapped(label, bx, y, box_w, box_h, font=FB, size=8.5, color=(DARK if colors[i] == LIME else white), leading=9)
        if i < len(labels)-1:
            c.setStrokeColor(LIME); c.setLineWidth(1.5)
            c.line(bx+box_w+1.5, y+box_h/2, bx+box_w+gap-1.5, y+box_h/2)
            p = c.beginPath(); p.moveTo(bx+box_w+gap-1.5, y+box_h/2); p.lineTo(bx+box_w+gap-5, y+box_h/2+3); p.lineTo(bx+box_w+gap-5, y+box_h/2-3); p.close()
            c.setFillColor(LIME); c.drawPath(p, fill=1, stroke=0)
    return y - box_h

def draw_image_box(path, x, y, w, h, radius=8):
    """Image cropped into rounded rect (visual rect, image drawn inside)."""
    c.setFillColor(LIGHT); c.roundRect(x, y, w, h, radius, fill=1, stroke=0)
    try:
        c.drawImage(path, x, y, w, h, mask='auto', preserveAspectRatio=True, anchor='c')
    except: pass

def chart_to_img(fig, w=None, h=None):
    buf = io.BytesIO()
    fig.savefig(buf, format="png", dpi=170, bbox_inches="tight", facecolor="#FFFFFF", pad_inches=0.2)
    plt.close(fig); buf.seek(0)
    return ImageReader(buf)

# matplotlib style — match website typography
try:
    import matplotlib.font_manager as fm
    for fp in ["/tmp/inter-fonts/extras/ttf/Inter-Regular.ttf","/tmp/inter-fonts/extras/ttf/Inter-Bold.ttf","/tmp/inter-fonts/extras/ttf/Inter-SemiBold.ttf"]:
        fm.fontManager.addfont(fp)
    _mpl_font = "Inter"
except Exception:
    _mpl_font = "DejaVu Sans"
plt.rcParams.update({
    "font.family": _mpl_font, "font.size": 9,
    "figure.facecolor":"#FFFFFF", "axes.facecolor":"#FFFFFF",
    "axes.edgecolor":"#2F4F3E","axes.labelcolor":"#2F4F3E",
    "xtick.color":"#2F4F3E","ytick.color":"#2F4F3E",
    "axes.spines.top":False,"axes.spines.right":False,
    "axes.grid": True, "grid.color":"#E5E7DE", "grid.linewidth":0.6,
})

# ================== PAGE 1: COVER — web look & feel ==================
page_num[0] = 1
page_bg(white)
hero_bottom = 64*mm
c.setFillColor(DARK); c.rect(0, hero_bottom, PW, PH-hero_bottom, fill=1, stroke=0)
c.setFillColor(LIME); c.rect(0, hero_bottom-7*mm, PW, 7*mm, fill=1, stroke=0)
# Logo on white plate only
c.setFillColor(white); c.roundRect(MARGIN, PH-30*mm, 54*mm, 16*mm, 3.5, fill=1, stroke=0)
try: c.drawImage(f"{ASSETS}/logo.png", MARGIN+4*mm, PH-27.5*mm, width=46*mm, height=11*mm, mask='auto', preserveAspectRatio=True, anchor='w')
except: pass
# Guide chip, centered like the supplied reference
chip_label = "GUIA PRACTICA · 2026"
cw = pdfmetrics.stringWidth(chip_label, F, 13) + 38*mm
cy = PH-58*mm
c.setFillColor(LIME); c.roundRect((PW-cw)/2, cy, cw, 16*mm, 8*mm, fill=1, stroke=0)
c.setFillColor(DARK); c.setFont(F, 13)
c.drawCentredString(PW/2, cy+5.3*mm, chip_label)
# Kicker and title — same dark/lime typographic hero language as the web
c.setFillColor(LIME); c.setFont(F, 16)
c.drawString(MARGIN, PH-96*mm, "EDICION HIPERVINCULO")
c.setFillColor(white); c.setFont(F, 47)
c.drawString(MARGIN, PH-122*mm, "Amazon FBA")
c.setFillColor(LIME); c.setFont(F, 46)
c.drawString(MARGIN, PH-146*mm, "Sin Inventario")
c.setFillColor(DARK); c.setFont(F, 15)
c.drawString(MARGIN, 43*mm, "El sistema dropshipping legal en Amazon 2026")
c.setFillColor(MUTED); c.setFont(F, 10.5)
c.drawString(MARGIN, 34*mm, "Proveedores verificados  ·  Fulfillment hibrido  ·  Plantillas listas")
draw_website_stat_row(20*mm, [("50", "paginas"), ("32", "criterios"), ("3", "plantillas")])
c.setFillColor(DARK); c.setFont(F, 8.5)
c.drawCentredString(PW/2, 8*mm, "www.hipervinculo.net")

# ================== PAGE 2: COPYRIGHT ==================
newpage()
y = PH - 35*mm
draw_h2("Sobre este libro", 20*mm, y, size=20)
y -= 30
y = draw_para(
    "Esta guia es una publicacion oficial de Hipervinculo, agencia de marketing digital con mas de 20 anos de experiencia, 200+ clientes y mas de $92 millones generados para nuestros socios.",
    20*mm, y, PW-40*mm, size=11, leading=16, color=TEXT)
y -= 10
y = draw_para(
    "El contenido esta basado en operaciones reales, frameworks probados y politicas vigentes de Amazon a la fecha de publicacion. No constituye asesoria legal ni fiscal. Verifica siempre las politicas mas recientes de tu marketplace y consulta con un profesional para tu jurisdiccion.",
    20*mm, y, PW-40*mm, size=11, leading=16, color=TEXT)
y -= 30
c.setFillColor(LIGHT); c.roundRect(20*mm, y-90, PW-40*mm, 80, 10, fill=1, stroke=0)
c.setFillColor(DARK); c.setFont(FB, 12); c.drawString(28*mm, y-20, "Que vas a recibir")
items = [
    "Sistema completo de Amazon dropshipping legal en 2026",
    "Plantillas de negociacion editables con proveedores",
    "Checklist de producto ganador (32 criterios)",
    "Calculadora de margenes y simulaciones reales",
    "Templates de listing optimizado",
]
yy = y - 36
for it in items:
    c.setFillColor(LIME); c.circle(32*mm, yy+3, 2, fill=1, stroke=0)
    c.setFillColor(TEXT); c.setFont(F, 10); c.drawString(36*mm, yy, it)
    yy -= 12
# copyright
c.setFillColor(MUTED); c.setFont(F, 8)
c.drawCentredString(PW/2, 30*mm, "(c) 2026 Hipervinculo. Todos los derechos reservados.")
c.drawCentredString(PW/2, 26*mm, "Prohibida la redistribucion sin autorizacion escrita.")
c.drawCentredString(PW/2, 22*mm, "www.hipervinculo.net  ·  info@hipervinculo.net")

# ================== PAGE 3: INDICE ==================
newpage(title="Indice", chapter="Contenido")
y = PH - 40*mm
draw_title("Indice", 20*mm, y, size=36)
y -= 20
chapters = [
    ("Parte I  ·  Fundamentos", [
        ("01", "Por que Amazon en 2026", 5),
        ("02", "Mitos del dropshipping en Amazon", 7),
        ("03", "FBA vs FBM vs Dropshipping", 9),
        ("04", "Es legal? Politicas Amazon 2026", 11),
    ]),
    ("Parte II  ·  El modelo", [
        ("05", "Vision general del sistema", 13),
        ("06", "Seleccion de nicho rentable", 16),
        ("07", "Criterios de producto ganador", 19),
        ("08", "Investigacion con datos reales", 22),
    ]),
    ("Parte III  ·  Proveedores", [
        ("09", "Encontrar proveedores en Alibaba", 25),
        ("10", "Plantillas de negociacion", 28),
        ("11", "Verificacion y debido proceso", 31),
    ]),
    ("Parte IV  ·  Operacion", [
        ("12", "Fulfillment hibrido paso a paso", 34),
        ("13", "Margenes, pricing y simulaciones", 37),
        ("14", "Listing optimizado para conversion", 40),
        ("15", "Lanzamiento y primeras ventas", 42),
    ]),
    ("Parte V  ·  Escalar", [
        ("16", "Errores comunes y como evitarlos", 44),
        ("17", "Checklist maestro", 46),
        ("18", "Recursos y proximos pasos", 48),
    ]),
]
for part, chs in chapters:
    c.setFillColor(LIME); c.setFont(FB, 9); c.drawString(20*mm, y, part.upper())
    y -= 14
    for num, t, p in chs:
        c.setFillColor(DARK); c.setFont(FB, 11); c.drawString(20*mm, y, num)
        c.setFillColor(TEXT); c.setFont(F, 11); c.drawString(32*mm, y, t)
        # dots
        c.setFillColor(MUTED); c.setFont(F, 9)
        dotx = 32*mm + c.stringWidth(t, F, 11) + 4
        endx = PW - 30*mm
        c.drawString(dotx, y, "."*int((endx-dotx)/3))
        c.setFillColor(DARK); c.setFont(FB, 11)
        c.drawRightString(PW-20*mm, y, str(p))
        y -= 14
    y -= 6

# ================== PAGE 4: CARTA ==================
newpage(title="Carta del editor", chapter="Bienvenida")
y = PH - 40*mm
draw_h2("Bienvenido", 20*mm, y, size=22)
y -= 30
paras = [
    "El 87% de las personas que intentan vender en Amazon abandonan en los primeros 90 dias. No por falta de inteligencia, sino por falta de un sistema. Compran cursos sueltos, siguen gurus de TikTok y terminan con $5,000 USD de inventario muerto en su garaje.",
    "Este ebook documenta el sistema que usamos para lanzar productos en Amazon sin comprar stock por adelantado, manteniendo cumplimiento total con la politica de la plataforma y con margenes saludables desde la primera venta.",
    "No es teoria. Cada framework, plantilla y checklist proviene de operaciones reales con proveedores verificados, herramientas de fulfillment hibrido y catalogos de productos ganadores.",
    "Si estas dispuesto a tratar esto como un negocio (no como un hobby), las siguientes 50 paginas te entregan el plano completo. El resto depende de tu ejecucion.",
]
for p in paras:
    y = draw_para(p, 20*mm, y, PW-40*mm, size=11, leading=16)
    y -= 8

# signature block
y -= 20
c.setFillColor(LIME); c.rect(20*mm, y-30, 60, 2, fill=1, stroke=0)
c.setFillColor(DARK); c.setFont(FB, 12); c.drawString(20*mm, y-44, "Equipo Hipervinculo")
c.setFillColor(MUTED); c.setFont(F, 9); c.drawString(20*mm, y-56, "20+ anos  ·  200+ clientes  ·  $92M+ generados")

# ================== PARTE I ==================
# PAGE 5: Parte I divider + Cap 1
newpage(bg=DARK)
# Override: no header for divider
page_bg(DARK)
c.setFillColor(LIME); c.rect(0, PH-8, PW, 8, fill=1, stroke=0)
footer()
y = PH/2 + 30
c.setFillColor(LIME); c.setFont(FB, 10); c.drawCentredString(PW/2, y+40, "PARTE I")
c.setFillColor(white); c.setFont(FB, 44); c.drawCentredString(PW/2, y, "Fundamentos")
c.setFillColor(LIME); c.rect(PW/2-30, y-20, 60, 3, fill=1, stroke=0)
c.setFillColor(CREAM); c.setFont(F, 12)
c.drawCentredString(PW/2, y-44, "Lo que debes entender antes de mover un dolar")

# PAGE 6: Cap 1 intro
newpage(title="Cap 01", chapter="Por que Amazon 2026")
chapter_hero("ch01")
y = PH - 40*mm
draw_chip("CAPITULO 01", 20*mm, y, fill=LIME, txt=DARK); y -= 18
draw_title("Por que Amazon en 2026", 20*mm, y, size=26); y -= 14
y -= 20
y = draw_para("Amazon mueve mas del 38% del comercio electronico de Estados Unidos. Mas de 300 millones de cuentas activas, 200 millones de miembros Prime y una infraestructura logistica que ningun marketplace ha logrado replicar.", 20*mm, y, PW-40*mm, size=11, leading=16)
y -= 14
# Stats row
stat_y = y - 50
for i, (val, lbl) in enumerate([("38%","del e-commerce US"),("300M+","cuentas activas"),("200M","miembros Prime"),("$574B","GMV anual")]):
    x = 20*mm + i*((PW-40*mm)/4)
    w = (PW-40*mm)/4 - 6
    c.setFillColor(white); c.roundRect(x, stat_y, w, 50, 8, fill=1, stroke=0)
    c.setFillColor(LIME); c.setFont(FB, 22); c.drawCentredString(x+w/2, stat_y+28, val)
    c.setFillColor(MUTED); c.setFont(F, 8); c.drawCentredString(x+w/2, stat_y+12, lbl)
y = stat_y - 20
y = draw_para("Pero la oportunidad no es solo el tamano del mercado. Es la asimetria: la mayoria de vendedores nuevos siguen el manual de 2018 (comprar 500 unidades a China, importar, esperar 90 dias, rezar). En 2026 hay una capa nueva de proveedores con MOQ bajo, fulfillment hibrido y politicas de Amazon que premian a quienes tienen control real del inventario.", 20*mm, y, PW-40*mm, size=11, leading=16)

# PAGE 7: Cap 1 continued + chart
newpage(title="Cap 01", chapter="Por que Amazon 2026")
y = PH - 40*mm
draw_h2("La oportunidad asimetrica", 20*mm, y, size=18); y -= 24
y = draw_para("Mientras 9 de cada 10 nuevos vendedores siguen el modelo tradicional, una minoria opera con modelos hibridos que reducen capital inicial hasta en 85%. Este ebook documenta ese modelo.", 20*mm, y, PW-40*mm, size=11, leading=16)
y -= 10
# Chart: growth of Amazon GMV
fig, ax = plt.subplots(figsize=(7,3.5))
yrs = [2020,2021,2022,2023,2024,2025,2026]
gmv = [380, 469, 502, 538, 574, 612, 660]
ax.bar(yrs, gmv, color="#2F4F3E", width=0.55)
ax.bar(yrs[-1:], gmv[-1:], color="#8BC34A", width=0.55)
ax.set_ylabel("GMV Amazon (Billones USD)")
ax.set_title("Crecimiento GMV Amazon 2020-2026 (estimado)", color="#2F4F3E", fontweight="bold")
for i, v in enumerate(gmv):
    ax.text(yrs[i], v+8, f"${v}B", ha="center", fontsize=8, color="#2F4F3E")
img = chart_to_img(fig)
c.drawImage(img, 20*mm, y-150, width=PW-40*mm, height=145, preserveAspectRatio=True, anchor='c')
y -= 160
c.setFillColor(LIGHT); c.roundRect(20*mm, y-80, PW-40*mm, 70, 8, fill=1, stroke=0)
c.setFillColor(DARK); c.setFont(FB, 11); c.drawString(28*mm, y-26, "Insight clave")
draw_para("Cada 1% de crecimiento del GMV de Amazon representa ~$6 billones adicionales fluyendo a vendedores third-party. La ventana sigue abierta, pero los reglas cambiaron: ahora gana quien sabe operar sin capital atrapado.", 28*mm, y-42, PW-56*mm, size=10, leading=14)

# PAGE 8: Cap 2
newpage(title="Cap 02", chapter="Mitos")
chapter_hero("ch02")
y = PH - 40*mm
draw_chip("CAPITULO 02", 20*mm, y, fill=LIME, txt=DARK); y -= 18
draw_title("Mitos del dropshipping en Amazon", 20*mm, y, size=22); y -= 14
y -= 20
mitos = [
    ("MITO 1", "Amazon prohibe el dropshipping.", "FALSO. Amazon permite dropshipping siempre que tu seas el vendedor de registro y el cliente reciba el paquete de tu marca, no del proveedor original."),
    ("MITO 2", "Sin FBA no puedes ser Prime.", "FALSO. Seller Fulfilled Prime (SFP) permite estatus Prime con tu propia logistica si cumples SLAs."),
    ("MITO 3", "Necesitas $10,000 USD para empezar.", "FALSO. Con proveedores MOQ bajo y fulfillment hibrido puedes lanzar tu primer SKU con $800-$1,500 USD."),
    ("MITO 4", "Los chinos te van a copiar de inmediato.", "PARCIAL. Es real, pero con marca, registro de marca en Amazon (Brand Registry) y ASIN propio se mitiga 80%."),
]
for tag, t, d in mitos:
    c.setFillColor(LIME); c.setFont(FB, 9); c.drawString(20*mm, y, tag)
    y -= 14
    c.setFillColor(DARK); c.setFont(FB, 13); c.drawString(20*mm, y, t)
    y -= 16
    y = draw_para(d, 20*mm, y, PW-40*mm, size=10, leading=14, color=MUTED)
    y -= 14

# PAGE 9: Cap 2 - more myths
newpage(title="Cap 02", chapter="Mitos")
y = PH - 40*mm
draw_h2("Mas mitos peligrosos", 20*mm, y, size=18); y -= 24
mitos = [
    ("MITO 5", "Vas a competir con Amazon mismo.", "PARCIAL. Amazon Basics compite en commodities. Si eliges nichos con diferenciacion (variantes, bundles, branding), Amazon no entra."),
    ("MITO 6", "Necesitas ser ciudadano americano.", "FALSO. LATAM, Europa y Asia pueden vender en Amazon US con LLC virtual y EIN."),
    ("MITO 7", "Sin video, no vendes.", "PARCIAL. El video acelera conversion 30-80%, pero hay top sellers con solo imagenes."),
    ("MITO 8", "Hay que pagar reviews falsos.", "PROHIBIDO. Es la forma mas rapida de suspension permanente. Hay 7 metodos legales que cubrimos en el capitulo 15."),
]
for tag, t, d in mitos:
    c.setFillColor(LIME); c.setFont(FB, 9); c.drawString(20*mm, y, tag)
    y -= 14
    c.setFillColor(DARK); c.setFont(FB, 13); c.drawString(20*mm, y, t)
    y -= 16
    y = draw_para(d, 20*mm, y, PW-40*mm, size=10, leading=14, color=MUTED)
    y -= 14
# suppliers image
# PAGE 10: Cap 3 - comparison table
newpage(title="Cap 03", chapter="FBA vs FBM vs Dropshipping")
chapter_hero("ch03")
y = PH - 40*mm
draw_chip("CAPITULO 03", 20*mm, y, fill=LIME, txt=DARK); y -= 18
draw_title("FBA vs FBM vs Dropshipping", 20*mm, y, size=22); y -= 14
y -= 20
y = draw_para("Existen 3 modelos principales para vender en Amazon. Entender sus diferencias en capital, control y margen es la decision mas importante antes de elegir tu primer SKU.", 20*mm, y, PW-40*mm, size=11, leading=16)
y -= 20

# Table
cols = ["Caracteristica","FBA","FBM","Dropshipping"]
rows = [
    ["Capital inicial","Alto ($5k+)","Medio ($2k+)","Bajo ($800+)"],
    ["Control inventario","Amazon","Tu","Proveedor"],
    ["Velocidad envio","1-2 dias","2-5 dias","5-15 dias"],
    ["Margen tipico","20-30%","30-45%","15-25%"],
    ["Riesgo stock muerto","Alto","Alto","Cero"],
    ["Prime elegible","Si auto","SFP","Limitado"],
    ["Escalabilidad","Alta","Media","Alta"],
    ["Recomendado para","Productos validados","Voluminosos","Nuevos sellers"],
]
col_w = [(PW-40*mm)*0.28, (PW-40*mm)*0.24, (PW-40*mm)*0.24, (PW-40*mm)*0.24]
table_x = 20*mm
y = draw_table(table_x, y, col_w, cols, rows, font_size=7.8, row_h=20, header_h=22)

# PAGE 11: Cap 3 cont
newpage(title="Cap 03", chapter="FBA vs FBM vs Dropshipping")
y = PH - 40*mm
draw_h2("Cual elegir segun tu situacion", 20*mm, y, size=18); y -= 30
# 3 cards
card_w = (PW - 40*mm - 24) / 3
for i, (titulo, perfil, recom, color) in enumerate([
    ("FBA puro","Tienes $5k+ y producto validado","Empieza con 100 unidades, prueba 60 dias",DARK),
    ("FBM tradicional","Vendes voluminosos o fragiles","Negocia con courier local primero",LIME),
    ("Dropshipping hibrido","Empiezas con menos de $2k","Sistema de este ebook: paginas 34-37",DARK),
]):
    x = 20*mm + i*(card_w+12)
    c.setFillColor(color); c.roundRect(x, y-200, card_w, 195, 10, fill=1, stroke=0)
    c.setFillColor(LIME if color==DARK else DARK); c.setFont(FB, 12)
    c.drawString(x+14, y-30, titulo)
    c.setFillColor(white if color==DARK else DARK); c.setFont(F, 9)
    draw_para(perfil, x+14, y-50, card_w-28, size=9, leading=12, color=(white if color==DARK else DARK))
    c.setFillColor(white if color==DARK else DARK); c.setFont(FB, 9)
    c.drawString(x+14, y-130, "RECOMENDACION:")
    draw_para(recom, x+14, y-145, card_w-28, size=9, leading=12, color=(white if color==DARK else DARK))
y -= 220
y = draw_para("Este ebook se enfoca en el tercer modelo: dropshipping hibrido con proveedores verificados. Es el que mas barreras de entrada baja y el que mas se beneficia de las plantillas y frameworks que viene a continuacion.", 20*mm, y, PW-40*mm, size=11, leading=16)

# PAGE 12: Cap 4 - legality
newpage(title="Cap 04", chapter="Es legal?")
chapter_hero("ch04")
y = PH - 40*mm
draw_chip("CAPITULO 04", 20*mm, y, fill=LIME, txt=DARK); y -= 18
draw_title("Es legal? Politicas Amazon 2026", 20*mm, y, size=22); y -= 14
y -= 20
y = draw_para("Amazon permite dropshipping bajo condiciones especificas. Violarlas no es una multa: es suspension de cuenta. Estas son las 4 reglas no negociables.", 20*mm, y, PW-40*mm, size=11, leading=16)
y -= 20
rules = [
    ("01", "Tu eres el seller of record", "El packing slip, factura y cualquier insercion debe identificarte a ti como vendedor. Nunca al proveedor."),
    ("02", "No usar otra cuenta retail como proveedor", "Comprar en Walmart/Target y reenviar al cliente de Amazon esta explicitamente prohibido."),
    ("03", "Responsabilidad total ante el cliente", "Devoluciones, reembolsos y disputas son tuyos. No puedes redirigir al cliente al proveedor."),
    ("04", "Cumplimiento con tiempos prometidos", "Si prometes 5 dias, el cliente recibe en 5 dias. Late shipment rate > 4% = riesgo de suspension."),
]
for n, t, d in rules:
    c.setFillColor(LIME); c.circle(24*mm, y+2, 9, fill=1, stroke=0)
    c.setFillColor(DARK); c.setFont(FB, 10); c.drawCentredString(24*mm, y-1, n)
    c.setFillColor(DARK); c.setFont(FB, 12); c.drawString(36*mm, y, t)
    y -= 14
    y = draw_para(d, 36*mm, y, PW-56*mm, size=10, leading=14, color=MUTED)
    y -= 16

# PAGE 13: Cap 4 cont + checklist
newpage(title="Cap 04", chapter="Es legal?")
y = PH - 40*mm
draw_h2("Checklist de cumplimiento", 20*mm, y, size=18); y -= 30
# checklist
items = [
    "Mi proveedor acepta enviar SIN su marca en el paquete",
    "Puedo incluir mi packing slip personalizado",
    "Tengo un sistema para responder en menos de 24h",
    "Mi proveedor tiene capacidad para 30+ ordenes/dia",
    "Conozco el lead time real (no el prometido) del proveedor",
    "Tengo plan B con un segundo proveedor backup",
    "He leido la Drop Shipping Policy de Amazon Seller Central",
    "Tengo presupuesto para reembolsos del 5% de las ventas",
    "Mi LLC/sociedad esta registrada con EIN/Tax ID",
    "Tengo cuenta bancaria empresarial separada de personal",
    "Configure un Customer Service email profesional",
    "Cuento con seguro de responsabilidad (recomendado)",
]
for it in items:
    c.setStrokeColor(LIME); c.setLineWidth(1.5)
    c.rect(20*mm, y-3, 12, 12, fill=0, stroke=1)
    c.setFillColor(TEXT); c.setFont(F, 10)
    draw_para(it, 24*mm+8, y+4, PW-44*mm-8, size=10, leading=12)
    y -= 18

# ================== PARTE II ==================
# PAGE 14: divider
newpage()
page_bg(DARK)
c.setFillColor(LIME); c.rect(0, PH-8, PW, 8, fill=1, stroke=0)
footer()
y = PH/2 + 30
c.setFillColor(LIME); c.setFont(FB, 10); c.drawCentredString(PW/2, y+40, "PARTE II")
c.setFillColor(white); c.setFont(FB, 44); c.drawCentredString(PW/2, y, "El modelo")
c.setFillColor(LIME); c.rect(PW/2-30, y-20, 60, 3, fill=1, stroke=0)
c.setFillColor(CREAM); c.setFont(F, 12)
c.drawCentredString(PW/2, y-44, "El sistema completo, capa por capa")

# PAGE 15: Cap 5 - flow diagram
newpage(title="Cap 05", chapter="Vision general")
chapter_hero("ch05")
y = PH - 40*mm
draw_chip("CAPITULO 05", 20*mm, y, fill=LIME, txt=DARK); y -= 18
draw_title("Vision general del sistema", 20*mm, y, size=24); y -= 14
y -= 20
y = draw_para("El sistema completo tiene 6 capas. Cada una resuelve un problema especifico y se conecta con la siguiente. Esta es la vista de pajaro:", 20*mm, y, PW-40*mm, size=11, leading=16)
y -= 20

# Flow diagram drawn natively for crisp, non-overlapping PDF text
draw_flow_boxes(MARGIN, y-62, CONTENT_W, ["Nicho", "Producto", "Proveedor", "Listing", "Fulfillment", "Venta"], [DARK, DARK, DARK, DARK, DARK, LIME], box_h=22*mm, gap=5*mm)
y -= 90
# detail boxes
detail = [
    ("Nicho","Categoria con demanda probada y baja saturacion"),
    ("Producto","SKU con criterios de margen, peso, BSR"),
    ("Proveedor","Verificado en Alibaba/Shenzhen Stock"),
    ("Listing","Optimizado para algoritmo A10"),
    ("Fulfillment","Hibrido: 3PL US + proveedor backup"),
    ("Venta","PPC + organico + email de seguimiento"),
]
for i, (t, d) in enumerate(detail[:3]):
    x = 20*mm + i*((PW-40*mm)/3)
    w = (PW-40*mm)/3 - 6
    c.setFillColor(LIME); c.setFont(FB, 10); c.drawString(x, y, t)
    c.setFillColor(MUTED); c.setFont(F, 9)
    draw_para(d, x, y-12, w, size=9, leading=12, color=MUTED)
y -= 50
for i, (t, d) in enumerate(detail[3:]):
    x = 20*mm + i*((PW-40*mm)/3)
    w = (PW-40*mm)/3 - 6
    c.setFillColor(LIME); c.setFont(FB, 10); c.drawString(x, y, t)
    c.setFillColor(MUTED); c.setFont(F, 9)
    draw_para(d, x, y-12, w, size=9, leading=12, color=MUTED)

# PAGE 16: Cap 5 cont
newpage(title="Cap 05", chapter="Vision general")
y = PH - 40*mm
draw_h2("Timeline realista", 20*mm, y, size=18); y -= 30
# Timeline
weeks = [
    ("Semana 1-2", "Investigacion de nicho y producto", LIME),
    ("Semana 3-4", "Contacto y negociacion con 5 proveedores", DARK),
    ("Semana 5", "Muestras y validacion de calidad", LIME),
    ("Semana 6", "Setup de listing, fotos, copy", DARK),
    ("Semana 7", "Pre-launch: friends & family + reviews iniciales", LIME),
    ("Semana 8", "Lanzamiento PPC + organico", DARK),
    ("Mes 3", "Optimizacion y escalado", LIME),
]
for i, (w, d, col) in enumerate(weeks):
    c.setFillColor(col); c.circle(28*mm, y+4, 6, fill=1, stroke=0)
    if i < len(weeks)-1:
        c.setStrokeColor(LIGHT); c.setLineWidth(2)
        c.line(28*mm, y-2, 28*mm, y-22)
    c.setFillColor(DARK); c.setFont(FB, 10); c.drawString(38*mm, y+4, w)
    c.setFillColor(TEXT); c.setFont(F, 10); c.drawString(38*mm, y-8, d)
    y -= 28
y -= 10
c.setFillColor(LIGHT); c.roundRect(20*mm, y-70, PW-40*mm, 60, 8, fill=1, stroke=0)
c.setFillColor(DARK); c.setFont(FB, 11); c.drawString(28*mm, y-26, "Realidad vs marketing")
draw_para("Los gurus de YouTube prometen 'tu primer $10k en 30 dias'. Los datos reales: el seller promedio rentable alcanza break-even al dia 75-90 y los primeros $10k de ganancia (no ventas) al mes 5-7.", 28*mm, y-42, PW-56*mm, size=10, leading=13)

# PAGE 17: Cap 6 - niche selection
newpage(title="Cap 06", chapter="Seleccion de nicho")
chapter_hero("ch06")
y = PH - 40*mm
draw_chip("CAPITULO 06", 20*mm, y, fill=LIME, txt=DARK); y -= 18
draw_title("Seleccion de nicho rentable", 20*mm, y, size=24); y -= 14
y -= 20
y = draw_para("Elegir el nicho equivocado es el error mas caro. Estos son los 5 filtros que aplicamos antes de invertir un solo dolar en investigacion profunda.", 20*mm, y, PW-40*mm, size=11, leading=16)
y -= 20
filters = [
    ("01  ·  Demanda probada", "Busquedas mensuales > 5,000 en Amazon (validado con Helium 10 o similar)."),
    ("02  ·  Margen tras fees", "Despues de referral fee (15%) y fulfillment, queda al menos 25% de margen."),
    ("03  ·  Peso y volumen", "Ideal: menos de 1kg y menos de 30cm. Reduce costos de envio y devoluciones."),
    ("04  ·  Estacionalidad", "Demanda relativamente plana 12 meses (o pico estacional que conozcas)."),
    ("05  ·  Sin restricciones", "No es categoria gated, no requiere FDA, no necesita certificaciones complejas."),
]
for t, d in filters:
    c.setFillColor(DARK); c.setFont(FB, 12); c.drawString(20*mm, y, t)
    y -= 14
    y = draw_para(d, 20*mm, y, PW-40*mm, size=10, leading=14, color=MUTED)
    y -= 14

# PAGE 18: Cap 6 - research image
newpage(title="Cap 06", chapter="Seleccion de nicho")
y = PH - 40*mm
draw_h2("Categorias ganadoras 2026", 20*mm, y, size=18); y -= 20
# Chart of categories
fig, ax = plt.subplots(figsize=(7,3.2))
cats = ["Pet","Kitchen","Home","Beauty","Fitness","Office","Auto","Baby"]
growth = [22, 19, 17, 28, 15, 14, 11, 16]
colors_b = ["#2F4F3E" if g<20 else "#8BC34A" for g in growth]
ax.barh(cats, growth, color=colors_b)
ax.set_xlabel("Crecimiento YoY (%)")
ax.set_title("Categorias con mayor crecimiento Amazon 2026", color="#2F4F3E", fontweight="bold")
for i, v in enumerate(growth):
    ax.text(v+0.4, i, f"{v}%", va="center", fontsize=9, color="#2F4F3E")
img = chart_to_img(fig)
c.drawImage(img, 20*mm, y-150, width=PW-40*mm, height=140, preserveAspectRatio=True, anchor='c')
y -= 165
c.setFillColor(LIGHT); c.roundRect(20*mm, y-50, PW-40*mm, 40, 8, fill=1, stroke=0)
c.setFillColor(DARK); c.setFont(FB, 10); c.drawString(28*mm, y-20, "Insight:")
draw_para("Las categorias en lima superan 20% YoY. Beauty lidera con 28%, impulsada por productos K-beauty y nichos masculinos no atendidos por marcas grandes.", 28*mm, y-32, PW-56*mm, size=9, leading=12)

# PAGE 19: Cap 7 - winning product criteria
newpage(title="Cap 07", chapter="Producto ganador")
chapter_hero("ch07")
y = PH - 40*mm
draw_chip("CAPITULO 07", 20*mm, y, fill=LIME, txt=DARK); y -= 18
draw_title("Criterios de producto ganador", 20*mm, y, size=24); y -= 14
y -= 20
y = draw_para("Despues de auditar 1,200+ SKUs rentables, identificamos 32 criterios. Aqui los 10 mas decisivos. El checklist completo esta en la pagina 21.", 20*mm, y, PW-40*mm, size=11, leading=16)
y -= 18
crit = [
    "Precio venta entre $20 y $70 USD",
    "BSR entre 500 y 5,000 en su subcategoria",
    "Menos de 300 reviews en el top 10",
    "Top 3 listings con rating < 4.3 (oportunidad)",
    "Variantes posibles (color/talla/sabor)",
    "Diferenciacion clara: bundle, packaging, garantia",
    "Reventa repetida (consumible o desgaste)",
    "Peso < 1 kg, lado < 30 cm",
    "Sin riesgos legales (electronicos, ingestibles)",
    "Comprable de al menos 3 proveedores",
]
for it in crit:
    c.setFillColor(LIME); c.setFont(FB, 10); c.drawString(20*mm, y, "+")
    c.setFillColor(TEXT); c.setFont(F, 10.5); c.drawString(28*mm, y, it)
    y -= 17

# PAGE 20: Cap 7 - matrix
newpage(title="Cap 07", chapter="Producto ganador")
y = PH - 40*mm
draw_h2("Matriz BSR vs Reviews", 20*mm, y, size=18); y -= 24
y = draw_para("Cruzar el ranking de ventas (BSR) con la cantidad de reviews del top 3 revela la zona dorada: alta demanda con baja barrera de entrada.", 20*mm, y, PW-40*mm, size=11, leading=16)
y -= 10
fig, ax = plt.subplots(figsize=(7,5))
np.random.seed(7)
xs = np.random.uniform(100, 8000, 60)
ys = np.random.uniform(20, 2000, 60)
colors_pts = []
for x, yv in zip(xs, ys):
    if x < 5000 and yv < 300: colors_pts.append("#8BC34A")
    elif x < 10000 and yv < 800: colors_pts.append("#2F4F3E")
    else: colors_pts.append("#CCCCCC")
ax.scatter(xs, ys, c=colors_pts, s=60, alpha=0.85, edgecolors="none")
ax.axvspan(0, 5000, ymin=0, ymax=0.15, alpha=0.1, color="#8BC34A")
ax.axhspan(0, 300, xmin=0, xmax=0.625, alpha=0.1, color="#8BC34A")
ax.set_xlabel("BSR (menor = mas ventas)")
ax.set_ylabel("Reviews promedio top 3")
ax.set_title("Zona dorada: BSR < 5,000 y < 300 reviews", color="#2F4F3E", fontweight="bold")
ax.annotate("Zona dorada", xy=(2500, 150), fontsize=11, fontweight="bold", color="#2F4F3E")
img = chart_to_img(fig)
c.drawImage(img, 20*mm, y-220, width=PW-40*mm, height=215, preserveAspectRatio=True, anchor='c')

# PAGE 21: Cap 7 - checklist complete
newpage(title="Cap 07", chapter="Producto ganador")
y = PH - 40*mm
draw_h2("Checklist 32 criterios", 20*mm, y, size=18); y -= 28
groups = [
    ("MERCADO", ["Demanda > 5k busquedas/mes","BSR 500-5000","< 300 reviews top 10","Sin marca dominante","Sin estacionalidad fuerte","Categoria abierta (no gated)","Trend Google > 0 ultimos 12m","Margen post-fees > 25%"]),
    ("PRODUCTO", ["Peso < 1kg","Lado < 30cm","No requiere baterias","No fragil","Sin liquidos","No requiere FDA","Color/variantes posibles","Customizable en packaging"]),
    ("PROVEEDOR", ["3+ proveedores comparables","MOQ < 100 unidades","Acepta dropship sin marca","Lead time < 15 dias","Acepta inspeccion 3rd party","Comunicacion en ingles","Pago Trade Assurance","Garantia de calidad"]),
    ("COMPETENCIA", ["Top 3 rating < 4.3","Listings con errores fixables","Sin variantes en top","Sin video en top 5","Bullets pobres en top","Imagenes mejorables","Categorizacion floja","Sin A+ Content"]),
]
col_w = (PW-40*mm)/2 - 8
for gi, (gt, items) in enumerate(groups):
    cx = 20*mm + (gi%2)*(col_w+16)
    cy = y - (gi//2)*220
    c.setFillColor(LIME); c.setFont(FB, 11); c.drawString(cx, cy, gt)
    c.setFillColor(LIME); c.rect(cx, cy-4, 30, 2, fill=1, stroke=0)
    yy = cy - 18
    for it in items:
        c.setStrokeColor(DARK); c.setLineWidth(1)
        c.rect(cx, yy-3, 9, 9, fill=0, stroke=1)
        c.setFillColor(TEXT); c.setFont(F, 9); c.drawString(cx+14, yy+1, it)
        yy -= 13

# PAGE 22: Cap 8 - research tools
newpage(title="Cap 08", chapter="Investigacion")
chapter_hero("ch08")
y = PH - 40*mm
draw_chip("CAPITULO 08", 20*mm, y, fill=LIME, txt=DARK); y -= 18
draw_title("Investigacion con datos reales", 20*mm, y, size=24); y -= 14
y -= 20
y = draw_para("La investigacion de producto no es 'me parece buena idea'. Es un proceso de 4 fases con herramientas especificas y outputs medibles.", 20*mm, y, PW-40*mm, size=11, leading=16)
y -= 20
phases = [
    ("Fase 1  ·  Descubrimiento","Generas 50-100 ideas usando filtros automatizados de Amazon Best Sellers, Movers & Shakers y tendencias estacionales.","2-4 horas"),
    ("Fase 2  ·  Validacion de demanda","Verificas que cada idea tiene busqueda real (volumen mensual) y no es un pico falso de TikTok.","1 dia"),
    ("Fase 3  ·  Analisis de competencia","Auditas top 10 listings: rating, reviews, fotos, copy, variantes, A+ Content.","2 dias"),
    ("Fase 4  ·  Validacion economica","Calculas margen real con calculadora Amazon FBA, incluyendo costos hidden (storage, returns, PPC).","1 dia"),
]
for t, d, time in phases:
    c.setFillColor(DARK); c.setFont(FB, 12); c.drawString(20*mm, y, t)
    c.setFillColor(LIME); c.setFont(FB, 9); c.drawRightString(PW-20*mm, y, time)
    y -= 14
    y = draw_para(d, 20*mm, y, PW-40*mm, size=10, leading=14, color=MUTED)
    y -= 14

# PAGE 23: Cap 8 - tools comparison
newpage(title="Cap 08", chapter="Investigacion")
y = PH - 40*mm
draw_h2("Herramientas de investigacion", 20*mm, y, size=18); y -= 24
y = draw_para("Hay 6 herramientas principales en el mercado. Comparativa rapida segun fase y presupuesto:", 20*mm, y, PW-40*mm, size=11, leading=16)
y -= 18
# Table
cols = ["Herramienta","Fortaleza","Precio/mes","Ideal para"]
rows = [
    ["Tool de scoring 1","Datos historicos profundos","$99-$199","Validacion seria"],
    ["Tool de scoring 2","Black Box, reverse ASIN","$79-$209","Investigacion masiva"],
    ["Extension de browser","Quick check al navegar","$0-$19","Ideas iniciales"],
    ["Scraper de keywords","Volumen real busquedas","$49-$119","SEO y PPC"],
    ["Tracker de ranks","Monitoreo competidores","$29-$99","Operacion diaria"],
    ["Hoja calculadora","Margen 100% transparente","Gratis","Validacion final"],
]
col_w = [(PW-40*mm)*0.28]*4
table_x = 20*mm
y = draw_table(table_x, y, col_w, cols, rows, font_size=7.5, row_h=21, header_h=22)
y -= 14
c.setFillColor(LIGHT); c.roundRect(20*mm, y-50, PW-40*mm, 40, 8, fill=1, stroke=0)
c.setFillColor(DARK); c.setFont(FB, 10); c.drawString(28*mm, y-20, "Nuestro stack recomendado para empezar:")
draw_para("Extension gratis + scoring tool 1 mes ($99) + hoja calculadora. Total: $99 para validar 20 productos.", 28*mm, y-32, PW-56*mm, size=9, leading=12, color=MUTED)

# PAGE 24: Cap 8 - process
newpage(title="Cap 08", chapter="Investigacion")
y = PH - 40*mm
draw_h2("Hoja de scoring", 20*mm, y, size=18); y -= 24
y = draw_para("Para cada producto candidato, asigna puntaje de 1-5 en cada criterio. Productos con puntaje total > 35 pasan a contacto con proveedor.", 20*mm, y, PW-40*mm, size=11, leading=16)
y -= 18
cols = ["Criterio","Peso","Producto A","Producto B","Producto C"]
rows = [
    ["BSR","3","5","3","4"],
    ["Reviews","3","4","2","5"],
    ["Margen","3","3","5","4"],
    ["Peso","2","5","4","2"],
    ["Variantes","2","3","5","3"],
    ["Estacionalidad","1","5","5","4"],
    ["Diferenciacion","3","4","3","5"],
    ["TOTAL","-","58","49","59"],
]
col_w = [(PW-40*mm)*0.32, (PW-40*mm)*0.12, (PW-40*mm)*0.18, (PW-40*mm)*0.18, (PW-40*mm)*0.20]
table_x = 20*mm
y = draw_table(table_x, y, col_w, cols, rows, font_size=8, row_h=21, header_h=22, highlights={7})

# ================== PARTE III ==================
# PAGE 25: divider
newpage()
page_bg(DARK)
c.setFillColor(LIME); c.rect(0, PH-8, PW, 8, fill=1, stroke=0)
footer()
y = PH/2 + 30
c.setFillColor(LIME); c.setFont(FB, 10); c.drawCentredString(PW/2, y+40, "PARTE III")
c.setFillColor(white); c.setFont(FB, 44); c.drawCentredString(PW/2, y, "Proveedores")
c.setFillColor(LIME); c.rect(PW/2-30, y-20, 60, 3, fill=1, stroke=0)
c.setFillColor(CREAM); c.setFont(F, 12)
c.drawCentredString(PW/2, y-44, "Donde encontrarlos, como hablarles, como verificarlos")

# PAGE 26: Cap 9
newpage(title="Cap 09", chapter="Proveedores")
chapter_hero("ch09")
y = PH - 40*mm
draw_chip("CAPITULO 09", 20*mm, y, fill=LIME, txt=DARK); y -= 18
draw_title("Encontrar proveedores en Alibaba", 20*mm, y, size=22); y -= 14
y -= 20
y = draw_para("Alibaba tiene mas de 2.8 millones de proveedores. La mayoria son trading companies (revendedores). El sistema que sigue te ayuda a llegar al fabricante real.", 20*mm, y, PW-40*mm, size=11, leading=16)
y -= 20
draw_h2("Filtros obligatorios", 20*mm, y, size=14); y -= 24
filters = [
    "Verified Supplier (medalla azul de Alibaba)",
    "Trade Assurance activo (proteccion de pagos)",
    "Years on Alibaba: minimo 5",
    "Response rate > 90% en menos de 24h",
    "Annual revenue declarado > $1M USD",
    "Tipo: Manufacturer (no trading company)",
    "Capacidad de OEM/ODM (personalizacion)",
    "Acepta inspeccion 3rd party (SGS, Bureau Veritas)",
]
for f in filters:
    c.setFillColor(LIME); c.setFont(FB, 12); c.drawString(20*mm, y, "+")
    c.setFillColor(TEXT); c.setFont(F, 10.5); c.drawString(28*mm, y, f)
    y -= 16
y -= 6
c.setFillColor(LIGHT); c.roundRect(20*mm, y-50, PW-40*mm, 40, 8, fill=1, stroke=0)
c.setFillColor(DARK); c.setFont(FB, 10); c.drawString(28*mm, y-20, "Atajo profesional:")
draw_para("Filtra por Gold Supplier 5+ years + Trade Assurance + Verified. De 2.8M proveedores caes a ~12,000. Despues filtras por nicho y quedan 50-100 reales.", 28*mm, y-32, PW-56*mm, size=9, leading=12, color=MUTED)

# PAGE 27: Cap 9 cont - chart
newpage(title="Cap 09", chapter="Proveedores")
y = PH - 40*mm
draw_h2("Distribucion de proveedores", 20*mm, y, size=18); y -= 24
fig, ax = plt.subplots(figsize=(7,3.8))
labels = ["Trading companies","Manufacturers reales","Manufacturers + OEM"]
sizes = [62, 28, 10]
colors_pie = ["#CCCCCC", "#2F4F3E", "#8BC34A"]
ax.pie(sizes, labels=labels, colors=colors_pie, autopct="%1.0f%%",
       textprops={"fontsize":11, "color":"#2F4F3E"}, startangle=90,
       wedgeprops={"edgecolor":"white","linewidth":2})
ax.set_title("Composicion real del directorio Alibaba", color="#2F4F3E", fontweight="bold")
img = chart_to_img(fig)
c.drawImage(img, 20*mm, y-180, width=PW-40*mm, height=170, preserveAspectRatio=True, anchor='c')
y -= 195
y = draw_para("Solo 10% de Alibaba puede personalizar tu marca (OEM). Esos son los que necesitas. Ignora el 90% restante.", 20*mm, y, PW-40*mm, size=11, leading=16)
y -= 18
c.setFillColor(LIME); c.roundRect(20*mm, y-50, PW-40*mm, 40, 8, fill=1, stroke=0)
c.setFillColor(DARK); c.setFont(FB, 10); c.drawString(28*mm, y-20, "Alternativas a Alibaba:")
draw_para("Shenzhen Stock Exchange listings, Global Sources, ferias 1688 (con agente), DHGate para muestras unitarias, y agente sourcing en Guangzhou.", 28*mm, y-32, PW-56*mm, size=9, leading=12, color=DARK)

# PAGE 28: Cap 10 - negotiation template 1
newpage(title="Cap 10", chapter="Negociacion")
chapter_hero("ch10")
y = PH - 40*mm
draw_chip("CAPITULO 10  ·  PLANTILLAS", 20*mm, y, fill=LIME, txt=DARK); y -= 18
draw_title("Plantilla 1: Primer contacto", 20*mm, y, size=22); y -= 14
y -= 14
y = draw_para("Mensaje inicial via Alibaba o WhatsApp. Objetivo: filtrar rapido. Si no responden en 24h con info concreta, pasa al siguiente.", 20*mm, y, PW-40*mm, size=10, leading=14, color=MUTED)
y -= 14
# template box
c.setFillColor(white); c.roundRect(20*mm, y-180, PW-40*mm, 175, 8, fill=1, stroke=0)
c.setStrokeColor(LIGHT); c.setLineWidth(1)
c.roundRect(20*mm, y-180, PW-40*mm, 175, 8, fill=0, stroke=1)
template1 = """Subject: Inquiry - [PRODUCT NAME] - Bulk order for Amazon US

Hi [Supplier Name],

I am sourcing a reliable manufacturer for [PRODUCT] to sell on
Amazon US under my own brand.

Please share:

1. MOQ for OEM (custom logo/packaging)
2. FOB price for 100, 500, 1000 units
3. Sample cost and lead time
4. Production lead time after PO
5. Acceptance of 3rd party inspection (SGS)
6. Trade Assurance availability

I have 3 other suppliers shortlisted. Looking for a long-term
partnership for monthly recurring orders.

Best regards,
[YOUR NAME]
[YOUR COMPANY LLC]"""
c.setFillColor(TEXT); c.setFont(F, 9)
yy = y - 18
for line in template1.split("\n"):
    c.drawString(28*mm, yy, line); yy -= 12

# PAGE 29: Plantilla 2: precio
newpage(title="Cap 10", chapter="Negociacion")
y = PH - 40*mm
draw_h2("Plantilla 2: Negociacion de precio", 20*mm, y, size=18); y -= 24
y = draw_para("Despues de recibir cotizacion, NUNCA aceptes la primera. La mayoria de proveedores chinos suben 15-30% al primer contacto.", 20*mm, y, PW-40*mm, size=10, leading=14, color=MUTED)
y -= 14
c.setFillColor(white); c.roundRect(20*mm, y-220, PW-40*mm, 215, 8, fill=1, stroke=0)
c.setStrokeColor(LIGHT); c.roundRect(20*mm, y-220, PW-40*mm, 215, 8, fill=0, stroke=1)
template2 = """Hi [Supplier Name],

Thank you for the quotation. The product specs look good.

However, the FOB price of [$X] per unit is higher than market.
I have a competing quote at [$X-15%] from another verified
supplier for the same specs.

To move forward with you I would need:

- Unit price: [$X-15%] FOB Shenzhen
- Sample cost waived (or credited on first PO)
- 30% deposit / 70% before shipment (Trade Assurance)
- Free design proof for packaging

If you can match this, I will commit to:

- First PO: [QUANTITY] units within 30 days
- Recurring orders: [QUANTITY] per month after launch

Please confirm or counter-offer by Friday.

Best,
[YOUR NAME]"""
c.setFillColor(TEXT); c.setFont(F, 9)
yy = y - 18
for line in template2.split("\n"):
    c.drawString(28*mm, yy, line); yy -= 12

# PAGE 30: Plantilla 3: muestras
newpage(title="Cap 10", chapter="Negociacion")
y = PH - 40*mm
draw_h2("Plantilla 3: Solicitud de muestras", 20*mm, y, size=18); y -= 24
y = draw_para("La muestra fisica es no-negociable. Nunca confirmes orden grande sin tener producto en mano y haberlo testeado.", 20*mm, y, PW-40*mm, size=10, leading=14, color=MUTED)
y -= 14
c.setFillColor(white); c.roundRect(20*mm, y-200, PW-40*mm, 195, 8, fill=1, stroke=0)
c.setStrokeColor(LIGHT); c.roundRect(20*mm, y-200, PW-40*mm, 195, 8, fill=0, stroke=1)
template3 = """Hi [Supplier Name],

Great, lets proceed with samples.

Please send 2 units of [PRODUCT] with the following specs:

- Color: [SPECIFY]
- Size/variant: [SPECIFY]
- Generic packaging (no branding yet)
- Standard certifications included if applicable

Shipping address:
[YOUR ADDRESS]
[CITY, STATE, ZIP, COUNTRY]

Preferred carrier: DHL Express (3-5 days)

I will cover sample + shipping cost via PayPal or Trade
Assurance. Please send Proforma Invoice.

Once samples are approved, I will issue the first PO within
7 business days.

Best,
[YOUR NAME]"""
c.setFillColor(TEXT); c.setFont(F, 9)
yy = y - 18
for line in template3.split("\n"):
    c.drawString(28*mm, yy, line); yy -= 12

# PAGE 31: Cap 11 - verification checklist
newpage(title="Cap 11", chapter="Verificacion")
chapter_hero("ch11")
y = PH - 40*mm
draw_chip("CAPITULO 11", 20*mm, y, fill=LIME, txt=DARK); y -= 18
draw_title("Verificacion y debido proceso", 20*mm, y, size=22); y -= 14
y -= 20
y = draw_para("Antes de transferir mas de $1,000 USD a un proveedor nuevo, completa esta verificacion. Toma 2 horas y previene el 95% de las estafas.", 20*mm, y, PW-40*mm, size=11, leading=16)
y -= 18
items = [
    "Numero de licencia de negocio verificable en GACC.gov.cn",
    "Direccion fisica de fabrica visible en Google Maps",
    "Video llamada con tour de fabrica solicitada",
    "Referencias de 2 clientes anteriores (no listadas en Alibaba)",
    "Inspeccion de muestra contra QC Checklist documentado",
    "Trade Assurance activado para la orden completa",
    "Pagos solo via Trade Assurance, TT con clausula de inspeccion o LC",
    "Nunca pagos a cuentas personales (WeChat, Western Union)",
    "Verificacion de email corporativo (no Gmail/Yahoo)",
    "Numero de telefono fijo de empresa (no solo celular)",
    "Tiempo en Alibaba > 5 anos con reviews verificadas",
    "Capacidad de OEM probada en el portfolio",
]
for it in items:
    c.setStrokeColor(LIME); c.setLineWidth(1.5)
    c.rect(20*mm, y-3, 11, 11, fill=0, stroke=1)
    c.setFillColor(TEXT); c.setFont(F, 10)
    draw_para(it, 35*mm, y+5, PW-55*mm, size=10, leading=12)
    y -= 16

# PAGE 32: Cap 11 cont - red flags
newpage(title="Cap 11", chapter="Verificacion")
y = PH - 40*mm
draw_h2("Red flags: cuando huir", 20*mm, y, size=18); y -= 24
y = draw_para("Si detectas 2 o mas de estos en un mismo proveedor, descartalo. No importa que precio te ofrezca.", 20*mm, y, PW-40*mm, size=11, leading=16)
y -= 18
flags = [
    ("Pide pago completo por adelantado", "Profesional acepta 30/70 con Trade Assurance"),
    ("Precio 40% debajo de la competencia", "Calidad inferior o estafa directa"),
    ("Email personal (Gmail/QQ)", "Empresa real tiene dominio propio"),
    ("Sin reviews o solo 5 estrellas perfectas", "Reviews compradas, sin trayectoria real"),
    ("Negativa a video llamada", "Probable trading company sin fabrica"),
    ("Cambian de banco o cuenta a ultima hora", "Hijacking de email, transferencia fraudulenta"),
    ("MOQ extremadamente alto sin negociacion", "No tiene experiencia con clientes pequenos"),
    ("Demoran > 48h en responder mensajes basicos", "Operacion saturada o desinteresada"),
]
for f, exp in flags:
    c.setFillColor(HexColor("#C0392B")); c.circle(24*mm, y+2, 7, fill=1, stroke=0)
    c.setFillColor(white); c.setFont(FB, 10); c.drawCentredString(24*mm, y-1, "!")
    c.setFillColor(DARK); c.setFont(FB, 11); c.drawString(36*mm, y, f)
    y -= 12
    c.setFillColor(MUTED); c.setFont(F, 9); c.drawString(36*mm, y, exp)
    y -= 18

# PAGE 33: Cap 11 - sample QC
newpage(title="Cap 11", chapter="Verificacion")
y = PH - 40*mm
draw_h2("QC Checklist para muestras", 20*mm, y, size=18); y -= 24
y = draw_para("Al recibir la muestra, evalua sistematicamente en estas 6 dimensiones. Documenta con fotos y puntua 1-5.", 20*mm, y, PW-40*mm, size=11, leading=16)
y -= 18
dims = [
    ("Apariencia visual","Acabados, simetria, color, defectos visibles"),
    ("Funcionalidad","Hace lo que promete, durabilidad basica"),
    ("Materiales","Tacto, peso, ausencia de olores quimicos"),
    ("Packaging","Resistencia al transporte, presentacion"),
    ("Etiquetado","Cumple con FCC, FDA, CPSC segun aplique"),
    ("Reproducibilidad","Las 2 muestras son identicas entre si"),
]
for t, d in dims:
    c.setFillColor(LIME); c.rect(20*mm, y-8, 8, 8, fill=1, stroke=0)
    c.setFillColor(DARK); c.setFont(FB, 11); c.drawString(32*mm, y, t)
    y -= 12
    c.setFillColor(MUTED); c.setFont(F, 9); c.drawString(32*mm, y, d)
    y -= 18
y -= 6
c.setFillColor(LIGHT); c.roundRect(20*mm, y-70, PW-40*mm, 60, 8, fill=1, stroke=0)
c.setFillColor(DARK); c.setFont(FB, 11); c.drawString(28*mm, y-22, "Regla del 8/10")
draw_para("Cualquier dimension con puntaje < 4/5 = pide segunda revision al proveedor. Total promedio < 4.0 = busca otro proveedor. La calidad de la muestra es el techo de tu producto final.", 28*mm, y-38, PW-56*mm, size=10, leading=13)

# ================== PARTE IV ==================
# PAGE 34: divider
newpage()
page_bg(DARK)
c.setFillColor(LIME); c.rect(0, PH-8, PW, 8, fill=1, stroke=0)
footer()
y = PH/2 + 30
c.setFillColor(LIME); c.setFont(FB, 10); c.drawCentredString(PW/2, y+40, "PARTE IV")
c.setFillColor(white); c.setFont(FB, 44); c.drawCentredString(PW/2, y, "Operacion")
c.setFillColor(LIME); c.rect(PW/2-30, y-20, 60, 3, fill=1, stroke=0)
c.setFillColor(CREAM); c.setFont(F, 12)
c.drawCentredString(PW/2, y-44, "Fulfillment, margenes, listing y lanzamiento")

# PAGE 35: Cap 12 - fulfillment
newpage(title="Cap 12", chapter="Fulfillment hibrido")
chapter_hero("ch12")
y = PH - 40*mm
draw_chip("CAPITULO 12", 20*mm, y, fill=LIME, txt=DARK); y -= 18
draw_title("Fulfillment hibrido paso a paso", 20*mm, y, size=22); y -= 14
y -= 20
y = draw_para("El modelo hibrido combina lo mejor del dropshipping (sin stock) con lo mejor de FBA (velocidad Prime). Tres capas trabajando en paralelo:", 20*mm, y, PW-40*mm, size=11, leading=16)
y -= 14
layers = [
    ("Capa 1  ·  3PL en US","Almacena 30-60 unidades en warehouse Texas/Pennsylvania. Envia en 2-3 dias. Cubre el 70% de demanda."),
    ("Capa 2  ·  Dropship proveedor","Para picos: el proveedor envia directo via DHL Express en 5-7 dias. Cubre el 25% de demanda."),
    ("Capa 3  ·  FBA estrategico","Solo los SKUs validados con +50 unidades/mes pasan a FBA Prime. Cubre el 5% top sellers."),
]
for t, d in layers:
    c.setFillColor(DARK); c.setFont(FB, 11); c.drawString(20*mm, y, t)
    y -= 14
    y = draw_para(d, 20*mm, y, PW-40*mm, size=10, leading=14, color=MUTED)
    y -= 12

# PAGE 36: Cap 12 - 3PL comparison
newpage(title="Cap 12", chapter="Fulfillment hibrido")
y = PH - 40*mm
draw_h2("Eleccion de 3PL en US", 20*mm, y, size=18); y -= 24
y = draw_para("El 3PL es la pieza mas critica del modelo. Debe integrar con Amazon, manejar returns y tener tarifas escalonadas.", 20*mm, y, PW-40*mm, size=11, leading=16)
y -= 18
cols = ["Criterio","Min aceptable","Ideal"]
rows = [
    ["Pick & Pack","< $3.50/orden","< $2.50/orden"],
    ["Storage mensual","< $25/cuft","< $15/cuft"],
    ["Returns","< $5/orden","Incluido"],
    ["Integracion Amazon","ShipStation API","Direct EDI"],
    ["Tiempo procesamiento","48h","Mismo dia"],
    ["Cobertura geografica","1 warehouse","2+ warehouses"],
    ["Insurance","Opcional","Incluido"],
    ["Minimo mensual","< $200","Sin minimo"],
]
col_w = [(PW-40*mm)*0.40, (PW-40*mm)*0.30, (PW-40*mm)*0.30]
table_x = 20*mm
y = draw_table(table_x, y, col_w, cols, rows, font_size=8.2, row_h=21, header_h=22)

# PAGE 37: Cap 12 - flow operativo
newpage(title="Cap 12", chapter="Fulfillment hibrido")
y = PH - 40*mm
draw_h2("Flujo operativo de una orden", 20*mm, y, size=18); y -= 24
c.setFillColor(DARK); c.setFont(FB, 11); c.drawString(MARGIN, y, "De compra a entrega: flujo automatizado")
y -= 40
draw_flow_boxes(MARGIN, y-6, CONTENT_W, ["Cliente compra", "ERP confirma", "Stock 3PL?", "3PL envia"], [LIME, DARK, DARK, LIME], box_h=20*mm, gap=7*mm)
y -= 38*mm
draw_flow_boxes(MARGIN+CONTENT_W*0.25, y, CONTENT_W*0.62, ["Trigger dropship", "Tracking automatico", "Cliente recibe + review"], [LIME, DARK, LIME], box_h=20*mm, gap=7*mm)
y -= 78
c.setFillColor(LIGHT); c.roundRect(20*mm, y-60, PW-40*mm, 50, 8, fill=1, stroke=0)
c.setFillColor(DARK); c.setFont(FB, 11); c.drawString(28*mm, y-22, "Tiempo total maximo de respuesta")
draw_para("Compra a tracking visible: < 24 horas. Es lo que Amazon mide como Order Defect Rate. Mantener este KPI < 1% es la clave para sobrevivir.", 28*mm, y-38, PW-56*mm, size=10, leading=13)

# PAGE 38: Cap 13 - margenes
newpage(title="Cap 13", chapter="Margenes")
chapter_hero("ch13")
y = PH - 40*mm
draw_chip("CAPITULO 13", 20*mm, y, fill=LIME, txt=DARK); y -= 18
draw_title("Margenes, pricing y simulaciones", 20*mm, y, size=22); y -= 14
y -= 14
y = draw_para("Calcular el margen real (no el teorico) es lo que separa al seller que sobrevive del que quiebra al sexto mes.", 20*mm, y, PW-40*mm, size=11, leading=16)
y -= 18
# Cost breakdown
cols = ["Concepto","% sobre venta","USD en $39.99"]
rows = [
    ["Precio venta","100%","$39.99"],
    ["Referral fee Amazon","15%","-$6.00"],
    ["Costo producto FOB","22%","-$8.80"],
    ["Shipping a 3PL","4%","-$1.60"],
    ["3PL pick & pack","6%","-$2.40"],
    ["Returns reserve","3%","-$1.20"],
    ["PPC promedio","12%","-$4.80"],
    ["Margen bruto","38%","$15.19"],
    ["Operacion (10%)","10%","-$3.99"],
    ["Margen neto","28%","$11.20"],
]
col_w = [(PW-40*mm)*0.45, (PW-40*mm)*0.27, (PW-40*mm)*0.28]
table_x = 20*mm
y = draw_table(table_x, y, col_w, cols, rows, font_size=8.1, row_h=18, header_h=20, highlights={7,9})

# PAGE 39: Cap 13 chart
newpage(title="Cap 13", chapter="Margenes")
y = PH - 40*mm
draw_h2("Margen segun volumen mensual", 20*mm, y, size=18); y -= 24
y = draw_para("El margen mejora con volumen porque PPC, storage y operacion fija se diluyen. Modelo de break-even y crecimiento:", 20*mm, y, PW-40*mm, size=11, leading=16)
y -= 10
fig, ax = plt.subplots(figsize=(7,4))
units = [10, 25, 50, 100, 200, 400, 800]
margin = [8, 18, 25, 31, 35, 38, 40]
ax.plot(units, margin, color="#2F4F3E", linewidth=3, marker="o", markersize=8, markerfacecolor="#8BC34A")
ax.axhline(28, color="#8BC34A", linestyle="--", alpha=0.6)
ax.text(800, 29, "Target sano 28%", color="#8BC34A", fontsize=9, ha="right")
ax.set_xlabel("Unidades vendidas / mes")
ax.set_ylabel("Margen neto (%)")
ax.set_title("Margen neto vs volumen", color="#2F4F3E", fontweight="bold")
for u, m in zip(units, margin):
    ax.text(u, m+1.5, f"{m}%", ha="center", fontsize=9, color="#2F4F3E")
img = chart_to_img(fig)
c.drawImage(img, 20*mm, y-200, width=PW-40*mm, height=195, preserveAspectRatio=True, anchor='c')
y -= 215
c.setFillColor(LIGHT); c.roundRect(20*mm, y-40, PW-40*mm, 30, 8, fill=1, stroke=0)
c.setFillColor(DARK); c.setFont(FB, 9); c.drawString(28*mm, y-18, "Break-even tipico: 25 unidades/mes. Margen rentable: 50+ unidades/mes.")

# PAGE 40: Cap 13 - simulacion
newpage(title="Cap 13", chapter="Margenes")
y = PH - 40*mm
draw_h2("Simulacion: 3 escenarios", 20*mm, y, size=18); y -= 24
scenarios = [
    ("Conservador","50 unidades/mes","$700/mes neto","Mes 1-3 tipico", DARK),
    ("Base","150 unidades/mes","$2,200/mes neto","Mes 4-6 con PPC", LIME),
    ("Optimista","400 unidades/mes","$6,800/mes neto","Mes 7-12 escalado", DARK),
]
card_w = (PW-40*mm-24)/3
for i, (t, u, m, n, col) in enumerate(scenarios):
    x = 20*mm + i*(card_w+12)
    c.setFillColor(col); c.roundRect(x, y-220, card_w, 215, 10, fill=1, stroke=0)
    c.setFillColor(LIME if col==DARK else DARK); c.setFont(FB, 14)
    c.drawString(x+14, y-30, t)
    c.setFillColor(white if col==DARK else DARK); c.setFont(FB, 22)
    c.drawString(x+14, y-66, m.split(" ")[0])
    c.setFillColor(white if col==DARK else DARK); c.setFont(F, 9)
    c.drawString(x+14, y-82, "neto / mes")
    c.setFillColor(LIME if col==DARK else white); c.rect(x+14, y-94, 30, 2, fill=1, stroke=0)
    c.setFillColor(white if col==DARK else DARK); c.setFont(F, 9)
    c.drawString(x+14, y-114, u)
    c.drawString(x+14, y-130, n)
    # mini breakdown
    yy = y-160
    items = [("Venta","$39"),("Costo","-$8.80"),("Fees","-$13.20"),("Neto","$11.20")]
    for lbl, val in items:
        c.setFillColor(white if col==DARK else DARK); c.setFont(F, 8)
        c.drawString(x+14, yy, lbl)
        c.drawRightString(x+card_w-14, yy, val); yy -= 12
y -= 240
y = draw_para("Estos numeros asumen UN SKU. La mayoria de operaciones rentables tienen 3-5 SKUs activos al mes 6, multiplicando el resultado.", 20*mm, y, PW-40*mm, size=11, leading=16)

# PAGE 41: Cap 14 - listing
newpage(title="Cap 14", chapter="Listing")
chapter_hero("ch14")
y = PH - 40*mm
draw_chip("CAPITULO 14", 20*mm, y, fill=LIME, txt=DARK); y -= 18
draw_title("Listing optimizado para conversion", 20*mm, y, size=22); y -= 14
y -= 20
y = draw_para("Un listing optimizado puede duplicar tu CTR y subir conversion 30-60%. Anatomia de un listing ganador:", 20*mm, y, PW-40*mm, size=11, leading=16)
y -= 18
sections = [
    ("01  ·  Titulo (200 char)","Marca + producto + 3 keywords core + 2 beneficios + variante"),
    ("02  ·  Imagen principal","Producto sobre fondo blanco puro, ocupando 85% del frame"),
    ("03  ·  7 imagenes secundarias","Lifestyle, beneficios infografia, escala, dimensiones, packaging, garantia"),
    ("04  ·  Video","30-60 segundos. Hook < 3s, 3 beneficios, CTA al final"),
    ("05  ·  Bullets (5 puntos)","Empezar con MAYUSCULAS sobre beneficio. Cada bullet < 200 caracteres"),
    ("06  ·  Descripcion / A+","8-10 modulos visuales. Comparacion, casos de uso, garantia, FAQ"),
    ("07  ·  Backend keywords","250 caracteres con sinonimos, traducciones, errores comunes"),
    ("08  ·  Categoria + atributos","Maxima profundidad para aparecer en filtros"),
]
for t, d in sections:
    c.setFillColor(LIME); c.setFont(FB, 11); c.drawString(20*mm, y, t)
    y -= 12
    y = draw_para(d, 20*mm, y, PW-40*mm, size=10, leading=13, color=MUTED)
    y -= 10

# PAGE 42: Cap 14 - title formula
newpage(title="Cap 14", chapter="Listing")
y = PH - 40*mm
draw_h2("Formula de titulo ganador", 20*mm, y, size=18); y -= 24
y = draw_para("90% de los CTR vienen del titulo y la imagen principal. Esta formula viene de auditar 400+ listings top-ranked:", 20*mm, y, PW-40*mm, size=11, leading=16)
y -= 18
c.setFillColor(white); c.roundRect(20*mm, y-180, PW-40*mm, 175, 10, fill=1, stroke=0)
c.setStrokeColor(LIGHT); c.roundRect(20*mm, y-180, PW-40*mm, 175, 10, fill=0, stroke=1)
formula = "[MARCA] [PRODUCTO PRINCIPAL] [KEYWORD 1] [KEYWORD 2] [BENEFICIO CLAVE] [VARIANTE] [PACK]"
c.setFillColor(LIME); c.setFont(FB, 11); c.drawString(28*mm, y-22, "FORMULA:")
c.setFillColor(DARK); c.setFont(FB, 10)
draw_para(formula, 28*mm, y-40, PW-56*mm, size=10, leading=13, color=DARK)
y -= 70
c.setFillColor(LIME); c.setFont(FB, 11); c.drawString(28*mm, y-10, "EJEMPLO REAL:")
example = "Hipervinculo Botella Termica Acero Inoxidable 750ml - Boca Ancha - Sin BPA - Mantiene Frio 24h Calor 12h - Para Gym Trabajo Outdoor - Color Verde Bosque - Pack x1"
draw_para(example, 28*mm, y-28, PW-56*mm, size=10, leading=13, color=DARK)
y -= 120
y -= 20
y = draw_para("Verifica que tu titulo incluya las 3 keywords con mas volumen (no las 3 con menos competencia). Backend keywords cubren long-tail.", 20*mm, y, PW-40*mm, size=11, leading=16)

# PAGE 43: Cap 15 - launch
newpage(title="Cap 15", chapter="Lanzamiento")
chapter_hero("ch15")
y = PH - 40*mm
draw_chip("CAPITULO 15", 20*mm, y, fill=LIME, txt=DARK); y -= 18
draw_title("Lanzamiento y primeras ventas", 20*mm, y, size=22); y -= 14
y -= 14
y = draw_para("Las primeras 25 ventas y reviews son las mas dificiles y las que mas marcan el destino del listing. Estrategia de los primeros 30 dias:", 20*mm, y, PW-40*mm, size=11, leading=16)
y -= 16
phases = [
    ("Dia 1-3","Setup PPC: 3 campanas (exact, broad, auto). Budget $20/dia. Bid agresivo top of search."),
    ("Dia 4-10","Buscar 5-10 reviews via Vine Program (si elegible) o requests legitimos a familiares con cuenta antigua."),
    ("Dia 11-20","Optimizar PPC: matar keywords con ACoS > 80%, escalar las < 25%. Sumar campana sponsored brand."),
    ("Dia 21-30","Activar email post-compra (Manage Your Customer Engagement). Pedir review en dia 10 post-entrega."),
]
for t, d in phases:
    c.setFillColor(LIME); c.setFont(FB, 11); c.drawString(20*mm, y, t)
    y -= 14
    y = draw_para(d, 20*mm, y, PW-40*mm, size=10, leading=14, color=MUTED)
    y -= 12

# PAGE 44: Cap 15 cont - KPIs
newpage(title="Cap 15", chapter="Lanzamiento")
y = PH - 40*mm
draw_h2("KPIs criticos a monitorear", 20*mm, y, size=18); y -= 24
cols = ["KPI","Target dia 30","Target dia 90","Accion si fuera"]
rows = [
    ["CTR","> 0.4%","> 0.6%","Cambiar imagen principal"],
    ["Conversion rate","> 8%","> 12%","Optimizar precio y bullets"],
    ["ACoS","< 50%","< 30%","Pausar keywords malas"],
    ["Reviews count","> 5","> 25","Reactivar requests + Vine"],
    ["Rating average","> 4.0","> 4.3","Atender devoluciones y QC"],
    ["Order defect rate","< 1%","< 1%","Auditar 3PL y proveedor"],
    ["Sessions","> 300","> 1200","Sumar campana sponsored display"],
    ["Buy box %","> 95%","> 98%","Verificar precio y stock"],
]
col_w = [(PW-40*mm)*0.28, (PW-40*mm)*0.22, (PW-40*mm)*0.22, (PW-40*mm)*0.28]
table_x = 20*mm
y = draw_table(table_x, y, col_w, cols, rows, font_size=7.6, row_h=19, header_h=20)
y -= 16
c.setFillColor(LIGHT); c.roundRect(20*mm, y-50, PW-40*mm, 40, 8, fill=1, stroke=0)
c.setFillColor(DARK); c.setFont(FB, 11); c.drawString(28*mm, y-20, "Revision semanal obligatoria")
draw_para("Bloquea 2 horas cada lunes para revisar estos 8 KPIs. Ningun negocio Amazon escala sin esta disciplina operativa.", 28*mm, y-34, PW-56*mm, size=9, leading=12)

# ================== PARTE V ==================
# PAGE 45: Cap 16 - mistakes
newpage(title="Cap 16", chapter="Errores comunes")
chapter_hero("ch16")
y = PH - 40*mm
draw_chip("CAPITULO 16", 20*mm, y, fill=LIME, txt=DARK); y -= 18
draw_title("Errores comunes y como evitarlos", 20*mm, y, size=22); y -= 14
y -= 20
errors = [
    ("Lanzar sin testear muestra fisica","Pierdes meses + reputacion. NUNCA confirmes PO grande sin tener producto en mano."),
    ("Un solo proveedor","El dia que falla, tu negocio para. Siempre 2 proveedores backup validados."),
    ("PPC sin pausar keywords","ACoS > 100% durante semanas. Revisa cada 72h en los primeros 30 dias."),
    ("Precio competitivo bajo de margen","Crees que ganas con volumen, pero cada venta te resta. Mantener margen > 25%."),
    ("Reviews manipuladas","Una sola denuncia = suspension permanente. Usa Vine, requests y email legitimo."),
    ("Ignorar devoluciones","Returns > 10% degrada tu rank organico. Analiza y arregla la causa raiz."),
    ("Solo Amazon US","Diversifica: Mexico, Canada y Europa cuando un SKU se estabiliza."),
    ("Sin marca registrada","Sin Brand Registry los hijackers pueden tomar tu listing en 48h."),
]
for t, d in errors:
    c.setFillColor(HexColor("#C0392B")); c.setFont(FB, 10); c.drawString(20*mm, y, "X")
    c.setFillColor(DARK); c.setFont(FB, 11); c.drawString(28*mm, y, t)
    y -= 12
    y = draw_para(d, 28*mm, y, PW-48*mm, size=10, leading=13, color=MUTED)
    y -= 10

# PAGE 46: Cap 17 - master checklist
newpage(title="Cap 17", chapter="Checklist maestro")
chapter_hero("ch17")
y = PH - 40*mm
draw_chip("CAPITULO 17", 20*mm, y, fill=LIME, txt=DARK); y -= 18
draw_title("Checklist maestro de 90 dias", 20*mm, y, size=22); y -= 14
y -= 18
phases = [
    ("Semana 1-2  ·  Investigacion", [
        "Generar 50+ ideas de productos","Validar demanda con scoring tool","Auditar top 10 de cada finalista",
        "Calcular margen real de top 5","Elegir 1-2 productos para contactar",
    ]),
    ("Semana 3-5  ·  Sourcing", [
        "Contactar 10+ proveedores con plantilla 1","Recibir cotizaciones de 5","Negociar precio con plantilla 2",
        "Solicitar muestras 2 finalistas","Evaluar muestras con QC checklist",
    ]),
    ("Semana 6  ·  Setup", [
        "Confirmar 3PL con minimo 2 warehouses","Activar Amazon Seller Central US","Subir listing con titulo + 7 imagenes",
        "Configurar PPC base + sponsored brand","Activar Brand Registry si aplica",
    ]),
    ("Semana 7-12  ·  Lanzamiento", [
        "Recibir primer envio en 3PL","Activar PPC con $20/dia","Pedir review via Vine + email post-compra",
        "Revisar KPIs cada lunes","Activar segundo SKU al dia 75",
    ]),
]
col_w = (PW-40*mm)/2 - 8
for gi, (gt, items) in enumerate(phases):
    cx = 20*mm + (gi%2)*(col_w+16)
    cy = y - (gi//2)*210
    c.setFillColor(LIME); c.setFont(FB, 10); c.drawString(cx, cy, gt.upper())
    c.setFillColor(LIME); c.rect(cx, cy-4, 36, 2, fill=1, stroke=0)
    yy = cy - 18
    for it in items:
        c.setStrokeColor(DARK); c.setLineWidth(1)
        c.rect(cx, yy-3, 9, 9, fill=0, stroke=1)
        c.setFillColor(TEXT); c.setFont(F, 9)
        draw_para(it, cx+14, yy+1, col_w-14, size=9, leading=12)
        yy -= 22

# PAGE 47: Cap 17 cont - operacion mensual
newpage(title="Cap 17", chapter="Checklist maestro")
y = PH - 40*mm
draw_h2("Rutina operativa mensual", 20*mm, y, size=18); y -= 24
y = draw_para("Una vez en operacion, esta es la cadencia minima viable para mantener salud financiera y operativa:", 20*mm, y, PW-40*mm, size=11, leading=16)
y -= 18
freq = [
    ("DIARIO","Responder mensajes en < 24h. Revisar pedidos pendientes en 3PL. Monitorear stock minimo."),
    ("SEMANAL","Lunes: revision de KPIs (CTR, conversion, ACoS, reviews). Optimizar PPC. Reorder forecast."),
    ("QUINCENAL","Auditar listings: precio, imagenes, copy vs competencia. Test A/B de imagen principal."),
    ("MENSUAL","Cierre financiero. Pago a proveedores. Revision de margen real. Plan de SKU siguiente."),
    ("TRIMESTRAL","Auditoria de proveedores. Revision contractual de 3PL. Plan de expansion a otros marketplaces."),
]
for t, d in freq:
    c.setFillColor(LIME); c.roundRect(20*mm, y-12, 60, 16, 6, fill=1, stroke=0)
    c.setFillColor(DARK); c.setFont(FB, 9); c.drawString(28*mm, y-6, t)
    c.setFillColor(TEXT); c.setFont(F, 10)
    draw_para(d, 90*mm, y-4, PW-110*mm, size=10, leading=13)
    y -= 32

# PAGE 48: Cap 18 - recursos
newpage(title="Cap 18", chapter="Recursos")
chapter_hero("ch18")
y = PH - 40*mm
draw_chip("CAPITULO 18", 20*mm, y, fill=LIME, txt=DARK); y -= 18
draw_title("Recursos y proximos pasos", 20*mm, y, size=22); y -= 14
y -= 20
draw_h2("Stack recomendado", 20*mm, y, size=14); y -= 24
groups = [
    ("Investigacion", "Scoring tool + extension browser + Google Trends"),
    ("Sourcing", "Alibaba + Global Sources + agente verificado"),
    ("Verificacion", "QIMA o SGS para inspecciones (~$300/orden)"),
    ("3PL", "ShipBob, ShipMonk, Deliverr (comparar tarifas)"),
    ("Listing", "Helium 10 Listing Builder + fotografo Fiverr top-rated"),
    ("PPC", "Amazon Ads + tool de auto-pausing como Adtomic"),
    ("Brand", "Brand Registry + USPTO marca registrada"),
    ("Email", "ManyChat o GroupTrack para post-compra"),
]
for t, d in groups:
    c.setFillColor(DARK); c.setFont(FB, 11); c.drawString(20*mm, y, t)
    c.setFillColor(MUTED); c.setFont(F, 10); c.drawString(60*mm, y, d)
    y -= 16
y -= 10
draw_h2("Comunidad recomendada", 20*mm, y, size=14); y -= 24
y = draw_para("Subreddits: r/AmazonSeller, r/FulfillmentByAmazon. Grupos Discord especializados. Eventos: Prosper Show, Sellers Summit, Amazon Accelerate.", 20*mm, y, PW-40*mm, size=10, leading=14, color=MUTED)

# PAGE 49: Reflexion final
newpage(title="Reflexion final", chapter="Cierre")
chapter_hero("closing")
y = PH - 40*mm
draw_h2("El verdadero comienzo", 20*mm, y, size=22); y -= 32
y = draw_para("Leer este ebook fue el paso facil. El paso dificil empieza manana cuando abras Helium 10, filtres tus primeros 20 productos y mandes el primer mensaje a un proveedor en Alibaba.", 20*mm, y, PW-40*mm, size=11, leading=17)
y -= 14
y = draw_para("Amazon FBA sin inventario no es una formula magica. Es un sistema. Y los sistemas funcionan solo cuando los ejecutas con disciplina, semana tras semana, ajustando datos en lugar de opiniones.", 20*mm, y, PW-40*mm, size=11, leading=17)
y -= 14
y = draw_para("Tu primer SKU probablemente no sera un home run. El segundo tampoco. Pero al tercero o cuarto, cuando ya dominas sourcing, listings y PPC, encontraras ese producto que cambia todo. Esa es la realidad de cualquier seller que hoy factura 6 o 7 cifras en Amazon.", 20*mm, y, PW-40*mm, size=11, leading=17)
y -= 20
draw_h2("Tres principios para recordar", 20*mm, y, size=14); y -= 24
principles = [
    ("Datos > intuicion", "Cada decision debe estar respaldada por numeros de Helium 10, Jungle Scout o tu propia hoja de calculo."),
    ("Margen > volumen", "Es mejor vender 100 unidades al 30% de margen que 500 al 8%. El cashflow te lo agradecera."),
    ("Sistema > esfuerzo", "Automatiza repedidos, reviews, PPC bids. Tu tiempo vale mas escalando que ejecutando tareas manuales."),
]
for t, d in principles:
    c.setFillColor(LIME); c.setFont(FB, 11); c.drawString(20*mm, y, "*")
    c.setFillColor(DARK); c.setFont(FB, 11); c.drawString(28*mm, y, t)
    y = draw_para(d, 28*mm, y-14, PW-48*mm, size=10, leading=14, color=MUTED)
    y -= 12

# PAGE 50: Contraportada
newpage()
page_bg(DARK)
c.setFillColor(LIME); c.rect(0, PH-8, PW, 8, fill=1, stroke=0)
footer()
# Decorative lime accent (brand rule: logo cannot appear on dark bg without white plate)
c.setFillColor(LIME); c.setLineWidth(0)
c.circle(PW-55*mm, PH-75*mm, 40*mm, fill=0, stroke=1)
c.setStrokeColor(LIME); c.setLineWidth(1.5)
c.circle(PW-55*mm, PH-75*mm, 40*mm, fill=0, stroke=1)
c.circle(PW-55*mm, PH-75*mm, 28*mm, fill=0, stroke=1)
c.circle(PW-55*mm, PH-75*mm, 16*mm, fill=0, stroke=1)
y = PH - 60*mm
c.setFillColor(LIME); c.setFont(FB, 11); c.drawString(20*mm, y, "EDICION 2026")
y -= 24
c.setFillColor(white); c.setFont(FB, 34); c.drawString(20*mm, y, "Amazon FBA")
y -= 36
c.drawString(20*mm, y, "Sin Inventario")
y -= 20
c.setFillColor(LIME); c.rect(20*mm, y, 60, 3, fill=1, stroke=0)
y -= 40
c.setFillColor(CREAM); c.setFont(F, 12)
quotes = [
    "El 87% de los vendedores nuevos abandonan en 90 dias.",
    "Esta guia documenta el sistema que usan los que sobreviven",
    "y los que escalan.",
]
for q in quotes:
    c.drawString(20*mm, y, q); y -= 18

# bottom block
c.setFillColor(LIME); c.rect(0, 0, PW, 50*mm, fill=1, stroke=0)
# Logo on white plate (brand rule)
c.setFillColor(white); c.roundRect(16*mm, 28*mm, 54*mm, 18*mm, 4, fill=1, stroke=0)
try: c.drawImage(f"{ASSETS}/logo.png", 20*mm, 30*mm, width=46*mm, height=14*mm, mask='auto', preserveAspectRatio=True, anchor='w')
except: pass
c.setFillColor(DARK); c.setFont(FB, 10)
c.drawString(20*mm, 20*mm, "200+ CLIENTES  ·  20+ ANOS  ·  $92M+ GENERADOS")
c.setFillColor(DARK); c.setFont(F, 9)
c.drawString(20*mm, 12*mm, "www.hipervinculo.net  ·  info@hipervinculo.net")
c.setFillColor(DARK); c.setFont(FB, 9)
c.drawRightString(PW-20*mm, 12*mm, "(c) 2026 Hipervinculo. Todos los derechos reservados.")

c.save()
print(f"OK: {OUT}")
print(f"Pages: {page_num[0]}")
