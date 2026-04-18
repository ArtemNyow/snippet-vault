import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { SnippetsService, SnippetQueryParams } from "./snippets.service";
import { CreateSnippetDto } from "./dto/create-snippet.dto";
import { UpdateSnippetDto } from "./dto/update-snippet.dto";

@Controller("snippets")
export class SnippetsController {
  constructor(private readonly snippetsService: SnippetsService) {}

  @Post()
  create(@Body() createSnippetDto: CreateSnippetDto) {
    return this.snippetsService.create(createSnippetDto);
  }

  @Get()
  findAll(
    @Query("page") page?: string,
    @Query("limit") limit?: string,
    @Query("q") q?: string,
    @Query("tag") tag?: string,
  ) {
    const params: SnippetQueryParams = {
      page: page ? parseInt(page, 10) : undefined,
      limit: limit ? parseInt(limit, 10) : undefined,
      q,
      tag,
    };
    return this.snippetsService.findAll(params);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.snippetsService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateSnippetDto: UpdateSnippetDto) {
    return this.snippetsService.update(id, updateSnippetDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.snippetsService.remove(id);
  }
}
