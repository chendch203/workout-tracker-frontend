export type WorkoutType = 'running' | 'fitness';

export type RunningSubtype = 'longDistance' | 'mediumDistance' | 'intervalSprint';
export type FitnessSubtype = 'shoulders' | 'back' | 'abs' | 'glutes' | 'legs' | 'arms';

export interface WorkoutRecord {
    id: string;
    date: string;
    type: WorkoutType;
    subtype: RunningSubtype | FitnessSubtype;
}

export const workoutOptions = {
    running: {
        label: '跑步',
        subtypes: {
            longDistance: '长距离LSD跑步',
            mediumDistance: '中距离跑步',
            intervalSprint: '短距离间歇跑步'
        }
    },
    fitness: {
        label: '健身训练',
        subtypes: {
            shoulders: '肩部训练',
            back: '背部训练',
            abs: '腹部训练',
            glutes: '臀部训练',
            legs: '腿部训练',
            arms: '手臂训练'
        }
    }
};
