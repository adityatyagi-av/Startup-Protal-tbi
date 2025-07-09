'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRequestedDocs } from '@/store/Action/Fetch_All_Doc_Action';
import DocsubmitModal from '@/components/component/docsubmit';
import CommonTable from '@/components/CommonTable/page';

export default function DocumentRequest() {
  const dispatch = useDispatch();
  const { documents, loading, error } = useSelector((state) => state.requestedDocs);

  useEffect(() => {
    dispatch(fetchRequestedDocs());
  }, [dispatch]);

  const columns = [
    { header: 'Sr no', accessor: 'index', render: (_, item, i) => i + 1 },
    { header: 'Document Title', accessor: 'docTitle' },
    {
      header: 'Description',
      accessor: 'description',
      className: 'hidden md:table-cell',
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (value) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            value === 'requested'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-green-100 text-green-800'
          }`}
        >
          {value === 'requested' ? 'Pending' : 'Uploaded'}
        </span>
      ),
    },
    {
      header: 'Upload',
      accessor: 'id',
      align: 'center',
      render: (id) => <DocsubmitModal id={id} />,
    },
  ];

  return (
    <div className="min-h-screen p-4 bg-gray-100 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden bg-white rounded-lg shadow-lg">
          <div className="px-4 py-6 border-b border-gray-200 sm:px-6 lg:px-8">
            <h1 className="mb-2 text-xl font-semibold text-gray-800 sm:text-2xl lg:text-3xl">
              Requested DOC from the TBI
            </h1>
            <p className="text-sm text-gray-600 sm:text-base">
              Submit the Documents Requested by TBI
            </p>
          </div>

          <div className="px-4 py-6 sm:px-6 lg:px-8">
            {loading ? (
              <div className="text-center text-blue-600">Loading documents...</div>
            ) : error ? (
              <div className="p-4 mb-6 border border-red-200 rounded-md bg-red-50">
                <p className="text-sm text-red-700 sm:text-base">{error}</p>
              </div>
            ) : (
              <CommonTable columns={columns} data={documents} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
