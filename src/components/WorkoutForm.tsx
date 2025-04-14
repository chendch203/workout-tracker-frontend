import React, { useState } from 'react';
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Button,
    Typography,
    Paper
} from '@mui/material';
import { WorkoutType, workoutOptions } from '../types/workout';

interface WorkoutFormProps {
    onSubmit: (type: string, subtype: string) => void;
}

export const WorkoutForm: React.FC<WorkoutFormProps> = ({ onSubmit }) => {
    const [type, setType] = useState<WorkoutType | ''>('');
    const [subtype, setSubtype] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (type && subtype) {
            onSubmit(type, subtype);
            setType('');
            setSubtype('');
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 3, maxWidth: 400, mx: 'auto', mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                记录今日运动
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControl fullWidth>
                    <InputLabel>运动类型</InputLabel>
                    <Select
                        value={type}
                        label="运动类型"
                        onChange={(e) => {
                            setType(e.target.value as WorkoutType);
                            setSubtype('');
                        }}
                    >
                        {Object.entries(workoutOptions).map(([key, value]) => (
                            <MenuItem key={key} value={key}>
                                {value.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth disabled={!type}>
                    <InputLabel>具体项目</InputLabel>
                    <Select
                        value={subtype}
                        label="具体项目"
                        onChange={(e) => setSubtype(e.target.value)}
                    >
                        {type && Object.entries(workoutOptions[type].subtypes).map(([key, value]) => (
                            <MenuItem key={key} value={key}>
                                {value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button
                    type="submit"
                    variant="contained"
                    disabled={!type || !subtype}
                    sx={{ mt: 2 }}
                >
                    提交记录
                </Button>
            </Box>
        </Paper>
    );
};
