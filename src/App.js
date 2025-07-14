import React from 'react';
import './App.css';

function App() {
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
              <input type="text" placeholder="e.g., John Doe" />
            </div>
            <div className="form-group">
              <label>Your Company</label>
              <input type="text" placeholder="e.g., Doe Services Inc." />
            </div>
            <div className="form-group">
              <label>Invoice #</label>
              <input type="text" placeholder="e.g., 001" />
            </div>
            <div className="form-group">
              <label>Invoice Date</label>
              <input type="date" />
            </div>
          </div>

          <hr />

          <h3>Bill To</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Client's Name</label>
              <input type="text" placeholder="e.g., Jane Smith" />
            </div>
            <div className="form-group">
              <label>Client's Company</label>
              <input type="text" placeholder="e.g., Smith Web Design" />
            </div>
          </div>

          <hr />

          <h3>Items</h3>
          <div className="item-list">
            <div className="item">
              <input type="text" placeholder="Description" className="item-description" />
              <input type="number" placeholder="Qty" className="item-qty" />
              <input type="number" placeholder="Rate" className="item-rate" />
              <span className="item-total">$0.00</span>
              <button className="delete-item-btn">×</button>
            </div>
            <div className="item">
              <input type="text" placeholder="Description" className="item-description" />
              <input type="number" placeholder="Qty" className="item-qty" />
              <input type="number" placeholder="Rate" className="item-rate" />
              <span className="item-total">$0.00</span>
              <button className="delete-item-btn">×</button>
            </div>
          </div>
          <button className="add-item-btn">+ Add Item</button>

        </section>

        <section className="preview-section">
          <div className="invoice-preview">
            <div className="preview-header">
              <h2>INVOICE</h2>
              <span>#001</span>
            </div>
            <div className="preview-details">
              <div>
                <p><strong>From:</strong></p>
                <p>John Doe</p>
                <p>Doe Services Inc.</p>
              </div>
              <div>
                <p><strong>To:</strong></p>
                <p>Jane Smith</p>
                <p>Smith Web Design</p>
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
                <tr>
                  <td>Website Development</td>
                  <td>10</td>
                  <td>$50.00</td>
                  <td>$500.00</td>
                </tr>
                <tr>
                  <td>Logo Design</td>
                  <td>1</td>
                  <td>$250.00</td>
                  <td>$250.00</td>
                </tr>
              </tbody>
            </table>
            <div className="preview-total">
              <p><strong>Total:</strong> $750.00</p>
            </div>
            <div className="preview-footer">
              <p>Thank you for your business!</p>
            </div>
          </div>
          <button className="download-btn">Download PDF</button>
        </section>
      </main>
    </div>
  );
}

export default App;