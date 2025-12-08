<script lang="ts">
  export let heroSrc: string;
  export let heroAlt: string;
  export let images: { src: string; alt: string }[] = [];
  export let thumbnails: { src: string; alt: string }[] = [];
  export let roomName: string = '';

  // Use thumbnails if provided, otherwise fall back to full images
  $: thumbImages = thumbnails.length > 0 ? thumbnails : images;

  let isOpen = false;
  let currentIndex = 0;

  function openGallery(index: number = 0) {
    currentIndex = index;
    isOpen = true;
    document.body.style.overflow = 'hidden';
  }

  function close() {
    isOpen = false;
    document.body.style.overflow = '';
  }

  function next() {
    currentIndex = (currentIndex + 1) % images.length;
  }

  function prev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!isOpen) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) close();
  }

  // Swipe support for touch devices
  let touchStartX = 0;
  let touchStartY = 0;
  const SWIPE_THRESHOLD = 50;

  function handleTouchStart(e: TouchEvent) {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }

  function handleTouchMove(e: TouchEvent) {
    if (!touchStartX || !touchStartY) return;

    const diffX = Math.abs(e.changedTouches[0].screenX - touchStartX);
    const diffY = Math.abs(e.changedTouches[0].screenY - touchStartY);

    // If horizontal movement is greater, prevent scroll
    if (diffX > diffY) {
      e.preventDefault();
    }
  }

  function handleTouchEnd(e: TouchEvent) {
    const touchEndX = e.changedTouches[0].screenX;
    const touchEndY = e.changedTouches[0].screenY;

    const diffX = touchStartX - touchEndX;
    const diffY = Math.abs(touchStartY - touchEndY);

    // Only trigger swipe if horizontal movement exceeds vertical
    if (Math.abs(diffX) > SWIPE_THRESHOLD && Math.abs(diffX) > diffY) {
      if (diffX > 0) {
        next(); // Swipe left = next image
      } else {
        prev(); // Swipe right = previous image
      }
    }

    touchStartX = 0;
    touchStartY = 0;
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- Clickable Hero Image -->
<button
  on:click={() => openGallery(0)}
  class="block w-full h-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 rounded-lg overflow-hidden"
  aria-label="View all photos of {roomName}"
>
  <div class="aspect-[4/3] relative group">
    <img
      src={heroSrc}
      alt={heroAlt}
      class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
    />
    <!-- Hover overlay (desktop) -->
    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
      <div class="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-3 shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
        </svg>
      </div>
    </div>
    <!-- Photo count badge (always visible, especially useful on mobile) -->
    <div class="absolute bottom-2 right-2 flex items-center gap-1.5 bg-black/60 text-white text-sm font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      {images.length}
    </div>
  </div>
</button>

<!-- Modal/Lightbox -->
{#if isOpen}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
    on:click={handleBackdropClick}
    role="dialog"
    aria-modal="true"
    aria-label="Image gallery for {roomName}"
  >
    <!-- Close Button -->
    <button
      on:click={close}
      class="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
      aria-label="Close gallery"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Image Counter -->
    <div class="absolute top-4 left-4 text-white/80 text-sm">
      {currentIndex + 1} / {images.length}
    </div>

    <!-- Main Image -->
    <div
      class="relative max-h-[85vh] max-w-[90vw] flex items-center justify-center"
      on:touchstart={handleTouchStart}
      on:touchmove={handleTouchMove}
      on:touchend={handleTouchEnd}
    >
      <img
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        class="max-h-[85vh] max-w-[90vw] object-contain"
      />
    </div>

    <!-- Navigation Arrows -->
    {#if images.length > 1}
      <button
        on:click={prev}
        class="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
        aria-label="Previous image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        on:click={next}
        class="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
        aria-label="Next image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    {/if}

    <!-- Thumbnail Strip -->
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto py-2 px-4">
      {#each thumbImages as image, i}
        <button
          on:click={() => currentIndex = i}
          class="flex-shrink-0 h-16 w-16 rounded overflow-hidden transition-all {i === currentIndex ? 'ring-2 ring-white ring-offset-2 ring-offset-black/90' : 'opacity-50 hover:opacity-75'}"
        >
          <img
            src={image.src}
            alt={image.alt}
            class="h-full w-full object-cover"
          />
        </button>
      {/each}
    </div>
  </div>
{/if}
