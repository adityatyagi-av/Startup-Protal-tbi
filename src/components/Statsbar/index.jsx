import Stats from './Stat';

export const StatsBar = () => {
  const statsData = [
    {
      logo: '/Vector.svg',
      price: '350.4',
      description: 'Earnings',
      date: 'July 16, 2023',
      percentage: 12,
    },
    {
      logo: '/Vector.svg',
      price: '642.39',
      description: 'Spend this month',
      date: 'July 14, 2023',
      percentage: 5,
    },
    {
      logo: '/calendar-check.svg',
      price: '574.34',
      description: 'Funding',
      date: 'July 14, 2023',
      percentage: -8,
    },
    {
      logo: '/calendar-check.svg',
      price: '1000',
      description: 'Total Investment',
      date: 'July 10, 2023',
      percentage: 12,
    },
  ];

  return (
    <div className="no-scrollbar flex h-[158px] w-full flex-grow flex-row    cursor-pointer justify-start overflow-x-scroll px-[1%] py-1">
      {statsData.map((stat, index) => (
        <div key={index} className="mx-[1%] h-full w-full flex-grow">
          <Stats
            logo={stat.logo}
            price={stat.price}
            description={stat.description}
            date={stat.date}
            percentage={stat.percentage}
          />
        </div>
      ))}
    </div>
  );
};
