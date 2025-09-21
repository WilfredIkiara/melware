import { useState } from 'react';
const backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL || 'http://localhost:3001';

interface ReportsHook {
    data: { [key: string]: any[] };
    loading: boolean;
    error: string | null;
    fetchReports: (reportKey: string, startDate: Date, endDate: Date) => Promise<void>;
}

const useReportsData = (): ReportsHook => {
    const [data, setData] = useState<{ [key: string]: any[] }>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchReports = async (reportKey: string, startDate: Date, endDate: Date): Promise<void> => {
        setLoading(true);
        setError(null);

        try {
            const start = startDate.toISOString();
            const end = endDate.toISOString();

            const response = await fetch(`${backendUrl}/api/reports/${reportKey}?startDate=${start}&endDate=${end}`);
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || `Failed to fetch ${reportKey} report.`);
            }

            const reportData = await response.json();
            setData(prev => ({ ...prev, [reportKey]: reportData }));
        } catch (err: any) {
            setError(err.message);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, fetchReports };
};

export default useReportsData;