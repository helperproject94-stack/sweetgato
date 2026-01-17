
import React from 'react';
import { APP_NAME } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center">
      <header className="w-full py-8 px-4 flex justify-between items-center bg-white border-b border-orange-50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto w-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-2xl">🍰</div>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
              {APP_NAME.split('—')[0]}
              <span className="text-orange-400 text-lg font-normal mr-2">
                — {APP_NAME.split('—')[1]}
              </span>
            </h1>
          </div>
          {/* تم إزالة روابط التنقل بناءً على الطلب */}
        </div>
      </header>

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-12">
        {children}
      </main>

      <footer className="w-full py-10 bg-gray-50 border-t border-gray-100 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} SweetShot — جميع الحقوق محفوظة لمحبي الحلويات</p>
      </footer>
    </div>
  );
};

export default Layout;
