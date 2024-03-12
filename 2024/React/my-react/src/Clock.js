import logo from './logo.svg';
import './Clock.css';

function Clock() {
  return (
    <div className="Clock">
      <p>Time:{(new Date()).toLocaleString()}</p>
    </div>
  );
}

export default Clock;
