# Morrow — Udhëzues hap pas hapi

Ky udhëzues tregon si ta përdorësh faqen dhe si lidhen skedarët e kodit. Mund ta lexosh këtu në GitHub ose në editorin tënd.

## 1. Hape faqen

1. Gjej skedarin `index.html`.
2. Hape me dy klikime që të shfaqet në shfletues.
3. Lëviz poshtë ose përdor menynë për të parë veçoritë, çmimet dhe formularin.

Nuk duhet të instalosh programe shtesë për ta parë këtë demonstrim.

## 2. Hape hapësirën tënde demo

1. Te pjesa **Pricing**, zgjidh **Start your free trial** ose **Preview the team plan**. Kjo vetëm zgjedh çfarë etikete të shfaqet në panel; nuk fillon provë të vërtetë dhe nuk bën pagesë.
2. Shkruaj emrin dhe një email të vlefshëm.
3. Shtyp **Open my workspace**. Do të hapet paneli personal.
4. Shkruaj një detyrë te kutia dhe shtyp **Add task**.
5. Shëno kutinë pranë detyrës kur ta përfundosh.
6. Përdor **All**, **To do** ose **Completed** për të filtruar detyrat.
7. Shtyp **Delete** për të fshirë një detyrë.
8. Shtyp **View website** ose **Back to the home page** për t'u kthyer te faqja kryesore.

Profili dhe detyrat ruhen në shfletuesin aktual. Rifresko faqen për të parë që detyrat mbeten. Të dhënat nuk kalojnë automatikisht në pajisje ose shfletues tjetër.

## 3. Çfarë është demonstrim dhe çfarë është reale?

Faqja dhe lista e detyrave funksionojnë në shfletues. Të dhënat e provës ruhen lokalisht me `localStorage`; nuk dërgohen në server.

Nuk ka llogari online, provë 14-ditore që numërohet, email që dërgohet apo pagesë. Çmimi $8/person/muaj është vetëm tekst shembull. Për llogari reale dhe pagesa do të duheshin server dhe shërbim pagesash.

## 4. Çfarë bën secili skedar?

- `index.html` është skeleti i faqes: tekstet, titujt, butonat, formulari dhe paneli.
- `styles.css` përcakton pamjen: ngjyrat, hapësirat, fontet dhe përshtatjen për ekranet e vegjël. Kërko `@media` për rregullat e telefonit dhe tabletit.
- `script.js` përcakton sjelljen: menynë mobile, hapjen e panelit dhe shtimin, përfundimin, filtrimin e fshirjen e detyrave.

## 5. Si lidhen HTML, CSS dhe JavaScript?

Në `index.html`, këto rreshta ngarkojnë skedarët e tjerë:

```html
<link rel="stylesheet" href="styles.css" />
<script src="script.js" defer></script>
```

Rreshti i parë i thotë shfletuesit të përdorë pamjen nga `styles.css`. I dyti ngarkon funksionet nga `script.js`. Fjala `defer` bën që JavaScript-i të nisë pasi shfletuesi të ketë lexuar HTML-in.

## 6. Disa fjalë të kodit

- **HTML** — përmbajtja dhe struktura e faqes.
- **CSS** — pamja e elementeve HTML.
- **JavaScript** — veprimet që ndodhin kur shtyp butonat ose dërgon formularin.
- **`id`** — emër unik për një element; JavaScript mund ta gjejë, për shembull, me `querySelector("#task-form")`.
- **`class`** — emër që mund t'u caktohet elementeve për t'u dhënë pamje të njëjtë; në CSS shkruhet me pikë, si `.button`.
- **`addEventListener`** — lidh një veprim, si klikimi, me kodin që duhet të punojë.
- **`localStorage`** — hapësirë në shfletues për të ruajtur të dhëna në pajisjen tënde.

## 7. Si funksionojnë detyrat?

Në fillim të `script.js`, `PROFILE_KEY` dhe `TASKS_KEY` janë emrat që përdoren për të ruajtur profilin dhe detyrat. `saveData(...)` i ruan, ndërsa `loadSavedData(...)` i lexon kur hapet faqja.

Kur shton një detyrë, JavaScript e vendos në listën `tasks`, e ruan dhe thërret `renderTasks()` për ta shfaqur. Kur shënon një detyrë të përfunduar, filtron ose e fshin, lista ndryshon dhe paraqitet sërish.

## 8. Ku mund t'i ndryshosh gjërat?

- Për të ndryshuar tekstet, kërko fjalët përkatëse në `index.html`.
- Për ngjyrat bazë, shiko variablat në krye të `styles.css`, te `:root`.
- Për paraqitjen në telefon, kërko `@media (max-width: 700px)` te `styles.css`.
- Për funksionet e detyrave, kërko `renderTasks` ose `taskForm` te `script.js`.

Ndrysho pak kod çdo herë, ruaje skedarin dhe rifresko shfletuesin. Mund të mësosh si funksionon pa ndryshuar dizajnin, nëse nuk prek CSS-in.
