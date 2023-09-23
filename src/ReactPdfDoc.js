import React, { useRef, useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

import { Page, Image, Document, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';


const option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
};


const ScorecardReport = ({ imageData }) => {
  return (
    <Document>
      <Page size="A4">
        <Image src={imageData}/>
      </Page>
    </Document>
  )
}


const ReactPdfDoc = () => {
  const instance = useRef(null);
  const [ dataUrl, setDataUrl ] = useState('');

  useEffect(() => {
    if (instance !== null) {
      const imgData = instance.current.getEchartsInstance().getDataURL({ backgroundColor: '#FFF' });
      setDataUrl(imgData);
    }
  }, [instance]);

  return (
    <>
      <ReactECharts
        ref={instance}
        option={option}
        style={{ height: 600 }}
      />

      {dataUrl.length > 0 && (
        <>
          <PDFDownloadLink document={<ScorecardReport imageData={dataUrl} />} fileName="scorecard.pdf">
            {({ blob, url, loading, error }) =>
              loading ? 'Loading document...' : 'Download now!'
            }
          </PDFDownloadLink>

          <PDFViewer width="100%" height="1200px">
            <ScorecardReport imageData={dataUrl} />
          </PDFViewer>
        </>
      )}
    </>
  );
};

export default ReactPdfDoc;
