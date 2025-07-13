import React, { createContext, useState } from 'react';

// ✅ Create context
export const SellerDataContext = createContext();

const SellerContext = ({ children }) => {
  const [user, setUser] = useState({
    email: '',
    fullName: {
      firstName: '',
      lastName: '',
    },
  });

  return (
    // ✅ Use the same context name here
    <SellerDataContext.Provider value={{ user, setUser }}>
      {children}
    </SellerDataContext.Provider>
  );
};

export default SellerContext;