# PokeVault — Landing Page

Landing page pour collectionneurs de cartes Pokémon. Conçue avec HTML, CSS et JavaScript vanilla — aucune dépendance externe, aucun build nécessaire.

---

## Structure du projet

```
doxie-shop/
├── index.html    # Structure HTML de la page
├── styles.css    # Tous les styles (variables, layout, composants, responsive)
├── script.js     # Interactions & animations
└── README.md     # Ce fichier
```

---

## Sections

| Section | Description |
|---|---|
| **Navigation** | Navbar fixe avec effet glassmorphism au scroll, liens actifs |
| **Hero** | Titre animé, trois cartes Pokémon en 3D, compteurs de stats |
| **Pourquoi nous** | Grille de 6 fonctionnalités clés |
| **Collection** | 6 cartes filtrables (Holo, Ultra Rare, Vintage, Promo) |
| **Sets** | Bandeau défilant infini des extensions disponibles |
| **Témoignages** | 3 avis de collectionneurs |
| **CTA** | Formulaire d'inscription email |
| **Footer** | Liens et réseaux sociaux |

---

## Fonctionnalités interactives

- **Tilt 3D** sur les cartes du Hero au survol de la souris
- **Parallax** des orbes d'arrière-plan selon le mouvement du curseur
- **Compteurs animés** (12 000+, 4 800+, 98%) déclenchés à l'entrée dans le viewport
- **Filtres de collection** par catégorie (Holo, Ultra Rare, Vintage, Promo)
- **Animations d'entrée** (fade + translateY) via IntersectionObserver
- **Bandeau défilant** en boucle infinie pour les sets
- **Toast notification** après soumission du formulaire
- **Lien actif** dans la nav selon la section visible
- **Menu burger** sur mobile

---

## Lancer le projet

Ouvrir `index.html` directement dans un navigateur. Aucun serveur requis.

```bash
open index.html
# ou avec un serveur local :
npx serve .
```

---

## Design

| Élément | Valeur |
|---|---|
| Palette principale | `#FFD700` (or), `#E63946` (rouge), `#3A86FF` (bleu) |
| Fond | `#0F0F1A` (dark navy) |
| Polices | Nunito (texte), Bangers (display) via Google Fonts |
| Radius | `16px` cartes, `50px` boutons/pills |
| Animations | `cubic-bezier(0.4, 0, 0.2, 1)` pour les transitions |

---

## Personnalisation

### Changer les cartes en vedette

Dans `index.html`, chaque `.poke-card` contient :
- `data-category` — catégories séparées par un espace (ex. `"holo ultra"`)
- `.poke-card__img--*` — classe CSS pour le gradient de fond
- `.poke-card__emoji` — emoji du Pokémon
- `.poke-card__price` — prix affiché

### Modifier les couleurs

Toutes les couleurs sont des variables CSS dans `:root` au début de `styles.css`.

### Ajouter un set dans le bandeau

Dupliquer un `<div class="set-pill">Nom du set</div>` dans les deux moitiés du `.sets__track` (pour maintenir le défilement infini).

---

## Compatibilité navigateurs

Testé sur Chrome, Firefox, Safari et Edge. Requiert un navigateur supportant :
- CSS Custom Properties
- CSS Grid & Flexbox
- `IntersectionObserver`
- `backdrop-filter` (dégradé gracieux si absent)
