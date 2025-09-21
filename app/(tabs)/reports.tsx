import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import useReportsData from '../../lib/pages/useReportsData';
import './css/reports.css';

const reports = [
    { key: 'financial', name: 'Financial Report', description: 'Comprehensive report on income and expenses.' },
    { key: 'clients', name: 'Client Report', description: 'Details on all registered clients.' },
    { key: 'staff', name: 'Staff Report', description: 'Information about all staff members.' },
    { key: 'inventory', name: 'Inventory Report', description: 'Current stock levels and inventory details.' },
    { key: 'carYard', name: 'Car Yard Report', description: 'Data on all vehicles in the database.' },
    { key: 'transactions', name: 'Transactions Report', description: 'Records of all financial transactions.' },
];

const ReportsPage: React.FC = () => {
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    const { data, loading, error, fetchReports } = useReportsData();

    const handleFetchReports = (reportKey: string) => {
        if (!startDate || !endDate) {
            alert('Please select a start and end date.');
            return;
        }
        
        // Convert string dates to Date objects
        const start = new Date(startDate);
        const end = new Date(endDate);
        fetchReports(reportKey, start, end);
    };

    const getReportFileName = (reportName: string) => {
        const start = startDate || 'start';
        const end = endDate || 'end';
        return `${reportName.replace(/\s+/g, '_')}_${start}_to_${end}.csv`;
    };

    return (
        <View className="flex-1 bg-[#0A0F1E] p-4 pt-14">
            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 20 }}>
                <View className="flex-row items-center justify-between mb-6">
                    <Text className="text-white text-xl font-bold">Reports Dashboard 📊</Text>
                </View>

                <View className="bg-gray-800 rounded-xl p-4 mb-6">
                    <Text className="text-white text-lg font-bold mb-4">Select Date Range for Reports</Text>
                    <View className="flex-row space-x-4 mb-4">
                        <View className="flex-1">
                            <Text className="text-gray-400 mb-2">Start Date:</Text>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full bg-gray-700 text-white p-3 rounded border border-gray-600"
                            />
                        </View>
                        <View className="flex-1">
                            <Text className="text-gray-400 mb-2">End Date:</Text>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                min={startDate}
                                className="w-full bg-gray-700 text-white p-3 rounded border border-gray-600"
                            />
                        </View>
                    </View>
                </View>

                {error && (
                    <View className="bg-red-600 p-4 rounded-xl mb-6">
                        <Text className="text-white">⚠️ {error}</Text>
                    </View>
                )}

                {loading && (
                    <View className="items-center justify-center p-6">
                        <Text className="text-white">Loading...</Text>
                    </View>
                )}

                <View className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reports.map((report) => (
                        <View key={report.key} className="bg-gray-800 rounded-xl p-4">
                            <Text className="text-white text-lg font-bold mb-2">{report.name}</Text>
                            <Text className="text-gray-400 mb-4">{report.description}</Text>
                            
                            <TouchableOpacity
                                className="bg-blue-600 px-4 py-3 rounded-lg mb-3"
                                onPress={() => handleFetchReports(report.key)}
                                disabled={loading}
                            >
                                <Text className="text-white text-center font-semibold">
                                    {loading ? 'Fetching...' : 'Get Report Data'}
                                </Text>
                            </TouchableOpacity>
                            
                            {data[report.key] && (
                                <CSVLink
                                    data={data[report.key] || []}
                                    headers={data[report.key].length > 0 ? Object.keys(data[report.key][0]) : []}
                                    filename={getReportFileName(report.name)}
                                    className="block"
                                >
                                    <TouchableOpacity
                                        className="bg-green-600 px-4 py-3 rounded-lg"
                                        disabled={!data[report.key]?.length}
                                    >
                                        <Text className="text-white text-center font-semibold">
                                            Download as CSV
                                        </Text>
                                    </TouchableOpacity>
                                </CSVLink>
                            )}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default ReportsPage;