import React, { useState } from 'react';
import {
    Box,
    Paper,
    TextField,
    Button,
    Typography,
    Tab,
    Tabs,
    Alert,
} from '@mui/material';
import { api } from '../services/api';
import { User } from '../types/auth';

interface AuthProps {
    onAuthSuccess: (user: User) => void;
}

export const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
    const [tab, setTab] = useState(0);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            if (tab === 0) { // Login
                const user = await api.login({ username, password });
                onAuthSuccess(user);
            } else { // Register
                await api.register({ username, password });
                // 注册成功后自动登录
                const user = await api.login({ username, password });
                onAuthSuccess(user);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : '发生错误');
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 3, maxWidth: 400, mx: 'auto', mt: 4 }}>
            <Tabs value={tab} onChange={(_, newValue) => setTab(newValue)} centered sx={{ mb: 3 }}>
                <Tab label="登录" />
                <Tab label="注册" />
            </Tabs>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="用户名"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <TextField
                    label="密码"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit" variant="contained">
                    {tab === 0 ? '登录' : '注册'}
                </Button>
            </Box>
        </Paper>
    );
};
