import { useEffect } from 'react';
import useGlobalContext from '../hooks/useGlobalContext';

const Toast = () => {
  const { toast, setToast } = useGlobalContext();

  useEffect(() => {
    let timer: number;
    if (toast?.state) {
      timer = setTimeout(() => {
        setToast?.({ ...toast, state: false });
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [toast?.state]);

  return (
    <section
      className={`fixed flex justify-center w-full p-2 items-center  right-0 z-[1000] duration-200 ${
        toast?.state ? 'top-0' : 'top-[-50px]'
      }`}
    >
      <div
        className={`bg-white shadow py-2 px-4 border text-sm rounded-md ${
          toast?.type === 'danger'
            ? 'text-red-500 border-red-500'
            : toast?.type === 'success'
            ? 'text-green-500 border-green-500'
            : 'border-slate-300 text-slate-600'
        }`}
      >
        {toast?.message}
      </div>
    </section>
  );
};

export default Toast;
