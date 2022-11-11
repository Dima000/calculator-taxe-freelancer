export default function calculatorTaxe(
    {
        salariuMinim,
        decontari,
        cheltuieliPFA,
        cheltuieliSRL,
        cursEuro,
        sume,
    }
) {
    const CAS24 = salariuMinim * 24 * 0.25;
    const CASS24 = salariuMinim * 24 * 0.1;
    const TAXE_SALARIAT_LUNAR = salariuMinim === 2550 ? 1083 : 1294;

    const taxPfa = function pfa(s) {
        const brut = s * cursEuro;
        const taxeProfit = Math.ceil((brut - CAS24 - decontari) / 10);
        const net = brut - taxeProfit - CAS24 - CASS24 - cheltuieliPFA;

        return 1 - (net / brut);
    }

    const taxSRL = function srl1Angajat(s) {
        const brut = s * cursEuro;
        const taxeMicro = Math.ceil(brut * 0.01);
        const taxeAngajat = TAXE_SALARIAT_LUNAR * 12;
        const taxeDiv = Math.ceil((brut - taxeMicro - taxeAngajat - decontari) * 0.08);
        const net = brut - taxeMicro - taxeAngajat - taxeDiv - cheltuieliSRL - CASS24;

        return 1 - (net / brut);
    }

    return sume.map(s => ({
        venitBrut: s,
        pfaProcent: taxPfa(s) * 100,
        srlProcent: taxSRL(s) * 100,
        pfaValoare: s * cursEuro * taxPfa(s),
        srlValoare: s * cursEuro * taxSRL(s),
    }))
}
