import React, { useEffect, useState } from 'react';

export default function ResultsTable({ refreshKey }) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/results')
      .then(res => res.json())
      .then(data => setResults(data))
      .catch(err => console.error('Error fetching results:', err));
  }, [refreshKey]); // <--- depends on refreshKey



  return (
    <div style={{ margin: '40px auto', maxWidth: '90%' }}>
      <h3 style={{ textAlign: 'center' }}>Previous Results</h3>
      {results.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No results found.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th>Algorithm</th>
              <th>Start</th>
              <th>Goal</th>
              <th>Path Length</th>
              <th>Visited</th>
              <th>Time (s)</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r, i) => (
              <tr key={i}>
                <td>{r.algorithm}</td>
                <td>{r.start_point}</td>
                <td>{r.goal_point}</td>
                <td>{r.path_length}</td>
                <td>{r.visited_count}</td>
                <td>{r.time_taken ? r.time_taken.toFixed(4) : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
