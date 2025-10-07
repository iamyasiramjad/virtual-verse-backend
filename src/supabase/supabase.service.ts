// src/supabase/supabase.service.ts

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Express } from 'express'; // This might be needed for the Multer type

@Injectable()
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseServiceKey = this.configService.get<string>(
      'SUPABASE_SERVICE_KEY',
    );

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase URL and Service Key must be provided in .env');
    }

    this.supabase = createClient(supabaseUrl, supabaseServiceKey);
  }

  async uploadFile(
    file: Express.Multer.File,
    bucket: string,
    folder?: string,
  ): Promise<string> {
    const uniqueFileName = `${Date.now()}-${file.originalname.replace(/\s/g, '_')}`;

    const filePath = folder ? `${folder}/${uniqueFileName}` : uniqueFileName;

    const { data, error } = await this.supabase.storage
      .from(bucket)
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) {
      throw new Error(`Supabase upload error: ${error.message}`);
    }

    const { data: urlData } = this.supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    if (!urlData) {
      throw new Error('Could not get public URL for the uploaded file.');
    }

    return urlData.publicUrl;
  }
}
