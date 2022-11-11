<template>
  <form class="space-y-6">
    <div class="bg-white px-4 py-5 sm:rounded-lg sm:p-6">
      <div class="flex flex-col md:flex-row">
        <the-table class="w-full md:w-4/6" :data="taxe" />

        <div class="w-full mt-8 md:w-2/6 bg-zinc-100 px-4 py-3 md:-mt-3">
          <h1 class="text-xl font-semibold text-gray-900 mb-6">Configurări</h1>

          <div class="mt-4">
            <label for="decontari" class="block text-sm font-medium text-gray-700">Decontări</label>
            <div class="relative mt-1 rounded-md shadow-sm">
              <input type="text" name="decontari" id="decontari"
                     v-model="decontari"
                     :class="[errorDecontari ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500']"
                     :placeholder="Math.max(cheltuieliPFA, cheltuieliSRL)"
                     class="block w-full rounded-md pr-10 focus:ring-indigo-500 sm:text-sm"
                     placeholder="000-00-0000" />
              <div class="absolute inset-y-0 right-0 flex items-center pr-3" :title="tooltipDecontari">
                <question-mark-circle-icon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div class="mt-4">
            <label for="checltuieliPFA" class="block text-sm font-medium text-gray-700">Cheltuieli PFA</label>
            <div class="relative mt-1 rounded-md shadow-sm">
              <input type="number" name="checltuieliPFA" id="checltuieliPFA" autocomplete="off"
                     v-model="cheltuieliPFA"
                     :class="[decontari && cheltuieliPFA > decontari ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500']"
                     class="block w-full rounded-md pr-10 focus:ring-indigo-500 sm:text-sm"
              />
              <div class="absolute inset-y-0 right-0 flex items-center pr-3"
                   :title="tooltipCheltuieli">
                <question-mark-circle-icon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div class="mt-4">
            <label for="cheltuieliSRL" class="block text-sm font-medium text-gray-700">Cheltuieli SRL</label>
            <div class="relative mt-1 rounded-md shadow-sm">
              <input type="number" name="cheltuieliSRL" id="cheltuieliSRL" autocomplete="off"
                     v-model="cheltuieliSRL"
                     :class="[decontari && cheltuieliSRL > decontari ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500']"
                     class="block w-full rounded-md pr-10 focus:ring-indigo-500 sm:text-sm"
              />
              <div class="absolute inset-y-0 right-0 flex items-center pr-3"
                   :title="tooltipCheltuieli">
                <question-mark-circle-icon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
            </div>
          </div>

          <div class="mt-4">
            <label for="salariu_minim" class="block text-sm font-medium text-gray-700">Salariu minim</label>
            <select id="salariu_minim" name="salariu_minim" :value="salariuMinim" @change="changeSalariuMinim"
                    class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              <option>2550</option>
              <option>3000</option>
            </select>
          </div>

          <div class="mt-4">
            <label for="cursEuro" class="block text-sm font-medium text-gray-700">Curs EURO</label>
            <input type="number" name="cursEuro" id="cursEuro" autocomplete="off"
                   :class="{'border-red-500 focus:border-red-500': decontari && cheltuieliSRL > decontari }"
                   v-model="cursEuro"
                   class="mt-1 w-full rounded-md border-gray-300 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import QuestionMarkCircleIcon from './icons/QuestionMarkCircleIcon.vue';
import calculatorTaxe from '../calculator-taxe';
import TheTable from './TheTable.vue';

export default {
  components: { TheTable, QuestionMarkCircleIcon },
  data() {
    return {
      salariuMinim: 2550,
      decontari: 10000,
      cheltuieliPFA: 150 * 12,
      cheltuieliSRL: 250 * 12,
      cursEuro: 4.92,
      sume: [25_000, 35_000, 45_000, 50_000, 60_000, 70_000, 80_000],
      tooltipDecontari: 'Decontările trebuie sa fie mai mari sau egale ca cheltuielile',
      tooltipCheltuieli: 'Bani pentru operațiuni. ex: Contabil, bancă, comisioane, chirie birou'
    }
  },
  computed: {
    errorDecontari() {
      return (this.decontari && this.cheltuieliPFA && this.cheltuieliPFA > this.decontari) ||
          (this.decontari && this.cheltuieliSRL && this.cheltuieliSRL > this.decontari);
    },
    taxe() {
      return calculatorTaxe({
        salariuMinim: this.salariuMinim,
        decontari: this.decontari,
        cheltuieliSRL: this.cheltuieliSRL,
        cheltuieliPFA: this.cheltuieliPFA,
        cursEuro: this.cursEuro,
        sume: this.sume,
      });
    }
  },
  methods: {
    changeSalariuMinim(event) {
      this.salariuMinim = event.target.value;
    }
  },
}
</script>
