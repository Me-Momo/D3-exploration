export interface IDataset  {
  label: string;
  count: number;
}
const dataset: IDataset[] = [
  { label: 'Abulia', count: 10 },
  { label: 'Betelgeuse', count: 20 },
  { label: 'Cantaloupe', count: 30 },
  { label: 'Dijkstra', count: 40 },
];

export default dataset;
