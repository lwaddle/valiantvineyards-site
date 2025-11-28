<script lang="ts">
  import { Dialog as SheetPrimitive } from "bits-ui";
  import { cn } from "$lib/utils/cn";
  import type { Snippet } from "svelte";

  interface Props {
    class?: string;
    children?: Snippet;
  }

  let { class: className, children }: Props = $props();
</script>

<SheetPrimitive.Title class={cn("text-lg font-semibold text-foreground", className)}>
  {#if children}
    {@render children()}
  {/if}
</SheetPrimitive.Title>
