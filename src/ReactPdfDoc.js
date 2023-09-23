import React, { useRef, useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { Collapse } from 'antd';
import { Page, Image, Document, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

import {option1, option2} from './utils';

const ScorecardReport = ({ imageData }) => {
  return (
    <Document>
      <Page size="A4">
        <Image src={imageData[0]}/>
        <Image src={imageData[1]}/>
      </Page>
    </Document>
  )
}

const ReactPdfDoc = () => {
  const instance1 = useRef(null);
  const instance2 = useRef(null);
  const [ dataUrl1, setDataUrl1 ] = useState('');
  const [ dataUrl2, setDataUrl2 ] = useState('');

  // Reference: https://echarts.apache.org/en/api.html#events
  const onFinished1 = () => {
    const imgData = instance1.current.getEchartsInstance().getDataURL({ backgroundColor: '#FFF' });
    setDataUrl1(imgData);
  }
  const onEvents1 = {
    'finished': onFinished1,
  }

  const onFinished2 = () => {
    const imgData = instance2.current.getEchartsInstance().getDataURL({ backgroundColor: '#FFF' });
    setDataUrl2(imgData);
  }
  const onEvents2 = {
    'finished': onFinished2,
  }

  const items = [
    {
      key: '1',
      label: 'This is panel header 1',
      children: <ReactECharts
        ref={instance1}
        option={option1}
        style={{ height: 600 }}
        onEvents={onEvents1}
      />,
    },
    {
      key: '2',
      label: 'This is panel header 2',
      children: <ReactECharts
        ref={instance2}
        option={option2}
        style={{ height: 600 }}
        onEvents={onEvents2}
      />,
    },
  ];

  return (
    <>
      <Collapse items={items} defaultActiveKey={['1', '2']} />;

      {dataUrl1.length > 10 && (
        <>
          <PDFDownloadLink document={<ScorecardReport imageData={[dataUrl1, dataUrl2]} />} fileName="scorecard.pdf">
            {({ blob, url, loading, error }) =>
              loading ? 'Loading document...' : 'Download now!'
            }
          </PDFDownloadLink>

          <PDFViewer width="100%" height="1200px">
            <ScorecardReport imageData={[dataUrl1, dataUrl2]} />
          </PDFViewer>
        </>
      )}
    </>
  );
};

export default ReactPdfDoc;
