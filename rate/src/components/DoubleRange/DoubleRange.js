import { useState, useRef, useCallback, useEffect } from "react";
import styles from './DoubleRange.module.css'
import { clamp } from '../../domain/utils/math'


export function DoubleRange({ values, onChange, formatter = x => x }) {
  const min = 0
  const max = values.length - 1

  const slider = useRef();

  const [left, handleLeftMouseDown] = useSliderValue(slider, min, min, max);
  const [right, handleRightMouseDown] = useSliderValue(slider, max, min, max);


  useEffect(() => {
    if (left > right) {
      onChange([values[right], values[left]])
    } else {
      onChange([values[left], values[right]])
    }
  }, [left, right]);

  return (
    <div className={styles.DoubleRange} ref={slider}>
      <div
        onMouseDown={handleLeftMouseDown}
        style={{ left: (left - min) / (max - min) * 100 + "%" }}
        className={styles.slider}
      >
        {formatter(values[left])}
      </div>
      <div
        onMouseDown={handleRightMouseDown}
        style={{ left: (right - min) / (max - min) * 100 + "%" }}
        className={styles.slider}
      >
        {formatter(values[right])}
      </div>
    </div>
  )
}

function useSliderValue(slider, initialValue, min, max) {
  const [value, setValue] = useState(initialValue);

  const handleMouseMove = useCallback(function (event) {
    let newValue = event.clientX - slider.current.getBoundingClientRect().left;

    const pxWidth = slider.current.getBoundingClientRect().width;
    const percent = newValue / pxWidth;
    const valueWidth = max - min;

    const clampedValue = clamp(Math.round(percent * valueWidth + min), min, max);

    setValue(clampedValue)
  }, []);

  const handleMouseUp = useCallback(function () {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }, []);

  const handleMouseDown = useCallback(function (event) {
    event.preventDefault();
    console.log('handleMouseDown')
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, [])

  return [value, handleMouseDown];
}