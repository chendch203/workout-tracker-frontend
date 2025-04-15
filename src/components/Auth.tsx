import React, { useState } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Tab,
    Tabs,
    Alert,
} from '@mui/material';
import { api } from '../services/api';

interface AuthProps {
    onAuthSuccess: (user: { token: string; username: string }) => void;
}

export const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            if (isLogin) {
                const response = await api.login({ username, password });
                onAuthSuccess({ token: response.token, username });
            } else {
                const response = await api.register({ username, password });
                onAuthSuccess({ token: response.token, username });
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : '操作失败，请重试');
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                bgcolor: 'background.default',
                py: 3,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    width: '100%',
                    maxWidth: 400,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                }}
            >
                <Typography variant="h4" component="h1" align="center" gutterBottom>
                    运动记录应用
                </Typography>

                <Tabs
                    value={isLogin ? 0 : 1}
                    onChange={(_, value) => setIsLogin(value === 0)}
                    centered
                >
                    <Tab label="登录" />
                    <Tab label="注册" />
                </Tabs>

                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="用户名"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="密码"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        margin="normal"
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 3 }}
                    >
                        {isLogin ? '登录' : '注册'}
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};
