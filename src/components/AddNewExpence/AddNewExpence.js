import React, { useState, useEffect } from "react";
import "./AddNewExpence.css";
import ReactDom from "react-dom";
import AddNewExpenceForm from "./AddNewExpenceForm";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ open, onClose, onUpdate }) {
  const [refreshKey, setRefreshKey] = useState(0);
  const handleRefreshKeyUpdate = () => {
    setRefreshKey(refreshKey + 1);
  };

  useEffect(() => {
    onUpdate(refreshKey);
  }, [refreshKey]);

  return ReactDom.createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="modalBg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{opacity: 0}}
            className="modal-overlay"
          ></motion.div>
          <motion.div
            key="newExpenceModal"
            className="modal-container"
            initial={{ scale: 0, transform: "translate(-50%, -200%)" }}
            animate={{ scale: 1, transform: "translate(-50%, -50%)", transition: {duration: 0.3} }}
            exit={{scale: 0, transform: "translate(-50%, 200%)", transition: {duration: 0.3}}}
          >
            <h2>Add new transaction</h2>
            <AddNewExpenceForm
              onClose={onClose}
              onTransactionAdd={handleRefreshKeyUpdate}
            />
            <button onClick={onClose} className="cancel-btn">
              <CloseIcon />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.getElementById("portal")
  );
}
