
export interface Props {
  query: string | null | undefined;
  item: undefined | Item;
}

export interface Snippet {
  title: string;
  description: string;
  channelTitle: string;
}

export interface Item {
  id: { videoId: string };
  snippet: Snippet;
}
