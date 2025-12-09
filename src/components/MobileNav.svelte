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
  let headerHeight = $state(65); // Default fallback

  // Update header height whenever menu opens or window resizes
  function updateHeaderHeight() {
    const header = document.getElementById('main-header');
    if (header) {
      headerHeight = header.offsetHeight;
    }
  }

  // Get header height on mount and listen for resize
  $effect(() => {
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  });

  // Dropdown expand transition - grows down from top edge
  function expandDown(node: HTMLElement, { duration = 300, easing = cubicOut }: { duration?: number; easing?: (t: number) => number } = {}) {
    const height = node.offsetHeight;
    return {
      duration,
      easing,
      css: (t: number) => `
        height: ${t * height}px;
        opacity: ${t};
        overflow: hidden;
      `
    };
  }

  // Staggered fade-in for nav items (vertical motion)
  function staggeredFade(node: HTMLElement, { delay = 0, duration = 200 }: { delay?: number; duration?: number } = {}) {
    return {
      delay,
      duration,
      easing: cubicOut,
      css: (t: number) => `opacity: ${t}; transform: translateY(${(1 - t) * -8}px)`
    };
  }

  function toggleMenu() {
    if (!isOpen) {
      updateHeaderHeight(); // Recalculate before opening
    }
    isOpen = !isOpen;
  }

  function closeMenu() {
    isOpen = false;
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

<!-- Toggle Button - 2-bar with MENU text, animates to X -->
<button
  onclick={toggleMenu}
  class="flex flex-col items-center justify-center gap-1 p-2 text-muted-foreground transition-colors hover:text-foreground"
  aria-label={isOpen ? "Close menu" : "Open menu"}
  aria-expanded={isOpen}
>
  <div class="flex flex-col items-center justify-center gap-1.5">
    <span
      class="block h-0.5 w-6 bg-current transition-all duration-300 ease-out"
      class:translate-y-[4px]={isOpen}
      class:rotate-45={isOpen}
    ></span>
    <span
      class="block h-0.5 w-6 bg-current transition-all duration-300 ease-out"
      class:-translate-y-[4px]={isOpen}
      class:-rotate-45={isOpen}
    ></span>
  </div>
  <span
    class="font-serif text-[10px] uppercase tracking-widest text-gold transition-all duration-200"
    class:opacity-0={isOpen}
    class:translate-y-1={isOpen}
  >MENU</span>
</button>

{#if isOpen}
  <!-- Backdrop overlay (below header only) -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    transition:fade={{ duration: 250 }}
    class="fixed left-0 right-0 bottom-0 z-40 bg-black/50"
    style="top: {headerHeight}px; -webkit-tap-highlight-color: transparent;"
    onclick={closeMenu}
    onkeydown={(e) => e.key === 'Escape' && closeMenu()}
    role="presentation"
    aria-hidden="true"
  ></div>

  <!-- Dropdown panel (fixed to viewport, positioned below header) -->
  <div
    transition:expandDown={{ duration: 300 }}
    class="fixed left-0 right-0 z-50 max-h-[80vh] overflow-y-auto bg-background shadow-2xl will-change-transform"
    style="top: {headerHeight}px;"
  >
    <!-- Navigation links -->
    <nav class="px-4 py-4">
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

