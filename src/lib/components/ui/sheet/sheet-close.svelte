<script lang="ts">
  import { Dialog as SheetPrimitive } from "bits-ui";
  import type { Snippet } from "svelte";

  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children }: Props = $props();
</script>

<SheetPrimitive.Close class={className}>
  {#if children}
    {@render children()}
  {/if}
</SheetPrimitive.Close>
