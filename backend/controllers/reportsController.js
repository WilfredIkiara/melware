const supabase = require('../db');
const ExcelJS = require('exceljs');

// Helper: Format month boundaries
function getMonthDates(month, year) {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59);
  return { startDate, endDate };
}

// @desc Generate Monthly Report
// @route GET /api/reports/monthly?month=MM&year=YYYY
exports.generateMonthlyReport = async (req, res) => {
  try {
    const { month, year } = req.query;

    if (!month || !year) {
      return res.status(400).json({ success: false, message: "Month and Year are required" });
    }

    const { startDate, endDate } = getMonthDates(month, year);

    // Fetch Payments
    const { data: payments, error: paymentsError } = await supabase
      .from('paybill_payments')
      .select('*')
      .gte('payment_date', startDate.toISOString())
      .lte('payment_date', endDate.toISOString());

    if (paymentsError) throw paymentsError;

    // Fetch Expenses
    const { data: expenses, error: expensesError } = await supabase
      .from('expenses')
      .select('*')
      .gte('expense_date', startDate.toISOString())
      .lte('expense_date', endDate.toISOString());

    if (expensesError) throw expensesError;

    // Fetch Services
    const { data: services, error: servicesError } = await supabase
      .from('client_services')
      .select('*')
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString());

    if (servicesError) throw servicesError;

    // Calculate Monthly Income
    const totalPayments = payments.reduce((sum, p) => sum + parseFloat(p.amount || 0), 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + parseFloat(e.total_cost || 0), 0);
    const monthlyIncome = totalPayments - totalExpenses;

    // Generate Excel File
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet(`Report_${month}_${year}`);

    // Add Report Title
    sheet.mergeCells('A1', 'D1');
    sheet.getCell('A1').value = `Monthly Report - ${month}/${year}`;
    sheet.getCell('A1').font = { size: 16, bold: true };
    sheet.getRow(2).values = [];

    // Payments Section
    sheet.addRow(['Payments']);
    sheet.addRow(['Transaction ID', 'Amount', 'Account Number', 'Sender Name', 'Date']);
    payments.forEach(p =>
      sheet.addRow([p.transaction_id, p.amount, p.account_number, p.sender_name, p.payment_date])
    );
    sheet.addRow([]);

    // Expenses Section
    sheet.addRow(['Expenses']);
    sheet.addRow(['Expense Code', 'Item', 'Category', 'Total Cost', 'Date']);
    expenses.forEach(e =>
      sheet.addRow([e.expense_code, e.item_name, e.category, e.total_cost, e.expense_date])
    );
    sheet.addRow([]);

    // Services Section
    sheet.addRow(['Services']);
    sheet.addRow(['Service Type', 'Cost', 'Paid Status', 'Date']);
    services.forEach(s =>
      sheet.addRow([s.service_type, s.service_cost, s.paid_status ? 'Paid' : 'Unpaid', s.created_at])
    );
    sheet.addRow([]);

    // Monthly Income Section
    sheet.addRow(['Monthly Income Summary']);
    sheet.addRow(['Total Payments', 'Total Expenses', 'Monthly Income']);
    sheet.addRow([totalPayments, totalExpenses, monthlyIncome]);

    // Send Excel File
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=Monthly_Report_${month}_${year}.xlsx`
    );

    await workbook.xlsx.write(res);
    res.end();

  } catch (error) {
    console.error('Error generating monthly report:', error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
