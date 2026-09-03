# Exercise 3 – Data Story: TV Energy Consumption

## Overview

This exercise develops a **data story** based on the **TV Energy Consumption dataset**, built on top of the website created in Exercise 0.2. It extends that work with a narrative supported by data visualisations, presented on the **Televisions** page.

---

## Data Story

### Audience

The target audience for this visualisation includes:

- **Consumers** shopping for a new TV who want to understand how their choice affects running costs
- **Policy makers and regulators** interested in energy consumption trends across TV technologies
- **Researchers** studying energy efficiency in consumer electronics

While all three groups are relevant, the visualisations are written primarily from the consumer's point of view, since that's the most concrete and actionable use case — the other audiences can draw the same conclusions from the same charts.

### Story Overview

Two questions matter most when someone is choosing a TV with running costs in mind:

1. **Does a bigger screen really cost more to run — and by how much?**
2. **Does screen technology (LCD, LCD LED, OLED) change that cost, on top of size?**

The data shows both effects are real:

- Grouping TVs into **small (<43"), medium (44"–65") and large (>66")** categories shows a clear step down in average energy consumption as screen size decreases: roughly 745 kWh/yr (large), 405 kWh/yr (medium), and 155 kWh/yr (small) — size is the single biggest driver of running cost.
- Comparing **screen technology** within each size category shows OLED and LCD LED panels consume more than plain LCD at every size. The gap is largest for **large** TVs (LCD ≈ 652.8 kWh/yr vs LCD LED ≈ 757.2 kWh/yr vs OLED ≈ 722.6 kWh/yr) and, interestingly, **small OLED TVs are disproportionately costly to run** (≈ 231.6 kWh/yr) compared to small LCD (≈ 119.3 kWh/yr) or small LCD LED (≈ 122.7 kWh/yr) — nearly double, despite the smaller screen.

**Takeaway for the audience:** if minimising running cost matters, screen size is the first lever to pull, but panel technology is a meaningful second lever — a small OLED can cost more to run than expected, so it's worth checking technology as well as size.

---

## About the Data

### Data Source

The dataset used in this project contains information about television models sold in the Australian market, including screen size, screen technology (LCD, LCD LED, OLED), labelled energy consumption (kWh/year), and energy star ratings. It was provided as part of the COS30045 course materials.

### Data Processing

Before visualisation, the dataset was processed in KNIME to:

- Filter to relevant columns (screen size, screen technology, labelled energy consumption)
- Convert screen size from centimetres to inches for readability, since Australian retail typically markets TVs by inch size
- Classify TVs into **small (<43"), medium (44"–65") and large (>66")** categories using an Expression node
- Aggregate energy consumption by screen technology and size category using GroupBy/Pivot to build the comparison chart

### Privacy

The dataset contains no personal or sensitive information — it covers only product specifications and energy consumption figures for TV models.

### Accuracy and Limitations

- The dataset may not cover every TV model available in the Australian market, and coverage may skew toward certain brands or years.
- Some screen sizes fell into unusual categories (e.g. clusters around 150–175cm) during exploration, which may indicate misclassified or unusual entries in the source data — these were noted but not excluded, so results should be read with this in mind.
- Labelled energy consumption reflects standardised test conditions, not real-world usage, which varies by household viewing habits and settings.

### Ethics

This project aims to represent the data accurately and responsibly by:

- Using **consistent, comparable groupings** (the same small/medium/large categories) across every chart, rather than choosing bins that exaggerate a particular result
- Starting bar chart axes at zero to avoid visually overstating differences
- Being explicit in the text above about the data's limitations, rather than presenting the findings as definitive

---

## AI Declaration

Generative AI (Claude) was used to assist with:

- Structuring the data story around the audience's key questions
- Drafting and refining this README's written content
- Reviewing HTML/CSS for the Data Story section added to `televisions.html`

All AI-assisted content was reviewed and adjusted to reflect the actual KNIME analysis and dataset findings before submission.

---

## Website Storytelling

The **Televisions** page (`televisions.html`) was extended with a **Data Story** section, placed above the existing appliance energy calculator, containing:

- A chart showing average energy consumption by TV size category (small/medium/large)
- A grouped chart comparing screen technology (LCD/LCD LED/OLED) within each size category
- Short explanatory text preceding each chart, guiding the reader from the size effect to the technology effect and ending on a practical takeaway
