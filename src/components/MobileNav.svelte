<script lang="ts">
  import { fly, fade } from "svelte/transition";
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
  <!-- Backdrop overlay with blur -->
  <button
    transition:fade={{ duration: 250 }}
    class="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
    onclick={closeMenu}
    aria-label="Close menu"
  ></button>

  <!-- Off-canvas panel (slides from right) -->
  <div
    transition:fly={{ x: '100%', duration: 300, easing: cubicOut }}
    class="fixed right-0 top-0 z-50 h-full w-[80%] max-w-sm overflow-y-auto bg-background shadow-2xl"
  >
    <!-- Navigation links -->
    <nav class="px-4 pt-6 pb-4">
      <ul class="space-y-1">
        {#each navigation as item}
          {#if item.items}
            <li>
              <Collapsible.Root>
                <Collapsible.Trigger
                  class="flex w-full items-center justify-between rounded-md px-3 py-3 text-lg font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground [&[data-state=open]>svg]:rotate-180"
                >
                  {item.name}
                  <svg
                    class="h-4 w-4 transition-transform"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                  </svg>
                </Collapsible.Trigger>
                <Collapsible.Content>
                  <ul class="ml-4 mt-1 space-y-1 border-l border-border pl-4">
                    {#each item.items as subItem}
                      <li>
                        <a
                          href={subItem.href}
                          onclick={closeMenu}
                          class="block rounded-md px-3 py-2 text-base font-medium transition-colors {currentPath === subItem.href ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground'}"
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
                class="block rounded-md px-3 py-3 text-lg font-semibold transition-colors {currentPath === item.href ? 'text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}"
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
