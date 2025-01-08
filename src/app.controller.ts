import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Render, BadRequestException } from '@nestjs/common';
import { AppService } from './app.service';
import { Sutemeny } from './sutemeny';
import { UpdateSutemenyDto } from './update-sutemeny.dto';
import { CreateSutemenyekDto } from './create-sutemenyek.dto';
import { NotFoundError } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  sutemenyek: Sutemeny[] = [
    {
      id: 1,
      nev: 'Túrós pite',
      laktozmentes: false,
      db: 3,
    },
    {
      id: 2,
      nev: 'Almás pite',
      laktozmentes: false,
      db: 5,
    },
    {
      id: 3,
      nev: 'Túrós palacsinta',
      laktozmentes: false,
      db: 2,
    },
    {
      id: 4,
      nev: 'Almás palacsinta',
      laktozmentes: false,
      db: 4,
    },
    {
      id: 5,
      nev: 'Mákos guba',
      laktozmentes: false,
      db: 1,
    },
    {
      id: 6,
      nev: 'Rakott krumpli',
      laktozmentes: false,
      db: 6,
    },
  ]
  nextId = 7;

  @Get('sutemenyek')
  sutemenyekListazas() {
    return this.sutemenyek;
  }

  @Get('sutemenyek/:sutemenyekId')
  sutemenyIdAlapjan(@Param('sutemenyekId') id: string) {
    const idSzam = parseInt(id,);
    const sutemeny = this.sutemenyek.find(sutemeny => sutemeny.id === idSzam);
    if (!sutemeny) {
      throw new NotFoundException('Nincs ilyen sütemény');
    }
    return sutemeny;
  }

  @Delete('sutemenyek/:sutemenyekId')
  sutemenyTorles(@Param('sutemenyekId') id: string) {
    const idSzam = parseInt(id);
    this.sutemenyek = this.sutemenyek.filter(sutemeny => sutemeny.id !== idSzam);
  }

  @Get('sutemenyKereses')
  sutemenyKereses(@Query('kereses') kereses?: string) {
    if (!kereses) {
      return this.sutemenyek;
    }
    return this.sutemenyek.filter(sutemeny => sutemeny.nev.toLowerCase().includes(kereses.toLowerCase()));
  }

  @Post('ujSutemeny')
  ujSutemeny(@Body() ujSutemenyAdatok: CreateSutemenyekDto) {
    const ujSutemeny: Sutemeny = {
      ...ujSutemenyAdatok,
      id: this.nextId,
    }
    this.nextId++;
    this.sutemenyek.push(ujSutemeny);
    return ujSutemeny;
  }

  @Patch('sutemenyModositas/:sutemenyekId')
  sutemenyModositas(@Param('sutemenyekId') id: string, @Body() modositottSutemeny: UpdateSutemenyDto) {
    const idSzam = parseInt(id);
    const eredetiSutemenyIdD = this.sutemenyek.findIndex(sutemeny => sutemeny.id === idSzam);
    const eredetiSutemeny = this.sutemenyek[eredetiSutemenyIdD];
    const ujSutemeny: Sutemeny = {
      ...eredetiSutemeny,
      ...modositottSutemeny,
    };
    this.sutemenyek[eredetiSutemenyIdD] = ujSutemeny;
    return ujSutemeny;
  }

  @Get('abc')
  sutemenyekAbcSorrendben() {
    return Array.from(this.sutemenyek).sort((a, b) => a.nev.localeCompare(b.nev));
  }

  @Get('keszleten')
  sutemenyekKeszleten() {
    return this.sutemenyek.filter(sutemeny => sutemeny.db > 0);
  }

  @Post('ujSutiGyors')
  ujSutiGyors(@Body() body: { nev: string }) {
    if (typeof body.nev !== 'string' || body.nev.trim() === '') {
      throw new BadRequestException('A sütemény neve érvénytelen');
    }
    const ujSutemeny = {
      id: this.nextId,
      nev: body.nev,
      laktozmentes: false,
      db: 1,
    };
    this.nextId++;
    this.sutemenyek.push(ujSutemeny);
    return ujSutemeny;
  }
}