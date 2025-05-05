import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const book = this.bookRepository.create(createBookDto);
    return this.bookRepository.save(book);
  }

  async findAll() {
    return this.bookRepository.find();
  }

  async findOne(id: Book['id']) {
    const targetBook = await this.bookRepository.findOne({ where: { id } });

    if (!targetBook) {
      throw new NotFoundException(`Book with id: ${id} not found.`);
    }

    return targetBook;
  }

  async update(id: Book['id'], updateBookDto: UpdateBookDto) {
    const book = await this.bookRepository.preload({
      id,
      ...updateBookDto,
    });

    if (!book) {
      throw new NotFoundException(`Book with id: ${id} not found.`);
    }

    return this.bookRepository.save(book);
  }

  async remove(id: Book['id']) {
    const targetBook = await this.findOne(id);

    await this.bookRepository.delete(targetBook);
  }
}
