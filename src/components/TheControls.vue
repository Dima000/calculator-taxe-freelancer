<template>
  <form class="space-y-6">
    <div class="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
          <p class="mt-1 text-sm text-gray-500">Use a permanent address where you can receive mail.</p>
        </div>
        <div class="mt-5 md:col-span-2 md:mt-0">
          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6 sm:col-span-3">
              <label for="first-name" class="block text-sm font-medium text-gray-700">Decontari</label>
              <input type="text" name="first-name" id="first-name" autocomplete="given-name"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label for="last-name" class="block text-sm font-medium text-gray-700">Cheltuieli</label>
              <input type="text" name="last-name" id="last-name" autocomplete="family-name"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label for="salariu_minim" class="block text-sm font-medium text-gray-700">Salariu minim</label>
              <select id="salariu_minim" name="salariu_minim" :value="salariuMinim" @change="salariuMinim = $event"
                      class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                <option>2550</option>
                <option>3000</option>
              </select>
            </div>

            <div class="col-span-6">
              <label for="street-address" class="block text-sm font-medium text-gray-700">Street address</label>
              <input type="text" name="street-address" id="street-address" autocomplete="street-address"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>

            <div class="col-span-6 sm:col-span-6 lg:col-span-2">
              <label for="city" class="block text-sm font-medium text-gray-700">City</label>
              <input type="text" name="city" id="city" autocomplete="address-level2"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>

            <div class="col-span-6 sm:col-span-3 lg:col-span-2">
              <label for="region" class="block text-sm font-medium text-gray-700">State / Province</label>
              <input type="text" name="region" id="region" autocomplete="address-level1"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>

            <div class="col-span-6 sm:col-span-3 lg:col-span-2">
              <label for="postal-code" class="block text-sm font-medium text-gray-700">ZIP / Postal code</label>
              <input type="text" name="postal-code" id="postal-code" autocomplete="postal-code"
                     class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      salariuMinim: 2550,
    }
  },
}
</script>
