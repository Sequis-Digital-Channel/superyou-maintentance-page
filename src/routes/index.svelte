<script>
  import AboveTheFold from "../components/AboveTheFold.svelte";

  const backgroudColor = `
  linear-gradient(151deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.4) 100%), linear-gradient(143deg, #f7b500 22%, #e8d556 87%), linear-gradient(321deg, #fff546 95%, #e8d556 57%);
  `;
</script>

<style lang="postcss">
</style>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

<AboveTheFold bgGradient={backgroudColor} />
