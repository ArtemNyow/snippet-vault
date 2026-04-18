import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsOptional,
  IsEnum,
} from "class-validator";
import { SnippetType } from "../entities/snippet.entity";

export class CreateSnippetDto {
  @IsString()
  @IsNotEmpty({ message: "Title is required" })
  title: string;

  @IsString()
  @IsNotEmpty({ message: "Content is required" })
  content: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsEnum(SnippetType, { message: "Type must be: link, note, or command" })
  @IsOptional()
  type?: SnippetType = SnippetType.NOTE;
}
