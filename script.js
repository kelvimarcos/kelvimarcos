const formatCurrency = (value) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

const el = {
  serviceType: document.getElementById('serviceType'),
  complexity: document.getElementById('complexity'),
  deadline: document.getElementById('deadline'),
  hours: document.getElementById('hours'),
  hourRate: document.getElementById('hourRate'),
  revisions: document.getElementById('revisions'),
  revisionCost: document.getElementById('revisionCost'),
  fixedCosts: document.getElementById('fixedCosts'),
  taxes: document.getElementById('taxes'),
  profit: document.getElementById('profit'),
  baseService: document.getElementById('baseService'),
  laborCost: document.getElementById('laborCost'),
  urgencyCost: document.getElementById('urgencyCost'),
  revisionsCost: document.getElementById('revisionsCost'),
  fixedValue: document.getElementById('fixedValue'),
  taxValue: document.getElementById('taxValue'),
  profitValue: document.getElementById('profitValue'),
  totalValue: document.getElementById('totalValue'),
  paymentHint: document.getElementById('paymentHint'),
};

function getUrgencyMultiplier(days) {
  if (days <= 2) return 0.5;
  if (days <= 4) return 0.3;
  if (days <= 6) return 0.15;
  return 0;
}

function calculatePrice() {
  const serviceBase = Number(el.serviceType.value);
  const complexity = Number(el.complexity.value);
  const hours = Number(el.hours.value);
  const hourRate = Number(el.hourRate.value);
  const revisions = Number(el.revisions.value);
  const revisionCost = Number(el.revisionCost.value);
  const fixedCosts = Number(el.fixedCosts.value);
  const taxesPct = Number(el.taxes.value) / 100;
  const profitPct = Number(el.profit.value) / 100;
  const deadline = Number(el.deadline.value);

  const baseService = serviceBase * complexity;
  const laborCost = hours * hourRate;
  const urgencyCost = (baseService + laborCost) * getUrgencyMultiplier(deadline);
  const revisionsCost = revisions * revisionCost;
  const subtotal = baseService + laborCost + urgencyCost + revisionsCost + fixedCosts;
  const taxValue = subtotal * taxesPct;
  const profitValue = subtotal * profitPct;
  const total = subtotal + taxValue + profitValue;

  el.baseService.textContent = formatCurrency(baseService);
  el.laborCost.textContent = formatCurrency(laborCost);
  el.urgencyCost.textContent = formatCurrency(urgencyCost);
  el.revisionsCost.textContent = formatCurrency(revisionsCost);
  el.fixedValue.textContent = formatCurrency(fixedCosts);
  el.taxValue.textContent = formatCurrency(taxValue);
  el.profitValue.textContent = formatCurrency(profitValue);
  el.totalValue.textContent = formatCurrency(total);

  const split3 = total / 3;
  const signal = total * 0.4;
  el.paymentHint.textContent =
    `Sugestão: cobre ${formatCurrency(signal)} de entrada e o restante em 2x de ${formatCurrency(split3)}. ` +
    'Isso melhora o fluxo de caixa e protege o início do projeto.';
}

Object.values(el)
  .filter((field) => field && ['INPUT', 'SELECT'].includes(field.tagName))
  .forEach((field) => field.addEventListener('input', calculatePrice));

calculatePrice();
