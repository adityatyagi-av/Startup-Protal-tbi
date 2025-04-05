'use client';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import Spinner from '@/components/component/spinner';
import { getAccessToken } from '@/store/Action/refreshAcessTokenAction';
import { getFounderDetails } from '@/store/Action/getFounderDetailAction';

async function fetchTokenAndCheckAuth(dispatch) {
  await dispatch(getAccessToken());
}

export default function Check() {
  const dispatch = useDispatch();
  const path = usePathname();
  const router = useRouter();
  
  const { loading, error, success } = useSelector(state => state.token);
  const { loading: adminDetailLoading, success: adminDetailSuccess } = useSelector(
    state => state.getAdminDetals || {},
  );

  const apiCall = useRef(1);
  const [prevPath, setPrevPath] = useState('Founder/dashboard');

  useEffect(() => {
    if (apiCall.current === 1 && success) {
      dispatch(FetchSchemes());
    }
    if (success && !adminDetailSuccess) {
      dispatch(getFounderDetails());
    }
  }, [success]);

  useEffect(() => {
    apiCall.current++;
    fetchTokenAndCheckAuth(dispatch);

    const interval = setInterval(() => {
      fetchTokenAndCheckAuth(dispatch);
    }, 900000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!loading) {
     
      if (!success && !['/signin', '/signin/changepassword'].includes(path)) {
        router.push('/signin');
      }
      if (path === '/signin' && success) {
        router.push('/Founder/dashboard');
      }
    }
  }, [path, success, loading]);

  return (
    <>
      {(loading || adminDetailLoading) && <Spinner />}
    </>
  );
}
