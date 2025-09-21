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
            // Get total revenue - fixed syntax
            supabase.from('paybill_payments').select('amount'),
            // Get transaction count
            supabase.from('paybill_payments').select('id', { count: 'exact', head: true }),
            // Get total cars
            supabase.from('cars').select('id', { count: 'exact', head: true }),
            // Get low stock count
            supabase.from('garage_inventory').select('id', { count: 'exact', head: true }).lt('current_stock', 10),
            // Get total expenses - fixed syntax
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

        // Fetch Customer Insights
        const [
            topCustomersRes,
            newCustomersRes,
            outstandingBalancesRes
        ] = await Promise.all([
            supabase.from('clients').select('first_name, last_name, total_spent').order('total_spent', { ascending: false }).limit(3),
            supabase.from('clients').select('first_name, last_name, created_at').gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
            supabase.from('cars').select('client_id, balance').gt('balance', 0)
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
                profile:profiles(name)
            `)
            .order('timestamp', { ascending: false })
            .limit(10);

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