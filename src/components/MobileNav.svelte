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
  }

  let { navigation, currentPath }: Props = $props();
  let isOpen = $state(false);

  // Custom slide transition that works with percentages
  function slideRight(node: HTMLElement, { duration = 300, easing = cubicOut }: { duration?: number; easing?: (t: number) => number } = {}) {
    return {
      duration,
      easing,
      css: (t: number) => `transform: translateX(${(1 - t) * 100}%)`
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
</script>

<!-- Toggle Button (hamburger icon stays consistent) -->
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
  <!-- Backdrop overlay -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    transition:fade={{ duration: 250 }}
    class="fixed inset-0 z-40 bg-black/50"
    style="-webkit-tap-highlight-color: transparent; -webkit-backface-visibility: hidden; backface-visibility: hidden;"
    onclick={closeMenu}
    onkeydown={(e) => e.key === 'Escape' && closeMenu()}
    role="button"
    tabindex="-1"
    aria-label="Close menu"
  ></div>

  <!-- Off-canvas panel (slides from right) -->
  <div
    transition:slideRight={{ duration: 300 }}
    class="fixed right-0 top-0 z-50 h-full w-[80%] max-w-sm overflow-y-auto bg-background shadow-2xl"
  >
    <!-- Close button -->
    <div class="flex justify-end px-4 pt-4">
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
    <nav class="px-4 pt-2 pb-4">
      <ul class="space-y-2">
        {#each navigation as item}
          {#if item.items}
            <li>
              <Collapsible.Root>
                <Collapsible.Trigger
                  class="flex w-full items-center justify-between rounded-md px-3 py-4 text-2xl font-bold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground [&[data-state=open]>svg]:rotate-180"
                >
                  {item.name}
                  <svg
                    class="h-5 w-5 transition-transform"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                  </svg>
                </Collapsible.Trigger>
                <Collapsible.Content>
                  <ul class="ml-4 mt-2 space-y-2 border-l-2 border-border pl-4">
                    {#each item.items as subItem}
                      <li>
                        <a
                          href={subItem.href}
                          onclick={closeMenu}
                          class="block rounded-md px-3 py-3 text-xl font-semibold transition-colors {currentPath === subItem.href ? 'text-primary font-bold' : 'text-muted-foreground hover:text-foreground'}"
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
            <li>
              <a
                href={item.href}
                onclick={closeMenu}
                class="block rounded-md px-3 py-4 text-2xl font-bold transition-colors {currentPath === item.href ? 'text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}"
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
