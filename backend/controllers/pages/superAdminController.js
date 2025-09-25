const supabase = require('../../db');

exports.getSuperAdminData = async (req, res) => {
    try {
        // Fetch Dashboard Stats
        const [
            totalRevenueRes,
            transactionCountRes,
            totalCarsRes,
            lowStockCountRes,
            totalExpensesRes,
            totalClientsRes
        ] = await Promise.all([
            // Get total revenue
            supabase.from('paybill_payments').select('amount'),
            // Get transaction count
            supabase.from('paybill_payments').select('id', { count: 'exact', head: true }),
            // Get total cars
            supabase.from('cars').select('id', { count: 'exact', head: true }),
            // Get low stock count
            supabase.from('garage_inventory').select('id', { count: 'exact', head: true }).lt('current_stock', 10),
            // Get total expenses
            supabase.from('expenses').select('total_cost'),
            // Get total clients
            supabase.from('clients').select('id', { count: 'exact', head: true })
        ]);

        // Calculate totals manually
        const totalRevenue = totalRevenueRes.data?.reduce((sum, item) => sum + (item.amount || 0), 0) || 0;
        const totalExpenses = totalExpensesRes.data?.reduce((sum, item) => sum + (item.total_cost || 0), 0) || 0;

        // Fetch Financials
        const { data: expenseBreakdown, error: expenseError } = await supabase
            .from('expenses')
            .select('category, total_cost')
            .order('total_cost', { ascending: false });

        // Fetch Inventory
        const { data: lowStockItems, error: lowStockError } = await supabase
            .from('garage_inventory')
            .select('*')
            .lt('current_stock', 10);
            
        const { data: expiringItems, error: expiringError } = await supabase
            .from('garage_inventory')
            .select('*')
            .lt('expiry_date', new Date().toISOString());

        // First, get outstanding balances to get client IDs
        const { data: outstandingBalancesData, error: outstandingBalancesError } = await supabase
            .from('cars')
            .select('client_id')
            .gt('balance', 0);

        const outstandingClientIds = outstandingBalancesData?.map(car => car.client_id).filter(id => id) || [];

        // Fetch Customer Insights
        const [
            topCustomersRes,
            newCustomersRes,
            outstandingBalancesRes
        ] = await Promise.all([
            // Include id field
            supabase.from('clients').select('id, first_name, last_name, total_spent, phone_number, created_at').order('total_spent', { ascending: false }).limit(5),
            // Include id field  
            supabase.from('clients').select('id, first_name, last_name, created_at, phone_number').gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()).limit(5),
            // Fix outstanding balances - use the client IDs we fetched earlier
            supabase.from('clients').select('id, first_name, last_name, phone_number, created_at').in('id', outstandingClientIds).limit(5)
        ]);

        // Fetch Staff & Payroll
        const { data: payrollOverview, error: payrollError } = await supabase
            .from('staff_payroll')
            .select(`
                *,
                staff(first_name, last_name)
            `);

        // Fetch Recent Activity Log
        const { data: activities, error: activityError } = await supabase
            .from('user_activity_log')
            .select(`
                *,
                profiles:profile_id(first_name, last_name)
            `)
            .order('timestamp', { ascending: false })
            .limit(10);

        if (activities && activities.length > 0) {
            const profileIds = activities.map(act => act.profile_id).filter(id => id);
            const { data: profiles, error: profilesError } = await supabase
                .from('profiles')
                .select('id, first_name, last_name')
                .in('id', profileIds);

            // Combine activities with profile names
            if (profiles) {
                const profileMap = {};
                profiles.forEach(profile => {
                    profileMap[profile.id] = {
                        first_name: profile.first_name || 'Unknown',
                        last_name: profile.last_name || 'User'
                    };
                });

                activities.forEach(activity => {
                    activity.profiles = profileMap[activity.profile_id] || { first_name: 'Unknown', last_name: 'User' };
                });
            }
        }

        // Fetch Work Orders
        const { data: workOrders, error: workOrdersError } = await supabase
            .from('work_orders')
            .select(`
                *,
                clients(first_name, last_name, email),
                client_vehicles(make, licence_plate),
                staff(first_name, last_name)
            `)
            .order('created_at', { ascending: false })
            .limit(10);

        // Fetch Appointments
        const { data: appointments, error: appointmentsError } = await supabase
            .from('appointments')
            .select(`
                *,
                clients(first_name, last_name, phone_number),
                client_vehicles(make, licence_plate)
            `)
            .order('scheduled_time', { ascending: true })
            .limit(10);
            
        res.json({
            stats: {
                financials: {
                    total_revenue: totalRevenue,
                    transaction_count: transactionCountRes.count || 0
                },
                cars: { total_cars: totalCarsRes.count || 0 },
                inventory: { low_stock_count: lowStockCountRes.count || 0 },
                expenses: { total_expenses: totalExpenses },
                clients: { total_clients: totalClientsRes.count || 0 }
            },
            financials: {
                expenseBreakdown: expenseBreakdown || []
            },
            inventory: {
                lowStockItems: lowStockItems || [],
                expiringItems: expiringItems || []
            },
            customers: {
                topCustomers: topCustomersRes.data || [],
                newCustomersThisWeek: newCustomersRes.data || [],
                outstandingBalances: outstandingBalancesRes.data || []
            },
            staff: {
                payrollOverview: payrollOverview || []
            },
            activities: activities || [],
            workOrders: workOrders || [],
            appointments: appointments || []
        });

    } catch (error) {
        console.error('Error fetching super admin data:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard data', details: error.message });
    }
};
// ... rest of your controller methods remain the same
exports.addActivityLog = async (req, res, next) => {
    const { activity_type, description, route } = req.body;
    const profile_id = req.user.id;
    
    try {
        await supabase.from('user_activity_log').insert([{
            profile_id,
            activity_type,
            description,
            route
        }]);
        next();
    } catch (error) {
        console.error('Error logging activity:', error);
        next();
    }
};

exports.addJob = async (req, res) => {
    const newJob = { status: 'Dummy Job Added' };
    await this.addActivityLog(req, res, () => {});
    res.status(201).json(newJob);
};

exports.addExpense = async (req, res) => {
    const newExpense = { status: 'Dummy Expense Added' };
    await this.addActivityLog(req, res, () => {});
    res.status(201).json(newExpense);
};

exports.addCustomer = async (req, res) => {
    const newCustomer = { status: 'Dummy Customer Added' };
    await this.addActivityLog(req, res, () => {});
    res.status(201).json(newCustomer);
};