/**
 * Tax, Labor, and Compliance calculation engine for the Dominican Republic (DGII & TSS)
 * Baldera Santos & Asociados
 */

export interface ISRResult {
  monthlyGrossSalary: number;
  annualGrossSalary: number;
  tssAFP: number;
  tssSFS: number;
  totalTSS: number;
  taxableMonthlySalary: number;
  monthlyISR: number;
  annualISR: number;
  netMonthlySalary: number;
  effectiveTaxRate: number;
  bracketDescription: string;
}

export interface SeveranceResult {
  dailySalary: number;
  preavisoDays: number;
  preavisoAmount: number;
  cesantiaDays: number;
  cesantiaAmount: number;
  vacationDays: number;
  vacationAmount: number;
  regaliaNavidadAmount: number;
  totalSeverance: number;
  summaryDetails: {
    workedYears: number;
    workedMonths: number;
    workedDays: number;
  };
}

export interface ITBISResult {
  subtotal: number;
  itbisRate: number;
  itbisAmount: number;
  totalWithTax: number;
  itbisWithholdingRate: number; // 0, 30, 100
  itbisWithheld: number;
  isrWithholdingRate: number; // 0, 2, 10, 27
  isrWithheld: number;
  totalWithholdings: number;
  netPayableToVendor: number;
}

/**
 * Official DGII Annual Income Tax (ISR) Scale for Individuals (Dominican Republic)
 * Reference: DGII Escala Salarial Art. 296 Código Tributario
 */
export function calculateDominicanISR(monthlySalary: number): ISRResult {
  if (monthlySalary <= 0) {
    return {
      monthlyGrossSalary: 0,
      annualGrossSalary: 0,
      tssAFP: 0,
      tssSFS: 0,
      totalTSS: 0,
      taxableMonthlySalary: 0,
      monthlyISR: 0,
      annualISR: 0,
      netMonthlySalary: 0,
      effectiveTaxRate: 0,
      bracketDescription: 'Sin ingresos gravables',
    };
  }

  // Official TSS caps (20 and 10 minimum national public sector wages ~ RD$ 406,800 and RD$ 203,400)
  const afpCap = 406800;
  const sfsCap = 203400;

  const afpBase = Math.min(monthlySalary, afpCap);
  const sfsBase = Math.min(monthlySalary, sfsCap);

  const tssAFP = +(afpBase * 0.0287).toFixed(2); // 2.87% AFP
  const tssSFS = +(sfsBase * 0.0304).toFixed(2); // 3.04% SFS
  const totalTSS = +(tssAFP + tssSFS).toFixed(2);

  // Income subject to ISR is gross salary minus TSS contributions
  const taxableMonthlySalary = Math.max(0, monthlySalary - totalTSS);
  const taxableAnnualSalary = taxableMonthlySalary * 12;

  let annualISR = 0;
  let bracketDescription = '';

  // DGII Brackets
  // Tramo 1: Hasta RD$ 416,220.00 -> Exento
  // Tramo 2: RD$ 416,220.01 a RD$ 624,329.00 -> 15% del excedente de 416,220.00
  // Tramo 3: RD$ 624,329.01 a RD$ 867,123.00 -> RD$ 31,216.00 + 20% del excedente de 624,329.00
  // Tramo 4: Mas de RD$ 867,123.01 -> RD$ 79,776.00 + 25% del excedente de 867,123.00
  if (taxableAnnualSalary <= 416220) {
    annualISR = 0;
    bracketDescription = 'Tramo 1: Exento de ISR (Ingresos anuales hasta RD$ 416,220.00)';
  } else if (taxableAnnualSalary <= 624329) {
    annualISR = (taxableAnnualSalary - 416220) * 0.15;
    bracketDescription = 'Tramo 2: 15% sobre el excedente de RD$ 416,220.01';
  } else if (taxableAnnualSalary <= 867123) {
    annualISR = 31216 + (taxableAnnualSalary - 624329) * 0.20;
    bracketDescription = 'Tramo 3: RD$ 31,216.00 fijo + 20% sobre excedente de RD$ 624,329.01';
  } else {
    annualISR = 79776 + (taxableAnnualSalary - 867123) * 0.25;
    bracketDescription = 'Tramo 4: RD$ 79,776.00 fijo + 25% sobre excedente de RD$ 867,123.01';
  }

  const monthlyISR = +(annualISR / 12).toFixed(2);
  const netMonthlySalary = +(monthlySalary - totalTSS - monthlyISR).toFixed(2);
  const effectiveTaxRate = monthlySalary > 0 ? +((monthlyISR / monthlySalary) * 100).toFixed(2) : 0;

  return {
    monthlyGrossSalary: monthlySalary,
    annualGrossSalary: monthlySalary * 12,
    tssAFP,
    tssSFS,
    totalTSS,
    taxableMonthlySalary: +taxableMonthlySalary.toFixed(2),
    monthlyISR,
    annualISR: +annualISR.toFixed(2),
    netMonthlySalary,
    effectiveTaxRate,
    bracketDescription,
  };
}

/**
 * Dominican Labor Severance (Ley 16-92 Código de Trabajo)
 */
export function calculateDominicanSeverance(
  monthlySalary: number,
  startDateStr: string,
  endDateStr: string,
  includePreaviso: boolean,
  takeVacations: boolean, // has taken vacation this year? If true, 0 vacation compensation
  workedMonthsThisYearForRegalia: number
): SeveranceResult {
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);

  const diffTime = Math.max(0, end.getTime() - start.getTime());
  const diffDaysTotal = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const years = Math.floor(diffDaysTotal / 365.25);
  const remainingDaysAfterYears = diffDaysTotal - Math.floor(years * 365.25);
  const months = Math.floor(remainingDaysAfterYears / 30.4375);
  const days = Math.floor(remainingDaysAfterYears - Math.floor(months * 30.4375));

  const totalMonths = years * 12 + months;

  // Dominican standard daily divisor: 23.83 days/month
  const dailySalary = +(monthlySalary / 23.83).toFixed(2);

  // Preaviso (Art. 76)
  let preavisoDays = 0;
  if (includePreaviso) {
    if (totalMonths >= 3 && totalMonths < 6) {
      preavisoDays = 7;
    } else if (totalMonths >= 6 && totalMonths < 12) {
      preavisoDays = 14;
    } else if (totalMonths >= 12) {
      preavisoDays = 28;
    }
  }
  const preavisoAmount = +(preavisoDays * dailySalary).toFixed(2);

  // Cesantía (Art. 80)
  let cesantiaDays = 0;
  if (totalMonths >= 3 && totalMonths < 6) {
    cesantiaDays = 6;
  } else if (totalMonths >= 6 && totalMonths < 12) {
    cesantiaDays = 13;
  } else if (years >= 1 && years < 5) {
    cesantiaDays = years * 21;
    // Plus fraction
    if (months >= 3 && months < 6) cesantiaDays += 6;
    else if (months >= 6) cesantiaDays += 13;
  } else if (years >= 5) {
    cesantiaDays = years * 23;
    // Plus fraction
    if (months >= 3 && months < 6) cesantiaDays += 6;
    else if (months >= 6) cesantiaDays += 13;
  }
  const cesantiaAmount = +(cesantiaDays * dailySalary).toFixed(2);

  // Vacaciones (Art. 177 - 180)
  let vacationDays = 0;
  if (!takeVacations) {
    if (totalMonths >= 5 && totalMonths < 6) vacationDays = 6;
    else if (totalMonths >= 6 && totalMonths < 7) vacationDays = 7;
    else if (totalMonths >= 7 && totalMonths < 8) vacationDays = 8;
    else if (totalMonths >= 8 && totalMonths < 9) vacationDays = 9;
    else if (totalMonths >= 9 && totalMonths < 10) vacationDays = 10;
    else if (totalMonths >= 10 && totalMonths < 11) vacationDays = 11;
    else if (totalMonths >= 11 && totalMonths < 12) vacationDays = 12;
    else if (years >= 1 && years < 5) vacationDays = 14;
    else if (years >= 5) vacationDays = 18;
  }
  const vacationAmount = +(vacationDays * dailySalary).toFixed(2);

  // Regalía Pascual (Salario de Navidad Art. 219 - duodécima parte de lo ganado en el año)
  const clampedMonths = Math.min(12, Math.max(0, workedMonthsThisYearForRegalia));
  const regaliaNavidadAmount = +((monthlySalary * clampedMonths) / 12).toFixed(2);

  const totalSeverance = +(preavisoAmount + cesantiaAmount + vacationAmount + regaliaNavidadAmount).toFixed(2);

  return {
    dailySalary,
    preavisoDays,
    preavisoAmount,
    cesantiaDays,
    cesantiaAmount,
    vacationDays,
    vacationAmount,
    regaliaNavidadAmount,
    totalSeverance,
    summaryDetails: {
      workedYears: years,
      workedMonths: months,
      workedDays: Math.max(0, days),
    },
  };
}

/**
 * ITBIS & Retenciones calculation (DGII)
 */
export function calculateDominicanITBIS(
  subtotal: number,
  itbisRatePercent: number = 18,
  itbisWithholdingPercent: number = 30, // 0%, 30%, 100%
  isrWithholdingPercent: number = 10 // 0%, 2%, 10%, 27%
): ITBISResult {
  const safeSubtotal = Math.max(0, subtotal);
  const itbisAmount = +(safeSubtotal * (itbisRatePercent / 100)).toFixed(2);
  const totalWithTax = +(safeSubtotal + itbisAmount).toFixed(2);

  const itbisWithheld = +(itbisAmount * (itbisWithholdingPercent / 100)).toFixed(2);
  const isrWithheld = +(safeSubtotal * (isrWithholdingPercent / 100)).toFixed(2);

  const totalWithholdings = +(itbisWithheld + isrWithheld).toFixed(2);
  const netPayableToVendor = +(totalWithTax - totalWithholdings).toFixed(2);

  return {
    subtotal: safeSubtotal,
    itbisRate: itbisRatePercent,
    itbisAmount,
    totalWithTax,
    itbisWithholdingRate: itbisWithholdingPercent,
    itbisWithheld,
    isrWithholdingRate: isrWithholdingPercent,
    isrWithheld,
    totalWithholdings,
    netPayableToVendor,
  };
}

/**
 * Official validation algorithm for Dominican Cédula de Identidad y Electoral (11 digits)
 * Uses Modulo 10 with weights [1, 2, 1, 2, 1, 2, 1, 2, 1, 2]
 */
export function validateDominicanCedula(cedula: string): { isValid: boolean; message: string; formatted: string } {
  const clean = cedula.replace(/[^0-9]/g, '');

  if (clean.length !== 11) {
    return {
      isValid: false,
      message: `La Cédula debe contener exactamente 11 dígitos numéricos (ingresados: ${clean.length}).`,
      formatted: clean,
    };
  }

  // Format: 001-0000000-0
  const formatted = `${clean.slice(0, 3)}-${clean.slice(3, 10)}-${clean.slice(10)}`;

  // Disallow all zeros
  if (/^0+$/.test(clean)) {
    return { isValid: false, message: 'La cédula no puede estar compuesta solo de ceros.', formatted };
  }

  const weights = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2];
  let sum = 0;

  for (let i = 0; i < 10; i++) {
    const digit = parseInt(clean[i], 10);
    const product = digit * weights[i];
    // If product >= 10, sum individual digits (e.g. 14 -> 1+4 = 5)
    sum += product >= 10 ? Math.floor(product / 10) + (product % 10) : product;
  }

  const verifier = (10 - (sum % 10)) % 10;
  const lastDigit = parseInt(clean[10], 10);

  if (verifier === lastDigit) {
    return {
      isValid: true,
      message: 'Cédula dominicana válida y dígito verificador correcto.',
      formatted,
    };
  } else {
    return {
      isValid: false,
      message: `Dígito verificador inválido (esperado: ${verifier}, ingresado: ${lastDigit}).`,
      formatted,
    };
  }
}

/**
 * Official validation algorithm for Dominican RNC (Registro Nacional del Contribuyente - 9 digits)
 * Weights: [7, 9, 8, 6, 5, 4, 3, 2]
 */
export function validateDominicanRNC(rnc: string): { isValid: boolean; message: string; formatted: string } {
  const clean = rnc.replace(/[^0-9]/g, '');

  if (clean.length === 11) {
    // A physical person's RNC is their 11-digit Cédula
    const cedulaCheck = validateDominicanCedula(clean);
    return {
      isValid: cedulaCheck.isValid,
      message: cedulaCheck.isValid
        ? 'RNC de Persona Física válido (corresponde a Cédula dominicana validada).'
        : `RNC de Persona Física inválido: ${cedulaCheck.message}`,
      formatted: cedulaCheck.formatted,
    };
  }

  if (clean.length !== 9) {
    return {
      isValid: false,
      message: `El RNC de Sociedad debe contener 9 dígitos (o 11 dígitos si es Persona Física). Ingresados: ${clean.length}.`,
      formatted: clean,
    };
  }

  const formatted = `${clean.slice(0, 1)}-${clean.slice(1, 3)}-${clean.slice(3, 8)}-${clean.slice(8)}`;
  const weights = [7, 9, 8, 6, 5, 4, 3, 2];
  let sum = 0;

  for (let i = 0; i < 8; i++) {
    sum += parseInt(clean[i], 10) * weights[i];
  }

  const remainder = sum % 11;
  let verifier = 0;

  if (remainder === 0) {
    verifier = 2;
  } else if (remainder === 1) {
    verifier = 1;
  } else {
    verifier = 11 - remainder;
  }

  const lastDigit = parseInt(clean[8], 10);

  if (verifier === lastDigit) {
    return {
      isValid: true,
      message: 'RNC corporativo válido conforme a las reglas oficiales de la DGII.',
      formatted,
    };
  } else {
    return {
      isValid: false,
      message: `RNC inválido. El dígito de control no coincide (esperado: ${verifier}, ingresado: ${lastDigit}).`,
      formatted,
    };
  }
}

/**
 * Formats a number to Dominican Pesos currency format (e.g. RD$ 45,000.00)
 */
export function formatDOP(amount: number): string {
  return new Intl.NumberFormat('es-DO', {
    style: 'currency',
    currency: 'DOP',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount).replace('DOP', 'RD$');
}

/**
 * Formats a number to USD currency format
 */
export function formatUSD(amount: number, exchangeRate: number = 60.5): string {
  const usdAmount = amount / exchangeRate;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(usdAmount);
}
