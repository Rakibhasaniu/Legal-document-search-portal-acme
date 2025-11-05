import { useDispatch } from 'react-redux';
import { clearError } from '../store/searchSlice';

const ErrorMessage = ({ message }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(clearError());
  };

  return (
    <div className="error-message">
      <div className="error-content">
        <span className="error-icon">⚠️</span>
        <p className="error-text">{message}</p>
        <button onClick={handleClose} className="error-close-button">
          ✕
        </button>
      </div>
    </div>
  );
};

export default ErrorMessage;
