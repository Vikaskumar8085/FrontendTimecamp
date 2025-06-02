import React from 'react';
import { useFormik } from 'formik';
import './TimesheetsFilterModal.scss';

const TimesheetsFilterModal = ({ isOpen, onClose }) => {
  const formik = useFormik({
    initialValues: {
      resource: '',
      project: '',
      startDate: '',
      endDate: '',
      approvalStatus: '',
      billingStatus: '',
      client: '',
    },
    onSubmit: values => {
      console.log('Filter values:', values);
      onClose();
    },
  });

  const handleClear = () => {
    formik.resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <form onSubmit={formik.handleSubmit}>
          <div className="modal-header">
            <h2>Timesheets Filter</h2>
            <button type="button" className="close-button" onClick={onClose}>&times;</button>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <div className="form-item">
                <label>Resource</label>
                <select name="resource" onChange={formik.handleChange} value={formik.values.resource}>
                  <option value="">Select</option>
                </select>
              </div>
              <div className="form-item">
                <label>Project</label>
                <select name="project" onChange={formik.handleChange} value={formik.values.project}>
                  <option value="">Select</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="form-item">
                <label>Start Date</label>
                <select name="startDate" onChange={formik.handleChange} value={formik.values.startDate}>
                  <option value="">Select</option>
                </select>
              </div>
              <div className="form-item">
                <label>End Date</label>
                <select name="endDate" onChange={formik.handleChange} value={formik.values.endDate}>
                  <option value="">Select</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="form-item">
                <label>Approval Status</label>
                <select name="approvalStatus" onChange={formik.handleChange} value={formik.values.approvalStatus}>
                  <option value="">Select</option>
                </select>
              </div>
              <div className="form-item">
                <label>Billing Status</label>
                <select name="billingStatus" onChange={formik.handleChange} value={formik.values.billingStatus}>
                  <option value="">Select</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="form-item full-width">
                <label>Client</label>
                <select name="client" onChange={formik.handleChange} value={formik.values.client}>
                  <option value="">Select</option>
                </select>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="clear-button" onClick={handleClear}>Clear Filter</button>
            <button type="submit" className="apply-button">Apply Filter</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimesheetsFilterModal;
