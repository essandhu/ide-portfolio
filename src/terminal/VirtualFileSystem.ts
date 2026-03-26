export interface VirtualFile {
  name: string;
  content: string;
  originalContent: string;
  language: string;
  ghostComments?: GhostComment[];
}

export interface GhostComment {
  line: number;
  text: string;
  delay?: number;
}

export interface VirtualDirectory {
  name: string;
  children: (VirtualFile | VirtualDirectory)[];
}

export const isFile = (node: VirtualFile | VirtualDirectory): node is VirtualFile =>
  'content' in node;

export const isDirectory = (node: VirtualFile | VirtualDirectory): node is VirtualDirectory =>
  'children' in node;

interface LsEntry {
  name: string;
  type: 'file' | 'directory';
}

interface FileEntry {
  path: string;
  file: VirtualFile;
}

export class VirtualFileSystem {
  private root: VirtualDirectory;
  private currentPath: string[];

  constructor(root: VirtualDirectory) {
    this.root = root;
    this.currentPath = [root.name];
  }

  cwd(): string {
    return '/' + this.currentPath.join('/');
  }

  ls(path?: string): LsEntry[] {
    const dir = path ? this.resolveDirectory(path) : this.getCurrentDirectory();
    return dir.children.map((child) => ({
      name: child.name,
      type: isFile(child) ? 'file' as const : 'directory' as const,
    }));
  }

  cd(path: string): void {
    const segments = this.resolveSegments(path);
    const node = this.getNodeAtSegments(segments);

    if (!node) {
      throw new Error(`cd: no such directory: ${path}`);
    }
    if (isFile(node)) {
      throw new Error(`cd: not a directory: ${path}`);
    }

    this.currentPath = segments;
  }

  readFile(path: string): VirtualFile | null {
    const segments = this.resolveSegments(path);
    const node = this.getNodeAtSegments(segments);

    if (!node || !isFile(node)) {
      return null;
    }
    return node;
  }

  allFiles(): FileEntry[] {
    const results: FileEntry[] = [];
    this.collectFiles(this.root, '/' + this.root.name, results);
    return results;
  }

  private collectFiles(node: VirtualDirectory, basePath: string, results: FileEntry[]): void {
    for (const child of node.children) {
      const childPath = basePath + '/' + child.name;
      if (isFile(child)) {
        results.push({ path: childPath, file: child });
      } else {
        this.collectFiles(child, childPath, results);
      }
    }
  }

  private getCurrentDirectory(): VirtualDirectory {
    return this.getDirectoryAtSegments(this.currentPath);
  }

  private getDirectoryAtSegments(segments: string[]): VirtualDirectory {
    let current: VirtualFile | VirtualDirectory = this.root;

    // First segment should be root name, skip it
    for (let i = 1; i < segments.length; i++) {
      if (!isDirectory(current)) {
        throw new Error(`Not a directory: ${segments.slice(0, i + 1).join('/')}`);
      }
      const child = current.children.find((c) => c.name === segments[i]);
      if (!child) {
        throw new Error(`Not found: ${segments[i]}`);
      }
      current = child;
    }

    if (!isDirectory(current)) {
      throw new Error('Not a directory');
    }
    return current;
  }

  private getNodeAtSegments(segments: string[]): VirtualFile | VirtualDirectory | null {
    let current: VirtualFile | VirtualDirectory = this.root;

    for (let i = 1; i < segments.length; i++) {
      if (!isDirectory(current)) {
        return null;
      }
      const child = current.children.find((c) => c.name === segments[i]);
      if (!child) {
        return null;
      }
      current = child;
    }

    return current;
  }

  private resolveSegments(path: string): string[] {
    const parts = path.split('/').filter((p) => p !== '');
    let segments: string[];

    if (path.startsWith('/')) {
      // Absolute path — start from root
      segments = [this.root.name];
      // Skip the root name if it matches
      const startIndex = parts[0] === this.root.name ? 1 : 0;
      for (let i = startIndex; i < parts.length; i++) {
        this.applySegment(segments, parts[i]);
      }
    } else {
      // Relative path — start from current directory
      segments = [...this.currentPath];
      for (const part of parts) {
        this.applySegment(segments, part);
      }
    }

    return segments;
  }

  private applySegment(segments: string[], part: string): void {
    if (part === '.') {
      return;
    }
    if (part === '..') {
      if (segments.length > 1) {
        segments.pop();
      }
      return;
    }
    segments.push(part);
  }

  private resolveDirectory(path: string): VirtualDirectory {
    const segments = this.resolveSegments(path);
    return this.getDirectoryAtSegments(segments);
  }
}
