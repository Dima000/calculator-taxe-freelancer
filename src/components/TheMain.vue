<template>
  <form class="space-y-6">
    <div class="bg-white px-4 py-5 sm:rounded-lg sm:p-6">
      <div class="flex flex-col md:flex-row">
        <the-table class="w-full md:w-4/6" :data="taxe" />

        <div class="w-full md:w-2/6 mt-6">
          <h1 class="text-xl font-semibold text-gray-900 mb-6">Configurări</h1>
          <div class="mt-4 bg-zinc-100 rounded-sm px-4 py-3">
            <div>
              <label for="salariu_minim" class="block text-sm font-medium text-gray-700">
                Salariul minim pe economie
              </label>
              <select id="salariu_minim" name="salariu_minim" :value="salariuMinim" @change="changeSalariulMinim"
                      class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                <option>2550 (2022)</option>
                <option>3000 (2023)</option>
                <option>3500 (simulare)</option>
                <option>4000 (simulare)</option>
              </select>
            </div>

            <div class="mt-4">
              <label for="cursEuro" class="block text-sm font-medium text-gray-700">Curs EURO</label>
              <input type="number" name="cursEuro" id="cursEuro" autocomplete="off"
                     v-model="cursEuro"
                     min="0"
                     class="mt-1 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div class="mt-4 bg-zinc-100 rounded-sm px-4 py-3">
            <h3 class="font-semibold text-gray-900 mb-4">PFA</h3>

            <div>
              <label for="checltuieliPFA" class="block text-sm font-medium text-gray-700">Cheltuieli PFA</label>
              <div class="mt-1 rounded-md shadow-sm flex items-center">
                <input type="number" name="checltuieliPFA" id="checltuieliPFA" autocomplete="off"
                       min="0"
                       v-model="cheltuieliPFA"
                       class="block w-full rounded-md mr-4 focus:ring-indigo-500 sm:text-sm border-gray-300 focus:border-indigo-500"
                />
                <div class="flex items-center"
                     :title="tooltipCheltuieli">
                  <question-mark-circle-icon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
              </div>
            </div>

            <div class="mt-4">
              <label for="normaPFA" class="block text-sm font-medium text-gray-700">Norma de venit</label>
              <input type="number" name="normaPFA" id="normaPFA" autocomplete="off"
                     min="0"
                     v-model="normaPFA"
                     class="mt-1 w-full rounded-md border-gray-300 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div class="mt-4">
              <label for="reducereNorma" class="block text-sm font-medium text-gray-700">Coeficient ajustare norma (%)</label>
              <input type="number" name="reducereNorma" id="reducereNorma" autocomplete="off"
                     min="-100"
                     max="100"
                     v-model="coeficientAjustareNorma"
                     class="mt-1 w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div class="mt-4 bg-zinc-100 rounded-sm px-4 py-3">
            <h3 class="font-semibold text-gray-900 mb-4">SRL</h3>

            <div>
              <label for="checltuieliSRL" class="block text-sm font-medium text-gray-700">
                Cheltuieli SRL
              </label>
              <div class="mt-1 rounded-md shadow-sm flex items-center">
                <input type="number" name="checltuieliSRL" id="checltuieliSRL" autocomplete="off"
                       min="0"
                       v-model="cheltuieliSRL"
                       class="block w-full rounded-md mr-4 focus:ring-indigo-500 sm:text-sm border-gray-300 focus:border-indigo-500"
                />
                <div class="flex items-center"
                     :title="tooltipCheltuieli">
                  <question-mark-circle-icon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
              </div>
            </div>

            <div class="mt-4">
              <label for="salariuAngajat" class="block text-sm font-medium text-gray-700">
                Salariul angajat
              </label>
              <select id="salariuAngajat" name="salariuAngajat"
                      :value="salariuAngajat"
                      @change="changeSalariuAngajat"
                      class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                <option>2550 (minim 2022)</option>
                <option>3000 (minim 2023)</option>
                <option>3500 (simulare)</option>
                <option>4000 (simulare)</option>
              </select>
            </div>
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
      salariuAngajat: "3000 (minim 2023)",
      salariuMinim: '3000 (2023)',
      cheltuieliPFA: 1000,
      cheltuieliSRL: 3000,
      cursEuro: 4.92,
      normaPFA: 54_000,
      coeficientAjustareNorma: -50,
      sume: [10_000, 20_000, 30_000, 40_000, 50_000, 60_000, 70_000, 80_000],
      tooltipCheltuieli: 'Costuri operatiuni. ex: Contabil, bancă, comisioane, chirie sediu social, etc.'
    }
  },
  computed: {
    salariuAngajatNr() {
      return this.optionStrToNumber(this.salariuAngajat);
    },
    salariuMinimNr() {
      return this.optionStrToNumber(this.salariuMinim);
    },
    taxe() {
      return calculatorTaxe({
        salariuAngajat: this.salariuAngajatNr,
        cheltuieliSRL: this.cheltuieliSRL,
        cheltuieliPFA: this.cheltuieliPFA,
        sume: this.sume,
        SALARIU_MINIM: this.salariuMinimNr,
        CURS_EURO: this.cursEuro,
        normaPFA: this.normaPFA,
        coeficientAjustareNorma: this.coeficientAjustareNorma
      });
    }
  },
  methods: {
    changeSalariuAngajat(event) {
      this.salariuAngajat = event.target.value;
    },
    changeSalariulMinim(event) {
      this.salariuMinim = event.target.value;
    },
    optionStrToNumber(optionValue) {
      const strNumber = optionValue.toString().split(' ').at(0);
      return +strNumber;
    },
  },
}
</script>
