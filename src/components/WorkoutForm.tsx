import React, { useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { workoutOptions } from '../types/workout';

interface WorkoutFormProps {
    onSubmit: (type: string, subtype: string) => void;
}

export const WorkoutForm: React.FC<WorkoutFormProps> = ({ onSubmit }) => {
    const [type, setType] = useState<string>('');
    const [subtype, setSubtype] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (type && subtype) {
            onSubmit(type, subtype);
            setType('');
            setSubtype('');
        }
    };

    const handleTypeChange = (event: any) => {
        setType(event.target.value);
        setSubtype('');
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                maxWidth: 400,
                mx: 'auto',
                mt: 4,
                p: 3,
                borderRadius: 2,
                boxShadow: 1,
                bgcolor: 'background.paper'
            }}
        >
            <Typography variant="h5" component="h2" gutterBottom>
                记录新的运动
            </Typography>

            <FormControl fullWidth>
                <InputLabel>运动类型</InputLabel>
                <Select
                    value={type}
                    label="运动类型"
                    onChange={handleTypeChange}
                    required
                >
                    {Object.entries(workoutOptions).map(([value, option]) => (
                        <MenuItem key={value} value={value}>
                            {option.label}
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
                    required
                >
                    {type && Object.entries(workoutOptions[type as keyof typeof workoutOptions].subtypes).map(([value, label]) => (
                        <MenuItem key={value} value={value}>
                            {label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!type || !subtype}
                sx={{ mt: 2 }}
            >
                添加记录
            </Button>
        </Box>
    );
};
