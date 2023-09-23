import React, { useRef, useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import { Font, Page, Image, Document, PDFViewer, PDFDownloadLink, View, Text, StyleSheet } from '@react-pdf/renderer';

import {option1, option2} from './utils';
import BAMLogo from './BAMLogo';

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    marginTop: 300,
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald'
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  twoColumnPage: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 5,
    padding: 5,
    flexGrow: 1
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  pageBackground: {
    position: 'absolute',
    minWidth: '100%',
    minHeight: '100%',
    display: 'block',
    height: '50%',
    width: '100%',
  },
  logo: {
    marginTop: 5,
    marginLeft: 5,
  },
});

const ScorecardReport = ({ imageData }) => {
  return (
    <Document>
      <Page orientation="landscape">
        <Image src="https://res.cloudinary.com/bamfunds/image/upload/fl_lossy,f_auto,q_auto:eco/gpafxy6stnw0pc6joa66.jpg" style={styles.pageBackground} />
        <BAMLogo style={styles.logo} />
        <Text style={styles.title}>
          Execution Performance Scorecard
        </Text>
      </Page>

      <Page size="A4" bookmark={{title: "Overview"}}>
        <Image src={imageData[0]}/>

        {/* Use width in % to adjust the size. No need for height. */}
        <Image src={imageData[1]} style={{ width: '50%' }}/>
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>

      <Page size="A4" bookmark={{title: "High Touch"}}>
        <Image src={imageData[0]}/>

        {/* Use width in % to adjust the size. No need for height. */}
        <Image src={imageData[1]} style={{ width: '50%' }}/>
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>

      <Page size="A4" bookmark={{title: "Indication of Interest"}}>
        <Image src={imageData[0]}/>

        {/* Use width in % to adjust the size. No need for height. */}
        <Image src={imageData[1]} style={{ width: '50%' }}/>
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>

      <Page style={styles.twoColumnPage} bookmark={{title: "Low Touch"}}>
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
