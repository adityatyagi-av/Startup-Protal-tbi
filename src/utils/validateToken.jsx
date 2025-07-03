'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/component/spinner';
import { getFounderDetails } from '@/store/Action/getFounderDetailAction';

export default function Check() {
  const dispatch = useDispatch();
  const path = usePathname();
  console.log(path)
  const router = useRouter();

  const { loading, success } = useSelector(state => state.founderDetails || {});

  useEffect(() => {
    dispatch(getFounderDetails());
  }, []);

  useEffect(() => {
    console.log(loading,path)
    if (!loading) {
      if (!success && !['/signin', '/signin/changepassword'].includes(path)) {
        router.push('/signin');
      }
      if (path === '/signin' && success) {
        router.push('/Founder/dashboard');
      }
    }
  }, [path, success, loading]);

  return <>{loading && <Spinner />}</>;
}
