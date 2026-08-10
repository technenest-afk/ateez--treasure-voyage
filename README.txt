# ATEEZ — Treasure Voyage

Página web inspirada en la referencia enviada.

## Archivos

- `index.html` → estructura de toda la página.
- `styles.css` → diseño, colores, tipografías, responsive y efectos.
- `script.js` → menú móvil, playlist interactiva, navegación y mensajes.

## Dónde colocar las imágenes

La página está hecha deliberadamente SIN imágenes reales.

### Portada
En `index.html`, dentro de `.hero`, reemplazá:

```html
<div class="hero-image-placeholder">
  <span>PORTADA</span>
  <small>Colocá aquí tu imagen después</small>
</div>
```

por:

```html
<img class="hero-image" src="img/portada.jpg" alt="ATEEZ">
```

### Integrantes
Cada `.member-image` es un espacio reservado para una foto.

### Galería
Cada `.gallery-image` es un espacio reservado para una foto.

## Música

El reproductor actual es visual/interactivo, pero no reproduce audio real.
Cuando quieras agregar las canciones, se puede convertir a un reproductor HTML5 con tus archivos o enlaces.

## Ejecutar

Abrí `index.html` en el navegador. No necesita servidor para funcionar.
