/* eslint-disable @typescript-eslint/no-explicit-any */
import { CartesianGrid, XAxis, YAxis, ResponsiveContainer, BarChart, Tooltip, Bar, Rectangle, Label } from 'recharts';
import { useEffect, useState } from 'react';
import dataService from '../../services/data-service';
import { groupBy, sumBy } from 'lodash';

export default function TrainingChart() {
  const [trainingTimeData, setTrainingtimeData] = useState<any[]>([])

  useEffect(() => {
    getTrainingData();
  }, [])

  const getTrainingData = async () => {
    const data = groupBy(await dataService.getAllTrainings2(), 'activity');
    const holder = [];

    for (const [key, value] of Object.entries(data)) {
      holder.push({
        name: key,
        total: sumBy(value, 'duration')
      })
    }
    setTrainingtimeData(holder);
  }

  return(
    <>
      <ResponsiveContainer width="100%" height={600}>
        <BarChart
          width={800}
          height={600}
          data={trainingTimeData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name">
            <Label 
              angle={0} 
              value={"Activity"}
              position={"insideBottom"}
              offset={-20}
            />
          </XAxis>
          <YAxis>
            <Label 
              angle={270} 
              value={"Total (min)"}
              position={"insideLeft"}
            />
          </YAxis>
          <Tooltip />
          <Bar dataKey="total" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}