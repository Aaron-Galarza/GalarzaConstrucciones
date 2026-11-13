import type { CollectionEntry } from 'astro:content';

/**
 * Portada de una obra: la imagen declarada en `cover` o, si no existe, la
 * primera imagen del relato visual. Se usa en las tarjetas del listado, en la
 * home y en los metadatos sociales.
 */
export function obraCover(obra: CollectionEntry<'obras'>) {
  if (obra.data.cover) {
    return { src: obra.data.cover.src, alt: obra.data.cover.alt };
  }

  for (const block of obra.data.story) {
    if (block.type === 'image') {
      return { src: block.src, alt: block.alt };
    }
  }
  return undefined;
}
