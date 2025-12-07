<script lang="ts">
  import Lightbox from './Lightbox.svelte';

  interface Props {
    images: Array<{ src: string; alt: string }>;
  }

  let { images }: Props = $props();

  let lightboxOpen = $state(false);
  let selectedIndex = $state(0);

  function openLightbox(index: number) {
    selectedIndex = index;
    lightboxOpen = true;
  }
</script>

<div class="columns-2 md:columns-3 lg:columns-4 gap-4 max-w-7xl mx-auto">
  {#each images as image, index}
    <button
      type="button"
      class="gallery-item mb-4 break-inside-avoid overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer block w-full p-0 border-0 bg-transparent group"
      onclick={() => openLightbox(index)}
      aria-label="View {image.alt} in lightbox"
    >
      <img
        src={image.src}
        alt={image.alt}
        class="w-full h-auto transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />
    </button>
  {/each}
</div>

<Lightbox
  {images}
  initialIndex={selectedIndex}
  bind:open={lightboxOpen}
/>

<style>
  .gallery-item:focus-visible {
    outline: 2px solid #c9a227;
    outline-offset: 2px;
  }
</style>
