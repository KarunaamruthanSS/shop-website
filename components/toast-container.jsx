"use client";

import { useToast } from '../lib/toastContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <>
      <div className="toast-container">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`toast toast-${toast.type}`}
            onClick={() => removeToast(toast.id)}
          >
            <div className="toast-content">
              <span className="toast-icon">
                {toast.type === 'success' && '✅'}
                {toast.type === 'error' && '❌'}
                {toast.type === 'warning' && '⚠️'}
                {toast.type === 'info' && 'ℹ️'}
              </span>
              <span className="toast-message">{toast.message}</span>
            </div>
            <button 
              className="toast-close"
              onClick={(e) => {
                e.stopPropagation();
                removeToast(toast.id);
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <style jsx>{`
        .toast-container {
          position: fixed;
          top: 20px;
          right: 20px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-width: 400px;
        }

        .toast {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          animation: slideIn 0.3s ease-out;
          min-width: 300px;
          backdrop-filter: blur(10px);
        }

        .toast-success {
          background-color: rgba(40, 167, 69, 0.95);
          color: white;
          border-left: 4px solid #28a745;
        }

        .toast-error {
          background-color: rgba(220, 53, 69, 0.95);
          color: white;
          border-left: 4px solid #dc3545;
        }

        .toast-warning {
          background-color: rgba(255, 193, 7, 0.95);
          color: #212529;
          border-left: 4px solid #ffc107;
        }

        .toast-info {
          background-color: rgba(0, 123, 255, 0.95);
          color: white;
          border-left: 4px solid #007bff;
        }

        .toast-content {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
        }

        .toast-icon {
          font-size: 18px;
          flex-shrink: 0;
        }

        .toast-message {
          font-size: 14px;
          font-weight: 500;
          line-height: 1.4;
        }

        .toast-close {
          background: none;
          border: none;
          color: inherit;
          font-size: 20px;
          cursor: pointer;
          padding: 0;
          margin-left: 10px;
          opacity: 0.7;
          transition: opacity 0.2s;
          flex-shrink: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .toast-close:hover {
          opacity: 1;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @media (max-width: 768px) {
          .toast-container {
            top: 10px;
            right: 10px;
            left: 10px;
            max-width: none;
          }

          .toast {
            min-width: auto;
            padding: 10px 12px;
          }

          .toast-message {
            font-size: 13px;
          }

          .toast-icon {
            font-size: 16px;
          }
        }
      `}</style>
    </>
  );
}