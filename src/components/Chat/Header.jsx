import React from 'react';

const Header = () => {
  const handleSomething = () => console.log('Header');
  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <b className="m-0"># general</b>
      <div className="text-muted">1 massage</div>
    </div>
  );
};

export default Header;
