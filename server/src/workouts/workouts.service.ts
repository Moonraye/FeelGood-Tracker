import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';

@Injectable()
export class WorkoutsService {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return this.prisma.workout.findMany({
            include: {
                sets: {
                    include: {
                        exercise: true,
                    }
                }
            },
        });
    }

    async create(dto: CreateWorkoutDto) {
        return this.prisma.workout.create({
            data: {
                name: dto.name,
                user_id: dto.user_id,
                sets: {
                    create: dto.sets.map(set => ({
                        set_number: set.set_number,
                        weight: set.weight,
                        reps: set.reps,
                        rpe: set.rpe,
                        exercise_id: set.exercise_id,
                    }))
                },
            },
            include: {
                sets: {
                    include: {
                        exercise: true,
                    }
                }
            },
        })
    }

    async remove(workoutId: string, userId: string){
        const workout = await this.prisma.workout.findUnique({
            where: { id: workoutId },
        });
        
        if (!workout) {
            throw new NotFoundException('Workout not found');
        }

        if (workout.user_id !== userId) {
            throw new ForbiddenException('You can only delete your own workouts');
        }
        
        return this.prisma.workout.delete({
            where: { id: workoutId },
        });

    }
}
