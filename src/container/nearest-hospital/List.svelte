<script>
	export let detail = {};
</script>

<div class="w-full relative px-6 pt-6">
	<div class="flex flex-row items-start pb-1">
		<img class="pr-3" src="/icons/icon-pinlocation.svg" alt="" />
		<div
			class="w-full text-darkblue text-sm sm:text-xs md:text-xs lg:text-sm font-bold"
		>
			{detail.title}<br /><span
				class="flex-none font-normal"
				style="color: #708697"
				>{detail.address}</span
			>
		</div>
		<img src="/icons/icon-direction.svg" alt="" />
	</div>

	<div class="flex flex-row items-center border-b border-gray-400 pb-4">
		<img class="pr-3" src="/icons/icon-telephone.svg" alt="" />
		<div
			class="w-full underline font-semibold text-sm sm:text-xs md:text-xs lg:text-sm"
			style="color: #708697"
		>
			{detail.telp}
		</div>
		<div
			class="border-2 rounded-lg text-center w-1/4 text-xs border-teal text-teal font-bold"
		>
			0.5 Km
		</div>
	</div>
</div>
