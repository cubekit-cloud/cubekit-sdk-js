export default interface IFolderInTree {
    name: string;
    path: string;
    children: IFolderInTree[];
}