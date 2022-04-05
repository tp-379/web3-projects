<template>
  <div class="mt-4">
    <div class="mt-1 relative rounded-md shadow-sm">
      <input
        type="text"
        name="price"
        id="price"
        class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-2 pr-12 sm:text-sm border-gray-300 rounded-md"
        placeholder="0.00"
      />
      <div class="absolute inset-y-0 right-0 flex items-center">
        <label for="contribution" class="sr-only">Contribution</label>
        <select
          id="contribution"
          name="contribution"
          class="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
        >
          <option>WEI</option>
          <option>ETH</option>
        </select>
      </div>
    </div>
  </div>
</template>
