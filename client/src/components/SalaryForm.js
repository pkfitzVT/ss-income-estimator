import React, { useState } from 'react';

function SalaryForm({ onCalculate }) {
    const [startingSalary, setStartingSalary] = useState(60000);
    const [annualRaise, setAnnualRaise] = useState(2.5);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting with:", startingSalary, annualRaise); // ✅ debug
        onCalculate({
            salary: parseFloat(startingSalary),
            raise: parseFloat(annualRaise),
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Starting Salary ($):</label>
                <input
                    type="number"
                    value={startingSalary}
                    onChange={(e) => setStartingSalary(e.target.value)}
                    step="100"
                    required
                />
            </div>
            <div>
                <label>Annual Raise (%):</label>
                <input
                    type="number"
                    value={annualRaise}
                    onChange={(e) => setAnnualRaise(e.target.value)}
                    step="0.1"
                    required
                />
            </div>
            <button type="submit">Estimate</button>
        </form>
    );
}

export default SalaryForm;
