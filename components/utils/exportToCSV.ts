// Utility to export data as CSV
export function exportToCSV(data: Record<string, unknown>[], filename: string) {
  const csvRows = [];
  const headers = Object.keys(data[0] || {});
  csvRows.push(headers.join(','));
  for (const row of data) {
    const values = headers.map(h => JSON.stringify(row[h] ?? ''));
    csvRows.push(values.join(','));
  }
  const csvContent = csvRows.join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
