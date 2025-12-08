<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    images: Array<{ src: string; alt: string }>;
    initialIndex?: number;
    open?: boolean;
    onclose?: () => void;
  }

  let { images, initialIndex = 0, open = $bindable(false), onclose }: Props = $props();

  let currentIndex = $state(initialIndex);
  let dialog: HTMLDialogElement;

  $effect(() => {
    if (open && dialog) {
      dialog.showModal();
      currentIndex = initialIndex;
    } else if (!open && dialog?.open) {
      dialog.close();
    }
  });

  function close() {
    open = false;
    onclose?.();
  }

  function next() {
    currentIndex = (currentIndex + 1) % images.length;
  }

  function prev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!open) return;
    if (e.key === 'ArrowRight') next();
    else if (e.key === 'ArrowLeft') prev();
    else if (e.key === 'Escape') close();
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === dialog) {
      close();
    }
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

  onMount(() => {
    if (open && dialog) {
      dialog.showModal();
    }
  });
</script>

<svelte:window onkeydown={handleKeydown} />

<dialog
  bind:this={dialog}
  class="lightbox"
  onclick={handleBackdropClick}
  onclose={close}
>
  {#if open && images[currentIndex]}
    <div class="lightbox-content">
      <button class="close-btn" onclick={close} aria-label="Close lightbox">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {#if images.length > 1}
        <button class="nav-btn prev" onclick={prev} aria-label="Previous image">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      {/if}

      <figure
        class="image-container"
        ontouchstart={handleTouchStart}
        ontouchmove={handleTouchMove}
        ontouchend={handleTouchEnd}
      >
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
        />
        {#if images.length > 1}
          <figcaption class="counter">
            {currentIndex + 1} / {images.length}
          </figcaption>
        {/if}
      </figure>

      {#if images.length > 1}
        <button class="nav-btn next" onclick={next} aria-label="Next image">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      {/if}
    </div>
  {/if}
</dialog>

<style>
  .lightbox {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    margin: 0;
    padding: 0;
    border: none;
    background: rgba(0, 0, 0, 0.95);
    z-index: 9999;
  }

  .lightbox::backdrop {
    background: rgba(0, 0, 0, 0.95);
  }

  .lightbox-content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: relative;
  }

  .image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 90vw;
    max-height: 90vh;
    margin: 0;
  }

  .image-container img {
    max-width: 100%;
    max-height: 85vh;
    object-fit: contain;
    border-radius: 4px;
  }

  .counter {
    margin-top: 1rem;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.875rem;
  }

  .close-btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: background-color 0.2s, color 0.2s;
    z-index: 10;
  }

  .close-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #c9a227;
  }

  .nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    cursor: pointer;
    padding: 1rem;
    border-radius: 50%;
    transition: background-color 0.2s, color 0.2s;
    z-index: 10;
  }

  .nav-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #c9a227;
  }

  .nav-btn.prev {
    left: 1rem;
  }

  .nav-btn.next {
    right: 1rem;
  }

  @media (max-width: 640px) {
    .nav-btn {
      padding: 0.75rem;
    }

    .close-btn {
      top: 0.5rem;
      right: 0.5rem;
    }
  }
</style>
