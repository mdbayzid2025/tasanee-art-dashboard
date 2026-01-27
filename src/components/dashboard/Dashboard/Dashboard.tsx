import { useGetAnalyticsQuery } from '../../../redux/features/dashboard/dashboardApi'
import EarningCharts from './EarningCharts'
import Statics from './Statics'
import TotalUserChart from './TotalUserChart'

export const Dashboard = () => {
  const {data: analytics} = useGetAnalyticsQuery(undefined)
  
  console.log("analytics", analytics);
  
  return (
    <div>
      <Statics users={analytics?.users} />
      <div className="flex flex-col  gap-6 mt-6">
        <TotalUserChart userGrowth={analytics?.userGrowth}/>
        <EarningCharts />
      </div>
    </div>
  )
}
