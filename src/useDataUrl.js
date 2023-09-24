import { useState, useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import { createRoot } from 'react-dom/client';


const useDataUrl = (option, scale=1.0) => {
  const instance = useRef(null);
  const [ data, setData ] = useState('');

  const onFinished = () => {
    console.log('I am finished inside useDataUrl hook');
    const imgData = instance.current.getEchartsInstance().getDataURL();
    setData(imgData);
  }

  useEffect(() => {
    const div = document.createElement('div');
    const root = createRoot(div);
    root.render(
      <ReactECharts
        ref={instance}
        option={option}
        style={{ width: 600 * scale, height: 400 * scale }}
        onEvents={{ 'finished': onFinished }}
      />
    );
  }, [option]);

  return [data];
};

export default useDataUrl;
