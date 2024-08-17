'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';


function debounce<T extends (...args: any[]) => void>(func:T, wait:number) {
  let timeout:NodeJS.Timeout;

  return function executedFunction(...args:Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default function Search({ placeholder }: { placeholder: string }) {

  const searchParams = useSearchParams();
  const pathname = usePathname()
  const router = useRouter()
  const handleSearch = (term:string) => {
    const params = new URLSearchParams(searchParams);
    console.log("params: ",params)
    console.log(term)
    if(term){
      params.set("query", term)
    }else{
      params.delete("query")
    }
    router.replace(`${pathname}?${params.toString()}`)
  }

  const debouncedHandleSearch = debounce(handleSearch, 500);
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e)=>debouncedHandleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
