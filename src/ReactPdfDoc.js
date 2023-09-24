import React, { useRef, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { Font, Page, Image, Document, PDFViewer, PDFDownloadLink, View, Text } from '@react-pdf/renderer';

import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';

import {styles, bgImgLink, option1, option2} from './utils';
import BAMLogo from './BAMLogo';

// Reference: https://echarts.apache.org/en/api.html#events

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const ScorecardReport = ({ imageData }) => {
  return (
    <Document>
      <Page orientation="landscape" bookmark={{title: "Cover"}}>
        <Image src={bgImgLink} style={styles.pageBackground} />
        <BAMLogo style={styles.logo} />
        <Text style={styles.title}>
          Execution Performance Scorecard
        </Text>
      </Page>

      <Page orientation="landscape" bookmark={{title: "Overview"}}>
        <Image src={imageData[0]}/>

        {/* Use width in % to adjust the size. No need for height. */}
        <Image src={imageData[1]} style={{ width: '50%' }}/>
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>

      <Page orientation="landscape" bookmark={{title: "High Touch"}}>
        <Image src={imageData[0]}/>

        {/* Use width in % to adjust the size. No need for height. */}
        <Image src={imageData[1]} style={{ width: '50%' }}/>
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>

      <Page orientation="landscape" bookmark={{title: "Indication of Interest"}}>
        <Image src={imageData[0]}/>

        {/* Use width in % to adjust the size. No need for height. */}
        <Image src={imageData[1]} style={{ width: '50%' }}/>
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>

      <Page orientation="landscape" style={styles.twoColumnPage} bookmark={{title: "Low Touch"}}>
        <View style={styles.section}>
          <Image src={imageData[0]}/>
        </View>
        <View style={styles.section}>
          <Image src={imageData[1]}/>
        </View>
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>
    </Document>
  )
}

const ReactPdfDoc = () => {
  const instance1 = useRef(null);
  const instance2 = useRef(null);
  const [ dataUrl1, setDataUrl1 ] = useState('');
  const [ dataUrl2, setDataUrl2 ] = useState('');

  // The first chart
  const onFinished1 = () => {
    if (dataUrl1.length === 0) {
      console.log("I am finished 1.");
      const imgData = instance1.current.getEchartsInstance().getDataURL({ backgroundColor: '#FFF' });
      setDataUrl1(imgData);
    }
  }
  const onEvents1 = {
    'finished': onFinished1,
  }

  const div1 = document.createElement('div');
  const root1 = createRoot(div1);
  flushSync(() => {
    if (dataUrl1.length === 0) {
      root1.render(
        <ReactECharts
          ref={instance1}
          option={option1}
          style={{ height: 400, width: 600 }}
          onEvents={onEvents1}
        />
      );
    }
  });


  // The second chart
  const onFinished2 = () => {
    if (dataUrl2.length === 0) {
      console.log("I am finished 2.");
      const imgData = instance2.current.getEchartsInstance().getDataURL({ backgroundColor: '#FFF' });
      setDataUrl2(imgData);
    }
  }
  const onEvents2 = {
    'finished': onFinished2,
  }

  const div2 = document.createElement('div');
  const root2 = createRoot(div2);
  flushSync(() => {
    if (dataUrl2.length === 0) {
      root2.render(
        <ReactECharts
          ref={instance2}
          option={option2}
          style={{ height: 400, width: 600 }}
          onEvents={onEvents2}
        />
      );
    }
  });

  return (
    <>
      {dataUrl1.length > 10 && (
        <>
          <PDFDownloadLink document={<ScorecardReport imageData={[dataUrl1, dataUrl2]} />} fileName="scorecard.pdf">
            {({ blob, url, loading, error }) =>
              loading ? 'Loading document...' : 'Download now!'
            }
          </PDFDownloadLink>

          <PDFViewer width="100%" height="1750px">
            <ScorecardReport imageData={[dataUrl1, dataUrl2]} />
          </PDFViewer>
        </>
      )}
    </>
  );
};

export default ReactPdfDoc;
