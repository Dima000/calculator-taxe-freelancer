<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Tabel taxe freelanceri</h1>
        <p class="mt-2 text-sm text-gray-700">Calculeaza taxele pentru PFA si SRL cu cu 1 angajat</p>
      </div>
    </div>
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  Venit anual
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Taxe PFA %</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Taxe SRL %</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Taxe PFA RON</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Taxe SRL RON</th>
              </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="d in data" :key="d.venitBrut">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {{ formatNumber(d.venitBrut) }} EUR
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                  {{ d.pfaProcent.toFixed(2) }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                  {{ d.srlProcent.toFixed(2) }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                  {{ formatNumber(d.pfaValoare) }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                  {{ formatNumber(d.srlValoare) }}
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
  },
  methods: {
    formatNumber(n) {
      return new Intl.NumberFormat('en').format(+n.toFixed(2));
    }
  },
}
</script>
