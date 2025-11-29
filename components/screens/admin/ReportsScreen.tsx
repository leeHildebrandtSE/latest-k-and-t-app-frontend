import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { exportToCSV } from "../../utils/exportToCSV";
import { mockTrips } from "../../../data/mockData";
import { Trip } from '../../../types/index';
// For XLSX and PDF, import libraries if needed
// import * as XLSX from 'xlsx';
// import jsPDF from 'jspdf';

interface ReportsScreenProps {
  theme?: 'admin' | 'driver' | 'commuter';
}

export function ReportsScreen({ theme = 'admin' }: ReportsScreenProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [format, setFormat] = useState("csv");
  const [filename, setFilename] = useState("report.csv");

  function handleFormatChange(newFormat: string) {
    setFormat(newFormat);
    // Update filename extension
    setFilename(prev => {
      const base = prev.replace(/\.(csv|xlsx|pdf)$/i, "");
      return `${base}.${newFormat}`;
    });
  }

  let buttonColor = 'bg-blue-900 hover:bg-blue-800';
  let titleColor = 'text-blue-900';
  if (theme === 'admin') {
    buttonColor = 'bg-green-700 hover:bg-green-800';
    titleColor = 'text-green-900';
  }
  if (theme === 'commuter') {
    buttonColor = 'bg-orange-600 hover:bg-orange-700';
    titleColor = 'text-orange-900';
  }


  function filterTripsByDate(trips: Trip[], start: string, end: string): Trip[] {
    if (!start && !end) return trips;
    return trips.filter((trip: Trip) => {
      const tripDate = new Date(trip.date);
      const startDateObj = start ? new Date(start) : null;
      const endDateObj = end ? new Date(end) : null;
      if (startDateObj && endDateObj) {
        return tripDate >= startDateObj && tripDate <= endDateObj;
      } else if (startDateObj) {
        return tripDate >= startDateObj;
      } else if (endDateObj) {
        return tripDate <= endDateObj;
      }
      return true;
    });
  }

  function handleExport() {
    const filteredTrips = filterTripsByDate(mockTrips, startDate, endDate);
    if (filteredTrips.length === 0) {
      alert('No trips found for selected date range.');
      return;
    }
    if (format === 'csv') {
      const csvData: Record<string, unknown>[] = filteredTrips.map(trip => ({ ...trip }));
      exportToCSV(csvData, filename.endsWith('.csv') ? filename : filename + '.csv');
    } else if (format === 'xlsx') {
      alert('Excel export not implemented yet.');
      // XLSX export logic would go here
    } else if (format === 'pdf') {
      alert('PDF export not implemented yet.');
      // PDF export logic would go here
    } else {
      alert('Unknown export format.');
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <Card className="shadow-2xl rounded-2xl">
        <CardHeader>
          <CardTitle className={`text-2xl font-bold ${titleColor} mb-2`}>Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Export Format</label>
              <select className="w-full border rounded-lg px-4 py-2" value={format} onChange={e => handleFormatChange(e.target.value)}>
                <option value="csv">CSV</option>
                <option value="xlsx">Excel</option>
                <option value="pdf">PDF</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filename</label>
              <Input value={filename} onChange={e => setFilename(e.target.value)} />
            </div>
            <Button className={`w-full ${buttonColor} text-white rounded-lg font-semibold py-2 mt-4`} onClick={handleExport}>
              Export Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
