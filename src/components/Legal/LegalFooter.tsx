import { useState } from 'react';
import { PrivacyPolicy } from './PrivacyPolicy';
import { LegalNotice } from './LegalNotice';

type OpenDocument = 'privacy' | 'legal' | null;

export const LegalFooter: React.FC = () => {
  const [open, setOpen] = useState<OpenDocument>(null);

  return (
    <>
      <div className="mt-8 pt-4 border-t text-center text-sm border-gray-200 text-gray-500">
        <div className="flex justify-center space-x-6">
          <button
            type="button"
            onClick={() => setOpen('privacy')}
            className="hover:underline hover:text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Privacy Policy
          </button>
          <button
            type="button"
            onClick={() => setOpen('legal')}
            className="hover:underline hover:text-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Legal Notice
          </button>
        </div>
      </div>

      {open === 'privacy' && <PrivacyPolicy onClose={() => setOpen(null)} />}
      {open === 'legal' && <LegalNotice onClose={() => setOpen(null)} />}
    </>
  );
};
