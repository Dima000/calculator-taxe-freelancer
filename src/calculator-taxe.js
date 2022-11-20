export default function calculatorTaxe(
    {
        salariuAngajat,
        cheltuieliPFA,
        cheltuieliSRL,
        sume,
        CURS_EURO,
        SALARIU_MINIM,
        normaPFA,
        coeficientAjustareNorma,
    }
) {
    function pfa(s) {
        const brut = s * CURS_EURO;
        const { CAS, CASS } = calculeazaCAS_CASS(brut, SALARIU_MINIM);

        const taxeProfit = Math.ceil((brut - CAS - cheltuieliPFA) * 0.1);
        const net = brut - taxeProfit - CAS - CASS - cheltuieliPFA;

        return {
            valoare: net,
            percent: net / brut * 100
        };
    }

    function srlCuAngajat(s) {
        const brut = s * CURS_EURO;

        const taxeMicro = Math.ceil(brut * 0.01);
        const taxeCAMLunar = Math.ceil(salariuAngajat * 0.025);
        const decontSalariu = Math.ceil((salariuAngajat + taxeCAMLunar) * 12);
        const profitBrut = brut - decontSalariu - taxeMicro - cheltuieliSRL;
        const taxeDiv = Math.ceil(profitBrut * 0.08);
        const profitNetDividende = profitBrut - taxeDiv;
        const { CASS } = calculeazaCAS_CASS(profitNetDividende, SALARIU_MINIM);
        const salariuNetAngajat = salariuNetAnjagat(salariuAngajat) * 12;
        const net = profitNetDividende - CASS + salariuNetAngajat;

        return {
            valoare: net,
            percent: net / brut * 100,
            profitNetDividende,
            salariuNetAngajat,
        };
    }

    function pfaNormaPlusSrlAngajat(s) {
        if (s < 40_000) {
            return {
                valoare: 0,
                percent: 0,
            }
        }

        const LIMITA_PFA_NORMA = 25_000;
        const normaAjustata = normaPFA + (normaPFA * coeficientAjustareNorma / 100);
        const taxeNorma = normaAjustata * 0.1;
        const { CAS } = calculeazaCAS_CASS(normaAjustata, SALARIU_MINIM);
        const profitPFA = LIMITA_PFA_NORMA * CURS_EURO - CAS - taxeNorma - cheltuieliPFA;

        const profitSRL = srlCuAngajat(s - LIMITA_PFA_NORMA);

        const { CASS } = calculeazaCAS_CASS(normaAjustata + profitSRL.profitNetDividende, SALARIU_MINIM);

        const netFinal = profitSRL.profitNetDividende
            + profitPFA
            + profitSRL.salariuNetAngajat
            - CASS;

        return {
            valoare: netFinal,
            percent: netFinal / (s * CURS_EURO) * 100,
        };
    }

    return sume.map(s => {
        return {
            venitBrut: s,
            pfa: pfa(s),
            srl: srlCuAngajat(s),
            pfaPlusSrl: pfaNormaPlusSrlAngajat(s),
        }
    })
}

function salariuNetAnjagat(salariuAngajat) {
    switch (salariuAngajat) {
        // https://www.calculator-salarii.ro/2550-brut-calcul-salariu-net/
        case 3000:
            return 1815;
        case 5000:
            return 2925;
        case 7500:
            return 4387;
        case 10000:
            return 5850;
        case 2550:
            return 1524;
        default:
            return 0;
    }
}

function calculeazaCAS_CASS(venit, SALARIU_MINIM) {
    const CAS_LUNAR = SALARIU_MINIM * 0.25;
    const CASS_LUNAR = SALARIU_MINIM * 0.1;

    let CAS, CASS;
    if (venit >= SALARIU_MINIM * 24) {
        CAS = CAS_LUNAR * 24;
        CASS = CASS_LUNAR * 24;
    } else if (venit < SALARIU_MINIM * 24 && venit >= SALARIU_MINIM * 12) {
        CAS = CAS_LUNAR * 12;
        CASS = CASS_LUNAR * 12;
    } else if(venit < SALARIU_MINIM * 12 && venit >= SALARIU_MINIM * 6){
        CAS = 0;
        CASS = CASS_LUNAR * 6;
    } else {
        CAS = 0;
        CASS = 0;
    }

    return { CAS, CASS };
}
