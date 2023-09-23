import React, { useRef, useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { Page, Image, Document, PDFViewer, PDFDownloadLink, View, Text, StyleSheet } from '@react-pdf/renderer';

import {option1, option2} from './utils';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 5,
    padding: 5,
    flexGrow: 1
  }
});

const ScorecardReport = ({ imageData }) => {
  return (
    <Document>
      <Page size="A4">
        <Image src={imageData[0]}/>

        // Use width in % to adjust the size. No need for height.
        <Image src={imageData[1]} style={{ width: '50%' }}/>
      </Page>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Image src={imageData[0]}/>
        </View>
        <View style={styles.section}>
          <Image src={imageData[1]}/>
        </View>
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
    if (dataUrl1.length == 0) {
      const imgData = instance1.current.getEchartsInstance().getDataURL({ backgroundColor: '#FFF' });
      setDataUrl1(imgData);
    }
  }
  const onEvents1 = {
    'finished': onFinished1,
  }

  const onFinished2 = () => {
    if (dataUrl2.length == 0) {
      const imgData = instance2.current.getEchartsInstance().getDataURL({ backgroundColor: '#FFF' });
      setDataUrl2(imgData);
    }
  }
  const onEvents2 = {
    'finished': onFinished2,
  }

  return (
    <>
      <ReactECharts
        ref={instance1}
        option={option1}
        style={{ height: 600 }}
        onEvents={onEvents1}
      />

      <ReactECharts
        ref={instance2}
        option={option2}
        style={{ height: 600 }}
        onEvents={onEvents2}
      />

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
