import { IsString, IsNotEmpty, IsNumber, Min, IsArray, ValidateNested, Max } from "class-validator"
import { Type } from "class-transformer"

class CreateSetDto {
    @IsString()
    @IsNotEmpty()
    exercise_id!: string;

    @Min(1)
    @IsNumber()
    set_number!:number;

    @Min(0)
    @IsNumber()
    weight!: number;

    @IsNumber()
    @Min(1)
    reps!: number;

    @Max(10)
    @Min(1)
    @IsNumber()
    rpe!:number;
}

export class CreateWorkoutDto {
    @IsString()
    @IsNotEmpty({message: "Title is required"})
    name!: string;

    @IsString()
    @IsNotEmpty()
    user_id!: string;

    @IsArray()
    @Type(() => CreateSetDto)
    @ValidateNested({each: true})
    sets!: CreateSetDto[];
}