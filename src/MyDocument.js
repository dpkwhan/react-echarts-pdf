import React, { useRef } from 'react';
import ReactECharts from 'echarts-for-react';

import jsPDF from 'jspdf';


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

const MyDocument = () => {
  const instance = useRef(null);

  function clickBtn() {
    const base64 = instance.current.getEchartsInstance().getDataURL();

    const img = new Image();
    img.src = base64;
    const newWin = window.open('', '_blank');
    newWin.document.write(img.outerHTML);
  }

  const saveAsImage = (uri, name = 'echarts.jpeg') => {
    var link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
  };

  const saveAsPDF = (uri, name = 'undefine.pdf') => {
    console.log(instance);
    let height = instance.current.getEchartsInstance().getHeight();
    let width = instance.current.getEchartsInstance().getWidth();
    var doc = '';
    if (width > height) {
      doc = new jsPDF('l', 'mm', [width, height]);
    } else {
      doc = new jsPDF('p', 'mm', [height, width]);
    }
    doc.addImage(instance.current.getEchartsInstance().getDataURL({ backgroundColor: '#fff' }), 'JPEG', 10, 10);
    doc.save(name);
  };

  return (
    <>
      <ReactECharts
        ref={instance}
        option={option}
        style={{ height: 400 }}
        // opts={{ renderer: 'svg' }}
      />

      <div>
        <button onClick={clickBtn}>click here to get the DataURL of chart</button>
      </div>

      <div>
        <button onClick={saveAsImage}>Save as Image</button>
      </div>

      <div>
        <button onClick={saveAsPDF}>Save as PDF</button>
      </div>


    </>
  );
};

export default MyDocument;
