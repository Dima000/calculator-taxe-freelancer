<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-end">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Tabel profit freelanceri</h1>
        <p class="mt-2 text-sm text-gray-700">Calculează profitul pentru diferite forme juridice</p>
      </div>
      <div class="flex">
        <label class="mr-4 flex items-center block text-sm font-medium text-gray-700">
          <input id="percentage" name="switch-percentage" type="radio"
                 :checked="showPercent"
                 @change="showPercent = true"
                 class="mr-3 h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
          Procent
        </label>
        <label class="flex items-center block text-sm font-medium text-gray-700">
          <input id="value" name="switch-percentage" type="radio"
                 :checked="!showPercent"
                 @change="showPercent = false"
                 class="mr-3 h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
          Valoare
        </label>
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
                  Venit Brut anual
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  PFA s. real
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  SRL 1 angajat
                </th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  PFA norma + SRL 1 angajat
                </th>
              </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="d in data" :key="d.venitBrut">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {{ formatNumber(d.venitBrut) }} EUR
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                  {{ getValue(d.pfa) }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                  {{ getValue(d.srl) }}
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                  {{ getValue(d.pfaPlusSrl) }}
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
  data() {
    return {
      showPercent: true,
    }
  },
  methods: {
    getValue(obj) {
      if (obj.valoare === 0) {
        return 'N/A'
      }

      const number = this.showPercent ? obj.percent.toFixed(2) : this.formatNumber(obj.valoare);
      const unit = this.showPercent ? '%' : 'RON';
      return `${number} ${unit}`;
    },
    formatNumber(n) {
      return new Intl.NumberFormat('en').format(+n.toFixed(2));
    }
  },
}
</script>
