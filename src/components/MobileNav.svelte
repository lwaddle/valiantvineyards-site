<script lang="ts">
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
  let expandedItems = $state<Set<string>>(new Set());

  function toggleMenu() {
    isOpen = !isOpen;
    if (!isOpen) {
      expandedItems = new Set();
    }
  }

  function toggleExpanded(name: string) {
    const newSet = new Set(expandedItems);
    if (newSet.has(name)) {
      newSet.delete(name);
    } else {
      newSet.add(name);
    }
    expandedItems = newSet;
  }
</script>

<button
  onclick={toggleMenu}
  class="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
  aria-label="Toggle menu"
>
  {#if isOpen}
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  {:else}
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  {/if}
</button>

{#if isOpen}
  <!-- Backdrop -->
  <button
    class="fixed inset-0 z-40 bg-black/50"
    onclick={toggleMenu}
    aria-label="Close menu"
  ></button>

  <!-- Drawer -->
  <div class="fixed inset-y-0 right-0 z-50 w-[280px] bg-background shadow-xl">
    <div class="flex h-16 items-center justify-between border-b border-border px-4">
      <span class="font-serif text-lg font-semibold">Menu</span>
      <button
        onclick={toggleMenu}
        class="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label="Close menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </div>

    <nav class="p-4">
      <ul class="space-y-1">
        {#each navigation as item}
          {#if item.items}
            <li>
              <button
                onclick={() => toggleExpanded(item.name)}
                class="flex w-full items-center justify-between rounded-md px-3 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.name}
                <svg
                  class="h-4 w-4 transition-transform {expandedItems.has(item.name) ? 'rotate-180' : ''}"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                </svg>
              </button>
              {#if expandedItems.has(item.name)}
                <ul class="ml-4 mt-1 space-y-1 border-l border-border pl-4">
                  {#each item.items as subItem}
                    <li>
                      <a
                        href={subItem.href}
                        class="block rounded-md px-3 py-2 text-sm transition-colors {currentPath === subItem.href ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}"
                      >
                        {subItem.name}
                      </a>
                    </li>
                  {/each}
                </ul>
              {/if}
            </li>
          {:else}
            <li>
              <a
                href={item.href}
                class="block rounded-md px-3 py-3 text-base font-medium transition-colors {currentPath === item.href ? 'text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}"
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
