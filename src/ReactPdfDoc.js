import React from 'react';
import { Font, Page, Image, Document, PDFViewer, PDFDownloadLink, View, Text } from '@react-pdf/renderer';

import {styles, bgImgLink, option1, option2, option3} from './utils';
import BAMLogo from './BAMLogo';
import useDataUrl from './useDataUrl';

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

      <Page orientation="landscape" bookmark={{title: "Indication of Interest"}}>
        <Image src={imageData[2]}/>
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `${pageNumber} / ${totalPages}`
        )} fixed />
      </Page>
    </Document>
  )
}

const ReactPdfDoc = () => {
  const [ dataUrl1 ] = useDataUrl(option1);
  const [ dataUrl2 ] = useDataUrl(option2);
  const [ dataUrl3 ] = useDataUrl(option3);

  return (
    <>
      {dataUrl1.length > 10 && dataUrl2.length > 10 && dataUrl3.length > 10 && (
        <>
          <PDFDownloadLink document={<ScorecardReport imageData={[dataUrl1, dataUrl2, dataUrl3]} />} fileName="scorecard.pdf">
            {({ blob, url, loading, error }) =>
              loading ? 'Loading document...' : 'Download now!'
            }
          </PDFDownloadLink>

          <PDFViewer width="100%" height="1750px">
            <ScorecardReport imageData={[dataUrl1, dataUrl2, dataUrl3]} />
          </PDFViewer>
        </>
      )}
    </>
  );
};

export default ReactPdfDoc;
