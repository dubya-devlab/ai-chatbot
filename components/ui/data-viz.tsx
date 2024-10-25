'use client'

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

interface DataPoint {
  label: string
  value: number
}

interface DataVizProps {
  data: DataPoint[]
  title: string
  color?: string
}

export function DataViz({ data, title, color = '#34a853' }: DataVizProps) {
  return (
    <div className="w-full rounded-xl border bg-zinc-950 p-4">
      <div className="mb-4 text-lg text-zinc-300">{title}</div>
      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey="label"
              stroke="#666"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#666"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value: number) => `${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#18181b',
                border: '1px solid #27272a',
                borderRadius: '6px'
              }}
              labelStyle={{ color: '#d4d4d8' }}
              itemStyle={{ color: color }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
