'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getAccessToken } from '@/store/Action/refreshAcessTokenAction';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/component/spinner';
import { FetchSchemes } from '@/store/Action/fetchAllSchemsAction';
import toast from 'react-hot-toast';
import { getAdminDetals } from '@/store/Action/getAdminDetailAction';

async function fetchTokenAndCheckAuth(
  dispatch,
  loading,
  success,
  error,
  path,
  router,
) {
  await dispatch(getAccessToken());
}

export default function Check() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(state => state.token); // Assuming the state slice is named 'token'
  const { loading: fetchSchemesLoading } = useSelector(
    state => state.fetchShemes,
  );
  const { loading: fetchProgramLoading } = useSelector(
    state => state.fetchProgram,
  );


  const { loading: CreateSchemeLoader } = useSelector(
    state => state.createScheme,
  );
  const { loading: updateManagerLoader } = useSelector(
    state => state.updateManagerDetails,
  );
  const { loading: adminDetailLoading, success: adminDetailSuccess } = useSelector(
    state => state.getAdminDetals,
  )

  const path = usePathname();
  const router = useRouter();
  let apiCall = 1;
  const [prevPath, setprevPath] = useState('admin/dashboard');
  //first visit check

  //first time to show loding only
  useEffect(() => {
    if (apiCall == 1 && success) {
      dispatch(FetchSchemes());
    }
    if (success && !adminDetailSuccess) {
      dispatch(getAdminDetals());
    }
  }, [success]);

  useEffect(() => {
    apiCall++;
    fetchTokenAndCheckAuth(dispatch, loading, success, error, path, router);

    const interval = setInterval(() => {

      fetchTokenAndCheckAuth(dispatch, loading, success, error, path, router);
    }, 900000);


    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!loading) {
      if (path != '/signin' && !success) {
        router.push('/signin');
      }
      if (path === '/signin' && success) {
        router.push('/admin/dashboard');
      }
    }
  }, [path, success, loading]);

  return (
    <>
      {(loading ||
        CreateSchemeLoader ||
        fetchSchemesLoading ||
        fetchProgramLoading ||
        adminDetailLoading ||
        updateManagerLoader) && <Spinner />}
    </>
  );
}
