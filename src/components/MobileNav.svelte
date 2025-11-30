<script lang="ts">
  import { mount, unmount } from "svelte";
  import MobileNavDrawer from "./MobileNavDrawer.svelte";

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
  let drawerInstance: ReturnType<typeof mount> | null = null;

  function toggleMenu() {
    isOpen = !isOpen;
  }

  $effect(() => {
    if (isOpen) {
      drawerInstance = mount(MobileNavDrawer, {
        target: document.body,
        props: {
          navigation,
          currentPath,
          onClose: () => {
            isOpen = false;
          },
        },
      });
    } else if (drawerInstance) {
      unmount(drawerInstance);
      drawerInstance = null;
    }

    return () => {
      if (drawerInstance) {
        unmount(drawerInstance);
        drawerInstance = null;
      }
    };
  });
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
