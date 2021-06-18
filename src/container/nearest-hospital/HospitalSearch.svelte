<script>
	import BaseInputCheck from "../../components/BaseInputCheck.svelte";
	import BaseInputSearch from "../../components/BaseInputSearch.svelte";

	import List from "./List.svelte";

	export let data = [];
</script>

<div id="hospital-list" class="relative sm:absolute w-full top-0 sm:p-8">
	<div
		class="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 h-full sm:shadow-lg sm:rounded-lg bg-white"
	>
		<div id="content" class="flex flex-col relative h-full overflow-hidden">
			<div class="px-6 pt-6">
				<BaseInputCheck>
					<span class="text-bluegray text-sm">RS Rekanan Ad Medika</span>
				</BaseInputCheck>
				<BaseInputSearch
					name="hospital_search"
					label="Ketik Negara/Kota/Nama Rumah Sakit"
					value=""
				></BaseInputSearch>
			</div>
			<div id="list" class="w-full overflow-y-scroll h-full">
				{#each data as item, i (`list-${i}`)}
					<List detail={item}></List>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	#hospital-list {
		height: 100%;
		@media only screen and (max-width: 600px) {
			height: 515px;
		}
	}
</style>
