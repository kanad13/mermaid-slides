import { StatusMessagesProps } from '../../../types/components';
export const StatusMessages = ({ error }: StatusMessagesProps) => {
  return (
    <>
      {/* Error Display */}
      {error && (
        <div className="mt-4 p-4 border rounded-lg bg-red-50 border-red-200 text-red-700">
          <p className="text-sm">{error}</p>
        </div>
      )}

    </>
  );
};