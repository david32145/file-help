import React, {useState, useCallback, useContext} from 'react';
import FileContext from './context';

import {FileItem} from '../components/FileItem';

import FileService from '../services/FileService';

const FileProvider: React.FC = ({children}) => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [error, setError] = useState<boolean>(false);

  const load = useCallback(async (query?: string): Promise<void> => {
    try {
      const allFiles = await FileService.index(query);
      setFiles(allFiles);
    } catch (err) {
      setError(true);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(false);
  }, []);

  const addFile = useCallback(async (data: FormData): Promise<void> => {
    try {
      const newFile = await FileService.create(data);
      setFiles((oldFiles) => [...oldFiles, newFile]);
    } catch (err) {
      setError(true);
    }
  }, []);

  return (
    <FileContext.Provider
      value={{
        addFile,
        load,
        files,
        error,
        clearError,
      }}>
      {children}
    </FileContext.Provider>
  );
};

export function useLoadFiles() {
  return useContext(FileContext).load;
}

export function useAddFile() {
  return useContext(FileContext).addFile;
}

export function useFiles() {
  return useContext(FileContext).files;
}

export function useFileHasError() {
  return useContext(FileContext).error;
}

export function useFileClearError() {
  return useContext(FileContext).clearError;
}

export default FileProvider;
