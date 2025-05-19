import React, { useState, useEffect } from 'react';
import SalaryForm from './components/SalaryForm';
import TopEarningsTable from './components/TopEarningsTable';
import { calculateSocialSecurityBenefit } from './utils/ssCalculator';

function App() {
    // 🧠 State to store user input values from the form
    const [startingSalary, setStartingSalary] = useState(50000);
    const [annualRaise, setAnnualRaise] = useState(2.5);

    // 📊 State to hold historical earnings fetched from your backend
    const [historicWages, setHistoricWages] = useState([]);

    // 🔝 State to store the top 35 combined earnings
    const [top35, setTop35] = useState([]);

    // 📈 Function to project wages over the next 15 years
    const projectWages = (startYear, baseSalary, growthRate, years = 15) => {
        const result = [];
        let salary = baseSalary;
        for (let i = 0; i < years; i++) {
            result.push({
                year: startYear + i,
                earnings: parseFloat(salary.toFixed(2))
            });
            salary *= 1 + growthRate / 100;
        }
        return result;
    };

    // 🔁 Called once when the app loads to fetch historical earnings from your API
    useEffect(() => {
        fetch("http://localhost:3001/api/wages/top35")
            .then((res) => res.json())
            .then((data) => {
                const mapped = data.map((row) => {
                    const earnings = parseFloat(row.reported_earnings || row.ss_taxable_earnings || "0");
                    return {
                        year: row.year,
                        earnings: earnings
                    };
                });
                console.log("✅ Historic wages:", mapped);
                setHistoricWages(mapped);
            });
    }, []);

    // 🔁 Recompute the top 35 earnings whenever form or historical data changes
    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const projections = projectWages(currentYear, startingSalary, annualRaise);
        const combined = [...historicWages, ...projections];

        const sorted = combined
            .filter((e) => e.earnings > 0)
            .sort((a, b) => b.earnings - a.earnings)
            .slice(0, 35);

        setTop35(sorted);
        console.log("📊 Top 35 earnings:", sorted);

        // ✅ Calculate Social Security benefit
        const { aime, pia } = calculateSocialSecurityBenefit(sorted);
        console.log("📈 AIME:", aime);
        console.log("💰 Estimated Monthly PIA Benefit:", pia);
    }, [startingSalary, annualRaise, historicWages]);

    // 📬 Handler passed to SalaryForm to receive new values
    const handleEstimate = ({ salary, raise }) => {
        setStartingSalary(salary);
        setAnnualRaise(raise);
    };

    return (
        <div style={{ display: 'flex', gap: '2rem', padding: '1rem' }}>
            {/* Left column: the earnings table */}
            <div style={{ flex: 1 }}>
                <h2>Top 35 Earnings</h2>
                <TopEarningsTable data={top35} />
            </div>

            {/* Right column: the user input form */}
            <div style={{ flex: 1 }}>
                <h1>Social Security Income Estimator</h1>
                <SalaryForm onCalculate={handleEstimate} />
            </div>
        </div>
    );
}

export default App;
