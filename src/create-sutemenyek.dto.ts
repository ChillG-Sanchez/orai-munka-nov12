import { IsString, IsInt, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateSutemenyekDto {
    @IsString({ message: 'A név csak szöveg lehet!' })
    @IsNotEmpty({ message: 'A név megadása kötelező!' })
    readonly nev: string;
    @IsInt({ message: 'A db csak szám lehet!' })
    @IsNotEmpty({ message: 'A db megadása kötelező!' })
    readonly db: number;
    @IsBoolean({ message: 'A laktozmentes csak igen vagy nem lehet!' })
    @IsNotEmpty({ message: 'A laktozmentes megadása kötelező!' })
    readonly laktozmentes: boolean;
}