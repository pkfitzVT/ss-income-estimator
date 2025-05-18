import React, { useState } from 'react';

function SalaryForm({ onCalculate }) {
    const [startingSalary, setStartingSalary] = useState('');
    const [annualRaise, setAnnualRaise] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const salary = parseFloat(startingSalary);
        const raise = parseFloat(annualRaise);

        if (isNaN(salary) || isNaN(raise)) {
            alert('Please enter valid numeric values.');
            return;
        }

        onCalculate({ salary, raise });
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
