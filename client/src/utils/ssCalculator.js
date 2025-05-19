// client/src/utils/ssCalculator.js

/**
 * Calculate the estimated Social Security benefit (PIA) based on earnings.
 *
 * @param {Array} earningsArray - An array of top 35 earnings objects with format: { year, earnings }
 * @param {number} bend1 - First bend point (default for 2024 is $1,174)
 * @param {number} bend2 - Second bend point (default for 2024 is $7,078)
 * @returns {Object} { aime, pia }
 */
export function calculateSocialSecurityBenefit(earningsArray, bend1 = 1174, bend2 = 7078) {
    // Total up all earnings
    const totalEarnings = earningsArray.reduce((sum, year) => {
        return sum + parseFloat(year.earnings || 0);
    }, 0);

    // Compute Average Indexed Monthly Earnings (AIME)
    const aime = Math.floor(totalEarnings / (35 * 12));

    // Calculate PIA using bend points (2024 values by default)
    let pia = 0;

    if (aime <= bend1) {
        pia = aime * 0.9;
    } else if (aime <= bend2) {
        pia = 0.9 * bend1 + 0.32 * (aime - bend1);
    } else {
        pia = 0.9 * bend1 + 0.32 * (bend2 - bend1) + 0.15 * (aime - bend2);
    }

    // Round PIA down to the nearest dime
    pia = Math.floor(pia * 10) / 10;

    return {
        aime,
        pia,
    };
}
