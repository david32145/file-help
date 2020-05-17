import {createContext} from 'react';

import {FileItem} from '../components/FileItem';

interface ContextState {
  files: FileItem[];
  addFile: (data: FormData) => void;
  load: (query?: string) => void;
  clearError: () => void;
  error: boolean;
}

const context = createContext<ContextState>({
  files: [],
  addFile: () => {},
  load: () => {},
  clearError: () => {},
  error: false,
});

export default context;
