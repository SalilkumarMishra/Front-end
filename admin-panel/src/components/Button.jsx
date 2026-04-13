import React from 'react';

const Button = ({ children, variant = 'primary', size = 'md', onClick, type='button', className='' }) => {
  const variants = {
    primary: 'btn btn-warning text-dark',
    secondary: 'btn btn-light',
    danger: 'btn btn-danger',
    success: 'btn btn-success'
  };

  const sizes = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg'
  };

  return (
    <button type={type} className={`${variants[variant]} ${sizes[size]} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
