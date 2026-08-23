# Implementation notes – v0.1

## Aktualny zakres

Projekt implementuje pełny skeleton homepage w kolejności:

1. Sticky Header
2. Hero
3. Czym jest Bagua Zhang
4. Trzy Okręgi
5. Korzyści
6. Jak wygląda trening
7. Program nauki
8. Dlaczego warto ćwiczyć z nami
9. Nauczyciel i instruktorzy
10. Zajęcia
11. Warsztaty / indywidualne
12. Artykuły
13. Kontakt
14. Footer

## Decyzje projektowe

- mobile-first,
- minimalny JavaScript,
- brak frameworka SPA,
- brak klasycznego formularza kontaktowego,
- sticky navigation,
- artykuły Markdown,
- social media ukryte dopóki URL nie zostanie wpisany w `site.ts`,
- WhatsApp ukryty dopóki nie zostanie wpisany numer,
- zdjęcia zastąpione neutralnymi placeholderami,
- YouTube nie jest jeszcze implementowany – zalecany lazy embed po dostarczeniu filmów,
- lokalizacja otwierana jako zewnętrzny link Google Maps zamiast embedded mapy.

## Następna iteracja

1. Obejrzeć stronę lokalnie na desktop/mobile.
2. Zebrać feedback do rytmu, typografii i długości sekcji.
3. Wymienić placeholdery na realne media.
4. Zoptymalizować logo do SVG i osobnych wariantów.
5. Uzupełnić dane kontaktowe.
6. Dodać GA4 i finalną politykę prywatności.
7. Deploy do GitHub Pages i podpięcie domeny.
