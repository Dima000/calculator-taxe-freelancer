const SALARIU_MINIM_2022 = 2550;

export default function calculatorTaxe(
    {
        salariuAngajat,
        decontari,
        cheltuieliPFA,
        cheltuieliSRL,
        cursEuro,
        sume,
    }
) {
    let TAXE_ANGAJAT_LUNAR = taxeAnjagatLunar(salariuAngajat); // include CAM


    function pfa(s) {
        const brut = s * cursEuro;
        const { CAS, CASS } = calculeazaCAS_CASS(brut);

        const taxeProfit = Math.ceil((brut - CAS - decontari) / 10);
        const net = brut - taxeProfit - CAS - CASS - cheltuieliPFA;

        return {
            valoare: net,
            percent: net / brut * 100
        };
    }

    function srlCuAngajat(s) {
        const brut = s * cursEuro;
        const taxeMicro = Math.ceil(brut * 0.01);
        const camAngajat = salariuAngajat * 0.0225;
        const decontSalariuAngajat = (salariuAngajat + camAngajat) * 12;
        const taxeDiv = Math.ceil((brut - taxeMicro - decontSalariuAngajat - decontari) * 0.08);
        const netFaraCASS = brut - taxeMicro - TAXE_ANGAJAT_LUNAR * 12 - taxeDiv - cheltuieliSRL;
        const { CASS } = calculeazaCAS_CASS(netFaraCASS);
        const net = netFaraCASS - CASS;

        return {
            valoare: net,
            percent: net / brut * 100
        };
    }

    return sume.map(s => {
        const profitPfa = pfa(s);
        const profitSrlAngajat = srlCuAngajat(s);

        return {
            venitBrut: s,
            pfaProcent: profitPfa.percent,
            srlProcent: profitSrlAngajat.percent,
            pfaValoare: profitPfa.valoare,
            srlValoare: profitSrlAngajat.valoare,
        }
    })
}

function taxeAnjagatLunar(salariuAngajat) {
    switch (salariuAngajat) {
        // https://www.calculator-salarii.ro/2550-brut-calcul-salariu-net/
        case 2550:
            return 1083;
        case 5000:
            return 2188;
        case 7500:
            return 3282;
        case 10000:
            return 4375;
        default:
            return 0;
    }
}

function calculeazaCAS_CASS(venit) {
    const CAS_LUNAR = SALARIU_MINIM_2022 * 0.25;
    const CASS_LUNAR = SALARIU_MINIM_2022 * 0.1;

    let CAS, CASS;
    if (venit >= SALARIU_MINIM_2022 * 24) {
        CAS = CAS_LUNAR * 24;
        CASS = CASS_LUNAR * 24;
    } else if (venit < SALARIU_MINIM_2022 * 24 && venit >= SALARIU_MINIM_2022 * 12) {
        CAS = CAS_LUNAR * 12;
        CASS = CASS_LUNAR * 12;
    } else {
        CAS = 0;
        CASS = CASS_LUNAR * 6;
    }

    return { CAS, CASS };
}
