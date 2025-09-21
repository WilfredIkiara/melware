const supabase = require('../db');

const getFinancialReport = async (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Start and end dates are required.' });
    }

    try {
        // Fetch client service payments
        const { data: servicePayments, error: serviceError } = await supabase
            .from('client_services')
            .select('service_type, service_cost, created_at')
            .gte('created_at', startDate)
            .lte('created_at', endDate)
            .eq('paid_status', true);

        if (serviceError) throw serviceError;

        // Fetch expenses
        const { data: expenses, error: expenseError } = await supabase
            .from('expenses')
            .select('item_name, total_cost, expense_date')
            .gte('expense_date', startDate)
            .lte('expense_date', endDate);

        if (expenseError) throw expenseError;

        // Fetch paybill payments
        const { data: paybillPayments, error: paybillError } = await supabase
            .from('paybill_payments')
            .select('transaction_id, amount, payment_date')
            .gte('payment_date', startDate)
            .lte('payment_date', endDate);

        if (paybillError) throw paybillError;

        // Consolidate and format data for the report
        const reportData = [];
        servicePayments.forEach(payment => {
            reportData.push({
                'Date': new Date(payment.created_at).toLocaleDateString(),
                'Type': 'Income',
                'Source': payment.service_type,
                'Amount': payment.service_cost,
            });
        });

        expenses.forEach(expense => {
            reportData.push({
                'Date': new Date(expense.expense_date).toLocaleDateString(),
                'Type': 'Expense',
                'Source': expense.item_name,
                'Amount': -expense.total_cost, // Negative value for expenses
            });
        });

        paybillPayments.forEach(payment => {
            reportData.push({
                'Date': new Date(payment.payment_date).toLocaleDateString(),
                'Type': 'Paybill Income',
                'Source': 'Paybill',
                'Amount': payment.amount,
            });
        });

        return res.status(200).json(reportData);
    } catch (err) {
        console.error('Error fetching financial report:', err.message);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

const getClientsReport = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('clients')
            .select('first_name, last_name, email, phone_number, created_at, total_spent');

        if (error) throw error;
        
        const formattedData = data.map(client => ({
            'First Name': client.first_name,
            'Last Name': client.last_name,
            'Email': client.email,
            'Phone Number': client.phone_number,
            'Total Spent': client.total_spent,
            'Registration Date': new Date(client.created_at).toLocaleDateString(),
        }));

        return res.status(200).json(formattedData);
    } catch (err) {
        console.error('Error fetching client report:', err.message);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

const getStaffReport = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('staff')
            .select('first_name, last_name, email, phone, location, services_offered');

        if (error) throw error;
        
        const formattedData = data.map(staff => ({
            'First Name': staff.first_name,
            'Last Name': staff.last_name,
            'Email': staff.email,
            'Phone': staff.phone,
            'Location': staff.location,
            'Services Offered': staff.services_offered.join(', ')
        }));

        return res.status(200).json(formattedData);
    } catch (err) {
        console.error('Error fetching staff report:', err.message);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

const getInventoryReport = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('garage_inventory')
            .select('item_name, category, current_stock, purchase_price, selling_price, supplier_name, status, expiry_date');

        if (error) throw error;

        const formattedData = data.map(item => ({
            'Item Name': item.item_name,
            'Category': item.category,
            'Current Stock': item.current_stock,
            'Purchase Price': item.purchase_price,
            'Selling Price': item.selling_price,
            'Supplier': item.supplier_name,
            'Status': item.status,
            'Expiry Date': item.expiry_date ? new Date(item.expiry_date).toLocaleDateString() : 'N/A'
        }));

        return res.status(200).json(formattedData);
    } catch (err) {
        console.error('Error fetching inventory report:', err.message);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

const getCarYardReport = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('cars')
            .select('model, make, licence_plate, milage, created_at, client_id');
        
        if (error) throw error;

        const formattedData = data.map(car => ({
            'Model': car.model,
            'Make': car.make,
            'Licence Plate': car.licence_plate,
            'Mileage': car.milage,
            'Client ID': car.client_id,
            'Date Added': new Date(car.created_at).toLocaleDateString(),
        }));

        return res.status(200).json(formattedData);
    } catch (err) {
        console.error('Error fetching car yard report:', err.message);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

const getTransactionsReport = async (req, res) => {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
        return res.status(400).json({ message: 'Start and end dates are required.' });
    }

    try {
        // Fetch client services (transactions)
        const { data: clientServices, error: serviceError } = await supabase
            .from('client_services')
            .select('service_type, service_cost, paid_status, created_at, notes, client_id, service_expenses')
            .gte('created_at', startDate)
            .lte('created_at', endDate);

        if (serviceError) throw serviceError;

        // Fetch paybill payments
        const { data: paybillPayments, error: paybillError } = await supabase
            .from('paybill_payments')
            .select('transaction_id, amount, account_number, sender_name, payment_date')
            .gte('payment_date', startDate)
            .lte('payment_date', endDate);

        if (paybillError) throw paybillError;

        // Fetch general expenses
        const { data: expenses, error: expenseError } = await supabase
            .from('expenses')
            .select('item_name, category, total_cost, payment_method, expense_date')
            .gte('expense_date', startDate)
            .lte('expense_date', endDate);

        if (expenseError) throw expenseError;

        const reportData = [
            ...clientServices.map(service => ({
                'Transaction ID': service.id,
                'Date': new Date(service.created_at).toLocaleDateString(),
                'Type': 'Service',
                'Details': service.service_type,
                'Amount': service.service_cost,
                'Status': service.paid_status ? 'Paid' : 'Pending',
                'Source/Notes': service.notes,
            })),
            ...paybillPayments.map(payment => ({
                'Transaction ID': payment.id,
                'Date': new Date(payment.payment_date).toLocaleDateString(),
                'Type': 'Paybill',
                'Details': `Payment from ${payment.sender_name}`,
                'Amount': payment.amount,
                'Status': 'Paid',
                'Source/Notes': `Account: ${payment.account_number}`,
            })),
            ...expenses.map(expense => ({
                'Transaction ID': expense.id,
                'Date': new Date(expense.expense_date).toLocaleDateString(),
                'Type': 'Expense',
                'Details': `${expense.item_name} (${expense.category})`,
                'Amount': -expense.total_cost, // Negative for expenses
                'Status': 'Paid',
                'Source/Notes': `Method: ${expense.payment_method}`,
            }))
        ];

        // Sort data by date
        reportData.sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime());

        return res.status(200).json(reportData);
    } catch (err) {
        console.error('Error fetching transactions report:', err.message);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};


module.exports = {
    getFinancialReport,
    getClientsReport,
    getStaffReport,
    getInventoryReport,
    getCarYardReport,
    getTransactionsReport
};