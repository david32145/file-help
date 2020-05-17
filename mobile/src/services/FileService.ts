import ApiRESTService from './ApiRESTService';
import {FileItem} from '../components/FileItem';

class FileService {
  public async index(query?: string): Promise<FileItem[]> {
    const response = await ApiRESTService.get<FileItem[]>('/files', {
      params: {
        query,
      },
    });
    return response.data;
  }

  public async create(data: FormData): Promise<FileItem> {
    const response = await ApiRESTService.post<FileItem>('/files', data, {
      headers: {
        'Content-Type': 'multipart/form-data; charset=utf-8;',
      },
    });
    return response.data;
  }
}

export default new FileService();
