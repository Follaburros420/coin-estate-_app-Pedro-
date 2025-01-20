import AboutProperties from '@/components/AboutProperties';
import HeaderSection from '@/components/Dashboard/MarketPlace/HeaderSection';
import Tabs from '@/components/Dashboard/MarketPlace/Tabs';
import Properties from '@/components/Properties';
import RegisterBottomBanner from '@/components/RegisterBottomBanner';
import { useQueryGetProperty } from '@/hooks/query';
import Layout from '@/layout/Dashboard';
import React, { useEffect, useState } from 'react';

export default function Page() {
  const { data: getPropertyList } = useQueryGetProperty();
  const [filtered, setFiltered] = useState();

  const handleFilter = (value) => {
    const filteredProperty =
      value !== 'all'
        ? getPropertyList.filter((item) => item.propertyType.toLowerCase() === value?.toLowerCase())
        : getPropertyList;
    setFiltered(filteredProperty);
  };

  const handleSearch = (value) => {
    const searched = getPropertyList.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
    setFiltered(searched);
  };

  useEffect(() => {
    if (getPropertyList?.length > 0) setFiltered(getPropertyList);
  }, [getPropertyList?.length]);
  return (
    <div>
      <Layout>
        <div className='px-6 lg:px-10 '>
          <div className='w-full max-w-[1161px] mx-auto my-10 '>
            <div className=''>
              <Properties
                handleFilter={handleFilter}
                handleSearch={handleSearch}
                sortByMostRecent={(title) => {
                  console.log({ title });
                  if (title === 'Más recientes') {
                    setFiltered(getPropertyList?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
                  } else {
                    setFiltered(getPropertyList);
                  }
                }}
                className={""}
              />
              {filtered?.length ? <AboutProperties getPropertyList={filtered} /> : 'Loading...'}
              <RegisterBottomBanner />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}
