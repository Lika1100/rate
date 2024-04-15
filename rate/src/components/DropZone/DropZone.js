import { useEffect, useRef, useState } from "react";
import styles from "./DropZone.module.css";
import { useDispatch } from "react-redux";
import { uploadEvents } from "../../redux/events";

export function DropZone() {
  const [visible, setVisible] = useState(false);
  const lastTarget = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    function onDragenter(e) {
      const isFile = Array.from(e.dataTransfer.types).includes("Files");
      if (isFile) {
        lastTarget.current = e.target;
        setVisible(true);
      }
    }
    function onDragleave(e) {
      e.preventDefault();
      if (e.target === document || e.target === lastTarget.current) {
        setVisible(false);
      }
    }

    function onDragover(e) {
      e.preventDefault();
    }

    function onDrop(e) {
      e.preventDefault();
      setVisible(false);
      dispatch(uploadEvents(e.dataTransfer.files[0]));
    }

    window.addEventListener("dragenter", onDragenter);
    window.addEventListener("dragleave", onDragleave);
    window.addEventListener("dragover", onDragover);
    window.addEventListener("drop", onDrop);

    return () => {
      window.removeEventListener("dragenter", onDragenter);
      window.removeEventListener("dragleave", onDragleave);
      window.removeEventListener("dragover", onDragover);
      window.removeEventListener("drop", onDrop);
    }

  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.dropzone}>
      Обновить календарь
    </div>
  );
}
