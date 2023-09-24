import { useState, useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import { createRoot } from 'react-dom/client';

const useDataUrl = (option) => {
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
        style={{ height: 400, width: 600 }}
        onEvents={{ 'finished': onFinished }}
      />
    );
  }, [option]);

  return [data];
};

export default useDataUrl;
