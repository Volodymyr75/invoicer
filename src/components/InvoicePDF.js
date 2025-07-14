import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

// Register fonts
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/helvetica/v11/KAM9YZA-s2d2fA6s8w.woff2' }, // Regular
    { src: 'https://fonts.gstatic.com/s/helvetica/v11/KAM9YZA-s2d2fA6s8g.woff2', fontWeight: 'bold' }, // Bold
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 11,
    padding: 40,
    backgroundColor: '#fff',
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#333',
    paddingBottom: 10,
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerText: {
    textAlign: 'right',
  },
  detailsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 30,
  },
  detailBlock: {
    maxWidth: '45%',
  },
  detailTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#f4f7fa',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 8,
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 8,
  },
  tableCellHeader: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  tableCell: {
    fontSize: 10,
  },
  descriptionCol: { width: '40%' },
  qtyCol: { width: '15%' },
  rateCol: { width: '20%' },
  totalCol: { width: '25%' },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    color: '#888',
    fontSize: 10,
  },
});

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
};

const InvoicePDF = ({ invoice, grandTotal }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>INVOICE</Text>
        <View style={styles.headerText}>
          <Text>Invoice #: {invoice.invoiceNumber}</Text>
          <Text>Date: {new Date(invoice.invoiceDate).toLocaleDateString()}</Text>
        </View>
      </View>

      <View style={styles.detailsSection}>
        <View style={styles.detailBlock}>
          <Text style={styles.detailTitle}>From:</Text>
          <Text>{invoice.yourName}</Text>
          <Text>{invoice.yourCompany}</Text>
        </View>
        <View style={styles.detailBlock}>
          <Text style={styles.detailTitle}>To:</Text>
          <Text>{invoice.clientName}</Text>
          <Text>{invoice.clientCompany}</Text>
        </View>
      </View>

      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <View style={[styles.tableColHeader, styles.descriptionCol]}><Text style={styles.tableCellHeader}>Description</Text></View>
          <View style={[styles.tableColHeader, styles.qtyCol]}><Text style={styles.tableCellHeader}>Qty</Text></View>
          <View style={[styles.tableColHeader, styles.rateCol]}><Text style={styles.tableCellHeader}>Rate</Text></View>
          <View style={[styles.tableColHeader, styles.totalCol]}><Text style={styles.tableCellHeader}>Total</Text></View>
        </View>
        {/* Table Body */}
        {invoice.items.map(item => (
          <View style={styles.tableRow} key={item.id}>
            <View style={[styles.tableCol, styles.descriptionCol]}><Text style={styles.tableCell}>{item.description}</Text></View>
            <View style={[styles.tableCol, styles.qtyCol]}><Text style={styles.tableCell}>{item.qty}</Text></View>
            <View style={[styles.tableCol, styles.rateCol]}><Text style={styles.tableCell}>{formatCurrency(item.rate)}</Text></View>
            <View style={[styles.tableCol, styles.totalCol]}><Text style={styles.tableCell}>{formatCurrency((item.qty || 0) * (item.rate || 0))}</Text></View>
          </View>
        ))}
      </View>

      <View style={styles.totalSection}>
        <Text style={styles.totalText}>Total: {formatCurrency(grandTotal)}</Text>
      </View>

      <Text style={styles.footer}>Thank you for your business!</Text>
    </Page>
  </Document>
);

export default InvoicePDF;
