import React, { useState } from 'react';
import {
    Box,
    Paper,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from '@mui/material';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import { WorkoutRecord, workoutOptions, WorkoutType } from '../types/workout';

interface WorkoutStatsProps {
    records: WorkoutRecord[];
}

type TimeRange = 'week' | 'month' | 'year';

export const WorkoutStats: React.FC<WorkoutStatsProps> = ({ records }) => {
    const [timeRange, setTimeRange] = useState<TimeRange>('week');

    const getFilteredRecords = () => {
        const now = new Date();
        const cutoff = new Date();
        
        switch (timeRange) {
            case 'week':
                cutoff.setDate(now.getDate() - 7);
                break;
            case 'month':
                cutoff.setMonth(now.getMonth() - 1);
                break;
            case 'year':
                cutoff.setFullYear(now.getFullYear() - 1);
                break;
        }

        return records.filter(record => new Date(record.date) >= cutoff);
    };

    const prepareChartData = () => {
        const filteredRecords = getFilteredRecords();
        const counts: { [key: string]: number } = {};

        filteredRecords.forEach(record => {
            const type = record.type as WorkoutType;
            const subtypeOptions = workoutOptions[type].subtypes;
            const label = subtypeOptions[record.subtype as keyof typeof subtypeOptions];
            counts[label] = (counts[label] || 0) + 1;
        });

        return Object.entries(counts).map(([name, count]) => ({
            name,
            count
        }));
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h5" gutterBottom>
                    运动统计
                </Typography>
                <ToggleButtonGroup
                    value={timeRange}
                    exclusive
                    onChange={(_, value) => value && setTimeRange(value)}
                    sx={{ mb: 2 }}
                >
                    <ToggleButton value="week">最近一周</ToggleButton>
                    <ToggleButton value="month">最近一月</ToggleButton>
                    <ToggleButton value="year">最近一年</ToggleButton>
                </ToggleButtonGroup>
            </Box>

            <Box sx={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                    <BarChart
                        data={prepareChartData()}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#8884d8" name="次数" />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Paper>
    );
};
