// api/generatePdf.js

import PDFDocument from "pdfkit";
import { Readable } from "stream";
import fs from "fs";

export default async (req, res) => {
  const doc = new PDFDocument();
  const stream = new Readable();

  doc.text("Hello, this is your report card!");

  stream.push(doc);
  stream.push(null);

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=report_card.pdf");

  stream.pipe(res);
};
