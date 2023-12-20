export interface iLocation {
    x: number;
    y: number;
    scale?: number;
}
export interface iWall extends iLocation {
    down: number;
}
export interface iFloor extends iLocation {
    right: number;
}
export interface iBox extends iLocation {
    right: number;
    down: number;
}