# BZ3O – Bagua Zhang – Szkoła Trzech Okręgów

Pierwszy działający szkielet strony szkoły, przygotowany w Astro zgodnie ze specyfikacją funkcjonalną, Content Architecture i Design System v0.1.

## Stack

- Astro 7
- statyczny output HTML/CSS/JS
- Astro Content Collections + Markdown dla artykułów
- `@astrojs/sitemap`
- self-hostowane przez build fonty Fontsource: Cormorant Garamond + Inter
- GitHub Actions + GitHub Pages
- opcjonalny GA4 uruchamiany dopiero po zgodzie użytkownika

## Lokalnie

```bash
npm install
npm run dev
```

Strona będzie domyślnie dostępna pod `http://localhost:4321`.

Weryfikacja przed publikacją:

```bash
npm run check
npm run build
npm run preview
```

## Konfiguracja szkoły

Najczęściej zmieniane dane są w:

`src/config/site.ts`

Uzupełnij tam później:

- numer telefonu,
- numer WhatsApp w formacie międzynarodowym, np. `48123123123`,
- Facebook / Instagram / YouTube.

## Zdjęcia

Aktualna wersja używa neutralnych komponentów `MediaPlaceholder.astro`.
Po przygotowaniu finalnych zdjęć placeholdery należy zastąpić obrazami zoptymalizowanymi do AVIF/WebP.

Logo koncepcyjne z aktualnego brand booka znajduje się w `public/logo/` jako materiał roboczy.

## Artykuły Markdown

Artykuły umieszczaj w:

`src/content/articles/`

Przykładowy frontmatter:

```yaml
---
title: "Tytuł"
description: "Opis do SEO i karty artykułu"
date: 2026-09-10
author: "BZ3O"
image: "/images/articles/nazwa.webp"
tags: ["bagua zhang", "trening"]
language: "pl"
draft: false
featured: true
---
```

Szkielety do planowanych artykułów mają `draft: true`, więc nie są publikowane.

## GA4

Skopiuj `.env.example` do `.env` i podaj:

```bash
PUBLIC_GA_ID=G-XXXXXXXXXX
```

Gdy ID jest puste, banner consent i Google Analytics nie są ładowane.
Gdy ID jest podane, GA4 jest ładowane dopiero po wyborze „Akceptuję”.

Na GitHub dodaj ID jako **Repository variable**:

`Settings → Secrets and variables → Actions → Variables → New repository variable`

Nazwa: `PUBLIC_GA_ID`

## GitHub Pages

Workflow znajduje się w:

`.github/workflows/deploy.yml`

Po utworzeniu repo `bz3o-website`:

1. Wgraj/pushnij projekt na branch `main`.
2. GitHub: `Settings → Pages`.
3. Jako Source wybierz **GitHub Actions**.
4. Workflow zbuduje i opublikuje stronę.
5. `public/CNAME` zawiera `baguatrzechokregow.pl`.
6. Skonfiguruj DNS domeny zgodnie z instrukcją GitHub Pages i włącz `Enforce HTTPS`.

Konfiguracja Astro jest ustawiona bez `base`, ponieważ docelowo używamy własnej domeny.
Przed podpięciem domeny podgląd pod `username.github.io/bz3o-website` może mieć niepoprawne root-relative linki. Jeśli chcesz przez jakiś czas testować wyłącznie pod adresem GitHub, ustaw tymczasowo `SITE_URL` i `BASE_PATH=/bz3o-website` i odpowiednio dostosuj linki; najprościej jednak od razu podłączyć domenę testową/główną po pierwszym deployu.

## Domeny pomocnicze

Docelowo:

- `baguatrzechokregow.pl` – domena kanoniczna,
- `baguakrakow.pl` – 301 do domeny głównej,
- `bz3o.pl` – 301 do domeny głównej.

Przekierowania domen pomocniczych należy skonfigurować u operatora DNS/hostingu przekierowań, nie w samym Astro.

## Do uzupełnienia przed uruchomieniem publicznym

- finalne zdjęcie Hero,
- zdjęcia Zhang Fengjuna, Renaty i Dominika,
- zdjęcia treningowe,
- numer telefonu i WhatsApp,
- komunikacja miejska,
- finalna polityka prywatności,
- GA4 Measurement ID,
- Search Console,
- pierwsze artykuły,
- ewentualne filmy YouTube.
