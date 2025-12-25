interface Post {
  id: string;
  title: string;
  content: string;
  image: {
    buffer: string;
    mimeType: string;
    width: number;
    height: number;
  }
  createdAt: number;
}
