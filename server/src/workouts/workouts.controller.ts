import { Controller, Get, Post, Body, UseGuards, Request, Delete, Param,} from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('workouts')
@UseGuards(JwtAuthGuard)
export class WorkoutsController {
    constructor(private readonly workoutsService: WorkoutsService) {}

    @Get()
    getAll(@Request() req) {
        console.log('Хто робить запит:', req.user);
        return this.workoutsService.findAll();
        
    }

    @Post()
        create(@Body() dto: CreateWorkoutDto, @Request() req){
            return this.workoutsService.create({ ...dto, user_id: req.user.id });
        }

    @Delete(':id')
    remove(@Param(':id') id: string, @Request() req) {
        return this.workoutsService.remove(id, req.user.id);
    }

}
