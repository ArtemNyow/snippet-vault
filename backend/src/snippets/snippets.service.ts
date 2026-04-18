import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, FilterQuery } from "mongoose";
import {
  Snippet,
  SnippetDocument,
  SnippetType,
} from "./entities/snippet.entity";
import { CreateSnippetDto } from "./dto/create-snippet.dto";
import { UpdateSnippetDto } from "./dto/update-snippet.dto";

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SnippetQueryParams {
  page?: number;
  limit?: number;
  q?: string;
  tag?: string;
}

@Injectable()
export class SnippetsService {
  constructor(
    @InjectModel(Snippet.name) private snippetModel: Model<SnippetDocument>,
  ) {}

  async create(createSnippetDto: CreateSnippetDto): Promise<SnippetDocument> {
    const created = new this.snippetModel(createSnippetDto);
    return created.save();
  }

  async findAll(
    params: SnippetQueryParams,
  ): Promise<PaginatedResult<SnippetDocument>> {
    const page = Math.max(1, params.page || 1);
    const limit = Math.min(50, Math.max(1, params.limit || 10));
    const skip = (page - 1) * limit;

    const filter: FilterQuery<SnippetDocument> = {};

    if (params.q) {
      filter.$text = { $search: params.q };
    }

    if (params.tag) {
      filter.tags = params.tag;
    }

    const [data, total] = await Promise.all([
      this.snippetModel.find(filter).skip(skip).limit(limit).exec(),
      this.snippetModel.countDocuments(filter).exec(),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string): Promise<SnippetDocument> {
    const snippet = await this.snippetModel.findById(id).exec();
    if (!snippet) {
      throw new NotFoundException(`Snippet with ID "${id}" not found`);
    }
    return snippet;
  }

  async update(
    id: string,
    updateSnippetDto: UpdateSnippetDto,
  ): Promise<SnippetDocument> {
    const updated = await this.snippetModel
      .findByIdAndUpdate(id, updateSnippetDto, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException(`Snippet with ID "${id}" not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<void> {
    const result = await this.snippetModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Snippet with ID "${id}" not found`);
    }
  }
}
