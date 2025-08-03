'use client';

import { ReactNode } from 'react';
import clsx from 'clsx';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
  disabled?: boolean;
};

export default function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className,
  disabled = false,
}: ButtonProps) {
  const baseStyle =
    'px-4 py-2 rounded-lg font-medium transition-colors duration-200';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(baseStyle, variants[variant], className, {
        'opacity-50 cursor-not-allowed': disabled,
      })}
    >
      {children}
    </button>
  );
}
