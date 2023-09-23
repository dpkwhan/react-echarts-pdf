import React, { useRef, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { Font, Page, Image, Document, PDFViewer, PDFDownloadLink, View, Text } from '@react-pdf/renderer';

import {styles, bgImgLink, option1, option2} from './utils';
import BAMLogo from './BAMLogo';


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

  // Reference: https://echarts.apache.org/en/api.html#events
  const onFinished1 = () => {
    if (dataUrl1.length === 0) {
      const imgData = instance1.current.getEchartsInstance().getDataURL({ backgroundColor: '#FFF' });
      setDataUrl1(imgData);
    }
  }
  const onEvents1 = {
    'finished': onFinished1,
  }

  const onFinished2 = () => {
    if (dataUrl2.length === 0) {
      const imgData = instance2.current.getEchartsInstance().getDataURL({ backgroundColor: '#FFF' });
      setDataUrl2(imgData);
    }
  }
  const onEvents2 = {
    'finished': onFinished2,
  }

  return (
    <>
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
      
      <ReactECharts
        ref={instance1}
        option={option1}
        style={{ height: 400, width: 600 }}
        onEvents={onEvents1}
      />

      <ReactECharts
        ref={instance2}
        option={option2}
        style={{ height: 400, width: 600 }}
        onEvents={onEvents2}
      />

    </>
  );
};

export default ReactPdfDoc;
