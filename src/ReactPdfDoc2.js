import React from 'react';
import ReactECharts from 'echarts-for-react';
import { Page, Document, PDFViewer } from '@react-pdf/renderer';

import { option1 } from './utils';
import { webSvgToPdfSvg } from './ReactPDFChart.tsx'


import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';

const onFinished = () => {
  console.log('Rendering is finsihed!!!');
}
const onEvents = {
  'finished': onFinished,
}

const comp = <ReactECharts
  option={option1}
  style={{ height: 400, width: 800 }}
  opts={{ renderer: 'svg' }}
  onEvents={onEvents}
  />

const div = document.createElement('div');
const root = createRoot(div);
flushSync(() => {
  root.render(comp);
});

const pdfCom = webSvgToPdfSvg(div.innerHTML);
// console.log('pdfCom:', pdfCom);


const ReactPdfDoc2 = () => {

  return (
    <>
    <PDFViewer width="100%" height="1200px">
    <Document>
      <Page orientation="landscape" bookmark={{title: "Overview"}}>
        {pdfCom}
        {/* <ReactPDFChart>
          <ReactECharts
            option={option2}
            style={{ height: 400, width: 600 }}
            opts={{ renderer: 'svg' }}
          />
        </ReactPDFChart> */}
      </Page>
    </Document>
    </PDFViewer>
    </>
  );
};

export default ReactPdfDoc2;
