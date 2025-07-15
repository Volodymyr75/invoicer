import React, { useState, useEffect, useMemo } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from './components/InvoicePDF';
import './App.css';

// Helper to format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

function App() {
  const [invoice, setInvoice] = useState({
    yourName: 'John Doe',
    yourCompany: 'Doe Services Inc.',
    invoiceNumber: '001',
    invoiceDate: new Date().toISOString().split('T')[0],
    clientName: 'Jane Smith',
    clientCompany: 'Smith Web Design',
    items: [
      { id: 1, description: 'Website Development', qty: 10, rate: 50 },
      { id: 2, description: 'Logo Design', qty: 1, rate: 250 },
    ],
  });

  const [grandTotal, setGrandTotal] = useState(0);

  // Recalculate grand total whenever items change
  useEffect(() => {
    const total = invoice.items.reduce((sum, item) => {
      return sum + (Number(item.qty) || 0) * (Number(item.rate) || 0);
    }, 0);
    setGrandTotal(total);
  }, [invoice.items]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleItemChange = (id, e) => {
    const { name, value } = e.target;
    const newItems = invoice.items.map((item) => {
      if (item.id === id) {
        return { ...item, [name]: value };
      }
      return item;
    });
    setInvoice((prev) => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    const newItem = {
      id: Date.now(), // Simple unique ID
      description: '',
      qty: 1,
      rate: 0,
    };
    setInvoice((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  const deleteItem = (id) => {
    const newItems = invoice.items.filter((item) => item.id !== id);
    setInvoice((prev) => ({ ...prev, items: newItems }));
  };

  // Memoize the PDF document to prevent re-creation on every render
  const memoizedInvoicePDF = useMemo(() => (
    <InvoicePDF invoice={invoice} grandTotal={grandTotal} />
  ), [invoice, grandTotal]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Invoicer</h1>
        <p>Create & Download Professional Invoices</p>
      </header>

      <main className="main-content">
        <section className="form-section">
          <h2>Invoice Details</h2>

          <div className="form-grid">
            <div className="form-group">
              <label>Your Name</label>
              <input type="text" name="yourName" value={invoice.yourName} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Your Company</label>
              <input type="text" name="yourCompany" value={invoice.yourCompany} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Invoice #</label>
              <input type="text" name="invoiceNumber" value={invoice.invoiceNumber} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Invoice Date</label>
              <input type="date" name="invoiceDate" value={invoice.invoiceDate} onChange={handleInputChange} />
            </div>
          </div>

          <hr />

          <h3>Bill To</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Client's Name</label>
              <input type="text" name="clientName" value={invoice.clientName} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Client's Company</label>
              <input type="text" name="clientCompany" value={invoice.clientCompany} onChange={handleInputChange} />
            </div>
          </div>

          <hr />

          <h3>Items</h3>
          <div className="item-list">
            {invoice.items.map((item) => (
              <div className="item" key={item.id}>
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  className="item-description"
                  value={item.description}
                  onChange={(e) => handleItemChange(item.id, e)}
                />
                <input
                  type="number"
                  name="qty"
                  placeholder="Qty"
                  className="item-qty"
                  value={item.qty}
                  onChange={(e) => handleItemChange(item.id, e)}
                />
                <input
                  type="number"
                  name="rate"
                  placeholder="Rate"
                  className="item-rate"
                  value={item.rate}
                  onChange={(e) => handleItemChange(item.id, e)}
                />
                <span className="item-total">{formatCurrency((item.qty || 0) * (item.rate || 0))}</span>
                <button className="delete-item-btn" onClick={() => deleteItem(item.id)}>×</button>
              </div>
            ))}
          </div>
          <button className="add-item-btn" onClick={addItem}>+ Add Item</button>
        </section>

        <section className="preview-section">
          <div className="invoice-preview">
            <div className="preview-header">
              <h2>INVOICE</h2>
              <span>#{invoice.invoiceNumber}</span>
            </div>
            <div className="preview-details">
              <div>
                <p><strong>From:</strong></p>
                <p>{invoice.yourName}</p>
                <p>{invoice.yourCompany}</p>
              </div>
              <div>
                <p><strong>To:</strong></p>
                <p>{invoice.clientName}</p>
                <p>{invoice.clientCompany}</p>
              </div>
            </div>
            <table className="preview-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Rate</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.description}</td>
                    <td>{item.qty}</td>
                    <td>{formatCurrency(item.rate)}</td>
                    <td>{formatCurrency((item.qty || 0) * (item.rate || 0))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="preview-total">
              <p><strong>Total:</strong> {formatCurrency(grandTotal)}</p>
            </div>
            <div className="preview-footer">
              <p>Thank you for your business!</p>
            </div>
          </div>
          <PDFDownloadLink
            document={memoizedInvoicePDF}
            fileName={`invoice-${invoice.invoiceNumber}.pdf`}
            className="download-btn"
          >
            {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
          </PDFDownloadLink>
        </section>
      </main>
    </div>
  );
}

export default App;
