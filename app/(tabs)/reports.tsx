
// import {
//     BarChart3,
//     Calendar,
//     Car,
//     CreditCard,
//     Database,
//     Download,
//     FileText,
//     Filter,
//     Package,
//     Shield,
//     Sparkles,
//     TrendingUp,
//     UserCheck,
//     Users
// } from 'lucide-react';
// import React, { useState } from 'react';
// import { CSVLink } from 'react-csv';
// import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
// import useReportsData from '../../lib/pages/useReportsData';
// import './css/reports.css';

// const { width } = Dimensions.get('window');
// const isDesktop = width >= 768;

// const reports = [
//     { 
//         key: 'financial', 
//         name: 'Financial Report', 
//         description: 'Comprehensive report on income, expenses, and profit analysis.',
//         icon: <BarChart3 size={32} className="text-green-400" />,
//         color: 'from-green-500/20 to-emerald-600/20',
//         borderColor: 'border-green-500/30',
//         buttonColor: 'bg-gradient-to-r from-green-500 to-emerald-600'
//     },
//     { 
//         key: 'clients', 
//         name: 'Client Report', 
//         description: 'Detailed analytics on all registered clients and their spending patterns.',
//         icon: <Users size={32} className="text-blue-400" />,
//         color: 'from-blue-500/20 to-cyan-600/20',
//         borderColor: 'border-blue-500/30',
//         buttonColor: 'bg-gradient-to-r from-blue-500 to-cyan-600'
//     },
//     { 
//         key: 'staff', 
//         name: 'Staff Report', 
//         description: 'Performance metrics and productivity analysis for staff members.',
//         icon: <UserCheck size={32} className="text-purple-400" />,
//         color: 'from-purple-500/20 to-violet-600/20',
//         borderColor: 'border-purple-500/30',
//         buttonColor: 'bg-gradient-to-r from-purple-500 to-violet-600'
//     },
//     { 
//         key: 'inventory', 
//         name: 'Inventory Report', 
//         description: 'Current stock levels, turnover rates, and inventory valuation.',
//         icon: <Package size={32} className="text-orange-400" />,
//         color: 'from-orange-500/20 to-amber-600/20',
//         borderColor: 'border-orange-500/30',
//         buttonColor: 'bg-gradient-to-r from-orange-500 to-amber-600'
//     },
//     { 
//         key: 'carYard', 
//         name: 'Car Yard Report', 
//         description: 'Complete database of vehicles with maintenance history and status.',
//         icon: <Car size={32} className="text-red-400" />,
//         color: 'from-red-500/20 to-rose-600/20',
//         borderColor: 'border-red-500/30',
//         buttonColor: 'bg-gradient-to-r from-red-500 to-rose-600'
//     },
//     { 
//         key: 'transactions', 
//         name: 'Transactions Report', 
//         description: 'Comprehensive records of all financial transactions and payments.',
//         icon: <CreditCard size={32} className="text-indigo-400" />,
//         color: 'from-indigo-500/20 to-blue-600/20',
//         borderColor: 'border-indigo-500/30',
//         buttonColor: 'bg-gradient-to-r from-indigo-500 to-blue-600'
//     },
// ];

// const ReportsPage: React.FC = () => {
//     const [startDate, setStartDate] = useState<string>('');
//     const [endDate, setEndDate] = useState<string>('');
//     const [activeReport, setActiveReport] = useState<string | null>(null);

//     const { data, loading, error, fetchReports } = useReportsData();

//     const handleFetchReports = async (reportKey: string) => {
//         if (!startDate || !endDate) {
//             alert('Please select a start and end date.');
//             return;
//         }
        
//         setActiveReport(reportKey);
//         const start = new Date(startDate);
//         const end = new Date(endDate);
//         await fetchReports(reportKey, start, end);
//     };

//     const getReportFileName = (reportName: string) => {
//         const start = startDate || 'start';
//         const end = endDate || 'end';
//         return `${reportName.replace(/\s+/g, '_')}_${start}_to_${end}.csv`;
//     };

//     const getReportStats = (reportKey: string) => {
//         const reportData = data[reportKey];
//         if (!reportData || reportData.length === 0) return null;

//         return {
//             totalRecords: reportData.length,
//             columns: Object.keys(reportData[0] || {}).length,
//             sampleData: reportData.slice(0, 3)
//         };
//     };

//     return (
//         <View className="flex-1 bg-gradient-to-br from-[#0A0F1E] via-[#1A2033] to-[#0A0F1E] p-4 pt-14">
//             {/* Header Section */}
//             <View className={`${isDesktop ? 'px-8' : 'px-4'} mb-8`}>
//                 <View className="flex-row items-center justify-between mb-4">
//                     <View className="flex-row items-center">
//                         <View className="bg-gradient-to-r from-purple-500 to-blue-600 p-3 rounded-2xl mr-4">
//                             <BarChart3 size={32} color="white" />
//                         </View>
//                         <View>
//                             <Text className="text-white text-3xl font-bold">Advanced Reports Dashboard</Text>
//                             <Text className="text-gray-400 text-lg">Generate comprehensive business intelligence reports</Text>
//                         </View>
//                     </View>
//                     <View className="flex-row items-center bg-white/5 px-4 py-2 rounded-full">
//                         <Sparkles size={20} className="text-yellow-400 mr-2" />
//                         <Text className="text-white font-semibold">Real-time Analytics</Text>
//                     </View>
//                 </View>

//                 {/* Date Range Selector */}
//                 <View className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-white/10">
//                     <View className="flex-row items-center justify-between mb-4">
//                         <View className="flex-row items-center">
//                             <Calendar size={24} className="text-blue-400 mr-3" />
//                             <Text className="text-white text-xl font-bold">Select Analysis Period</Text>
//                         </View>
//                         <View className="flex-row items-center bg-blue-500/20 px-3 py-1 rounded-full">
//                             <Filter size={16} className="text-blue-400 mr-2" />
//                             <Text className="text-blue-400 text-sm">Custom Range</Text>
//                         </View>
//                     </View>
                    
//                     <View className={`${isDesktop ? 'flex-row space-x-6' : 'space-y-4'} items-end`}>
//                         <View className="flex-1">
//                             <Text className="text-gray-300 mb-2 flex-row items-center">
//                                 <TrendingUp size={16} className="mr-2" />
//                                 Start Date
//                             </Text>
//                             <View className="relative">
//                                 <Calendar size={20} className="absolute left-3 top-3 text-gray-400" />
//                                 <input
//                                     type="date"
//                                     value={startDate}
//                                     onChange={(e) => setStartDate(e.target.value)}
//                                     className="w-full bg-gray-700/80 text-white p-3 pl-12 rounded-xl border border-gray-600/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
//                                 />
//                             </View>
//                         </View>
//                         <View className="flex-1">
//                             <Text className="text-gray-300 mb-2 flex-row items-center">
//                                 <FileText size={16} className="mr-2" />
//                                 End Date
//                             </Text>
//                             <View className="relative">
//                                 <Calendar size={20} className="absolute left-3 top-3 text-gray-400" />
//                                 <input
//                                     type="date"
//                                     value={endDate}
//                                     onChange={(e) => setEndDate(e.target.value)}
//                                     min={startDate}
//                                     className="w-full bg-gray-700/80 text-white p-3 pl-12 rounded-xl border border-gray-600/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
//                                 />
//                             </View>
//                         </View>
//                     </View>
//                 </View>
//             </View>

//             {/* Error Display */}
//             {error && (
//                 <View className="mx-4 mb-6 bg-gradient-to-r from-red-500/20 to-rose-600/20 border border-red-500/30 rounded-2xl p-4">
//                     <View className="flex-row items-center">
//                         <Shield size={20} className="text-red-400 mr-3" />
//                         <Text className="text-red-400 font-semibold">⚠️ {error}</Text>
//                     </View>
//                 </View>
//             )}

//             <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
//                 {/* Reports Grid */}
//                 <View className={`${isDesktop ? 'px-8' : 'px-4'}`}>
//                     <View className={`grid ${isDesktop ? 'grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'} gap-6`}>
//                         {reports.map((report) => {
//                             const stats = getReportStats(report.key);
//                             const isActive = activeReport === report.key;
//                             const isLoading = loading && isActive;

//                             return (
//                                 <View 
//                                     key={report.key}
//                                     className={`bg-gradient-to-br ${report.color} border ${report.borderColor} rounded-2xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
//                                 >
//                                     {/* Report Header */}
//                                     <View className="flex-row items-start justify-between mb-4">
//                                         <View className="flex-row items-center">
//                                             <View className="bg-white/10 p-3 rounded-xl mr-4">
//                                                 {report.icon}
//                                             </View>
//                                             <View>
//                                                 <Text className="text-white text-xl font-bold">{report.name}</Text>
//                                                 {/* <Text className="text-gray-400 text-sm mt-1">{report.description}</Text> */}
//                                             </View>
//                                         </View>

//                                     </View>

//                                     {/* Stats Preview */}
//                                     {stats && (
//                                         <View className="mb-4 bg-black/20 rounded-xl p-3">
//                                             <View className="flex-row justify-between items-center">
//                                                 <View className="flex-row items-center">
//                                                     <Database size={16} className="text-green-400 mr-2" />
//                                                     <Text className="text-green-400 text-sm">{stats.totalRecords} records</Text>
//                                                 </View>
//                                                 <View className="flex-row items-center">
//                                                     <FileText size={16} className="text-blue-400 mr-2" />
//                                                     <Text className="text-blue-400 text-sm">{stats.columns} columns</Text>
//                                                 </View>
//                                             </View>
//                                         </View>
//                                     )}

//                                     {/* Action Buttons */}
//                                     <View className="space-y-3">
//                                         <TouchableOpacity
//                                             className={`${report.buttonColor} px-4 py-3 rounded-xl flex-row items-center justify-center transition-all duration-200 active:scale-95 ${
//                                                 isLoading ? 'opacity-50' : 'hover:shadow-lg'
//                                             }`}
//                                             onPress={() => handleFetchReports(report.key)}
//                                             disabled={loading}
//                                         >
//                                             {isLoading ? (
//                                                 <View className="flex-row items-center">
//                                                     <View className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
//                                                     <Text className="text-white font-semibold">Generating...</Text>
//                                                 </View>
//                                             ) : (
//                                                 <View className="flex-row items-center">
//                                                     <BarChart3 size={20} className="text-white mr-2" />
//                                                     <Text className="text-white font-semibold">Generate Report</Text>
//                                                 </View>
//                                             )}
//                                         </TouchableOpacity>
                                        
//                                         {stats && data[report.key] && (
//                                             <CSVLink
//                                                 data={data[report.key] || []}
//                                                 headers={data[report.key].length > 0 ? Object.keys(data[report.key][0]) : []}
//                                                 filename={getReportFileName(report.name)}
//                                                 className="block"
//                                             >
//                                                 <TouchableOpacity
//                                                     className="bg-gradient-to-r from-gray-600 to-gray-700 px-4 py-3 rounded-xl flex-row items-center justify-center transition-all duration-200 active:scale-95 hover:shadow-lg"
//                                                 >
//                                                     <Download size={20} className="text-white mr-2" />
//                                                     <Text className="text-white font-semibold">Download CSV</Text>
//                                                 </TouchableOpacity>
//                                             </CSVLink>
//                                         )}
//                                     </View>

//                                     {/* Sample Data Preview */}
//                                     {stats && stats.sampleData.length > 0 && (
//                                         <View className="mt-4 bg-black/30 rounded-xl p-3">
//                                             <Text className="text-gray-400 text-xs font-semibold mb-2">SAMPLE DATA</Text>
//                                             {stats.sampleData.map((row, index) => (
//                                                 <View key={index} className="flex-row justify-between py-1 border-b border-white/5 last:border-b-0">
//                                                     <Text className="text-gray-400 text-xs truncate flex-1">
//                                                         {Object.values(row)[0] as string}
//                                                     </Text>
//                                                     <Text className="text-gray-500 text-xs">
//                                                         ...{Object.keys(row).length - 1} more fields
//                                                     </Text>
//                                                 </View>
//                                             ))}
//                                         </View>
//                                     )}
//                                 </View>
//                             );
//                         })}
//                     </View>

//                     {/* Quick Actions Footer */}
//                     <View className="mt-8 bg-gradient-to-r from-purple-500/10 to-blue-600/10 rounded-2xl p-6 border border-purple-500/20">
//                         <View className="flex-row items-center justify-between">
//                             <View>
//                                 <Text className="text-white text-lg font-bold mb-2">Need Bulk Reports?</Text>
//                                 <Text className="text-gray-400">Export all reports at once or schedule automated reports</Text>
//                             </View>
//                             <View className="flex-row space-x-3">
//                                 <TouchableOpacity className="bg-purple-600 px-4 py-2 rounded-lg flex-row items-center">
//                                     <Download size={16} className="text-white mr-2" />
//                                     <Text className="text-white text-sm">Export All</Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity className="bg-blue-600 px-4 py-2 rounded-lg flex-row items-center">
//                                     <Calendar size={16} className="text-white mr-2" />
//                                     <Text className="text-white text-sm">Schedule</Text>
//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                     </View>
//                 </View>
//             </ScrollView>

//             {/* Loading Overlay */}
//             {loading && (
//                 <View className="absolute inset-0 bg-black/70 justify-center items-center">
//                     <View className="bg-gray-800 rounded-2xl p-8 items-center">
//                         <View className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
//                         <Text className="text-white text-lg font-bold">Generating Advanced Report</Text>
//                         <Text className="text-gray-400 mt-2">This may take a few moments...</Text>
//                     </View>
//                 </View>
//             )}
//         </View>
//     );
// };

// export default ReportsPage;
import {
    BarChart3,
    Calendar,
    Car,
    CreditCard,
    Database,
    Download,
    FileText,
    Filter,
    Package,
    Shield,
    Sparkles,
    TrendingUp,
    UserCheck,
    Users
} from 'lucide-react';
import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import useReportsData from '../../lib/pages/useReportsData';
import './css/reports.css';

const { width, height } = Dimensions.get('window');
const isDesktop = width >= 768;
const isTablet = width >= 600 && width < 768;
const isSmallMobile = width < 375;

// Bottom tab height - adjust this based on your actual tab height
const BOTTOM_TAB_HEIGHT = 80;
const CONTENT_PADDING_BOTTOM = BOTTOM_TAB_HEIGHT + 20;

const reports = [
    { 
        key: 'financial', 
        name: 'Financial Report', 
        description: 'Comprehensive report on income, expenses, and profit analysis.',
        icon: <BarChart3 size={isSmallMobile ? 24 : isTablet ? 28 : 32} className="text-green-400" />,
        color: 'from-green-500/20 to-emerald-600/20',
        borderColor: 'border-green-500/30',
        buttonColor: 'bg-gradient-to-r from-green-500 to-emerald-600'
    },
    { 
        key: 'clients', 
        name: 'Client Report', 
        description: 'Detailed analytics on all registered clients and their spending patterns.',
        icon: <Users size={isSmallMobile ? 24 : isTablet ? 28 : 32} className="text-blue-400" />,
        color: 'from-blue-500/20 to-cyan-600/20',
        borderColor: 'border-blue-500/30',
        buttonColor: 'bg-gradient-to-r from-blue-500 to-cyan-600'
    },
    { 
        key: 'staff', 
        name: 'Staff Report', 
        description: 'Performance metrics and productivity analysis for staff members.',
        icon: <UserCheck size={isSmallMobile ? 24 : isTablet ? 28 : 32} className="text-purple-400" />,
        color: 'from-purple-500/20 to-violet-600/20',
        borderColor: 'border-purple-500/30',
        buttonColor: 'bg-gradient-to-r from-purple-500 to-violet-600'
    },
    { 
        key: 'inventory', 
        name: 'Inventory Report', 
        description: 'Current stock levels, turnover rates, and inventory valuation.',
        icon: <Package size={isSmallMobile ? 24 : isTablet ? 28 : 32} className="text-orange-400" />,
        color: 'from-orange-500/20 to-amber-600/20',
        borderColor: 'border-orange-500/30',
        buttonColor: 'bg-gradient-to-r from-orange-500 to-amber-600'
    },
    { 
        key: 'carYard', 
        name: 'Car Yard Report', 
        description: 'Complete database of vehicles with maintenance history and status.',
        icon: <Car size={isSmallMobile ? 24 : isTablet ? 28 : 32} className="text-red-400" />,
        color: 'from-red-500/20 to-rose-600/20',
        borderColor: 'border-red-500/30',
        buttonColor: 'bg-gradient-to-r from-red-500 to-rose-600'
    },
    { 
        key: 'transactions', 
        name: 'Transactions Report', 
        description: 'Comprehensive records of all financial transactions and payments.',
        icon: <CreditCard size={isSmallMobile ? 24 : isTablet ? 28 : 32} className="text-indigo-400" />,
        color: 'from-indigo-500/20 to-blue-600/20',
        borderColor: 'border-indigo-500/30',
        buttonColor: 'bg-gradient-to-r from-indigo-500 to-blue-600'
    },
];

const ReportsPage: React.FC = () => {
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [activeReport, setActiveReport] = useState<string | null>(null);

    const { data, loading, error, fetchReports } = useReportsData();

    const handleFetchReports = async (reportKey: string) => {
        if (!startDate || !endDate) {
            alert('Please select a start and end date.');
            return;
        }
        
        setActiveReport(reportKey);
        const start = new Date(startDate);
        const end = new Date(endDate);
        await fetchReports(reportKey, start, end);
    };

    const getReportFileName = (reportName: string) => {
        const start = startDate || 'start';
        const end = endDate || 'end';
        return `${reportName.replace(/\s+/g, '_')}_${start}_to_${end}.csv`;
    };

    const getReportStats = (reportKey: string) => {
        const reportData = data[reportKey];
        if (!reportData || reportData.length === 0) return null;

        return {
            totalRecords: reportData.length,
            columns: Object.keys(reportData[0] || {}).length,
            sampleData: reportData.slice(0, 3)
        };
    };

    return (
        <View className="flex-1 bg-gradient-to-br from-[#0A0F1E] via-[#1A2033] to-[#0A0F1E]" style={{ paddingBottom: BOTTOM_TAB_HEIGHT }}>
            {/* Header Section */}
            <View className={`${isDesktop ? 'px-8 pt-8' : isTablet ? 'px-6 pt-6' : 'px-4 pt-6'} mb-6`}>
                <View className={`${isDesktop ? 'flex-row items-center justify-between' : 'flex-col'} mb-6`}>
                    <View className={`flex-row items-center ${isDesktop ? 'mb-0' : 'mb-4'} ${isSmallMobile ? 'flex-col text-center' : ''}`}>
                        <View className={`bg-gradient-to-r from-purple-500 to-blue-600 p-3 rounded-2xl ${isSmallMobile ? 'mr-0 mb-3' : 'mr-4'}`}>
                            <BarChart3 size={isSmallMobile ? 24 : isTablet ? 28 : 32} color="white" />
                        </View>
                        <View className={isSmallMobile ? 'items-center' : ''}>
                            <Text className={`text-white font-bold ${isSmallMobile ? 'text-2xl text-center' : isTablet ? 'text-3xl' : 'text-3xl'}`}>
                                Reports Dashboard
                            </Text>
                            <Text className={`text-gray-400 ${isSmallMobile ? 'text-sm text-center' : isTablet ? 'text-base' : 'text-lg'}`}>
                                Generate comprehensive business reports
                            </Text>
                        </View>
                    </View>
                    {!isSmallMobile && (
                        <View className="flex-row items-center bg-white/5 px-4 py-2 rounded-full">
                            <Sparkles size={isTablet ? 16 : 20} className="text-yellow-400 mr-2" />
                            <Text className="text-white font-semibold text-sm">Real-time Analytics</Text>
                        </View>
                    )}
                </View>

                {/* Date Range Selector */}
                <View className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-4 border border-white/10">
                    <View className={`${isDesktop ? 'flex-row items-center justify-between' : 'flex-col'} mb-4`}>
                        <View className="flex-row items-center mb-2">
                            <Calendar size={isSmallMobile ? 18 : 24} className="text-blue-400 mr-3" />
                            <Text className={`text-white font-bold ${isSmallMobile ? 'text-lg' : 'text-xl'}`}>
                                Select Analysis Period
                            </Text>
                        </View>
                        <View className="flex-row items-center bg-blue-500/20 px-3 py-1 rounded-full self-start">
                            <Filter size={isSmallMobile ? 14 : 16} className="text-blue-400 mr-2" />
                            <Text className="text-blue-400 text-sm">Custom Range</Text>
                        </View>
                    </View>
                    
                    <View className={`${isDesktop ? 'flex-row space-x-6' : 'space-y-4'} items-end`}>
                        <View className={`${isDesktop ? 'flex-1' : 'w-full'}`}>
                            <Text className="text-gray-300 mb-2 flex-row items-center text-sm">
                                <TrendingUp size={isSmallMobile ? 14 : 16} className="mr-2" />
                                Start Date
                            </Text>
                            <View className="relative">
                                <Calendar size={isSmallMobile ? 16 : 20} className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="w-full bg-gray-700/80 text-white p-3 pl-12 rounded-xl border border-gray-600/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
                                />
                            </View>
                        </View>
                        <View className={`${isDesktop ? 'flex-1' : 'w-full'}`}>
                            <Text className="text-gray-300 mb-2 flex-row items-center text-sm">
                                <FileText size={isSmallMobile ? 14 : 16} className="mr-2" />
                                End Date
                            </Text>
                            <View className="relative">
                                <Calendar size={isSmallMobile ? 16 : 20} className="absolute left-3 top-3 text-gray-400" />
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    min={startDate}
                                    className="w-full bg-gray-700/80 text-white p-3 pl-12 rounded-xl border border-gray-600/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            {/* Error Display */}
            {error && (
                <View className={`mx-4 mb-6 bg-gradient-to-r from-red-500/20 to-rose-600/20 border border-red-500/30 rounded-2xl p-4 ${isDesktop ? 'mx-8' : 'mx-4'}`}>
                    <View className="flex-row items-center">
                        <Shield size={isSmallMobile ? 16 : 20} className="text-red-400 mr-3" />
                        <Text className="text-red-400 font-semibold text-sm">⚠️ {error}</Text>
                    </View>
                </View>
            )}

            {/* Scrollable Content */}
            <ScrollView 
                className="flex-1"
                contentContainerStyle={{ 
                    paddingBottom: CONTENT_PADDING_BOTTOM,
                    paddingHorizontal: isDesktop ? 32 : isTablet ? 24 : 16
                }}
                showsVerticalScrollIndicator={false}
            >
                {/* Reports Grid */}
                <View className={`grid ${isDesktop ? 'grid-cols-2 xl:grid-cols-3' : isTablet ? 'grid-cols-2' : 'grid-cols-1'} gap-4 ${isDesktop ? 'gap-6' : 'gap-4'}`}>
                    {reports.map((report) => {
                        const stats = getReportStats(report.key);
                        const isActive = activeReport === report.key;
                        const isLoading = loading && isActive;

                        return (
                            <View 
                                key={report.key}
                                className={`bg-gradient-to-br ${report.color} border ${report.borderColor} rounded-2xl p-4 ${isDesktop ? 'p-6' : 'p-4'} transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
                            >
                                {/* Report Header */}
                                <View className="flex-row items-start justify-between mb-3">
                                    <View className="flex-row items-center flex-1">
                                        <View className="bg-white/10 p-2 rounded-xl mr-3">
                                            {report.icon}
                                        </View>
                                        <View className="flex-1">
                                            <Text className={`text-white font-bold ${isSmallMobile ? 'text-base' : 'text-xl'} truncate`}>
                                                {report.name}
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                {/* Stats Preview */}
                                {stats && (
                                    <View className="mb-3 bg-black/20 rounded-xl p-2">
                                        <View className="flex-row justify-between items-center">
                                            <View className="flex-row items-center">
                                                <Database size={isSmallMobile ? 12 : 16} className="text-green-400 mr-1" />
                                                <Text className="text-green-400 text-xs">{stats.totalRecords} records</Text>
                                            </View>
                                            <View className="flex-row items-center">
                                                <FileText size={isSmallMobile ? 12 : 16} className="text-blue-400 mr-1" />
                                                <Text className="text-blue-400 text-xs">{stats.columns} columns</Text>
                                            </View>
                                        </View>
                                    </View>
                                )}

                                {/* Action Buttons */}
                                <View className="space-y-2">
                                    <TouchableOpacity
                                        className={`${report.buttonColor} px-3 py-2 rounded-xl flex-row items-center justify-center transition-all duration-200 active:scale-95 ${
                                            isLoading ? 'opacity-50' : 'hover:shadow-lg'
                                        }`}
                                        onPress={() => handleFetchReports(report.key)}
                                        disabled={loading}
                                    >
                                        {isLoading ? (
                                            <View className="flex-row items-center">
                                                <View className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                                                <Text className="text-white font-semibold text-sm">Generating...</Text>
                                            </View>
                                        ) : (
                                            <View className="flex-row items-center">
                                                <BarChart3 size={isSmallMobile ? 14 : 16} className="text-white mr-2" />
                                                <Text className="text-white font-semibold text-sm">Generate Report</Text>
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                    
                                    {stats && data[report.key] && (
                                        <CSVLink
                                            data={data[report.key] || []}
                                            headers={data[report.key].length > 0 ? Object.keys(data[report.key][0]) : []}
                                            filename={getReportFileName(report.name)}
                                            className="block"
                                        >
                                            <TouchableOpacity
                                                className="bg-gradient-to-r from-gray-600 to-gray-700 px-3 py-2 rounded-xl flex-row items-center justify-center transition-all duration-200 active:scale-95 hover:shadow-lg"
                                            >
                                                <Download size={isSmallMobile ? 14 : 16} className="text-white mr-2" />
                                                <Text className="text-white font-semibold text-sm">Download CSV</Text>
                                            </TouchableOpacity>
                                        </CSVLink>
                                    )}
                                </View>

                                {/* Sample Data Preview */}
                                {stats && stats.sampleData.length > 0 && (
                                    <View className="mt-3 bg-black/30 rounded-xl p-2">
                                        <Text className="text-gray-400 text-xs font-semibold mb-1">SAMPLE DATA</Text>
                                        {stats.sampleData.map((row, index) => (
                                            <View key={index} className="flex-row justify-between py-1 border-b border-white/5 last:border-b-0">
                                                <Text className="text-gray-400 text-xs truncate flex-1">
                                                    {Object.values(row)[0] as string}
                                                </Text>
                                                <Text className="text-gray-500 text-xs">
                                                    ...{Object.keys(row).length - 1} more
                                                </Text>
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </View>
                        );
                    })}
                </View>

                {/* Quick Actions Footer */}
                <View className={`mt-6 bg-gradient-to-r from-purple-500/10 to-blue-600/10 rounded-2xl p-4 border border-purple-500/20 ${isDesktop ? 'p-6' : 'p-4'}`}>
                    <View className={`${isDesktop ? 'flex-row items-center justify-between' : 'flex-col space-y-4'}`}>
                        <View className={isDesktop ? '' : 'text-center'}>
                            <Text className={`text-white font-bold ${isSmallMobile ? 'text-base' : 'text-lg'} mb-1`}>
                                Need Bulk Reports?
                            </Text>
                            <Text className="text-gray-400 text-sm">
                                Export all reports at once or schedule automated reports
                            </Text>
                        </View>
                        <View className="flex-row space-x-2 justify-center">
                            <TouchableOpacity className="bg-purple-600 px-3 py-2 rounded-lg flex-row items-center">
                                <Download size={isSmallMobile ? 12 : 14} className="text-white mr-1" />
                                <Text className="text-white text-xs">Export All</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="bg-blue-600 px-3 py-2 rounded-lg flex-row items-center">
                                <Calendar size={isSmallMobile ? 12 : 14} className="text-white mr-1" />
                                <Text className="text-white text-xs">Schedule</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Extra spacing for bottom tab */}
                <View style={{ height: 20 }} />
            </ScrollView>

            {/* Loading Overlay */}
            {loading && (
                <View className="absolute inset-0 bg-black/70 justify-center items-center" style={{ marginBottom: BOTTOM_TAB_HEIGHT }}>
                    <View className="bg-gray-800 rounded-2xl p-6 items-center mx-4">
                        <View className={`${isSmallMobile ? 'w-12 h-12' : 'w-16 h-16'} border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4`} />
                        <Text className="text-white font-bold text-center text-sm">
                            Generating Advanced Report
                        </Text>
                        <Text className="text-gray-400 mt-2 text-xs text-center">
                            This may take a few moments...
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
};

export default ReportsPage;