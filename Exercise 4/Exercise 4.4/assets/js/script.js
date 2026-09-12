/* ==========================================================================
   Appliance Energy Consumption Website
   script.js
   - FAQ accordion (Home page)
   - Appliance Energy Calculator (Televisions page, optional JS challenge)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  initFaqAccordion();
  initEnergyCalculator();
});

/* --------------------------------------------------------------------------
   FAQ Accordion
   Each .faq-item contains a .faq-question button and a .faq-answer panel.
   Panels are hidden by default (max-height: 0 in CSS) and toggle open/closed
   on click. Uses aria-expanded for accessibility.
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', function () {
      const isOpen = item.classList.contains('open');

      if (isOpen) {
        item.classList.remove('open');
        answer.style.maxHeight = null;
        question.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Appliance Energy Calculator (optional JS extension)

   Inputs:
     - Appliance dropdown (preset wattage) OR manual watt entry
     - Hours of use per day
     - Electricity price (cents per kWh)

   Calculates:
     - Daily energy consumption (kWh)
     - Monthly energy consumption (kWh)
     - Yearly cost estimate ($)

   Demonstrates: event handling, reading DOM values, calculation with
   functions, dynamic DOM updates, and input validation.
   -------------------------------------------------------------------------- */

// Placeholder appliance wattages (kept simple; can be swapped for real
// dataset values in later exercises).
const APPLIANCE_PRESETS = {
  'custom': null,
  '32-led-tv': 50,
  '55-led-tv': 90,
  '65-oled-tv': 150,
  '75-qled-tv': 210
};

function initEnergyCalculator() {
  const form = document.getElementById('calc-form');
  if (!form) return; // calculator not present on this page

  const applianceSelect = document.getElementById('appliance-select');
  const wattInput = document.getElementById('watt-input');
  const hoursInput = document.getElementById('hours-input');
  const priceInput = document.getElementById('price-input');
  const resultsPanel = document.getElementById('calc-results');
  const wattError = document.getElementById('watt-error');
  const hoursError = document.getElementById('hours-error');
  const priceError = document.getElementById('price-error');

  // When a preset appliance is chosen, auto-fill (and lock) the wattage field.
  applianceSelect.addEventListener('change', function () {
    const preset = APPLIANCE_PRESETS[applianceSelect.value];
    if (preset !== null && preset !== undefined) {
      wattInput.value = preset;
      wattInput.readOnly = true;
    } else {
      wattInput.value = '';
      wattInput.readOnly = false;
    }
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault(); // this is a client-side calculator, no page reload
    clearErrors();

    const watts = parseFloat(wattInput.value);
    const hours = parseFloat(hoursInput.value);
    const priceCents = parseFloat(priceInput.value);

    let hasError = false;

    if (isNaN(watts) || watts <= 0) {
      showError(wattError, 'Enter a wattage greater than 0.');
      hasError = true;
    }
    if (isNaN(hours) || hours < 0 || hours > 24) {
      showError(hoursError, 'Enter hours between 0 and 24.');
      hasError = true;
    }
    if (isNaN(priceCents) || priceCents <= 0) {
      showError(priceError, 'Enter an electricity price greater than 0.');
      hasError = true;
    }

    if (hasError) {
      renderEmptyResults('Fix the highlighted fields to see your results.');
      return;
    }

    const results = calculateEnergy(watts, hours, priceCents);
    renderResults(results);
  });

  function showError(el, message) {
    el.textContent = message;
  }

  function clearErrors() {
    [wattError, hoursError, priceError].forEach(function (el) {
      el.textContent = '';
    });
  }

  function renderEmptyResults(message) {
    resultsPanel.innerHTML = '<p class="calc-empty-state">' + message + '</p>';
  }
}

// Pure calculation function: kW * hours/day -> daily/monthly/yearly kWh + cost
function calculateEnergy(watts, hoursPerDay, priceCentsPerKwh) {
  const kw = watts / 1000;
  const dailyKwh = kw * hoursPerDay;
  const monthlyKwh = dailyKwh * 30;
  const yearlyKwh = dailyKwh * 365;
  const yearlyCost = (yearlyKwh * priceCentsPerKwh) / 100; // cents -> dollars

  return {
    dailyKwh: dailyKwh,
    monthlyKwh: monthlyKwh,
    yearlyKwh: yearlyKwh,
    yearlyCost: yearlyCost
  };
}

// Updates the existing results panel rather than duplicating markup.
function renderResults(results) {
  const resultsPanel = document.getElementById('calc-results');

  resultsPanel.innerHTML =
    '<h3>Estimated energy use</h3>' +
    buildResultRow('Daily consumption', results.dailyKwh.toFixed(2) + ' kWh') +
    buildResultRow('Monthly consumption', results.monthlyKwh.toFixed(1) + ' kWh') +
    buildResultRow('Yearly consumption', results.yearlyKwh.toFixed(0) + ' kWh') +
    buildResultRow('Estimated yearly cost', '$' + results.yearlyCost.toFixed(2));
}

function buildResultRow(label, value) {
  return (
    '<div class="result-row">' +
      '<span class="result-label">' + label + '</span>' +
      '<span class="result-value">' + value + '</span>' +
    '</div>'
  );
}


