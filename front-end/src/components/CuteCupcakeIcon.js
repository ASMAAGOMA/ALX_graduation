import React from 'react';

const CuteCupcakeIcon = ({ size = 64 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 100 100">
    <path d="M50 20c-15 0-30 10-30 25h60c0-15-15-25-30-25z" fill="#ff9ff3"/>
    <path d="M20 45v10c0 5.5 4.5 10 10 10h40c5.5 0 10-4.5 10-10V45H20z" fill="#feca57"/>
    <path d="M35 20c0-8.3 6.7-15 15-15s15 6.7 15 15v5H35v-5z" fill="#ff9ff3"/>
    <circle cx="38" cy="35" r="3" fill="#ffffff"/>
    <circle cx="62" cy="35" r="3" fill="#ffffff"/>
    <path d="M45 42c2.5 5 7.5 5 10 0" fill="none" stroke="#4a3832" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export default CuteCupcakeIcon;