import { Request, Response } from 'express';
import PurchaseOrder from '../models/purchaseOrder';  // Correct import of the model
import { generatePOPdf } from '../utils/pdfGenerator';
import pdfMake from 'pdfmake';
const path = require('path');

// Create a new Purchase Order and generate PDF
export const createPO = async (req: Request, res: Response) => {
  const { poNumber, description, totalAmount } = req.body;
  try {
    const po = await PurchaseOrder.create({ poNumber, description, totalAmount });
    const fontPath = path.join(__dirname, 'roboto.regular.ttf');

    // Generate PDF using purchase order data
    const documentDefinition = generatePOPdf(po);

    var fonts = {
      Roboto: {
        normal: fontPath,
      }
    };
    var printer = new pdfMake(fonts);

    const pdfDoc = printer.createPdfKitDocument(documentDefinition);
    
    res.setHeader('Content-Disposition', `attachment; filename="purchase_order.pdf_${poNumber}"`);
    res.setHeader('Content-Type', 'application/pdf');


    pdfDoc.pipe(res);
    pdfDoc.end();
  }  catch (error) {
    console.error(error); // Log the error for debugging
    
    if (error instanceof Error) {
      res.status(500).json({ error: 'Error creating PO', details: error.message });
    } else {
      res.status(500).json({ error: 'Error creating PO', details: 'An unknown error occurred.' });
    }
  }
};

export const getAllPOs = async (req: Request, res: Response) => {
    try {
      const pos = await PurchaseOrder.findAll();  // Fetch all POs from the database
      res.status(200).json(pos);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching POs' });
    }
  };