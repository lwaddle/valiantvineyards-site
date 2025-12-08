<script lang="ts">
  import { fade } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import * as Collapsible from "$lib/components/ui/collapsible";

  type NavItem = {
    name: string;
    href?: string;
    items?: { name: string; href: string }[];
  };

  interface Props {
    navigation: NavItem[];
    currentPath: string;
    logoSrc: string;
  }

  let { navigation, currentPath, logoSrc }: Props = $props();
  let isOpen = $state(false);

  // Custom slide transition that works with percentages
  function slideRight(node: HTMLElement, { duration = 300, easing = cubicOut }: { duration?: number; easing?: (t: number) => number } = {}) {
    return {
      duration,
      easing,
      css: (t: number) => `transform: translateX(${(1 - t) * 100}%)`
    };
  }

  // Staggered fade-in for nav items
  function staggeredFade(node: HTMLElement, { delay = 0, duration = 200 }: { delay?: number; duration?: number } = {}) {
    return {
      delay,
      duration,
      easing: cubicOut,
      css: (t: number) => `opacity: ${t}; transform: translateX(${(1 - t) * 12}px)`
    };
  }

  function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  function lockScroll() {
    const scrollbarWidth = getScrollbarWidth();
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  }

  function unlockScroll() {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }

  function toggleMenu() {
    isOpen = !isOpen;
    if (isOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }
  }

  function closeMenu() {
    isOpen = false;
    unlockScroll();
  }

  function handleNavClick(e: MouseEvent, href: string) {
    e.preventDefault();
    closeMenu();
    // Navigate after a brief delay to let the close animation start
    setTimeout(() => {
      window.location.href = href;
    }, 100);
  }
</script>

<!-- Toggle Button -->
<button
  onclick={toggleMenu}
  class="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
  aria-label={isOpen ? "Close menu" : "Open menu"}
  aria-expanded={isOpen}
>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
</button>

{#if isOpen}
  <!-- Backdrop overlay (darker to hide logo behind) -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    transition:fade={{ duration: 250 }}
    class="fixed inset-0 z-40 bg-black/80"
    style="-webkit-tap-highlight-color: transparent; -webkit-backface-visibility: hidden; backface-visibility: hidden;"
    onclick={closeMenu}
    onkeydown={(e) => e.key === 'Escape' && closeMenu()}
    role="button"
    tabindex="-1"
    aria-label="Close menu"
  ></div>

  <!-- Off-canvas panel (slides from right) -->
  <div
    transition:slideRight={{ duration: 400 }}
    class="fixed right-0 top-0 z-50 flex h-full w-[90%] max-w-sm flex-col overflow-y-auto bg-background shadow-2xl will-change-transform"
  >
    <!-- Header with logo and close button -->
    <div class="flex items-center justify-between border-b border-gold/20 px-4 py-4">
      <a href="/" onclick={(e) => handleNavClick(e, '/')} class="block">
        <img src={logoSrc} alt="Valiant Vineyards" class="w-[158px]" />
      </a>
      <button
        onclick={closeMenu}
        class="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label="Close menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>

    <!-- Navigation links -->
    <nav class="px-4 pt-6 pb-4">
      <ul class="space-y-1">
        {#each navigation as item, i}
          {#if item.items}
            <li in:staggeredFade={{ delay: 150 + i * 50, duration: 250 }}>
              <Collapsible.Root>
                <Collapsible.Trigger
                  class="flex w-full items-center justify-between rounded-md px-3 py-3 font-serif text-2xl font-semibold text-foreground transition-colors hover:bg-muted hover:text-gold data-[state=open]:text-gold [&[data-state=open]>svg]:rotate-180"
                >
                  {item.name}
                  <svg
                    class="h-5 w-5 text-gold transition-transform"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                  </svg>
                </Collapsible.Trigger>
                <Collapsible.Content>
                  <ul class="ml-4 mt-1 space-y-1 border-l-2 border-gold/30 pl-4">
                    {#each item.items as subItem}
                      <li class="animate-fade-in">
                        <a
                          href={subItem.href}
                          onclick={(e) => handleNavClick(e, subItem.href)}
                          class="block rounded-md px-3 py-2.5 font-serif text-xl transition-colors {currentPath === subItem.href ? 'text-gold font-semibold' : 'text-foreground hover:text-gold'}"
                        >
                          {subItem.name}
                        </a>
                      </li>
                    {/each}
                  </ul>
                </Collapsible.Content>
              </Collapsible.Root>
            </li>
          {:else}
            <li in:staggeredFade={{ delay: 150 + i * 50, duration: 250 }}>
              <a
                href={item.href}
                onclick={(e) => handleNavClick(e, item.href!)}
                class="block rounded-md px-3 py-3 font-serif text-2xl font-semibold transition-colors {currentPath === item.href ? 'text-gold' : 'text-foreground hover:bg-muted hover:text-gold'}"
              >
                {item.name}
              </a>
            </li>
          {/if}
        {/each}
      </ul>
    </nav>
  </div>
{/if}

