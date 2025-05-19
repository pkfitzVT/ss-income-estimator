function TopEarningsTable({ data }) {
    return (
        <table>
            <thead>
            <tr><th>Year</th><th>Earnings</th></tr>
            </thead>
            <tbody>
            {data.map((row, i) => (
                <tr key={i}>
                    <td>{row.year}</td>
                    <td>${row.earnings.toLocaleString()}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
export default TopEarningsTable;
